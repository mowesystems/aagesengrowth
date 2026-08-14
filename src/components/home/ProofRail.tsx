import React from 'react';

export interface ProofPoint {
  index: string;
  title: string;
  body: string;
}

interface ProofRailProps {
  points: ProofPoint[];
  className?: string;
}

/**
 * Evidence, set as a rail rather than as three feature cards.
 *
 * Every line here is something a visitor can verify on this site within a
 * minute: the services are all listed, the prices are printed, and there is no
 * account team to be handed to. Nothing aspirational goes in this component.
 */
const ProofRail: React.FC<ProofRailProps> = ({ points, className = '' }) => (
  <ul className={`grid grid-cols-1 sm:grid-cols-3 ${className}`}>
    {points.map((point) => (
      <li
        key={point.index}
        className="border-t border-paper/12 py-5 first:border-t sm:border-l sm:border-t-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
      >
        <div className="flex items-baseline gap-3">
          <span className="index-mark text-cyan/80">{point.index}</span>
          <p className="font-sans text-[0.95rem] font-medium leading-snug text-paper">
            {point.title}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
      </li>
    ))}
  </ul>
);

export default ProofRail;
