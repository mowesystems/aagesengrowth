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
 * always the page's single h1, set at statement scale on the 12-column grid.
 * Paper ground with the ambient blue behind it — inner pages are quieter than
 * the homepage by design, and the ink grounds are saved for the two sections
 * that earn them.
 */
const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lead, aside }) => (
  <section className="relative overflow-hidden rule-row">
    <div className="ambient pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

    <div className="frame relative pb-16 pt-30 lg:pb-22 lg:pt-42">
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <Reveal>
            <p className="meta-brand">{eyebrow}</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="h-statement mt-7 max-w-[15ch] text-balance">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={130}>
              <p className="mt-8 max-w-measure text-lead text-muted text-pretty">{lead}</p>
            </Reveal>
          )}
        </div>

        {aside && (
          <Reveal delay={150} className="lg:col-span-4 lg:col-start-9 lg:flex lg:items-end lg:justify-end">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
