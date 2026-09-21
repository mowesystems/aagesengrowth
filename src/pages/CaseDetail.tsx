import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import company from '@/config/company';
import cases, { getCaseBySlug, verifiedMetrics, usableTestimonial } from '@/data/cases';
import { useLocale } from '@/i18n/useLocale';

/**
 * One project.
 *
 * Structure: a full-width lead screenshot, the narrative in a single readable
 * column, everything that was delivered as a ruled index, then the rest of the
 * media. Results only render when a number has been marked verified in the
 * data — an empty `metrics` array produces no module at all rather than an
 * empty one.
 */
const CaseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, path } = useLocale();
  const item = slug ? getCaseBySlug(slug) : undefined;

  if (!item) return <Navigate to={path('work')} replace />;

  const copy = t.work.cases[item.id];
  const media = item.media;
  const metrics = verifiedMetrics(item);
  const testimonial = usableTestimonial(item);
  const alt = (key: string) => copy?.media[key]?.alt ?? '';

  const index = cases.findIndex((entry) => entry.id === item.id);
  const next = cases[(index + 1) % cases.length];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.client,
    headline: copy?.strapline,
    description: copy?.summary,
    url: `${company.domain}${path('work', item.slug)}`,
    creator: { '@type': 'Organization', name: company.legalName },
    about: copy?.disciplines,
  };

  return (
    <>
      <SEOHead
        title={`${item.client} — ${copy?.strapline ?? ''}`.trim()}
        description={copy?.summary ?? ''}
        schema={schema}
      />

      {/* ------------------------------------------------------------- lead */}
      <section className="relative overflow-hidden">
        <div className="ambient pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="frame relative pb-12 pt-28 lg:pb-16 lg:pt-38">
          <Reveal>
            <Link to={path('work')} className="link-line -ml-1">
              <ArrowLeft size={14} aria-hidden="true" />
              {t.cta.backToWork}
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="meta-brand">{copy?.kind}</p>
              <h1 className="h-statement mt-6">{item.client}</h1>
              <p className="h-serif mt-5 text-title text-muted">{copy?.strapline}</p>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={90}>
              <p className="max-w-measure text-lead text-muted text-pretty">{copy?.summary}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-5"
              >
                {t.cta.visitSite}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>

        {media?.desktop && (
          <div className="frame relative">
            <Reveal>
              <div className="group">
                <CaseMediaFrame
                  image={media.desktop}
                  alt={alt('desktop')}
                  sizes="(min-width: 1600px) 88vw, 92vw"
                  priority
                  ratio={1.72}
                />
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* -------------------------------------------------------- narrative */}
      <section className="py-20 lg:py-26">
        <div className="frame">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="meta">{t.pages.work.challengeLabel}</h2>
                <p className="mt-5 max-w-prose text-lead text-muted text-pretty">
                  {copy?.challenge}
                </p>
              </Reveal>

              {copy?.sections.map((section, sectionIndex) => (
                <Reveal key={section.heading} delay={sectionIndex * 60}>
                  <div className="mt-12 rule pt-8">
                    <h2 className="font-sans text-title font-semibold">{section.heading}</h2>
                    <p className="mt-4 max-w-prose leading-relaxed text-muted text-pretty">
                      {section.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <h2 className="meta">{t.pages.work.deliveredLabel}</h2>
                <ul className="mt-5 rule">
                  {copy?.delivered.map((entry) => (
                    <li key={entry} className="rule-row py-3.5 text-[0.95rem]">
                      {entry}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {copy?.disciplines && (
                <Reveal delay={70}>
                  <h2 className="meta mt-10">{t.pages.work.disciplinesLabel}</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {copy.disciplines.map((discipline) => (
                      <li
                        key={discipline}
                        className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted"
                      >
                        {discipline}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {copy?.period && (
                <Reveal delay={90}>
                  <h2 className="meta mt-10">{t.pages.work.periodLabel}</h2>
                  <p className="mt-3 text-[0.95rem] text-muted">{copy.period}</p>
                </Reveal>
              )}

              {copy?.demonstrates && (
                <Reveal delay={110}>
                  <div className="mt-10 border-l-2 border-brand pl-5">
                    <h2 className="meta">{t.pages.work.demonstratesLabel}</h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                      {copy.demonstrates}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* Only renders when a number has been marked verified. */}
          {metrics.length > 0 && (
            <div className="mt-18 grid gap-x-10 gap-y-8 rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <Reveal key={metric.label}>
                  <p className="font-sans text-display font-semibold tabular-nums">{metric.value}</p>
                  <p className="mt-2 text-[0.95rem] text-muted">{metric.label}</p>
                  {metric.source && <p className="meta mt-2">{metric.source}</p>}
                </Reveal>
              ))}
            </div>
          )}

          {testimonial && (
            <Reveal>
              <blockquote className="mt-18 max-w-prose rule pt-10">
                <p className="h-serif text-section">“{testimonial.quote}”</p>
                <footer className="meta mt-6">
                  {testimonial.name}
                  {testimonial.role ? ` — ${testimonial.role}` : ''}
                </footer>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ media */}
      {media && (
        <section className="bg-paper-3 py-20 lg:py-26">
          <div className="frame">
            <div className="grid gap-5 lg:grid-cols-12">
              {media.mobile && (
                <Reveal className="lg:col-span-3">
                  <CaseMediaFrame
                    image={media.mobile}
                    alt={alt('mobile')}
                    sizes="(min-width: 1024px) 22vw, 60vw"
                    className="mx-auto max-w-[260px] lg:max-w-none"
                  />
                </Reveal>
              )}

              {media.screens?.map((screen, screenIndex) => (
                <Reveal
                  key={screen.base}
                  className={media.mobile ? 'lg:col-span-4' : 'lg:col-span-6'}
                  delay={screenIndex * 80}
                >
                  <div className="group">
                    <CaseMediaFrame
                      image={screen}
                      alt={alt(screen.mediaKey)}
                      caption={copy?.media[screen.mediaKey]?.caption}
                      showCaption
                      sizes="(min-width: 1024px) 34vw, 92vw"
                      ratio={1.5}
                    />
                  </div>
                </Reveal>
              ))}

              {media.photos?.map((photo, photoIndex) => (
                <Reveal
                  key={photo.base}
                  className="sm:col-span-1 lg:col-span-4"
                  delay={photoIndex * 80}
                >
                  <CaseMediaFrame
                    image={photo}
                    alt={alt(photo.mediaKey)}
                    caption={copy?.media[photo.mediaKey]?.caption}
                    showCaption
                    sizes="(min-width: 1024px) 32vw, 92vw"
                    ratio={1.15}
                  />
                </Reveal>
              ))}
            </div>

            {copy?.disclosure && (
              <Reveal>
                <p className="meta mt-10">{copy.disclosure}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- next */}
      <section className="py-18 lg:py-22">
        <div className="frame">
          <div className="rule flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="meta">{t.pages.work.nextLabel}</p>
              <Link
                to={path('work', next.slug)}
                className="group mt-4 inline-flex items-baseline gap-4"
              >
                <span className="h-section transition-colors group-hover:text-brand">
                  {next.client}
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="self-center text-brand transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <Button to={path('review')} size="lg">
              {t.pages.work.similarCta}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseDetail;
