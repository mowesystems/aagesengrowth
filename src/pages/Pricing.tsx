import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import CallbackForm from '@/components/forms/CallbackForm';
import FaqBlock from '@/components/FaqBlock';
import WebsitePackages from '@/components/WebsitePackages';
import company from '@/config/company';
import founderProgram from '@/config/founderProgram';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/**
 * Pricing, in two clearly separated parts.
 *
 * A: Growth Engine, the ongoing process. The price is fixed; what gets built
 * for it depends on the scan, so the page shows the fixed process and a set
 * of clearly labelled examples rather than a checklist of features.
 * B: Websites, three fixed-price packages that the Growth Scan can point to
 * when the website itself is the bottleneck.
 */
const Pricing: React.FC = () => {
  const { t, price, path } = useLocale();
  const p = t.pricing;
  const f = t.founder;
  const w = p.websites;

  React.useEffect(() => {
    track('pricing_viewed', { source: 'pricing-page' });
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: p.title,
    url: `${company.domain}${path('pricing')}`,
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Growth Engine',
        priceCurrency: 'DKK',
        price: p.monthly,
        priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: 'DKK', price: p.monthly, unitText: 'MONTH', valueAddedTaxIncluded: false },
      },
      ...w.packages.map((pkg) => ({
        '@type': 'Offer',
        name: `Website ${pkg.name}`,
        priceCurrency: 'DKK',
        price: pkg.price,
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'DKK', price: pkg.price, valueAddedTaxIncluded: false },
        description: pkg.audience,
      })),
    ],
  };

  const jump = (
    <nav aria-label={p.title} className="flex flex-wrap gap-3">
      <a href="#growth-engine" className="btn btn-outline">A · {p.jump.engine}</a>
      <a href={`#${anchors.websites}`} className="btn btn-outline">B · {p.jump.websites}</a>
    </nav>
  );

  return (
    <>
      <SEOHead title={p.title} description={p.description} schema={schema} />
      <PageHero eyebrow={p.eyebrow} title={p.heading} lead={p.lead} aside={jump} />

      {/* ============================================== A · Growth Engine */}
      <section id="growth-engine" className="scroll-mt-24 py-20 lg:py-26" aria-labelledby="engine-price-heading">
        <div className="frame">
          <SectionHead eyebrow={p.engine.eyebrow} lead={p.engine.lead}>
            <span id="engine-price-heading">{p.engine.heading}</span>
          </SectionHead>

          <Reveal className="mt-14 lg:mt-18">
            <div className="instrument grid gap-0 lg:grid-cols-12">
              {/* price */}
              <div className="border-b p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--line)' }}>
                <p className="meta-brand">{p.name}</p>
                <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="font-sans text-[2.6rem] font-semibold leading-none tracking-[-0.035em] tabular-nums">{price(p.monthly)}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{p.monthlyLabel}</p>
                  </div>
                  <div>
                    <p className="font-sans text-[1.3rem] font-semibold leading-none tracking-[-0.02em] tabular-nums">{price(p.setup)}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{p.setupLabel}</p>
                  </div>
                </div>
                <p className="mt-6 text-[0.85rem] text-muted">{p.vat}</p>
                <p className="mt-1 text-[0.85rem] text-muted">{p.binding}</p>

                <p className="meta mt-10">{p.engine.processHeading}</p>
                <ol className="mt-4">
                  {p.engine.process.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 border-t py-3" style={{ borderColor: 'var(--line)' }}>
                      <span className="index-mark pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[0.95rem] leading-snug">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link to={path('scan')} onClick={() => track('primary_cta_clicked', { source: 'pricing-engine', cta: 'scan' })} className="btn btn-primary">
                    {t.cta.scan}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link to={path('booking')} onClick={() => track('primary_cta_clicked', { source: 'pricing-engine', cta: 'book_afklaring' })} className="btn btn-outline">
                    {t.cta.bookAfklaring}
                  </Link>
                </div>
              </div>

              {/* examples */}
              <div className="p-7 sm:p-10 lg:col-span-7">
                <p className="meta">{p.engine.examplesHeading}</p>
                <p className="mt-3 max-w-measure text-[0.9rem] leading-relaxed text-muted">{p.engine.examplesNote}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.engine.examples.map((item) => (
                    <li key={item} className="chip chip-pending min-h-8 normal-case tracking-[0.04em] text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------ founder */}
          {founderProgram.enabled && (
            <Reveal className="mt-6" delay={80}>
              <div id={anchors.founder} className="relative scroll-mt-24 overflow-hidden bg-brand text-paper-2" aria-label={f.ariaLabel}>
                <div className="grid-lines-lit pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em] text-paper-2/75">
                      {f.eyebrow} · {founderProgram.seats} {f.seatsLabel}
                    </p>
                    <h3 className="mt-5 font-sans text-[1.8rem] font-semibold leading-tight tracking-[-0.03em]">{f.heading}</h3>
                    <p className="mt-4 max-w-measure text-[0.98rem] leading-relaxed text-paper-2/85">{f.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {f.conditions.map((c) => (
                        <li key={c} className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper-2/80">
                          <span className="h-1 w-1 bg-current" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between border-t border-paper-2/20 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <div>
                      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                        <div>
                          <p className="font-sans text-[2.4rem] font-semibold leading-none tracking-[-0.035em] tabular-nums sm:text-[2.8rem]">{price(founderProgram.monthly)}</p>
                          <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{p.monthlyLabel} · {f.duration}</p>
                        </div>
                        <div>
                          <p className="font-sans text-[1.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{price(founderProgram.setup)}</p>
                          <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper-2/75">{p.setupLabel}</p>
                        </div>
                      </div>
                      <p className="mt-6 text-[0.85rem] leading-relaxed text-paper-2/75">
                        {f.afterHeading}: {price(p.monthly)} {p.monthlyLabel}. {f.afterBody} {p.vat}.
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <Link
                        to={path('scan')}
                        onClick={() => { track('founder_program_clicked', { placement: 'pricing' }); }}
                        className="btn btn-lit btn-lg w-full sm:w-auto"
                      >
                        {f.cta}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      <Link to={path('booking')} className="btn btn-outline-lit btn-lg w-full sm:w-auto">
                        {f.secondaryCta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ================================================== B · Websites */}
      <section
        id={anchors.websites}
        className="relative scroll-mt-24 overflow-hidden bg-brand-tint/60 py-20 lg:py-26"
        aria-labelledby="websites-heading"
      >
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="frame relative">
          <SectionHead eyebrow={w.eyebrow} lead={w.lead}>
            <span id="websites-heading">{w.heading}</span>
          </SectionHead>

          <WebsitePackages className="mt-14 lg:mt-18" source="pricing" />

          <Reveal className="mt-8" delay={80}>
            <p className="text-[0.9rem] text-muted">{w.scopeNote}</p>
            <Link to={path('websites')} className="link-line mt-5 text-[0.9rem]">
              {t.cta.seeWebsitesPage}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================================================== callback */}
      <section id={anchors.callback} className="scroll-mt-24 py-20 lg:py-26" aria-labelledby="pricing-callback-heading">
        <div className="frame">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <SectionHead eyebrow={p.callback.eyebrow}>
                <span id="pricing-callback-heading">{p.callback.heading}</span>
              </SectionHead>
              <Reveal delay={80}>
                <p className="mt-6 max-w-measure text-lead text-muted">{p.callback.lead}</p>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <div className="instrument p-6 sm:p-8 lg:p-10">
                <CallbackForm source="pricing" idPrefix="pricing-callback" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqBlock ids={['binding', 'guarantee', 'website-vs-engine']} eyebrow={p.faq.eyebrow} heading={p.faq.heading} />
    </>
  );
};

export default Pricing;
