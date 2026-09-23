import React from 'react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { useInView } from '@/hooks/useInView';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

/**
 * Growth Engine as a system.
 *
 * Six stages on one line with a signal running through them, then the four
 * modules that do the work. The stages are the product's spine; the modules
 * hang off it. Neither is a card grid of services.
 */
const Engine: React.FC = () => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const stages = t.engine.stages;

  return (
    <section id={homeAnchors.engine} className="relative scroll-mt-20 py-22 lg:py-30" aria-labelledby="engine-heading">
      <div className="frame">
        <SectionHead eyebrow={t.engine.eyebrow} index="02" lead={t.engine.lead}>
          <span id="engine-heading">{t.engine.heading}</span>
        </SectionHead>

        {/* ------------------------------------------------------ pipeline */}
        <div ref={ref} className={`mt-14 lg:mt-18 ${inView ? 'is-visible' : ''}`}>
          <div className="relative">
            {/* the line, desktop */}
            <svg
              className="pointer-events-none absolute left-0 top-[1.05rem] hidden h-[3px] w-full lg:block"
              viewBox="0 0 1000 3"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 1.5 L1000 1.5" pathLength={1} stroke="rgba(11,18,32,0.18)" strokeWidth="1" className="draw" />
            </svg>
            <svg className="pointer-events-none absolute left-0 top-0 hidden h-[2.1rem] w-full lg:block" viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
              <circle r="4" className="signal fill-brand" style={{ offsetPath: "path('M0 17 L1000 17')", ['--dur' as string]: '7s' }} />
              <circle r="4" className="signal fill-brand" style={{ offsetPath: "path('M0 17 L1000 17')", ['--dur' as string]: '7s', ['--delay' as string]: '3.5s' }} />
            </svg>

            <ol className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
              {stages.map((stage, i) => (
                <li key={stage.key} className="relative">
                  <div className="flex items-center gap-3 lg:block">
                    <span
                      className="relative z-10 flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center border bg-paper font-mono text-[0.62rem] font-medium tracking-[0.1em] text-ink transition-colors duration-500"
                      style={{ borderColor: 'var(--line-strong)', transitionDelay: `${i * 120}ms` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="lg:mt-5">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand">{stage.label}</p>
                      <p className="mt-1 text-[0.95rem] font-semibold leading-snug">{stage.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ------------------------------------------------------- modules */}
        <div className="mt-16 grid gap-px border lg:mt-22 lg:grid-cols-4" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--line)' }}>
          {t.engine.modules.map((module, i) => (
            <Reveal key={module.key} delay={i * 90} className="bg-paper">
              <article className="group relative h-full p-6 transition-colors duration-500 hover:bg-paper-2 sm:p-8">
                <span aria-hidden="true" className="absolute left-0 top-0 h-0 w-px bg-brand transition-[height] duration-500 ease-entrance group-hover:h-full" />
                <div className="flex items-baseline justify-between">
                  <span className="index-mark">{module.index}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-sans text-title font-semibold">{module.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{module.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Engine;
