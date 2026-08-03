import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import NotFound from '@/pages/NotFound';
import { BrandPlate } from '@/components/CaseCard';
import company from '@/config/company';
import cases, { getCaseBySlug } from '@/data/cases';
import services from '@/data/services';

const CaseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = getCaseBySlug(slug ?? '');

  if (!item) return <NotFound />;

  const url = `${company.domain}/projekter/${item.slug}`;
  const related = cases.filter((entry) => entry.id !== item.id);
  const relatedServices = item.serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

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

      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-cream/12 bg-ink-2">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="shell relative pb-12 pt-28 lg:pb-16 lg:pt-36">
          <Reveal>
            <Link to="/projekter" className="link-quiet -ml-1">
              <ArrowLeft size={14} aria-hidden="true" />
              Alle cases
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-end gap-x-14 gap-y-9 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal delay={60}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="meta">{item.kind}</p>
                  {item.period && (
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
                      {item.period}
                    </span>
                  )}
                </div>
                <h1 className="mt-5 font-serif text-statement text-cream">{item.client}</h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream text-pretty">
                  {item.summary}
                </p>
              </Reveal>
            </div>

            <Reveal delay={110} className="lg:col-span-5">
              <BrandPlate item={item} className="h-52 border border-cream/20 sm:h-60" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- challenge */}
      <section className="on-light bg-cream py-14 text-ink lg:py-20">
        <div className="shell">
          <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="meta-on-light">Udgangspunktet</p>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-3xl font-serif text-[1.6rem] leading-snug text-ink text-pretty sm:text-[2rem]">
                {item.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ sections */}
      <section className="bg-ink py-14 lg:py-20">
        <div className="shell">
          <div className="ledger">
            {item.sections.map((section, index) => (
              <div key={section.heading} className="ledger-row">
                <Reveal delay={index * 50}>
                  <div className="grid grid-cols-1 gap-x-16 gap-y-4 py-8 lg:grid-cols-12 lg:py-10">
                    <div className="flex items-baseline gap-4 lg:col-span-4">
                      <span className="meta-muted opacity-70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-serif text-2xl leading-snug text-cream">
                        {section.heading}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-relaxed text-dim text-pretty lg:col-span-8">
                      {section.body}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- delivered + services */}
      <section className="border-y border-cream/12 bg-ink-2 py-14 lg:py-20">
        <div className="shell">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="meta">Leveret</p>
              <ul className="ledger mt-6">
                {item.delivered.map((entry) => (
                  <li key={entry} className="ledger-row py-4 text-[0.95rem] leading-relaxed text-cream">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <p className="meta">Ydelser i spil</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {relatedServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.href}
                      className="inline-flex border border-cream/20 px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-dim transition-colors hover:border-cream hover:text-cream"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="marked mt-10 border border-cream/20 bg-ink p-6 text-cream/25 sm:p-7">
                <p className="meta text-cream">Hvad casen viser</p>
                <p className="mt-4 font-serif text-xl leading-snug text-cream text-pretty">
                  {item.demonstrates}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                  aria-label={`Besøg ${item.client} (åbner i ny fane)`}
                >
                  Besøg {item.client}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {item.disclosure && (
                <p className="mt-7 flex items-start gap-2.5 text-xs leading-relaxed text-dim">
                  <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {item.disclosure}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- next */}
      <section className="bg-ink py-14 lg:py-20">
        <div className="shell">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="meta">Flere cases</p>
              <ul className="mt-5 space-y-2">
                {related.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      to={`/projekter/${entry.slug}`}
                      className="group inline-flex items-baseline gap-4 font-serif text-[1.8rem] leading-tight text-cream transition-colors hover:text-gold sm:text-[2.2rem]"
                    >
                      {entry.client}
                      <ArrowRight
                        size={17}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Button to="/kontakt" size="lg" className="shrink-0">
              Få et website-tjek
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseDetail;
