import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import ResultsStrip from '@/components/case/ResultsStrip';
import type { CaseItem } from '@/data/cases';

interface FeaturedCaseProps {
  item: CaseItem;
  /** Shown as "SELECTED WORK / 01". */
  index?: string;
  eyebrow?: string;
}

/**
 * The lead case.
 *
 * Deliberately not one of three equal cards: the first piece of work a visitor
 * sees is the whole argument, so it gets the width, the real screenshots and
 * the client's own photography. The composition is asymmetric on purpose — a
 * wide website preview above, then a phone and two photographs at three
 * different widths, so the block reads as a spread rather than a gallery row.
 */
const FeaturedCase: React.FC<FeaturedCaseProps> = ({
  item,
  index = '01',
  eyebrow = 'Selected work',
}) => {
  const media = item.media;

  return (
    <article className="relative">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
        {/* ------------------------------------------------------------ text */}
        <div className="col-span-4 lg:col-span-4">
          <Reveal>
            <p className="meta">
              {eyebrow} <span className="text-paper/50">/</span> {index}
            </p>

            <h3 className="mt-6 font-display text-statement uppercase leading-[0.85] text-paper">
              <Link
                to={`/projekter/${item.slug}`}
                className="transition-colors duration-300 hover:text-cyan"
              >
                {item.client}
              </Link>
            </h3>

            <p className="mt-6 max-w-measure font-display text-title text-paper/85 text-pretty">
              {item.strapline}
            </p>

            <p className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty">
              {item.summary}
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
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

            <Link to={`/projekter/${item.slug}`} className="link-line mt-8">
              Se casen
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- primary */}
        {media?.desktop && (
          <Reveal delay={80} className="group col-span-4 lg:col-span-8">
            <CaseMediaFrame
              image={media.desktop}
              sizes="(min-width: 1024px) 62vw, 92vw"
            />
          </Reveal>
        )}
      </div>

      {/* ------------------------------------------------------- secondary */}
      {(media?.mobile || media?.photos?.length) && (
        <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-6 lg:mt-10 lg:grid-cols-12 lg:gap-x-10">
          {media?.mobile && (
            <Reveal delay={40} className="group col-span-2 lg:col-span-3">
              <CaseMediaFrame image={media.mobile} sizes="(min-width: 1024px) 22vw, 44vw" />
            </Reveal>
          )}

          {media?.photos?.[0] && (
            <Reveal delay={90} className="group col-span-4 lg:col-span-5 lg:self-end">
              <CaseMediaFrame
                image={media.photos[0]}
                sizes="(min-width: 1024px) 38vw, 92vw"
                showCaption
              />
            </Reveal>
          )}

          {media?.photos?.[1] && (
            <Reveal delay={140} className="group col-span-2 hidden lg:col-span-4 lg:block">
              <CaseMediaFrame
                image={media.photos[1]}
                sizes="(min-width: 1024px) 30vw, 46vw"
                showCaption
              />
            </Reveal>
          )}
        </div>
      )}

      <Reveal delay={60}>
        <ResultsStrip item={item} className="mt-12 border-t border-paper/10 pt-10 lg:mt-16" />
      </Reveal>
    </article>
  );
};

export default FeaturedCase;
