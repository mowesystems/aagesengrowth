import React from 'react';
import { Check, X } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/i18n/useLocale';

/**
 * The operating difference, as two process rails. Before: flows that end in
 * a dead stop. After: one flow that runs to a measurable result, with a
 * signal moving along it.
 */
const BeforeAfter: React.FC = () => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const b = t.beforeAfter;

  return (
    <section className="relative py-22 lg:py-30" aria-labelledby="ba-heading">
      <div className="frame">
        <SectionHead eyebrow={b.eyebrow} index="04">
          <span id="ba-heading">{b.heading}</span>
        </SectionHead>

        <div ref={ref} className={`mt-14 grid gap-10 lg:mt-18 lg:grid-cols-12 lg:gap-x-10 ${inView ? 'is-visible' : ''}`}>
          {/* ----------------------------------------------------- before */}
          <Reveal className="lg:col-span-5">
            <p className="meta">{b.before.label}</p>
            <div className="mt-6 space-y-8">
              {b.before.flows.map((flow, fi) => (
                <ol key={fi} className="relative border-l pl-6" style={{ borderColor: 'var(--line-strong)' }}>
                  {flow.map((step, si) => {
                    const last = si === flow.length - 1;
                    return (
                      <li key={step} className="relative pb-5 last:pb-0">
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[1.85rem] top-1 flex h-4 w-4 items-center justify-center ${
                            last ? 'border border-ink/40 bg-paper text-ink' : 'border border-ink/25 bg-paper'
                          }`}
                        >
                          {last && <X size={10} strokeWidth={2.5} />}
                        </span>
                        <span className={`text-[0.98rem] ${last ? 'font-semibold text-ink' : 'text-muted'}`}>{step}</span>
                      </li>
                    );
                  })}
                </ol>
              ))}
            </div>
          </Reveal>

          {/* ------------------------------------------------------ after */}
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="instrument p-6 sm:p-8">
              <p className="meta-brand">{b.after.label}</p>
              <div className="relative mt-6">
                <svg className="pointer-events-none absolute left-[0.45rem] top-2 h-[calc(100%-1rem)] w-3" viewBox="0 0 12 1000" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 0 L6 1000" pathLength={1} stroke="#1B4FE8" strokeWidth="1.5" className="draw" />
                </svg>
                <svg className="pointer-events-none absolute left-[0.45rem] top-2 h-[calc(100%-1rem)] w-3" viewBox="0 0 12 1000" preserveAspectRatio="none" aria-hidden="true">
                  <circle r="4" className="signal fill-brand" style={{ offsetPath: "path('M6 0 L6 1000')", ['--dur' as string]: '5.5s' }} />
                  <circle r="4" className="signal fill-brand" style={{ offsetPath: "path('M6 0 L6 1000')", ['--dur' as string]: '5.5s', ['--delay' as string]: '2.7s' }} />
                </svg>
                <ol className="relative space-y-4 pl-9">
                  {b.after.flow.map((step, i) => {
                    const last = i === b.after.flow.length - 1;
                    return (
                      <li
                        key={step}
                        className="relative flex items-center justify-between gap-4 transition-[opacity,transform] duration-700 ease-entrance"
                        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transitionDelay: `${i * 110}ms` }}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-9 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full ${
                            last ? 'bg-brand text-paper-2' : 'border-[1.5px] border-brand bg-paper-2'
                          }`}
                        >
                          {last ? <Check size={11} strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                        </span>
                        <span className={`text-[0.98rem] ${last ? 'font-semibold' : ''}`}>{step}</span>
                        <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
