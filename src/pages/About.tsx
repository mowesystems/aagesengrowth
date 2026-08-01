import React from 'react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

const About: React.FC = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Om', item: 'https://www.aagesengrowth.dk/om' },
    ],
  };

  const values = [
    { title: 'Ansvar', text: 'Vi tager ejerskab og følger opgaverne til dørs.' },
    { title: 'Klarhed', text: 'Tydelige prioriteringer, leverancer og forventninger.' },
    { title: 'Kvalitet', text: 'Grundigt arbejde frem for overfladisk volumen.' },
    { title: 'Forretningsforståelse', text: 'Marketing er et middel til vækst — ikke målet i sig selv.' },
  ];

  return (
    <>
      <SEOHead
        title="Om Aagesen Growth ApS"
        description="Et mindre setup med et større ansvar. Aagesen Growth ApS hjælper virksomheder med professionelle digitale løsninger og fast marketingansvar."
        canonical="/om"
        schema={breadcrumbSchema}
      />

      <section className="inner-hero grid-bg-light">
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Om</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-navy mb-6 max-w-3xl text-balance">
              Et mindre setup med et større ansvar.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-muted max-w-2xl leading-relaxed text-pretty">
              Aagesen Growth hjælper virksomheder, der har brug for professionelle digitale løsninger og fast marketingansvar uden at opbygge en fuld intern afdeling.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-2xl space-y-6">
            <Reveal>
              <p className="text-lg text-dark leading-relaxed text-pretty">
                Samarbejdet er direkte og tæt. Du taler med den person, der udvikler løsningen, prioriterer arbejdet og følger det til dørs.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg text-muted leading-relaxed text-pretty">
                Et mindre setup giver korte beslutningsveje og et tydeligt ansvar. Indsatsen prioriteres efter, hvad der giver bedst mening for din forretning.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-serif text-section text-navy mb-16 text-balance">Værdier</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-bg-light border border-navy/6 p-7 h-full">
                  <h3 className="font-serif text-xl text-navy mb-3">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-off-white py-22 lg:py-30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-off-white mb-6 max-w-2xl mx-auto text-balance">
              Lad os tage en kort afklaring.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button booking size="lg" variant="light">Book et møde</Button>
              <Button to="/kontakt" size="lg" variant="ghost" className="text-off-white border-off-white/20 hover:border-off-white/50">
                Kontakt os
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default About;
