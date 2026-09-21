import React from 'react';
import { Check, Minus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import LeadForm from '@/components/scan/LeadForm';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

/**
 * The Growth Review page — where a visitor books the full review directly,
 * without running the scan first. Same form, same Netlify submission.
 */
const Review: React.FC = () => {
  const { t, path } = useLocale();
  const r = t.pages.review;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: r.title,
    url: `${company.domain}${path('review')}`,
  };

  return (
    <>
      <SEOHead title={r.title} description={r.description} schema={schema} />
      <PageHero eyebrow={t.nav.review} title={r.heading} lead={r.lead} />

      <section className="pb-22 lg:pb-30">
        <div className="frame">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="instrument p-6 sm:p-8 lg:p-10">
                <LeadForm event="growth_review_booked" source="review-page" idPrefix="review" />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <h2 className="meta">{r.agendaHeading}</h2>
              <ol className="mt-5 rule">
                {r.agenda.map((item, i) => (
                  <li key={item} className="rule-row flex items-start gap-4 py-4">
                    <span className="index-mark pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.98rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ol>

              <h2 className="meta mt-12">{r.noneHeading}</h2>
              <ul className="mt-5 space-y-3">
                {r.none.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.92rem] text-muted">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center border border-ink/25" aria-hidden="true">
                      <Minus size={10} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-10 flex items-center gap-2 text-sm text-muted">
                <Check size={14} className="text-brand" aria-hidden="true" />
                {t.scan.lead.privacy}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
