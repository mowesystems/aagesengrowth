import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { localePath, locales, routeTable, type Locale, type RouteKey } from './src/i18n/config';
import cases from './src/data/cases';
import da from './src/i18n/dict/da';
import en from './src/i18n/dict/en';
import { buildSiteUrl } from './src/config/site';

const SITE_URL = buildSiteUrl();

/**
 * Inlines the built stylesheet into index.html.
 *
 * This is a client-rendered single-page app, so the critical path is
 * HTML -> CSS -> JS -> first paint. The stylesheet is the only render-blocking
 * request besides the entry module, and at ~9 kB gzipped it is cheaper to ship
 * inside the document than to spend a round trip fetching it. Nothing else
 * references it, so the emitted file is dropped rather than left orphaned.
 *
 * Kept deliberately narrow: it only touches a single CSS asset, and leaves the
 * bundle untouched if the build ever produces more than one.
 */
const inlineStylesheet = (): Plugin => ({
  name: 'aagesen-inline-stylesheet',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const cssFiles = Object.keys(bundle).filter((file) => file.endsWith('.css'));
    const htmlFile = Object.keys(bundle).find((file) => file.endsWith('index.html'));
    if (cssFiles.length !== 1 || !htmlFile) return;

    const css = bundle[cssFiles[0]];
    const html = bundle[htmlFile];
    if (css.type !== 'asset' || html.type !== 'asset') return;
    if (typeof css.source !== 'string' || typeof html.source !== 'string') return;

    const linkPattern = new RegExp(
      `\\s*<link[^>]+href="[^"]*${cssFiles[0].split('/').pop()}"[^>]*>`,
      'g'
    );
    if (!linkPattern.test(html.source)) return;

    html.source = html.source
      .replace(linkPattern, '')
      .replace('</head>', `    <style>${css.source}</style>\n  </head>`);

    delete bundle[cssFiles[0]];
  },
});

/**
 * Emits sitemap.xml from the route table rather than from a hand-kept file.
 *
 * The old sitemap listed Danish-only URLs on a domain the site is not served
 * from, and had already drifted from the routes that existed. Generating it
 * means a page cannot be added to the router and forgotten here, and every
 * entry carries `xhtml:link` alternates so the three language versions are
 * declared as translations of each other rather than as duplicates.
 */
