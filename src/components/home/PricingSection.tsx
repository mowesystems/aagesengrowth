import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import MaskedLines from '@/components/ui/MaskedLines';
import PricingLedger from '@/components/PricingLedger';
import { useLocale } from '@/i18n/useLocale';
import { Link } from 'react-router-dom';

/**
 * Pricing on the homepage.
 *
 * The full ledger, not a teaser: a visitor should be able to leave this page
 * knowing what every discipline starts at without opening a second one. The
 * dedicated pricing page exists for the same numbers with more room around
 * them, not because the homepage withholds anything.
 */
const PricingSection: React.FC = () => {
  const { t, path } = useLocale();

  return (
    <section id="priser" className="scroll-mt-24 bg-paper-3 py-22 lg:py-30">
      <div className="frame">
        <Reveal>
          <div className="rule flex items-baseline gap-4 pt-5">
            <span className="index-mark shrink-0">06</span>
            <span className="meta-brand">{t.pricing.eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="h-statement max-w-[12ch]">
              <MaskedLines lines={t.pricing.lines} delay={0} stagger={80} />
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={90}>
            <p className="max-w-measure text-lead text-muted text-pretty">{t.pricing.lead}</p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20">
          <PricingLedger />
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-prose text-sm leading-relaxed text-muted">
              {t.pricing.disclaimer}
            </p>
            <Link to={path('pricing')} className="link-line shrink-0">
              {t.cta.allPricing}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PricingSection;
