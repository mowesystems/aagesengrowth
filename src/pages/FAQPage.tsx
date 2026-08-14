import React from 'react';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/Accordion';
import Button from '@/components/ui/Button';
import SectionIndex, { type SectionLink } from '@/components/SectionIndex';
import company from '@/config/company';
import faqItems, { faqTopics, topicLabels } from '@/data/faq';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${company.domain}/faq` },
  ],
};

/**
 * The site's only FAQPage schema.
 *
 * /faq and /priser read from one source; only this page marks it up, so the
 * same questions cannot appear as two competing FAQPage graphs on two URLs.
 */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const sections: SectionLink[] = faqTopics.map((topic) => ({
  id: topic,
  label: topicLabels[topic],
}));

const FAQPage: React.FC = () => (
  <>
    <SEOHead
      title="FAQ — spørgsmål og ærlige svar"
      description="Priser, materiale, rettelser, tidsplan, annoncebudget, binding og hvad der sker efter en henvendelse. Svarene på det, folk spørger om."
      canonical="/faq"
      schema={[breadcrumbSchema, faqSchema]}
    />

    <PageHero
      eyebrow="FAQ"
      title="Spørgsmål, og svar der ikke går uden om."
      lead="Inklusive dem, hvor svaret er nej."
    />

    <SectionIndex links={sections} aria-label="Emner i FAQ" />

    <section className="bg-ink py-18 lg:py-26">
      <div className="frame">
        <div className="space-y-16 lg:space-y-22">
          {faqTopics.map((topic) => {
            const items = faqItems.filter((item) => item.topic === topic);
            if (items.length === 0) return null;

            return (
              <div key={topic} id={topic} className="scroll-mt-32">
                <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
                  <div className="col-span-4 lg:col-span-4">
                    <h2 className="font-display text-display uppercase leading-[0.92] text-paper">
                      {topicLabels[topic]}
                    </h2>
                    <p className="index-mark mt-4">
                      {items.length} {items.length === 1 ? 'spørgsmål' : 'spørgsmål'}
                    </p>
                  </div>
                  <div className="col-span-4 lg:col-span-7 lg:col-start-6">
                    <Accordion items={items} headingLevel="h3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="border-t border-paper/10 bg-ink-2 py-18 lg:py-24">
      <div className="frame">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Ikke besvaret?</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-display uppercase text-paper text-balance">
              Så spørg om det direkte.
            </h2>
            <p className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-muted">
              I får et konkret svar fra den, der ville lave arbejdet — ikke et standardsvar fra en
              indbakke.
            </p>
          </div>
          <Button to="/kontakt" size="lg" className="shrink-0">
            Stil dit spørgsmål
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default FAQPage;
