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
 * DA / EN / SE.
 *
 * Real links, not buttons. The previous site switched language in component
 * state, which meant the URL never changed: the other two languages could not
 * be linked to, bookmarked, shared or crawled, and the browser's own
 * translate/back behaviour had nothing to work with. Each item here points at
 * the same page in the target language — `translatePath` maps the slug across
 * — so switching on /priser lands on /en/pricing rather than the homepage.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', light = false }) => {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const { t } = useLocale();

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label={t.header.languageSwitch}
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            to={translatePath(pathname, item)}
            hrefLang={localeMeta[item].hreflang}
            aria-current={active ? 'true' : undefined}
            aria-label={localeMeta[item].name}
            className={`inline-flex min-h-9 min-w-9 items-center justify-center px-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] transition-colors ${
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
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
