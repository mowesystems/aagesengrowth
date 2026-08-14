import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/Accordion';
import DisciplineTicker from '@/components/DisciplineTicker';
import WebsiteDiagnostic from '@/components/WebsiteDiagnostic';
import HeroEditorial from '@/components/home/HeroEditorial';
import GrowthStages from '@/components/home/GrowthStages';
import ManifestoSection from '@/components/home/ManifestoSection';
import PricingPreview from '@/components/home/PricingPreview';
import FeaturedCase from '@/components/case/FeaturedCase';
import CaseFeature from '@/components/case/CaseFeature';
import company from '@/config/company';
import { featuredCase, supportingCases } from '@/data/cases';
import { featuredFaq } from '@/data/faq';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.legalName,
  url: company.domain,
};

/**
 * The homepage.
 *
 * The order is the argument: position, then evidence a visitor can check, then
 * the best piece of work at full width, then the system that produced it, then
 * the rest of the work, then a tool that is useful whether or not anyone gets
 * in touch, then how we work, then what it costs, then the questions people
 * ask before they decide.
 */
const Home: React.FC = () => (
  <>
    <SEOHead
      title="Aagesen Growth ApS — websites, annoncering og Search Visibility"
      description="Aagesen Growth bygger websites, Google Ads, Meta Ads og Search Visibility (SEO + GEO/AI-synlighed) for små og mellemstore virksomheder. Faste priser fra 9.995 kr."
      canonical="/"
      schema={websiteSchema}
    />

    <HeroEditorial />
    <DisciplineTicker />

    {/* -------------------------------------------------- selected work */}
    <section className="bg-ink py-20 lg:py-30" aria-labelledby="selected-work-heading">
      <div className="frame">
        <h2 id="selected-work-heading" className="sr-only">
          Udvalgt arbejde
        </h2>
        <FeaturedCase item={featuredCase} index="01" />

        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-paper/10 pt-10 sm:flex-row sm:items-center">
            <p className="max-w-measure text-sm leading-relaxed text-muted">
              Vil I have den samme gennemgang af jeres eget setup? Website-tjekket herunder giver
              rækkefølgen på under et minut — uden en mailadresse.
            </p>
            <Link to="/#website-tjek" className="btn btn-primary shrink-0">
              Få et website-tjek
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    {/* --------------------------------------------------- growth system */}
    <section
      className="border-y border-paper/10 bg-ink-2 py-20 lg:py-30"
      aria-labelledby="growth-system-heading"
    >
      <h2 id="growth-system-heading" className="sr-only">
        Vækstsystemet
      </h2>
      <div className="frame">
        <GrowthStages />
      </div>
    </section>

    {/* ------------------------------------------------- remaining cases */}
    <section className="bg-ink py-20 lg:py-30" aria-labelledby="more-work-heading">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Mere arbejde</p>
            <h2
              id="more-work-heading"
              className="mt-6 max-w-measure font-display text-section text-paper text-balance"
            >
              To projekter, der krævede noget helt andet.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Én lancering inde i et eksisterende brand. Ét produkt i en kategori, folk endnu ikke
            ved findes.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-30">
          {supportingCases.map((item, index) => (
            <CaseFeature
              key={item.id}
              item={item}
              index={String(index + 2).padStart(2, '0')}
              align={index % 2 === 0 ? 'left' : 'right'}
              showDisclosure={Boolean(item.disclosure)}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-16 border-t border-paper/10 pt-10">
            <Link to="/projekter" className="link-line">
              Se alle cases
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ---------------------------------------------- website diagnostic */}
    <section
      id="website-tjek"
      className="scroll-mt-24 border-t border-paper/10 bg-ink-2 py-20 lg:py-30"
      aria-labelledby="diagnostic-heading"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-7">
            <p className="meta-lit">Website-tjek</p>
            <h2
              id="diagnostic-heading"
              className="mt-6 max-w-[18ch] font-display text-section text-paper text-balance"
            >
              Prøv den del af arbejdet, de fleste springer over.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Vælg det, I genkender fra jeres egen side. Så får I den rækkefølge, vi ville arbejde i —
            og hvorfor. Det tager under et minut, og der er ingen mailadresse involveret.
          </p>
        </div>

        <Reveal delay={80}>
          <div className="mt-12 lg:mt-16">
            <WebsiteDiagnostic />
          </div>
        </Reveal>
      </div>
    </section>

    {/* -------------------------------------------------------- process */}
    <ManifestoSection />

    {/* -------------------------------------------------------- pricing */}
    <PricingPreview />

    {/* ------------------------------------------------------------ faq */}
    <section
      className="border-t border-paper/10 bg-ink-2 py-20 lg:py-30"
      aria-labelledby="home-faq-heading"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-4">
            <p className="meta-lit">Spørgsmål</p>
            <h2
              id="home-faq-heading"
              className="mt-6 font-display text-section text-paper text-balance"
            >
              Det, folk spørger om først.
            </h2>
            <Link to="/faq" className="link-line mt-7">
              Alle spørgsmål
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="col-span-4 lg:col-span-7 lg:col-start-6">
            <Accordion items={featuredFaq} openFirst />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
