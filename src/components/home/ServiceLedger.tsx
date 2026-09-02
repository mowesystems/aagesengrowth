import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHead from '@/components/ui/SectionHead';
import services from '@/data/services';
import { tierById } from '@/data/pricing';
import { useLocale } from '@/i18n/useLocale';

/**
 * Every discipline and what it starts at, as one ruled ledger.
 *
 * This is the answer to "how much does this cost" arriving in the second
 * screen rather than three pages in. It is deliberately a table and not a grid
 * of cards: eight cards would be a wall, whereas eight rules read as a price
 * list — which is what a visitor is actually scanning for.
 *
 * Each row links to the section that covers the discipline in depth, so the
 * ledger doubles as the page's contents.
 */
const ServiceLedger: React.FC = () => {
  const { t, price } = useLocale();

  return (
    <section id="ydelser" className="scroll-mt-24 py-22 lg:py-30">
      <div className="frame">
        <SectionHead eyebrow={t.ledger.eyebrow} index="01" lead={t.ledger.lead}>
          {t.ledger.heading}
        </SectionHead>

        <div className="mt-16 rule">
          {services.map((service, index) => {
            const copy = t.services[service.id];
            const tier = tierById(service.tier);

            return (
              <Reveal key={service.id} delay={index * 40}>
                <a
                  href={service.anchor}
                  className="group relative grid grid-cols-12 items-baseline gap-x-4 gap-y-1 rule-row py-6 transition-colors sm:gap-x-6 lg:py-7"
                >
                  {/* The blue wipes in from the left edge on hover rather than
                      filling the row: it reads as a cursor moving down a list. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 bottom-0 top-0 w-0 bg-brand/[0.06] transition-[width] duration-500 ease-entrance group-hover:w-[calc(100%+2rem)]"
                  />

                  {/*
                    On a phone the row becomes a hanging-indent block: the
                    number sits in the margin and name, description and price
                    all line up in the column beside it. Before this the name
                    was indented past the description under it, which read as
                    a mistake.
                  */}
                  <span className="index-mark relative col-span-2 sm:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="relative col-span-10 sm:col-span-4">
                    <span className="block font-sans text-title font-semibold transition-colors group-hover:text-brand">
                      {copy.name}
                    </span>
                    <span className="meta mt-1.5 block sm:hidden">{copy.line}</span>
                  </span>

                  <span className="relative col-span-10 col-start-3 max-w-measure text-[0.95rem] leading-relaxed text-muted text-pretty sm:col-span-4 sm:col-start-auto">
                    {copy.body}
                  </span>

                  <span className="relative col-span-10 col-start-3 flex items-baseline gap-2 sm:col-span-3 sm:col-start-auto sm:justify-end">
                    {/*
                      Strategy and analytics are not sold on their own, so
                      quoting the partner retainer next to them would read as
                      their standalone price. They say what they belong to
                      instead, and the number itself lives one section down.
                    */}
                    {service.tier === 'partner' ? (
                      <span className="meta">{t.ledger.partOf}</span>
                    ) : (
                      <>
                        <span className="meta">{t.ledger.fromLabel}</span>
                        <span className="font-sans text-[1.05rem] font-semibold tabular-nums">
                          {tier ? price(tier.from) : ''}
                        </span>
                        {tier?.unit === 'month' && <span className="meta">{t.ledger.perMonth}</span>}
                      </>
                    )}
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="ml-1 shrink-0 -translate-x-1 self-center text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-7 max-w-prose text-sm text-muted">{t.ledger.note}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceLedger;
