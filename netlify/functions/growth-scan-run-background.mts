/**
 * The scan itself: a real browser, up to fifteen minutes (it needs ~20 s).
 * Invoked by /api/growth-scan with the id of a queued record, so a direct
 * call can only ever run a scan that was legitimately queued, once.
 */
import type { Context } from '@netlify/functions';
import type { ScanProgress, ScanRecord } from '../../src/lib/growthScan/types';
import { launchBrowser } from '../scan-engine/browser';
import { renderDocuments } from '../scan-engine/documents';
import { runScan, ScanUnreachable } from '../scan-engine/run';
import { getRecord, putRecord, store } from '../scan-engine/store';

export default async (req: Request, _context: Context) => {
  const { id, origin } = (await req.json().catch(() => ({}))) as { id?: string; origin?: string };
  if (!id) return;
  const queued = await getRecord(id);
  if (!queued || queued.status !== 'queued') return;

  let record: ScanRecord = { ...queued, status: 'running' };
  await putRecord(record);
  const progress = async (p: ScanProgress) => {
    record = { ...record, progress: p };
    await putRecord(record).catch(() => undefined);
  };

  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;
  try {
    browser = await launchBrowser();
    const out = await runScan(browser, new URL(record.url), progress);
    record = {
      ...record,
      status: 'done',
      progress: { ...record.progress, stage: 'files' },
      domain: out.domain,
      finalUrl: out.finalUrl,
      finishedAt: new Date().toISOString(),
      websiteJustified: out.websiteJustified,
      report: out.report,
      internal: out.internal,
      files: { pdf: false, png: false },
    };
    await putRecord(record);

    // Documents in the language the scan was started in, after the report
    // is already visible, so the visitor never waits for them.
    const base = origin && /^https?:\/\//.test(origin) ? origin : 'https://aagesengrowth.com';
    const docs = await renderDocuments(browser, out.report[record.locale], record.locale, out.domain, base);
    await store().set(`file/${id}.pdf`, docs.pdf.buffer as ArrayBuffer);
    await store().set(`file/${id}.png`, docs.png.buffer as ArrayBuffer);
    record = { ...record, progress: { ...record.progress, stage: 'done' }, files: { pdf: true, png: true } };
    await putRecord(record);
  } catch (error) {
    const unreachable = error instanceof ScanUnreachable;
    const message = (error as Error).message?.slice(0, 300) || 'Unknown error';
    if (record.status === 'done') {
      // The report is out; only the documents failed.
      await putRecord({ ...record, progress: { ...record.progress, stage: 'done' }, internal: record.internal && { ...record.internal, notes: [...record.internal.notes, `Dokumenter fejlede: ${message}`] } });
    } else {
      await putRecord({
        ...record,
        status: 'error',
        finishedAt: new Date().toISOString(),
        error: { error: unreachable ? 'blocked' : 'server_error', message, domain: record.domain },
      });
    }
  } finally {
    await browser?.close().catch(() => undefined);
  }
};
