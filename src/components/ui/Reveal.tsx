import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Render as the given element instead of a div. */
  as?: 'div' | 'li' | 'article' | 'section';
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const supportsObserver = () =>
  typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';

/**
 * How long we are willing to let an entrance animation withhold content.
 * After this, the element is shown whatever the observer thinks.
 */
const FAILSAFE_MS = 900;

/**
 * Fades content in on scroll.
 *
 * Three failure modes from the previous version are fixed here:
 *
 * 1. Content started at `opacity: 0` and only became visible once an
 *    IntersectionObserver fired. If the observer never reported an
 *    intersection — background tab, occluded window, headless render — the
 *    whole page stayed blank. A failsafe timer now guarantees content appears
 *    regardless, because an entrance animation must never gate content.
 * 2. No reduced-motion handling: the media query only shortened the
 *    transition, it did not opt out of the hidden start state.
 * 3. The wrapper was always a plain `div`, which broke `items-stretch` grids
 *    because the intermediate element had no height of its own.
 */
const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, as = 'div' }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(() => !supportsObserver() || prefersReducedMotion());

  React.useEffect(() => {
    if (visible) return;

    const el = ref.current;
    const show = () => setVisible(true);

    if (!el) {
      const orphanFailsafe = window.setTimeout(show, FAILSAFE_MS);
      return () => window.clearTimeout(orphanFailsafe);
    }

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    /**
     * Failsafe: if the element is sitting in the viewport but the observer has
     * not reported it, the observer is not doing its job (background tab,
     * occluded window, headless render). Show it anyway.
     */
    const failsafe = window.setTimeout(() => {
      if (inViewport()) show();
    }, FAILSAFE_MS + delay);

    /**
     * Belt and braces for content further down the page: a passive scroll check
     * so an unreliable observer can never leave a section permanently blank.
     * Both listeners self-remove as soon as the element is shown.
     */
    const onScroll = () => {
      if (inViewport()) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
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

  /**
   * No `h-full` here on purpose. Setting it unconditionally makes every stacked
   * Reveal inside a grid item claim 100% of that item's resolved height, which
   * overflows the container. Grids that need their cards to equalise pass
   * `className="h-full"` at the call site instead.
   */
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
