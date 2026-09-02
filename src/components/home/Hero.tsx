import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import MaskedLines from '@/components/ui/MaskedLines';
import ResponsiveImage from '@/components/media/ResponsiveImage';
import { useLocale } from '@/i18n/useLocale';
import { featuredCase } from '@/data/cases';

/**
 * The hero.
 *
 * Two halves that do different jobs. On the left, the positioning, set as
 * large as the viewport allows and broken into three masked lines that
 * assemble on load. On the right, the actual product: a live desktop
 * screenshot in a browser frame with the mobile screenshot overlapping its
 * lower-left corner.
 *
 * The mockups are real client work rather than decoration — this is the one
 * section where the claim ("we build websites") and the evidence sit in the
 * same viewport. The desktop image is the LCP candidate and is the only
 * eagerly-fetched image on the page.
 */
const Hero: React.FC = () => {
  const { t, path } = useLocale();
  const desktop = featuredCase.media?.desktop;
  const mobile = featuredCase.media?.mobile;
  const copy = t.work.cases[featuredCase.id];

  return (
    <section className="relative overflow-hidden pb-16 pt-30 lg:pb-26 lg:pt-46">
      <div
        className="ambient pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />

      <div className="frame relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* ------------------------------------------------------ statement */}
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="meta-brand animate-rise">{t.hero.eyebrow}</p>

            <h1 className="h-hero mt-7 lg:mt-9">
              <MaskedLines lines={t.hero.lines} />
            </h1>

            <p
              className="animate-rise mt-8 max-w-measure text-lead text-muted text-pretty lg:mt-10"
              style={{ animationDelay: '480ms' }}
            >
              {t.hero.lead}
            </p>

            <div
              className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '600ms' }}
            >
              <Button to={path('contact')} size="lg">
                {t.hero.primary}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to={path('work')} size="lg" variant="outline">
                {t.hero.secondary}
              </Button>
            </div>
          </div>

          {/* -------------------------------------------------------- mockups */}
          {desktop && (
            <div className="lg:col-span-5 xl:col-span-6">
              <div
                className="animate-rise relative lg:pl-8"
                style={{ animationDelay: '340ms' }}
              >
                <figure className="group">
                  {/*
                    The phone is positioned against this box rather than
                    against the <figure>, which also contains the caption —
                    anchoring it to the figure put its "bottom" below the
                    caption line and dropped it straight through the text.
                  */}
                  <div className="relative">
                    {/* Browser frame. The chrome is decorative — the screenshot's
                      alt text already says which site this is. */}
                    <div className="overflow-hidden border border-ink/12 bg-paper-2 shadow-[0_28px_70px_-32px_rgba(11,18,32,0.42)]">
                      <div
                        className="flex items-center gap-2 border-b border-ink/10 bg-paper px-3.5 py-2.5"
                        aria-hidden="true"
                      >
                        <span className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-ink/15" />
                          <span className="h-2 w-2 rounded-full bg-ink/15" />
                          <span className="h-2 w-2 rounded-full bg-ink/15" />
                        </span>
                        <span className="ml-2 hidden flex-1 truncate border border-ink/10 bg-paper-2 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.08em] text-muted sm:block">
                          {desktop.chrome}
                        </span>
                      </div>
                      <div
                        className="overflow-hidden"
                        style={{ aspectRatio: String(desktop.ratio) }}
                      >
                        <ResponsiveImage
                          image={desktop}
                          alt={
                            copy?.media.desktop?.alt ?? t.hero.stack.desktopAlt
                          }
                          sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 40vw, 92vw"
                          priority
                          className="media-zoom h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>

                    {/*
                      Phone, at the frame's lower-left corner. Hidden below sm,
                      where it would cover the screenshot it is meant to sit
                      beside. It only hangs outside the frame from lg up, where
                      the two-column layout leaves a gutter for it — on a tablet
                      the hero is one column, so a negative offset there put it
                      off the left edge of the page. Kept small on purpose: it
                      is an aside to the desktop shot, not a second subject.
                    */}
                    {mobile && (
                      <div className="absolute -bottom-6 left-4 hidden w-[18%] max-w-[104px] overflow-hidden border border-ink/12 bg-paper-2 p-1 shadow-[0_18px_44px_-20px_rgba(11,18,32,0.45)] sm:block lg:-left-8">
                        <div
                          className="overflow-hidden"
                          style={{ aspectRatio: String(mobile.ratio) }}
                        >
                          <ResponsiveImage
                            image={mobile}
                            alt={
                              copy?.media.mobile?.alt ?? t.hero.stack.mobileAlt
                            }
                            sizes="104px"
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <figcaption className="meta ml-[6.5rem] mt-6 flex items-center gap-3 sm:ml-[7rem]">
                    <span className="h-px w-8 bg-brand" aria-hidden="true" />
                    {t.hero.stack.label} — {featuredCase.client}
                  </figcaption>
                </figure>
              </div>
            </div>
          )}
        </div>

        <p
          className="meta mt-16 hidden items-center gap-2 lg:flex"
          aria-hidden="true"
        >
          <ArrowDown size={13} />
          {t.hero.scroll}
        </p>
      </div>
    </section>
  );
};

export default Hero;
