import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import CallbackForm from '@/components/forms/CallbackForm';
import FaqBlock from '@/components/FaqBlock';
import WebsitePackages from '@/components/WebsitePackages';
import company from '@/config/company';
import { featuredCase } from '@/data/cases';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/** The questions this page answers, in order. Also emitted as FAQPage data. */
const FAQ_IDS = ['website-price', 'website-time', 'website-google', 'website-content', 'website'];

/**
 * New websites at a fixed price.
 *
 * The page exists for one search intent: someone looking for a new website and
 * what it costs. So the price is in the hero, the question "what does a new
 * website cost" is answered in plain words, and the latest website we built
 * sits right under it as proof.
 */
const Websites: React.FC = () => {
  const { t, path, price } = useLocale();
  const w = t.websitesPage;
  const packages = t.pricing.websites.packages;
  const lowest = Math.min(...packages.map((pkg) => pkg.price));
  const showcase = featuredCase;
  const caseCopy = t.work.cases[showcase.id];

  const schema = React.useMemo(() => {
    const faqItems = FAQ_IDS.map((id) => t.faq.items.find((item) => item.id === id)).filter(
      (item): item is (typeof t.faq.items)[number] => Boolean(item)
    );
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${company.domain}/#websites`,
        name: w.title,
        serviceType: 'Webdesign og udvikling af hjemmesider',
        description: w.description,
        provider: { '@id': `${company.domain}/#organization` },
        areaServed: 'DK',
        url: `${company.domain}${path('websites')}`,
        offers: packages.map((pkg) => ({
          '@type': 'Offer',
          name: `Website ${pkg.name}`,
          description: pkg.audience,
          priceCurrency: 'DKK',
          price: pkg.price,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'DKK',
            price: pkg.price,
            valueAddedTaxIncluded: false,
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ];
  }, [t, w, path, packages]);

  const heroAside = (
    <div className="instrument w-full p-6 sm:p-7 lg:max-w-[22rem]">
      <p className="meta">{w.priceFromLabel}</p>
      <p className="mt-3 font-sans text-[2.6rem] font-semibold leading-none tracking-[-0.035em] tabular-nums">
        {price(lowest)}
      </p>
      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{w.priceFromNote}</p>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`#${anchors.callback}`}
          onClick={() => track('primary_cta_clicked', { source: 'websites-hero', cta: 'callback' })}
          className="btn btn-primary w-full"
        >
          {w.heroCta}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
        <a href="#pakker" className="btn btn-outline w-full">
          {w.heroSecondary}
        </a>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead title={w.title} description={w.description} schema={schema} />
      <PageHero eyebrow={w.eyebrow} title={w.heading} lead={w.lead} aside={heroAside} />

      {/* ============================================== latest website */}
      {showcase.media?.desktop && (
        <section className="bg-paper-3 py-20 lg:py-26" aria-labelledby="websites-case-heading">
          <div className="frame">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7">
                <Link to={path('work', showcase.slug)} className="group block" aria-label={`${w.caseSection.cta}: ${showcase.client}`}>
                  <CaseMediaFrame
                    image={showcase.media.desktop}
                    alt={caseCopy?.media.desktop?.alt ?? ''}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    ratio={1.6}
                  />
                </Link>
              </Reveal>
              <div className="lg:col-span-5">
                <SectionHead eyebrow={w.caseSection.eyebrow}>
                  <span id="websites-case-heading">{w.caseSection.heading}</span>
                </SectionHead>
                <Reveal delay={80}>
                  <p className="mt-6 max-w-measure leading-relaxed text-muted text-pretty">{w.caseSection.body}</p>
                  <ul className="mt-6 rule">
                    {w.caseSection.points.map((point) => (
                      <li key={point} className="rule-row flex items-start gap-3 py-3 text-[0.95rem]">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link to={path('work', showcase.slug)} className="btn btn-primary">
                      {w.caseSection.cta}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <a href={showcase.url} target="_blank" rel="noopener noreferrer" className="link-line">
                      {w.caseSection.visit}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================== what it costs */}
      <section className="py-20 lg:py-26" aria-labelledby="websites-cost-heading">
        <div className="frame">
          <SectionHead eyebrow={w.cost.eyebrow} lead={w.cost.lead}>
            <span id="websites-cost-heading">{w.cost.heading}</span>
          </SectionHead>
          <ol className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
            {w.cost.factors.map((factor, i) => (
              <Reveal key={factor.title} as="li" delay={i * 80} className="rule pt-6">
                <p className="index-mark">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-sans text-title font-semibold">{factor.title}</h3>
                <p className="mt-3 max-w-measure leading-relaxed text-muted text-pretty">{factor.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================== packages */}
      <section
        id="pakker"
        className="relative scroll-mt-24 overflow-hidden bg-brand-tint/60 py-20 lg:py-26"
        aria-labelledby="websites-packages-heading"
      >
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="frame relative">
          <SectionHead eyebrow={w.packages.eyebrow} lead={t.pricing.websites.lead}>
            <span id="websites-packages-heading">{w.packages.heading}</span>
          </SectionHead>
          <WebsitePackages className="mt-14 lg:mt-18" source="websites" />
          <Reveal className="mt-8" delay={80}>
            <p className="text-[0.9rem] text-muted">{t.pricing.websites.scopeNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ============================================== included + process */}
      <section className="py-20 lg:py-26" aria-label={w.process.heading}>
        <div className="frame">
          <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead eyebrow={w.included.eyebrow}>{w.included.heading}</SectionHead>
              <Reveal delay={80}>
                <ul className="mt-8 rule">
                  {w.included.items.map((item) => (
                    <li key={item} className="rule-row flex items-start gap-3 py-3.5 text-[0.95rem]">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHead eyebrow={w.process.eyebrow}>{w.process.heading}</SectionHead>
              <ol className="mt-8">
                {w.process.steps.map((step, i) => (
                  <Reveal key={step.title} as="li" delay={i * 70} className="rule-row grid grid-cols-[3rem_1fr] gap-x-4 py-6">
                    <span className="index-mark pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-sans text-title font-semibold">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted text-pretty">{step.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== callback */}
      <section
        id={anchors.callback}
        className="scroll-mt-24 bg-paper-3 py-20 lg:py-26"
        aria-labelledby="websites-callback-heading"
      >
        <div className="frame">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <SectionHead eyebrow={w.callback.eyebrow}>
                <span id="websites-callback-heading">{w.callback.heading}</span>
              </SectionHead>
              <Reveal delay={80}>
                <p className="mt-6 max-w-measure text-lead text-muted">{w.callback.lead}</p>
                <Link to={path('booking')} className="link-line mt-6">
                  {t.cta.bookAfklaring}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <div className="instrument p-6 sm:p-8 lg:p-10">
                <CallbackForm source="websites" idPrefix="websites-callback" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqBlock ids={FAQ_IDS} eyebrow={w.faq.eyebrow} heading={w.faq.heading} />
    </>
  );
};

export default Websites;
