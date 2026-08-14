import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import PricingCard from '@/components/PricingCard';
import Accordion from '@/components/Accordion';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import SectionIndex, { type SectionLink } from '@/components/SectionIndex';
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

const sections: SectionLink[] = [
  { id: 'hjemmesider', label: 'Websites' },
  { id: 'hosting', label: 'Drift' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'growth-partner', label: 'Growth Partner' },
  { id: 'pris-faq', label: 'Spørgsmål' },
];

const Pricing: React.FC = () => (
  <>
    <SEOHead
      title="Priser — websites, annoncering og Search Visibility"
      description="Faste priser på hjemmesider fra 9.995 kr., hosting fra 299 kr./md. og marketing fra 2.495 kr./md. Alle priser ekskl. moms, med tydelige undtagelser."
      canonical="/priser"
      schema={[breadcrumbSchema, offerCatalogSchema]}
    />

    <PageHero
      eyebrow="Priser"
      title="Priserne står på siden. Også dem, der ikke er pæne."
      lead="Alle beløb er ekskl. moms og vejledende, indtil omfanget er afklaret skriftligt. Hvad der ikke er inkluderet, står ved hver enkelt."
    />

    <SectionIndex links={sections} aria-label="Indhold på prissiden" />

    {/* ----------------------------------------------------- websites */}
    <section id="hjemmesider" className="scroll-mt-32 bg-ink py-18 lg:py-26">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Hjemmesider</p>
            <h2 className="mt-6 max-w-measure font-display text-section text-paper text-balance">
              Tre udgangspunkter. Ét skriftligt tilbud.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Alle tre starter med en afklaring af sider, funktioner, materiale og tidsplan — så I
            ved, hvad I får, før noget går i gang.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-px bg-paper/10 lg:grid-cols-3">
          {websitePackages.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 60}>
              <PricingCard item={item} />
            </Reveal>
          ))}
        </div>

        <p className="mt-9 max-w-prose border-l border-cyan/40 pl-5 text-sm leading-relaxed text-muted">
          Tekster, billeder, logo og virksomhedsoplysninger leveres som udgangspunkt af jer. Skal vi
          producere indhold, aftales det særskilt.
        </p>
      </div>
    </section>

    {/* ------------------------------------------------------- hosting */}
    <section
      id="hosting"
      className="scroll-mt-32 border-y border-paper/10 bg-ink-2 py-18 lg:py-26"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Hosting og vedligeholdelse</p>
            <h2 className="mt-6 max-w-measure font-display text-section text-paper text-balance">
              Drift med et serviceniveau, der står skrevet ned.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Ubrugt tid overføres ikke til næste måned. Det er en serviceaftale, ikke en timebank.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-px bg-paper/10 lg:grid-cols-3">
          {carePackages.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 60}>
              <PricingCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------- marketing */}
    <section id="marketing" className="scroll-mt-32 bg-ink py-18 lg:py-26">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Marketing og tilvalg</p>
            <h2 className="mt-6 max-w-measure font-display text-section text-paper text-balance">
              Løbende arbejde og afgrænsede opgaver.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Fra-priserne dækker et afgrænset udgangspunkt. Antal kanaler, markeder og kampagner
            flytter prisen — i begge retninger.
          </p>
        </div>

        {/* A ruled list rather than a table: it stays readable on a 320px
            screen, where a table would force horizontal scrolling. */}
        <div className="rule mt-12">
          {marketingServices.map((item) => {
            const price = priceParts(item);
            return (
              <div key={item.id} id={item.id} className="rule-row scroll-mt-32">
                <div className="grid grid-cols-4 items-start gap-x-6 gap-y-6 py-10 lg:grid-cols-12 lg:gap-x-10">
                  <div className="col-span-4 lg:col-span-4">
                    <h3 className="font-display text-title uppercase text-paper">{item.name}</h3>
                    {item.nameNote && <p className="meta mt-2">{item.nameNote}</p>}

                    <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                      {price.prefix && (
                        <span className="font-mono text-xs text-muted">{price.prefix}</span>
                      )}
                      <span className="font-display text-[2.4rem] leading-none text-paper">
                        {price.amount}
                      </span>
                      {price.period && (
                        <span className="font-mono text-xs text-muted">{price.period}</span>
                      )}
                    </p>
                    {price.suffix && (
                      <p className="mt-2 font-mono text-xs text-muted">{price.suffix}</p>
                    )}
                    <p className="mt-5 max-w-measure text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>

                  <div className="col-span-4 lg:col-span-4">
                    <p className="meta-lit">{item.featureLabel || 'Inkluderer'}</p>
                    <ul className="mt-4 space-y-2.5">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm leading-relaxed text-paper">
                          <Check size={13} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-4 lg:col-span-4">
                    {item.exclusions && (
                      <>
                        <p className="meta">Ikke inkluderet</p>
                        <ul className="mt-4 space-y-2.5">
                          {item.exclusions.map((exclusion) => (
                            <li
                              key={exclusion}
                              className="flex gap-3 text-xs leading-relaxed text-muted"
                            >
                              <Minus size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                              {exclusion}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {item.note && (
                      <p className="mt-5 text-xs leading-relaxed text-muted">{item.note}</p>
                    )}
                    {item.ctaLabel && item.ctaHref && (
                      <Link to={item.ctaHref} className="link-line mt-4">
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
      className="on-light relative scroll-mt-32 overflow-hidden bg-paper py-18 text-ink lg:py-26"
    >
      <div className="grid-lines-ink pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="frame relative">
        <div className="grid grid-cols-4 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-5">
            <p className="meta-ink">Samlet aftale</p>
            <h2 className="mt-6 font-display text-section uppercase text-ink">
              {growthPartner.name}
            </h2>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono text-xs text-muted-ink">
                {priceParts(growthPartner).prefix}
              </span>
              <span className="font-display text-[3.4rem] leading-none text-ink">
                {priceParts(growthPartner).amount}
              </span>
              <span className="font-mono text-xs text-muted-ink">
                {priceParts(growthPartner).period}
              </span>
            </p>
            <p className="mt-6 max-w-measure text-[0.95rem] leading-relaxed text-muted-ink">
              {growthPartner.description}
            </p>
            <Button to={growthPartner.ctaHref} variant="invert" size="lg" className="mt-9">
              {growthPartner.ctaLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="col-span-4 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
              <div>
                <p className="meta-ink">{growthPartner.featureLabel}</p>
                <ul className="mt-4 space-y-2.5">
                  {growthPartner.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-ink/85">
                      <Check
                        size={14}
                        className="mt-1 shrink-0 text-accent-ink"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="meta-ink">Rammer for aftalen</p>
                <ul className="mt-4 space-y-2.5">
                  {growthPartner.exclusions?.map((entry) => (
                    <li key={entry} className="flex gap-3 text-sm leading-relaxed text-muted-ink">
                      <Minus
                        size={13}
                        className="mt-1 shrink-0 text-accent-ink"
                        aria-hidden="true"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mt-12 border border-ink/20 p-6 sm:p-7">
              <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-[2px]" />
              <p className="meta-ink">Bundlefordel</p>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/85">
                {growthPartnerBundle.description}{' '}
                <strong className="font-medium text-ink">
                  {formatAmount(growthPartnerBundle.price)} kr./md.
                </strong>
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-ink">
                Det er en bundlepris, der forudsætter mindst to løbende marketingydelser. Den ændrer
                ikke Care-pakkens normale pris på {formatAmount(999)} kr./md.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ----------------------------------------------------------- terms */}
    <section className="bg-ink py-18 lg:py-24">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-4">
            <p className="meta-lit">Før vi går i gang</p>
            <h2 className="mt-6 font-display text-section text-paper text-balance">
              Hvad der aftales skriftligt.
            </h2>
          </div>
          <div className="col-span-4 grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            <div className="bg-ink p-6 sm:p-7">
              <h3 className="font-display text-title uppercase text-paper">Tilbuddet</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Leverancer, ansvar, korrekturrunder, tidsplan og betalingsplan. Ændringer uden for
                det aftalte vurderes og prissættes, før de sættes i gang.
              </p>
            </div>
            <div className="bg-ink p-6 sm:p-7">
              <h3 className="font-display text-title uppercase text-paper">Binding og opsigelse</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Bindingsperiode og opsigelsesvilkår fremgår af det konkrete tilbud og
                aftalegrundlag. De aftales, før noget går i gang.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-prose border-l border-cyan/40 pl-5 text-sm leading-relaxed text-muted">
          {pricingNote}
        </p>
      </div>
    </section>

    {/* ------------------------------------------------------------- faq */}
    <section
      id="pris-faq"
      className="scroll-mt-32 border-t border-paper/10 bg-ink-2 py-18 lg:py-26"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-4">
            <p className="meta-lit">Om pris og betaling</p>
            <h2 className="mt-6 font-display text-section text-paper text-balance">
              Spørgsmål, før I beslutter jer.
            </h2>
            <Link to="/faq" className="link-line mt-7">
              Alle spørgsmål
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="col-span-4 lg:col-span-7 lg:col-start-6">
            <Accordion items={pricingFaq} openFirst />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Pricing;
