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
import { syncScan } from '../scan-engine/sync';
import { getRecord, putRecord, store } from '../scan-engine/store';

export default async (req: Request, _context: Context) => {
  const { id, origin } = (await req.json().catch(() => ({}))) as { id?: string; origin?: string };
  if (!id) return;
  const queued = await getRecord(id);
  if (!queued || queued.status !== 'queued') return;

  let record: ScanRecord = { ...queued, status: 'running' };
  await putRecord(record);
  await syncScan(record,_context.deploy.context==='production');
  const progress = async (p: ScanProgress) => {
    record = { ...record, progress: p };
    await putRecord(record).catch(() => undefined);
  };

  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;
  try {
    browser = await launchBrowser();
    let out;
    try {
      out = await runScan(browser, new URL(record.url), progress);
    } catch (error) {
      // The browser itself died (usually memory on a heavy site): start a
      // fresh one and try once more with fewer subpages.
      if (!/Connection closed|Target closed|Protocol error|disconnected|Session closed/i.test((error as Error).message)) throw error;
      await browser.close().catch(() => undefined);
      browser = await launchBrowser();
      out = await runScan(browser, new URL(record.url), progress, 3);
      out.internal.notes.push('Browseren blev genstartet undervejs; scanningen kørte med færre undersider.');
    }
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
  await syncScan(record,_context.deploy.context==='production');

    // Documents in the language the scan was started in, after the report
    // is already visible, so the visitor never waits for them.
    const base = origin && /^https?:\/\//.test(origin) ? origin : 'https://aagesengrowth.com';
    const render = (b: NonNullable<typeof browser>) => renderDocuments(b, out.report[record.locale], record.locale, out.domain, base);
    let docs;
    try {
      docs = await render(browser);
    } catch {
      // A heavy site can leave the scan's browser out of memory; the
      // documents only need a fresh one.
      await browser.close().catch(() => undefined);
      browser = await launchBrowser();
      docs = await render(browser);
    }
    await store().set(`file/${id}.pdf`, docs.pdf.buffer as ArrayBuffer);
    await store().set(`file/${id}.png`, docs.png.buffer as ArrayBuffer);
    record = { ...record, progress: { ...record.progress, stage: 'done' }, files: { pdf: true, png: true } };
    await putRecord(record);
  await syncScan(record,_context.deploy.context==='production');
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
    const latest=await getRecord(id);if(latest)await syncScan(latest,_context.deploy.context==='production');
  }
};
