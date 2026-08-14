import React from 'react';
import { pillars } from '@/data/services';

/**
 * A slow marquee of the five pillars, closing the hero.
 *
 * Deliberately quiet: mono, small, low contrast, and slow enough that it reads
 * as a live surface rather than something demanding attention. The track holds
 * two identical copies and translates by exactly -50%, so the loop is seamless.
 * It stops entirely under reduced motion, where it becomes a static list.
 */
const DisciplineTicker: React.FC = () => {
  const items = pillars.map((pillar) => pillar.title);

  return (
    <div
      className="relative overflow-hidden border-y border-paper/10 bg-ink-2/50 py-4"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />

      <div className="ticker flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-9 whitespace-nowrap px-9 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-muted"
              >
                {item}
                <span className="h-1 w-1 shrink-0 rotate-45 bg-cyan/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DisciplineTicker;
