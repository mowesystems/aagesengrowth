import React from 'react';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/home/Hero';
import Problem from '@/components/home/Problem';
import Engine from '@/components/home/Engine';
import ProductUI from '@/components/home/ProductUI';
import BeforeAfter from '@/components/home/BeforeAfter';
import ScanSection from '@/components/home/ScanSection';
import HowItWorks from '@/components/home/HowItWorks';
import Pricing from '@/components/home/Pricing';
import FounderProgram from '@/components/home/FounderProgram';
import ChoosePath from '@/components/home/ChoosePath';
import Fit from '@/components/home/Fit';
import FAQ from '@/components/home/FAQ';
import FinalScan from '@/components/home/FinalScan';
import Spine from '@/components/growth/Spine';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';
import { homeAnchors, localeMeta } from '@/i18n/config';

/**
 * The homepage is the whole argument: what this is, why it matters, what the
 * system is, what it looks like, the difference it makes, the scan, how it
 * runs, what it costs, who it is for, the objections, and the scan again.
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
        <ProductUI />
        <BeforeAfter />
        <ScanSection />
        <HowItWorks />
        <Pricing />
        <FounderProgram />
        <ChoosePath />
        <Fit />
        <FAQ />
      </div>
      <FinalScan />
    </>
  );
};

export default Home;
