import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_CHANGE_EVENT,
  readConsent,
  writeConsent,
  type Consent,
} from '@/lib/cookieConsent';
import { useLocale } from '@/i18n/useLocale';

/**
 * Cookie consent.
 *
 * A compact card pinned to the bottom — not a scrim over the hero, and small
 * enough on a 320px screen that it never covers more than the last band of the
 * page. Both choices are equally legible and equally easy to hit; neither is
 * styled as the obvious one, because a reject button that is harder to find
 * than the accept button is not consent. It sits above the header but below
 * the mobile menu, so opening the menu is never fought by a consent card.
 */
const CookieBanner: React.FC = () => {
  const { t, path } = useLocale();
  const [consent, setConsent] = useState<Consent | null>(() => readConsent());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent) return;
    const timer = window.setTimeout(() => setVisible(true), 600);
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
      className="animate-rise fixed inset-x-0 bottom-0 z-consent p-3 sm:p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm md:p-0"
    >
      <div className="relative border border-ink/15 bg-paper-2 p-5 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.4)] sm:p-6">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand" />

        <h2 id="cookie-title" className="meta">
          {t.cookies.heading}
        </h2>
        <p className="mt-3.5 text-sm leading-relaxed text-muted">{t.cookies.body}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => save('accepted')} className="btn btn-outline flex-1">
            {t.cookies.accept}
          </button>
          <button type="button" onClick={() => save('rejected')} className="btn btn-outline flex-1">
            {t.cookies.reject}
          </button>
        </div>

        <Link
          to={path('cookies')}
          className="mt-4 inline-flex min-h-9 items-center text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
        >
          {t.cookies.policy}
        </Link>
      </div>
    </div>
  );
};

export default CookieBanner;
