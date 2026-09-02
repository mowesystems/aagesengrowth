import React from 'react';
import type { CaseImage } from '@/data/cases';

interface ResponsiveImageProps {
  image: CaseImage;
  /**
   * Required. Alt text lives in the dictionary rather than beside the asset,
   * because it has to be written in the language the page is being read in.
   * Pass an empty string only for an image a caption already describes.
   */
  alt: string;
  /** The `sizes` attribute. Get this right or the srcset is decoration. */
  sizes: string;
  /**
   * Set on the one image that is the page's LCP candidate, and nowhere else.
   * Everything else stays lazy so a case page does not fetch nine screenshots
   * before it has painted.
   */
  priority?: boolean;
  className?: string;
}

/**
 * One responsive image.
 *
 * Every asset in /media exists as AVIF and WebP at each declared width. The
 * intrinsic `width`/`height` come from the declared ratio so the box is
 * reserved before the bytes arrive — no layout shift, on any of these.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  image,
  alt,
  sizes,
  priority = false,
  className = '',
}) => {
  const { base, widths, ratio } = image;
  const largest = widths[widths.length - 1];
  const srcSet = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${base}-${largest}.webp`}
        alt={alt}
        width={largest}
        height={Math.round(largest / ratio)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // React 18 passes unknown camelCase props straight through and warns;
        // the attribute itself is lowercase in HTML.
        {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
        className={className}
      />
    </picture>
  );
};

export default ResponsiveImage;
