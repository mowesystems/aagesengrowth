import React from 'react';
import { Check, Lock } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import GrowthScan from '@/components/scan/GrowthScan';
import FaqBlock from '@/components/FaqBlock';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

export const PAGE_SCAN_ID = 'growth-scan-side';

/**
 * The Growth Scan page: the scanner first, then an honest account of what
 * it measures automatically, what only the full review covers, and what
 * happens afterwards.
 */
const ScanPage: React.FC = () => {
  const { t, path } = useLocale();
  const s = t.scanPage;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: s.title,
    url: `${company.domain}${path('scan')}`,
    description: s.description,
  };

  return (
    <>
      <SEOHead title={s.title} description={s.description} schema={schema} />
      <PageHero eyebrow={s.eyebrow} title={s.heading} lead={s.lead} />

      <section className="relative overflow-hidden bg-brand-tint/60 py-16 lg:py-20" aria-label={t.scan.cta}>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="frame relative">
          <GrowthScan source="page" id={PAGE_SCAN_ID} size="lg" />
        </div>
      </section>

      <section className="py-20 lg:py-26" aria-labelledby="scan-measures-heading">
        <div className="frame">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
            <Reveal className="lg:col-span-7">
              <h2 id="scan-measures-heading" className="meta-brand">{s.measuredHeading}</h2>
              <ul className="mt-5 rule">
                {s.measured.map((item) => (
                  <li key={item.title} className="rule-row flex items-start gap-4 py-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>
                      <span className="block text-[1rem] font-semibold leading-snug">{item.title}</span>
                      <span className="mt-1 block text-[0.92rem] leading-relaxed text-muted">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={100}>
              <h2 className="meta">{s.reviewHeading}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.review.map((item) => (
                  <li key={item} className="chip chip-pending min-h-8 normal-case tracking-[0.04em] text-ink">
                    <Lock size={10} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-4" aria-labelledby="scan-after-heading">
        <div className="frame">
          <SectionHead eyebrow={s.afterHeading}>
            <span id="scan-after-heading">{s.afterHeading}</span>
          </SectionHead>
          <ol className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-3">
            {s.after.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 90}>
                <div className="rule pt-5">
                  <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-sans text-title font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FaqBlock ids={['after-scan', 'website', 'guarantee']} eyebrow={s.faq.eyebrow} heading={s.faq.heading} />
    </>
  );
};

export default ScanPage;
