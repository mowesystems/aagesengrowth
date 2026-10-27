/**
 * Run a Growth Scan from the command line, without Netlify.
 *   npx tsx scripts/scan-local.ts https://example.dk [--json]
 */
import { launchBrowser } from '../netlify/scan-engine/browser';
import { runScan } from '../netlify/scan-engine/run';

const url = new URL(/^https?:/.test(process.argv[2]) ? process.argv[2] : `https://${process.argv[2]}`);
const browser = await launchBrowser();
try {
  const out = await runScan(browser, url, () => undefined);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    for (const locale of ['da', 'en'] as const) {
      const r = out.report[locale];
      console.log(`\n=== ${locale.toUpperCase()} ===\n${r.headline}\n${r.sub}`);
      r.opportunities.forEach((o, i) => console.log(`${i + 1}. [${o.area}] ${o.observed}\n   ${o.opportunity}`));
      console.log(`→ ${r.recommendation.kind}: ${r.recommendation.text}`);
    }
    console.log('\n=== INTERNAL ===');
    out.internal.findings.forEach((f) => console.log(`${f.shown ? '*' : f.public ? '+' : '-'} ${f.id} ${f.area} ${f.confidence} ${f.score} | ${f.evidence.join(' / ')}`));
    console.log('justified:', out.websiteJustified, out.internal.websiteReasons, '| ms', out.internal.durationMs);
    console.log('notes:', out.internal.notes);
    console.log('starter:', out.internal.conversationStarter);
  }
} finally {
  await browser.close();
}
