/**
 * Locale configuration.
 *
 * The site is Danish and English. Danish is the market the business sells
 * into and stays the default at the root; English sits behind a `/en` prefix
 * so both versions are separately indexable, linkable and crawlable — no
 * client-side-only language switch that leaves search engines and shared
 * links stuck on one language.
 */
export const locales = ['da', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'da';

export const localeMeta: Record<
  Locale,
  { label: string; name: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
  da: { label: 'DA', name: 'Dansk', htmlLang: 'da', ogLocale: 'da_DK', hreflang: 'da-DK' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en' },
};

/**
 * Route keys and their slug in each language.
 *
 * Translating the slug rather than only the prefix is the point: `/en/pricing`
 * is a page an English speaker can read the address of, and it is what search
 * engines expect from a localised site. `home` carries the whole Growth
 * Engine argument, including pricing and FAQ as anchored sections. `booking`
 * is the direct "book a discovery call" page; `work` is the case index.
 */
export const routeSlugs = {
  home: { da: '', en: '' },
  booking: { da: 'book-en-afklaring', en: 'book-a-discovery-call' },
  work: { da: 'projekter', en: 'projects' },
  privacy: { da: 'privatlivspolitik', en: 'privacy-policy' },
  cookies: { da: 'cookiepolitik', en: 'cookie-policy' },
} as const;

export type RouteKey = keyof typeof routeSlugs;

/** Anchored sections on the homepage, in page order. */
export const homeAnchors = {
  scan: 'growth-scan',
  engine: 'growth-engine',
  pricing: 'pris',
  faq: 'faq',
} as const;

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
 * pairs to be reciprocal. An unknown path (a 404 or a case slug that only
 * exists in one language) falls back to the target language's homepage
 * rather than to a second 404.
 */
export const translatePath = (pathname: string, target: Locale): string => {
  const current = localeFromPath(pathname);
  const segments = pathname.split('/').filter(Boolean);
  if (current !== defaultLocale) segments.shift();

  if (segments.length === 0) return localePath(target, 'home');

  const [head, ...rest] = segments;
  const key = (Object.keys(routeSlugs) as RouteKey[]).find(
    (candidate) => routeSlugs[candidate][current] === head
  );

  if (!key) return localePath(target, 'home');

  return localePath(target, key, rest.join('/') || undefined);
};
