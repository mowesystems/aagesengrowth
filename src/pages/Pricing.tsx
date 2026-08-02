import React from 'react';
import { AlertCircle, ArrowDown, ArrowRight, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PricingCard from '@/components/PricingCard';
import PricingFAQ from '@/components/PricingFAQ';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import company from '@/config/company';
import {
  allPricingItems,
  carePackages,
  formatAmount,
  formatPrice,
  growthPartner,
  growthPartnerBundle,
  marketingServices,
  pricingFaq,
  pricingNote,
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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: allPricingItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: item.name,
      description: item.description,
      provider: { '@type': 'ProfessionalService', name: company.legalName, url: company.domain },
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'DKK',
        url: `${company.domain}/priser`,
      },
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const Pricing: React.FC = () => (
  <>
    <SEOHead
      title="Priser | Websites, SEO og annoncering | Aagesen Growth ApS"
      description="Se priser på hjemmesider, hosting, vedligeholdelse, SEO, Google Ads, Meta Ads, tracking og WooCommerce-optimering hos Aagesen Growth ApS."
      canonical="/priser"
      schema={[breadcrumbSchema, serviceSchema, faqSchema]}
    />

    <section className="inner-hero grid-bg-light">
      <div className="relative max-w-content mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          <Reveal><p className="eyebrow">Priser og samarbejdsformer</p></Reveal>
          <Reveal delay={70}>
            <h1 className="mt-5 max-w-4xl font-serif text-display text-navy text-balance">
              Tydelige rammer for jeres næste digitale skridt.
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Vælg et klart udgangspunkt, og tilpas løsningen efter jeres behov. Alle leverancer afgrænses skriftligt, før arbejdet starter.
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button booking size="lg">Book en afklaring <ArrowRight size={15} className="ml-2" aria-hidden="true" /></Button>
              <Button to="/kontakt" size="lg" variant="outline">Få et tilbud</Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-4">
          <nav aria-label="Indhold på prissiden" className="border border-navy/10 bg-bg-light p-6">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">Gå direkte til</p>
            <ul className="mt-3">
              {[
                ['Hjemmesider', '#hjemmesider'],
                ['Hosting og Care', '#hosting'],
                ['Marketing og tilvalg', '#marketing'],
                ['Growth Partner', '#growth-partner'],
                ['FAQ', '#pris-faq'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="flex min-h-11 items-center justify-between border-b border-navy/10 text-sm text-navy transition-colors last:border-b-0 hover:text-accent">
                    {label} <ArrowDown size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>

    <section id="hjemmesider" className="scroll-mt-28 bg-bg-light py-16 lg:py-24" aria-labelledby="website-pricing-heading">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Hjemmesidepakker</p>
          <h2 id="website-pricing-heading" className="mt-3 font-serif text-section text-navy">Fra solid lancering til en løsning med særlige krav.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">Alle tre pakker starter med en klar afgrænsning af sider, funktioner, materiale og tidsplan.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {websitePackages.map((item, index) => <Reveal key={item.id} delay={index * 60}><PricingCard item={item} /></Reveal>)}
        </div>
      </div>
    </section>

    <section id="hosting" className="scroll-mt-28 border-y border-navy/10 bg-off-white py-16 lg:py-24" aria-labelledby="hosting-pricing-heading">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Hosting og vedligeholdelse</p>
          <h2 id="hosting-pricing-heading" className="mt-3 font-serif text-section text-navy">Stabil drift med et tydeligt serviceniveau.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">Vælg ren hosting eller en Care-aftale, når der også skal være plads til teknisk vedligeholdelse og mindre ændringer.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {carePackages.map((item, index) => <Reveal key={item.id} delay={index * 60}><PricingCard item={item} /></Reveal>)}
        </div>
      </div>
    </section>

    <section id="marketing" className="scroll-mt-28 bg-bg-light py-16 lg:py-24" aria-labelledby="marketing-pricing-heading">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Marketing og tilvalg</p>
          <h2 id="marketing-pricing-heading" className="mt-3 font-serif text-section text-navy">Specialister, når opgaven kræver det.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">Fra-priserne afspejler et afgrænset udgangspunkt. Omfanget afhænger blandt andet af løsning, markeder, kampagner og eksisterende opsætning.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {marketingServices.map((item, index) => (
            <Reveal key={item.id} delay={(index % 2) * 50}>
              <div id={item.id === 'woocommerce' ? 'woocommerce' : undefined} className="h-full scroll-mt-28">
                <PricingCard item={item} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section id="growth-partner" className="scroll-mt-28 bg-navy py-16 text-off-white lg:py-24" aria-labelledby="growth-partner-heading">
      <div className="max-w-content mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Samlet samarbejde</p>
          <h2 id="growth-partner-heading" className="mt-3 font-serif text-section text-off-white">{growthPartner.name}</h2>
          <p className="mt-5 font-serif text-[clamp(2rem,4vw,3.1rem)] leading-none text-off-white">
            {formatPrice(growthPartner)}
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-off-white/65 sm:text-base">{growthPartner.description}</p>
          <Button to={growthPartner.ctaHref} variant="light" size="lg" className="mt-8">
            {growthPartner.ctaLabel} <ArrowRight size={15} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-8 border border-off-white/15 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">{growthPartner.featureLabel}</p>
              <ul className="mt-5 space-y-3">
                {growthPartner.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-off-white/80"><Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">Rammer for aftalen</p>
              <ul className="mt-5 space-y-3">
                {growthPartner.exclusions?.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-off-white/65"><AlertCircle size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-x border-b border-accent/35 bg-accent/10 p-6 sm:p-8">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">Bundlefordel</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-off-white/75">
              {growthPartnerBundle.description} <strong className="text-off-white">{formatAmount(growthPartnerBundle.price)} kr./md.</strong>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-off-white/50">Det er en bundlepris og ændrer ikke Care-pakkens normale pris.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-navy/10 bg-off-white py-16 lg:py-20" aria-labelledby="pricing-terms-heading">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Klare forventninger</p>
            <h2 id="pricing-terms-heading" className="mt-3 font-serif text-section text-navy">Det aftaler vi, før vi går i gang.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-8">
            <div className="border border-navy/10 bg-bg-light p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-navy">Det konkrete tilbud</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">Beskriver leverancer, ansvar, korrekturrunder, tidsplan og betalingsplan. Ændringer uden for det aftalte scope vurderes og prissættes separat.</p>
            </div>
            <div className="border border-navy/10 bg-bg-light p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-navy">Materiale og annoncebudget</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">Annoncebudget afregnes separat. Annoncemateriale leveres af kunden eller aftales som et særskilt tilkøb.</p>
            </div>
          </div>
        </div>
        <p className="mt-10 border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">{pricingNote}</p>
      </div>
    </section>

    <section id="pris-faq" className="scroll-mt-28 bg-bg-light py-16 lg:py-24" aria-labelledby="pricing-faq-heading">
      <div className="max-w-content mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ om priser</p>
          <h2 id="pricing-faq-heading" className="mt-3 font-serif text-section text-navy">Spørgsmål før samarbejdet starter.</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">Få styr på betaling, materiale, rettelser og de månedlige aftalers rammer.</p>
        </div>
        <div className="lg:col-span-8"><PricingFAQ items={pricingFaq} /></div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-navy py-16 text-off-white lg:py-20">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative max-w-content mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-end lg:px-10">
        <div>
          <h2 className="max-w-2xl font-serif text-section text-off-white">Er du i tvivl om, hvilken løsning der passer?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-off-white/65 sm:text-base">Book en kort og uforpligtende afklaring. Så gennemgår vi behov, ambitionsniveau og det mest realistiske næste skridt.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button booking size="lg" variant="light">Book et møde</Button>
          <Button to="/kontakt" size="lg" variant="outline">Send en forespørgsel</Button>
        </div>
      </div>
    </section>
  </>
);

export default Pricing;
