import React from 'react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import cases from '@/data/cases';

const Cases: React.FC = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Projekter', item: 'https://www.aagesengrowth.dk/projekter' },
    ],
  };

  return (
    <>
      <SEOHead
        title="Projekter"
        description="Udvalgt arbejde fra Aagesen Growth — websites, webshops, branding og marketingcases."
        canonical="/projekter"
        schema={breadcrumbSchema}
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
              Websites, webshops, branding og marketingcases — tilføjes løbende.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 100}>
                <div className="aspect-[4/3] bg-navy-2 border border-navy/8 flex items-center justify-center p-8 group hover:bg-navy transition-colors duration-300">
                  <div className="text-center">
                    <p className="font-serif text-2xl text-off-white/30 italic mb-2">Case under udarbejdelse</p>
                    <p className="text-sm text-off-white/20">Tilføjes snart</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 text-center">
              <p className="text-muted leading-relaxed mb-8 max-w-lg mx-auto text-pretty">
                Har du et projekt, der skal vises her? Lad os tage en samtale om dit website eller din marketing.
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
