/**
 * Projects — structure and media only.
 *
 * Every word a reader sees lives in the dictionary under `work.cases.<id>`,
 * including image alt text: alt has to be in the language the page is being
 * read in, or a screen reader announces Danish in the middle of English.
 * `mediaKey` is what ties an asset here to its description there.
 */

/**
 * A responsive image from the local media set.
 *
 * `base` is the path without the width suffix or extension; every entry has an
 * AVIF and a WebP at each listed width, generated from real project material.
 * `ratio` is width / height and is used to reserve space so nothing shifts.
 */
export interface CaseImage {
  base: string;
  widths: number[];
  ratio: number;
  kind: 'browser' | 'phone' | 'photo';
  /** Key into `work.cases.<id>.media` for alt text and caption. */
  mediaKey: string;
  /** Address shown in the browser frame's bar. Decorative. */
  chrome?: string;
}

export interface CaseMedia {
  /** The desktop website preview. Doubles as the case's lead image. */
  desktop?: CaseImage;
  /** The mobile website preview, shown beside or below the desktop one. */
  mobile?: CaseImage;
  /** Authentic project photography. */
  photos?: CaseImage[];
  /** Further screens from the same project: other templates, other views. */
  screens?: CaseImage[];
}

/**
 * A result.
 *
 * Nothing renders unless `verified` is true. The flag exists so that a number
 * can be added to this file the moment it can be stood behind, without any
 * component changing — and so that nothing can leak onto the site before then.
 */
export interface CaseMetric {
  value: string;
  label: string;
  source?: string;
  period?: string;
  verified: boolean;
}

/**
 * A client quote. Renders only when both the quote and its attribution exist,
 * so a half-filled entry cannot produce an anonymous testimonial.
 */
export interface CaseTestimonial {
  quote: string;
  name: string;
  role?: string;
}

export interface CaseItem {
  id: string;
  /** URL segment under the work index. Shared across languages. */
  slug: string;
  /** A proper noun — the same in every language. */
  client: string;
  logoPath: string;
  logoWebp?: string;
  /**
   * Per-asset optical tuning. The supplied marks have different amounts of
   * transparent padding baked in; these bring both to a consistent optical
   * size wherever the mark is used as an identifier.
   */
  logoScale: number;
  logoPosition: string;
  url: string;
  /** Leads the work index and the homepage's selected work. */
  featured?: boolean;
  media?: CaseMedia;
  /** Verified results only. Empty until numbers can be stood behind. */
  metrics?: CaseMetric[];
  /** Only rendered when a real quote and a real name are both present. */
  testimonial?: CaseTestimonial;
}

export const cases: CaseItem[] = [
  {
    id: 'plus-eins',
    slug: 'plus-eins',
    client: 'Plus Eins',
    logoPath: '/brand/plus-eins.png',
    logoWebp: '/brand/plus-eins.webp',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk',
    featured: true,
    metrics: [],
    media: {
      desktop: {
        base: '/media/plus-eins-web-desktop',
        chrome: 'pluseins.dk',
        widths: [768, 1200, 1800],
        ratio: 1.6,
        kind: 'browser',
        mediaKey: 'desktop',
      },
      mobile: {
        base: '/media/plus-eins-web-mobile',
        widths: [360, 540, 780],
        ratio: 390 / 844,
        kind: 'phone',
        mediaKey: 'mobile',
      },
      photos: [
        {
          base: '/media/plus-eins-boutique-photo',
          widths: [640, 1024, 1600],
          ratio: 1.5,
          kind: 'photo',
          mediaKey: 'photoBoutique',
        },
        {
          base: '/media/plus-eins-salumeria-photo',
          widths: [480, 800, 1200],
          ratio: 0.75,
          kind: 'photo',
          mediaKey: 'photoSalumeria',
        },
        {
          base: '/media/plus-eins-interior-photo',
          widths: [640, 1024, 1600],
          ratio: 1.5,
          kind: 'photo',
          mediaKey: 'photoExterior',
        },
      ],
      screens: [
        {
          base: '/media/plus-eins-web-boutique',
          chrome: 'pluseins.dk/boutique',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          mediaKey: 'screenBoutique',
        },
        {
          base: '/media/plus-eins-web-salumeria',
          chrome: 'pluseins.dk/salumeria',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          mediaKey: 'screenSalumeria',
        },
      ],
    },
  },
  {
    id: 'plus-eins-deli',
    slug: 'plus-eins-deli',
    client: 'Plus Eins Deli',
    logoPath: '/brand/plus-eins.png',
    logoWebp: '/brand/plus-eins.webp',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk/deli',
    metrics: [],
    media: {
      desktop: {
        base: '/media/plus-eins-deli-web-desktop',
        chrome: 'pluseins.dk/deli',
        widths: [768, 1200, 1800],
        ratio: 1.6,
        kind: 'browser',
        mediaKey: 'desktop',
      },
      mobile: {
        base: '/media/plus-eins-deli-web-mobile',
        widths: [360, 540, 780],
        ratio: 390 / 844,
        kind: 'phone',
        mediaKey: 'mobile',
      },
      photos: [
        {
          base: '/media/plus-eins-deli-photo',
          widths: [480, 800, 1100],
          ratio: 1,
          kind: 'photo',
          mediaKey: 'photoDeli',
        },
      ],
    },
  },

];

export const getCaseBySlug = (slug: string) => cases.find((item) => item.slug === slug);

/** The case that leads the work index and the homepage. Falls back to the first. */
export const featuredCase = cases.find((item) => item.featured) ?? cases[0];

/** Everything except the featured case, in order. */
export const supportingCases = cases.filter((item) => item.id !== featuredCase.id);

/** Verified metrics only. Anything unverified never reaches a component. */
export const verifiedMetrics = (item: CaseItem) =>
  (item.metrics ?? []).filter((metric) => metric.verified);

/** A testimonial is only real when there is both something said and someone who said it. */
export const usableTestimonial = (item: CaseItem) =>
  item.testimonial?.quote?.trim() && item.testimonial?.name?.trim() ? item.testimonial : undefined;

export default cases;
