import React from 'react';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
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
    <section className="bg-ink py-16 lg:py-22">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta">Baggrunden</p>
          </div>
          <div className="max-w-prose space-y-6 lg:col-span-8">
            <Reveal>
              <p className="font-serif text-[1.6rem] leading-snug text-cream text-pretty sm:text-[1.9rem]">
                De fleste virksomheder, vi taler med, har ikke et markedsføringsproblem. De har et
                rækkefølgeproblem.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p className="text-base leading-relaxed text-dim text-pretty">
                Der er sat annoncer op, før tracking virkede. Der er skrevet indhold, før nogen
                havde besluttet, hvem det skulle overbevise. Der er brugt penge på trafik til en
                side, der ikke gav den besøgende noget at gøre. Hver enkelt beslutning gav mening i
                situationen — samlet set arbejder de mod hinanden.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-base leading-relaxed text-dim text-pretty">
                Aagesen Growth er bygget op om at løse det. Website, synlighed, annoncering og
                måling hører sammen, og de bliver bedst, når én person kan se dem samlet og har
                mandat til at sige, hvad der skal ske først — også når svaret er &laquo;ikke
                endnu&raquo;.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-base leading-relaxed text-dim text-pretty">
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
    <section className="border-y border-cream/12 bg-ink-2 py-16 lg:py-22">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Er vi det rigtige match?</p>
            <h2 className="mt-4 max-w-xl font-serif text-section text-cream text-balance">
              Det er billigere at finde ud af nu end om tre måneder.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-relaxed text-dim lg:col-span-5">
            Vi siger fra, hvis opgaven ikke passer. Det koster os en ordre og sparer os begge for et
            samarbejde, der ikke ville have fungeret.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-cream/12 md:grid-cols-2">
          <div className="bg-ink p-7 sm:p-9">
            <p className="meta">Godt match, hvis</p>
            <ul className="ledger mt-6">
              {fitFor.map((entry) => (
                <li key={entry} className="ledger-row py-4 text-[0.95rem] leading-relaxed text-cream">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-7 sm:p-9">
            <p className="meta-muted">Dårligt match, hvis</p>
            <ul className="ledger mt-6">
              {notFitFor.map((entry) => (
                <li
                  key={entry}
                  className="ledger-row py-4 text-[0.95rem] leading-relaxed text-dim"
                >
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------------------ cta */}
    <section className="bg-ink py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="meta">Næste skridt</p>
            <h2 className="mt-4 max-w-2xl font-serif text-display text-cream text-balance">
              Skriv, hvad der ikke virker.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-dim">
              Så får I et ærligt svar på, hvad vi ville gøre først — også hvis svaret er, at I ikke
              har brug for os lige nu.
            </p>
          </div>
          <Button to="/kontakt" size="lg" className="shrink-0">
            Kontakt os
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default About;
