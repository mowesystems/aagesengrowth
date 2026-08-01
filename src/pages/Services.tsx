import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
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
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
    })),
  };

  const websiteProcess = ['Afklaring', 'Struktur', 'Design', 'Udvikling', 'Lancering'];

  return (
    <>
      <SEOHead
        title="Ydelser"
        description="Hjemmesider, webshops, marketing, Google Ads, Meta Ads, SEO og GEO. Aagesen Growth samler de vigtigste digitale discipliner."
        canonical="/ydelser"
        schema={[breadcrumbSchema, serviceSchema]}
      />

      {/* Intro */}
      <section className="inner-hero grid-bg-light">
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-6">Ydelser</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-display text-navy mb-6 max-w-3xl text-balance">
              Fra digitalt fundament til løbende vækst.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg text-muted max-w-xl leading-relaxed text-pretty">
              Fire ydelsesområder, der kan stå alene eller samles i et fast samarbejde.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 01 — Websites */}
      <section id="websites" className="bg-bg-light py-18 lg:py-24 scroll-mt-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-xs font-sans font-medium text-accent mb-4 block">01</span>
                <h2 className="font-serif text-display text-navy mb-6 text-balance">
                  Websites, der ser professionelle ud og arbejder for forretningen.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-lg text-muted leading-relaxed mb-8 text-pretty">
                  Vi designer, udvikler og vedligeholder hjemmesider og webshops med stærk struktur, visuel identitet og fokus på konvertering.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
                  {services[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-dark">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <Button booking size="md">Book et møde</Button>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-off-white border border-navy/8 p-8">
                  <h3 className="font-serif text-xl text-navy mb-6">Projektforløb</h3>
                  <ol className="space-y-4">
                    {websiteProcess.map((step, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span className="font-serif text-lg text-accent/50 w-8 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-dark text-sm font-medium">{step}</span>
                        {i < websiteProcess.length - 1 && <span className="flex-1 h-px bg-navy/8" />}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Marketing */}
      <section id="marketing" className="bg-off-white py-18 lg:py-24 scroll-mt-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 lg:order-2">
              <Reveal>
                <span className="text-xs font-sans font-medium text-accent mb-4 block">02</span>
                <h2 className="font-serif text-display text-navy mb-6 text-balance">
                  Marketing & content
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-lg text-muted leading-relaxed mb-8 text-pretty">
                  {services[1].description}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="space-y-2.5 mb-8">
                  {services[1].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-dark">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <Link to="/kontakt" className="inline-flex min-h-11 items-center gap-2 text-sm font-sans font-medium text-navy hover:text-accent transition-colors">
                  Læs mere <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:order-1">
              <Reveal delay={100}>
                <div className="aspect-[16/10] bg-navy border border-navy/8 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="aspect-square bg-navy-2 border border-off-white/8 rounded-sm flex items-center justify-center">
                        <div className="w-8 h-8 border border-accent/20 rounded-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Ads */}
      <section id="ads" className="bg-bg-light py-18 lg:py-24 scroll-mt-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-sans font-medium text-accent mb-4 block">03</span>
                <h2 className="font-serif text-display text-navy mb-6 text-balance">
                  Google Ads & Meta Ads
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-lg text-muted leading-relaxed mb-8 text-pretty">
                  {services[2].description}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="space-y-2.5 mb-8">
                  {services[2].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-dark">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <Link to="/kontakt" className="inline-flex min-h-11 items-center gap-2 text-sm font-sans font-medium text-navy hover:text-accent transition-colors">
                  Læs mere <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-navy p-8 flex flex-col justify-between min-h-[200px]">
                    <span className="text-xs font-sans font-medium uppercase tracking-wider text-off-white/30">Google</span>
                    <span className="font-serif text-2xl text-off-white">Search Ads</span>
                  </div>
                  <div className="bg-off-white border border-navy/8 p-8 flex flex-col justify-between min-h-[200px]">
                    <span className="text-xs font-sans font-medium uppercase tracking-wider text-muted">Meta</span>
                    <span className="font-serif text-2xl text-navy">Facebook & Instagram</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — SEO */}
      <section id="seo" className="bg-off-white py-18 lg:py-24 scroll-mt-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 lg:order-2">
              <Reveal>
                <span className="text-xs font-sans font-medium text-accent mb-4 block">04</span>
                <h2 className="font-serif text-display text-navy mb-6 text-balance">
                  SEO, GEO & synlighed
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-lg text-muted leading-relaxed mb-8 text-pretty">
                  {services[3].description}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <ul className="space-y-2.5 mb-8">
                  {services[3].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-dark">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <Link to="/kontakt" className="inline-flex min-h-11 items-center gap-2 text-sm font-sans font-medium text-navy hover:text-accent transition-colors">
                  Læs mere <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:order-1">
              <Reveal delay={100}>
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-navy p-8 flex flex-col justify-between min-h-[200px]">
                    <span className="text-xs font-sans font-medium uppercase tracking-wider text-off-white/30">SEO</span>
                    <span className="font-serif text-xl text-off-white">Synlig i Google</span>
                  </div>
                  <div className="bg-navy-2 p-8 flex flex-col justify-between min-h-[200px]">
                    <span className="text-xs font-sans font-medium uppercase tracking-wider text-off-white/30">GEO</span>
                    <span className="font-serif text-xl text-off-white">Forstået i AI</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-off-white py-22 lg:py-30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-off-white mb-6 max-w-2xl mx-auto text-balance">
              Lad os finde den rette løsning.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button booking size="lg" variant="light">Book et møde</Button>
              <Button to="/kontakt" size="lg" variant="ghost" className="text-off-white border-off-white/20 hover:border-off-white/50">
                Skriv til os
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Services;
