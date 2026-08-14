import React from 'react';
import type { CaseImage } from '@/data/cases';
import ResponsiveImage from '@/components/media/ResponsiveImage';

interface CaseMediaFrameProps {
  image: CaseImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Shows the caption under the frame, where the image carries one. */
  showCaption?: boolean;
  /**
   * Crops the frame to a different aspect than the asset's own. The image is
   * cropped, never squashed — every treatment below uses object-cover.
   */
  ratio?: number;
  /**
   * Fills the height the parent gives it instead of reserving space from an
   * aspect ratio. Used where a frame sits beside a taller one and any fixed
   * aspect would leave a hole in the row.
   */
  fill?: boolean;
}

/**
 * The one way project media is presented.
 *
 * Three treatments, chosen by the asset's own `kind`:
 *
 *   browser — a hairline chrome with a muted address bar. States plainly that
 *             this is a live website rather than a rendering of one.
 *   phone   — a narrow device frame for the mobile screenshot.
 *   photo   — no frame at all. Photography is the only thing on this site
 *             allowed to be loud, so nothing is put around it.
 *
 * All three clip their image, which is what lets the slow crop-in on hover
 * read as a crop rather than as a scale.
 */
const CaseMediaFrame: React.FC<CaseMediaFrameProps> = ({
  image,
  sizes,
  priority = false,
  className = '',
  showCaption = false,
  ratio,
  fill = false,
}) => {
  const boxStyle = fill ? undefined : { aspectRatio: String(ratio ?? image.ratio) };
  const boxClass = fill ? 'min-h-0 flex-1 overflow-hidden' : 'overflow-hidden';

  const picture = (objectPosition: string) => (
    <ResponsiveImage
      image={image}
      sizes={sizes}
      priority={priority}
      className={`media-zoom h-full w-full object-cover ${objectPosition}`}
    />
  );

  const media =
    image.kind === 'browser' ? (
      <div
        className={`flex flex-col overflow-hidden border border-paper/15 bg-ink-2 ${
          fill ? 'h-full' : ''
        }`}
      >
        {/* Chrome. Decorative: the alt text on the screenshot already says
            which page this is. */}
        <div
          className="flex shrink-0 items-center gap-2 border-b border-paper/10 bg-ink-3/70 px-3.5 py-2.5"
          aria-hidden="true"
        >
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-paper/20" />
            <span className="h-2 w-2 rounded-full bg-paper/20" />
            <span className="h-2 w-2 rounded-full bg-paper/20" />
          </span>
          {image.chrome && (
            <span className="ml-2 hidden flex-1 truncate border border-paper/10 bg-ink/60 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.08em] text-muted sm:block">
              {image.chrome}
            </span>
          )}
        </div>
        <div className={boxClass} style={boxStyle}>
          {picture('object-top')}
        </div>
      </div>
    ) : image.kind === 'phone' ? (
      <div
        className={`flex flex-col overflow-hidden border border-paper/20 bg-ink-2 p-1.5 ${
          fill ? 'h-full' : ''
        }`}
      >
        <div className={boxClass} style={boxStyle}>
          {picture('object-top')}
        </div>
      </div>
    ) : (
      <div className={`${boxClass} ${fill ? 'h-full' : ''}`} style={boxStyle}>
        {picture('object-center')}
      </div>
    );

  if (!showCaption || !image.caption) {
    return <div className={`${fill ? 'h-full' : ''} ${className}`}>{media}</div>;
  }

  return (
    <figure className={className}>
      {media}
      <figcaption className="meta mt-3">{image.caption}</figcaption>
    </figure>
  );
};

export default CaseMediaFrame;
