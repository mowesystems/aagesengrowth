import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ServiceLedger from '@/components/ServiceLedger';
import PageHero from '@/components/PageHero';
import company from '@/config/company';
import services from '@/data/services';
import { adMaterialDisclaimer } from '@/data/pricing';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Ydelser', item: `${company.domain}/ydelser` },
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
      provider: { '@type': 'ProfessionalService', name: company.legalName, url: company.domain },
    },
  })),
};

const combinations = [
  {
    title: 'Nyt website',
    body: 'Website + tracking. Så er fundamentet på plads, og alt det efterfølgende kan måles fra dag ét.',
    ids: ['websites', 'tracking'],
  },
  {
    title: 'Vi bliver ikke fundet',
    body: 'SEO og AI-synlighed + de nødvendige rettelser på selve siden. Synlighed uden et sted at lande er spildt.',
    ids: ['seo', 'websites'],
  },
  {
    title: 'Vi vil have gang i salget nu',
    body: 'Tracking + annoncering. Målingen først, ellers optimerer man i blinde på klikpriser.',
    ids: ['tracking', 'google-ads'],
  },
];

const Services: React.FC = () => (
  <>
    <SEOHead
      title="Ydelser — hvad der er med, og hvad der ikke er"
      description="Websites, SEO og AI-synlighed, Google Ads, Meta Ads, tracking, hosting, WooCommerce-optimering og strategisk rådgivning. Med tydeligt omfang og tydelige undtagelser."
      canonical="/ydelser"
      schema={[breadcrumbSchema, serviceSchema]}
    />

    <PageHero
      eyebrow="Ydelser"
      title="Otte ydelser, og et tydeligt svar på, hvad der ikke er med."
      lead="De fleste kan købes alene. Nogle giver kun mening sammen med noget andet — det står ved hver enkelt, også når det koster os salget."
    />

    <section className="bg-ink py-14 lg:py-20">
      <div className="shell">
        <ServiceLedger services={services} detailed />

        <Reveal>
          <div className="marked mt-12 border border-cream/20 bg-ink-2 p-6 text-cream/25 sm:p-8">
            <div className="flex flex-col gap-6 text-cream sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="meta">Om annoncering</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
                  {adMaterialDisclaimer}
                </p>
              </div>
              <Button to="/priser" variant="outline" className="shrink-0">
                Se alle priser
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ---------------------------------------------------- combinations */}
    <section className="border-y border-cream/12 bg-ink-2 py-16 lg:py-22">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Kombinationer</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Hvad folk typisk starter med.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Ikke pakker, og ikke noget der skal købes samlet. Bare de kombinationer, der oftest giver
            mening — og hvorfor rækkefølgen er, som den er.
          </p>
        </div>

        <div className="ledger mt-10">
          {combinations.map((combination, index) => (
            <div key={combination.title} className="ledger-row">
              <div className="grid grid-cols-1 items-start gap-x-10 gap-y-3 py-7 md:grid-cols-12">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="meta-muted opacity-70">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-xl leading-snug text-cream">{combination.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-dim md:col-span-5">
                  {combination.body}
                </p>
                <ul className="flex flex-wrap gap-1.5 md:col-span-3 md:justify-end">
                  {combination.ids.map((id) => {
                    const service = services.find((entry) => entry.id === id);
                    if (!service) return null;
                    return (
                      <li key={id}>
                        <Link
                          to={service.href}
                          className="inline-flex min-h-9 items-center border border-cream/20 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim transition-colors hover:border-cream hover:text-cream"
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-ink py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Ikke sikker på hvad I har brug for?</p>
            <h2 className="mt-4 max-w-2xl font-serif text-display text-cream text-balance">
              Prøv website-tjekket. Det tager under et minut.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-dim">
              Vælg det, I genkender, og få den rækkefølge vi ville arbejde i. Ingen mailadresse
              påkrævet.
            </p>
          </div>
          <Button to="/#website-tjek" size="lg" className="shrink-0">
            Til website-tjekket
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
