import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import company from '@/config/company';
import services from '@/data/services';
import { packages, pricingNote } from '@/data/pricing';
import cases from '@/data/cases';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aagesen Growth',
  url: 'https://www.aagesengrowth.dk',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Aagesen Growth',
  description: 'Websites, marketing og digital vækst. Samlet ét sted.',
  url: 'https://www.aagesengrowth.dk',
  parentOrganization: { '@type': 'Organization', name: 'MOWE Systems ApS' },
};

const Home: React.FC = () => {
  const process = [
    { num: '01', title: 'Forståelse', text: 'Vi sætter os ind i virksomheden, kunderne og de vigtigste mål.' },
    { num: '02', title: 'Retning', text: 'Vi definerer prioriteter, struktur og en klar plan.' },
    { num: '03', title: 'Produktion', text: 'Vi designer, udvikler og udfører det aftalte arbejde.' },
    { num: '04', title: 'Optimering', text: 'Vi følger resultaterne og forbedrer løbende.' },
  ];

  const positioningPoints = [
    'Strategi og eksekvering samlet',
    'Én fast ansvarlig',
    'Løbende forbedringer frem for enkeltstående leverancer',
  ];

  return (
    <>
      <SEOHead
        title="Aagesen Growth — Websites, marketing og digital vækst"
        description="Aagesen Growth designer og udvikler hjemmesider og webshops og driver den marketing, der skaber synlighed, henvendelser og salg. Én ansvarlig partner."
        canonical="/"
        schema={[websiteSchema, orgSchema]}
      />

      {/* ── 1. HERO ── */}
      <section className="bg-navy text-off-white relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 grid-bg" />
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative max-w-content mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-36 lg:pb-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text — 55% */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-accent mb-8">
                  Websites · Marketing · Digital Growth
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-serif text-hero text-off-white text-balance mb-8">
                  Vi bygger det digitale fundament — og skaber væksten omkring det.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-lg text-off-white/60 leading-relaxed max-w-xl mb-5 text-pretty">
                  Aagesen Growth designer og udvikler hjemmesider og webshops og driver den marketing, der skal skabe synlighed, henvendelser og salg.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="text-base text-off-white/40 leading-relaxed max-w-lg mb-10">
                  Én ansvarlig partner på tværs af strategi, design, content, annoncering, SEO og løbende optimering.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button booking size="lg" variant="light">Book et møde</Button>
                  <Button to="/projekter" size="lg" variant="ghost" className="text-off-white border-off-white/20 hover:border-off-white/50">
                    Se vores arbejde
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={380}>
                <p className="text-sm text-off-white/30">
                  Faste samarbejder fra 10.000 kr. ekskl. moms pr. måned.
                </p>
              </Reveal>
            </div>

            {/* Visual — 45% */}
            <div className="lg:col-span-5 hidden lg:block">
              <Reveal delay={200}>
                <HeroVisual />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
      </section>

      {/* ── 2. KERNEYDELSER ── */}
      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-section text-navy mb-4 text-balance">
                Fra digitalt fundament til løbende vækst.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-muted leading-relaxed text-pretty">
                Vi samler de vigtigste digitale discipliner, så strategi, udtryk og eksekvering arbejder i samme retning.
              </p>
            </Reveal>
          </div>

          {/* Featured — Websites */}
          <Reveal delay={120}>
            <Link
              to="/ydelser#websites"
              className="group block bg-navy text-off-white p-8 lg:p-12 mb-4 hover:bg-navy-2 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <span className="text-xs font-sans font-medium text-accent mb-4 block">{services[0].index}</span>
                  <h3 className="font-serif text-3xl lg:text-4xl mb-4">{services[0].title}</h3>
                  <p className="text-off-white/60 leading-relaxed max-w-md mb-6">{services[0].description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-off-white group-hover:text-accent transition-colors">
                    Se hjemmesider og webshops
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {services[0].features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-off-white/50">
                        <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Three smaller services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(1).map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <Link
                  to={s.href}
                  className="group block bg-off-white p-7 h-full hover:bg-white transition-colors duration-300 border border-navy/6"
                >
                  <span className="text-xs font-sans font-medium text-muted mb-4 block">{s.index}</span>
                  <h3 className="font-serif text-2xl text-navy mb-3">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-5">{s.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-navy group-hover:text-accent transition-colors">
                    Læs mere
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. POSITIONERING ── */}
      <section className="bg-navy text-off-white py-22 lg:py-30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-off-white mb-8 text-balance">
                Én partner. Et samlet digitalt ansvar.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg text-off-white/50 leading-relaxed mb-12 max-w-2xl text-pretty">
                De bedste resultater opstår, når hjemmeside, identitet, indhold, annoncering og synlighed ikke bliver behandlet som separate projekter. Aagesen Growth samler arbejdet og sørger for, at det bliver udført.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {positioningPoints.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="border-l border-accent/40 pl-5">
                    <p className="text-off-white/80 text-base leading-relaxed">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. UDVALGTE PROJEKTER ── */}
      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Reveal>
                <h2 className="font-serif text-section text-navy text-balance">Udvalgt arbejde.</h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <Link to="/projekter" className="hidden sm:inline-flex items-center gap-2 text-sm font-sans font-medium text-navy hover:text-accent transition-colors">
                Alle projekter <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 100}>
                <div className="aspect-[4/3] bg-navy-2 border border-navy/8 flex items-center justify-center p-8 group hover:bg-navy transition-colors duration-300">
                  <div className="text-center">
                    <p className="font-serif text-2xl text-off-white/30 italic mb-2">Case under udarbejdelse</p>
                    <p className="text-sm text-off-white/20">Tilføjes snart</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link to="/projekter" className="inline-flex items-center gap-2 text-sm font-sans font-medium text-navy hover:text-accent transition-colors">
              Alle projekter <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. PROCES ── */}
      <section className="bg-off-white py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-serif text-section text-navy mb-16 max-w-xl text-balance">
              Fra første afklaring til løbende udvikling.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/8">
            {process.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-off-white p-8 h-full">
                  <span className="font-serif text-4xl text-accent/50 block mb-4">{step.num}</span>
                  <h3 className="font-serif text-xl text-navy mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRISER ── */}
      <section className="bg-bg-light py-22 lg:py-30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-section text-navy mb-4 text-balance">
                Fleksible samarbejder. Tydelige rammer.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-muted leading-relaxed text-pretty">
                Tre veje til samarbejde — løbende pakker eller fastprisede projekter.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 80}>
                <div
                  className={`relative h-full p-8 flex flex-col ${
                    pkg.recommended
                      ? 'bg-navy text-off-white border border-navy'
                      : 'bg-off-white text-dark border border-navy/8'
                  }`}
                >
                  {pkg.recommended && (
                    <span className="absolute top-0 right-6 bg-accent text-navy text-[10px] font-sans font-medium uppercase tracking-wider px-3 py-1 transform -translate-y-1/2">
                      Anbefalet
                    </span>
                  )}
                  <h3 className={`font-serif text-2xl mb-2 ${pkg.recommended ? 'text-off-white' : 'text-navy'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-2xl font-serif mb-1 ${pkg.recommended ? 'text-off-white' : 'text-navy'}`}>
                    {pkg.price}
                  </p>
                  <p className={`text-xs mb-6 ${pkg.recommended ? 'text-off-white/40' : 'text-muted'}`}>
                    {pkg.priceNote}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${pkg.recommended ? 'text-off-white/60' : 'text-muted'}`}>
                    {pkg.description}
                  </p>
                  <ul className={`space-y-2 mb-8 flex-1 ${pkg.recommended ? 'text-off-white/70' : 'text-dark'}`}>
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {pkg.ctaType === 'booking' ? (
                    <Button booking size="md" variant={pkg.recommended ? 'light' : 'primary'} className="w-full">
                      {pkg.ctaLabel}
                    </Button>
                  ) : (
                    <Button to="/kontakt" size="md" variant={pkg.recommended ? 'light' : 'primary'} className="w-full">
                      {pkg.ctaLabel}
                    </Button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-sm text-muted leading-relaxed">{pricingNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="bg-navy text-off-white py-22 lg:py-30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative max-w-content mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-off-white mb-6 max-w-3xl mx-auto text-balance">
              Har virksomheden brug for en stærkere digital retning?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg text-off-white/50 leading-relaxed mb-12 max-w-xl mx-auto text-pretty">
              Book en uforpligtende samtale om jeres hjemmeside, marketing og mulighederne for et fast samarbejde.
            </p>
          </Reveal>
          <Reveal delay={200}>
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

/* ── Hero Visual: abstract browser/mobile frame composition ── */
const HeroVisual: React.FC = () => (
  <div className="relative">
    {/* Browser frame */}
    <div className="bg-navy-2 border border-off-white/10 rounded-lg overflow-hidden shadow-2xl">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-off-white/8">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-off-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-off-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-off-white/15" />
        </div>
        <div className="flex-1 ml-3 h-5 bg-off-white/5 rounded-sm" />
      </div>
      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="h-8 w-2/3 bg-off-white/10 rounded-sm" />
        <div className="h-3 w-full bg-off-white/5 rounded-sm" />
        <div className="h-3 w-5/6 bg-off-white/5 rounded-sm" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="aspect-square bg-off-white/5 rounded-sm flex items-center justify-center">
            <div className="w-6 h-6 border border-accent/30 rounded-sm" />
          </div>
          <div className="aspect-square bg-off-white/5 rounded-sm flex items-center justify-center">
            <div className="w-6 h-6 border border-accent/30 rounded-full" />
          </div>
          <div className="aspect-square bg-off-white/5 rounded-sm flex items-center justify-center">
            <div className="w-6 h-6 border border-accent/30 rotate-45" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-24 bg-accent/20 rounded-sm" />
          <div className="h-8 w-20 bg-off-white/8 rounded-sm border border-off-white/10" />
        </div>
      </div>
    </div>

    {/* Mobile frame overlay */}
    <div className="absolute -bottom-6 -left-6 w-28 bg-navy-2 border border-off-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="px-3 py-2 border-b border-off-white/8">
        <div className="w-10 h-1 bg-off-white/10 rounded-full mx-auto" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-off-white/10 rounded-sm" />
        <div className="h-2 w-full bg-off-white/5 rounded-sm" />
        <div className="h-2 w-5/6 bg-off-white/5 rounded-sm" />
        <div className="h-10 bg-off-white/5 rounded-sm mt-2" />
        <div className="h-6 w-16 bg-accent/20 rounded-sm" />
      </div>
    </div>

    {/* Floating accent dot */}
    <div className="absolute -top-3 -right-3 w-16 h-16 border border-accent/20 rounded-full flex items-center justify-center">
      <span className="text-xs font-sans font-medium text-accent/60 tracking-wider">AG</span>
    </div>
  </div>
);

export default Home;
