/**
 * Motion bootstrap.
 *
 * The rule this enforces: an entrance animation may never gate content.
 *
 * Nothing in the stylesheet hides content on its own. The hidden start state
 * lives behind `html.motion-ready:not(.motion-settled)`, which means:
 *
 *   - Server output, a failed bundle, a crawler or a headless render show the
 *     full page, because `motion-ready` is only ever added by this module.
 *   - `motion-ready` is not added at all under reduced motion, or when the
 *     browser has no IntersectionObserver to drive the reveals.
 *   - `motion-settled` is added on a timer no matter what happens afterwards,
 *     so a thrown error, a background tab or an observer that never fires
 *     cannot leave a section permanently blank.
 */

/** How long entrances are allowed to withhold anything at all. */
const SETTLE_MS = 2200;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export const supportsObserver = () =>
  typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';

export const initMotion = () => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const settle = () => root.classList.add('motion-settled');

  if (prefersReducedMotion() || !supportsObserver()) {
    // Never arm the hidden state in the first place.
    settle();
    return;
  }

  root.classList.add('motion-ready');
  window.setTimeout(settle, SETTLE_MS);

  // If the visitor turns reduced motion on mid-session, stop withholding.
  window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .addEventListener?.('change', (event) => {
      if (event.matches) settle();
    });
};

/**
 * True when pointer-driven effects should run at all: a fine pointer that can
 * hover. Excludes touch, pen and reduced-motion users.
 */
export const supportsPointerEffects = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover) and (pointer: fine)').matches === true &&
  !prefersReducedMotion();
