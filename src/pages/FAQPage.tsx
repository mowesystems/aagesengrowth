import React from 'react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/Accordion';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

const FAQPage: React.FC = () => {
  const { t, path } = useLocale();

  const schema = React.useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: `${company.domain}${path('faq')}`,
        mainEntity: t.faq.map((entry) => ({
          '@type': 'Question',
          name: entry.q,
          acceptedAnswer: { '@type': 'Answer', text: entry.a },
        })),
      },
    ],
    [t, path]
  );

  return (
    <>
      <SEOHead title={t.pages.faq.title} description={t.pages.faq.description} schema={schema} />

      <PageHero
        eyebrow={t.nav.faq}
        title={t.pages.faq.heading}
        lead={t.pages.faq.lead}
      />

      <section className="py-18 lg:py-24">
        <div className="frame">
          <div className="max-w-4xl">
            <Accordion items={t.faq} openFirst headingLevel="h2" />
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
