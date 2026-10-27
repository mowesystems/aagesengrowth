import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScan, type ScanSource } from '@/components/scan/ScanContext';
import ScanInput from '@/components/scan/ScanInput';
import ScanSequence from '@/components/scan/ScanSequence';
import ScanResult from '@/components/scan/ScanResult';
import LeadForm from '@/components/scan/LeadForm';
import { useLocale } from '@/i18n/useLocale';

interface GrowthScanProps {
  source: ScanSource;
  id: string;
  size?: 'md' | 'lg';
  /** Wrap the running/result states in an instrument panel. */
  framed?: boolean;
  className?: string;
}

/**
 * The Growth Scan, end to end: input → sequence → result (or the manual
 * fallback). Three of these sit on the homepage and share one scan; the
 * instance that started the scan renders it, the others show a pointer.
 */
const GrowthScan: React.FC<GrowthScanProps> = ({ source, id, size = 'md', framed = true, className = '' }) => {
  const { t } = useLocale();
  const scan = useScan();
  const owns = scan.anchorId === id;
  const active = scan.status !== 'idle';

  // Another instance owns the running scan: point at it.
  if (active && !owns) {
    return (
      <div id={id} className={`scroll-mt-28 ${className}`}>
        <a href={`#${scan.anchorId}`} className="link-line text-[0.95rem]">
          {scan.status === 'running' ? `${t.scan.running} ${scan.domain}…` : `${t.scan.result.eyebrow} · ${scan.domain}`}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (!active) {
    return (
      <div id={id} className={`scroll-mt-28 ${className}`}>
        <ScanInput source={source} anchorId={id} size={size} autoFocusOnHash={source === 'hero'} />
      </div>
    );
  }

  const panel = framed ? 'instrument p-5 sm:p-8 lg:p-10' : '';

  return (
    <div id={id} className={`scroll-mt-28 ${className}`}>
      <div className={panel}>
        {scan.status === 'running' && <ScanSequence />}
        {scan.status === 'done' && <ScanResult />}
        {scan.status === 'error' && (
          <div>
            <p className="meta-brand">{t.scan.result.eyebrow}</p>
            <h3 className="h-section mt-4 text-balance">{t.scan.result.unreachableHeading}</h3>
            <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted">
              {t.scan.result.unreachableBody}
            </p>
            {scan.error?.message && (
              <p className="mt-2 font-mono text-[0.62rem] text-muted">↳ {scan.error.message}</p>
            )}
            <LeadForm
              website={scan.url}
              context={{ 'scan-summary': `${t.scan.result.manualRequested}: ${scan.error?.error ?? 'error'}`, founder: scan.founder ? 'yes' : 'no' }}
              event="growth_scan_lead_submitted"
              source={`scan-manual:${source}`}
              submitLabel={t.scan.result.unreachableCta}
              className="mt-8"
              idPrefix={`manual-${source}`}
            />
            <button type="button" onClick={scan.reset} className="link-line mt-6 text-[0.85rem] text-muted">
              {t.scan.result.rescan}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthScan;
