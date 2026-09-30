/**
 * The crawl: the website as a visitor sees it.
 *
 * The homepage is opened twice — as a phone and as a laptop — and then up to
 * six subpages are opened as a phone, chosen for what matters to a service
 * business: contact, booking, prices, services, references, about. Every page
 * is rendered in Chromium, scrolled through so lazy content loads, and read
 * with EXTRACT_SCRIPT.
 */
import type { Browser, Page } from 'puppeteer-core';
import { EXTRACT_SCRIPT, type PageFacts } from './extract';
import { USER_AGENT_DESKTOP, USER_AGENT_MOBILE, fetchText, rawVisibleText, readRobots } from './net';

export type PageKind =
  | 'home'
  | 'contact'
  | 'booking'
  | 'prices'
  | 'services'
  | 'references'
  | 'about'
  | 'legal'
  | 'blog'
  | 'page';

export interface CrawledPage {
  url: string;
  finalUrl: string;
  kind: PageKind;
  status: number;
  linkText: string;
  facts: PageFacts | null;
  error?: string;
}

export interface CrawlResult {
  home: CrawledPage;
  homeDesktop: CrawledPage | null;
  pages: CrawledPage[];
  /** Internal pages found on the homepage, before choosing which to open. */
  discovered: { url: string; kind: PageKind; text: string }[];
  rawHomeTextLength: number;
  rawHomeStatus: number;
  robots: { found: boolean; blocksAll: boolean; blocksGptBot: boolean; sitemapDeclared: boolean };
  sitemapFound: boolean;
  https: boolean;
  brokenLinks: { url: string; status: number }[];
}

const MOBILE = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true };
const DESKTOP = { width: 1366, height: 800, deviceScaleFactor: 1, isMobile: false, hasTouch: false };
const MAX_SUBPAGES = 5;
// A page that never goes network-quiet (chat, analytics) is read once it has
// rendered; waiting longer only delays the report.
const NAV_TIMEOUT = 10000;

const KIND_RULES: [PageKind, RegExp][] = [
  ['legal', /(privatliv|privacy|cookie|persondata|gdpr|handelsbetingelser|betingelser|terms|vilkår|salgsbetingelser)/i],
  ['contact', /(kontakt|contact|find-os|find os|hvor-er-vi|visit|besøg|besoeg|find-vej|åbningstid|aabningstid)/i],
  ['booking', /(book|booking|bestil-tid|tidsbestilling|besigtigelse|reserv|appointment)/i],
  ['prices', /(pris|priser|prisliste|tilbud|beregn|pricing|prices|quote)/i],
  ['services', /(ydelse|services|service|vi-tilbyder|hvad-vi-laver|opgaver|løsning|losning|produkter|what-we-do)/i],
  ['references', /(reference|cases|case|projekt|kunder|anmeld|udtalelse|galleri|portfolio|testimonial|reviews)/i],
  ['blog', /(blog|magazine|magasin|nyheder|news|artikler|inspiration)/i],
  ['about', /(om-os|om os|^\/om\/?$|about|hvem-er-vi|vores-historie|team)/i],
];

const classify = (url: URL, text: string): PageKind => {
  if (url.pathname === '/' || url.pathname === '') return 'home';
  const hay = `${decodeURIComponent(url.pathname)} ${text}`.toLowerCase();
  for (const [kind, re] of KIND_RULES) if (re.test(hay)) return kind;
  return 'page';
};

const sameSite = (a: URL, b: URL) => a.hostname.replace(/^www\./, '') === b.hostname.replace(/^www\./, '');

const SKIP_EXT = /\.(pdf|jpe?g|png|gif|webp|avif|svg|zip|docx?|xlsx?|mp4|mov|mp3)$/i;
const FOREIGN_LANG = /^\/(en|de|sv|no|nb|fr|es|it|nl|pl)(\/|$)/i;

/**
 * Consent banners cover the page and can hide the content from the scan.
 * Decline them (the scan needs no cookies) with the vendors' own buttons
 * first, then any button whose text is a plain "reject"/"only necessary".
 */
