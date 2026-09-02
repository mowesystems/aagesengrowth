import React from 'react';
import { useLocale } from '@/i18n/useLocale';

/**
 * The line of disciplines that runs under the hero.
 *
 * Two identical copies translated by exactly -50% give a seamless loop with
 * one transform and no JavaScript. The duplicate is `aria-hidden`, so the
 * disciplines are announced once rather than twice, and the whole strip stops
 * moving under `prefers-reduced-motion` — at which point it simply reads as a
 * long line of text, which is all it ever needed to be.
 */
const DisciplineTicker: React.FC = () => {
  const { t } = useLocale();

  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {t.ticker.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="meta text-ink/70">{item}</span>
          <span className="mx-7 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="rule-row rule overflow-hidden py-5">
      <div className="ticker flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
};

export default DisciplineTicker;
