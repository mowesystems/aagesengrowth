import React from 'react';

interface MaskedLinesProps {
  lines: string[];
  className?: string;
  /** Delay before the first line starts, in ms. */
  delay?: number;
  /** Gap between consecutive lines, in ms. */
  stagger?: number;
  /** A word or phrase inside `lines` to set in the brand blue. */
  accent?: string;
}

/**
 * A headline that assembles line by line from behind its own mask.
 *
 * Pure CSS: each line is a block with `overflow: hidden` and its inner span
 * animates from `translateY(104%)` to zero. There is no observer and no state,
 * which is what makes it safe on the hero — an animation that never runs still
 * ends with the text in place, and `prefers-reduced-motion` turns the transform
 * off entirely rather than merely shortening it.
 *
 * Lines are supplied pre-broken by the dictionary so each language can decide
 * where its own headline should wrap.
 */
const MaskedLines: React.FC<MaskedLinesProps> = ({
  lines,
  className = '',
  delay = 60,
  stagger = 90,
  accent,
}) => (
  <>
    {lines.map((line, index) => (
      <span key={line} className={`line-mask ${className}`}>
        <span style={{ animationDelay: `${delay + index * stagger}ms` }}>
          {accent && line.includes(accent) ? (
            <>
              {line.split(accent)[0]}
              <span className="text-brand">{accent}</span>
              {line.split(accent).slice(1).join(accent)}
            </>
          ) : (
            line
          )}
        </span>
      </span>
    ))}
  </>
);

export default MaskedLines;
