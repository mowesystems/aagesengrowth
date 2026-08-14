import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import ResultsStrip from '@/components/case/ResultsStrip';
import NotFound from '@/pages/NotFound';
import company from '@/config/company';
import cases, { getCaseBySlug, usableTestimonial } from '@/data/cases';
import services from '@/data/services';

const CaseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = getCaseBySlug(slug ?? '');

  if (!item) return <NotFound />;

  const url = `${company.domain}/projekter/${item.slug}`;
  const position = cases.findIndex((entry) => entry.id === item.id);
  const projectNumber = String(position + 1).padStart(2, '0');
  const next = cases[(position + 1) % cases.length];
  const testimonial = usableTestimonial(item);
  const relatedServices = item.serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  // Everything visual the project has, in reading order, minus the two frames
  // already used in the hero.
  const story = [...(item.media?.photos ?? []), ...(item.media?.screens ?? [])];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: `${company.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Cases', item: `${company.domain}/projekter` },
      { '@type': 'ListItem', position: 3, name: item.client, item: url },
    ],
  };

  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.client,
    description: item.summary,
    url,
    creator: { '@type': 'ProfessionalService', name: company.legalName, url: company.domain },
  };

  return (
    <>
      <SEOHead
        title={`${item.client} — case`}
        description={item.summary}
        canonical={`/projekter/${item.slug}`}
        schema={[breadcrumbSchema, caseSchema]}
      />

      {/* ------------------------------------------------------ 1. hero */}
      <section className="grain relative overflow-hidden border-b border-paper/10 bg-ink">
        <div className="ambient pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="frame relative pb-16 pt-28 lg:pb-22 lg:pt-38">
          <Link to="/projekter" className="link-line -ml-1">
            <ArrowLeft size={14} aria-hidden="true" />
            Alle cases
          </Link>

          <div className="mt-9 grid grid-cols-4 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="col-span-4 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="index-mark text-cyan/80">Case {projectNumber}</span>
                <p className="meta">{item.kind}</p>
                {item.period && (
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                    {item.period}
                  </span>
                )}
              </div>

              <h1 className="mt-7 font-display text-hero uppercase leading-[0.84] text-paper">
                <span className="line-mask">
                  <span style={{ animationDelay: '70ms' }}>{item.client}</span>
                </span>
              </h1>

              <p className="mt-8 max-w-measure font-display text-title text-paper/85 text-pretty">
                {item.strapline}
              </p>
              <p className="mt-5 max-w-measure text-lead text-muted text-pretty">{item.summary}</p>
            </div>

            <div className="col-span-4 lg:col-span-5 lg:self-end">
              <ul className="rule">
                {item.disciplines.map((discipline) => (
                  <li
                    key={discipline}
                    className="rule-row py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted"
                  >
                    {discipline}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {item.media?.desktop && (
            <div className="group mt-14 grid grid-cols-4 gap-x-6 gap-y-6 lg:mt-18 lg:grid-cols-12 lg:gap-x-10">
              <div className="col-span-4 lg:col-span-9">
                <CaseMediaFrame
                  image={item.media.desktop}
                  sizes="(min-width: 1024px) 70vw, 92vw"
                  priority
                />
              </div>
              {item.media.mobile && (
                <div className="col-span-2 lg:col-span-3 lg:self-end">
                  <CaseMediaFrame
                    image={item.media.mobile}
                    sizes="(min-width: 1024px) 22vw, 44vw"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------- 2. results */}
      <section className="border-b border-paper/10 bg-ink-2 py-14 lg:py-18">
        <div className="frame">
          <ResultsStrip item={item} />
        </div>
      </section>

      {/* ------------------------------------------------- 3. challenge */}
      <section className="on-light bg-paper py-18 text-ink lg:py-26">
        <div className="frame">
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
            <div className="col-span-4 lg:col-span-3">
              <h2 className="meta-ink">Udgangspunktet</h2>
            </div>
            <div className="col-span-4 lg:col-span-8">
              <p className="max-w-prose font-display text-section text-ink text-pretty">
                {item.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- 4. system */}
      <section className="bg-ink py-18 lg:py-26" aria-labelledby="case-system-heading">
        <div className="frame">
          <h2 id="case-system-heading" className="meta-lit">
            Løsningen
          </h2>

          <div className="rule mt-10">
            {item.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 60} className="rule-row block">
                <div className="grid grid-cols-4 gap-x-6 gap-y-4 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-14">
                  <div className="col-span-4 flex items-baseline gap-5 lg:col-span-5">
                    <span className="index-mark shrink-0 text-cyan/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-display uppercase leading-[0.92] text-paper">
                      {section.heading}
                    </h3>
                  </div>
                  <p className="col-span-4 max-w-prose text-[0.95rem] leading-relaxed text-muted text-pretty lg:col-span-6 lg:col-start-7">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- 5. visual story */}
      {story.length > 0 && (
        <section
          className="border-y border-paper/10 bg-ink-2 py-18 lg:py-26"
          aria-labelledby="case-visuals-heading"
        >
          <div className="frame">
            <h2 id="case-visuals-heading" className="meta-lit">
              Fra projektet
            </h2>

            {/*
              Two hand-packed columns rather than one grid.
              Assets here have wildly different aspects — a 16:10 browser frame
              beside a 3:4 photograph — and a shared grid ties their row heights
              together, which leaves holes wherever a short item sits next to a
              tall one. Splitting the sequence into two columns lets each item
              take exactly its own height. The right column starts lower so the
              pair reads as a spread rather than as two lists.
            */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
              {[0, 1].map((column) => (
                <div
                  key={column}
                  className={`flex flex-col gap-6 lg:gap-10 ${column === 1 ? 'lg:mt-20' : ''}`}
                >
                  {story
                    .filter((_, index) => index % 2 === column)
                    .map((image, index) => (
                      <Reveal
                        key={image.base}
                        delay={index * 60}
                        as="figure"
                        className="group"
                      >
                        <CaseMediaFrame image={image} sizes="(min-width: 1024px) 44vw, 92vw" />
                        {image.caption && (
                          <figcaption className="meta mt-3">{image.caption}</figcaption>
                        )}
                      </Reveal>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------- 6-9. delivered, services, proof */}
      <section className="bg-ink py-18 lg:py-26">
        <div className="frame">
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="col-span-4 lg:col-span-5">
              <h2 className="meta-lit">Leveret</h2>
              <ul className="rule mt-6">
                {item.delivered.map((entry) => (
                  <li key={entry} className="rule-row py-4 text-[0.95rem] leading-relaxed text-paper">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 lg:col-span-6 lg:col-start-7">
              <h2 className="meta-lit">Ydelser i spil</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {relatedServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.href}
                      className="inline-flex border border-paper/15 px-3.5 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-paper hover:text-paper"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="relative mt-12 border border-paper/15 bg-ink-2 p-7 sm:p-8">
                <span aria-hidden="true" className="iris-rule absolute inset-x-0 top-0 h-px" />
                <h2 className="meta-lit">Hvad casen viser</h2>
                <p className="mt-5 max-w-prose font-display text-title text-paper text-pretty">
                  {item.demonstrates}
                </p>
              </div>

              {testimonial && (
                <figure className="mt-10 border-l border-cyan/40 pl-6">
                  <blockquote className="max-w-prose font-display text-title text-paper text-pretty">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="meta mt-4">
                    {testimonial.name}
                    {testimonial.role ? ` · ${testimonial.role}` : ''}
                  </figcaption>
                </figure>
              )}

              <div className="mt-10">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                  aria-label={`Besøg ${item.client} (åbner i ny fane)`}
                >
                  Besøg {item.client}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {item.disclosure && (
                <p className="mt-8 flex max-w-prose items-start gap-2.5 text-xs leading-relaxed text-muted">
                  <Info size={14} className="mt-0.5 shrink-0 text-cyan/70" aria-hidden="true" />
                  {item.disclosure}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ 10. next case + CTA */}
      <section className="border-t border-paper/10 bg-ink-2 py-18 lg:py-24">
        <div className="frame">
          <div className="grid grid-cols-4 items-end gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="col-span-4 lg:col-span-7">
              <p className="meta">Næste case</p>
              <h2 className="mt-5 font-display text-statement uppercase leading-[0.88] text-paper">
                <Link
                  to={`/projekter/${next.slug}`}
                  className="group inline-flex items-baseline gap-5 transition-colors duration-300 hover:text-cyan"
                >
                  {next.client}
                  <ArrowRight
                    size={22}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </Link>
              </h2>
              <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted">
                {next.strapline}
              </p>
            </div>

            <div className="col-span-4 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <Link to="/#website-tjek" className="btn btn-primary btn-lg w-full sm:w-auto">
                Få et website-tjek
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseDetail;
