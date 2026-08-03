import React from 'react';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/Accordion';
import Button from '@/components/ui/Button';
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
 * Previously /faq and /priser each emitted their own FAQPage from two separate
 * data sets that gave different answers to the same question. Both now read
 * from one source, and only this page marks it up.
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

    <section className="bg-ink py-14 lg:py-20">
      <div className="shell">
        <div className="space-y-14 lg:space-y-18">
          {faqTopics.map((topic) => {
            const items = faqItems.filter((item) => item.topic === topic);
            if (items.length === 0) return null;

            return (
              <div key={topic} id={topic} className="scroll-mt-24">
                <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="meta">{topicLabels[topic]}</p>
                    <p className="mt-3 font-mono text-xs text-dim">
                      {items.length} spørgsmål
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <Accordion items={items} headingLevel="h3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="border-t border-cream/12 bg-ink-2 py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Ikke besvaret?</p>
            <h2 className="mt-4 max-w-2xl font-serif text-display text-cream text-balance">
              Så spørg om det direkte.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-dim">
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
