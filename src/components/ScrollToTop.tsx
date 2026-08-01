import React from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
