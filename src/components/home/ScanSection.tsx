import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import GrowthScan from '@/components/scan/GrowthScan';
import { useLocale } from '@/i18n/useLocale';

export const SECTION_SCAN_ID = 'growth-scan-analyse';

/**
 * The scanner's own section: what is analysed, then the control. Sits on a
 * cobalt-tinted ground so it reads as the page's second peak.
 */
const ScanSection: React.FC = () => {
  const { t } = useLocale();
  const s = t.scanSection;

  return (
    <section className="relative overflow-hidden bg-brand-tint/60 py-22 lg:py-30" aria-labelledby="scan-heading">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="frame relative">
        <SectionHead eyebrow={s.eyebrow} index="05" lead={s.lead}>
          <span id="scan-heading">{s.heading}</span>
        </SectionHead>

        <ol className="mt-14 grid gap-px border sm:grid-cols-2 lg:mt-18 lg:grid-cols-3" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--line)' }}>
          {s.analyses.map((item, i) => (
            <Reveal key={item.title} as="li" delay={i * 70} className="bg-paper-2/80 backdrop-blur-sm">
              <div className="flex h-full gap-4 p-5 sm:p-6">
                <span className="index-mark pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[1rem] font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 lg:mt-14" delay={100}>
          <GrowthScan source="section" id={SECTION_SCAN_ID} size="lg" />
        </Reveal>
      </div>
    </section>
  );
};

export default ScanSection;
