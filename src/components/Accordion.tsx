import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FAQItem } from '@/data/faq';

interface AccordionProps {
  items: FAQItem[];
  /** Open the first item on mount. */
  openFirst?: boolean;
  /** Paper ground variant. */
  light?: boolean;
  /** Heading level used for each question, for a correct document outline. */
  headingLevel?: 'h3' | 'h4';
}

/**
 * One accordion for every FAQ on the site.
 *
 * The panel is toggled with `hidden` rather than an animated max-height clamp,
 * which is what used to silently crop the longer answers.
 */
const Accordion: React.FC<AccordionProps> = ({
  items,
  openFirst = false,
  light = false,
  headingLevel: Heading = 'h3',
}) => {
  const [openId, setOpenId] = useState<string | null>(openFirst ? (items[0]?.id ?? null) : null);

  return (
    <div className={light ? 'rule-ink' : 'rule'}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className={light ? 'rule-row-ink' : 'rule-row'}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={`flex w-full items-start justify-between gap-6 py-6 text-left font-sans text-[1.02rem] font-medium leading-snug transition-colors ${
                  light ? 'text-ink hover:text-accent-ink' : 'text-paper hover:text-cyan'
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
                    light
                      ? 'border-ink/25 text-ink'
                      : isOpen
                        ? 'border-paper bg-paper text-ink'
                        : 'border-paper/25 text-paper'
                  }`}
                >
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
            </Heading>

            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p
                className={`max-w-prose pb-7 pr-8 text-[0.94rem] leading-relaxed ${
                  light ? 'text-muted-ink' : 'text-muted'
                }`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
