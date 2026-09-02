import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import MaskedLines from '@/components/ui/MaskedLines';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import { useLocale } from '@/i18n/useLocale';
import { cases } from '@/data/cases';
import { tierById } from '@/data/pricing';

/**
 * Websites — the dominant section.
 *
 * The claim is set as large as the hero, then immediately paid off with three
 * real desktop screenshots at full bleed. Below that the capability list is a
 * dense ruled index rather than a grid of feature cards, and the price sits
 * opposite it at display size so it cannot be missed.
 *
 * The closing note points at the page the reader is on. It is the strongest
 * evidence available and it costs nothing to make.
 */
const WebsitesSection: React.FC = () => {
  const { t, path, price } = useLocale();
  const tier = tierById('websites');

  const shots = cases
    .map((item) => ({ item, image: item.media?.desktop }))
    .filter((entry): entry is { item: (typeof cases)[number]; image: NonNullable<typeof entry.image> } =>
      Boolean(entry.image)
    );

  return (
    <section id="websites" className="scroll-mt-24 overflow-hidden bg-paper-3 py-22 lg:py-30">
      <div className="frame">
        <Reveal>
          <div className="rule flex items-baseline gap-4 pt-5">
            <span className="index-mark shrink-0">02</span>
            <span className="meta-brand">{t.websites.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="h-statement mt-10 max-w-[16ch]">
            <MaskedLines lines={t.websites.lines} delay={0} stagger={80} />
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-9 max-w-prose text-lead text-muted text-pretty">{t.websites.lead}</p>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------ evidence */}
      <div className="mt-16 lg:mt-20">
        <div className="frame">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map(({ item, image }, index) => {
              const copy = t.work.cases[item.id];
              return (
                <Reveal
                  key={item.id}
                  delay={index * 110}
                  className={index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
                >
                  <div className="group">
                    <CaseMediaFrame
                      image={image}
                      alt={copy?.media.desktop?.alt ?? ''}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      ratio={1.35}
                    />
                    <p className="meta mt-3.5 flex items-center gap-2.5">
                      <span className="h-px w-5 bg-brand" aria-hidden="true" />
                      {item.client}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------- capability + price */}
      <div className="frame mt-18 lg:mt-24">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="meta">{t.websites.includesLabel}</p>
            </Reveal>

            <ul className="mt-6 rule">
              {t.websites.includes.map((entry, index) => (
                <Reveal as="li" key={entry} delay={index * 35} className="rule-row">
                  <span className="flex items-baseline gap-4 py-3.5">
                    <span className="index-mark shrink-0 opacity-60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[1.0625rem] font-medium">{entry}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="border-t-2 border-ink pt-8">
                <p className="meta">{t.websites.priceLabel}</p>
                <p className="mt-4 font-sans text-price font-semibold tabular-nums">
                  {tier ? price(tier.from) : ''}
                </p>
                <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted">
                  {t.websites.priceNote}
                </p>

                <Button to={path('contact')} size="lg" className="mt-8 w-full sm:w-auto">
                  {t.websites.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-10 border-l-2 border-brand pl-5 text-[0.95rem] leading-relaxed text-muted">
                <span className="font-medium text-ink">{t.websites.proofLabel}</span>{' '}
                {t.websites.proofBody}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;
