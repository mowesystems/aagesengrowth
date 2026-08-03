import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { CaseItem } from '@/data/cases';

interface BrandPlateProps {
  item: CaseItem;
  className?: string;
}

/**
 * Consistent presentation for client marks.
 *
 * The two supplied logos are wildly different assets — one black line art on a
 * 655x557 canvas, one a blue gradient mark floating in the upper part of a
 * 1080x1080 canvas. The previous treatment put both on navy and ran
 * `brightness(0) invert(1)` on one of them only, so one case appeared white and
 * the other bright blue. Here both sit on the same light plate in their own
 * colours, optically sized via per-asset values in the case data.
 */
export const BrandPlate: React.FC<BrandPlateProps> = ({ item, className = '' }) => (
  // The plate stays cream even though the site runs on ink: both supplied logos
  // are dark-on-transparent or mid-blue, and on a dark plate the Plus Eins mark
  // disappears entirely. A consistent light plate lets every client mark show
  // in its own colours without per-logo inversion hacks.
  <div
    className={`marked flex items-center justify-center overflow-hidden bg-cream text-ink/20 ${className}`}
  >
    <img
      src={item.logoPath}
      alt={item.logoAlt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-contain p-8 sm:p-10"
      style={{
        transform: `scale(${item.logoScale})`,
        objectPosition: item.logoPosition,
      }}
    />
  </div>
);

interface CaseCardProps {
  item: CaseItem;
  /** Index shown in the margin. */
  index: number;
}

const CaseCard: React.FC<CaseCardProps> = ({ item, index }) => (
  <article className="group relative flex h-full flex-col border border-cream/15 bg-ink transition-colors duration-300 hover:border-cream/45">
    <BrandPlate item={item} className="h-44 border-b border-cream/15 sm:h-52" />

    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="meta">{item.kind}</p>
        <span className="meta-muted opacity-60">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <h3 className="mt-4 font-serif text-[1.75rem] leading-none tracking-tight text-cream sm:text-[2rem]">
        <Link to={`/projekter/${item.slug}`} className="after:absolute after:inset-0">
          {item.client}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-dim">{item.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {item.disciplines.map((discipline) => (
          <li
            key={discipline}
            className="border border-cream/15 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim"
          >
            {discipline}
          </li>
        ))}
      </ul>

      <p className="link-quiet mt-auto pt-6">
        Se casen
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </p>
    </div>
  </article>
);

export default CaseCard;
