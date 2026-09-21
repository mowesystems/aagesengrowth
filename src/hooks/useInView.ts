import React from 'react';
import { prefersReducedMotion, supportsObserver } from '@/lib/motion';

/**
 * True once the element has entered the viewport. Never flips back, so the
 * animations it drives run once. Resolves to true immediately when there is
 * no observer or motion is reduced, so nothing can be withheld.
 */
export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.25 }
) => {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(() => !supportsObserver() || prefersReducedMotion());

  React.useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, inView };
};
