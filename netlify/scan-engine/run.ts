/**
 * One scan, start to finish: render, evaluate, write the reports.
 * Used by the background function and by scripts/scan-local.ts.
 */
import type { Browser } from 'puppeteer-core';
import type { InternalScan, PublicReport, ScanLocale, ScanProgress } from '../../src/lib/growthScan/types';
import { crawl } from './crawl';
import { evaluate } from './rules';
import { buildInternal, buildReports } from './report';

export interface ScanOutput {
  domain: string;
  finalUrl: string;
  websiteJustified: boolean;
  report: Record<ScanLocale, PublicReport>;
  internal: InternalScan;
}

export class ScanUnreachable extends Error {}

export async function runScan(
  browser: Browser,
  target: URL,
  onProgress: (p: ScanProgress) => void | Promise<void>
): Promise<ScanOutput> {
  const started = Date.now();
  await onProgress({ stage: 'open', pagesDone: 0, pagesPlanned: 0 });
  const result = await crawl(
    browser,
    target,
    (done, planned) => void onProgress({ stage: 'pages', pagesDone: done, pagesPlanned: planned }),
    started + 40000
  );
  if (!result.home.facts) throw new ScanUnreachable(result.home.error || 'The homepage could not be opened');
  if (result.home.status >= 400 && result.home.facts.textLength < 200) {
    throw new ScanUnreachable(`The homepage answered HTTP ${result.home.status}`);
  }

  // A scan that could not really see the site must not report what is
  // "missing". Too little text and no links means a wall (consent, bot
  // protection, login) or a failed render: say so instead of guessing.
  const home = result.home.facts;
  const internalLinks = result.discovered.length;
  if (home.textLength < 60 || (internalLinks === 0 && home.links.length < 3)) {
    throw new ScanUnreachable(`Limited view: ${home.textLength} characters of text and ${internalLinks} internal links on the rendered homepage`);
  }

  await onProgress({ stage: 'analyse', pagesDone: result.pages.length, pagesPlanned: result.pages.length });
  const finalUrl = result.home.finalUrl;
  const domain = new URL(finalUrl).hostname.replace(/^www\./, '');
  const { findings, signals } = evaluate(result, domain);
  const { shown, report } = buildReports(findings, signals, domain);

  const all = [result.home, ...result.pages];
  const pages: InternalScan['pages'] = all.map((p) => ({
    url: p.url,
    finalUrl: p.finalUrl,
    kind: p.kind,
    status: p.status,
    title: p.facts?.title ?? p.error ?? '',
    loadMs: p.facts?.loadMs ?? 0,
    textLength: p.facts?.textLength ?? 0,
    bodyCtas: p.facts?.ctas.filter((c) => !c.inChrome).length ?? 0,
    telLinks: p.facts?.telLinks.length ?? 0,
    forms: p.facts?.forms.length ?? 0,
  }));
  const notes: string[] = [];
  if (signals.clientRendered) notes.push('Klient-renderet site: rå HTML er næsten tom; analysen bygger på den renderede side.');
  if (!signals.contactPageFound) notes.push('Ingen kontaktside fundet i menuen; kontaktfund har lavere sikkerhed.');
  const failed = result.pages.filter((p) => !p.facts);
  if (failed.length) notes.push(`${failed.length} underside(r) kunne ikke åbnes: ${failed.map((p) => p.url).join(', ')}`);

  const internal = buildInternal(findings, shown, signals, pages, domain, Date.now() - started, notes);
  return { domain, finalUrl, websiteJustified: signals.websiteJustified, report, internal };
}
