import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { localePath, locales, routeTable } from './src/i18n/config';
import cases from './src/data/cases';
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
      booking: '0.9',
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
      source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineStylesheet(), sitemap()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {},
});
