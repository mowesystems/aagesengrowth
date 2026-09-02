import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import CaseMediaFrame from '@/components/media/CaseMediaFrame';
import { featuredCase } from '@/data/cases';
import { useLocale } from '@/i18n/useLocale';

/**
 * Plus Eins, as a single wide composition.
 *
 * The brief for this section is "demonstrate capability, do not write a
 * report": the copy is four short lines and everything else is media. The
 * layout is deliberately asymmetric — a tall photograph, the desktop site, the
 * phone and a second photograph on an uneven grid — so it reads as a spread
 * rather than as a row of equal thumbnails.
 */
const FeaturedCase: React.FC = () => {
  const { t, path } = useLocale();
  const copy = t.work.cases[featuredCase.id];
  const media = featuredCase.media;
  const alt = (key: string) => copy?.media[key]?.alt ?? '';

  return (
    <section id="case" className="scroll-mt-24 py-22 lg:py-30">
      <div className="frame">
        <Reveal>
          <div className="rule flex items-baseline gap-4 pt-5">
            <span className="index-mark shrink-0">03</span>
            <span className="meta-brand">{t.featured.eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="meta">{t.featured.kicker}</p>
            <h2 className="h-display mt-5 text-balance">{featuredCase.client}</h2>
            <p className="h-serif mt-5 text-title text-muted">{t.featured.heading}</p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={90}>
            <p className="max-w-measure text-lead text-muted text-pretty">{t.featured.body}</p>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------- spread */}
        {media && (
          <div className="mt-14 grid gap-4 sm:gap-5 lg:mt-18 lg:grid-cols-12">
            {media.photos?.[0] && (
              <Reveal className="lg:col-span-4">
                <CaseMediaFrame
                  image={media.photos[0]}
                  alt={alt('photoBoutique')}
                  caption={copy?.media.photoBoutique?.caption}
                  showCaption
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  ratio={0.86}
                />
              </Reveal>
            )}

            {media.desktop && (
              <Reveal className="lg:col-span-8" delay={80}>
                <div className="group">
                  <CaseMediaFrame
                    image={media.desktop}
                    alt={alt('desktop')}
                    sizes="(min-width: 1024px) 62vw, 92vw"
                    ratio={1.52}
                  />
                </div>
              </Reveal>
            )}

            {media.screens?.[0] && (
              <Reveal className="lg:col-span-5" delay={40}>
                <div className="group">
                  <CaseMediaFrame
                    image={media.screens[0]}
                    alt={alt('screenBoutique')}
                    caption={copy?.media.screenBoutique?.caption}
                    showCaption
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    ratio={1.5}
                  />
                </div>
              </Reveal>
            )}

            {/*
              The phone is capped rather than filling its three columns: at a
              full column width its 0.46 aspect makes it twice the height of
              the frames beside it and punches a hole in the row.
            */}
            {media.mobile && (
              <Reveal className="lg:col-span-3" delay={120}>
                <CaseMediaFrame
                  image={media.mobile}
                  alt={alt('mobile')}
                  sizes="170px"
                  className="mx-auto max-w-[170px]"
                />
              </Reveal>
            )}

            {media.photos?.[2] && (
              <Reveal className="lg:col-span-4" delay={160}>
                <CaseMediaFrame
                  image={media.photos[2]}
                  alt={alt('photoExterior')}
                  caption={copy?.media.photoExterior?.caption}
                  showCaption
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  fill={false}
                  ratio={1.2}
                />
              </Reveal>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- facts */}
        <div className="mt-16 grid gap-x-10 gap-y-8 rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.featured.facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 70}>
              <p className="font-sans text-[1.0625rem] font-semibold">{fact.label}</p>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted text-pretty">
                {fact.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button to={path('work', featuredCase.slug)} size="lg">
              {t.featured.ctaCase}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <a
              href={featuredCase.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line"
            >
              {t.cta.visitSite}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedCase;
