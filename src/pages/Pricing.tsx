import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import PricingCard from '@/components/PricingCard';
import Accordion from '@/components/Accordion';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import company from '@/config/company';
import { pricingFaq } from '@/data/faq';
import {
  allPricingItems,
  carePackages,
  formatAmount,
  growthPartner,
  growthPartnerBundle,
  marketingServices,
  priceParts,
  pricingNote,
  toOfferSchema,
  websitePackages,
} from '@/data/pricing';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Priser', item: `${company.domain}/priser` },
  ],
};

/**
 * One catalogue of offers.
 *
 * "Fra"-priced items are emitted with a minPrice PriceSpecification rather than
 * a flat price, so the structured data cannot claim a fixed price the page does
 * not promise. FAQPage schema deliberately lives only on /faq — these same
 * questions appearing as FAQPage on two URLs is duplicate markup.
 */
const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Priser — Aagesen Growth ApS',
  url: `${company.domain}/priser`,
  itemListElement: allPricingItems.map((item) => ({
    ...toOfferSchema(item, `${company.domain}/priser`),
    itemOffered: { '@type': 'Service', name: item.name, description: item.description },
  })),
};

const jumpLinks = [
  ['Hjemmesider', '#hjemmesider'],
  ['Hosting og Care', '#hosting'],
  ['Marketing', '#marketing'],
  ['Growth Partner', '#growth-partner'],
  ['Spørgsmål', '#pris-faq'],
];

