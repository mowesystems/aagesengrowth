import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MaskedLines from '@/components/ui/MaskedLines';
import GrowthScan from '@/components/scan/GrowthScan';
import SignalField from '@/components/growth/SignalField';
import { useScan } from '@/components/scan/ScanContext';
import founderProgram from '@/config/founderProgram';
import { anchors } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

export const HERO_SCAN_ID = anchors.scan;

/**
 * The hero.
 *
 * The statement, the scanner and the signal — in that order, because that
 * is the order a visitor needs them: what this is, what to do, what it
 * looks like running. The scanner is the primary control of the site and
 * sits in the first viewport; the signal field runs full width beneath it
 * and hands the reader the visual language every section after it uses.
 */
const Hero: React.FC = () => {
  const { t, path } = useLocale();
  const scan = useScan();
  const scanActive = scan.status !== 'idle' && scan.anchorId === HERO_SCAN_ID;

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-40">
      <div className="ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="frame relative">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-9">
            <div className="animate-rise flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="meta-brand">{t.hero.eyebrow}</p>
              {founderProgram.enabled && (
                <Link
                  to={`${path('pricing')}#${anchors.founder}`}
                  onClick={() => track('founder_program_clicked', { placement: 'hero' })}
                  className="chip chip-pink min-h-7 transition-colors hover:bg-pink hover:text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {t.founder.eyebrow} · {founderProgram.seats} {t.founder.seatsLabel}
                </Link>
              )}
            </div>

            <h1 className="h-hero mt-7 lg:mt-9">
              <MaskedLines lines={t.hero.lines} accent={t.hero.lines[1]} />
            </h1>
          </div>

          <div className="lg:col-span-3 lg:flex lg:flex-col lg:justify-end">
            <p
              className="animate-rise max-w-measure text-lead text-muted text-pretty lg:pb-2"
              style={{ animationDelay: '420ms' }}
            >
              {t.hero.lead}
            </p>
          </div>
        </div>

        <div
          className={`animate-rise mt-10 transition-[max-width] duration-500 lg:mt-14 ${
            scanActive ? '' : 'lg:max-w-[56rem]'
          }`}
          style={{ animationDelay: '560ms' }}
        >
          <GrowthScan source="hero" id={HERO_SCAN_ID} size="lg" />
        </div>

        {!scanActive && (
          <div className="animate-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: '700ms' }}>
            <Link
              to={path('booking')}
              onClick={() => track('primary_cta_clicked', { source: 'hero', cta: 'book_afklaring' })}
              className="btn btn-outline"
            >
              {t.cta.bookAfklaring}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link to={path('how')} className="link-line text-[0.82rem] text-muted">
              {t.cta.how}
            </Link>
          </div>
        )}
      </div>

      <div className="frame relative mt-12 lg:mt-16">
        <SignalField />
      </div>
    </section>
  );
};

export default Hero;
