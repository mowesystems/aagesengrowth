import React from 'react';
import { ArrowUpRight, Check, Minus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import LeadForm from '@/components/scan/LeadForm';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/**
 * Book a discovery call — the direct, no-scan path to a conversation.
 *
 * When `company.bookingUrl` is set (VITE_BOOKING_URL), it embeds that real
 * scheduling page so a visitor picks an actual open slot — never a fabricated
 * one. Until a calendar is connected, it shows a short request form instead
 * and says so plainly, so the page is honest either way and the rest of the
 * site never depends on the calendar being wired up yet.
 */
const Booking: React.FC = () => {
  const { t, path } = useLocale();
  const r = t.pages.booking;
  const hasCalendar = Boolean(company.bookingUrl);

  React.useEffect(() => {
    track('primary_cta_clicked', { source: 'booking-page', cta: 'view', hasCalendar });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: r.title,
    url: `${company.domain}${path('booking')}`,
  };

  return (
    <>
      <SEOHead title={r.title} description={r.description} schema={schema} />
      <PageHero eyebrow={t.nav.booking} title={r.heading} lead={r.lead} />

      <section className="pb-22 lg:pb-30">
        <div className="frame">
          <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              {hasCalendar ? (
                <div className="instrument overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b p-5 sm:p-6" style={{ borderColor: 'var(--line)' }}>
                    <p className="text-[0.95rem] font-medium text-ink">{r.embedNote}</p>
                    <a
                      href={company.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('primary_cta_clicked', { source: 'booking-page', cta: 'open_calendar_new_tab' })}
                      className="link-line shrink-0 text-[0.82rem]"
                    >
                      {r.embedFallbackLink}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                  <iframe
                    src={company.bookingUrl}
                    title={r.title}
                    className="h-[820px] w-full bg-paper-2"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="instrument p-6 sm:p-8 lg:p-10">
                  <p className="meta-brand">{r.fallbackHeading}</p>
                  <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted">{r.fallbackBody}</p>
                  <div className="mt-8">
                    <LeadForm event="growth_review_booked" source="booking-page" idPrefix="booking" />
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <h2 className="meta">{r.agendaHeading}</h2>
              <ol className="mt-5 rule">
                {r.agenda.map((item: string, i: number) => (
                  <li key={item} className="rule-row flex items-start gap-4 py-4">
                    <span className="index-mark pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.98rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ol>

              <h2 className="meta mt-12">{r.noneHeading}</h2>
              <ul className="mt-5 space-y-3">
                {r.none.map((item: string) => (
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

export default Booking;
