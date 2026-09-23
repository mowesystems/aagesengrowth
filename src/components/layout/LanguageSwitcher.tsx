import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { localeMeta, locales, translatePath } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

interface LanguageSwitcherProps {
  className?: string;
  /** Renders for ink grounds. */
  light?: boolean;
}

/**
 * DA / EN.
 *
 * Real links, not a client-side toggle: each item points at the same page in
 * the target language via `translatePath`, so switching on the pricing
 * section lands on the pricing section rather than the homepage, and the
 * other language is always a bookmarkable, crawlable URL. The active
 * language is shown with weight and colour, not a pill — understated, in
 * keeping with the rest of the chrome.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', light = false }) => {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();

  return (
    <div
      className={`flex items-center gap-1 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] ${className}`}
      role="group"
      aria-label={t.header.language}
    >
      {locales.map((item, index) => {
        const active = item === locale;
        return (
          <React.Fragment key={item}>
            {index > 0 && (
              <span aria-hidden="true" className={light ? 'text-paper/25' : 'text-ink/20'}>
                /
              </span>
            )}
            <Link
              to={translatePath(pathname, item)}
              hrefLang={localeMeta[item].hreflang}
              aria-current={active ? 'true' : undefined}
              aria-label={localeMeta[item].name}
              className={`inline-flex min-h-9 min-w-9 items-center justify-center px-1 transition-colors ${
                active
                  ? light
                    ? 'text-paper'
                    : 'text-ink'
                  : light
                    ? 'text-muted-lit hover:text-paper'
                    : 'text-muted hover:text-ink'
              }`}
            >
              {localeMeta[item].label}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
