import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ServiceLedger from '@/components/ServiceLedger';
import PageHero from '@/components/PageHero';
import company from '@/config/company';
import services, { getService, pillars, supportingServices } from '@/data/services';
import { adMaterialDisclaimer, marketingServices, priceLabelFor } from '@/data/pricing';

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

/** The four pillar services that stand alone, in reading order. */
const coreServices = ['websites', 'seo', 'google-ads', 'meta-ads']
  .map(getService)
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

/** The two that make up Digital Growth. */
const growthServices = ['tracking', 'strategy']
  .map(getService)
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

/** Priced specialist tasks that are bought as a defined piece of work. */
const specialistIds = ['speed', 'seo-audit', 'hourly-help'];
const specialists = marketingServices.filter((item) => specialistIds.includes(item.id));

const combinations = [
  {
    title: 'Nyt website',
    body: 'Website + tracking. Så er fundamentet på plads, og alt det efterfølgende kan måles fra dag ét.',
    ids: ['websites', 'tracking'],
  },
  {
    title: 'Vi bliver ikke fundet',
    body: 'Search Visibility + de nødvendige rettelser på selve siden. Synlighed uden et sted at lande er spildt.',
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
      description="Websites & Conversion, Google Ads, Meta Ads, Search Visibility (SEO + GEO/AI-synlighed) og Digital Growth. Plus hosting, WooCommerce og afgrænsede specialopgaver — med tydeligt omfang og tydelige undtagelser."
      canonical="/ydelser"
      schema={[breadcrumbSchema, serviceSchema]}
    />

    <PageHero
      eyebrow="Ydelser"
      title="Fem søjler, og et tydeligt svar på, hvad der ikke er med."
      lead="De fleste kan købes alene. Nogle giver kun mening sammen med noget andet — det står ved hver enkelt, også når det koster os salget."
    />

    {/* ------------------------------------------------------- pillars */}
    <section className="bg-ink py-18 lg:py-26" aria-labelledby="pillars-heading">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Søjlerne</p>
            <h2
              id="pillars-heading"
              className="mt-6 max-w-measure font-display text-section text-paper text-balance"
            >
              Fem ting, vi laver. Og de hænger sammen.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Hele omfanget står længere nede — inklusive det, der ikke er inkluderet. Det er den
            eneste del af en ydelsesside, der er værd at læse.
          </p>
        </div>

        <div className="rule mt-14">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 60} className="rule-row block">
              <Link
                to={pillar.href}
                className="group grid grid-cols-4 items-start gap-x-6 gap-y-5 py-9 lg:grid-cols-12 lg:gap-x-10 lg:py-11"
              >
                <div className="col-span-4 flex items-baseline gap-5 lg:col-span-5">
                  <span className="index-mark shrink-0 text-cyan/70">{pillar.index}</span>
                  <span>
                    <span className="block font-display text-display uppercase leading-[0.9] text-paper transition-colors duration-300 group-hover:text-cyan">
                      {pillar.title}
                    </span>
                    {pillar.explainer && (
                      <span className="meta mt-2.5 block">{pillar.explainer}</span>
                    )}
                  </span>
                </div>

                <p className="col-span-4 max-w-measure text-[0.95rem] leading-relaxed text-muted lg:col-span-5">
                  {pillar.promise}
                </p>

                <span className="col-span-4 flex flex-wrap gap-1.5 lg:col-span-2 lg:justify-end">
                  {pillar.covers.slice(0, 4).map((entry) => (
                    <span
                      key={entry}
                      className="border border-paper/12 px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-paper/30"
                    >
                      {entry}
                    </span>
                  ))}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* -------------------------------------------------------- detail */}
    <section
      className="border-y border-paper/10 bg-ink-2 py-18 lg:py-26"
      aria-labelledby="scope-heading"
    >
      <div className="frame">
        <p className="meta-lit">Omfang</p>
        <h2
          id="scope-heading"
          className="mt-6 max-w-[20ch] font-display text-section text-paper text-balance"
        >
          Hvad hver ydelse indeholder — og ikke indeholder.
        </h2>

        <div className="mt-12">
          <ServiceLedger services={coreServices} detailed />
        </div>

        {/* Digital Growth is one commercial pillar made of two services, so it
            gets its own anchor while both underlying rows keep theirs. */}
        <div id="digital-growth" className="mt-18 scroll-mt-28">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className="index-mark text-cyan/70">05</span>
            <h2 className="font-display text-display uppercase leading-[0.9] text-paper">
              Digital Growth
            </h2>
          </div>
          <p className="mt-5 max-w-prose text-[0.95rem] leading-relaxed text-muted">
            Det, der binder resten sammen. Købes som to afgrænsede ydelser — eller som en samlet
            Growth Partner-aftale.
          </p>

          <div className="mt-10">
            <ServiceLedger services={growthServices} detailed />
          </div>
        </div>

        <Reveal>
          <div className="relative mt-16 border border-paper/15 bg-ink p-6 sm:p-8">
            <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="meta-lit">Om annoncering</p>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
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

    {/* ---------------------------------------------------- supporting */}
    <section className="bg-ink py-18 lg:py-26" aria-labelledby="supporting-heading">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta">Drift og specialopgaver</p>
            <h2
              id="supporting-heading"
              className="mt-6 max-w-measure font-display text-section text-paper text-balance"
            >
              Det, der holder resten kørende.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Mindre synligt, og lige så nødvendigt. Kan købes til et eksisterende website, uanset
            hvem der har bygget det.
          </p>
        </div>

        <div className="mt-12">
          <ServiceLedger services={supportingServices} detailed />
        </div>

        <Reveal>
          <div className="mt-14">
            <p className="meta">Afgrænsede opgaver</p>
            <ul className="rule mt-6">
              {specialists.map((item) => (
                <li key={item.id} className="rule-row">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5">
                    <p className="font-sans text-[0.95rem] font-medium text-paper">{item.name}</p>
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-xs text-cyan">
                        {priceLabelFor(item.id)}
                      </span>
                      <Link
                        to={`/priser#${item.id}`}
                        className="link-line text-muted hover:text-paper"
                      >
                        Se detaljer
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>

    {/* -------------------------------------------------- combinations */}
    <section
      className="border-y border-paper/10 bg-ink-2 py-18 lg:py-26"
      aria-labelledby="combinations-heading"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Kombinationer</p>
            <h2
              id="combinations-heading"
              className="mt-6 max-w-measure font-display text-section text-paper text-balance"
            >
              Hvad folk typisk starter med.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Ikke pakker, og ikke noget der skal købes samlet. Bare de kombinationer, der oftest
            giver mening — og hvorfor rækkefølgen er, som den er.
          </p>
        </div>

        <div className="rule mt-12">
          {combinations.map((combination, index) => (
            <div key={combination.title} className="rule-row">
              <div className="grid grid-cols-4 items-start gap-x-6 gap-y-4 py-8 lg:grid-cols-12 lg:gap-x-10">
                <div className="col-span-4 flex items-baseline gap-5 lg:col-span-4">
                  <span className="index-mark text-cyan/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-title uppercase text-paper">
                    {combination.title}
                  </h3>
                </div>
                <p className="col-span-4 max-w-measure text-sm leading-relaxed text-muted lg:col-span-5">
                  {combination.body}
                </p>
                <ul className="col-span-4 flex flex-wrap gap-1.5 lg:col-span-3 lg:justify-end">
                  {combination.ids.map((id) => {
                    const service = getService(id);
                    if (!service) return null;
                    return (
                      <li key={id}>
                        <Link
                          to={service.href}
                          className="inline-flex min-h-9 items-center border border-paper/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-paper hover:text-paper"
                        >
                          {service.shortTitle}
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

    <section className="bg-ink py-18 lg:py-24">
      <div className="frame">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Ikke sikker på hvad I har brug for?</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-display uppercase text-paper text-balance">
              Prøv website-tjekket.
            </h2>
            <p className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-muted">
              Vælg det, I genkender, og få den rækkefølge vi ville arbejde i. Under et minut, ingen
              mailadresse påkrævet.
            </p>
          </div>
          <Button to="/#website-tjek" size="lg" className="shrink-0">
            Få et website-tjek
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
