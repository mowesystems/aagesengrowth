import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import CallbackForm from '@/components/forms/CallbackForm';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';
import type { WebsiteAssessment } from '@/lib/growthScan/types';

interface WebsiteVerdictProps {
  assessment: WebsiteAssessment;
  scanUrl: string;
  source: string;
}

/**
 * "Dit website begrænser jeres vækst."
 *
 * Shown only when the scan judged the website itself to be the bottleneck,
 * and only with the reasons it actually observed, each with its evidence.
 * Routes to the website packages, or opens the callback form in place with
 * the scanned URL attached.
 */
const WebsiteVerdict: React.FC<WebsiteVerdictProps> = ({ assessment, scanUrl, source }) => {
  const { t, path } = useLocale();
  const w = t.scan.website;
  const [calling, setCalling] = React.useState(false);
  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!calling) return;
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    }, 60);
  }, [calling]);

  if (!assessment.limitsGrowth || assessment.reasons.length === 0) return null;

  return (
    <section
      className="animate-rise mt-12 border-l-2 border-critical bg-critical-tint/60 p-6 sm:p-8"
      aria-labelledby="website-verdict-heading"
      data-testid="website-verdict"
    >
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-critical">{w.eyebrow}</p>
      <h3 id="website-verdict-heading" className="h-section mt-3 text-balance">
        {w.heading}
      </h3>
      <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted">{w.lead}</p>

      <ul className="mt-6 border-b" style={{ borderColor: 'var(--line)' }}>
        {assessment.reasons.map((reason) => (
          <li key={reason.key} className="border-t py-4" style={{ borderColor: 'var(--line)' }}>
            <p className="text-[1rem] font-semibold leading-snug text-ink">{reason.title}</p>
            <p className="mt-1.5 font-mono text-[0.66rem] tracking-[0.03em] text-muted">↳ {reason.evidence}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-measure text-[0.92rem] leading-relaxed text-ink">{w.advice}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          to={`${path('pricing')}#${anchors.websites}`}
          onClick={() => track('website_packages_clicked', { source: `scan:${source}`, cta: 'see_packages' })}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          {w.primary}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        {!calling && (
          <button type="button" onClick={() => setCalling(true)} className="btn btn-outline btn-lg w-full sm:w-auto">
            <Phone size={15} aria-hidden="true" />
            {w.secondary}
          </button>
        )}
      </div>

      {calling && (
        <div ref={formRef} className="animate-rise mt-8 scroll-mt-28 border-t pt-8" style={{ borderColor: 'var(--line)' }}>
          <CallbackForm
            source={`scan-result:${source}`}
            scanUrl={scanUrl}
            idPrefix={`scan-callback-${source}`}
            heading={t.callback.heading}
            body={t.callback.body}
          />
        </div>
      )}
    </section>
  );
};

export default WebsiteVerdict;
