import React from 'react';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/home/Hero';
import DisciplineTicker from '@/components/home/DisciplineTicker';
import ServiceLedger from '@/components/home/ServiceLedger';
import WebsitesSection from '@/components/home/WebsitesSection';
import FeaturedCase from '@/components/home/FeaturedCase';
import SearchVisibility from '@/components/home/SearchVisibility';
import PaidGrowth from '@/components/home/PaidGrowth';
import PricingSection from '@/components/home/PricingSection';
import Process from '@/components/home/Process';
import About from '@/components/home/About';
import company from '@/config/company';
import tiers from '@/data/pricing';
import services from '@/data/services';
import { useLocale } from '@/i18n/useLocale';
import { localeMeta } from '@/i18n/config';

/**
 * The homepage.
 *
 * The order is a sales argument, not a menu: who we are and what we build
 * (hero), what everything costs (ledger — second screen, deliberately), the
 * dominant service with its evidence (websites), proof it is real (case), the
 * two growth disciplines, the full price list, how the work runs, who we are,
 * and the close. Nothing here requires a second page to make sense of.
 */
const Home: React.FC = () => {
  const { t, locale } = useLocale();

  const schema = React.useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${company.domain}/#organisation`,
        name: company.brandName,
        legalName: company.legalName,
        description: t.meta.homeDescription,
        url: company.domain,
        areaServed: ['DK', 'SE'],
        knowsLanguage: Object.values(localeMeta).map((entry) => entry.htmlLang),
        inLanguage: localeMeta[locale].htmlLang,
        ...(company.email ? { email: company.email } : {}),
        ...(company.phone ? { telephone: company.phone } : {}),
        parentOrganization: { '@type': 'Organization', name: 'MOWE Systems ApS' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.ledger.eyebrow,
          itemListElement: services.map((service) => {
            const tier = tiers.find((entry) => entry.id === service.tier);
            return {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: t.services[service.id].name,
                description: t.services[service.id].body,
              },
              ...(tier
                ? {
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      priceCurrency: 'DKK',
                      minPrice: tier.from,
                      valueAddedTaxIncluded: false,
                    },
                  }
                : {}),
            };
          }),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faq.slice(0, 6).map((entry) => ({
          '@type': 'Question',
          name: entry.q,
          acceptedAnswer: { '@type': 'Answer', text: entry.a },
        })),
      },
    ],
    [t, locale]
  );

  return (
    <>
      <SEOHead title={t.meta.homeTitle} description={t.meta.homeDescription} schema={schema} />

      <Hero />
      <div className="frame">
        <DisciplineTicker />
      </div>
      <ServiceLedger />
      <WebsitesSection />
      <FeaturedCase />
      <SearchVisibility />
      <PaidGrowth />
      <PricingSection />
      <Process />
      <About />
    </>
  );
};

export default Home;
