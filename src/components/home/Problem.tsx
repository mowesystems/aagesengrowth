import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import LeakDiagram from '@/components/growth/LeakDiagram';
import { useLocale } from '@/i18n/useLocale';

/**
 * The two leaks. Text on the left, the diagram running full width beneath —
 * the argument is made by the diagram, the copy only names the parts.
 */
const Problem: React.FC = () => {
  const { t } = useLocale();

  return (
    <section className="relative py-22 lg:py-30" aria-labelledby="problem-heading">
      <div className="frame">
        <SectionHead eyebrow={t.problem.eyebrow} index="01" lead={t.problem.lead}>
          <span id="problem-heading">{t.problem.heading}</span>
        </SectionHead>

        <div className="mt-14 grid gap-10 lg:mt-18 lg:grid-cols-12 lg:gap-x-8">
          {t.problem.leaks.map((leak, i) => (
            <Reveal key={leak.index} delay={i * 110} className="lg:col-span-4">
              <article className="rule pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="index-mark">{leak.index}</span>
                  <h3 className="font-sans text-title font-semibold">{leak.title}</h3>
                </div>
                <p className="mt-4 max-w-measure text-[0.95rem] leading-relaxed text-muted">{leak.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={leak.title}>
                  {leak.items.map((item) => (
                    <li key={item} className="chip chip-pending min-h-7 normal-case tracking-[0.04em] text-ink">
                      <span className="text-muted" aria-hidden="true">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 lg:mt-22" delay={120}>
          <div className="instrument px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
            <LeakDiagram />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Problem;
