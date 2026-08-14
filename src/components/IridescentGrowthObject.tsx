import React from 'react';
import { supportsPointerEffects } from '@/lib/motion';

interface IridescentGrowthObjectProps {
  className?: string;
}

/** How far the object may drift with the pointer, in pixels. Deliberately tiny. */
const PARALLAX = 14;

/**
 * The hero object.
 *
 * A sculptural loop rather than a gradient blob: two ellipses on opposing
 * tilts, stroked with the same spectrum, with a chromed band and a specular
 * highlight implying a light source above and to the right. It is drawn once
 * as inline SVG — a few kilobytes of markup, no 3D runtime, no canvas, and
 * nothing to download.
 *
 * Everything about it is subordinate to the headline:
 *   - `aria-hidden` and `pointer-events: none`, so it is invisible to assistive
 *     technology and can never intercept a click on the type in front of it.
 *   - Parallax only on a fine pointer that can hover, and never under reduced
 *     motion — the check covers touch and pen, so phones do no pointer work.
 *   - The rotation is 90 seconds per turn: present, not perceptible.
 */
const IridescentGrowthObject: React.FC<IridescentGrowthObjectProps> = ({ className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!supportsPointerEffects()) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      // -1..1 across the viewport, scaled to a handful of pixels.
      targetX = (event.clientX / window.innerWidth - 0.5) * 2 * PARALLAX;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2 * PARALLAX;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      const settled =
        Math.abs(targetX - currentX) < 0.15 && Math.abs(targetY - currentY) < 0.15;
      frame = settled ? 0 : window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none will-change-transform ${className}`}
    >
      <svg
        viewBox="0 0 620 620"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="igo-spectrum" x1="8%" y1="90%" x2="94%" y2="8%">
            <stop offset="0%" stopColor="#B8FF45" />
            <stop offset="33%" stopColor="#5EEBFF" />
            <stop offset="66%" stopColor="#7657FF" />
            <stop offset="100%" stopColor="#FF4FD8" />
          </linearGradient>

          <linearGradient id="igo-spectrum-soft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4FD8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#7657FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5EEBFF" stopOpacity="0.25" />
          </linearGradient>

          {/* The chromed band: a bright core falling off to nothing on both
              sides, which is what makes a flat stroke read as a curved surface. */}
          <linearGradient id="igo-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2EFE8" stopOpacity="0" />
            <stop offset="34%" stopColor="#F2EFE8" stopOpacity="0.85" />
            <stop offset="52%" stopColor="#F2EFE8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F2EFE8" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="igo-glow" cx="50%" cy="46%" r="50%">
            <stop offset="0%" stopColor="#7657FF" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#5EEBFF" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#5EEBFF" stopOpacity="0" />
          </radialGradient>

          <filter id="igo-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>

          <filter id="igo-blur-fine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        {/* Ambient light behind the object */}
        <circle cx="310" cy="300" r="300" fill="url(#igo-glow)" />

        {/* Bloom: the spectrum ring, blurred, sitting under the crisp one */}
        <g filter="url(#igo-blur)" opacity="0.75">
          <ellipse
            cx="310"
            cy="305"
            rx="216"
            ry="118"
            stroke="url(#igo-spectrum)"
            strokeWidth="16"
            transform="rotate(-27 310 305)"
          />
        </g>

        <g className="igo-spin" style={{ transformOrigin: '310px 305px' }}>
          {/* The primary loop */}
          <ellipse
            cx="310"
            cy="305"
            rx="216"
            ry="118"
            stroke="url(#igo-spectrum)"
            strokeWidth="1.6"
            transform="rotate(-27 310 305)"
          />
          {/* The chromed highlight riding the same path */}
          <ellipse
            cx="310"
            cy="305"
            rx="216"
            ry="118"
            stroke="url(#igo-chrome)"
            strokeWidth="4.5"
            transform="rotate(-27 310 305)"
            filter="url(#igo-blur-fine)"
          />

          {/* The counter-loop, thinner and further back */}
          <ellipse
            cx="310"
            cy="305"
            rx="196"
            ry="104"
            stroke="url(#igo-spectrum-soft)"
            strokeWidth="1.1"
            transform="rotate(31 310 305)"
          />
          <ellipse
            cx="310"
            cy="305"
            rx="196"
            ry="104"
            stroke="url(#igo-chrome)"
            strokeWidth="3"
            transform="rotate(31 310 305)"
            filter="url(#igo-blur-fine)"
            opacity="0.6"
          />

          {/* Interior rings: the lens, not the ribbon */}
          <ellipse
            cx="310"
            cy="305"
            rx="150"
            ry="82"
            stroke="#F2EFE8"
            strokeOpacity="0.09"
            strokeWidth="0.9"
            transform="rotate(-27 310 305)"
          />
          <ellipse
            cx="310"
            cy="305"
            rx="96"
            ry="52"
            stroke="#F2EFE8"
            strokeOpacity="0.06"
            strokeWidth="0.8"
            transform="rotate(-27 310 305)"
          />
        </g>

        {/* Specular: a single point where the light actually lands */}
        <circle cx="452" cy="192" r="3" fill="#F2EFE8" opacity="0.9" />
        <circle cx="452" cy="192" r="16" fill="#F2EFE8" opacity="0.11" filter="url(#igo-blur-fine)" />

        <style>{`
          .igo-spin { animation: igoSpin 90s linear infinite; }
          @keyframes igoSpin { to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) { .igo-spin { animation: none; } }
        `}</style>
      </svg>
    </div>
  );
};

export default IridescentGrowthObject;
