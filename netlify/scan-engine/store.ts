/**
 * Scan storage in Netlify Blobs.
 *   scan/<id>        the full record (public report + internal)
 *   file/<id>.pdf    the report as PDF
 *   file/<id>.png    the share image
 *   idx/<iso>__<id>__<domain>   empty, one per scan, for the internal list
 *   rate/<hash>      scans started per hashed IP per hour
 */
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';
import type { PublicScan, ScanListItem, ScanRecord } from '../../src/lib/growthScan/types';

export const store = () => getStore({ name: 'growth-scans', consistency: 'strong' });

export const getRecord = async (id: string) =>
  (await store().get(`scan/${id}`, { type: 'json' })) as ScanRecord | null;

export const putRecord = async (record: ScanRecord) => store().setJSON(`scan/${record.id}`, record);

export const indexRecord = async (record: ScanRecord) =>
  store().set(`idx/${record.createdAt}__${record.id}__${record.domain}`, '');

export const listRecords = async (limit = 200): Promise<ScanListItem[]> => {
  const { blobs } = await store().list({ prefix: 'idx/' });
  return blobs
    .map((b) => {
      const [createdAt, id, domain] = b.key.slice(4).split('__');
      return { id, domain, createdAt };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
};

/** The record without the internal part: what anyone holding the id may see. */
export const toPublic = (r: ScanRecord): PublicScan => {
  const rest: ScanRecord = { ...r };
  delete rest.internal;
  return rest;
};

/** At most `max` scans per IP per hour. The IP is hashed and never stored in a record. */
export const allowScan = async (ip: string, max = 12) => {
  const hour = new Date().toISOString().slice(0, 13);
  const key = `rate/${createHash('sha256').update(`${ip}|${hour}|growth-scan`).digest('hex').slice(0, 32)}`;
  const s = store();
  const current = ((await s.get(key, { type: 'json' })) as { n: number } | null)?.n ?? 0;
  if (current >= max) return false;
  await s.setJSON(key, { n: current + 1 });
  return true;
};
