import React from 'react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/Accordion';
import CallbackForm from '@/components/forms/CallbackForm';
import TwoPaths from '@/components/home/TwoPaths';
import company from '@/config/company';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

/** Every question, in one place. */
const FAQPage: React.FC = () => {
  const { t, path } = useLocale();
  const f = t.faqPage;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${company.domain}${path('faq')}`,
    mainEntity: t.faq.items.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };

  return (
    <>
      <SEOHead title={f.title} description={f.description} schema={schema} />
      <PageHero eyebrow={f.eyebrow} title={f.heading} lead={f.lead} />

      <section className="py-16 lg:py-22">
        <div className="frame">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
            <Reveal className="lg:col-span-8">
              <Accordion items={t.faq.items} openFirst headingLevel="h2" />
            </Reveal>
            <div id={anchors.callback} className="scroll-mt-24 lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28" delay={120}>
              <div className="instrument p-6 sm:p-7">
                <p className="meta-brand">{f.moreHeading}</p>
                <p className="mt-2 text-[0.95rem] text-muted">{f.moreBody}</p>
                <CallbackForm source="faq" idPrefix="faq-callback" className="mt-6" compact />
              </div>
            </Reveal>
            </div>
          </div>
        </div>
      </section>

      <TwoPaths source="faq" />
    </>
  );
};

export default FAQPage;