const CONSENT_SCRIPT = `(() => {
  const ids = ['#CybotCookiebotDialogBodyButtonDecline', '#onetrust-reject-all-handler', '.coi-banner__decline', '#declineButton',
    '.cmplz-deny', '.cky-btn-reject', '#cookiescript_reject', '.cc-deny', '[data-cookiefirst-action="reject"]', '.cookie-notice-decline'];
  for (const sel of ids) { const el = document.querySelector(sel); if (el && el.getClientRects().length) { el.click(); return sel; } }
  const re = /^(afvis|afvis alle|afslå|kun nødvendige|tillad kun nødvendige|kun nødvendige cookies|nødvendige|reject|reject all|decline|only necessary|necessary only)$/i;
  const btn = Array.from(document.querySelectorAll('button, a[role=button], [role=button]')).find((b) => re.test((b.innerText || '').trim()) && b.getClientRects().length);
  if (btn) { btn.click(); return 'text'; }
  return '';
})()`;

async function dismissConsent(page: Page) {
  const hit = await page.evaluate(CONSENT_SCRIPT).catch(() => '');
  if (hit) await new Promise((r) => setTimeout(r, 900));
  return Boolean(hit);
}

async function scrollThrough(page: Page) {
  await page
    .evaluate(`(async () => {
      const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
      const max = Math.min(document.body ? document.body.scrollHeight : 0, 20000);
      for (let y = 0; y < max; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 450));
    })()`)
    .catch(() => undefined);
}

const TRANSIENT = /detached|context was destroyed|Target closed|Session closed|frame was detached|navigat/i;

async function readPage(page: Page) {
  await page
    .waitForFunction('document.body && document.body.innerText && document.body.innerText.length > 40', { timeout: 4000 })
    .catch(() => undefined);
  await new Promise((r) => setTimeout(r, 700));
  if (await dismissConsent(page)) {
    // Some consent tools reload the page after a choice; let that finish.
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 2500 }).catch(() => undefined);
    await page
      .waitForFunction('document.body && document.body.innerText && document.body.innerText.length > 40', { timeout: 4000 })
      .catch(() => undefined);
  }
  await scrollThrough(page);
  return (await page.evaluate(EXTRACT_SCRIPT)) as PageFacts;
}

async function openOnce(browser: Browser, url: string, viewport: typeof MOBILE) {
  const page = await browser.newPage();
  try {
    await page.setViewport(viewport);
    await page.setUserAgent(viewport.isMobile ? USER_AGENT_MOBILE : USER_AGENT_DESKTOP);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'da-DK,da;q=0.9,en;q=0.7' });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'media') return void req.abort().catch(() => undefined);
      void req.continue().catch(() => undefined);
    });
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT }).catch((error: Error) => {
      // A page that never goes quiet (analytics, chat) still rendered; read what is there.
      if (/timeout/i.test(error.message)) return null;
      throw error;
    });
    let facts: PageFacts;
    try {
      facts = await readPage(page);
    } catch (error) {
      if (!TRANSIENT.test((error as Error).message)) throw error;
      // The page navigated under us (a redirect or a consent reload): read the page it became.
      await new Promise((r) => setTimeout(r, 1500));
      facts = await readPage(page);
    }
    return { finalUrl: page.url(), status: response ? response.status() : 200, facts };
  } finally {
    await page.close().catch(() => undefined);
  }
}

async function openPage(
  browser: Browser,
  url: string,
  viewport: typeof MOBILE,
  kind: PageKind,
  linkText = ''
): Promise<CrawledPage> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { finalUrl, status, facts } = await openOnce(browser, url, viewport);
      return { url, finalUrl, kind, status, linkText, facts };
    } catch (error) {
      const message = (error as Error).message;
      if (attempt === 2 || !TRANSIENT.test(message)) {
        return { url, finalUrl: url, kind, status: 0, linkText, facts: null, error: message.slice(0, 200) };
      }
    }
  }
  return { url, finalUrl: url, kind, status: 0, linkText, facts: null, error: 'unreachable' };
}

