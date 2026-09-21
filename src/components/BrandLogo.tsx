import React from 'react';

interface BrandLogoProps {
  /** Use the reversed-out mark, for ink grounds. */
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** The full lockup with the AG monogram (for the footer); default is the header wordmark. */
  variant?: 'wordmark' | 'lockup';
  className?: string;
}

/**
 * The Aagesen Growth wordmark.
 *
 * The real mark, not a reconstruction: AAGESEN set in a display serif over
 * GROWTH, flanked by the two blue rules. It ships as an 800px-wide asset
 * (WebP with a PNG fallback) trimmed to the artwork's own bounding box, in two
 * colourways cut from the same original — ink glyphs with the logo's blue for
 * paper grounds, paper glyphs with a lifted blue for ink grounds. Nothing
 * about the drawing is altered.
 *
 * The mark is decorative here: every place it is used sits inside a link or a
 * heading that already carries the accessible name, so a second copy of
 * "Aagesen Growth" would just be read out twice.
 */
const RATIOS = { wordmark: 800 / 152, lockup: 676 / 238 };

const heights = { wordmark: { sm: 24, md: 30, lg: 38 }, lockup: { sm: 56, md: 72, lg: 92 } };

const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, size = 'md', variant = 'wordmark', className = '' }) => {
  const height = heights[variant][size];
  const RATIO = RATIOS[variant];
  const base = variant === 'lockup' ? '/brand/aagesen-growth-lockup' : '/brand/aagesen-growth';
  const src = light ? `${base}-light` : base;

  return (
    <picture>
      <source type="image/webp" srcSet={`${src}.webp`} />
      <img
        src={`${src}.png`}
        alt=""
        aria-hidden="true"
        width={Math.round(height * RATIO)}
        height={height}
        // The header mark is in the first viewport on every route, so it is
        // never lazy — a late logo is the most visible kind of layout jitter.
        loading="eager"
        decoding="sync"
        style={{ height, width: 'auto' }}
        className={`block ${className}`}
      />
    </picture>
  );
};

export default BrandLogo;
