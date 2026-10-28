/**
 * /api/growth-scan-admin — the internal view's data, for Marius only.
 *   GET /api/growth-scan-admin       → recent scans
 *   GET /api/growth-scan-admin/:id   → one full record, internal part included
 * Requires the header x-admin-token to equal SCAN_ADMIN_TOKEN.
 */
import type { Config, Context } from '@netlify/functions';
import { timingSafeEqual } from 'node:crypto';
import {retryScanDelivery} from '../scan-engine/sync';
import { getRecord, listRecords } from '../scan-engine/store';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });

const authorised = (req: Request) => {
  const expected = process.env.SCAN_ADMIN_TOKEN || '';
  const given = req.headers.get('x-admin-token') || '';
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
};

export default async (req: Request, context: Context) => {
  if (!process.env.SCAN_ADMIN_TOKEN) return json({ error: 'not_configured' }, 503);
  if (!authorised(req)) return json({ error: 'unauthorised' }, 401);
  if(req.method==='POST')return json(await retryScanDelivery(context));
  if(req.method!=='GET')return json({error:'method_not_allowed'},405);
  const { id } = context.params as { id?: string };
  if (id) {
    const record = await getRecord(id);
    return record ? json(record) : json({ error: 'not_found' }, 404);
  }
  return json({ scans: await listRecords() });
};

export const config: Config = { path: ['/api/growth-scan-admin', '/api/growth-scan-admin/:id'] };
