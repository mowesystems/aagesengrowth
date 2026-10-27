import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

interface WebsitePackagesProps {
  className?: string;
  /** Where the packages sit, for analytics. */
  source: string;
}

/**
 * The three fixed-price website packages.
 *
 * Shared by the pricing page and the websites page so the two can never show
 * different prices. Each CTA jumps to the callback form, which both pages
 * carry under the same anchor.
 */
const WebsitePackages: React.FC<WebsitePackagesProps> = ({ className = '', source }) => {
  const { t, price } = useLocale();
  const p = t.pricing;
  const w = p.websites;

  return (
    <ul className={`grid gap-5 lg:grid-cols-3 ${className}`}>
      {w.packages.map((pkg, i) => {
        const featured = pkg.key === w.featured;
        return (
          <Reveal key={pkg.key} as="li" delay={i * 90} className="h-full">
            <article
              className={`flex h-full flex-col border bg-paper-2 p-7 sm:p-8 ${featured ? 'border-brand' : ''}`}
              style={featured ? undefined : { borderColor: 'var(--line-strong)' }}
              aria-labelledby={`${source}-pkg-${pkg.key}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 id={`${source}-pkg-${pkg.key}`} className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brand">
                  {pkg.name}
                </h3>
                {featured && <span className="chip chip-opportunity">{w.featuredLabel}</span>}
              </div>
              <p className="mt-6 font-sans text-[2.3rem] font-semibold leading-none tracking-[-0.035em] tabular-nums" data-price={pkg.key}>
                {price(pkg.price)}
              </p>
              <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                {w.priceLabel} · {p.exVat}
              </p>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-ink">{pkg.audience}</p>
              <ul className="mt-6 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t py-3" style={{ borderColor: 'var(--line)' }}>
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="text-[0.92rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`#${anchors.callback}`}
                onClick={() => track('website_packages_clicked', { package: pkg.key, cta: 'callback', source })}
                className={`btn ${featured ? 'btn-primary' : 'btn-outline'} mt-8 w-full`}
              >
                {w.cta}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
};

export default WebsitePackages;
