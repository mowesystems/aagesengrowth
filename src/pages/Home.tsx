import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CaseCard from '@/components/CaseCard';
import ServiceLedger from '@/components/ServiceLedger';
import PricingCard from '@/components/PricingCard';
import Accordion from '@/components/Accordion';
import WebsiteReview from '@/components/WebsiteReview';
import DisciplineTicker from '@/components/DisciplineTicker';
import company from '@/config/company';
import services from '@/data/services';
import cases from '@/data/cases';
import { featuredFaq } from '@/data/faq';
import { websitePackages, pricingNote } from '@/data/pricing';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.legalName,
  url: company.domain,
};

/** The three things a visitor should be able to verify within seconds. */
const proofPoints = [
  ['01', 'Website, synlighed og annoncering', 'Samlet hos én ansvarlig — ikke fordelt på tre leverandører, der peger på hinanden.'],
  ['02', 'Faste priser fra 9.995 kr.', 'Pakker og timepris står på siden. Det endelige tilbud er skriftligt, før noget går i gang.'],
  ['03', 'Du taler med den, der laver arbejdet', 'Ingen projektleder som mellemled. Et begrænset antal kunder ad gangen, netop derfor.'],
];

const principles = [
  {
    number: '01',
    title: 'Rækkefølge før indsats',
    body: 'Det dyreste i digital markedsføring er at gøre de rigtige ting i den forkerte rækkefølge. Annoncer til en side, der ikke konverterer. Tracking sat op efter kampagnen er kørt. Vi lægger rækkefølgen fast først.',
  },
  {
    number: '02',
    title: 'Afgrænsning frem for løfter',
    body: 'Hvert tilbud beskriver, hvad der er med, og hvad der ikke er. Det er mindre sælgende at skrive, hvad man ikke laver — men det er den eneste måde at undgå, at et samarbejde bliver en skuffelse.',
  },
  {
    number: '03',
    title: 'Ingen garantier på det, ingen kontrollerer',
    body: 'Placeringer, leads og afkast afhænger af marked, budget og konkurrence. Vi lover en prioriteret indsats, målbar opsætning og ærlig rapportering — ikke tal, vi ikke er herre over.',
  },
];

