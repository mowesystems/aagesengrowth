import React from 'react';
import { useLocation } from 'react-router-dom';
import company from '@/config/company';
import { localeMeta, locales, translatePath } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';

interface SEOHeadProps {
  title: string;
  description: string;
  schema?: object | object[];
  /** Set on pages that should not be indexed (404s, thin utility pages). */
  noindex?: boolean;
}

/**
 * The image used for link previews.
 *
 * Social scrapers are inconsistent about AVIF and WebP, so this one stays a
 * JPEG.
 */
const OG_IMAGE = '/og-image.jpg';
const OG_IMAGE_ALT =
  'Aagesen Growth — websites, SEO, GEO and paid growth. Digital growth without the big agency.';

const upsertMeta = (key: string, content: string, asProperty = false) => {
  const attr = asProperty ? 'property' : 'name';
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const removeAll = (selector: string) => {
  document.head.querySelectorAll(selector).forEach((el) => el.remove());
};

const upsertLink = (rel: string, href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/**
 * Per-route head management.
 *
 * Beyond title/description/OG, this owns the alternate-language links. Each
 * route emits an hreflang entry for all three languages plus x-default, built
 * from the current path rather than hardcoded — so a page can never advertise
 * a translation that does not exist at that address.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, schema, noindex }) => {
  const { locale } = useLocale();
  const { pathname } = useLocation();

  const fullTitle = title.includes('Aagesen Growth') ? title : `${title} — Aagesen Growth`;
  const canonicalUrl = `${company.domain}${pathname === '/' ? '/' : pathname}`;
  const imageUrl = `${company.domain}${OG_IMAGE}`;

  // Serialise so a fresh object literal on every render does not re-run the effect.
  const schemaKey = React.useMemo(() => (schema ? JSON.stringify(schema) : ''), [schema]);

  React.useEffect(() => {
    document.title = fullTitle;

    upsertMeta('description', description);

    upsertMeta('og:type', 'website', true);
    upsertMeta('og:site_name', 'Aagesen Growth', true);
    upsertMeta('og:locale', localeMeta[locale].ogLocale, true);
    removeAll('meta[property="og:locale:alternate"]');
    locales
      .filter((alt) => alt !== locale)
      .forEach((alt) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:locale:alternate');
        meta.setAttribute('content', localeMeta[alt].ogLocale);
        document.head.appendChild(meta);
      });
    upsertMeta('og:title', fullTitle, true);
    upsertMeta('og:description', description, true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertMeta('og:image', imageUrl, true);
    upsertMeta('og:image:width', '1200', true);
    upsertMeta('og:image:height', '630', true);
    upsertMeta('og:image:alt', OG_IMAGE_ALT, true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', fullTitle);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', imageUrl);

    if (noindex) {
      upsertMeta('robots', 'noindex, follow');
    } else {
      removeAll('meta[name="robots"]');
    }

    // A noindex page (e.g. the 404) should not claim a canonical URL — pointing
    // it at the homepage would tell crawlers the two are the same page. It
    // should not advertise translations either.
    removeAll('link[rel="alternate"][hreflang]');
    if (noindex) {
      removeAll('link[rel="canonical"]');
    } else {
      upsertLink('canonical', canonicalUrl);

      locales.forEach((alt) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', localeMeta[alt].hreflang);
        link.setAttribute('href', `${company.domain}${translatePath(pathname, alt)}`);
        document.head.appendChild(link);
      });

      const fallback = document.createElement('link');
      fallback.setAttribute('rel', 'alternate');
      fallback.setAttribute('hreflang', 'x-default');
      fallback.setAttribute('href', `${company.domain}${translatePath(pathname, 'da')}`);
      document.head.appendChild(fallback);
    }

    // Replace any structured data from a previous route.
    removeAll('script[data-seo-schema="true"]');
    if (schemaKey) {
      const parsed = JSON.parse(schemaKey) as object | object[];
      const list = Array.isArray(parsed) ? parsed : [parsed];
      list.forEach((entry) => {
        const el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.setAttribute('data-seo-schema', 'true');
        el.textContent = JSON.stringify(entry);
        document.head.appendChild(el);
      });
    }
  }, [fullTitle, description, canonicalUrl, imageUrl, schemaKey, noindex, locale, pathname]);

  return null;
};

export default SEOHead;
