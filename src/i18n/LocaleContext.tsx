import React from 'react';
import { useLocation } from 'react-router-dom';
import { localeFromPath, localeMeta, localePath } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionary';
import { LocaleContext, priceFormatters, type LocaleValue } from '@/i18n/useLocale';

/**
 * Derives the active language from the URL and puts it in context.
 *
 * The locale is read from the path rather than held in state, so the browser's
 * back button, a shared link and a crawler all agree on which language a page
 * is in — which is the whole reason the switcher renders real links.
 */
export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  // The document language has to follow the route, or a screen reader reads
  // English copy with Danish pronunciation rules.
  React.useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const value = React.useMemo<LocaleValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      path: (key, segment) => localePath(locale, key, segment),
      price: priceFormatters[locale],
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
