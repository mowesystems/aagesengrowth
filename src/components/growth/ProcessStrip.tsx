import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/i18n/useLocale';

/**
 * Scan → Prioritér → Forbedr → Mål → Gentag, as a line with a signal
 * travelling along it.
 */
const ProcessStrip: React.FC = () => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const stages = t.engine.stages;

  return (
    <div ref={ref} className={inView ? 'is-visible' : ''}>
      <div className="relative">
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
  );
};

export default ProcessStrip;
