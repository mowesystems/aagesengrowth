import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import MaskedLines from '@/components/ui/MaskedLines';
import { useLocale } from '@/i18n/useLocale';
import { tierById } from '@/data/pricing';

/**
 * Paid growth.
 *
 * Four numbered stages across a wide row, with the price standing on its own
 * at the left. The stages are set as a sequence rather than as a grid of
 * equal cards, because they happen in that order.
 *
 * The ad-spend disclosure sits directly under the price rather than in
 * small print at the bottom of the page. It is the single most common thing
 * an agency is vague about, so it is stated where the number is.
 */
const PaidGrowth: React.FC = () => {
  const { t, path, price } = useLocale();
  const tier = tierById('paid');

  return (
    <section id="paid" className="scroll-mt-24 py-22 lg:py-30">
      <div className="frame">
        <Reveal>
          <div className="rule flex items-baseline gap-4 pt-5">
            <span className="index-mark shrink-0">05</span>
            <span className="meta-brand">{t.paid.eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="h-statement max-w-[13ch]">
              <MaskedLines lines={t.paid.lines} delay={0} stagger={80} />
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={90}>
            <p className="max-w-measure text-lead text-muted text-pretty">{t.paid.lead}</p>
          </Reveal>
        </div>

        <div className="mt-18 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* ------------------------------------------------------- price */}
          <Reveal className="lg:col-span-4">
            <div className="border-t-2 border-ink pt-8">
              <p className="meta">{t.paid.priceLabel}</p>
              <p className="mt-4 font-sans text-price font-semibold tabular-nums">
                {tier ? price(tier.from) : ''}
                <span className="meta ml-2 align-middle">{t.pricing.perMonth}</span>
              </p>
              <p className="mt-5 max-w-measure border-l-2 border-brand pl-5 text-sm leading-relaxed text-muted">
                {t.paid.adSpendNote}
              </p>

              <Button to={path('contact')} size="lg" className="mt-8 w-full sm:w-auto">
                {t.paid.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>

          {/* ------------------------------------------------------ stages */}
          <div className="lg:col-span-8">
            <div className="rule grid sm:grid-cols-2">
              {t.paid.points.map((point, index) => (
                <Reveal
                  key={point.label}
                  delay={index * 80}
                  className={`rule-row py-8 sm:py-9 ${
                    index % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:border-ink/12 sm:pl-10'
                  }`}
                >
                  <p className="index-mark opacity-60">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-4 font-sans text-title font-semibold">{point.label}</p>
                  <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
                    {point.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidGrowth;
