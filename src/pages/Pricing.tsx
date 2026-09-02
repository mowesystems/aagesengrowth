import React from 'react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import PricingLedger from '@/components/PricingLedger';
import Accordion from '@/components/Accordion';
import Reveal from '@/components/ui/Reveal';
import company from '@/config/company';
import tiers from '@/data/pricing';
import { useLocale } from '@/i18n/useLocale';

/**
 * The pricing page.
 *
 * The same ledger the homepage carries, with more room around it and the
 * money-shaped FAQ answers underneath. It exists so that "priser" stays a
 * landable, linkable URL — not because the homepage holds anything back.
 */
const Pricing: React.FC = () => {
  const { t, path } = useLocale();

  const schema = React.useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: t.pages.pricing.heading,
        url: `${company.domain}${path('pricing')}`,
        itemListElement: tiers.map((tier) => ({
          '@type': 'Offer',
          name: t.pricing.tiers[tier.id].name,
          description: t.pricing.tiers[tier.id].body,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'DKK',
            minPrice: tier.from,
            valueAddedTaxIncluded: false,
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Aagesen Growth', item: `${company.domain}${path('home')}` },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.pages.pricing.heading,
            item: `${company.domain}${path('pricing')}`,
          },
        ],
      },
    ],
    [t, path]
  );

  // The four answers that are actually about money.
  const priceQuestions = t.faq.filter((_, index) => [0, 3, 5, 1].includes(index));

  return (
    <>
      <SEOHead
        title={t.pages.pricing.title}
        description={t.pages.pricing.description}
        schema={schema}
      />

      <PageHero
        eyebrow={t.pricing.eyebrow}
        title={t.pricing.lines.join(' ')}
        lead={t.pages.pricing.lead}
      />

      <section className="py-20 lg:py-26">
        <div className="frame">
          <PricingLedger headingLevel="h2" />

          <Reveal>
            <p className="mt-10 max-w-prose text-sm leading-relaxed text-muted">
              {t.pricing.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-3 py-20 lg:py-26">
        <div className="frame">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="h-section max-w-[14ch] text-balance">{t.pages.faq.heading}</h2>
            </Reveal>
            <div className="lg:col-span-8">
              <Accordion items={priceQuestions} openFirst />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
