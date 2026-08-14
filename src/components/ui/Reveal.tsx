import React from 'react';
import { prefersReducedMotion, supportsObserver } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Render as the given element instead of a div. */
  as?: 'div' | 'li' | 'article' | 'section' | 'figure';
}

/** How long a single element may wait for an observer before showing anyway. */
const FAILSAFE_MS = 900;

/**
 * Scroll entrance.
 *
 * The hidden start state is owned by CSS and scoped to `html.motion-ready`,
 * which `initMotion` only sets when JavaScript is running and motion is
 * wanted (see lib/motion.ts). This component's job is just to add
 * `is-visible` at the right moment, with three independent ways to get there:
 * the observer, a per-element failsafe timer for anything already in view, and
 * a passive scroll check. The global settle timer is the final backstop.
 */
const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, as = 'div' }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(
    () => !supportsObserver() || prefersReducedMotion()
  );

  React.useEffect(() => {
    if (visible) return;

    const el = ref.current;
    const show = () => setVisible(true);

    if (!el) {
      const orphan = window.setTimeout(show, FAILSAFE_MS);
      return () => window.clearTimeout(orphan);
    }

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Anything sitting in the viewport that the observer has not reported is
    // shown regardless — an occluded window or a background tab must not cost
    // the visitor content.
    const failsafe = window.setTimeout(() => {
      if (inViewport()) show();
    }, FAILSAFE_MS + delay);

    const onScroll = () => {
      if (inViewport()) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.04, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, [visible, delay]);

  const Tag = as as React.ElementType;

  // No unconditional `h-full`: it makes stacked Reveals inside a grid item each
  // claim the item's resolved height. Grids that need equal cards pass it in.
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
