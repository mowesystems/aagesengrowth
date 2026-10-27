import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import { featuredCase } from '@/data/cases';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/**
 * The homepage's door to the websites page.
 *
 * Growth Engine leads the homepage, but a visitor who only needs a new website
 * should not have to read the whole story to find out that we build them.
 * One heading, one price, the latest website as proof, two links.
 */
const HomeWebsites: React.FC = () => {
  const { t, path } = useLocale();
  const w = t.websitesPage.teaser;
  const showcase = featuredCase;
  const image = showcase.media?.desktop;
  const alt = t.work.cases[showcase.id]?.media.desktop?.alt ?? '';

  return (
    <section className="relative bg-paper-3 py-20 lg:py-26" aria-labelledby="home-websites-heading">
      <div className="frame">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={w.eyebrow}>
              <span id="home-websites-heading">{w.heading}</span>
            </SectionHead>
            <Reveal delay={80}>
              <p className="mt-6 max-w-measure text-lead text-muted text-pretty">{w.body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  to={path('websites')}
                  onClick={() => track('primary_cta_clicked', { source: 'home-websites', cta: 'websites' })}
                  className="btn btn-primary"
                >
                  {w.cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link to={path('work', showcase.slug)} className="link-line">
                  {w.caseCta}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          {image && (
            <Reveal className="lg:col-span-7" delay={120}>
              <Link to={path('work', showcase.slug)} className="group block" tabIndex={-1} aria-hidden="true">
                <CaseMediaFrame image={image} alt={alt} sizes="(min-width: 1024px) 56vw, 92vw" ratio={1.6} />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeWebsites;
