import React from 'react';
import { ArrowRight, Download, FileText, Image as ImageIcon, Lock, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScan } from '@/components/scan/ScanContext';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';
import { fileUrl } from '@/lib/growthScan/client';

/**
 * The Growth Scan result: a short report a business owner can read in under
 * a minute.
 *
 * A personal headline, at most five opportunities (what we saw, what it means),
 * one recommendation with one call to action, an honest line about what a free
 * scan cannot see, and the report to keep as a PDF or an image. No scores, no
 * severity labels, no technical vocabulary — that all lives in the internal view.
 */
const ScanResult: React.FC = () => {
  const { t, locale, path } = useLocale();
  const { result, domain, source, reset } = useScan();
  const r = t.scan.result;
  const report = result?.report?.[locale];
  if (!result || !report) return null;

  const scanned = new Date(result.finishedAt ?? result.createdAt).toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const bookingHref = `${path('booking')}?scan=${encodeURIComponent(result.id)}&site=${encodeURIComponent(result.finalUrl ?? result.url)}`;
  const filesReady = Boolean(result.files?.pdf);
  // The documents are generated in the language the scan was started in.
  const filesInOtherLanguage = result.locale !== locale;

  return (
    <article className="animate-rise" aria-labelledby="scan-report-heading" data-testid="scan-report">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="meta-brand">
          {r.eyebrow} · {domain} · {scanned}
        </p>
        <button type="button" onClick={reset} className="link-line -my-2 text-[0.82rem] text-muted">
          <RotateCcw size={13} aria-hidden="true" />
          {r.rescan}
        </button>
      </div>

      <h3 id="scan-report-heading" className="h-section mt-5 max-w-[26ch] text-balance">
        {report.headline}
      </h3>
      <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted">{report.sub}</p>

      {report.opportunities.length > 0 && (
        <ol className="mt-8 border-b" style={{ borderColor: 'var(--line)' }}>
          {report.opportunities.map((o, i) => (
            <li
              key={o.id}
              className="animate-rise grid grid-cols-[2.25rem_1fr] gap-x-3 border-t py-5 sm:grid-cols-[3rem_1fr]"
              style={{ borderColor: 'var(--line)', animationDelay: `${i * 80}ms` }}
            >
              <span className="index-mark pt-1 text-brand">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">{r.areas[o.area]}</p>
                <p className="mt-2 text-[1.02rem] font-semibold leading-snug text-ink">{o.observed}</p>
                <p className="mt-1.5 max-w-prose text-[0.95rem] leading-relaxed text-muted">{o.opportunity}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <section className="mt-8 border-l-2 border-brand bg-brand-tint/70 p-5 sm:p-7" aria-labelledby="scan-reco-heading">
        <h4 id="scan-reco-heading" className="meta-brand">
          {r.recommendation}
        </h4>
        <p className="mt-3 max-w-measure text-[1rem] leading-relaxed text-ink">{report.recommendation.text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            to={bookingHref}
            onClick={() => track('primary_cta_clicked', { source: `scan-result:${source}`, cta: 'book_growth_engine', kind: report.recommendation.kind })}
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            {r.cta}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {report.recommendation.kind === 'website' && (
            <Link
              to={`${path('pricing')}#${anchors.websites}`}
              onClick={() => track('website_packages_clicked', { source: `scan:${source}`, cta: 'see_packages' })}
              className="link-line text-[0.92rem]"
            >
              {r.websiteCta}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="scan-notseen-heading">
        <h4 id="scan-notseen-heading" className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          <Lock size={11} aria-hidden="true" />
          {r.notSeen}
        </h4>
        <ul className="mt-3 space-y-1.5">
          {report.notSeen.map((line) => (
            <li key={line} className="max-w-prose text-[0.88rem] leading-relaxed text-muted">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t pt-6" style={{ borderColor: 'var(--line)' }} aria-labelledby="scan-save-heading">
        <h4 id="scan-save-heading" className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink">
          <Download size={12} aria-hidden="true" />
          {r.save}
        </h4>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          {(['pdf', 'png'] as const).map((kind) =>
            filesReady ? (
              <a
                key={kind}
                href={fileUrl(result.id, kind)}
                download
                onClick={() => track('growth_scan_saved', { kind, source })}
                className="btn btn-outline w-full sm:w-auto"
              >
                {kind === 'pdf' ? <FileText size={15} aria-hidden="true" /> : <ImageIcon size={15} aria-hidden="true" />}
                {kind === 'pdf' ? r.savePdf : r.saveImage}
                {filesInOtherLanguage && <span className="font-mono text-[0.6rem] uppercase">({result.locale})</span>}
              </a>
            ) : (
              <span key={kind} className="btn btn-outline pointer-events-none w-full opacity-60 sm:w-auto" aria-disabled="true">
                {kind === 'pdf' ? <FileText size={15} aria-hidden="true" /> : <ImageIcon size={15} aria-hidden="true" />}
                {r.preparing}
              </span>
            )
          )}
        </div>
        <p className="mt-3 max-w-prose text-[0.8rem] leading-relaxed text-muted">{r.privacyNote}</p>
      </section>
    </article>
  );
};

export default ScanResult;
