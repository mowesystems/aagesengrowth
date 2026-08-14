import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import company from '@/config/company';
import cases from '@/data/cases';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
    { '@type': 'ListItem', position: 2, name: 'Cases', item: `${company.domain}/projekter` },
  ],
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: cases.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.client,
    url: `${company.domain}/projekter/${item.slug}`,
  })),
};

/**
 * The index of work.
 *
 * Large alternating rows rather than a logo gallery: each project gets its own
 * website preview, its number, its period, the disciplines in play and one
 * sentence about what the work had to solve.
 */
const Cases: React.FC = () => (
  <>
    <SEOHead
      title="Cases — udvalgt arbejde"
      description="Tre projekter fra Aagesen Growth: Plus Eins, Plus Eins Deli og MOWE Systems. Hvad opgaven var, hvordan den blev grebet an, og hvad der blev bygget."
      canonical="/projekter"
      schema={[breadcrumbSchema, listSchema]}
    />

    <PageHero
      eyebrow="Cases"
      title="Tre projekter, og hvad de hver især krævede."
      lead="Ikke et galleri af forsider. Hver case beskriver opgaven, valgene undervejs og hvad løsningen skulle kunne bagefter."
    />

    <section className="bg-ink py-18 lg:py-26">
      <div className="frame">
        <div className="rule">
          {cases.map((item, index) => {
            const mediaFirst = index % 2 === 0;
            return (
              <article key={item.id} className="rule-row">
                <Reveal>
                  <div className="grid grid-cols-4 items-center gap-x-6 gap-y-8 py-12 lg:grid-cols-12 lg:gap-x-10 lg:py-18">
                    <div
                      className={`group col-span-4 lg:col-span-7 ${
                        mediaFirst ? 'lg:order-1' : 'lg:order-2 lg:col-start-6'
                      }`}
                    >
                      {item.media?.desktop && (
                        <CaseMediaFrame
                          image={item.media.desktop}
                          sizes="(min-width: 1024px) 54vw, 92vw"
                          priority={index === 0}
                        />
                      )}
                    </div>

                    <div
                      className={`col-span-4 lg:col-span-5 ${
                        mediaFirst ? 'lg:order-2 lg:col-start-9 lg:col-end-13' : 'lg:order-1'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="index-mark text-cyan/80">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="meta">{item.kind}</p>
                        {item.period && (
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                            {item.period}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-5 font-display text-display uppercase leading-[0.88] text-paper">
                        <Link
                          to={`/projekter/${item.slug}`}
                          className="transition-colors duration-300 hover:text-cyan"
                        >
                          {item.client}
                        </Link>
                      </h2>

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

                      <Link to={`/projekter/${item.slug}`} className="link-line mt-7">
                        Se casen
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-12 max-w-prose border-l border-cyan/40 pl-5 text-sm leading-relaxed text-muted">
            Der er bevidst ingen resultattal på disse cases. Tal, der ikke kan efterprøves af den,
            der læser dem, siger ingenting — og vi vil hellere vise, hvordan opgaverne blev grebet
            an. Når et tal kan dokumenteres med kilde og periode, kommer det på.
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default Cases;
