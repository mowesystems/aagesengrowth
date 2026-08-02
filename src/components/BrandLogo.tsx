import React from 'react';

interface BrandLogoProps {
  /** Render for dark backgrounds */
  light?: boolean;
  /** Visual size of the wordmark */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * The Aagesen Growth wordmark, set in live type rather than an image.
 *
 * The previous implementation pointed at a 2 MB, 1536x1024 PNG that was a 3D
 * mockup of the logo photographed on a grey wall. Scaled into a ~136px header
 * slot it rendered as an illegible smudge, shipped 2 MB on every page load, and
 * `brightness-0 invert` turned the entire grey plate white on dark grounds.
 *
 * Setting it as type keeps it crisp at any size, inherits currentColor, costs
 * nothing to load, and stays selectable and accessible.
 */
const sizes = {
  sm: { word: 'text-[0.95rem]', sub: 'text-[0.44rem]', gap: 'gap-[0.3rem]', mono: 'text-[0.5rem]' },
  md: { word: 'text-[1.2rem]', sub: 'text-[0.53rem]', gap: 'gap-[0.36rem]', mono: 'text-[0.58rem]' },
  lg: { word: 'text-[1.6rem]', sub: 'text-[0.66rem]', gap: 'gap-[0.45rem]', mono: 'text-[0.72rem]' },
};

const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, size = 'md', className = '' }) => {
  const s = sizes[size];

  return (
    <span
      className={`inline-flex flex-col items-center ${s.gap} ${light ? 'text-ink' : 'text-cream'} ${className}`}
      aria-hidden="true"
    >
      <span className={`font-serif font-semibold uppercase leading-none tracking-[0.2em] ${s.word}`}>
        Aagesen
      </span>

      <span className="flex w-full items-center gap-[0.4em]">
        <span className="h-px flex-1 bg-current opacity-35" />
        <span className={`font-serif font-semibold uppercase leading-none ${s.mono} opacity-80`}>AG</span>
        <span className="h-px flex-1 bg-current opacity-35" />
      </span>

      <span
        className={`font-serif font-medium uppercase leading-none ${s.sub}`}
        style={{ letterSpacing: '0.42em', textIndent: '0.42em' }}
      >
        Growth
      </span>
    </span>
  );
};

export default BrandLogo;
