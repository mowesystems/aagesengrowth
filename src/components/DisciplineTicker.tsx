import React from 'react';
import services from '@/data/services';

/**
 * A slow marquee of the disciplines, closing the hero.
 *
 * Kept deliberately quiet: mono, small, low contrast, and slow enough that it
 * reads as a live surface rather than something demanding attention. It is
 * duplicated once and translated by exactly -50% so the loop is seamless, and
 * it stops entirely under reduced-motion (where it becomes a static list).
 */
const DisciplineTicker: React.FC = () => {
  const items = services.map((service) => service.title);

  return (
    <div
      className="relative overflow-hidden border-y border-cream/12 bg-ink-2/60 py-3.5"
      aria-hidden="true"
    >
      {/* Feather the edges so items enter and leave rather than pop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />

      <div className="ticker flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dim/70"
              >
                {item}
                <span className="h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DisciplineTicker;
