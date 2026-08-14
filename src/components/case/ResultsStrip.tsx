import React from 'react';
import { verifiedMetrics, type CaseItem } from '@/data/cases';

interface ResultsStripProps {
  item: CaseItem;
  /** Paper grounds need the ink palette. */
  light?: boolean;
  className?: string;
}

/**
 * Results.
 *
 * The rule this component exists to enforce: a number reaches the page only if
 * `verified` is true in the data, and it is shown with whatever source and
 * period were recorded alongside it. There is no placeholder path, no
 * "+XX%" state and no way to render a figure that has not been stood behind.
 *
 * When a case has no verified numbers — which is every case today — the strip
 * states what was actually delivered instead. That is a real claim, and it
 * lets the module read as a deliberate choice rather than as an empty slot.
 */
const ResultsStrip: React.FC<ResultsStripProps> = ({ item, light = false, className = '' }) => {
  const metrics = verifiedMetrics(item).slice(0, 3);

  if (metrics.length === 0) {
    return (
      <div className={className}>
        <p className={light ? 'meta-ink' : 'meta'}>Hvad arbejdet bestod af</p>
        <p
          className={`mt-4 max-w-2xl font-display text-title text-pretty ${
            light ? 'text-ink' : 'text-paper'
          }`}
        >
          {item.proofLine}
        </p>
        <p
          className={`mt-4 max-w-xl text-sm leading-relaxed ${
            light ? 'text-muted-ink' : 'text-muted'
          }`}
        >
          Der står bevidst ingen resultattal her. Tal, læseren ikke kan efterprøve, siger ingenting —
          så casen viser i stedet, hvad der blev bygget, og hvorfor det blev grebet an sådan.
        </p>
      </div>
    );
  }

  // Written out rather than interpolated: Tailwind only ships classes it can
  // find as complete strings in the source.
  const columns =
    metrics.length === 1 ? 'sm:grid-cols-1' : metrics.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

  return (
    <div className={className}>
      <p className={light ? 'meta-ink' : 'meta'}>Verificerede resultater</p>
      <dl
        className={`mt-6 grid grid-cols-1 gap-px ${columns} ${
          light ? 'bg-ink/15' : 'bg-paper/10'
        }`}
      >
        {metrics.map((metric) => (
          <div key={metric.label} className={`${light ? 'bg-paper' : 'bg-ink'} py-6 sm:px-6 sm:first:pl-0`}>
            <dt className={`text-sm leading-snug ${light ? 'text-muted-ink' : 'text-muted'}`}>
              {metric.label}
            </dt>
            <dd
              className={`mt-3 font-display text-statement leading-none ${
                light ? 'text-ink' : 'iris-text'
              }`}
            >
              {metric.value}
            </dd>
            {(metric.source || metric.period) && (
              <p
                className={`mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                  light ? 'text-muted-ink/80' : 'text-muted'
                }`}
              >
                {[metric.source, metric.period].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ResultsStrip;
