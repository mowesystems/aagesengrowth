import type { GrowthScanError, PublicScan, ScanLocale } from '@/lib/growthScan/types';

/**
 * The frontend's only knowledge of the backend.
 *
 * A scan is started with POST /api/growth-scan, runs in a background function
 * with a real browser, and is polled with GET /api/growth-scan/:id until it is
 * done. The PDF and share image are plain downloads from the same path.
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

const readError = async (response: Response): Promise<GrowthScanError> => {
  const body = (await response.json().catch(() => null)) as GrowthScanError | null;
  return body && 'error' in body ? body : { error: 'server_error', message: `Status ${response.status}` };
};

export const startScan = async (url: string, locale: ScanLocale, signal?: AbortSignal): Promise<string> => {
  const response = await fetch(SCAN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, locale }),
    signal,
  });
  if (!response.ok) throw new ScanFailure(await readError(response));
  const body = (await response.json()) as { id: string };
  return body.id;
};

export const getScan = async (id: string, signal?: AbortSignal): Promise<PublicScan> => {
  const response = await fetch(`${SCAN_ENDPOINT}/${encodeURIComponent(id)}`, { signal, cache: 'no-store' });
  if (!response.ok) throw new ScanFailure(await readError(response));
  return (await response.json()) as PublicScan;
};

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

/**
 * Polls until the report is there (or the scan failed), reporting progress on
 * the way. Keeps polling a little after `done` so the PDF and image flags
 * arrive too, via `onUpdate`.
 */
export const pollScan = async (
  id: string,
  onUpdate: (scan: PublicScan) => void,
  signal?: AbortSignal,
  timeoutMs = 150000
): Promise<void> => {
  const started = Date.now();
  let scan: PublicScan | null = null;
  while (Date.now() - started < timeoutMs) {
    scan = await getScan(id, signal).catch((e) => {
      if ((e as Error).name === 'AbortError') throw e;
      return scan;
    });
    if (scan) {
      onUpdate(scan);
      if (scan.status === 'error') return;
      if (scan.status === 'done' && scan.files?.pdf) return;
    }
    await wait(scan?.status === 'done' ? 2000 : 1300, signal);
  }
  if (!scan || scan.status !== 'done') {
    throw new ScanFailure({ error: 'timeout', message: 'The scan took too long.' });
  }
};

export const fileUrl = (id: string, kind: 'pdf' | 'png') =>
  `${SCAN_ENDPOINT}/${encodeURIComponent(id)}/${kind === 'pdf' ? 'report.pdf' : 'share.png'}`;
