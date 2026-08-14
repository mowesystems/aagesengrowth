import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import type { Service } from '@/data/services';
import { priceLabelFor } from '@/data/pricing';

interface ServiceLedgerProps {
  services: Service[];
  /** Renders the expandable scope detail. Used on /ydelser. */
  detailed?: boolean;
  /** Sets the heading level so the page outline stays correct. */
  headingLevel?: 'h3' | 'h4';
}

/**
 * Services as a ruled index rather than a grid of identical cards.
 *
 * Each row opens to show the one thing buyers actually need: what is and is
 * not included. The exclusions are given the same weight as the inclusions,
 * because that is the whole argument of this business.
 */
const ServiceRow: React.FC<{
  service: Service;
  detailed: boolean;
  Heading: 'h3' | 'h4';
}> = ({ service, detailed, Heading }) => {
  const [open, setOpen] = useState(false);
  const panelId = `service-panel-${service.id}`;
  const price = priceLabelFor(service.pricingId);

  return (
    <div id={service.id} className="rule-row scroll-mt-28">
      <div className="grid grid-cols-4 items-start gap-x-6 gap-y-4 py-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-4 flex items-baseline gap-5 lg:col-span-5">
          <span className="index-mark shrink-0 text-cyan/70">{service.index}</span>
          <div>
            <Heading className="font-display text-display uppercase leading-[0.92] text-paper">
              {service.title}
            </Heading>
            {service.explainer && <p className="meta mt-2.5">{service.explainer}</p>}
          </div>
        </div>

        <div className="col-span-4 lg:col-span-4">
          <p className="max-w-measure text-sm leading-relaxed text-muted">{service.description}</p>
          {price && <p className="mt-3 font-mono text-xs tracking-wide text-cyan">{price}</p>}
        </div>

        <div className="col-span-4 flex flex-wrap items-center gap-x-6 lg:col-span-3 lg:justify-end">
          {detailed ? (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex min-h-11 items-center gap-2.5 font-sans text-sm font-medium text-paper transition-colors hover:text-cyan"
            >
              {open ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
              {open ? 'Skjul omfang' : 'Se omfang'}
            </button>
          ) : (
            <Link to={service.href} className="link-line">
              Se omfang
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {detailed && (
        <div id={panelId} hidden={!open} className="pb-10">
          <div className="border-l border-cyan/40 pl-5 sm:pl-8">
            <p className="max-w-prose font-display text-title text-paper text-pretty">
              &ldquo;{service.problem}&rdquo;
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
              <div>
                <p className="meta-lit">Indeholder</p>
                <ul className="mt-4 space-y-2.5">
                  {service.includes.map((entry) => (
                    <li key={entry} className="flex gap-3 text-sm leading-relaxed text-paper">
                      <span
                        className="mt-[0.55rem] h-1 w-1 shrink-0 bg-cyan"
                        aria-hidden="true"
                      />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="meta">Ikke inkluderet</p>
                <ul className="mt-4 space-y-2.5">
                  {service.excludes.map((entry) => (
                    <li key={entry} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <X size={13} className="mt-1 shrink-0 opacity-70" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="meta">Passer til</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper">{service.suitedFor}</p>
                </div>
                <div>
                  <p className="meta">Kan det stå alene?</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper">{service.standalone}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
              <Link to={service.pricingHref} className="link-line">
                Se pris
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/kontakt" className="link-line text-muted hover:text-paper">
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

const ServiceLedger: React.FC<ServiceLedgerProps> = ({
  services,
  detailed = false,
  headingLevel = 'h3',
}) => (
  <div className="rule">
    {services.map((service) => (
      <ServiceRow
        key={service.id}
        service={service}
        detailed={detailed}
        Heading={headingLevel}
      />
    ))}
  </div>
);

export default ServiceLedger;
