import React from 'react';
import { Check, Minus } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/i18n/useLocale';

const Fit: React.FC = () => {
  const { t } = useLocale();
  const f = t.fit;

  return (
    <section className="py-22 lg:py-30" aria-labelledby="fit-heading">
      <div className="frame">
        <SectionHead eyebrow={f.eyebrow} index="09">
          <span id="fit-heading">{f.heading}</span>
        </SectionHead>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-7">
            <ul className="rule">
              {f.forItems.map((item) => (
                <li key={item} className="rule-row flex items-start gap-4 py-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-brand text-paper-2" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[1.02rem] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="meta mr-2">{f.industriesLabel}</span>
              {f.industries.map((ind) => (
                <span key={ind} className="chip chip-pending min-h-7 normal-case tracking-[0.04em] text-ink">
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="border p-6 sm:p-8" style={{ borderColor: 'var(--line)' }}>
              <h3 className="font-sans text-title font-semibold">{f.notHeading}</h3>
              <ul className="mt-5 space-y-4">
                {f.notItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-ink/30 text-ink" aria-hidden="true">
                      <Minus size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[0.95rem] leading-snug text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Fit;
