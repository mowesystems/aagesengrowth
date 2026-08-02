import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { PricingFaqItem } from '@/data/pricing';

interface PricingFAQProps {
  items: PricingFaqItem[];
}

const PricingFAQ: React.FC<PricingFAQProps> = ({ items }) => {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="border-t border-navy/15">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `pricing-faq-panel-${item.id}`;
        return (
          <div key={item.id} className="border-b border-navy/15">
            <h3>
              <button
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-lg font-medium text-navy transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronDown size={19} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} hidden={!isOpen}>
              <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingFAQ;
