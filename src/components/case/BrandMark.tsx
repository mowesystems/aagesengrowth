import React from 'react';
import type { CaseItem } from '@/data/cases';

interface BrandMarkProps {
  item: CaseItem;
  className?: string;
}

/**
 * A client mark, on a consistent plate.
 *
 * The two supplied logos are very different assets — black line art on one
 * canvas, a blue gradient mark floating in the upper part of another. Both sit
 * on the same light plate in their own colours, optically sized by per-asset
 * values in the case data, rather than being inverted per logo.
 *
 * This is an identifier, never the case's only visual content: the real
 * screenshots and project photography carry that.
 */
const BrandMark: React.FC<BrandMarkProps> = ({ item, className = '' }) => (
  <div className={`flex items-center justify-center overflow-hidden bg-paper ${className}`}>
    <picture>
      {item.logoWebp && <source type="image/webp" srcSet={item.logoWebp} />}
      <img
        src={item.logoPath}
        alt={item.logoAlt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-7 sm:p-9"
        style={{ transform: `scale(${item.logoScale})`, objectPosition: item.logoPosition }}
      />
    </picture>
  </div>
);

export default BrandMark;
