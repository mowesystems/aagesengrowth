import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import tiers from '@/data/pricing';
import { useLocale } from '@/i18n/useLocale';

/**
 * The price list, as an editorial ledger.
 *
 * Not a SaaS pricing table: no three equal boxes, no shadowed cards, no
 * "contact us for enterprise". Each tier is a full-width row — name and
 * description on the left, the price set at display size on the right, and
 * what it includes underneath in two dense columns.
 *
 * The recurring partner offer is the one row rendered on ink. That is the
 * whole hierarchy: one row is louder than the others, and it is louder because
 * of ground rather than because of a badge shouting MOST POPULAR.
 */
interface PricingLedgerProps {
  /**
   * The heading level for a tier name. On the homepage the ledger sits under
   * the section's own h2, so h3 is right; on the pricing page it sits directly
   * under the h1, where an h3 would skip a level.
   */
  headingLevel?: 'h2' | 'h3';
}

const PricingLedger: React.FC<PricingLedgerProps> = ({ headingLevel: Heading = 'h3' }) => {
  const { t, path, price } = useLocale();

  return (
    <div className="rule">
      {tiers.map((tier, index) => {
        const copy = t.pricing.tiers[tier.id];
        const featured = Boolean(tier.featured);

        return (
          <Reveal key={tier.id} delay={index * 60}>
            <article
              className={`group relative rule-row ${
                featured
                  ? 'on-dark -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 2xl:-mx-18 2xl:px-18'
                  : ''
              }`}
            >
              <div className="grid grid-cols-12 gap-x-6 gap-y-8 py-10 lg:py-12">
                {/* ------------------------------------------- name + price */}
                <div className="col-span-12 lg:col-span-5">
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-[0.66rem] font-medium tracking-[0.14em] ${
                        featured ? 'text-muted-lit' : 'text-muted'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {featured && (
                      <span className="border border-brand-lit px-2.5 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-lit">
                        {t.pricing.recommended}
                      </span>
                    )}
                  </div>

                  <Heading className="h-section mt-5">{copy.name}</Heading>
                  <p
                    className={`mt-3 font-sans text-[1.0625rem] ${
                      featured ? 'text-muted-lit' : 'text-muted'
                    }`}
                  >
                    {copy.tagline}
                  </p>
                  <p
                    className={`mt-5 max-w-measure text-[0.95rem] leading-relaxed text-pretty ${
                      featured ? 'text-muted-lit' : 'text-muted'
                    }`}
                  >
                    {copy.body}
                  </p>
                </div>

                {/* ---------------------------------------------- includes */}
                <div className="col-span-12 lg:col-span-4">
                  <p
                    className={`font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] ${
                      featured ? 'text-muted-lit' : 'text-muted'
                    }`}
                  >
                    {t.pricing.includesLabel}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {copy.includes.map((entry) => (
                      <li key={entry} className="flex items-start gap-3 text-[0.95rem]">
                        <Check
                          size={15}
                          aria-hidden="true"
                          className={`mt-1 shrink-0 ${featured ? 'text-brand-lit' : 'text-brand'}`}
                        />
                        <span className={featured ? 'text-paper' : 'text-ink'}>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ------------------------------------------------- amount */}
                <div className="col-span-12 lg:col-span-3 lg:text-right">
                  <p
                    className={`font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] ${
                      featured ? 'text-muted-lit' : 'text-muted'
                    }`}
                  >
                    {t.pricing.fromLabel}
                  </p>
                  <p className="mt-3 font-sans text-price font-semibold tabular-nums">
                    {price(tier.from)}
                  </p>
                  <p
                    className={`mt-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] ${
                      featured ? 'text-muted-lit' : 'text-muted'
                    }`}
                  >
                    {tier.unit === 'month' ? t.pricing.perMonth : t.pricing.oneOff} ·{' '}
                    {t.pricing.exVat}
                  </p>

                  <Button
                    to={path('contact')}
                    variant={featured ? 'lit' : 'outline'}
                    className="mt-7 w-full sm:w-auto"
                  >
                    {t.pricing.cta}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};

export default PricingLedger;
