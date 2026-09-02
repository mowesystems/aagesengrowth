import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import MaskedLines from '@/components/ui/MaskedLines';
import { useLocale } from '@/i18n/useLocale';
import { tierById } from '@/data/pricing';

/**
 * SEO + GEO — the page's one dark section.
 *
 * The register change is the argument: everything above this is paper, so
 * arriving here reads as "and now something else is happening", which is
 * exactly the claim being made about search. Used once, so it stays an event.
 *
 * SEO and GEO are set as two columns separated by a rule rather than as two
 * cards, because the point is that they are two halves of one job.
 */
const SearchVisibility: React.FC = () => {
  const { t, path, price } = useLocale();
  const tier = tierById('searchVisibility');

  const column = (
    data: { title: string; body: string; points: string[] },
    index: number
  ) => (
    <Reveal delay={index * 100}>
      <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brand-lit">
        {data.title}
      </p>
      <p className="mt-4 font-sans text-title font-semibold">{data.body}</p>
      <ul className="mt-7 rule-lit">
        {data.points.map((point) => (
          <li key={point} className="rule-row-lit py-3.5 text-[0.95rem] text-muted-lit">
            {point}
          </li>
        ))}
      </ul>
    </Reveal>
  );

  return (
    <section id="seo-geo" className="on-dark relative scroll-mt-24 overflow-hidden py-22 lg:py-30">
      <div className="ambient-lit pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="grid-lines-lit pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="frame relative">
        <Reveal>
          <div className="rule-lit flex items-baseline gap-4 pt-5">
            <span className="font-mono text-[0.66rem] font-medium tracking-[0.14em] text-muted-lit">
              04
            </span>
            <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-brand-lit">
              {t.searchVisibility.eyebrow}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="h-statement max-w-[15ch]">
              <MaskedLines lines={t.searchVisibility.lines} delay={0} stagger={80} />
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={90}>
            <p className="max-w-measure text-lead text-muted-lit text-pretty">
              {t.searchVisibility.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-18 grid gap-x-14 gap-y-14 lg:mt-22 lg:grid-cols-12">
          <div className="lg:col-span-4">{column(t.searchVisibility.seo, 0)}</div>

          <div className="lg:col-span-4 lg:border-l lg:border-paper/12 lg:pl-14">
            {column(t.searchVisibility.geo, 1)}
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-paper/12 lg:pl-14">
            <Reveal delay={200}>
              <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brand-lit">
                {t.searchVisibility.measure.title}
              </p>
              <p className="mt-4 max-w-measure text-[0.95rem] leading-relaxed text-muted-lit text-pretty">
                {t.searchVisibility.measure.body}
              </p>

              <div className="mt-10 border-t-2 border-paper pt-7">
                <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-muted-lit">
                  {t.searchVisibility.priceLabel}
                </p>
                <p className="mt-3 font-sans text-price font-semibold tabular-nums">
                  {tier ? price(tier.from) : ''}
                  <span className="ml-2 align-middle font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-muted-lit">
                    {t.pricing.perMonth}
                  </span>
                </p>
              </div>

              <Button to={path('contact')} variant="lit" size="lg" className="mt-8 w-full sm:w-auto">
                {t.searchVisibility.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchVisibility;
