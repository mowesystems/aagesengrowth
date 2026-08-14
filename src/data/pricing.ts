export type BillingPeriod = 'one-time' | 'monthly' | 'hourly';

export interface PricingItem {
  id: string;
  name: string;
  /** Plain expansion shown under the name, where the name alone is not enough. */
  nameNote?: string;
  price: number;
  pricePrefix?: 'Fra';
  billingPeriod: BillingPeriod;
  priceSuffix?: string;
  description: string;
  featureLabel?: 'Inkluderer' | 'Kan inkludere' | 'Kan sammensættes af' | 'Bruges til';
  features: string[];
  exclusions?: string[];
  note?: string;
  recommended?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export const formatAmount = (amount: number) =>
  new Intl.NumberFormat('da-DK', { maximumFractionDigits: 0 }).format(amount);

export const formatPrice = ({ price, pricePrefix, billingPeriod, priceSuffix }: PricingItem) => {
  const prefix = pricePrefix ? `${pricePrefix} ` : '';
  const period = billingPeriod === 'monthly' ? '/md.' : billingPeriod === 'hourly' ? '/time' : '';
  const suffix = priceSuffix ? ` ${priceSuffix}` : '';
  return `${prefix}${formatAmount(price)} kr.${period}${suffix}`;
};

/** The price split into parts, so it can be typeset rather than printed as one string. */
export const priceParts = (item: PricingItem) => ({
  prefix: item.pricePrefix ?? '',
  amount: `${formatAmount(item.price)} kr.`,
  period:
    item.billingPeriod === 'monthly' ? '/md.' : item.billingPeriod === 'hourly' ? '/time' : '',
  suffix: item.priceSuffix ?? '',
});

/**
 * Structured-data offer for a pricing item.
 *
 * "Fra"-priced items are emitted as a PriceSpecification with minPrice rather
 * than a flat `price`, so the markup does not claim a fixed price the site
 * never promises. Everything here matches what is rendered on screen.
 */
export const toOfferSchema = (item: PricingItem, url: string) => {
  const isFrom = item.pricePrefix === 'Fra';
  return {
    '@type': 'Offer',
    name: item.name,
    priceCurrency: 'DKK',
    url,
    ...(isFrom
      ? {
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: item.price,
            priceCurrency: 'DKK',
            valueAddedTaxIncluded: false,
          },
        }
      : {
          price: item.price,
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: item.price,
            priceCurrency: 'DKK',
            valueAddedTaxIncluded: false,
          },
        }),
  };
};

export const websitePackages: PricingItem[] = [
  {
    id: 'launch',
    name: 'Launch',
    price: 9995,
    billingPeriod: 'one-time',
    description: 'En professionel virksomhedshjemmeside til dig, der skal hurtigt og ordentligt online.',
    features: [
      'Op til 5 sider',
      'Responsivt design',
      'Kontaktformular',
      'Grundlæggende teknisk SEO',
      'Google Analytics-opsætning',
      'Cookiebanner',
      'Grundlæggende hastighedsoptimering',
      'Hjælp til domæne og hosting',
      '2 korrekturrunder',
    ],
    note: 'Tekster, billeder, logo og øvrigt materiale leveres som udgangspunkt af kunden.',
    ctaLabel: 'Få et tilbud',
    ctaHref: '/kontakt',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 14995,
    billingPeriod: 'one-time',
    description: 'Til virksomheder, der vil bruge hjemmesiden aktivt til at skabe tillid, synlighed og henvendelser.',
    features: [
      'Alt fra Launch',
      'Mere skræddersyet design og struktur',
      'Flere relevante undersider',
      'Konverteringsoptimering',
      'Udvidet SEO-opsætning',
      'Forberedelse til AI-synlighed og GEO',
      'Flere formularer eller kontaktpunkter',
      'Udvidet tracking',
      '3 korrekturrunder',
    ],
    recommended: true,
    ctaLabel: 'Book en afklaring',
    ctaHref: '/book-moede',
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 24995,
    pricePrefix: 'Fra',
    billingPeriod: 'one-time',
    description: 'Til virksomheder med særlige funktioner, integrationer eller mere komplekse behov.',
    featureLabel: 'Kan inkludere',
    features: [
      'Bookingfunktion',
      'Kundelogin',
      'Medlemssystem',
      'Specialfunktioner',
      'API-integrationer',
      'Eksterne systemer',
      'Avanceret tracking',
      'Særligt design- eller indholdsbehov',
      'Mere komplekse brugerrejser',
    ],
    note: 'Pris og tidsplan fastlægges efter en indledende afklaring.',
    ctaLabel: 'Tal med os om projektet',
    ctaHref: '/kontakt',
  },
];

