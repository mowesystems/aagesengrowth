import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Button from '@/components/ui/Button';

const suggestions = [
  { label: 'Ydelser', to: '/ydelser', note: 'Hvad vi laver, og hvad der ikke er med' },
  { label: 'Priser', to: '/priser', note: 'Pakker, abonnementer og timepris' },
  { label: 'Cases', to: '/projekter', note: 'Tre projekter og tankerne bag' },
  { label: 'Kontakt', to: '/kontakt', note: 'Skriv, så vender vi tilbage' },
];

/**
 * A real 404.
 *
 * Previously the catch-all route rendered the homepage, so every mistyped or
 * dead URL returned a 200 with full homepage content — which lets search
 * engines index unlimited duplicate pages and leaves visitors unsure whether
 * they landed where they meant to.
 */
const NotFound: React.FC = () => (
  <>
    <SEOHead
      title="Siden findes ikke"
      description="Siden her findes ikke længere, eller adressen er skrevet forkert."
      noindex
    />

    <section className="relative overflow-hidden border-b border-cream/12 bg-ink-2">
      <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
      <div className="shell relative pb-14 pt-32 lg:pb-20 lg:pt-40">
        <p className="meta">Fejl 404</p>
        <h1 className="mt-6 max-w-[16ch] font-serif text-statement text-cream">
          Den side findes ikke.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-dim text-pretty">
          Enten er adressen skrevet forkert, eller også er siden flyttet. Her er de steder, folk
          oftest skal hen.
        </p>

        <ul className="ledger mt-12 max-w-2xl">
          {suggestions.map((item, index) => (
            <li key={item.to} className="ledger-row">
              <Link
                to={item.to}
                className="group flex items-center justify-between gap-6 py-5 transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span className="meta-muted opacity-70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-cream transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-dim">{item.note}</span>
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-dim transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button to="/" size="lg">
            Til forsiden
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
