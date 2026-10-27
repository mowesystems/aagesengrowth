import React from 'react';
import Reveal from '@/components/ui/Reveal';

interface SectionHeadProps {
  /** The mono label above the heading. */
  eyebrow: string;
  /** Two-digit index shown at the far left of the rule. */
  index?: string;
  children: React.ReactNode;
  /** Rendered under the heading, at measure width. */
  lead?: string;
  /** Sits opposite the heading on wide screens: a price, a CTA, a note. */
  aside?: React.ReactNode;
  className?: string;
}

/**
 * The opening of a section: a ruled label row, then the heading.
 *
 * The rule and the index are what make the page read as a document rather than
 * a stack of cards — every section announces itself the same way, so the
 * compositions underneath are free to differ wildly without the page losing
 * its spine.
 */
const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  index,
  children,
  lead,
  aside,
  className = '',
}) => (
  <div className={className}>
    <Reveal>
      <div className="rule flex items-baseline gap-4 pt-5">
        {index && <span className="index-mark shrink-0">{index}</span>}
        <span className="meta-brand">{eyebrow}</span>
      </div>
    </Reveal>

    <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-8">
        <h2 className="h-display text-balance">{children}</h2>
      </Reveal>

      {(lead || aside) && (
        <Reveal className="lg:col-span-4" delay={90}>
          {lead && <p className="max-w-measure text-lead text-muted text-pretty">{lead}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  </div>
);

export default SectionHead;
