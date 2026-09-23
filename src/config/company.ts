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

/** The confirmed public inbox. */
const DEFAULT_CONTACT_EMAIL = 'Kontakt@aagesengrowth.dk';

/** Confirmed by Marius on 23 Sep 2026. */
const DEFAULT_CVR = '46728068';

const company = {
  brandName: 'Aagesen Growth',
  legalName: 'Aagesen Growth ApS',

  // --- Contact -------------------------------------------------------------
  email: env.VITE_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL,
  // No phone number is published — VITE_CONTACT_PHONE stays unset until there
  // is a real line to answer it.
  phone: env.VITE_CONTACT_PHONE || '',
  address: env.VITE_COMPANY_ADDRESS || '',
  cvr: env.VITE_COMPANY_CVR || DEFAULT_CVR,

  // --- Social --------------------------------------------------------------
  linkedinUrl: env.VITE_LINKEDIN_URL || '',
  instagramUrl: env.VITE_INSTAGRAM_URL || '',

  // --- Booking ---------------------------------------------------------------
  // The public URL of a real scheduling page (Cal.com, Calendly, a Google
  // Calendar appointment schedule, ...). When set, the booking page embeds it
  // so a visitor picks a real, live time slot. When empty, the booking page
  // falls back to a short request form — never to invented availability.
  bookingUrl: env.VITE_BOOKING_URL || '',

  // --- Site ----------------------------------------------------------------
  // The domain the site is actually served from. Canonicals, hreflang, OG
  // urls and the sitemap are all built from this, so it has to match the
  // domain Netlify serves.
  domain: env.VITE_SITE_URL || DEFAULT_SITE_URL,
};

export default company;
