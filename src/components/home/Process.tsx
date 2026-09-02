import React from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import { useLocale } from '@/i18n/useLocale';

/**
 * How we work.
 *
 * Four steps read left to right on desktop and top to bottom on a phone, with
 * the step number set large enough to act as the structure. The vertical rules
 * between columns are what make it a sequence rather than four boxes; they are
 * dropped below lg, where the rules would run the wrong way.
 */
const Process: React.FC = () => {
  const { t } = useLocale();

  return (
    <section id="proces" className="scroll-mt-24 py-22 lg:py-30">
      <div className="frame">
        <SectionHead eyebrow={t.process.eyebrow} index="07" lead={t.process.lead}>
          {t.process.heading}
        </SectionHead>

        <ol className="mt-16 grid rule sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:border-t-2 lg:border-ink">
          {t.process.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.label}
              delay={index * 90}
              className={`rule-row py-9 lg:border-b-0 lg:pb-0 lg:pt-10 ${
                index > 0 ? 'lg:border-l lg:border-ink/12 lg:pl-8' : 'lg:pr-8'
              } ${index > 0 && index < 3 ? 'lg:pr-8' : ''} ${
                index % 2 === 1 ? 'sm:border-l sm:border-ink/12 sm:pl-8 lg:pl-8' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="block font-sans text-[3.25rem] font-semibold leading-none tracking-[-0.05em] text-brand/25"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-sans text-title font-semibold">{step.label}</h3>
              <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
