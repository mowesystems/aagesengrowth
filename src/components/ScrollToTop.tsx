import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation, and honours hash targets.
 *
 * When navigating to a hash on a *different* route (e.g. /ydelser -> /#website-tjek)
 * the target element does not exist yet on the first frame, so a single
 * requestAnimationFrame silently did nothing and the visitor landed at the top
 * of the page instead. This retries for a few frames before giving up.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    let frame = 0;
    let attempts = 0;

    const run = () => {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
        return;
      }

      // Target not mounted yet — try again for a handful of frames.
      if (attempts < 12) {
        attempts += 1;
        frame = window.requestAnimationFrame(run);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    frame = window.requestAnimationFrame(run);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
