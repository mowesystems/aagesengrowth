import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatPrice, type PricingItem } from '@/data/pricing';

interface PricingCardProps {
  item: PricingItem;
  compact?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ item, compact = false }) => (
  <article className={`relative flex h-full flex-col border bg-off-white ${item.recommended ? 'border-accent shadow-[0_14px_38px_rgba(16,28,41,0.08)]' : 'border-navy/10'} ${compact ? 'p-6' : 'p-6 sm:p-8'}`}>
    {item.recommended && (
      <span className="absolute right-5 top-0 -translate-y-1/2 bg-accent px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-navy">
        Anbefalet
      </span>
    )}
    <h3 className="font-serif text-2xl text-navy">{item.name}</h3>
    <p className="mt-4 text-[clamp(1.75rem,3vw,2.35rem)] font-medium leading-none tracking-tight text-navy">
      {formatPrice(item)}
    </p>
    <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>

    {!compact && (
      <>
        <p className="mt-7 border-t border-navy/10 pt-6 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
          {item.featureLabel || 'Inkluderer'}
        </p>
        <ul className="mt-4 space-y-3">
          {item.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-relaxed text-dark">
              <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {item.exclusions && (
          <div className="mt-6 border-l-2 border-navy/20 pl-4">
            {item.exclusions.map((exclusion) => <p key={exclusion} className="mt-2 first:mt-0 text-xs leading-relaxed text-muted">{exclusion}</p>)}
          </div>
        )}
        {item.note && <p className="mt-5 text-xs leading-relaxed text-muted">{item.note}</p>}
      </>
    )}

    {item.ctaLabel && item.ctaHref && (
      <div className="mt-auto pt-7">
        <Button to={item.ctaHref} variant={item.recommended ? 'primary' : 'outline'} className="w-full" size="md">
          {item.ctaLabel} <ArrowRight size={14} className="ml-2" aria-hidden="true" />
        </Button>
      </div>
    )}
  </article>
);

export default PricingCard;