const Home: React.FC = () => (
  <>
    <SEOHead
      title="Aagesen Growth ApS — websites, SEO og annoncering for SMV"
      description="Aagesen Growth bygger og forbedrer websites for små og mellemstore virksomheder — og sørger for, at de bliver fundet og skaber henvendelser. Faste priser fra 9.995 kr."
      canonical="/"
      schema={websiteSchema}
    />

    {/* ------------------------------------------------------------ hero */}
    <section className="relative overflow-hidden bg-ink">
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-lines-light pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Fades the grid out toward the fold so the ledger sits on clean ink */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative pb-14 pt-28 sm:pb-16 lg:pb-20 lg:pt-36">
        <p className="meta animate-fade-in">
          Digital vækstpartner · små og mellemstore virksomheder
        </p>

        {/* Each line is masked and slides up on its own beat, so the claim
            assembles itself instead of fading in as one block. */}
        <h1 className="mt-7 font-serif text-statement text-cream">
          <span className="line-mask">
            <span style={{ animationDelay: '80ms' }}>De fleste hjemmesider</span>
          </span>
          <span className="line-mask">
            <span style={{ animationDelay: '190ms' }}>fejler ikke teknisk.</span>
          </span>
          <span className="line-mask">
            <span style={{ animationDelay: '300ms' }}>
              De fejler <em className="not-italic annotate">kommercielt</em>.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-9 lg:grid-cols-12">
          <Reveal delay={520} className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-cream text-pretty sm:text-xl">
              Aagesen Growth bygger og forbedrer websites for små og mellemstore virksomheder — og
              sørger for, at de bliver fundet og skaber henvendelser.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dim text-pretty">
              Website, SEO, AI-synlighed og annoncering hos én ansvarlig partner, der arbejder med
              få kunder ad gangen.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#website-tjek" size="lg">
                Få et website-tjek
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Link to="/projekter" className="link-quiet px-1">
                Se cases
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={620} className="lg:col-span-5 lg:pl-6">
            <ul className="ledger">
              {proofPoints.map(([number, title, body]) => (
                <li key={number} className="ledger-row py-5">
                  <div className="flex gap-4">
                    <span className="meta-muted mt-1 shrink-0 opacity-60">{number}</span>
                    <div>
                      <p className="font-serif text-xl leading-snug text-cream">{title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-dim">{body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <DisciplineTicker />
    </section>

    {/* --------------------------------------------------- website review */}
    <section id="website-tjek" className="scroll-mt-24 bg-ink py-16 lg:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Website-tjek</p>
            <h2 className="mt-4 max-w-2xl font-serif text-section text-cream text-balance">
              Prøv den del af arbejdet, de fleste springer over.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Vælg det, I genkender fra jeres egen side. Så får I den rækkefølge, vi ville arbejde i —
            og hvorfor. Det tager under et minut, og der er ingen mailadresse involveret.
          </p>
        </div>

        <Reveal delay={80}>
          <div className="mt-10 border border-cream/15">
            <WebsiteReview />
          </div>
        </Reveal>
      </div>
    </section>

    {/* ----------------------------------------------------------- cases */}
    <section className="border-y border-cream/12 bg-ink-2 py-16 lg:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="meta">Udvalgt arbejde</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Tre projekter, og hvad de hver især krævede.
            </h2>
          </div>
          <Link to="/projekter" className="link-quiet">
            Alle cases
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 70}>
              <CaseCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* -------------------------------------------------------- services */}
    <section className="bg-ink py-16 lg:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Ydelser</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Otte ydelser. De fleste kan stå alene.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            I behøver ikke købe det hele. De fleste starter ét sted og udvider, når det første
            begynder at virke.
          </p>
        </div>

        <div className="mt-10">
          <ServiceLedger services={services} />
        </div>

        <div className="mt-8">
          <Link to="/ydelser" className="link-quiet">
            Se hvad hver ydelse indeholder — og ikke indeholder
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------ principles */}
    <section className="on-light relative overflow-hidden bg-cream py-16 text-ink lg:py-24">
      <div className="grid-lines-dark absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta-on-light">Sådan arbejder vi</p>
            <h2 className="mt-4 font-serif text-section text-ink text-balance">
              Tre principper, der koster os opgaver.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim-ink">
              Og som er grunden til, at samarbejderne holder længere end projektet.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="ledger ledger-light">
              {principles.map((principle) => (
                <div key={principle.number} className="ledger-row py-7">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-12">
                    <div className="flex items-baseline gap-4 sm:col-span-5">
                      <span className="meta-on-light opacity-70">{principle.number}</span>
                      <h3 className="font-serif text-xl leading-snug text-ink">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-dim-ink sm:col-span-7">
                      {principle.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* --------------------------------------------------------- pricing */}
    <section className="bg-ink py-16 lg:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Priser</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Hvad et website koster hos os.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Alle priser står på siden. Ingen &laquo;kontakt os for et tilbud&raquo; på det, der kan
            prissættes på forhånd.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {websitePackages.map((item, index) => (
            <Reveal className="h-full" key={item.id} delay={index * 60}>
              <PricingCard item={item} compact />
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-3xl text-xs leading-relaxed text-dim">{pricingNote}</p>
          <Link to="/priser" className="link-quiet shrink-0">
            Alle priser
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------------- faq */}
    <section className="border-t border-cream/12 bg-ink-2 py-16 lg:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta">Spørgsmål</p>
            <h2 className="mt-4 font-serif text-section text-cream text-balance">
              Det, folk spørger om først.
            </h2>
            <Link to="/faq" className="link-quiet mt-5">
              Alle spørgsmål
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={featuredFaq} openFirst />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
