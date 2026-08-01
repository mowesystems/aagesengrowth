import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CaseItem } from '@/data/cases';

interface CaseCardProps {
  item: CaseItem;
  compact?: boolean;
}

const CaseCard: React.FC<CaseCardProps> = ({ item, compact = false }) => {
  const dark = item.theme === 'dark';

  return (
    <article className={`case-card ${dark ? 'case-card-dark' : 'case-card-light'}`}>
      <div className="case-card-logo" aria-hidden="true">
        <img src={item.logoPath} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="case-card-content">
        <p className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] ${dark ? 'text-accent' : 'text-muted'}`}>
          {item.category}
        </p>
        <h3 className={`mt-4 font-serif text-3xl leading-tight ${dark ? 'text-off-white' : 'text-navy'}`}>
          {item.client}
        </h3>
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-off-white/75' : 'text-dark'}`}>
          {item.introduction}
        </p>
        {!compact && (
          <>
            <p className={`mt-5 text-sm leading-relaxed ${dark ? 'text-off-white/60' : 'text-muted'}`}>
              {item.description}
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility} className={`flex items-start gap-2 text-sm ${dark ? 'text-off-white/70' : 'text-dark/80'}`}>
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {responsibility}
                </li>
              ))}
            </ul>
            {item.projectNote && <p className="mt-5 text-xs leading-relaxed text-off-white/50">{item.projectNote}</p>}
          </>
        )}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${dark ? 'text-off-white hover:text-accent' : 'text-navy hover:text-accent'}`}
          aria-label={`${item.cta} (åbner i ny fane)`}
        >
          {item.cta} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default CaseCard;
