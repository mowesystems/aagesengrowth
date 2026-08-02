import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/PageHero';
import { BrandPlate } from '@/components/CaseCard';
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

    <section className="bg-ink py-14 lg:py-20">
      <div className="shell">
        <div className="ledger">
          {cases.map((item, index) => (
            <article key={item.id} className="ledger-row">
              <Reveal delay={index * 60}>
                <div className="grid grid-cols-1 items-center gap-x-12 gap-y-7 py-9 lg:grid-cols-12 lg:py-12">
                  <div className="lg:col-span-4">
                    <BrandPlate item={item} className="h-48 border border-cream/15 sm:h-56" />
                  </div>

                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="meta-muted opacity-70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="meta">{item.kind}</p>
                      {item.period && (
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
                          {item.period}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 font-serif text-[2.1rem] leading-none tracking-tight text-cream sm:text-[2.6rem]">
                      <Link
                        to={`/projekter/${item.slug}`}
                        className="transition-colors hover:text-gold"
                      >
                        {item.client}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-xl text-base leading-relaxed text-cream text-pretty">
                      {item.summary}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {item.disciplines.map((discipline) => (
                        <li
                          key={discipline}
                          className="border border-cream/15 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim"
                        >
                          {discipline}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-2 lg:text-right">
                    <Link to={`/projekter/${item.slug}`} className="link-quiet">
                      Se casen
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-2xl border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-dim">
            Der er bevidst ingen tal på disse cases. Resultattal, der ikke kan efterprøves af den,
            der læser dem, siger ingenting — og vi vil hellere vise, hvordan opgaverne blev grebet
            an.
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default Cases;
