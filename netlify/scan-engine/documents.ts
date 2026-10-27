/**
 * The report as a PDF and as a share image, rendered by the same Chromium
 * that ran the scan, from one HTML template in the site's own type and colours.
 *
 * Both carry only what the customer report says: public facts about the
 * website, no scores, nothing about the person who ran the scan. The footer
 * marks the document as prepared for that company alone.
 */
import type { Browser } from 'puppeteer-core';
import type { PublicReport, ScanArea, ScanLocale } from '../../src/lib/growthScan/types';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'Kontakt@aagesengrowth.dk';

const AREA: Record<ScanLocale, Record<ScanArea, string>> = {
  da: { website: 'Website', google: 'Google', gbp: 'Anmeldelser og Google-profil', contact: 'Kontakt og booking', followup: 'Opfølgning' },
  en: { website: 'Website', google: 'Google', gbp: 'Reviews & Google profile', contact: 'Contact & booking', followup: 'Follow-up' },
};

const COPY = {
  da: {
    kicker: 'Growth Scan',
    recommendation: 'Vores anbefaling',
    notSeen: 'Det kan vi ikke se udefra',
    confidential: (domain: string, date: string) =>
      `Fortroligt. Udarbejdet til ${domain} ${date}. Bygger kun på offentligt tilgængelige oplysninger på websitet.`,
    next: 'Book en samtale om Growth Engine på',
    none: 'Vi fandt ingen oplagte forbedringer på de sider, vi gennemgik.',
    more: (n: number) => `+ ${n} ${n === 1 ? 'mulighed' : 'muligheder'} mere og vores anbefaling i den fulde rapport`,
  },
  en: {
    kicker: 'Growth Scan',
    recommendation: 'Our recommendation',
    notSeen: "What we can't see from the outside",
    confidential: (domain: string, date: string) =>
      `Confidential. Prepared for ${domain} on ${date}. Based only on publicly available information on the website.`,
    next: 'Book a conversation about Growth Engine at',
    none: 'We found no obvious improvements on the pages we reviewed.',
    more: (n: number) => `+ ${n} more ${n === 1 ? 'opportunity' : 'opportunities'} and our recommendation in the full report`,
  },
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const fontFaces = (origin: string) => `
  @font-face { font-family: 'Inter Tight'; font-weight: 100 900; src: url('${origin}/fonts/inter-tight-var.woff2') format('woff2'); }
  @font-face { font-family: 'Plex Mono'; font-weight: 500; src: url('${origin}/fonts/ibm-plex-mono-500.woff2') format('woff2'); }
  @font-face { font-family: 'Instrument Serif'; font-style: italic; src: url('${origin}/fonts/instrument-serif-400-italic.woff2') format('woff2'); }
`;

const base = (origin: string) => `
  ${fontFaces(origin)}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #F7F6F2; color: #0B1220; font-family: 'Inter Tight', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  .mono { font-family: 'Plex Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.16em; font-size: 9.5px; font-weight: 500; }
  .brand { color: #1B4FE8; }
  .muted { color: #5A6478; }
  .rule { border-top: 1px solid rgba(11,18,32,0.14); }
`;

export function reportHtml(report: PublicReport, locale: ScanLocale, domain: string, date: string, origin: string) {
  const c = COPY[locale];
  const items = report.opportunities
    .map(
      (o, i) => `
      <li class="rule item">
        <div class="num mono brand">${String(i + 1).padStart(2, '0')}</div>
        <div>
          <div class="mono muted area">${esc(AREA[locale][o.area])}</div>
          <p class="obs">${esc(o.observed)}</p>
          <p class="opp muted">${esc(o.opportunity)}</p>
        </div>
      </li>`
    )
    .join('');
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
    ${base(origin)}
    @page { size: A4; margin: 0; }
    body { width: 210mm; min-height: 297mm; padding: 16mm 18mm 12mm; display: flex; flex-direction: column; }
    header { display: flex; justify-content: space-between; align-items: center; }
    header img { height: 26px; }
    h1 { font-size: 30px; line-height: 1.06; letter-spacing: -0.03em; font-weight: 650; margin-top: 13mm; max-width: 160mm; }
    .sub { font-size: 12.5px; margin-top: 10px; }
    ol { list-style: none; margin-top: 9mm; border-bottom: 1px solid rgba(11,18,32,0.14); }
    .item { display: grid; grid-template-columns: 14mm 1fr; padding: 4.2mm 0; }
    .num { font-size: 11px; padding-top: 2px; }
    .area { font-size: 8.5px; }
    .obs { font-size: 14px; font-weight: 600; line-height: 1.32; margin-top: 5px; }
    .opp { font-size: 12.5px; line-height: 1.45; margin-top: 3px; }
    .rec { margin-top: 8mm; border-left: 2px solid #1B4FE8; background: #EDF2FF; padding: 6mm 7mm; }
    .rec p { font-size: 13px; line-height: 1.5; margin-top: 6px; }
    .rec .next { font-weight: 600; margin-top: 8px; }
    .notseen { margin-top: 7mm; margin-bottom: 8mm; }
    .notseen li { font-size: 10.5px; line-height: 1.45; margin-top: 4px; list-style: none; padding-left: 12px; position: relative; }
    .notseen li::before { content: '–'; position: absolute; left: 0; color: #5A6478; }
    footer { margin-top: auto; padding-top: 4mm; font-size: 9px; line-height: 1.5; display: flex; justify-content: space-between; gap: 10mm; border-top: 1px solid rgba(11,18,32,0.14); }
    .none { font-size: 13px; margin-top: 12mm; }
  </style></head><body>
    <header>
      <img src="${origin}/brand/aagesen-growth.png" alt="Aagesen Growth">
      <span class="mono muted">${c.kicker} · ${esc(domain)} · ${esc(date)}</span>
    </header>
    <h1>${esc(report.headline)}</h1>
    <p class="sub muted">${esc(report.sub)}</p>
    ${report.opportunities.length ? `<ol>${items}</ol>` : `<p class="none">${c.none}</p>`}
    <section class="rec">
      <div class="mono brand">${c.recommendation}</div>
      <p>${esc(report.recommendation.text)}</p>
      <p class="next">${c.next} aagesengrowth.com</p>
    </section>
    <section class="notseen">
      <div class="mono muted">${c.notSeen}</div>
      <ul>${report.notSeen.map((n) => `<li class="muted">${esc(n)}</li>`).join('')}</ul>
    </section>
    <footer class="muted">
      <span>${esc(c.confidential(domain, date))}</span>
      <span style="white-space:nowrap">aagesengrowth.com · ${esc(CONTACT_EMAIL)}</span>
    </footer>
  </body></html>`;
}

/** 1080×1350, the portrait size LinkedIn shows in full. Headline and the top three. */
export function imageHtml(report: PublicReport, locale: ScanLocale, domain: string, date: string, origin: string) {
  const c = COPY[locale];
  const top = report.opportunities.slice(0, 3);
  const items = top
    .map(
      (o, i) => `<li><span class="mono brand n">${String(i + 1).padStart(2, '0')}</span><div><p class="obs">${esc(o.observed)}</p><p class="opp muted">${esc(o.opportunity)}</p></div></li>`
    )
    .join('');
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
    ${base(origin)}
    body { width: 1080px; height: 1350px; padding: 84px 84px 72px; display: flex; flex-direction: column; }
    header { display: flex; justify-content: space-between; align-items: center; }
    header img { height: 40px; }
    .mono { font-size: 15px; }
    h1 { font-size: 64px; line-height: 1.02; letter-spacing: -0.035em; font-weight: 650; margin-top: 90px; }
    .sub { font-size: 24px; margin-top: 22px; }
    ol { list-style: none; margin-top: 64px; }
    li { display: grid; grid-template-columns: 70px 1fr; padding: 30px 0; border-top: 1px solid rgba(11,18,32,0.14); }
    li:last-child { border-bottom: 1px solid rgba(11,18,32,0.14); }
    .n { font-size: 17px; padding-top: 8px; }
    .obs { font-size: 29px; font-weight: 600; line-height: 1.25; }
    .opp { font-size: 22px; line-height: 1.4; margin-top: 8px; }
    .spacer { flex: 1; }
    footer { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; font-size: 16px; line-height: 1.5; }
    .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #1B4FE8; }
    .none { font-size: 30px; margin-top: 64px; }
    .more { font-size: 22px; margin-top: 30px; font-weight: 600; }
  </style></head><body>
    <header><img src="${origin}/brand/aagesen-growth.png" alt="Aagesen Growth"><span class="mono muted">${c.kicker} · ${esc(date)}</span></header>
    <h1>${esc(report.headline)}</h1>
    <p class="sub muted">${esc(report.sub)}</p>
    ${top.length ? `<ol>${items}</ol>` : `<p class="none">${c.none}</p>`}
    ${report.opportunities.length > top.length ? `<p class="more brand">${c.more(report.opportunities.length - top.length)}</p>` : ''}
    <div class="spacer"></div>
    <footer class="muted"><span>${esc(c.confidential(domain, date))}</span><span style="white-space:nowrap" class="brand">aagesengrowth.com</span></footer>
    <div class="bar"></div>
  </body></html>`;
}

async function renderHtml(browser: Browser, html: string, viewport: { width: number; height: number }) {
  const page = await browser.newPage();
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 20000 });
  // Webfonts and the logo come from the site's own origin; wait for both.
  await page.evaluate(`Promise.all([document.fonts.ready, ...Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))])`);
  return page;
}

export async function renderDocuments(
  browser: Browser,
  report: PublicReport,
  locale: ScanLocale,
  domain: string,
  origin: string
): Promise<{ pdf: Uint8Array; png: Uint8Array }> {
  const date = new Date().toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const pdfPage = await renderHtml(browser, reportHtml(report, locale, domain, date, origin), { width: 794, height: 1123 });
  const pdf = await pdfPage.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
  await pdfPage.close();
  const pngPage = await renderHtml(browser, imageHtml(report, locale, domain, date, origin), { width: 1080, height: 1350 });
  const png = await pngPage.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await pngPage.close();
  return { pdf: new Uint8Array(pdf), png: new Uint8Array(png) };
}