const sitemap = (): Plugin => ({
  name: 'aagesen-sitemap',
  apply: 'build',
  generateBundle() {
    const priority: Record<string, string> = {
      home: '1.0',
      websites: '0.9',
      scan: '0.9',
      pricing: '0.9',
      how: '0.8',
      booking: '0.8',
      faq: '0.6',
      work: '0.6',
      privacy: '0.3',
      cookies: '0.3',
    };

    type Entry = { path: string; alternates: string[]; priority: string; changefreq: string };

    const entries: Entry[] = routeTable.map(({ key, path }) => ({
      path,
      alternates: locales.map((locale) => localePath(locale, key)),
      priority: priority[key] ?? '0.5',
      changefreq: key === 'home' ? 'weekly' : key === 'privacy' || key === 'cookies' ? 'yearly' : 'monthly',
    }));

    cases.forEach((item) => {
      locales.forEach((locale) => {
        entries.push({
          path: localePath(locale, 'work', item.slug),
          alternates: locales.map((alt) => localePath(alt, 'work', item.slug)),
          priority: '0.7',
          changefreq: 'monthly',
        });
      });
    });

    const hreflangs: Record<string, string> = { da: 'da-DK', en: 'en' };

    const body = entries
      .map((entry) => {
        const alternates = entry.alternates
          .map(
            (href, index) =>
              `    <xhtml:link rel="alternate" hreflang="${hreflangs[locales[index]]}" href="${SITE_URL}${href}"/>`
          )
          .concat(
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${entry.alternates[0]}"/>`
          )
          .join('\n');

        return [
          '  <url>',
          `    <loc>${SITE_URL}${entry.path}</loc>`,
          alternates,
          `    <changefreq>${entry.changefreq}</changefreq>`,
          `    <priority>${entry.priority}</priority>`,
          '  </url>',
        ].join('\n');
      })
      .join('\n');

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`,
    });

    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\nDisallow: /intern/\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    });
  },
});


/**
 * Writes a real HTML file for every route, with that route's own head.
 *
 * The app renders in the browser, so without this every address answers with
 * the homepage's title, description and canonical until JavaScript has run.
 * Search engines that read the first response (and every link preview) would
 * see one page repeated. Each file is the built index.html with the head
 * swapped; the body and scripts are untouched, so the app boots exactly as
 * before. Netlify serves an existing file before the SPA fallback rewrite.
 *
 * The titles and descriptions come from the same dictionary fields the pages
 * pass to SEOHead, so the two cannot drift apart.
 */
const prerenderHeads = (): Plugin => {
  let outDir = 'dist';
  const dicts = { da, en } as const;
  const hreflang: Record<Locale, string> = { da: 'da-DK', en: 'en' };
  const ogLocale: Record<Locale, string> = { da: 'da_DK', en: 'en_US' };

  const metaFor = (locale: Locale, key: RouteKey): { title: string; description: string } => {
    const t = dicts[locale];
    switch (key) {
      case 'home': return { title: t.meta.homeTitle, description: t.meta.homeDescription };
      case 'websites': return { title: t.websitesPage.title, description: t.websitesPage.description };
      case 'how': return { title: t.how.title, description: t.how.description };
      case 'pricing': return { title: t.pricing.title, description: t.pricing.description };
      case 'scan': return { title: t.scanPage.title, description: t.scanPage.description };
      case 'booking': return { title: t.pages.booking.title, description: t.pages.booking.description };
      case 'faq': return { title: t.faqPage.title, description: t.faqPage.description };
      case 'work': return { title: t.pages.work.title, description: t.pages.work.description };
      case 'privacy': return { title: t.legal.privacyTitle, description: t.legal.privacyDescription };
      case 'cookies': return { title: t.legal.cookiesTitle, description: t.legal.cookiesDescription };
    }
  };

  const esc = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const withHead = (
    html: string,
    locale: Locale,
    path: string,
    alternates: Record<Locale, string>,
    title: string,
    description: string
  ) => {
    const full = title.includes('Aagesen Growth') ? title : `${title} — Aagesen Growth`;
    const url = `${SITE_URL}${path}`;
    const links = [
      ...locales.map((alt) => `<link rel="alternate" hreflang="${hreflang[alt]}" href="${SITE_URL}${alternates[alt]}" />`),
      `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${alternates.da}" />`,
    ].join('\n    ');

    return html
      .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(full)}</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`)
      .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
      .replace(/(\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>)+/, `\n    ${links}`)
      .replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${ogLocale[locale]}" />`)
      .replace(/<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${ogLocale[locale === 'da' ? 'en' : 'da']}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(full)}" />`)
      .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(description)}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(full)}" />`)
      .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  };

  const write = (path: string, html: string) => {
    if (path === '/') {
      writeFileSync(join(outDir, 'index.html'), html);
      return;
    }
    // A flat file (/pris -> pris.html) rather than pris/index.html, so Netlify
    // serves the address as written instead of redirecting to a trailing slash.
    const file = join(outDir, `${path.slice(1)}.html`);
    mkdirSync(join(file, '..'), { recursive: true });
    writeFileSync(file, html);
  };

  return {
    name: 'aagesen-prerender-heads',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');

      routeTable.forEach(({ locale, key, path }) => {
        const { title, description } = metaFor(locale, key);
        const alternates = Object.fromEntries(locales.map((alt) => [alt, localePath(alt, key)])) as Record<Locale, string>;
        write(path, withHead(template, locale, path, alternates, title, description));
      });

      cases.forEach((item) => {
        locales.forEach((locale) => {
          const copy = dicts[locale].work.cases[item.id];
          if (!copy) return;
          const path = localePath(locale, 'work', item.slug);
          const alternates = Object.fromEntries(
            locales.map((alt) => [alt, localePath(alt, 'work', item.slug)])
          ) as Record<Locale, string>;
          write(path, withHead(template, locale, path, alternates, `${item.client}: ${copy.strapline.replace(/\.$/, '')} | Aagesen Growth`, copy.summary));
        });
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineStylesheet(), sitemap(), prerenderHeads()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {},
});
