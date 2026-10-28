import type { LeadIntake } from './intake.ts';

export interface DeliveryConfig { url?: string; key?: string; secret?: string }
/** Only this server-held secret can choose the brand in Postgres. */
export async function deliverLead(lead: LeadIntake, config: DeliveryConfig, send: typeof fetch = fetch) {
  if (!config.url || !config.key || !config.secret) return false;
  try {
    const target = new URL(config.url);
    if (target.protocol !== 'https:' || !target.hostname.endsWith('.supabase.co')) return false;
    const result = await send(`${target.origin}/rest/v1/rpc/ingest_growth_lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: config.key, Authorization: `Bearer ${config.key}` },
      body: JSON.stringify({ ingest_secret: config.secret, payload: lead }),
      signal: AbortSignal.timeout(6000),
    });
    if (!result.ok) return false;
    const id = await result.json();
    return typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id);
  } catch { return false; }
}
