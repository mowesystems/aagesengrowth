import React from 'react';

interface BrandLogoProps {
  /** Render for paper backgrounds. */
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * The Aagesen Growth wordmark, set in live type.
 *
 * Not an image: the alternative in this repository is a 1536x1024 PNG of the
 * logo photographed on a grey wall, which costs 2 MB and renders as a smudge in
 * a 140px header slot. As type it stays crisp at any size, inherits
 * currentColor, and costs nothing beyond fonts the page already loads.
 *
 * The lockup is horizontal — display serif, hairline, mono — so it reads as a
 * mark rather than as a stacked logotype trying to be one.
 */
const sizes = {
  sm: { word: 'text-[1.05rem]', sub: 'text-[0.5rem]', rule: 'h-3.5', gap: 'gap-2' },
  md: { word: 'text-[1.3rem]', sub: 'text-[0.56rem]', rule: 'h-4', gap: 'gap-2.5' },
  lg: { word: 'text-[1.75rem]', sub: 'text-[0.66rem]', rule: 'h-5', gap: 'gap-3' },
};

const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, size = 'md', className = '' }) => {
  const s = sizes[size];

  return (
    <span
      className={`inline-flex items-center ${s.gap} ${light ? 'text-ink' : 'text-paper'} ${className}`}
      aria-hidden="true"
    >
      {/*
        The trailing space is load-bearing. Without it the lockup's text content
        reads "AagesenGrowth", which no longer matches the link's accessible
        name and trips axe's label-content-name-mismatch rule. Trailing
        whitespace at the end of a line box is dropped, so it costs no width.
      */}
      <span className={`font-display leading-none tracking-[-0.01em] ${s.word}`}>{'Aagesen '}</span>
      <span className={`w-px ${s.rule} bg-current opacity-30`} />
      <span
        className={`font-mono font-medium uppercase leading-none ${s.sub}`}
        style={{ letterSpacing: '0.26em' }}
      >
        Growth
      </span>
    </span>
  );
};

export default BrandLogo;
