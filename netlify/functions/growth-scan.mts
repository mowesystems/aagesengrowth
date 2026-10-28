/**
 * /api/growth-scan — start a scan, read it back, download its documents.
 *
 *   POST /api/growth-scan                  { url, locale } → 202 { id, status }
 *   GET  /api/growth-scan/:id              → the public part of the record
 *   GET  /api/growth-scan/:id/report.pdf   → the PDF (once generated)
 *   GET  /api/growth-scan/:id/share.png    → the share image (once generated)
 *
 * The scan itself runs in growth-scan-run-background, which has the time a
 * real browser needs. Nothing here ever returns the internal part of a record.
 */
import type { Config, Context } from '@netlify/functions';
import type { ScanLocale, ScanRecord } from '../../src/lib/growthScan/types';
import { parseTarget, resolvesPublic } from '../scan-engine/net';
import { syncScan } from '../scan-engine/sync';
import { allowScan, getRecord, indexRecord, putRecord, store, toPublic } from '../scan-engine/store';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });

const fail = (error: string, message: string, status: number, domain?: string) => json({ error, message, domain }, status);

const ID_RE = /^[0-9a-f-]{36}$/;

export default async (req: Request, context: Context) => {
  const { id, file } = context.params as { id?: string; file?: string };

  if (req.method === 'GET') {
    if (!id || !ID_RE.test(id)) return fail('not_found', 'Unknown scan.', 404);
    if (file) {
      const kind = file === 'report.pdf' ? 'pdf' : file === 'share.png' ? 'png' : null;
      if (!kind) return fail('not_found', 'Unknown file.', 404);
      const record = await getRecord(id);
      const data = await store().get(`file/${id}.${kind}`, { type: 'arrayBuffer' });
      if (!record || !data) return fail('not_found', 'The file is not ready yet.', 404);
      const name = `growth-scan-${record.domain}.${kind}`;
      return new Response(data, {
        headers: {
          'Content-Type': kind === 'pdf' ? 'application/pdf' : 'image/png',
          'Content-Disposition': `attachment; filename="${name}"`,
          'Cache-Control': 'private, no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
    let record = await getRecord(id);
    if (!record) return fail('not_found', 'Unknown scan.', 404);
    // A scan whose function died never writes its own error. Past four
    // minutes, say so instead of leaving the visitor waiting.
    if ((record.status === 'queued' || record.status === 'running') && Date.now() - Date.parse(record.createdAt) > 4 * 60_000) {
      record = { ...record, status: 'error', error: { error: 'timeout', message: 'The scan did not finish.', domain: record.domain } };
      await putRecord(record);
      await syncScan(record,context.deploy.context==='production');
    }
    return json(toPublic(record));
  }

  if (req.method !== 'POST') return fail('method_not_allowed', 'Use POST.', 405);

  let body: { url?: unknown; locale?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return fail('invalid_url', 'Body must be JSON with a url field.', 400);
  }
  const target = parseTarget(body.url);
  if (!target) return fail('invalid_url', 'Skriv en gyldig webadresse, fx dinvirksomhed.dk', 400);
  if (!(await resolvesPublic(target.hostname))) {
    return fail('unreachable', 'Websitet kunne ikke findes.', 422, target.hostname);
  }
  if (!(await allowScan(context.ip || 'unknown'))) {
    return fail('rate_limited', 'For mange scanninger på kort tid. Prøv igen om lidt.', 429, target.hostname);
  }

  const locale: ScanLocale = body.locale === 'en' ? 'en' : 'da';
  const record: ScanRecord = {
    id: crypto.randomUUID(),
    status: 'queued',
    progress: { stage: 'queued', pagesDone: 0, pagesPlanned: 0 },
    url: target.toString(),
    domain: target.hostname.replace(/^www\./, ''),
    locale,
    createdAt: new Date().toISOString(),
  };
  await putRecord(record);
  await indexRecord(record);
  await syncScan(record,context.deploy.context==='production');

  const origin = new URL(req.url).origin;
  const trigger = await fetch(`${origin}/.netlify/functions/growth-scan-run-background`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: record.id, origin }),
  }).catch(() => null);
  if (!trigger || trigger.status >= 400) {
    await putRecord({ ...record, status: 'error', error: { error: 'server_error', message: 'The scan could not be started.' } });
    return fail('server_error', 'Scanningen kunne ikke startes.', 502, record.domain);
  }

  return json({ id: record.id, status: record.status }, 202);
};

export const config: Config = {
  path: ['/api/growth-scan', '/api/growth-scan/:id', '/api/growth-scan/:id/:file'],
};
