import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/i18n/useLocale';
import { track } from '@/lib/analytics';

interface TwoPathsProps {
  /** Where the block sits, for analytics. */
  source: string;
  /**
   * Where the scan path leads. On the homepage it jumps to the hero scanner;
   * elsewhere it goes to the Growth Scan page.
   */
  scanHref?: string;
}

/**
 * "To veje ind. I vælger selv." The close of the homepage and of the longer
 * pages: run the scan yourself, or talk to a person.
 */
const TwoPaths: React.FC<TwoPathsProps> = ({ source, scanHref }) => {
  const { t, path } = useLocale();
  const p = t.home.paths;
  const scanTarget = scanHref ?? path('scan');

  const card = (
    key: 'scan' | 'talk',
    to: string,
    primary: boolean,
  ) => {
    const c = p[key];
    const inner = (
      <>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-lit">{c.label}</p>
        <h3 className="mt-5 font-sans text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-paper sm:text-[2rem]">{c.title}</h3>
        <p className="mt-3 max-w-measure text-[0.95rem] leading-relaxed text-muted-lit">{c.body}</p>
        <span className={`btn ${primary ? 'btn-primary' : 'btn-outline-lit'} btn-lg mt-8 w-full sm:w-auto`}>
          {c.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </>
    );
    const className = 'group flex h-full flex-col items-start border border-paper/15 p-7 transition-colors hover:border-brand-lit sm:p-10';
    const onClick = () => track('primary_cta_clicked', { source, cta: key === 'scan' ? 'scan' : 'book_afklaring' });
    return to.includes('#') && to.startsWith('#') ? (
      <a href={to} onClick={onClick} className={className}>{inner}</a>
    ) : (
      <Link to={to} onClick={onClick} className={className}>{inner}</Link>
    );
  };

  return (
    <section className="on-dark relative overflow-hidden py-22 lg:py-30" aria-labelledby={`${source}-paths-heading`}>
      <div className="ambient-lit pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-lines-lit pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="frame relative">
        <Reveal>
          <p className="meta-lit">{p.eyebrow}</p>
          <h2 id={`${source}-paths-heading`} className="h-statement mt-6 text-balance">
            {p.heading}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2">
          <Reveal delay={80}>{card('scan', scanTarget, true)}</Reveal>
          <Reveal delay={160}>{card('talk', path('booking'), false)}</Reveal>
        </div>
        <Reveal className="mt-8" delay={200}>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-lit">{p.reassure}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default TwoPaths;
