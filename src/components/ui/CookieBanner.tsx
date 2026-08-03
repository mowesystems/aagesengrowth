import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_CHANGE_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from '@/lib/cookieConsent';

/**
 * Cookie consent banner.
 *
 * This component already existed but was never mounted anywhere, so the site
 * shipped a cookie policy describing a banner that did not exist — while the
 * Launch package sold "cookiebanner" as a deliverable. It is now rendered from
 * App, and consent can be withdrawn again from the cookie policy page.
 */
const CookieBanner: React.FC = () => {
  const [consent, setConsent] = useState<Consent | null>(() => readConsent());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent) return;
    const timer = window.setTimeout(() => setVisible(true), 500);
    return () => window.clearTimeout(timer);
  }, [consent]);

  useEffect(() => {
    const onChange = () => {
      const next = readConsent();
      setConsent(next);
      setVisible(next === null);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  const save = useCallback((value: Consent) => {
    writeConsent(value);
    setConsent(value);
    setVisible(false);
  }, []);

  if (consent || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="on-light fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5 md:bottom-6 md:left-6 md:right-auto md:max-w-sm md:p-0 animate-rise"
    >
      <div className="border border-ink/15 bg-cream p-6 text-ink shadow-[0_20px_60px_rgba(16,28,41,0.35)]">
        <h2 id="cookie-title" className="meta-on-light">
          Cookies
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-dim-ink">
          Nødvendige cookies sikrer, at siden fungerer. Analysecookies bruges kun, hvis I siger ja.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => save('accepted')} className="btn btn-invert flex-1">
            Accepter
          </button>
          <button
            type="button"
            onClick={() => save('rejected')}
            className="btn btn-outline-invert flex-1"
          >
            Kun nødvendige
          </button>
        </div>
        <Link
          to="/cookiepolitik"
          className="mt-4 inline-flex min-h-9 items-center text-xs text-ink/50 underline underline-offset-2 transition-colors hover:text-ink"
        >
          Læs cookiepolitikken
        </Link>
      </div>
    </div>
  );
};

export default CookieBanner;
