/**
 * Conversion events.
 *
 * There was no analytics tooling on the site, so this is the one seam every
 * event goes through. It pushes to `window.dataLayer` (what Google Tag Manager
 * and GA4 read) and fires a DOM event, and does nothing else. A tag manager is
 * only injected once a visitor has accepted statistics cookies and a container
 * id is configured — until then the events are still emitted, just not sent.
 *
 * The names are the funnel. Keep them stable: reports are built on them.
 */
import { readConsent, CONSENT_CHANGE_EVENT } from '@/lib/cookieConsent';

export type AnalyticsEvent =
  | 'growth_scan_started'
  | 'growth_scan_completed'
  | 'growth_scan_failed'
  | 'growth_scan_lead_submitted'
  | 'growth_review_booked'
  | 'pricing_viewed'
  | 'founder_program_clicked'
  | 'primary_cta_clicked'
  | 'callback_requested'
  | 'website_packages_clicked';

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const TRACK_EVENT = 'ag:track';

export const track = (event: AnalyticsEvent, props: AnalyticsProps = {}) => {
  if (typeof window === 'undefined') return;
  const payload = { event, ...props, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: payload }));
  if (import.meta.env.DEV) {
    console.debug('[track]', event, props);
  }
};

/** Fires `pricing_viewed` once per page view when the pricing section is seen. */
export const trackOnce = (() => {
  const seen = new Set<string>();
  return (event: AnalyticsEvent, props: AnalyticsProps = {}) => {
    if (seen.has(event)) return;
    seen.add(event);
    track(event, props);
  };
})();

let tagManagerLoaded = false;

/**
 * Injects Google Tag Manager when (and only when) consent is given and a
 * container id is configured via VITE_GTM_ID. Safe to call repeatedly.
 */
const loadTagManager = () => {
  const id = import.meta.env.VITE_GTM_ID as string | undefined;
  if (!id || tagManagerLoaded || readConsent() !== 'accepted') return;
  tagManagerLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  loadTagManager();
  window.addEventListener(CONSENT_CHANGE_EVENT, loadTagManager);
};
