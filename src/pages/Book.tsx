import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowUpRight, Check, X } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import company, { hasBooking } from '@/config/company';

const isFor = [
  '30 minutter, kort og fokuseret',
  'Online videokald — linket kommer, når tiden er booket',
  'En gennemgang af, hvad der driller, og hvad der ville være det rigtige første skridt',
  'Uforpligtende: vi siger også til, hvis vi ikke er de rigtige til opgaven',
];

const isNotFor = [
  'En salgspræsentation med slides',
  'Et færdigt tilbud — det kommer skriftligt bagefter, når omfanget er afklaret',
  'En gratis strategirapport',
];

const prepare = [
  'Hvilke opgaver fylder mest lige nu?',
  'Hvad fungerer på jeres nuværende setup — og hvad gør ikke?',
  'Hvad ville et godt resultat være om seks måneder?',
];

/**
 * The booking page.
 *
 * With no calendar configured this redirects to the contact page rather than
 * rendering a "the booking link is coming soon" placeholder, which would turn
 * one of the site's most prominent calls to action into a dead end.
 */
const Book: React.FC = () => {
  if (!hasBooking) return <Navigate to="/kontakt" replace />;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Book et møde',
        item: `${company.domain}/book-moede`,
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Book et møde"
        description="Book et uforpligtende møde på 30 minutter om jeres website, synlighed og annoncering."
        canonical="/book-moede"
        schema={breadcrumbSchema}
      />

      <PageHero
        eyebrow="Book et møde"
        title="En kort samtale, før noget besluttes."
        lead="Tredive minutter om jeres website, hvad der driller, og hvad der ville være det rigtige første skridt."
      />

      <section className="bg-ink py-18 lg:py-26">
        <div className="frame">
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="col-span-4 lg:col-span-6">
              <h2 className="meta-lit">Hvad mødet er</h2>
              <ul className="mt-7 space-y-4">
                {isFor.map((entry) => (
                  <li key={entry} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-paper">
                    <Check size={15} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
                    {entry}
                  </li>
                ))}
              </ul>

              <h2 className="meta mt-12">Hvad det ikke er</h2>
              <ul className="mt-7 space-y-4">
                {isNotFor.map((entry) => (
                  <li key={entry} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-muted">
                    <X size={15} className="mt-1 shrink-0 opacity-60" aria-hidden="true" />
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 lg:col-span-5 lg:col-start-8">
              <Reveal delay={80}>
                <div className="relative border border-paper/15 bg-ink-2 p-7 sm:p-9">
                  <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />

                  <h2 className="meta-lit">Ledige tider</h2>
                  <p className="mt-6 font-display text-display uppercase leading-[0.92] text-paper">
                    Vælg et tidspunkt, der passer.
                  </p>
                  <p className="mt-5 max-w-measure text-sm leading-relaxed text-muted">
                    Kalenderen åbner i et nyt vindue. I modtager en bekræftelse med det samme.
                  </p>
                  <a
                    href={company.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg mt-8 w-full"
                  >
                    Se ledige tider
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>

              <div className="mt-10">
                <h2 className="meta">Forbered gerne</h2>
                <ol className="rule mt-6">
                  {prepare.map((entry, index) => (
                    <li key={entry} className="rule-row flex gap-5 py-4">
                      <span className="index-mark mt-0.5 shrink-0 text-cyan/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">{entry}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
