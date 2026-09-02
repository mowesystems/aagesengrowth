import React from 'react';
import PageHero from '@/components/PageHero';
import { useLocale } from '@/i18n/useLocale';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Shown above the content — used for the "not yet legally reviewed" notice. */
  notice?: React.ReactNode;
  sections: LegalSection[];
  footer?: React.ReactNode;
}

/**
 * Shared shell for the privacy and cookie pages.
 *
 * Deliberately the calmest layout on the site: no display type at scale,
 * generous measure, one column of prose. These pages exist to be read
 * carefully, and anything that made them feel designed would work against
 * that.
 *
 * The body of both is published in Danish only. Translating a privacy policy
 * without a lawyer reading the result is how a site ends up making a promise
 * in one language it does not make in another, so the non-Danish locales get
 * a notice saying which version governs rather than a machine translation.
 */
const LegalPage: React.FC<LegalPageProps> = ({ eyebrow, title, lead, notice, sections, footer }) => {
  const { t, locale } = useLocale();

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="py-18 lg:py-24">
        <div className="frame">
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="space-y-4 lg:sticky lg:top-28">
                {locale !== 'da' && (
                  <div className="border-l-2 border-brand bg-brand-tint p-5">
                    <p className="text-sm leading-relaxed text-ink">{t.pages.legalNotice}</p>
                  </div>
                )}
                {notice && (
                  <div className="border border-ink/15 p-5">
                    <p className="meta">Bemærk</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{notice}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="rule">
                {sections.map((section, index) => (
                  <section key={section.heading} className="rule-row">
                    <div className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-12">
                      <div className="flex items-baseline gap-4 sm:col-span-4">
                        <span className="index-mark text-brand">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="font-sans text-[1.05rem] font-semibold">
                          {section.heading}
                        </h2>
                      </div>
                      <div className="max-w-prose space-y-3 text-[0.95rem] leading-relaxed text-muted sm:col-span-8">
                        {section.body}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {footer && <div className="mt-10">{footer}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
