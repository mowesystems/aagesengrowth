import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ServiceGrid from '@/components/ServiceGrid';
import services from '@/data/services';

const Services: React.FC = () => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://www.aagesengrowth.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Ydelser', item: 'https://www.aagesengrowth.dk/ydelser' },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: { '@type': 'ProfessionalService', name: 'Aagesen Growth ApS' },
      },
    })),
  };

  const process = ['Afklaring', 'Prioritering', 'Eksekvering', 'Måling', 'Løbende forbedring'];

  return (
    <>
      <SEOHead
        title="Ydelser"
        description="Websites, SEO, AI-synlighed, Google Ads, Meta Ads, indhold, tracking, hosting og strategi fra Aagesen Growth ApS."
        canonical="/ydelser"
        schema={[breadcrumbSchema, serviceSchema]}
      />

      <section className="inner-hero grid-bg-light">
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal><p className="eyebrow">Ydelser</p></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-navy text-balance">
              Fra digitalt fundament til løbende vækst.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
              Otte konkrete ydelser, der kan stå alene eller samles i et tæt samarbejde med én klar retning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-light py-16 lg:py-24" aria-labelledby="service-overview">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Kompetencer</p>
            <h2 id="service-overview" className="mt-3 font-serif text-section text-navy">Det vi hjælper med.</h2>
          </div>
          <ServiceGrid services={services} showFeatures />
        </div>
      </section>

      <section className="value-band grid-bg">
        <div className="max-w-content mx-auto grid grid-cols-1 px-6 md:grid-cols-3 lg:px-10">
          {[
            ['01', 'Klar retning', 'Vi prioriterer det, der skaber størst værdi først.'],
            ['02', 'Samlet eksekvering', 'Website, marketing og data arbejder i samme retning.'],
            ['03', 'Løbende forbedring', 'Indsatsen måles, justeres og udvikles over tid.'],
          ].map(([number, title, text]) => (
            <div key={number} className="border-b border-off-white/10 py-9 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="text-xs text-accent">{number}</span>
              <h2 className="mt-4 font-serif text-2xl text-off-white">{title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-navy/10 bg-off-white py-16 lg:py-20">
        <div className="max-w-content mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">Arbejdsform</p>
            <h2 className="mt-3 max-w-md font-serif text-section text-navy">Fra afklaring til stabil drift.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              En enkel proces skaber fremdrift, tydeligt ansvar og plads til at forbedre undervejs.
            </p>
          </div>
          <ol className="border-t border-navy/10 lg:col-span-7">
            {process.map((step, index) => (
              <li key={step} className="flex min-h-16 items-center gap-5 border-b border-navy/10 py-4">
                <span className="text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-serif text-xl text-navy">{step}</span>
                <Check size={16} className="ml-auto text-muted" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-off-white lg:py-20">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-end lg:px-10">
          <div>
            <p className="eyebrow">Næste skridt</p>
            <h2 className="mt-3 max-w-2xl font-serif text-display text-off-white text-balance">Lad os finde den rette kombination.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-off-white/60">
              En kort, uforpligtende samtale er nok til at afklare behov, retning og første prioritet.
            </p>
          </div>
          <Button booking size="lg" variant="light">Book et møde <ArrowRight size={15} className="ml-2" aria-hidden="true" /></Button>
        </div>
      </section>
    </>
  );
};

export default Services;
