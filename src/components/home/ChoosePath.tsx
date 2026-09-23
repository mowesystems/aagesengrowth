import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { homeAnchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';
import { HERO_SCAN_ID } from '@/components/home/Hero';

/**
 * Two ways in, side by side.
 *
 * The Growth Scan is useful, not mandatory — a visitor who already wants to
 * talk should never be routed through it first. This section states that
 * choice explicitly, once the offer and the price are both known.
 */
const ChoosePath: React.FC = () => {
  const { t, path } = useLocale();
  const c = t.choose;

  return (
    <section id={homeAnchors.choose} className="scroll-mt-20 py-22 lg:py-30" aria-labelledby="choose-heading">
      <div className="frame">
        <SectionHead eyebrow={c.eyebrow} index="08" lead={c.lead}>
          <span id="choose-heading">{c.heading}</span>
        </SectionHead>

        <div className="mt-14 grid gap-px border lg:mt-18 lg:grid-cols-2" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--line)' }}>
          <Reveal className="bg-paper">
            <div className="flex h-full flex-col p-7 sm:p-10">
              <span className="index-mark">01</span>
              <h3 className="mt-5 font-sans text-title font-semibold">{c.scan.title}</h3>
              <p className="mt-3 max-w-measure flex-1 text-[0.95rem] leading-relaxed text-muted">{c.scan.body}</p>
              <a
                href={`#${HERO_SCAN_ID}`}
                onClick={() => track('primary_cta_clicked', { source: 'choose', cta: 'scan' })}
                className="btn btn-primary btn-lg mt-8 w-full sm:w-auto"
              >
                {c.scan.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="bg-paper">
            <div className="flex h-full flex-col p-7 sm:p-10">
              <span className="index-mark">02</span>
              <h3 className="mt-5 font-sans text-title font-semibold">{c.talk.title}</h3>
              <p className="mt-3 max-w-measure flex-1 text-[0.95rem] leading-relaxed text-muted">{c.talk.body}</p>
              <Link
                to={path('booking')}
                onClick={() => track('primary_cta_clicked', { source: 'choose', cta: 'book_afklaring' })}
                className="btn btn-outline btn-lg mt-8 w-full sm:w-auto"
              >
                {c.talk.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ChoosePath;
