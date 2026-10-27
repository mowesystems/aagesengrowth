import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

/**
 * What Growth Engine is, in one paragraph and a row of examples. The full
 * explanation is one click away on its own page.
 */
const HomeEngine: React.FC = () => {
  const { t, path } = useLocale();
  const e = t.home.engine;

  return (
    <section className="relative py-20 lg:py-26" aria-labelledby="engine-heading">
      <div className="frame">
        <SectionHead eyebrow={e.eyebrow} index="02" lead={e.lead}>
          <span id="engine-heading">{e.heading}</span>
        </SectionHead>

        <Reveal className="mt-12 lg:mt-16" delay={80}>
          <div className="instrument p-6 sm:p-8 lg:p-10">
            <p className="meta">{e.examplesLabel}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {e.examples.map((item) => (
                <li key={item} className="chip chip-pending min-h-8 normal-case tracking-[0.04em] text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--line)' }}>
              <p className="text-[0.9rem] leading-relaxed text-muted">{e.note}</p>
              <Link
                to={path('how')}
                onClick={() => track('primary_cta_clicked', { source: 'home-engine', cta: 'how' })}
                className="btn btn-outline shrink-0"
              >
                {t.cta.how}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HomeEngine;
