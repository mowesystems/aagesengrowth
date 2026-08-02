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
 * Shared shell for the privacy and cookie pages, so legal content inherits the
 * same typography and rhythm as the rest of the site instead of each page
 * hand-rolling its own hero and spacing.
 */
const LegalPage: React.FC<LegalPageProps> = ({
  eyebrow,
  title,
  lead,
  notice,
  sections,
  footer,
}) => (
  <>
    <PageHero eyebrow={eyebrow} title={title} lead={lead} />

    <section className="bg-ink py-14 lg:py-20">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {notice && (
              <div className="marked border border-gold/35 bg-ink-2 p-5 text-gold">
                <p className="meta">Bemærk</p>
                <p className="mt-3 text-sm leading-relaxed text-dim">{notice}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="ledger">
              {sections.map((section, index) => (
                <section key={section.heading} className="ledger-row">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-7 sm:grid-cols-12">
                    <div className="flex items-baseline gap-4 sm:col-span-4">
                      <span className="meta-muted opacity-70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-serif text-xl leading-snug text-cream">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="max-w-prose space-y-3 text-sm leading-relaxed text-dim sm:col-span-8">
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
