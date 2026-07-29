import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import faqItems from '@/data/faq';

const FAQPage: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="FAQ"
        description="Ofte stillede spørgsmål om Aagesen Growth — faste samarbejder, hjemmesider, annoncering, SEO og GEO."
        canonical="/faq"
        schema={faqSchema}
      />

      <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">FAQ</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-off-white max-w-2xl text-balance">
              Ofte stillede spørgsmål.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="border-b border-navy/10">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                    aria-expanded={open === i}
                  >
                    <span className="font-sans font-medium text-dark pr-4 group-hover:text-navy transition-colors">{item.question}</span>
                    <ChevronDown size={18} className={`flex-shrink-0 text-muted transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? 'max-h-60 pb-5' : 'max-h-0'}`}>
                    <p className="text-muted leading-relaxed text-[15px]">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 text-center">
              <p className="text-muted leading-relaxed mb-8 text-pretty">Har du andre spørgsmål?</p>
              <Button booking size="lg">Book et møde</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
