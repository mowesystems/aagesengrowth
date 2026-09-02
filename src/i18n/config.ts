/**
 * Locale configuration.
 *
 * Danish is the default and lives at the root, because that is the market the
 * business sells into and the URLs that are already indexed. English and
 * Swedish sit behind a path prefix.
 *
 * The live site switched language with a button that never changed the URL,
 * which means only one of the three versions could ever be crawled or linked.
 * Every locale here has its own address and its own hreflang entry.
 */
export const locales = ['da', 'en', 'sv'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'da';

export const localeMeta: Record<
  Locale,
  { label: string; name: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
  da: { label: 'DA', name: 'Dansk', htmlLang: 'da', ogLocale: 'da_DK', hreflang: 'da-DK' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_GB', hreflang: 'en' },
  sv: { label: 'SE', name: 'Svenska', htmlLang: 'sv', ogLocale: 'sv_SE', hreflang: 'sv-SE' },
};

/**
 * Route keys and their slug in each language.
 *
 * Translating the slug rather than only the prefix is the point: `/en/pricing`
 * is a page an English speaker can read the address of, and it is what search
 * engines expect from a localised site. Anything added here becomes a real
 * route in all three languages automatically — see `routeTable` below.
 */
export const routeSlugs = {
  home: { da: '', en: '', sv: '' },
  pricing: { da: 'priser', en: 'pricing', sv: 'priser' },
  work: { da: 'projekter', en: 'work', sv: 'projekt' },
  contact: { da: 'kontakt', en: 'contact', sv: 'kontakt' },
  faq: { da: 'faq', en: 'faq', sv: 'faq' },
  privacy: { da: 'privatlivspolitik', en: 'privacy', sv: 'integritetspolicy' },
  cookies: { da: 'cookiepolitik', en: 'cookies', sv: 'cookiepolicy' },
} as const;

export type RouteKey = keyof typeof routeSlugs;

/** The prefix a locale's URLs carry. Danish carries none. */
const prefixOf = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

/**
 * The path for a route in a given language.
 *
 * `segment` appends a further slug, e.g. a case slug under the work index.
 * Always returns a leading slash and never a trailing one (except for "/").
 */
export const localePath = (locale: Locale, key: RouteKey, segment?: string): string => {
  const slug = routeSlugs[key][locale];
  const parts = [prefixOf(locale), slug && `/${slug}`, segment && `/${segment}`].filter(Boolean);
  return parts.join('') || '/';
};

/** Every (locale, key) pair, for building the router and the sitemap. */
export const routeTable = locales.flatMap((locale) =>
  (Object.keys(routeSlugs) as RouteKey[]).map((key) => ({
    locale,
    key,
    path: localePath(locale, key),
  }))
);

/**
 * The locale a pathname belongs to.
 *
 * Only an exact first segment counts, so a case slug that happens to start
 * with "en" cannot flip the whole page into English.
 */
export const localeFromPath = (pathname: string): Locale => {
  const first = pathname.split('/').filter(Boolean)[0];
  return locales.includes(first as Locale) && first !== defaultLocale
    ? (first as Locale)
    : defaultLocale;
};

/**
 * The same page in another language.
 *
 * Used by the language switcher and by the hreflang tags, so switching
 * language on the pricing page lands on the pricing page rather than the
 * homepage — which is both better for a visitor and required for hreflang
 * pairs to be reciprocal.
 */
export const translatePath = (
  pathname: string,
  target: Locale
): string => {
  const current = localeFromPath(pathname);
  const segments = pathname.split('/').filter(Boolean);
  if (current !== defaultLocale) segments.shift();

  if (segments.length === 0) return localePath(target, 'home');

  const [head, ...rest] = segments;
  const key = (Object.keys(routeSlugs) as RouteKey[]).find(
    (candidate) => routeSlugs[candidate][current] === head
  );

  // An unknown path (a 404) has no counterpart; send the switch to the
  // target language's homepage rather than to a second 404.
  if (!key) return localePath(target, 'home');

  return localePath(target, key, rest.join('/') || undefined);
};
