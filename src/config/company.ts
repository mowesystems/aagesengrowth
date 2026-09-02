/**
 * Single source of truth for company identity and contact details.
 *
 * Every field below is optional-safe: the UI degrades gracefully when a value
 * is empty rather than rendering an empty row or a dead link. Fill these in
 * (directly, or via the matching VITE_* env vars) before launch — see
 * .env.example. Anything a visitor reads as prose lives in the dictionary
 * instead, because it has to exist in three languages.
 */
import { DEFAULT_SITE_URL } from '@/config/site';

const env = import.meta.env;

const company = {
  brandName: 'Aagesen Growth',
  legalName: 'Aagesen Growth ApS',

  // --- Contact -------------------------------------------------------------
  email: env.VITE_CONTACT_EMAIL || '',
  phone: env.VITE_CONTACT_PHONE || '',
  address: env.VITE_COMPANY_ADDRESS || '',
  cvr: env.VITE_COMPANY_CVR || '',

  // --- Social --------------------------------------------------------------
  linkedinUrl: env.VITE_LINKEDIN_URL || '',
  instagramUrl: env.VITE_INSTAGRAM_URL || '',

  // --- Site ----------------------------------------------------------------
  // The domain the site is actually served from. Canonicals, hreflang, OG
  // urls and the sitemap are all built from this, so it has to match the
  // domain Netlify serves — .com, not the .dk the old build claimed.
  domain: env.VITE_SITE_URL || DEFAULT_SITE_URL,
};

export default company;
