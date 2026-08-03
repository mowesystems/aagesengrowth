/**
 * Single source of truth for company identity and contact details.
 *
 * Every field below is optional-safe: the UI degrades gracefully when a value
 * is empty rather than rendering an empty row or a dead link. Fill these in
 * (directly, or via the matching VITE_* env vars) before launch — see
 * .env.example.
 */
const env = import.meta.env;

const company = {
  brandName: 'Aagesen Growth',
  legalName: 'Aagesen Growth ApS',
  positioning: 'Digital vækstpartner for små og mellemstore virksomheder.',

  // --- Contact -------------------------------------------------------------
  email: env.VITE_CONTACT_EMAIL || '',
  phone: env.VITE_CONTACT_PHONE || '',
  address: env.VITE_COMPANY_ADDRESS || '',
  cvr: env.VITE_COMPANY_CVR || '',

  // --- Booking -------------------------------------------------------------
  // When empty, every booking CTA falls back to the contact form rather than
  // dead-ending on an empty booking page.
  bookingUrl: env.VITE_BOOKING_URL || '',

  // --- Social --------------------------------------------------------------
  linkedinUrl: env.VITE_LINKEDIN_URL || '',
  instagramUrl: env.VITE_INSTAGRAM_URL || '',

  // --- Site ----------------------------------------------------------------
  domain: env.VITE_SITE_URL || 'https://www.aagesengrowth.dk',

  footerDescription:
    'Én ansvarlig partner til website, synlighed og annoncering — for virksomheder, der vil have det gjort ordentligt.',
};

/** True when a real booking calendar has been configured. */
export const hasBooking = Boolean(company.bookingUrl);

/** Where a "book a meeting" action should point, given current config. */
export const bookingTarget = company.bookingUrl || '/kontakt';

export default company;
