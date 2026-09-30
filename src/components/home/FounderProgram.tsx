import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import founderProgram from '@/config/founderProgram';
import { useLocale } from '@/i18n/useLocale';
import { useScan } from '@/components/scan/ScanContext';
import { track } from '@/lib/analytics';
import { homeAnchors } from '@/i18n/config';
import { HERO_SCAN_ID } from '@/components/home/Hero';

/**
 * Pricing and the Founder Program, as one offer rather than two sections.
 *
 * The Founder price is what's actually on offer right now, so it leads —
 * on cobalt, the one block on the page in the brand colour. Immediately
 * below, in the site's normal panel style, sits what happens afterwards
 * (the standard price, stated up front so there is no surprise) and what
 * the partnership actually includes, in honest, implementation-level terms
 * rather than a checklist of automations that don't exist yet.
 */
const FounderProgram: React.FC = () => {
  const { t, price, path } = useLocale();
  const { markFounder } = useScan();
  const f = t.founder;
  const p = t.pricing;

  const onScanClick = (placement: string) => {
    markFounder();
    track('founder_program_clicked', { placement });
    track('primary_cta_clicked', { source: 'founder', cta: 'scan' });
  };

  return (
    <section id={homeAnchors.pricing} className="scroll-mt-20 py-22 lg:py-30" aria-labelledby="founder-heading">
      <div className="frame">
        <SectionHead eyebrow={f.eyebrow} index="04" lead={f.lead}>
          <span id="founder-heading">{f.heading}</span>
        </SectionHead>

        {founderProgram.enabled && (
          <Reveal className="mt-14 lg:mt-18">
            <div className="relative overflow-hidden bg-brand text-paper-2">
              <div className="grid-lines-lit pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-paper-2/75">
                    {f.eyebrow} · {founderProgram.seats} {f.seatsLabel}
                  </p>
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
                      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{p.monthlyLabel} · {f.duration}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[1.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{price(founderProgram.setup)}</p>
                      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{p.setupLabel}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <a href={`#${HERO_SCAN_ID}`} onClick={() => onScanClick('section')} className="btn btn-lit btn-lg w-full sm:w-auto">
                      {f.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <Link
                      to={path('booking')}
                      onClick={() => track('primary_cta_clicked', { source: 'founder', cta: 'book_afklaring' })}
                      className="btn btn-outline-lit btn-lg w-full sm:w-auto"
                    >
                      {f.secondaryCta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-6" delay={90}>
          <div className="instrument grid gap-0 lg:grid-cols-12">
            <div className="border-b p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--line)' }}>
              <p className="meta-brand">{f.afterHeading}</p>
              <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <p className="font-sans text-[2rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{price(p.monthly)}</p>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{p.monthlyLabel}</p>
                </div>
                <div>
                  <p className="font-sans text-[1.2rem] font-semibold leading-none tracking-[-0.02em] tabular-nums">{price(p.setup)}</p>
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{p.setupLabel}</p>
                </div>
              </div>
              <p className="mt-6 text-[0.9rem] leading-relaxed text-muted">{f.afterBody}</p>
              <p className="mt-2 text-[0.85rem] text-muted">{p.vat}</p>
              <p className="mt-1 text-[0.85rem] text-muted">{p.binding}</p>
              <p className="h-serif mt-6 text-[1.1rem] leading-snug text-ink">{f.microcopy}</p>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-7">
              <p className="meta">{f.includedHeading}</p>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {f.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t py-3.5" style={{ borderColor: 'var(--line)' }}>
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="text-[0.95rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FounderProgram;
