import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, Video } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import company, { hasBooking } from '@/config/company';

const facts = [
  { icon: Clock, title: '30 minutter', body: 'Kort og fokuseret. Ikke en præsentation.' },
  { icon: Video, title: 'Online', body: 'Videokald. Vi sender linket, når tiden er booket.' },
  {
    icon: Check,
    title: 'Uforpligtende',
    body: 'Vi siger også til, hvis vi ikke er de rigtige til opgaven.',
  },
];

const prepare = [
  'Hvilke opgaver fylder mest lige nu?',
  'Hvad fungerer på jeres nuværende setup — og hvad gør ikke?',
  'Hvad ville et godt resultat være om seks måneder?',
];

/**
 * The booking page.
 *
 * When no booking calendar is configured this redirects to the contact page
 * instead of rendering "bookinglinket opdateres snart" — which is what the
 * previous version did, turning the site's single most prominent call to
 * action into a dead end.
 */
const Book: React.FC = () => {
  if (!hasBooking) return <Navigate to="/kontakt" replace />;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Book et møde', item: `${company.domain}/book-moede` },
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

      <section className="bg-ink py-14 lg:py-20">
        <div className="shell">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ul className="ledger">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <li key={fact.title} className="ledger-row flex items-start gap-4 py-5">
                      <Icon size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                      <div>
                        <p className="font-sans font-medium text-cream">{fact.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-dim">{fact.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="marked mt-10 border border-cream/20 bg-ink-2 p-6 text-cream/25">
                <p className="meta text-cream">Forbered gerne</p>
                <ul className="mt-4 space-y-2.5">
                  {prepare.map((entry) => (
                    <li key={entry} className="flex gap-2.5 text-sm leading-relaxed text-dim">
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 bg-gold-ink" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <div className="on-light bg-cream p-7 text-ink sm:p-9">
                  <p className="meta-on-light">Ledige tider</p>
                  <h2 className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                    Vælg et tidspunkt, der passer.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-dim-ink">
                    Kalenderen åbner i et nyt vindue. Du modtager en bekræftelse med det samme.
                  </p>
                  <a
                    href={company.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-invert btn-lg mt-7 w-full"
                  >
                    Se ledige tider
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
