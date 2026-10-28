import type { Config, Context } from '@netlify/functions';
import { IntakeError, normalizeIntake } from '../lead-engine/intake.ts';
import { deliveryConfig, deliverQueued, enqueueLead, queueStore } from '../lead-engine/queue.ts';

const json = (body: unknown, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) return json({ error: 'origin_not_allowed' }, 403);
  if (!req.headers.get('content-type')?.includes('application/json')) return json({ error: 'json_required' }, 415);
  try {
    // Stream with an actual byte limit; Content-Length alone is caller-controlled.
    const reader = req.body?.getReader();
    if (!reader) return json({ error: 'body_required' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) { await reader.cancel(); return json({ error: 'payload_too_large' }, 413); }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || Array.isArray(body) || typeof body !== 'object') return json({ error: 'invalid_request' }, 400);
    const lead = normalizeIntake(body);
    if (!lead) return json({ received: true }, 202);
    const store = queueStore(context.deploy);
    await enqueueLead(lead, store);
    const delivered = await deliverQueued(lead, deliveryConfig(), store, context.deploy.context === 'production');
    return json({ received: true, id: lead.intake_id }, delivered ? 201 : 202);
  } catch (error) {
    if (error instanceof IntakeError || error instanceof SyntaxError) return json({ error: 'invalid_request', message: error.message }, 400);
    if (error instanceof Error && error.message === 'intake_conflict') return json({ error: 'request_conflict' }, 409);
    console.error('lead-capture: persistence failed');
    return json({ error: 'temporarily_unavailable' }, 503);
  }
};
export const config: Config = { path: '/api/lead-capture', rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowLimit: 8, windowSize: 60 } };
