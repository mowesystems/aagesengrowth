import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

const HowItWorks: React.FC = () => {
  const { t } = useLocale();
  const h = t.how;

  return (
    <section id={homeAnchors.how} className="scroll-mt-20 py-22 lg:py-30" aria-labelledby="how-heading">
      <div className="frame">
        <SectionHead eyebrow={h.eyebrow} index="06">
          <span id="how-heading">{h.heading}</span>
        </SectionHead>

        <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-18 lg:grid-cols-4">
          {h.steps.map((step, i) => (
            <Reveal key={step.index} as="li" delay={i * 100}>
              <div className="rule pt-6">
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-brand">{step.index}</span>
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em]">{step.title}</h3>
                </div>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
