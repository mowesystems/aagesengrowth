import React from 'react';
import company from '@/config/company';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object | object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical, schema }) => {
  const fullTitle = title.includes(company.legalName) ? title : `${title} — ${company.legalName}`;
  const canonicalUrl = canonical ? `${company.domain}${canonical}` : company.domain;

  React.useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    document.querySelectorAll('meta[property="og:image"], meta[property="og:image:alt"], meta[name="twitter:image"]').forEach((element) => element.remove());

    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonicalUrl);

    document.querySelectorAll('[id^="schema-dynamic-"]').forEach((element) => element.remove());
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, i) => {
        const id = `schema-dynamic-${i}`;
        let el = document.getElementById(id);
        if (!el) {
          el = document.createElement('script');
          el.id = id;
          el.setAttribute('type', 'application/ld+json');
          document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(s);
      });
    }
  }, [fullTitle, description, canonicalUrl, schema]);

  return null;
};

export default SEOHead;
