import React from 'react';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/home/Hero';
import Problem from '@/components/home/Problem';
import Engine from '@/components/home/Engine';
import ScanSection from '@/components/home/ScanSection';
import FounderProgram from '@/components/home/FounderProgram';
import Fit from '@/components/home/Fit';
import FAQ from '@/components/home/FAQ';
import FinalScan from '@/components/home/FinalScan';
import Spine from '@/components/growth/Spine';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';
import { homeAnchors, localeMeta } from '@/i18n/config';

/**
 * The homepage is the whole argument, in eight moves: the hero, the problem,
 * how Growth Engine works (with the dashboard embedded rather than given its
 * own section), the free scan, the Founder offer and its pricing, who it's
 * for, a short FAQ, and the close.
 */
const Home: React.FC = () => {
  const { t } = useLocale();

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
        audience: { '@type': 'BusinessAudience', name: 'Danske servicevirksomheder (varmepumper, solceller, tag, vinduer, el, VVS, renovering)' },
        description: t.engine.lead,
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
          url: `${company.domain}/#${homeAnchors.pricing}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((entry) => ({
          '@type': 'Question',
          name: entry.q,
          acceptedAnswer: { '@type': 'Answer', text: entry.a },
        })),
      },
    ],
    [t]
  );

  return (
    <>
      <SEOHead title={t.meta.homeTitle} description={t.meta.homeDescription} schema={schema} />
      <Hero />
      <div className="relative">
        <Spine />
        <Problem />
        <Engine />
        <ScanSection />
        <FounderProgram />
        <Fit />
        <FAQ />
      </div>
      <FinalScan />
    </>
  );
};

export default Home;
