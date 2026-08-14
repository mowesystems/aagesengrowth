import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import IridescentGrowthObject from '@/components/IridescentGrowthObject';
import company from '@/config/company';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Om', item: `${company.domain}/om` },
  ],
};

const fitFor = [
  'I har et website, der ikke længere matcher forretningen',
  'I får for få henvendelser, og ved ikke helt hvorfor',
  'Markedsføringen ligger spredt hos flere leverandører',
  'I vil have ét sted at gå hen, når noget skal ændres',
  'I vil hellere have noget gjort ordentligt end hurtigt',
];

const notFitFor = [
  'I leder efter den billigste løsning på markedet',
  'I har brug for et stort team og faste ugentlige møder',
  'I vil have løbende produktion af content og opslag',
  'I forventer garanterede placeringer eller et bestemt antal leads',
];

/**
 * Om.
 *
 * No invented team and no stock portrait: the argument of this page is that
 * there is one person, so the page is carried by type and one abstract object
 * rather than by a photograph of somebody who does not work here.
 */
const About: React.FC = () => (
  <>
    <SEOHead
      title="Om Aagesen Growth ApS"
      description="Et lille setup med et stort ansvar. Aagesen Growth arbejder med få kunder ad gangen, så den, der laver arbejdet, også er den, I taler med."
      canonical="/om"
      schema={breadcrumbSchema}
    />

    <PageHero
      eyebrow="Om"
      title="Et lille setup. Og hele ansvaret."
      lead="Aagesen Growth er en dansk digital vækstpartner for små og mellemstore virksomheder — bygget som et bevidst lille setup, fordi det er forudsætningen for at kunne stå inde for arbejdet."
    />

    {/* ---------------------------------------------------------- essay */}
    <section className="relative overflow-hidden bg-ink py-18 lg:py-26">
      <IridescentGrowthObject className="absolute -right-[30%] top-[6%] hidden w-[70%] opacity-40 lg:block" />

      <div className="frame relative">
        <div className="grid grid-cols-4 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-3">
            <h2 className="meta-lit">Baggrunden</h2>
          </div>
          <div className="col-span-4 space-y-7 lg:col-span-7">
            <Reveal>
              <p className="max-w-prose font-display text-section text-paper text-pretty">
                De fleste virksomheder, vi taler med, har ikke et markedsføringsproblem. De har et
                rækkefølgeproblem.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted text-pretty">
                Der er sat annoncer op, før tracking virkede. Der er skrevet indhold, før nogen
                havde besluttet, hvem det skulle overbevise. Der er brugt penge på trafik til en
                side, der ikke gav den besøgende noget at gøre. Hver enkelt beslutning gav mening i
                situationen — samlet set arbejder de mod hinanden.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted text-pretty">
                Aagesen Growth er bygget op om at løse det. Website, synlighed, annoncering og
                måling hører sammen, og de bliver bedst, når én person kan se dem samlet og har
                mandat til at sige, hvad der skal ske først — også når svaret er &laquo;ikke
                endnu&raquo;.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted text-pretty">
                Derfor er der et begrænset antal kunder ad gangen. Det er ikke en
                knaphedsstrategi — det er den eneste måde, den samme person kan udvikle løsningen,
                prioritere arbejdet og tage telefonen.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------------- fit */}
    <section
      className="border-y border-paper/10 bg-ink-2 py-18 lg:py-26"
      aria-labelledby="fit-heading"
    >
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-6">
            <p className="meta-lit">Er vi det rigtige match?</p>
            <h2
              id="fit-heading"
              className="mt-6 max-w-measure font-display text-section text-paper text-balance"
            >
              Det er billigere at finde ud af nu end om tre måneder.
            </h2>
          </div>
          <p className="col-span-4 max-w-measure self-end text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Vi siger fra, hvis opgaven ikke passer. Det koster os en ordre og sparer os begge for et
            samarbejde, der ikke ville have fungeret.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-paper/10 md:grid-cols-2">
          <div className="bg-ink p-7 sm:p-9">
            <p className="meta-lit">Godt match, hvis</p>
            <ul className="mt-7 space-y-4">
              {fitFor.map((entry) => (
                <li key={entry} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-paper">
                  <Check size={15} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-7 sm:p-9">
            <p className="meta">Dårligt match, hvis</p>
            <ul className="mt-7 space-y-4">
              {notFitFor.map((entry) => (
                <li key={entry} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-muted">
                  <X size={15} className="mt-1 shrink-0 opacity-60" aria-hidden="true" />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------------ cta */}
    <section className="bg-ink py-18 lg:py-24">
      <div className="frame">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Næste skridt</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-display uppercase text-paper text-balance">
              Skriv, hvad der ikke virker.
            </h2>
            <p className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-muted">
              Så får I et ærligt svar på, hvad vi ville gøre først — også hvis svaret er, at I ikke
              har brug for os lige nu.
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

export default About;
