/**
 * Pricing — structure only.
 *
 * Amounts live here; every word that describes them lives in the dictionary
 * under `pricing.tiers.<id>`, so a price can be changed in one place and a
 * translation cannot drift away from the number it describes.
 *
 * All amounts are DKK excluding VAT, and all of them are floors: the site
 * says "from" everywhere these are rendered.
 */
export type TierId = 'websites' | 'searchVisibility' | 'paid' | 'partner' | 'care';

export interface PricingTier {
  id: TierId;
  /** Starting price in DKK, excluding VAT. */
  from: number;
  unit: 'once' | 'month';
  /** The recurring offer the business most wants to sell. */
  featured?: boolean;
  /** Where the CTA for this tier goes on the homepage. */
  anchor: string;
}

export const tiers: PricingTier[] = [
  { id: 'websites', from: 12500, unit: 'once', anchor: '#websites' },
  { id: 'searchVisibility', from: 3500, unit: 'month', anchor: '#seo-geo' },
  { id: 'paid', from: 2500, unit: 'month', anchor: '#paid' },
  { id: 'partner', from: 7500, unit: 'month', featured: true, anchor: '#priser' },
  { id: 'care', from: 599, unit: 'month', anchor: '#priser' },
];

export const tierById = (id: TierId) => tiers.find((tier) => tier.id === id);

export default tiers;
