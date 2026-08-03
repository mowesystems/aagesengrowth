import React from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { priceParts, type PricingItem } from '@/data/pricing';

interface PricingCardProps {
  item: PricingItem;
  /** Trimmed version for previews outside the pricing page. */
  compact?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ item, compact = false }) => {
  const price = priceParts(item);

  return (
    <article
      className={`relative flex h-full flex-col border bg-ink ${
        item.recommended ? 'border-cream' : 'border-cream/15'
      }`}
    >
      {item.recommended && (
        <p className="meta absolute -top-px left-0 bg-cream px-3 py-1.5 text-ink">
          Mest valgte
        </p>
      )}

      {/* Uniform top padding on every card so the titles align across the row,
          whether or not a card carries the badge. */}
      <div className="px-6 pt-12 sm:px-7">
        <h3 className="font-serif text-2xl leading-none text-cream">{item.name}</h3>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5">
          {price.prefix && <span className="font-mono text-xs text-dim">{price.prefix}</span>}
          <span className="font-serif text-[2.6rem] leading-none tracking-tight text-cream">
            {price.amount}
          </span>
          {price.period && <span className="font-mono text-xs text-dim">{price.period}</span>}
        </p>
        {price.suffix && <p className="mt-1.5 font-mono text-xs text-dim">{price.suffix}</p>}

        <p className="mt-5 text-sm leading-relaxed text-dim">{item.description}</p>
      </div>

      {!compact && (
        <div className="mt-7 px-6 sm:px-7">
          <p className="meta-muted border-t border-cream/15 pt-6">
            {item.featureLabel || 'Inkluderer'}
          </p>
          <ul className="mt-4 space-y-2.5">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-relaxed text-cream">
                <Check size={14} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {item.exclusions && (
            <>
              <p className="meta-muted mt-7">Ikke inkluderet</p>
              <ul className="mt-4 space-y-2.5">
                {item.exclusions.map((exclusion) => (
                  <li key={exclusion} className="flex gap-3 text-xs leading-relaxed text-dim">
                    <Minus size={13} className="mt-0.5 shrink-0 opacity-70" aria-hidden="true" />
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.note && (
            <p className="mt-6 border-l-2 border-cream/15 pl-4 text-xs leading-relaxed text-dim">
              {item.note}
            </p>
          )}
        </div>
      )}

      {item.ctaLabel && item.ctaHref && (
        <div className="mt-auto p-6 pt-8 sm:px-7">
          <Button
            to={item.ctaHref}
            variant={item.recommended ? 'primary' : 'outline'}
            className="w-full"
          >
            {item.ctaLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      )}
    </article>
  );
};

export default PricingCard;
