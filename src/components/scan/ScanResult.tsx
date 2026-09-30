import React from 'react';
import { ArrowRight, Lock, RotateCcw } from 'lucide-react';
import { useScan } from '@/components/scan/ScanContext';
import ScoreRing from '@/components/scan/ScoreRing';
import LeadForm from '@/components/scan/LeadForm';
import WebsiteVerdict from '@/components/scan/WebsiteVerdict';
import CallbackForm from '@/components/forms/CallbackForm';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/i18n/useLocale';
import type { ScanDimension, ScanFinding, Severity } from '@/lib/growthScan/types';

const fill = (template: string, n: number) => template.replace('{n}', String(n));

const severityChip: Record<Severity, string> = {
  critical: 'chip chip-critical',
  opportunity: 'chip chip-opportunity',
  quickwin: 'chip chip-quickwin',
};

const FindingCard: React.FC<{ finding: ScanFinding; index: number }> = ({ finding, index }) => {
  const { t } = useLocale();
  return (
    <li
      className="animate-rise border-t py-5"
      style={{ borderColor: 'var(--line)', animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className={severityChip[finding.severity]}>{t.scan.result.severities[finding.severity]}</span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
          {t.scan.result.dimensions[finding.dimension]}
        </span>
      </div>
      <p className="mt-3 text-[1.02rem] font-semibold leading-snug text-ink">{finding.title}</p>
      <p className="mt-1.5 max-w-prose text-[0.92rem] leading-relaxed text-muted">{finding.body}</p>
      {finding.evidence && (
        <p className="mt-2 font-mono text-[0.62rem] tracking-[0.04em] text-muted">↳ {finding.evidence}</p>
      )}
    </li>
  );
};

/**
 * The result of a scan.
 *
 * Score first, then the four dimensions — two measured, two honestly marked
 * as pending — then the findings, of which three are readable and the rest
 * are shown blurred behind a lock. The lock is the conversion: it opens the
 * lead form in place rather than sending the visitor to another page.
 */
const ScanResult: React.FC = () => {
  const { t } = useLocale();
  const { result, domain, source, founder, reset } = useScan();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [unlocking, setUnlocking] = React.useState(false);
  const [calling, setCalling] = React.useState(false);
  const formRef = React.useRef<HTMLDivElement>(null);
  const r = t.scan.result;

  React.useEffect(() => {
    if (unlocking) {
      window.setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
      }, 60);
    }
  }, [unlocking]);

  if (!result) return null;

  const measuredCount = result.signals.length;
  const shown = result.findings.slice(0, 3);
  const hidden = result.findings.slice(3);
  const lockedCount = hidden.length + result.pending.length + 1; // + competitors, in the full review
  const counts = {
    critical: result.criticalIssues.length,
    opportunity: result.opportunities.length,
    quickwin: result.quickWins.length,
  };

  const dimensions: { key: ScanDimension; value: number | null }[] = [
    { key: 'google', value: result.googleVisibilityScore },
    { key: 'ai', value: result.aiVisibilityScore },
    { key: 'capture', value: result.leadCaptureScore },
    { key: 'trust', value: result.trustScore },
    { key: 'website', value: result.websiteScore },
  ];

  const scanned = new Date(result.scanTimestamp).toLocaleString('da-DK', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const context = {
    'scan-score': String(result.overallScore),
    'scan-summary': [
      ...result.findings.map((f) => `[${f.severity}] ${f.title}`),
      ...(result.website?.limitsGrowth ? [`[website] ${t.scan.website.heading}: ${result.website.reasons.map((r) => r.title).join('; ')}`] : []),
    ].join('\n'),
    'scan-id': result.scanId,
    founder: founder ? 'yes' : 'no',
  };

  return (
    <div ref={ref} className={inView ? 'is-visible' : ''}>
      {/* ---------------------------------------------------------- header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="meta-brand">{r.eyebrow}</p>
          <p className="mt-2 font-mono text-[0.72rem] tracking-[0.04em] text-ink">
            {domain}
            <span className="text-muted"> · {r.timestamp} {scanned}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="link-line -my-2 text-[0.82rem] text-muted"
        >
          <RotateCcw size={13} aria-hidden="true" />
          {r.rescan}
        </button>
      </div>

      {/* ----------------------------------------------------- score row */}
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6 md:col-span-5 md:items-start md:gap-7">
          <ScoreRing
            value={result.overallScore}
            active={inView}
            label={r.scoreLabel}
            sublabel={r.preliminary}
            size={168}
          />
          <div className="min-w-0">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{r.scoreLabel}</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{fill(r.basis, measuredCount)}</p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{r.pendingBasis}</p>
            {result.clientRendered && (
              <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{r.clientRendered}</p>
            )}
          </div>
        </div>

        <ul className="space-y-4 md:col-span-7">
          {dimensions.map(({ key, value }) => {
            const pending = value === null;
            return (
              <li key={key}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.92rem] font-medium">{r.dimensions[key]}</span>
                  {pending ? (
                    <span className="chip chip-pending whitespace-nowrap">
                      <Lock size={10} aria-hidden="true" />
                      {r.pending}
                    </span>
                  ) : (
                    <span className="font-sans text-[1.05rem] font-semibold tabular-nums">
                      {value}
                      <span className="text-[0.75rem] font-normal text-muted"> / 100</span>
                    </span>
                  )}
                </div>
                <div className={`meter mt-2 ${pending ? 'meter-pending' : ''}`}>
                  {!pending && (
                    <span className="meter-fill" style={{ ['--fill' as string]: value / 100 }} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ----------------------------------------------- website verdict */}
      {result.website && (
        <WebsiteVerdict assessment={result.website} scanUrl={result.finalUrl} source={source} />
      )}

      {/* ------------------------------------------------------ findings */}
      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="h-section">{fill(r.findingsHeading, result.findings.length)}</h3>
          <div className="flex flex-wrap gap-2">
            {(['critical', 'opportunity', 'quickwin'] as Severity[]).map((s) => (
              <span key={s} className={severityChip[s]}>
                {counts[s]} {r.severityPlural[s]}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-6 border-b" style={{ borderColor: 'var(--line)' }}>
          {shown.map((finding, i) => (
            <FindingCard key={finding.id} finding={finding} index={i} />
          ))}
        </ul>

        {/* ------------------------------------------------------ locked */}
        <div className="relative mt-2">
          <ul className="locked" aria-hidden="true">
            {(hidden.length ? hidden.slice(0, 3) : shown.slice(0, 2)).map((finding) => (
              <li key={`locked-${finding.id}`} className="border-t py-5" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center gap-3">
                  <span className={severityChip[finding.severity]}>{r.severities[finding.severity]}</span>
                </div>
                <p className="mt-3 text-[1.02rem] font-semibold leading-snug">{finding.title}</p>
                <p className="mt-1.5 max-w-prose text-[0.92rem] text-muted">{finding.body}</p>
              </li>
            ))}
            {result.pending.map((key) => (
              <li key={`locked-${key}`} className="border-t py-5" style={{ borderColor: 'var(--line)' }}>
                <p className="text-[1.02rem] font-semibold">{r.dimensions[key]}</p>
                <p className="mt-1.5 text-[0.92rem] text-muted">{r.pendingBasis}</p>
              </li>
            ))}
          </ul>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-paper-2/40 via-paper-2/85 to-paper-2">
            <div className="instrument mx-3 max-w-md p-5 text-center sm:mx-4 sm:p-8">
              <p className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand">
                <Lock size={12} aria-hidden="true" />
                {fill(r.lockedHeading, lockedCount)}
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{r.lockedBody}</p>
              {!unlocking && (
                <button
                  type="button"
                  onClick={() => setUnlocking(true)}
                  className="btn btn-primary btn-lg mt-6 w-full sm:w-auto"
                >
                  {r.unlockCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ callback path */}
      {!result.website?.limitsGrowth && !unlocking && (
        <div className="mt-8">
          {!calling ? (
            <button type="button" onClick={() => setCalling(true)} className="link-line text-[0.88rem]">
              {t.cta.callback}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          ) : (
            <div className="animate-rise border-t pt-8" style={{ borderColor: 'var(--line)' }}>
              <CallbackForm
                source={`scan-result:${source}`}
                scanUrl={result.finalUrl}
                idPrefix={`scan-cb-${source}`}
                heading={t.callback.heading}
                body={t.callback.body}
              />
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------- lead form */}
      {unlocking && (
        <div ref={formRef} className="animate-rise mt-10 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
          <p className="meta-brand">{t.scan.lead.eyebrow}</p>
          <LeadForm
            website={result.finalUrl}
            context={context}
            event="growth_scan_lead_submitted"
            source={`scan:${source}`}
            heading={t.scan.lead.heading}
            body={t.scan.lead.body}
            className="mt-4"
            idPrefix={`lead-${source}`}
          />
        </div>
      )}
    </div>
  );
};

export default ScanResult;
