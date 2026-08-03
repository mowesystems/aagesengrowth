import React from 'react';
import Reveal from '@/components/ui/Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  /** Optional right-hand slot: jump links, meta, or a CTA. */
  aside?: React.ReactNode;
  /** Dark ground, for pages that should open on navy. */
  dark?: boolean;
}

/**
 * Shared hero for inner pages.
 *
 * Previously each page hand-rolled its own hero with slightly different
 * spacing, type sizes and eyebrow markup, so no two inner pages started the
 * same way. One component keeps the entry rhythm consistent.
 */
const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lead, aside, dark = false }) => (
  <section
    className={`relative overflow-hidden border-b ${
      dark ? 'on-light border-cream bg-cream' : 'border-cream/12 bg-ink-2'
    }`}
  >
    <div className={`${dark ? 'grid-lines-dark' : 'grid-lines-light'} absolute inset-0`} aria-hidden="true" />
    <div className="shell relative pb-12 pt-28 lg:pb-16 lg:pt-36">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-12">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <Reveal>
            <p className={dark ? 'meta-on-light' : 'meta'}>{eyebrow}</p>
          </Reveal>
          <Reveal delay={70}>
            <h1
              className={`mt-6 max-w-[18ch] font-serif text-display text-balance ${
                dark ? 'text-ink' : 'text-cream'
              }`}
            >
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={130}>
              <p
                className={`mt-6 max-w-xl text-base leading-relaxed text-pretty sm:text-lg ${
                  dark ? 'text-dim-ink' : 'text-dim'
                }`}
              >
                {lead}
              </p>
            </Reveal>
          )}
        </div>

        {aside && (
          <Reveal delay={150} className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
