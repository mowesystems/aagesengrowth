import React from 'react';
import company from '@/config/company';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object | object[];
  /** Set on pages that should not be indexed (404s, thin utility pages). */
  noindex?: boolean;
}

/**
 * The image used for link previews.
 *
 * A purpose-built 1200x630 card in the site's own identity, replacing the
 * 2 MB logo-on-a-wall render that used to be wired up here. Social scrapers
 * are inconsistent about AVIF and WebP, so this one stays a JPEG.
 */
const OG_IMAGE = '/og-image.jpg';
const OG_IMAGE_ALT =
  'Aagesen Growth — from click to customer. Websites, Google Ads, Meta Ads og Search Visibility.';

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

const removeMeta = (selector: string) => {
  document.head.querySelectorAll(selector).forEach((el) => el.remove());
};

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical, schema, noindex }) => {
  const fullTitle = title.includes(company.legalName) ? title : `${title} — ${company.legalName}`;
  const canonicalUrl = canonical ? `${company.domain}${canonical}` : company.domain;
  const imageUrl = `${company.domain}${OG_IMAGE}`;

  // Serialise so a fresh object literal on every render does not re-run the effect.
  const schemaKey = React.useMemo(() => (schema ? JSON.stringify(schema) : ''), [schema]);

  React.useEffect(() => {
    document.title = fullTitle;

    upsertMeta('description', description);

    upsertMeta('og:type', 'website', true);
    upsertMeta('og:site_name', company.legalName, true);
    upsertMeta('og:locale', 'da_DK', true);
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
      removeMeta('meta[name="robots"]');
    }

    // A noindex page (e.g. the 404) should not claim a canonical URL — pointing
    // it at the homepage would tell crawlers the two are the same page.
    if (noindex) {
      removeMeta('link[rel="canonical"]');
    } else {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }

    // Replace any structured data from a previous route.
    removeMeta('script[data-seo-schema="true"]');
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
  }, [fullTitle, description, canonicalUrl, imageUrl, schemaKey, noindex]);

  return null;
};

export default SEOHead;
