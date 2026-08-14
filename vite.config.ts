import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineStylesheet()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {},
});