export const carePackages: PricingItem[] = [
  {
    id: 'hosting',
    name: 'Hosting',
    price: 299,
    billingPeriod: 'monthly',
    description: 'Stabil og sikker drift af jeres hjemmeside.',
    features: ['Hosting', 'SSL', 'Backup', 'Oppetidsovervågning', 'Grundlæggende sikkerhedsopdateringer'],
    exclusions: ['Indholdsændringer og udviklingsopgaver er ikke inkluderet.'],
    ctaLabel: 'Vælg Hosting',
    ctaHref: '/kontakt',
  },
  {
    id: 'care',
    name: 'Care',
    price: 999,
    billingPeriod: 'monthly',
    description: 'Til virksomhedshjemmesider, der skal holdes teknisk opdaterede og få små ændringer løbende.',
    features: [
      'Alt fra Hosting',
      'Op til 30 minutters mindre ændringer pr. måned',
      'System- og pluginopdateringer, hvor det er relevant',
      'Teknisk vedligeholdelse',
      'Prioriteret support',
    ],
    exclusions: ['Ubrugt tid overføres ikke til næste måned. Nye sider, funktioner og større designændringer afregnes separat.'],
    note: 'Mindre ændringer er fx tekstændringer, udskiftning af eksisterende billeder, åbningstider og små justeringer på eksisterende sider.',
    recommended: true,
    ctaLabel: 'Vælg Care',
    ctaHref: '/kontakt',
  },
  {
    id: 'premium-care',
    name: 'Premium Care',
    price: 1499,
    billingPeriod: 'monthly',
    description: 'Mere løbende hjælp og et tættere teknisk eftersyn.',
    features: [
      'Alt fra Care',
      'Op til 2 timers mindre ændringer pr. måned',
      'Månedlig teknisk gennemgang',
      'Performance-kontrol',
      'Teknisk SEO-vedligeholdelse',
      'Hurtigere prioritering af support',
    ],
    exclusions: ['Større udviklingsopgaver, nye integrationer og omfattende redesign er ikke inkluderet.'],
    ctaLabel: 'Vælg Premium Care',
    ctaHref: '/kontakt',
  },
];

export const marketingServices: PricingItem[] = [
  {
    // The id stays `seo-ai` so existing links, anchors and service mappings
    // keep resolving; only the visible name changed.
    id: 'seo-ai',
    name: 'Search Visibility',
    nameNote: 'SEO + GEO/AI-synlighed',
    price: 2995,
    pricePrefix: 'Fra',
    billingPeriod: 'monthly',
    description: 'Et løbende arbejde med at gøre virksomheden lettere at finde og forstå i søgemaskiner og AI-søgninger.',
    features: ['Teknisk SEO', 'On-page-prioritering', 'Struktur og intern linking', 'AI-synlighed og GEO', 'Månedlig handlingsplan', 'Rapportering'],
    exclusions: ['Løbende produktion af større mængder tekst og content er ikke inkluderet, medmindre det aftales særskilt.'],
    ctaLabel: 'Tal om Search Visibility',
    ctaHref: '/kontakt',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    price: 2995,
    pricePrefix: 'Fra',
    billingPeriod: 'monthly',
    priceSuffix: 'plus annoncebudget',
    description: 'Struktureret annoncering mod den aktive efterspørgsel med tydelig tracking og løbende optimering.',
    features: ['Indledende gennemgang', 'Søgeordsanalyse', 'Kampagnestruktur', 'Annonceopsætning', 'Konverteringssporing', 'Løbende optimering', 'Månedlig rapportering'],
    exclusions: [
      'Annoncebudget afregnes direkte af kunden.',
      'Prisen afhænger af antal kampagner, markeder og kompleksitet.',
      'Omfattende produktion af billeder, video og landingssider er ikke inkluderet.',
    ],
    ctaLabel: 'Tal om Google Ads',
    ctaHref: '/kontakt',
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    price: 2495,
    pricePrefix: 'Fra',
    billingPeriod: 'monthly',
    priceSuffix: 'plus annoncebudget',
    description: 'Kampagner på Facebook og Instagram med fokus på målgrupper, retargeting og løbende forbedring.',
    features: ['Kampagneopsætning', 'Målgruppeopsætning', 'Retargeting', 'Placeringer', 'Budgetstyring', 'Løbende optimering', 'Månedlig rapportering'],
    exclusions: ['Annoncemateriale leveres af kunden eller aftales som et særskilt tilkøb. Aagesen Growth producerer ikke løbende organisk content som en del af standardaftalen.'],
    ctaLabel: 'Tal om Meta Ads',
    ctaHref: '/kontakt',
  },
  {
    id: 'tracking',
    name: 'Tracking og analyse',
    price: 2995,
    pricePrefix: 'Fra',
    billingPeriod: 'one-time',
    priceSuffix: 'som engangsopsætning',
    description: 'Et målbart fundament, der gør det muligt at se, hvad der skaber handling.',
    featureLabel: 'Kan inkludere',
    features: ['GA4', 'Google Tag Manager', 'Meta Pixel', 'Konverteringssporing', 'Events', 'Grundlæggende måleplan', 'Kontrol af tracking'],
    ctaLabel: 'Få tracking på plads',
    ctaHref: '/kontakt',
  },
  {
    id: 'speed',
    name: 'Hastighedsoptimering',
    price: 2995,
    pricePrefix: 'Fra',
    billingPeriod: 'one-time',
    description: 'Teknisk gennemgang og forbedringer af en eksisterende hjemmesides performance.',
    featureLabel: 'Kan inkludere',
    features: ['Performance-analyse', 'Billedoptimering', 'Cache', 'Lazy loading', 'Core Web Vitals', 'Teknisk oprydning'],
    note: 'Resultatet afhænger af den eksisterende løsning, hosting og tredjepartskode. Der garanteres ikke en bestemt PageSpeed-score.',
    ctaLabel: 'Få en vurdering',
    ctaHref: '/kontakt',
  },
  {
    id: 'seo-audit',
    name: 'Search Visibility Audit',
    price: 4995,
    billingPeriod: 'one-time',
    description: 'En samlet analyse, der peger på de vigtigste muligheder og næste handlinger.',
    features: ['Teknisk analyse', 'On-page-analyse', 'Søgeordsanalyse', 'Konkurrentoverblik', 'Prioriteret handlingsplan'],
    ctaLabel: 'Bestil en Search Visibility Audit',
    ctaHref: '/kontakt',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce-optimering',
    price: 6995,
    pricePrefix: 'Fra',
    billingPeriod: 'one-time',
    description: 'Optimering af en eksisterende WooCommerce-løsning — ikke opbygning af en komplet ny webshop.',
    featureLabel: 'Kan inkludere',
    features: ['Template-justering', 'Forside', 'Produktsider', 'Kategorisider', 'Kurv', 'Checkout', 'Header og footer', 'Mobiloptimering', 'Visuelle og konverteringsmæssige forbedringer'],
    exclusions: ['Specialintegrationer, migrering, produktindtastning og omfattende specialudvikling prissættes separat.'],
    ctaLabel: 'Tal om WooCommerce',
    ctaHref: '/kontakt',
  },
  {
    id: 'hourly-help',
    name: 'Timebaseret hjælp',
    price: 850,
    billingPeriod: 'hourly',
    description: 'Til mindre eller uforudsete opgaver, hvor en fast aftale ikke er den rigtige ramme.',
    featureLabel: 'Bruges til',
    features: ['Mindre opgaver uden en fast aftale', 'Tekniske rettelser', 'Fejlfinding', 'Mindre designændringer', 'Rådgivning', 'Opgaver uden for inkluderet månedstid'],
    note: 'Minimumsfakturering er 30 minutter.',
    ctaLabel: 'Beskriv opgaven',
    ctaHref: '/kontakt',
  },
];

