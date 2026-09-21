/**
 * Locale configuration.
 *
 * Growth Engine sells to Danish home-service companies, so the site is Danish
 * and Danish only. The locale machinery is kept in place — one entry, typed —
 * so a second language can be added later by extending `locales`, adding a
 * dictionary and filling in the slugs, without touching the router or the
 * sitemap. The English and Swedish addresses that existed for the old agency
 * site 301 to the Danish page (see netlify.toml).
 */
export const locales = ['da'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'da';

export const localeMeta: Record<
  Locale,
  { label: string; name: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
  da: { label: 'DA', name: 'Dansk', htmlLang: 'da', ogLocale: 'da_DK', hreflang: 'da-DK' },
};

/**
 * Route keys and their slug.
 *
 * `home` carries the whole Growth Engine argument, including pricing and FAQ
 * as anchored sections. `review` is the page a Growth Scan lead lands on to
 * book the full review. The industry pages (/solceller, /varmepumper, ...)
 * are deliberately not here yet: they get added as one entry each when there
 * is real content for them.
 */
export const routeSlugs = {
  home: { da: '' },
  review: { da: 'growth-review' },
  work: { da: 'projekter' },
  privacy: { da: 'privatlivspolitik' },
  cookies: { da: 'cookiepolitik' },
} as const;

export type RouteKey = keyof typeof routeSlugs;

/** Anchored sections on the homepage, in page order. */
export const homeAnchors = {
  scan: 'growth-scan',
  engine: 'growth-engine',
  how: 'saadan-virker-det',
  pricing: 'pris',
  faq: 'faq',
} as const;

const prefixOf = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`);

/**
 * The path for a route. `segment` appends a further slug, e.g. a case slug
 * under the work index. Always returns a leading slash and never a trailing
 * one (except for "/").
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

/** The locale a pathname belongs to. Only one exists today. */
export const localeFromPath = (): Locale => defaultLocale;

/** The same page in another language. With one locale this is the identity. */
export const translatePath = (pathname: string): string => pathname;
