import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import company, { hasBooking } from '@/config/company';

/**
 * The closing argument.
 *
 * One statement at the largest type size on the site, one primary action, and
 * two quiet ways in for people who are further along. It is carried by the
 * footer rather than stacked as a near-identical band above it on every page.
 */
const FinalCTA: React.FC = () => (
  <section
    className="grain relative overflow-hidden border-t border-paper/10 bg-ink"
    aria-labelledby="final-cta-heading"
  >
    <div className="ambient pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
    <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="frame relative py-20 lg:py-30">
      <p className="meta-lit">Næste skridt</p>

      <h2
        id="final-cta-heading"
        className="mt-7 font-display text-hero uppercase text-paper"
      >
        <span className="line-mask">
          <span style={{ animationDelay: '60ms' }}>Let&rsquo;s grow</span>
        </span>
        <span className="line-mask">
          <span className="iris-text" style={{ animationDelay: '150ms' }}>
            something.
          </span>
        </span>
      </h2>

      <div className="mt-10 grid grid-cols-1 items-end gap-x-12 gap-y-9 lg:mt-14 lg:grid-cols-12">
        <p className="max-w-measure text-lead text-paper text-pretty lg:col-span-6">
          Fortæl hvad der ikke virker — så siger vi, hvad vi ville gøre først. Også hvis svaret er,
          at I ikke har brug for os lige nu.
        </p>

        <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:items-end">
          <Link to="/#website-tjek" className="btn btn-primary btn-lg w-full sm:w-auto">
            Få et website-tjek
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
            <Link to="/kontakt" className="link-line text-muted hover:text-paper">
              Skriv direkte
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            {hasBooking && (
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-muted hover:text-paper"
              >
                Book en afklaring
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;
