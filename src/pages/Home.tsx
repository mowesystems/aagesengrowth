import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Monitor,
  RefreshCw,
  Target,
  TextSearch,
  TrendingUp,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CaseCard from '@/components/CaseCard';
import GrowthDashboard from '@/components/GrowthDashboard';
import ServiceGrid from '@/components/ServiceGrid';
import PricingCard from '@/components/PricingCard';
import services from '@/data/services';
import cases from '@/data/cases';
import { websitePackages, pricingNote } from '@/data/pricing';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aagesen Growth ApS',
  url: 'https://www.aagesengrowth.dk',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Aagesen Growth ApS',
  legalName: 'Aagesen Growth ApS',
  description: 'Websites, marketing, SEO, GEO og AI-synlighed samlet hos én ansvarlig partner.',
  url: 'https://www.aagesengrowth.dk',
};

const valueStatements = [
  ['01', 'Stærkere digitalt fundament'],
  ['02', 'Bedre synlighed'],
  ['03', 'Klarere kunderejse'],
  ['04', 'Løbende optimering'],
];

const process = [
  { num: '01', title: 'Indsigt & analyse', text: 'Vi forstår forretningen, kunderne og den vigtigste opgave.', icon: TextSearch },
  { num: '02', title: 'Strategi & plan', text: 'Vi prioriterer indsatsen og samler den i en klar plan.', icon: Target },
  { num: '03', title: 'Eksekvering', text: 'Vi designer, udvikler og producerer det aftalte.', icon: Monitor },
  { num: '04', title: 'Optimering', text: 'Vi tester, måler og forbedrer det, der er sat i gang.', icon: TrendingUp },
  { num: '05', title: 'Vækst & resultater', text: 'Vi skaber fremdrift gennem vedholdende forbedringer.', icon: RefreshCw },
];

const Home: React.FC = () => (
  <>
    <SEOHead
      title="Aagesen Growth ApS — Websites, marketing og AI-synlighed"
      description="Aagesen Growth ApS hjælper virksomheder med websites, annoncering, SEO, GEO og AI-synlighed — samlet hos én ansvarlig partner."
      canonical="/"
      schema={[websiteSchema, orgSchema]}
    />

    <section className="hero-light grid-bg-light">
      <div className="max-w-content mx-auto grid grid-cols-1 items-center gap-11 px-6 pb-16 pt-32 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Websites · Marketing · AI-synlighed</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-5 max-w-[11.5ch] font-serif text-[clamp(2.75rem,4.4vw,4.15rem)] leading-[1.02] tracking-[-0.025em] text-navy">
              <span className="block">Websites, marketing</span>
              <span className="block">og AI-synlighed der</span>
              <em className="block font-normal">skaber målbare resultater.</em>
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Aagesen Growth hjælper virksomheder med at blive fundet, valgt og anbefalet gennem stærke websites, skarpe kampagner og bedre synlighed i Google og AI-søgninger.
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button booking size="lg">Book et møde <ArrowRight size={16} className="ml-2" aria-hidden="true" /></Button>
              <Link to="/projekter" className="inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-medium text-navy transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Se cases <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 flex items-center gap-2 text-xs leading-relaxed text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Direkte samarbejde · ét samlet ansvar · løbende prioritering
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <GrowthDashboard />
          </Reveal>
        </div>
      </div>
    </section>

    <section className="bg-bg-light py-16 lg:py-20" aria-labelledby="services-heading">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Ydelser</p>
          <h2 id="services-heading" className="mt-3 font-serif text-section text-navy">Et samlet digitalt fundament.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Otte konkrete discipliner, der kan stå alene eller samles omkring ét fælles mål.
          </p>
        </div>
        <ServiceGrid services={services} />
      </div>
    </section>

    <section className="value-band grid-bg">
      <div className="max-w-content mx-auto grid grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {valueStatements.map(([num, statement]) => (
          <div key={num} className="value-band-item">
            <span>{num}</span>
            <p>{statement}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-bg-light py-16 lg:py-20">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Udvalgte projekter</p>
            <h2 className="mt-3 font-serif text-section text-navy">Resultater, der gør en forskel.</h2>
          </div>
          <Link to="/projekter" className="hidden min-h-11 items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-accent sm:inline-flex">
            Se alle projekter <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {cases.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <CaseCard item={item} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-navy/10 bg-off-white py-16 lg:py-20">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <p className="eyebrow">Sådan arbejder vi</p>
        <h2 className="mt-3 font-serif text-section text-navy">En struktureret proces.</h2>
        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={index * 50}>
                <div className="process-card">
                  <div className="flex items-center justify-between">
                    <span className="process-number">{step.num}</span>
                    <Icon size={22} strokeWidth={1.4} className="text-navy" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 font-serif text-xl text-navy">{step.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-bg-light py-14 lg:py-16">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Samarbejdsformer</p>
          <h2 className="mt-3 font-serif text-section text-navy">Tydelige rammer. Tilpasset opgaven.</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {websitePackages.map((item) => <PricingCard key={item.id} item={item} compact />)}
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-3xl text-xs leading-relaxed text-muted">{pricingNote}</p>
          <Link to="/priser" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-navy hover:text-accent">
            Se alle priser <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    <section className="bg-navy text-off-white">
      <div className="max-w-content mx-auto grid grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-section text-off-white">Klar til at skabe en stærkere digital retning?</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-off-white/60">
            Book en uforpligtende samtale om jeres website, marketing og den indsats, der skal prioriteres først.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button booking variant="light">Book et møde <ArrowRight size={15} className="ml-2" aria-hidden="true" /></Button>
            <Link to="/kontakt" className="inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-medium text-off-white hover:text-accent">
              Skriv til os <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid gap-3 border-l border-off-white/15 pl-0 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:pl-8">
          {['Strategisk sparring', 'Konkrete prioriteringer', 'Én ansvarlig partner'].map((item) => (
            <p key={item} className="flex items-center gap-3 text-sm text-off-white/70">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/60 text-xs text-accent">✓</span>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Home;
