import React from 'react';
import { defaultLocale, localePath, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { dictionaries } from '@/i18n/dictionary';

export interface LocaleValue {
  locale: Locale;
  t: Dictionary;
  /** Path builder bound to the active locale. */
  path: (key: RouteKey, segment?: string) => string;
  /** Formats a DKK amount the way the active language writes numbers. */
  price: (amount: number) => string;
}

/**
 * Formats a price in Danish kroner for the reading language.
 *
 * Every locale gets the same currency — the company invoices in DKK — but the
 * grouping and the placement of the unit follow the language: "12.500 kr." in
 * Danish, "DKK 12,500" in English, "12 500 kr" in Swedish. The Swedish
 * separator is the non-breaking space `toLocaleString` already returns, and
 * the gap before "kr" is one too, so a price never wraps mid-number.
 */
export const priceFormatters: Record<Locale, (amount: number) => string> = {
  da: (amount) => `${amount.toLocaleString('da-DK')} kr.`,
  en: (amount) => `DKK ${amount.toLocaleString('en-GB')}`,
  sv: (amount) => `${amount.toLocaleString('sv-SE')} kr`,
};

/**
 * Lives in its own module so that LocaleContext.tsx exports a component and
 * nothing else — which is what keeps React Fast Refresh working on it.
 */
export const LocaleContext = React.createContext<LocaleValue>({
  locale: defaultLocale,
  t: dictionaries[defaultLocale],
  path: (key, segment) => localePath(defaultLocale, key, segment),
  price: priceFormatters[defaultLocale],
});

export const useLocale = () => React.useContext(LocaleContext);
