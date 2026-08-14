export interface CaseSection {
  heading: string;
  body: string;
}

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
  alt: string;
  kind: 'browser' | 'phone' | 'photo';
  caption?: string;
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
 * `source` and `period` are what make a number checkable; supply them.
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
  /** URL segment under /projekter */
  slug: string;
  client: string;
  /** Short descriptor shown under the client name. */
  kind: string;
  /** Disciplines involved, used as tags. */
  disciplines: string[];
  /** One sentence, used on cards and as the case's lead. */
  summary: string;
  /** The English-language line that carries the case in editorial contexts. */
  strapline: string;
  /** The situation the work started from. */
  challenge: string;
  /** The narrative sections of the case. */
  sections: CaseSection[];
  /** Concrete things delivered. */
  delivered: string[];
  /** Which of our services this maps to (ids from services.ts). */
  serviceIds: string[];
  /** What this piece of work demonstrates about how we work. */
  demonstrates: string;
  /**
   * What the work consisted of, in one line. Shown in place of results when
   * there are no verified numbers — so the module reads as deliberate rather
   * than as an empty state waiting to be filled.
   */
  proofLine: string;
  logoPath: string;
  logoWebp?: string;
  logoAlt: string;
  /**
   * Per-asset optical tuning. The supplied marks have different amounts of
   * transparent padding baked in; these bring both to a consistent optical
   * size wherever the mark is used as an identifier.
   */
  logoScale: number;
  logoPosition: string;
  url: string;
  /** Timeframe, only where it is known. */
  period?: string;
  /** Any disclosure the reader deserves. */
  disclosure?: string;
  /** Leads /projekter and the homepage's selected work. */
  featured?: boolean;
  /** Real project imagery. */
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
    kind: 'Boutique · Rørvig',
    disciplines: ['Website', 'Search Visibility', 'Meta Ads', 'Digital Strategy'],
    summary:
      'Et digitalt fundament for en fysisk boutique, der skulle være lige så tydelig online som i butikken.',
    strapline: 'From physical concept to coherent digital brand.',
    challenge:
      'Plus Eins havde en stærk fysisk identitet, men den digitale tilstedeværelse fortalte ikke den samme historie. Der manglede et samlet sted, hvor brandet, sortimentet og butikkens tone hang sammen — og et fundament, der kunne bære den videre udvikling.',
    sections: [
      {
        heading: 'Tilgang',
        body: 'Arbejdet startede med at få styr på strukturen frem for at gå direkte til design. Hvad skal en besøgende kunne finde ud af, og i hvilken rækkefølge? Først derefter blev det visuelle lagt ovenpå, så designet understøtter indholdet i stedet for at konkurrere med det.',
      },
      {
        heading: 'Det byggede vi',
        body: 'Et website, der samler brandet, sortimentet og butikkens praktiske oplysninger ét sted. Sideopbygningen er lavet, så nye kategorier og koncepter kan komme til uden at strukturen skal laves om — hvilket blev afgørende, da Deli-konceptet kom til.',
      },
      {
        heading: 'Løbende arbejde',
        body: 'Samarbejdet er fortsat efter lancering med indhold, visuel kommunikation, sociale medier og den løbende marketingretning. Prioriteringen justeres efter, hvad butikken har brug for i den enkelte periode.',
      },
    ],
    delivered: [
      'Website med udbygningsvenlig struktur',
      'Digital brandretning',
      'Indhold og visuel kommunikation',
      'Sociale medier og kampagner',
      'Search Visibility: SEO og GEO',
      'Forberedelse til webshop',
    ],
    serviceIds: ['websites', 'seo', 'meta-ads', 'strategy'],
    demonstrates:
      'At et website skal bygges til det, der kommer bagefter. Strukturen holdt, da et helt nyt koncept skulle ind.',
    proofLine: 'Website · brandsystem · løbende vækstsamarbejde',
    logoPath: '/brand/plus-eins.png',
    logoWebp: '/brand/plus-eins.webp',
    logoAlt: 'Plus Eins',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk',
    period: 'Løbende samarbejde',
    featured: true,
    metrics: [],
    media: {
      desktop: {
        base: '/media/plus-eins-web-desktop',
        chrome: 'pluseins.dk',
        widths: [768, 1200, 1800],
        ratio: 1.6,
        kind: 'browser',
        alt: 'Forsiden af pluseins.dk på desktop med det fuldbredde hero-billede fra gårdhaven.',
      },
      mobile: {
        base: '/media/plus-eins-web-mobile',
        widths: [360, 540, 780],
        ratio: 390 / 844,
        kind: 'phone',
        alt: 'Forsiden af pluseins.dk på mobil med navigation og hero-billede.',
      },
      photos: [
        {
          base: '/media/plus-eins-boutique-photo',
          widths: [640, 1024, 1600],
          ratio: 1.5,
          kind: 'photo',
          alt: 'Plus Eins boutique udefra med parasoller, instruktørstole og kurve på terrassen.',
          caption: 'Boutique',
        },
        {
          base: '/media/plus-eins-salumeria-photo',
          widths: [480, 800, 1200],
          ratio: 0.75,
          kind: 'photo',
          alt: 'Salumeria-disken hos Plus Eins med spegepølser, oste og delikatesser.',
          caption: 'Salumeria',
        },
        {
          base: '/media/plus-eins-interior-photo',
          widths: [640, 1024, 1600],
          ratio: 1.5,
          kind: 'photo',
          alt: 'Plus Eins-bygningen i Rørvig set udefra i aftenlys med lys i vinduerne.',
          caption: 'Butikken',
        },
      ],
      screens: [
        {
          base: '/media/plus-eins-web-boutique',
          chrome: 'pluseins.dk/boutique',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          alt: 'Boutique-siden på pluseins.dk med redaktionel opsætning af billede og tekst.',
          caption: 'Boutique',
        },
        {
          base: '/media/plus-eins-web-salumeria',
          chrome: 'pluseins.dk/salumeria',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          alt: 'Salumeria-siden på pluseins.dk med samme sideskabelon som de øvrige koncepter.',
          caption: 'Salumeria',
        },
      ],
    },
  },
  {
    id: 'plus-eins-deli',
    slug: 'plus-eins-deli',
    client: 'Plus Eins Deli',
    kind: 'Konceptlancering',
    disciplines: ['Konceptlancering', 'Indhold', 'Meta Ads'],
    summary:
      'Lanceringen af et nyt deli-koncept under et eksisterende brand — uden at fortynde det brand, det voksede ud af.',
    strapline: 'A new concept inside an established brand.',
    challenge:
      'Deli-konceptet skulle introduceres som noget nyt og selvstændigt, men stadig høre tydeligt til Plus Eins. For meget adskillelse, og det ville føles som en fremmed forretning. For lidt, og det ville forsvinde i det eksisterende.',
    sections: [
      {
        heading: 'Tilgang',
        body: 'Konceptet blev behandlet som en udvidelse af brandet, ikke som et sidespor. Samme visuelle grundtone, men et eget spor i strukturen, så Deli kan kommunikeres selvstændigt uden at bryde helheden.',
      },
      {
        heading: 'Lanceringen',
        body: 'Selve introduktionen blev kørt digitalt gennem website, indhold og sociale medier med en samlet retning frem for spredte opslag. Det digitale fundament var på plads, før kommunikationen gik i luften — ikke omvendt.',
      },
    ],
    delivered: [
      'Digital lancering af konceptet',
      'Indhold og visuel kommunikation',
      'Integration i den eksisterende sidestruktur',
      'Kampagner og løbende synlighed',
    ],
    serviceIds: ['websites', 'meta-ads', 'strategy'],
    demonstrates:
      'At en lancering er et struktur- og timingproblem lige så meget som et designproblem.',
    proofLine: 'Konceptside · lanceringsindhold · kampagner',
    logoPath: '/brand/plus-eins.png',
    logoWebp: '/brand/plus-eins.webp',
    logoAlt: 'Plus Eins Deli',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk/deli',
    period: 'Løbende samarbejde',
    disclosure: 'Del af det løbende samarbejde med Plus Eins.',
    metrics: [],
    media: {
      desktop: {
        base: '/media/plus-eins-deli-web-desktop',
        chrome: 'pluseins.dk/deli',
        widths: [768, 1200, 1800],
        ratio: 1.6,
        kind: 'browser',
        alt: 'Deli-siden på pluseins.dk med overskriften Deli ved siden af et stort billede af en focaccia.',
      },
      mobile: {
        base: '/media/plus-eins-deli-web-mobile',
        widths: [360, 540, 780],
        ratio: 390 / 844,
        kind: 'phone',
        alt: 'Deli-siden på pluseins.dk vist på mobil.',
      },
      photos: [
        {
          base: '/media/plus-eins-deli-photo',
          widths: [480, 800, 1100],
          ratio: 1,
          kind: 'photo',
          alt: 'Focaccia med prosciutto di Parma, tomat og rucola fra Plus Eins Deli.',
          caption: 'Deli',
        },
      ],
    },
  },
  {
    id: 'mowe-systems',
    slug: 'mowe-systems',
    client: 'MOWE Systems',
    kind: 'SaaS · AI visibility',
    disciplines: ['Brand', 'Produkt', 'Website', 'Search Visibility'],
    summary:
      'Fra kompleks softwareidé til et produkt, man kan forstå på tredive sekunder — og en platform, der kan vokse.',
    strapline: 'A new category, explained in thirty seconds.',
    challenge:
      'MOWE Systems er en AI visibility-platform. Den slags produkt er svært at sælge, fordi kategorien er ny: folk skal først forstå, at problemet findes, før de kan se værdien af løsningen. Teknisk kompleksitet skulle formidles uden at blive utilgængelig.',
    sections: [
      {
        heading: 'Positionering først',
        body: 'Før der blev skrevet en linje kode til websitet, blev det afklaret, hvad produktet er, hvem det er for, og hvilket problem det løser i et sprog en beslutningstager kan bruge. Positioneringen blev fundamentet for både produktstruktur og kommunikation.',
      },
      {
        heading: 'Produkt og website som ét',
        body: 'Websitet og produktets egen struktur blev udviklet i sammenhæng, så måden produktet forklares på, matcher måden det faktisk fungerer på. Det gør både onboarding og salg lettere, fordi der ikke er et spring mellem løfte og virkelighed.',
      },
      {
        heading: 'Synlighed i en ny kategori',
        body: 'Search Visibility blev bygget ind fra start. Når kategorien er ny, er der få etablerede søgninger at kæmpe om — til gengæld er der en reel mulighed for at blive den kilde, både søgemaskiner og AI-assistenter trækker på.',
      },
    ],
    delivered: [
      'Brand og positionering',
      'Website og produktkommunikation',
      'Produktarkitektur og konverteringsstruktur',
      'Search Visibility: SEO- og GEO-strategi',
      'Teknisk fundament for platformen',
    ],
    serviceIds: ['websites', 'seo', 'tracking', 'strategy'],
    demonstrates:
      'At teknisk dybde og enkel kommunikation ikke er modsætninger. Det svære er at gøre det komplekse forståeligt uden at gøre det forkert.',
    proofLine: 'Positionering · produktarkitektur · website · Search Visibility',
    logoPath: '/brand/mowe-systems.png',
    logoWebp: '/brand/mowe-systems.webp',
    logoAlt: 'MOWE Systems',
    // The mark occupies roughly the upper 60% of a square canvas with heavy
    // asymmetric transparent padding; scale up and pull toward the mark.
    logoScale: 1.5,
    logoPosition: '50% 38%',
    url: 'https://mowesystems.com',
    disclosure:
      'MOWE Systems er skabt og udviklet af samme person, der står bag Aagesen Growth.',
    metrics: [],
    media: {
      desktop: {
        base: '/media/mowe-web-desktop',
        chrome: 'mowesystems.com',
        widths: [768, 1200, 1800],
        ratio: 1.6,
        kind: 'browser',
        alt: 'Forsiden af mowesystems.com med overskriften Get Found Before Your Competitors og analyseformularen.',
      },
      mobile: {
        base: '/media/mowe-web-mobile',
        widths: [360, 540, 780],
        ratio: 390 / 844,
        kind: 'phone',
        alt: 'Forsiden af mowesystems.com vist på mobil.',
      },
      screens: [
        {
          base: '/media/mowe-web-product',
          chrome: 'mowesystems.com',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          alt: 'Produktsektionen på mowesystems.com, der stiller synlighed før og efter op mod hinanden.',
          caption: 'Før og efter',
        },
        {
          base: '/media/mowe-web-steps',
          chrome: 'mowesystems.com',
          widths: [768, 1200, 1800],
          ratio: 1.6,
          kind: 'browser',
          alt: 'Sektionen på mowesystems.com, der forklarer produktet i tre trin.',
          caption: 'Produktet i tre trin',
        },
      ],
    },
  },
];

export const getCaseBySlug = (slug: string) => cases.find((item) => item.slug === slug);

/** The case that leads /projekter and the homepage. Falls back to the first. */
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
