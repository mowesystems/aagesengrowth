import React from 'react';
import PageHero from '@/components/PageHero';

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
 * Deliberately the calmest layout on the site: no display type at scale, no
 * iridescence, generous measure. These pages exist to be read carefully, and
 * anything that made them feel designed would work against that.
 */
const LegalPage: React.FC<LegalPageProps> = ({ eyebrow, title, lead, notice, sections, footer }) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} lead={lead} />

    <section className="bg-ink py-18 lg:py-26">
      <div className="frame">
        <div className="grid grid-cols-4 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-4 lg:col-span-3">
            {notice && (
              <div className="border border-cyan/35 bg-ink-2 p-5">
                <p className="meta-lit">Bemærk</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{notice}</p>
              </div>
            )}
          </div>

          <div className="col-span-4 lg:col-span-8 lg:col-start-5">
            <div className="rule">
              {sections.map((section, index) => (
                <section key={section.heading} className="rule-row">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-8 sm:grid-cols-12">
                    <div className="flex items-baseline gap-4 sm:col-span-4">
                      <span className="index-mark text-cyan/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-title uppercase text-paper">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="max-w-prose space-y-3 text-sm leading-relaxed text-muted sm:col-span-8">
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

export default LegalPage;
