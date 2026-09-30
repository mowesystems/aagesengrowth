import React from 'react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Problem from '@/components/home/Problem';
import ProductUI from '@/components/home/ProductUI';
import Fit from '@/components/home/Fit';
import TwoPaths from '@/components/home/TwoPaths';
import ProcessStrip from '@/components/growth/ProcessStrip';
import FaqBlock from '@/components/FaqBlock';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

/**
 * "Sådan virker det": the explanation the homepage no longer carries.
 *
 * The customer journey and where it leaks, the process, what can be
 * improved (as examples, implemented as needed), what the overview can look
 * like, who it fits, and the questions people ask about it.
 */
const HowItWorks: React.FC = () => {
  const { t, path } = useLocale();
  const h = t.how;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: h.title,
    url: `${company.domain}${path('how')}`,
    description: h.description,
  };

  return (
    <>
      <SEOHead title={h.title} description={h.description} schema={schema} />
      <PageHero eyebrow={h.eyebrow} title={h.heading} lead={h.lead} />

      <Problem />

      {/* ---------------------------------------------------------- process */}
      <section className="py-20 lg:py-26" aria-labelledby="process-heading">
        <div className="frame">
          <SectionHead eyebrow={t.engine.eyebrow} index="02" lead={t.engine.lead}>
            <span id="process-heading">{t.engine.heading}</span>
          </SectionHead>
          <div className="mt-14 lg:mt-18">
            <ProcessStrip />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ areas */}
      <section className="relative overflow-hidden bg-brand-tint/60 py-20 lg:py-26" aria-labelledby="areas-heading">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="frame relative">
          <SectionHead eyebrow={h.areas.eyebrow} index="03" lead={h.areas.lead}>
            <span id="areas-heading">{h.areas.heading}</span>
          </SectionHead>

          <ul
            className="mt-14 grid gap-px border sm:grid-cols-2 lg:mt-18 lg:grid-cols-3"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--line)' }}
          >
            {h.areas.items.map((area, i) => (
              <Reveal key={area.title} as="li" delay={i * 60} className="bg-paper-2/85 backdrop-blur-sm">
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[1.05rem] font-semibold leading-snug">{area.title}</h3>
                  </div>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{area.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {area.examples.map((example) => (
                      <li key={example} className="chip chip-pending min-h-6 normal-case tracking-[0.03em] text-ink">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-8" delay={80}>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">{h.areas.note}</p>
          </Reveal>

          <Reveal className="mt-12 lg:mt-16" delay={100}>
            <div className="instrument grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
              <p className="meta-brand lg:col-span-4">{h.areas.modulesHeading}</p>
              <p className="max-w-measure text-[1rem] leading-relaxed text-ink lg:col-span-8">{h.areas.modulesBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- overview */}
      <section className="py-20 lg:py-26" aria-labelledby="overview-heading">
        <div className="frame">
          <SectionHead eyebrow={h.overview.eyebrow} index="04" lead={h.overview.lead}>
            <span id="overview-heading">{h.overview.heading}</span>
          </SectionHead>
          <Reveal className="mt-14 lg:mt-18" delay={100}>
            <ProductUI />
          </Reveal>
        </div>
      </section>

      <Fit />

      <FaqBlock ids={['software', 'decided', 'automation']} eyebrow={h.faq.eyebrow} heading={h.faq.heading} index="06" />

      <TwoPaths source="how" />
    </>
  );
};

export default HowItWorks;
