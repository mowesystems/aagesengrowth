import React from 'react';
import Reveal from '@/components/ui/Reveal';
import GrowthScan from '@/components/scan/GrowthScan';
import { useLocale } from '@/i18n/useLocale';

export const FINAL_SCAN_ID = 'growth-scan-afslutning';

/**
 * The close. Back to the scanner, on ink, with the signal's ambient light
 * behind it. No "contact us": the action is the same as it was at the top.
 */
const FinalScan: React.FC = () => {
  const { t } = useLocale();

  return (
    <section className="on-dark relative overflow-hidden py-24 lg:py-38" aria-labelledby="final-heading">
      <div className="ambient-lit pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-lines-lit pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="frame relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-10">
            <p className="meta-lit">{t.final.eyebrow}</p>
            <h2 id="final-heading" className="h-statement mt-6 text-balance">
              {t.final.heading}
            </h2>
            <p className="mt-6 max-w-measure text-lead text-muted-lit">{t.final.lead}</p>
          </Reveal>
        </div>
        <Reveal className="mt-10 lg:mt-14" delay={120}>
          <GrowthScan source="final" id={FINAL_SCAN_ID} size="lg" />
        </Reveal>
      </div>
    </section>
  );
};

export default FinalScan;
