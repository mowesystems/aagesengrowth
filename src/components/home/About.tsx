import React from 'react';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/i18n/useLocale';

/**
 * About.
 *
 * Deliberately short and deliberately unflattering about scale: the
 * positioning only works if the smallness is stated rather than hidden behind
 * "we" and a stock photograph of a meeting. The heading is set in the serif —
 * the wordmark's own species — which is the one place on the page where the
 * company speaks in its own voice rather than about its services.
 */
const About: React.FC = () => {
  const { t } = useLocale();

  return (
    <section id="om" className="scroll-mt-24 py-22 lg:py-30">
      <div className="frame">
        <Reveal>
          <div className="rule flex items-baseline gap-4 pt-5">
            <span className="index-mark shrink-0">08</span>
            <span className="meta-brand">{t.about.eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-14 gap-y-12 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="h-serif text-statement">{t.about.heading}</h2>
          </Reveal>

          <div className="lg:col-span-6">
            {t.about.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 90}>
                <p className={`max-w-prose text-lead text-muted text-pretty ${index > 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <div className="mt-12 grid rule sm:grid-cols-3 sm:gap-x-8">
              {t.about.points.map((point, index) => (
                <Reveal key={point.label} delay={index * 70} className="rule-row py-6 sm:border-b-0">
                  <p className="font-sans text-[1rem] font-semibold">{point.label}</p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted text-pretty">
                    {point.body}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="meta mt-8">{t.about.disclosure}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
