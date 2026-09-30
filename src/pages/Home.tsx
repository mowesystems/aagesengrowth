import React from 'react';
import SEOHead from '@/components/SEOHead';
import Hero, { HERO_SCAN_ID } from '@/components/home/Hero';
import HomeProblem from '@/components/home/HomeProblem';
import HomeEngine from '@/components/home/HomeEngine';
import HomeScan from '@/components/home/HomeScan';
import TwoPaths from '@/components/home/TwoPaths';
import Spine from '@/components/growth/Spine';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';
import { localeMeta } from '@/i18n/config';

/**
 * The homepage has one job: make the problem and the idea clear, then get
 * the visitor to run a Growth Scan or book a conversation. Five moves: hero,
 * problem, what Growth Engine is, the scan, two ways in. Everything that
 * explains the system in depth lives on its own page.
 */
const Home: React.FC = () => {
  const { t, path } = useLocale();

  const schema = React.useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${company.domain}/#organization`,
        name: company.brandName,
        legalName: company.legalName,
        url: company.domain,
        logo: `${company.domain}/brand/aagesen-growth.png`,
        description: t.meta.homeDescription,
        areaServed: 'DK',
        knowsLanguage: Object.values(localeMeta).map((entry) => entry.htmlLang),
        ...(company.email ? { email: company.email } : {}),
        ...(company.phone ? { telephone: company.phone } : {}),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${company.domain}/#growth-engine`,
        name: 'Growth Engine',
        serviceType: 'Identifikation og løbende forbedring af den digitale kunderejse for servicevirksomheder',
        provider: { '@id': `${company.domain}/#organization` },
        areaServed: 'DK',
        description: t.home.engine.lead,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'DKK',
          price: t.pricing.monthly,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceCurrency: 'DKK',
            price: t.pricing.monthly,
            unitText: 'MONTH',
            valueAddedTaxIncluded: false,
          },
          url: `${company.domain}${path('pricing')}`,
        },
      },
    ],
    [t, path]
  );

  return (
    <>
      <SEOHead title={t.meta.homeTitle} description={t.meta.homeDescription} schema={schema} />
      <Hero />
      <div className="relative">
        <Spine />
        <HomeProblem />
        <HomeEngine />
        <HomeScan />
      </div>
      <TwoPaths source="home" scanHref={`#${HERO_SCAN_ID}`} />
    </>
  );
};

export default Home;
