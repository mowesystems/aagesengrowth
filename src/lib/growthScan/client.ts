import type { GrowthScanError, GrowthScanResult } from '@/lib/growthScan/types';

/**
 * The frontend's only knowledge of the backend.
 *
 * Today `/api/growth-scan` is a Netlify function that measures website
 * signals. Later it is MOWE. Either way the UI calls `startScan` and renders
 * a `GrowthScanResult`; a `getScan` is sketched for when results persist.
 */
export const SCAN_ENDPOINT = '/api/growth-scan';

/** Cleans what a person types into something the backend accepts. */
export const normaliseUrl = (input: string): string | null => {
  const raw = input.trim().replace(/\s+/g, '');
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname)) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
};

export class ScanFailure extends Error {
  constructor(public readonly detail: GrowthScanError) {
    super(detail.message);
  }
}

export const startScan = async (url: string, signal?: AbortSignal): Promise<GrowthScanResult> => {
  const response = await fetch(SCAN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    signal,
  });

  const body = (await response.json().catch(() => null)) as
    | GrowthScanResult
    | GrowthScanError
    | null;

  if (!response.ok || !body || 'error' in body) {
    throw new ScanFailure(
      body && 'error' in body
        ? body
        : { error: 'server_error', message: `Scan failed with status ${response.status}` }
    );
  }
  return body;
};

/** Reserved for persisted scans: GET /api/growth-scan/:id. */
export const getScan = async (id: string): Promise<GrowthScanResult> => {
  const response = await fetch(`${SCAN_ENDPOINT}/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error(`Scan ${id} not available`);
  return (await response.json()) as GrowthScanResult;
};
