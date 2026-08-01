import React from 'react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import cases from '@/data/cases';
import CaseCard from '@/components/CaseCard';

const Cases: React.FC = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Projekter', item: 'https://www.aagesengrowth.dk/projekter' },
    ],
  };

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cases.map((item, index) => ({
      '@type': 'CreativeWork',
      position: index + 1,
      name: item.client,
      description: item.introduction,
      url: item.url,
    })),
  };

  return (
    <>
      <SEOHead
        title="Projekter"
        description="Udvalgt arbejde fra Aagesen Growth — websites, webshops, branding og marketingcases."
        canonical="/projekter"
        schema={[breadcrumbSchema, projectSchema]}
      />

      <section className="bg-navy text-off-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Projekter</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-off-white mb-6 max-w-3xl text-balance">
              Udvalgt arbejde.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-off-white/50 max-w-xl leading-relaxed text-pretty">
              To projekter, der viser arbejdet fra digital retning og brand til website, marketing og løbende synlighed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-18 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 100}>
                <CaseCard item={c} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 text-center">
              <p className="text-muted leading-relaxed mb-8 max-w-lg mx-auto text-pretty">
                Har du brug for en partner, der kan samle website, marketing og den løbende udvikling?
              </p>
              <Button booking size="lg">Book et møde</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Cases;
