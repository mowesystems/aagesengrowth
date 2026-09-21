import React from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Writes the reader's progress through an element into a CSS variable on it,
 * as a 0–1 number. One passive scroll listener, throttled to animation
 * frames; nothing re-renders. Skipped under reduced motion, where the
 * variable stays at its CSS default.
 */
export const useScrollProgress = <T extends HTMLElement>(variable = '--spine') => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Progress runs from the element's top reaching 60% of the viewport to
      // its bottom reaching the same line, so the tip stays near the eye.
      const line = viewport * 0.6;
      const total = rect.height;
      const passed = line - rect.top;
      const progress = Math.min(1, Math.max(0, passed / total));
      el.style.setProperty(variable, progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [variable]);

  return ref;
};
