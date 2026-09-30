import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/i18n/useLocale';

/**
 * The problem, in two cards: they don't find you, you don't catch them.
 * The longer three-stage journey and the before/after diagram live on
 * "Sådan virker det".
 */
const HomeProblem: React.FC = () => {
  const { t } = useLocale();
  const p = t.home.problem;

  return (
    <section className="relative py-20 lg:py-26" aria-labelledby="problem-heading">
      <div className="frame">
        <SectionHead eyebrow={p.eyebrow} index="01">
          <span id="problem-heading">{p.heading}</span>
        </SectionHead>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-x-10">
          {p.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 110}>
              <article className="rule pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="index-mark">{item.index}</span>
                  <h3 className="font-sans text-title font-semibold">{item.title}</h3>
                </div>
                <p className="mt-4 max-w-measure text-[0.98rem] leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={item.title}>
                  {item.items.map((label) => (
                    <li key={label} className="chip chip-pending min-h-7 normal-case tracking-[0.04em] text-ink">
                      <span className="text-muted" aria-hidden="true">×</span>
                      {label}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProblem;
