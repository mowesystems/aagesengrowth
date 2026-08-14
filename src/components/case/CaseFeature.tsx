import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import type { CaseItem } from '@/data/cases';

interface CaseFeatureProps {
  item: CaseItem;
  index: string;
  /** Which side the media sits on. Alternated by the caller. */
  align?: 'left' | 'right';
  /** Shows the ownership disclosure inline. */
  showDisclosure?: boolean;
}

/**
 * A supporting case, told as an editorial spread.
 *
 * Not a logo card: each one gets the project's own website preview, one piece
 * of real material from the project, and the sentence that says what the work
 * had to solve. The media alternates sides so a column of these reads as a
 * body of work rather than as a list.
 */
const CaseFeature: React.FC<CaseFeatureProps> = ({
  item,
  index,
  align = 'right',
  showDisclosure = false,
}) => {
  const media = item.media;
  const secondary = media?.photos?.[0] ?? media?.screens?.[0];
  const mediaFirst = align === 'left';

  return (
    <article className="grid grid-cols-4 items-start gap-x-6 gap-y-9 lg:grid-cols-12 lg:gap-x-10">
      {/* --------------------------------------------------------- media */}
      <div
        className={`col-span-4 lg:col-span-7 ${
          mediaFirst ? 'lg:order-1' : 'lg:order-2 lg:col-start-6'
        }`}
      >
        <div className="grid grid-cols-6 gap-4">
          {media?.desktop && (
            <Reveal className="group col-span-6">
              <CaseMediaFrame image={media.desktop} sizes="(min-width: 1024px) 54vw, 92vw" />
            </Reveal>
          )}

          {media?.mobile && (
            <Reveal delay={70} className="group col-span-2">
              <CaseMediaFrame image={media.mobile} sizes="(min-width: 1024px) 17vw, 30vw" />
            </Reveal>
          )}

          {secondary && (
            <Reveal delay={120} className="group col-span-4">
              {/* Fills the row rather than reserving its own aspect: the phone
                  beside it is always the taller of the two, and any fixed
                  aspect here leaves a hole under this one. */}
              <CaseMediaFrame image={secondary} sizes="(min-width: 1024px) 35vw, 60vw" fill />
            </Reveal>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------- text */}
      <div
        className={`col-span-4 lg:col-span-5 ${
          mediaFirst ? 'lg:order-2 lg:col-start-9 lg:col-end-13' : 'lg:order-1'
        }`}
      >
        {/* Sticky beside the media column on desktop: the media is much taller
            than the copy, and letting the argument travel with it beats
            centring the copy in a column of empty space. */}
        <Reveal delay={40} className="lg:sticky lg:top-32">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="index-mark text-cyan/80">{index}</span>
            <p className="meta">{item.kind}</p>
          </div>

          <h3 className="mt-5 font-display text-display uppercase leading-[0.88] text-paper">
            <Link
              to={`/projekter/${item.slug}`}
              className="transition-colors duration-300 hover:text-cyan"
            >
              {item.client}
            </Link>
          </h3>

          <p className="mt-5 max-w-measure font-display text-title text-paper/85 text-pretty">
            {item.strapline}
          </p>

          <p className="mt-4 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
            {item.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
            {item.disciplines.map((discipline, i) => (
              <li key={discipline} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-paper/45">
                    /
                  </span>
                )}
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  {discipline}
                </span>
              </li>
            ))}
          </ul>

          {showDisclosure && item.disclosure && (
            <p className="mt-6 flex max-w-measure items-start gap-2.5 border-l border-cyan/40 pl-4 text-xs leading-relaxed text-muted">
              <Info size={13} className="mt-0.5 shrink-0 text-cyan/70" aria-hidden="true" />
              {item.disclosure}
            </p>
          )}

          <Link to={`/projekter/${item.slug}`} className="link-line mt-7">
            Se casen
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
};

export default CaseFeature;