/** Picks which discovered pages to open: one of each useful kind, then the rest of the menu. */
function choosePages(discovered: CrawlResult['discovered']) {
  const order: PageKind[] = ['contact', 'services', 'booking', 'prices', 'references', 'about'];
  const chosen: CrawlResult['discovered'] = [];
  for (const kind of order) {
    const hit = discovered.find((d) => d.kind === kind && !chosen.includes(d));
    if (hit) chosen.push(hit);
  }
  // Then the rest of the menu, with blog/news last: they rarely say much
  // about how a customer gets in touch.
  const rest = discovered.filter((d) => !chosen.includes(d) && d.kind !== 'legal');
  rest.sort((a, b) => Number(a.kind === 'blog') - Number(b.kind === 'blog'));
  for (const d of rest) {
    if (chosen.length >= MAX_SUBPAGES) break;
    chosen.push(d);
  }
  return chosen.slice(0, MAX_SUBPAGES);
}

export async function crawl(
  browser: Browser,
  target: URL,
  onProgress: (done: number, planned: number) => void,
  deadline: number
): Promise<CrawlResult> {
  const origin = target.origin;
  const [raw, robotsRes, sitemapRes, home, homeDesktop] = await Promise.all([
    fetchText(target.toString()),
    fetchText(`${origin}/robots.txt`, 5000),
    fetchText(`${origin}/sitemap.xml`, 5000),
    openPage(browser, target.toString(), MOBILE, 'home'),
    openPage(browser, target.toString(), DESKTOP, 'home'),
  ]);

  const finalHome = new URL(home.finalUrl || target.toString());
  const seen = new Set<string>();
  const discovered: CrawlResult['discovered'] = [];
  const allLinks = [...(home.facts?.links ?? []), ...(homeDesktop.facts?.links ?? [])];
  // Header and menu links first: they are the site's own map of what matters.
  allLinks.sort((a, b) => Number(b.inHeader) - Number(a.inHeader));
  for (const link of allLinks) {
    let u: URL;
    try {
      u = new URL(link.href);
    } catch {
      continue;
    }
    if (!sameSite(u, finalHome)) continue;
    u.hash = '';
    u.search = '';
    const key = u.toString().replace(/\/$/, '');
    if (seen.has(key) || key === finalHome.toString().replace(/\/$/, '')) continue;
    if (SKIP_EXT.test(u.pathname)) continue;
    if (/[[\]{}<>]|%5B|%5D|%7B|%7D/i.test(u.pathname)) continue;
    if (FOREIGN_LANG.test(u.pathname) && !FOREIGN_LANG.test(finalHome.pathname)) continue;
    seen.add(key);
    discovered.push({ url: u.toString(), kind: classify(u, link.text), text: link.text });
  }

  const chosen = choosePages(discovered);
  const pages: CrawledPage[] = [];
  let done = 0;
  onProgress(done, chosen.length);
  const queue = [...chosen];
  const worker = async () => {
    while (queue.length) {
      const next = queue.shift()!;
      if (Date.now() > deadline) break;
      pages.push(await openPage(browser, next.url, MOBILE, next.kind, next.text));
      done += 1;
      onProgress(done, chosen.length);
    }
  };
  await Promise.all([worker(), worker(), worker()]);

  // Internal links that answer with an error, checked over plain HTTP. A
  // client-rendered site answers 200 for everything, so this only catches
  // real server errors — no false alarms.
  const toCheck = discovered.slice(0, 25).filter((d) => !pages.some((p) => p.url === d.url));
  const brokenLinks: { url: string; status: number }[] = pages
    .filter((p) => p.status >= 400)
    .map((p) => ({ url: p.url, status: p.status }));
  await Promise.all(
    toCheck.map(async (d) => {
      const res = await fetchText(d.url, 5000);
      if (res && res.status >= 400) brokenLinks.push({ url: d.url, status: res.status });
    })
  );

  const robots = robotsRes && robotsRes.status < 400 && !/text\/html/i.test(robotsRes.contentType)
    ? { found: true, ...readRobots(robotsRes.text) }
    : { found: false, blocksAll: false, blocksGptBot: false, sitemapDeclared: false };

  return {
    home,
    homeDesktop,
    pages,
    discovered,
    rawHomeTextLength: raw ? rawVisibleText(raw.text).length : 0,
    rawHomeStatus: raw?.status ?? 0,
    robots,
    sitemapFound: Boolean(sitemapRes && sitemapRes.status < 400 && /xml/i.test(sitemapRes.contentType + sitemapRes.text.slice(0, 100))),
    https: finalHome.protocol === 'https:',
    brokenLinks,
  };
}
