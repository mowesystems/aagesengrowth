import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Open the first item on mount. */
  openFirst?: boolean;
  /** Heading level used for each question, for a correct document outline. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * One accordion for every FAQ on the site.
 *
 * The panel is toggled with `hidden` rather than an animated max-height clamp,
 * which is what used to silently crop the longer answers. Questions come from
 * the dictionary, so the id is derived from the index rather than from the
 * text — a translated question would otherwise change the DOM id.
 */
const Accordion: React.FC<AccordionProps> = ({
  items,
  openFirst = false,
  headingLevel: Heading = 'h3',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(openFirst ? 0 : null);

  return (
    <div className="rule">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.q} className="rule-row">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left font-sans text-[1.05rem] font-medium leading-snug text-ink transition-colors hover:text-brand"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
                    isOpen ? 'border-brand bg-brand text-paper-2' : 'border-ink/25 text-ink'
                  }`}
                >
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
            </Heading>

            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="max-w-prose pb-7 pr-8 text-[0.95rem] leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
