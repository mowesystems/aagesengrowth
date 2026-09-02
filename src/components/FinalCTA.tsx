import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import company from '@/config/company';
import { useLocale } from '@/i18n/useLocale';

/**
 * The closing call to action, on ink.
 *
 * Set at hero scale, because this is the second-most-read thing on the page
 * after the hero itself and there is no reason for it to be quieter. The
 * secondary action is a real mailto when an address is configured and falls
 * back to nothing rather than to a dead link when it is not.
 */
const FinalCTA: React.FC = () => {
  const { t, path } = useLocale();

  return (
    <section className="on-dark relative overflow-hidden py-26 lg:py-38">
      <div className="ambient-lit pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-lines-lit pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="frame relative">
        <Reveal>
          <h2 className="h-statement max-w-[16ch] text-balance">
            {t.finalCta.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <p className="mt-9 max-w-prose text-lead text-muted-lit text-pretty">
            {t.finalCta.lead}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to={path('contact')} variant="lit" size="lg">
              {t.finalCta.primary}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            {company.email && (
              <Button href={`mailto:${company.email}`} variant="outline-lit" size="lg">
                {t.finalCta.secondary}
              </Button>
            )}
          </div>
          <p className="meta-lit mt-6">{t.finalCta.reassure}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
