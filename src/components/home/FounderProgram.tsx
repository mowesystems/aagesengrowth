import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import founderProgram from '@/config/founderProgram';
import { useLocale } from '@/i18n/useLocale';
import { useScan } from '@/components/scan/ScanContext';
import { track } from '@/lib/analytics';
import { HERO_SCAN_ID } from '@/components/home/Hero';

/**
 * The launch offer. Rendered only while `founderProgram.enabled` is true;
 * delete that flag's value and this component renders nothing. Cobalt ground
 * so it is the one block on the page in the brand colour — early access, not
 * a discount sticker.
 */
const FounderProgram: React.FC = () => {
  const { t, price } = useLocale();
  const { markFounder } = useScan();
  const f = t.founder;

  if (!founderProgram.enabled) return null;

  const onClick = () => {
    markFounder();
    track('founder_program_clicked', { placement: 'section' });
  };

  return (
    <section className="pb-22 lg:pb-30" aria-label={f.ariaLabel}>
      <div className="frame">
        <Reveal>
          <div className="relative overflow-hidden bg-brand text-paper-2">
            <div className="grid-lines-lit pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-7">
                <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-paper-2/75">
                  {f.eyebrow} · {founderProgram.seats} {f.seatsLabel}
                </p>
                <h2 className="h-display mt-5 text-balance">{f.heading}</h2>
                <p className="mt-5 max-w-measure text-[0.98rem] leading-relaxed text-paper-2/85">{f.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {f.conditions.map((c) => (
                    <li key={c} className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper-2/80">
                      — {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between border-t border-paper-2/20 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="font-sans text-[2.4rem] font-semibold leading-none tracking-[-0.035em] tabular-nums sm:text-[2.8rem]">{price(founderProgram.monthly)}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{t.pricing.monthlyLabel} · {f.duration}</p>
                  </div>
                  <div>
                    <p className="font-sans text-[1.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{price(founderProgram.setup)}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{t.pricing.setupLabel}</p>
                  </div>
                </div>
                <a href={`#${HERO_SCAN_ID}`} onClick={onClick} className="btn btn-lit btn-lg mt-8 w-full sm:w-auto lg:self-start">
                  {f.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FounderProgram;