export const growthPartner: PricingItem = {
  id: 'growth-partner',
  name: 'Growth Partner',
  price: 5995,
  pricePrefix: 'Fra',
  billingPeriod: 'monthly',
  description: 'En samlet løsning til virksomheder, der ønsker ét sted til digital synlighed, annoncering, tracking og løbende drift.',
  featureLabel: 'Kan sammensættes af',
  features: ['Search Visibility (SEO + GEO)', 'Google Ads eller Meta Ads', 'Tracking', 'Månedlig rapportering', 'Løbende prioritering', 'Hosting og Care'],
  exclusions: [
    'Annoncebudget afregnes separat.',
    'Contentproduktion er ikke inkluderet som standard.',
    'Endelig pris afhænger af antal kanaler, markeder og kampagner.',
    'Aftalens konkrete leverancer beskrives skriftligt før opstart.',
  ],
  ctaLabel: 'Få sammensat en løsning',
  ctaHref: '/kontakt',
};

export const growthPartnerBundle = {
  price: 599,
  billingPeriod: 'monthly' as const,
  description: 'Ved en samlet løbende aftale med mindst to marketingydelser kan Hosting og Care tilbydes til',
};

export const adMaterialDisclaimer =
  'Annoncebudget afregnes separat. Annoncemateriale leveres af kunden eller aftales som et særskilt tilkøb.';

export const pricingNote =
  'Alle priser er vejledende og eksklusive moms. Endelig pris afhænger af opgavens omfang, eksisterende materiale, funktioner og tekniske krav. Den konkrete leverance, tidsplan og betalingsplan fremgår af det skriftlige tilbud.';

export const allPricingItems = [
  ...websitePackages,
  ...carePackages,
  ...marketingServices,
  growthPartner,
];

/** Look up a price by id so a service section can quote it without hardcoding. */
export const getPricingItem = (id?: string) =>
  id ? allPricingItems.find((item) => item.id === id) : undefined;

/** Short "from" line for a service, derived from the single pricing source. */
export const priceLabelFor = (id?: string) => {
  const item = getPricingItem(id);
  return item ? formatPrice(item) : undefined;
};
