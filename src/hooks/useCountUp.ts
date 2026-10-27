import React from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Counts from 0 to `target` once `active` is true. Uses requestAnimationFrame
 * and an ease-out, so the last digits settle slowly. Jumps straight to the
 * target under reduced motion.
 */
export const useCountUp = (target: number, active: boolean, duration = 1400, delay = 0) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, active, duration, delay]);

  return value;
};
