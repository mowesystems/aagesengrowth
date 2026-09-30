/**
 * What the scan reads from a rendered page.
 *
 * `EXTRACT_SCRIPT` runs inside the page, after the browser has rendered it,
 * scrolled through it (to trigger lazy content) and scrolled back to the top.
 * It is a plain string on purpose: a function passed to page.evaluate would be
 * transpiled by the bundler and could reference helpers that do not exist in
 * the page. Everything it returns is JSON.
 */

export interface PageForm {
  fields: number;
  required: number;
  hasEmail: boolean;
  hasPhone: boolean;
  hasMessage: boolean;
  submit: string;
  shown: boolean;
  inFooter: boolean;
}

export interface PageCta {
  text: string;
  href: string;
  kind: 'phone' | 'quote' | 'booking' | 'contact' | 'email';
  aboveFold: boolean;
  inChrome: boolean;
  inHeader: boolean;
}

export interface PageLink {
  href: string;
  text: string;
  inHeader: boolean;
  inFooter: boolean;
}

export interface PageFacts {
  title: string;
  description: string;
  siteName: string;
  h1: string[];
  lang: string;
  robotsMeta: string;
  canonical: string;
  viewportMeta: boolean;
  overflowPx: number;
  textLength: number;
  text: string;
  footerText: string;
  telLinks: { number: string; aboveFold: boolean; inChrome: boolean; inHeader: boolean }[];
  phonesInText: string[];
  mailto: string[];
  forms: PageForm[];
  ctas: PageCta[];
  links: PageLink[];
  iframes: string[];
  scripts: string[];
  globals: string[];
  jsonLd: unknown[];
  imagesTotal: number;
  imagesNoAlt: number;
  copyrightYear: number | null;
  hasFrameset: boolean;
  hasFlash: boolean;
  loadMs: number;
  viewportWidth: number;
  viewportHeight: number;
}