const Pricing: React.FC = () => (
  <>
    <SEOHead
      title="Priser — websites, SEO og annoncering"
      description="Faste priser på hjemmesider fra 9.995 kr., hosting fra 299 kr./md. og marketing fra 2.495 kr./md. Alle priser ekskl. moms, med tydelige undtagelser."
      canonical="/priser"
      schema={[breadcrumbSchema, offerCatalogSchema]}
    />

    <PageHero
      eyebrow="Priser"
      title="Priserne står på siden. Også dem, der ikke er pæne."
      lead="Alle beløb er ekskl. moms og vejledende, indtil omfanget er afklaret skriftligt. Hvad der ikke er inkluderet, står ved hver enkelt."
      aside={
        <nav aria-label="Indhold på siden" className="w-full lg:max-w-xs">
          <p className="meta-muted">Gå til</p>
          <ul className="ledger mt-3">
            {jumpLinks.map(([label, href]) => (
              <li key={href} className="ledger-row">
                <a
                  href={href}
                  className="flex min-h-12 items-center justify-between gap-4 text-sm text-cream transition-colors hover:text-gold"
                >
                  {label}
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      }
    />

    {/* ----------------------------------------------------- websites */}
    <section id="hjemmesider" className="scroll-mt-24 bg-ink py-16 lg:py-22">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Hjemmesider</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Tre udgangspunkter. Ét skriftligt tilbud.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Alle tre starter med en afklaring af sider, funktioner, materiale og tidsplan — så I ved,
            hvad I får, før noget går i gang.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {websitePackages.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 60}>
              <PricingCard item={item} />
            </Reveal>
          ))}
        </div>

        <p className="mt-7 max-w-3xl border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-dim">
          Tekster, billeder, logo og virksomhedsoplysninger leveres som udgangspunkt af jer. Skal vi
          producere indhold, aftales det særskilt.
        </p>
      </div>
    </section>

    {/* ------------------------------------------------------- hosting */}
    <section
      id="hosting"
      className="scroll-mt-24 border-y border-cream/12 bg-ink-2 py-16 lg:py-22"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Hosting og vedligeholdelse</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Drift med et serviceniveau, der står skrevet ned.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Ubrugt tid overføres ikke til næste måned. Det er en serviceaftale, ikke en timebank.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {carePackages.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 60}>
              <PricingCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------- marketing */}
    <section id="marketing" className="scroll-mt-24 bg-ink py-16 lg:py-22">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Marketing og tilvalg</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Løbende arbejde og afgrænsede opgaver.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Fra-priserne dækker et afgrænset udgangspunkt. Antal kanaler, markeder og kampagner
            flytter prisen — i begge retninger.
          </p>
        </div>

        {/* A ruled table reads faster than eight cards, and stays comparable
            on a narrow screen where cards force horizontal comparison. */}
        <div className="ledger mt-10">
          {marketingServices.map((item) => {
            const price = priceParts(item);
            return (
              <div key={item.id} id={item.id} className="ledger-row scroll-mt-24">
                <div className="grid grid-cols-1 items-start gap-x-10 gap-y-5 py-8 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-2xl leading-tight text-cream">{item.name}</h3>
                    <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5">
                      {price.prefix && (
                        <span className="font-mono text-xs text-dim">{price.prefix}</span>
                      )}
                      <span className="font-serif text-3xl leading-none text-cream">
                        {price.amount}
                      </span>
                      {price.period && (
                        <span className="font-mono text-xs text-dim">{price.period}</span>
                      )}
                    </p>
                    {price.suffix && (
                      <p className="mt-1.5 font-mono text-xs text-dim">{price.suffix}</p>
                    )}
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-dim">
                      {item.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="meta-muted">{item.featureLabel || 'Inkluderer'}</p>
                    <ul className="mt-3.5 space-y-2">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-cream">
                          <Check
                            size={13}
                            className="mt-1 shrink-0 text-gold"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4">
                    {item.exclusions && (
                      <>
                        <p className="meta-muted">Ikke inkluderet</p>
                        <ul className="mt-3.5 space-y-2">
                          {item.exclusions.map((exclusion) => (
                            <li
                              key={exclusion}
                              className="flex gap-2.5 text-xs leading-relaxed text-dim"
                            >
                              <Minus size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                              {exclusion}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {item.note && (
                      <p className="mt-4 text-xs leading-relaxed text-dim">{item.note}</p>
                    )}
                    {item.ctaLabel && item.ctaHref && (
                      <Link to={item.ctaHref} className="link-quiet mt-4">
                        {item.ctaLabel}
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ------------------------------------------------- growth partner */}
    <section
      id="growth-partner"
      className="on-light relative scroll-mt-24 overflow-hidden bg-cream py-16 text-ink lg:py-22"
    >
      <div className="grid-lines-dark absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="meta-on-light">Samlet aftale</p>
            <h2 className="mt-4 font-serif text-section text-ink">{growthPartner.name}</h2>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono text-xs text-dim-ink">
                {priceParts(growthPartner).prefix}
              </span>
              <span className="font-serif text-[3.2rem] leading-none text-ink">
                {priceParts(growthPartner).amount}
              </span>
              <span className="font-mono text-xs text-dim-ink">
                {priceParts(growthPartner).period}
              </span>
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-dim-ink">
              {growthPartner.description}
            </p>
            <Button to={growthPartner.ctaHref} variant="light" size="lg" className="mt-8">
              {growthPartner.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <p className="meta-on-light">{growthPartner.featureLabel}</p>
                <ul className="mt-4 space-y-2.5">
                  {growthPartner.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-ink/85">
                      <Check size={14} className="mt-1 shrink-0 text-gold-ink" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="meta-on-light">Rammer for aftalen</p>
                <ul className="mt-4 space-y-2.5">
                  {growthPartner.exclusions?.map((entry) => (
                    <li key={entry} className="flex gap-3 text-sm leading-relaxed text-dim-ink">
                      <Minus size={13} className="mt-1 shrink-0 text-gold-ink" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="marked mt-10 border border-gold/40 p-6 text-gold-ink sm:p-7">
              <p className="meta-on-light">Bundlefordel</p>
              <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-ink/85">
                {growthPartnerBundle.description}{' '}
                <strong className="font-semibold text-ink">
                  {formatAmount(growthPartnerBundle.price)} kr./md.
                </strong>
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-ink/50">
                Det er en bundlepris, der forudsætter mindst to løbende marketingydelser. Den ændrer
                ikke Care-pakkens normale pris på {formatAmount(999)} kr./md.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------------- terms */}
    <section className="bg-ink py-16 lg:py-20">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta">Før vi går i gang</p>
            <h2 className="mt-4 font-serif text-section text-cream text-balance">
              Hvad der aftales skriftligt.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            <div className="border border-cream/15 bg-ink-2 p-6 sm:p-7">
              <h3 className="font-serif text-xl text-cream">Tilbuddet</h3>
              <p className="mt-4 text-sm leading-relaxed text-dim">
                Leverancer, ansvar, korrekturrunder, tidsplan og betalingsplan. Ændringer uden for
                det aftalte vurderes og prissættes, før de sættes i gang.
              </p>
            </div>
            <div className="border border-cream/15 bg-ink-2 p-6 sm:p-7">
              <h3 className="font-serif text-xl text-cream">Binding og opsigelse</h3>
              <p className="mt-4 text-sm leading-relaxed text-dim">
                Bindingsperiode og opsigelsesvilkår fremgår af det konkrete tilbud og
                aftalegrundlag. De aftales, før noget går i gang.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-4xl border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-dim">
          {pricingNote}
        </p>
      </div>
    </section>

    {/* ------------------------------------------------------------- faq */}
    <section
      id="pris-faq"
      className="scroll-mt-24 border-t border-cream/12 bg-ink-2 py-16 lg:py-22"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta">Om pris og betaling</p>
            <h2 className="mt-4 font-serif text-section text-cream text-balance">
              Spørgsmål, før I beslutter jer.
            </h2>
            <Link to="/faq" className="link-quiet mt-5">
              Alle spørgsmål
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={pricingFaq} openFirst />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Pricing;
