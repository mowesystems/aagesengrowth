import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import GrowthScan from '@/components/scan/GrowthScan';
import { useLocale } from '@/i18n/useLocale';

export const SECTION_SCAN_ID = 'growth-scan-analyse';

/** The scanner again, early: the page's main lead mechanism. */
const HomeScan: React.FC = () => {
  const { t } = useLocale();
  const s = t.home.scan;

  return (
    <section className="relative overflow-hidden bg-brand-tint/60 py-20 lg:py-26" aria-labelledby="scan-heading">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="frame relative">
        <SectionHead eyebrow={s.eyebrow} index="03" lead={s.lead}>
          <span id="scan-heading">{s.heading}</span>
        </SectionHead>
        <Reveal className="mt-10 lg:mt-14" delay={100}>
          <GrowthScan source="section" id={SECTION_SCAN_ID} size="lg" />
        </Reveal>
      </div>
    </section>
  );
};

export default HomeScan;
