import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import company from '@/config/company';
import cases from '@/data/cases';
import { useLocale } from '@/i18n/useLocale';

/**
 * The work index.
 *
 * Alternating rows rather than a grid of equal cards: the media column swaps
 * sides on every entry, which keeps a three-item list from reading as a
 * three-item list. Each row is one large link target with the whole media
 * frame inside it.
 */
const Work: React.FC = () => {
  const { t, path } = useLocale();

  const schema = React.useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t.pages.work.heading,
      url: `${company.domain}${path('work')}`,
      hasPart: cases.map((item) => ({
        '@type': 'CreativeWork',
        name: item.client,
        url: `${company.domain}${path('work', item.slug)}`,
      })),
    }),
    [t, path]
  );

  return (
    <>
      <SEOHead
        title={t.pages.work.title}
        description={t.pages.work.description}
        schema={schema}
      />

      <PageHero
        eyebrow={t.pages.work.allLabel}
        title={t.pages.work.heading}
        lead={t.pages.work.lead}
      />

      <section className="py-18 lg:py-24">
        <div className="frame">
          <div className="rule">
            {cases.map((item, index) => {
              const copy = t.work.cases[item.id];
              const image = item.media?.desktop;
              const flipped = index % 2 === 1;

              return (
                <Reveal key={item.id} delay={index * 80}>
                  <article className="rule-row py-12 lg:py-16">
                    <Link
                      to={path('work', item.slug)}
                      className="group grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center"
                    >
                      {image && (
                        <div
                          className={`lg:col-span-7 ${flipped ? 'lg:order-2 lg:col-start-6' : ''}`}
                        >
                          <CaseMediaFrame
                            image={image}
                            alt={copy?.media.desktop?.alt ?? ''}
                            sizes="(min-width: 1024px) 56vw, 92vw"
                            ratio={1.5}
                          />
                        </div>
                      )}

                      <div
                        className={`lg:col-span-5 ${flipped ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}
                      >
                        <p className="index-mark">{String(index + 1).padStart(2, '0')}</p>
                        <h2 className="h-section mt-4 transition-colors group-hover:text-brand">
                          {item.client}
                        </h2>
                        <p className="meta mt-3">{copy?.kind}</p>
                        <p className="mt-6 max-w-measure text-[1.0625rem] leading-relaxed text-muted text-pretty">
                          {copy?.summary}
                        </p>

                        {copy?.disciplines && (
                          <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                            {copy.disciplines.map((discipline) => (
                              <li
                                key={discipline}
                                className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted"
                              >
                                {discipline}
                              </li>
                            ))}
                          </ul>
                        )}

                        <span className="link-line mt-7">
                          {t.cta.viewCase}
                          <ArrowRight
                            size={14}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
