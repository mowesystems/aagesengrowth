import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import IridescentGrowthObject from '@/components/IridescentGrowthObject';
import ProofRail, { type ProofPoint } from '@/components/home/ProofRail';

/** Verifiable on this page, within a minute. Nothing aspirational. */
const proofPoints: ProofPoint[] = [
  {
    index: '01',
    title: 'Website, synlighed og annoncering ét sted',
    body: 'Ikke fordelt på tre leverandører, der peger på hinanden, når noget ikke virker.',
  },
  {
    index: '02',
    title: 'Faste website-priser fra 9.995 kr.',
    body: 'Pakker og timepris står på siden. Det endelige tilbud er skriftligt, før noget går i gang.',
  },
  {
    index: '03',
    title: 'Du taler med den, der laver arbejdet',
    body: 'Ingen projektleder som mellemled. Et begrænset antal kunder ad gangen, netop derfor.',
  },
];

/**
 * The homepage hero.
 *
 * A 12-column editorial grid with the claim set at display scale and the
 * object offset behind it to the right. The section is sized by its own
 * content with a soft viewport floor on large screens, rather than a fixed
 * min-height that would push the proof rail off the bottom of a short laptop.
 *
 * The two headline lines are masked and slide up on their own beat — pure CSS,
 * so a failed bundle cannot strand the claim.
 */
const HeroEditorial: React.FC = () => (
  <section className="grain relative overflow-hidden bg-ink pt-28 lg:min-h-[92svh] lg:pt-38">
    <div className="ambient pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

    {/* The object: behind the type on every size, offset right. On phones it
        sits high and faint so it can never fight the headline for contrast. */}
    <IridescentGrowthObject className="absolute -right-[28%] -top-[6%] w-[125%] opacity-[0.55] sm:-right-[18%] sm:w-[95%] lg:-right-[6%] lg:top-[-4%] lg:w-[62%] lg:opacity-90 2xl:w-[56%]" />

    <div className="frame relative flex min-h-full flex-col pb-14 lg:pb-18">
      <div className="grid grid-cols-4 gap-x-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-4 lg:col-span-11">
          <p className="meta-lit animate-fade-in">
            Websites <span aria-hidden="true">·</span> Google Ads <span aria-hidden="true">·</span>{' '}
            Meta Ads <span aria-hidden="true">·</span> Search Visibility
          </p>

          <h1 className="mt-7 font-display text-hero uppercase text-paper lg:mt-9">
            <span className="line-mask">
              <span style={{ animationDelay: '70ms' }}>From click</span>
            </span>
            <span className="line-mask">
              <span className="iris-text" style={{ animationDelay: '175ms' }}>
                to customer.
              </span>
            </span>
          </h1>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-4 gap-x-6 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-4 lg:col-span-6">
          <p className="max-w-measure text-lead text-paper text-pretty">
            Aagesen Growth bygger websites, annoncering og Search Visibility, der gør virksomheder
            lettere at finde, vælge og købe fra.
          </p>
          <p className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
            Fra første søgning til næste kunde — ét samlet digitalt system og én ansvarlig partner.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/#website-tjek" className="btn btn-primary btn-lg">
              Få et website-tjek
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/projekter" className="link-line px-1">
              Se cases
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* The spacing lives on the wrapper so the rail's own rules stay tight
          to its content. */}
      <div className="mt-12 lg:mt-auto lg:pt-18">
        <ProofRail points={proofPoints} />
      </div>
    </div>
  </section>
);

export default HeroEditorial;
