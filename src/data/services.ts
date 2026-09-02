import type { TierId } from '@/data/pricing';

/**
 * The eight disciplines — structure only.
 *
 * Copy lives in the dictionary under `services.<id>`. `tier` points at the
 * price line the discipline is sold under, so the ledger on the homepage can
 * show a real starting price next to every row without repeating any number.
 */
export type ServiceId =
  | 'websites'
  | 'seo'
  | 'geo'
  | 'googleAds'
  | 'metaAds'
  | 'strategy'
  | 'analytics'
  | 'care';

export interface Service {
  id: ServiceId;
  /** The price line this discipline is billed under. */
  tier: TierId;
  /** The homepage section that covers it in depth, where one exists. */
  anchor?: string;
}

export const services: Service[] = [
  { id: 'websites', tier: 'websites', anchor: '#websites' },
  { id: 'seo', tier: 'searchVisibility', anchor: '#seo-geo' },
  { id: 'geo', tier: 'searchVisibility', anchor: '#seo-geo' },
  { id: 'googleAds', tier: 'paid', anchor: '#paid' },
  { id: 'metaAds', tier: 'paid', anchor: '#paid' },
  { id: 'strategy', tier: 'partner', anchor: '#priser' },
  { id: 'analytics', tier: 'partner', anchor: '#priser' },
  { id: 'care', tier: 'care', anchor: '#priser' },
];

export default services;
