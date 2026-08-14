import React from 'react';
import Reveal from '@/components/ui/Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  /** Optional right-hand slot: jump links, meta, or a CTA. */
  aside?: React.ReactNode;
}

/**
 * Shared hero for inner pages.
 *
 * One component so no two pages start with a different rhythm. The title is
 * always the page's single h1, set at display scale on the 12-column grid.
 */
const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lead, aside }) => (
  <section className="grain relative overflow-hidden border-b border-paper/10 bg-ink">
    <div className="ambient pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
    <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="frame relative pb-14 pt-28 lg:pb-20 lg:pt-38">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        <div className={`col-span-4 ${aside ? 'lg:col-span-7' : 'lg:col-span-9'}`}>
          <Reveal>
            <p className="meta-lit">{eyebrow}</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-7 max-w-[16ch] font-display text-statement uppercase text-paper text-balance">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={130}>
              <p className="mt-7 max-w-measure text-lead text-muted text-pretty">{lead}</p>
            </Reveal>
          )}
        </div>

        {aside && (
          <Reveal
            delay={150}
            className="col-span-4 lg:col-span-4 lg:col-start-9 lg:flex lg:items-end lg:justify-end"
          >
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
