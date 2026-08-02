import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import type { Service } from '@/data/services';
import { priceLabelFor } from '@/data/pricing';

interface ServiceLedgerProps {
  services: Service[];
  /** Renders the expandable scope detail. Used on /ydelser. */
  detailed?: boolean;
}

/**
 * Services as a ruled index rather than a grid of identical cards.
 *
 * The previous version rendered eight near-identical navy cards of fixed
 * height, which read as filler and buried the differences between services.
 * A ledger makes them scannable at a glance and lets each row open to show the
 * one thing buyers actually need — what is and is not included.
 */
const ServiceRow: React.FC<{ service: Service; detailed: boolean }> = ({ service, detailed }) => {
  const [open, setOpen] = useState(false);
  const panelId = `service-panel-${service.id}`;
  const price = priceLabelFor(service.pricingId);

  return (
    <div id={service.id} className="ledger-row scroll-mt-28">
      <div className="grid grid-cols-1 items-start gap-x-8 gap-y-4 py-7 md:grid-cols-12">
        <div className="flex items-baseline gap-4 md:col-span-4">
          <span className="meta-muted w-6 shrink-0 opacity-70">{service.index}</span>
          <h3 className="font-serif text-[1.6rem] leading-none tracking-tight text-cream sm:text-[1.9rem]">
            {service.title}
          </h3>
        </div>

        <div className="md:col-span-5">
          <p className="text-sm leading-relaxed text-dim">{service.description}</p>
          {price && <p className="mt-2 font-mono text-xs tracking-wide text-gold">{price}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 md:col-span-3 md:justify-end">
          {detailed ? (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex min-h-11 items-center gap-2 font-sans text-sm font-medium text-cream transition-colors hover:text-gold"
            >
              {open ? (
                <Minus size={14} aria-hidden="true" />
              ) : (
                <Plus size={14} aria-hidden="true" />
              )}
              {open ? 'Skjul omfang' : 'Se omfang'}
            </button>
          ) : (
            <Link to={service.href} className="link-quiet">
              Se omfang
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {detailed && (
        <div id={panelId} hidden={!open} className="pb-9">
          <div className="border-l-2 border-gold/60 pl-5 sm:pl-7">
            <p className="max-w-2xl font-serif text-lg leading-snug text-cream sm:text-xl">
              &ldquo;{service.problem}&rdquo;
            </p>

            <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-3">
              <div>
                <p className="meta">Indeholder</p>
                <ul className="mt-3.5 space-y-2">
                  {service.includes.map((entry) => (
                    <li key={entry} className="flex gap-2.5 text-sm leading-relaxed text-cream">
                      <span
                        className="mt-[0.55rem] h-1 w-1 shrink-0 bg-gold-ink"
                        aria-hidden="true"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="meta-muted">Ikke inkluderet</p>
                <ul className="mt-3.5 space-y-2">
                  {service.excludes.map((entry) => (
                    <li key={entry} className="flex gap-2.5 text-sm leading-relaxed text-dim">
                      <X size={13} className="mt-1 shrink-0 opacity-70" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="meta-muted">Passer til</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream">{service.suitedFor}</p>
                </div>
                <div>
                  <p className="meta-muted">Kan det stå alene?</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream">{service.standalone}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
              <Link to={service.pricingHref} className="link-quiet">
                Se pris
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/kontakt" className="link-quiet text-dim hover:text-cream">
                Spørg til denne ydelse
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceLedger: React.FC<ServiceLedgerProps> = ({ services, detailed = false }) => (
  <div className="ledger">
    {services.map((service) => (
      <ServiceRow key={service.id} service={service} detailed={detailed} />
    ))}
  </div>
);

export default ServiceLedger;
