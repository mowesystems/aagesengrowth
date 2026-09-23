import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track, trackOnce } from '@/lib/analytics';
import { HERO_SCAN_ID } from '@/components/home/Hero';

/**
 * One offer, stated plainly. The price is set large because it is the
 * answer to the question the reader has by now, not a detail to be softened.
 */
const Pricing: React.FC = () => {
  const { t, price, path } = useLocale();
  const p = t.pricing;
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.4 });

  React.useEffect(() => {
    if (inView) trackOnce('pricing_viewed');
  }, [inView]);

  return (
    <section id={homeAnchors.pricing} ref={ref} className="scroll-mt-20 py-22 lg:py-30" aria-labelledby="pricing-heading">
      <div className="frame">
        <SectionHead eyebrow={p.eyebrow} index="07">
          <span id="pricing-heading">{p.heading}</span>
        </SectionHead>

        <Reveal className="mt-14 lg:mt-18">
          <div className="instrument grid gap-0 lg:grid-cols-12">
            <div className="border-b p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--line)' }}>
              <p className="meta-brand">{p.name}</p>
              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <p className="font-sans text-[2.6rem] font-semibold leading-none tracking-[-0.035em] tabular-nums sm:text-[3.2rem]">
                    {price(p.monthly)}
                  </p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">{p.monthlyLabel}</p>
                </div>
                <div>
                  <p className="font-sans text-[1.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{price(p.setup)}</p>
                  <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">{p.setupLabel}</p>
                </div>
              </div>
              <p className="mt-8 text-[0.85rem] text-muted">{p.vat}</p>
              <p className="mt-1 text-[0.85rem] text-muted">{p.binding}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={`#${HERO_SCAN_ID}`}
                  onClick={() => track('primary_cta_clicked', { source: 'pricing', cta: 'scan' })}
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  {p.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <Link
                  to={path('booking')}
                  onClick={() => track('primary_cta_clicked', { source: 'pricing', cta: 'book_afklaring' })}
                  className="btn btn-outline btn-lg w-full sm:w-auto"
                >
                  {p.secondaryCta}
                </Link>
              </div>
              <p className="h-serif mt-6 text-[1.15rem] leading-snug text-ink">{p.microcopy}</p>
            </div>

            <div className="p-7 sm:p-10 lg:col-span-7">
              <p className="meta">{p.includedHeading}</p>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {p.included.map((item) => (
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

export default Pricing;
