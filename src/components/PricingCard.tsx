import React from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { priceParts, type PricingItem } from '@/data/pricing';

interface PricingCardProps {
  item: PricingItem;
  /** Trimmed version for previews outside the pricing page. */
  compact?: boolean;
}

/**
 * A price.
 *
 * Square corners, hairline edges and one spectrum rule on the recommended
 * package — the hierarchy is carried by scale and space rather than by a
 * shadowed, rounded plate. The amount is set at display size because it is the
 * single thing a visitor came to this section to read.
 */
const PricingCard: React.FC<PricingCardProps> = ({ item, compact = false }) => {
  const price = priceParts(item);

  return (
    <article
      className={`relative flex h-full flex-col border bg-ink transition-colors duration-300 ${
        item.recommended ? 'border-paper/45' : 'border-paper/12 hover:border-paper/30'
      }`}
    >
      {item.recommended && (
        <>
          <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-[2px]" />
          <p className="meta absolute right-0 top-0 -translate-y-1/2 bg-ink px-3 text-cyan">
            Mest valgte
          </p>
        </>
      )}

      {/* Uniform top padding so titles align across a row whether or not a card
          carries the badge. */}
      <div className="px-6 pt-11 sm:px-7">
        <h3 className="font-display text-title uppercase text-paper">{item.name}</h3>
        {item.nameNote && <p className="meta mt-2">{item.nameNote}</p>}

        <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
          {price.prefix && <span className="font-mono text-xs text-muted">{price.prefix}</span>}
          <span className="font-display text-[2.9rem] leading-none tracking-[-0.02em] text-paper">
            {price.amount}
          </span>
          {price.period && <span className="font-mono text-xs text-muted">{price.period}</span>}
        </p>
        {price.suffix && <p className="mt-2 font-mono text-xs text-muted">{price.suffix}</p>}

        <p className="mt-5 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>

      {!compact && (
        <div className="mt-8 px-6 sm:px-7">
          <p className="meta border-t border-paper/12 pt-6">{item.featureLabel || 'Inkluderer'}</p>
          <ul className="mt-4 space-y-2.5">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-relaxed text-paper">
                <Check size={14} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {item.exclusions && (
            <>
              <p className="meta mt-7">Ikke inkluderet</p>
              <ul className="mt-4 space-y-2.5">
                {item.exclusions.map((exclusion) => (
                  <li key={exclusion} className="flex gap-3 text-xs leading-relaxed text-muted">
                    <Minus size={13} className="mt-0.5 shrink-0 opacity-70" aria-hidden="true" />
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.note && (
            <p className="mt-6 border-l border-paper/15 pl-4 text-xs leading-relaxed text-muted">
              {item.note}
            </p>
          )}
        </div>
      )}

      {item.ctaLabel && item.ctaHref && (
        <div className="mt-auto p-6 pt-9 sm:px-7">
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