export const EXTRACT_SCRIPT = String.raw`(() => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const shown = (el) => {
    if (!el || !el.getClientRects || !el.getClientRects().length) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const absTop = (el) => el.getBoundingClientRect().top + window.scrollY;
  const inHeader = (el) => !!el.closest('header, nav, [role=banner], [role=navigation]');
  const inFooter = (el) => !!el.closest('footer, [role=contentinfo]');
  const inChrome = (el) => inHeader(el) || inFooter(el);
  const aboveFold = (el) => {
    if (!shown(el)) return false;
    const r = el.getBoundingClientRect();
    const fixed = (() => { let n = el; while (n && n !== document.body) { const p = getComputedStyle(n).position; if (p === 'fixed' || p === 'sticky') return true; n = n.parentElement; } return false; })();
    const top = fixed ? r.top : absTop(el);
    return top < vh - 8 && r.width > 0 && r.height > 0;
  };
  const textOf = (el) => clean(el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('title') || '');

  const CTA = [
    ['quote', /(tilbud|prisoverslag|beregn pris|prisberegn|få en pris|gratis vurdering|quote|estimate)/i],
    ['booking', /(^|\s)(book|booking|bestil tid|tidsbestilling|besigtigelse|reservér|reserver|appointment|schedule)/i],
    ['phone', /^(ring|ring til os|ring nu|ring op|call|call us|call now)(\s|$|!)/i],
    ['contact', /(kontakt|skriv til|send (en )?besked|send forespørgsel|forespørg|bliv ringet op|ring mig op|contact|get in touch|send (a )?message)/i],
  ];

  const telLinks = [];
  const ctas = [];
  const seen = new Set();
  document.querySelectorAll('a[href], button, [role=button], input[type=submit]').forEach((el) => {
    const href = el.getAttribute('href') || '';
    const text = textOf(el).slice(0, 80);
    if (/^tel:/i.test(href)) {
      const number = href.replace(/^tel:/i, '').replace(/[^\d+]/g, '');
      telLinks.push({ number, aboveFold: aboveFold(el), inChrome: inChrome(el), inHeader: inHeader(el) });
      ctas.push({ text, href, kind: 'phone', aboveFold: aboveFold(el), inChrome: inChrome(el), inHeader: inHeader(el) });
      return;
    }
    if (/^mailto:/i.test(href)) {
      ctas.push({ text, href, kind: 'email', aboveFold: aboveFold(el), inChrome: inChrome(el), inHeader: inHeader(el) });
      return;
    }
    if (!text || text.length > 48) return;
    for (const [kind, re] of CTA) {
      if (re.test(text)) {
        const key = kind + '|' + text + '|' + href + '|' + Math.round(absTop(el));
        if (seen.has(key)) return;
        seen.add(key);
        ctas.push({ text, href, kind, aboveFold: aboveFold(el), inChrome: inChrome(el), inHeader: inHeader(el) });
        return;
      }
    }
  });

  const forms = [];
  document.querySelectorAll('form').forEach((f) => {
    const all = Array.from(f.querySelectorAll('input, textarea, select')).filter((i) => {
      const type = (i.getAttribute('type') || '').toLowerCase();
      if (['hidden', 'submit', 'button', 'image', 'reset'].includes(type)) return false;
      const n = (i.getAttribute('name') || '') + ' ' + (i.id || '');
      if (/honeypot|bot-field|recaptcha|captcha|_gotcha/i.test(n)) return false;
      const cs = getComputedStyle(i);
      if (cs.position === 'absolute' && (parseFloat(cs.left) < -500 || parseFloat(cs.top) < -500)) return false;
      return true;
    });
    const meta = (i) => ((i.getAttribute('name') || '') + ' ' + (i.id || '') + ' ' + (i.getAttribute('placeholder') || '') + ' ' + (i.getAttribute('autocomplete') || '')).toLowerCase();
    const isSearch = all.some((i) => (i.getAttribute('type') || '').toLowerCase() === 'search' || /^(q|s|search|søg|query)$/i.test(i.getAttribute('name') || '')) && all.length <= 2;
    const hasMessage = all.some((i) => i.tagName === 'TEXTAREA');
    const isNewsletter = /nyhedsbrev|newsletter|tilmeld|subscribe/i.test(f.innerText || '') && all.length <= 3 && !hasMessage;
    const isLogin = all.some((i) => (i.getAttribute('type') || '').toLowerCase() === 'password');
    const isCart = /kurv|basket|cart|antal|quantity/i.test(f.getAttribute('action') || '') || /læg i kurv|add to cart|tilføj til kurv/i.test(f.innerText || '');
    if (isSearch || isNewsletter || isLogin || isCart || all.length === 0) return;
    const submitEl = f.querySelector('button[type=submit], input[type=submit], button:not([type])');
    forms.push({
      fields: all.length,
      required: all.filter((i) => i.required || i.getAttribute('aria-required') === 'true').length,
      hasEmail: all.some((i) => (i.getAttribute('type') || '').toLowerCase() === 'email' || /mail/.test(meta(i))),
      hasPhone: all.some((i) => (i.getAttribute('type') || '').toLowerCase() === 'tel' || /tel|phone|telefon|mobil/.test(meta(i))),
      hasMessage,
      submit: submitEl ? textOf(submitEl).slice(0, 40) : '',
      shown: shown(f),
      inFooter: inFooter(f),
    });
  });

  const links = [];
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.href || '';
    if (!/^https?:/i.test(href)) return;
    links.push({ href, text: textOf(a).slice(0, 80), inHeader: inHeader(a), inFooter: inFooter(a) });
  });

  const bodyText = document.body ? (document.body.innerText || '') : '';
  const footer = document.querySelector('footer, [role=contentinfo]');
  const phones = [];
  const phoneRe = /(?:(?:tlf|telefon|tel|ring|mobil|phone|call)[^\d+]{0,12}|\+45\s?)(\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2})|\b(\d{2} \d{2} \d{2} \d{2})\b/gi;
  let m;
  while ((m = phoneRe.exec(bodyText)) && phones.length < 10) {
    const num = (m[1] || m[2] || '').replace(/\D/g, '');
    const before = bodyText.slice(Math.max(0, m.index - 14), m.index).toLowerCase();
    if (num.length === 8 && !/cvr|se-nr|se nr|reg|konto/.test(before)) phones.push(num);
  }

  const jsonLd = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try { jsonLd.push(JSON.parse(s.textContent || '')); } catch (e) {}
  });

  const globals = ['Intercom', '$crisp', 'tidioChatApi', 'Trengo', 'zE', 'HubSpotConversations', 'LiveChatWidget', 'Tawk_API', 'drift', 'smartsupp', 'userlike', 'Weply', 'botpress'].filter((g) => typeof window[g] !== 'undefined');

  const imgs = Array.from(document.images);
  const copy = /(?:©|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/i.exec(bodyText);
  const nav = performance.getEntriesByType('navigation')[0];
  // Real sideways scroll, not just a wide element: an off-canvas menu inside
  // overflow-x:hidden makes scrollWidth large without the visitor ever
  // being able to scroll to it.
  window.scrollTo(4000, window.scrollY);
  const sideways = Math.round(window.scrollX || document.documentElement.scrollLeft || 0);
  window.scrollTo(0, 0);

  return {
    title: clean(document.title),
    description: clean((document.querySelector('meta[name="description"]') || {}).content || ''),
    siteName: clean((document.querySelector('meta[property="og:site_name"]') || {}).content || ''),
    h1: Array.from(document.querySelectorAll('h1')).map((h) => clean(h.innerText)).filter(Boolean).slice(0, 5),
    lang: document.documentElement.getAttribute('lang') || '',
    robotsMeta: clean((document.querySelector('meta[name="robots"]') || {}).content || '').toLowerCase(),
    canonical: (document.querySelector('link[rel="canonical"]') || {}).href || '',
    viewportMeta: !!document.querySelector('meta[name="viewport"]'),
    overflowPx: sideways,
    textLength: clean(bodyText).length,
    text: clean(bodyText).slice(0, 20000),
    footerText: footer ? clean(footer.innerText).slice(0, 3000) : '',
    telLinks,
    phonesInText: Array.from(new Set(phones)),
    mailto: Array.from(document.querySelectorAll('a[href^="mailto:"]')).map((a) => (a.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0]).slice(0, 10),
    forms,
    ctas,
    links: links.slice(0, 400),
    iframes: Array.from(document.querySelectorAll('iframe')).map((f) => f.src || f.getAttribute('data-src') || '').filter(Boolean).slice(0, 40),
    scripts: Array.from(document.scripts).map((s) => s.src).filter(Boolean).slice(0, 120),
    globals,
    jsonLd,
    imagesTotal: imgs.length,
    imagesNoAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
    copyrightYear: copy ? parseInt(copy[1], 10) : null,
    hasFrameset: !!document.querySelector('frameset, frame'),
    hasFlash: !!document.querySelector('embed[src$=".swf"], object[type*="flash"]'),
    loadMs: nav ? Math.round(nav.loadEventEnd || nav.domContentLoadedEventEnd || 0) : 0,
    viewportWidth: vw,
    viewportHeight: vh,
  };
})()`;
