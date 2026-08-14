export type ServiceTier = 'pillar' | 'supporting';

export interface Service {
  id: string;
  index: string;
  /**
   * The name shown to visitors. Changing this is safe: every surface reads it
   * from here. The `id` is the stable key — `seo` keeps its id and its
   * /ydelser#seo anchor even though it is now called Search Visibility.
   */
  title: string;
  /** Compact label for tags, tickers and chips where the full name is too long. */
  shortTitle: string;
  /** Plain-language expansion of the name, where the name alone is not enough. */
  explainer?: string;
  /** Whether this leads the commercial story or supports it. */
  tier: ServiceTier;
  /** The problem this solves, in the client's words. */
  problem: string;
  /** One-line summary used in compact contexts. */
  description: string;
  /** Who this is the right call for. */
  suitedFor: string;
  /** What the work concretely covers. */
  includes: string[];
  /** What it does not cover. Stated up front, not buried. */
  excludes: string[];
  /** Can it be bought on its own, or does it need something else in place? */
  standalone: string;
  /** Anchor on /ydelser */
  href: string;
  /** Anchor on /priser */
  pricingHref: string;
  /** Matching entry in pricing data, when there is one. */
  pricingId?: string;
}

export const services: Service[] = [
  {
    id: 'websites',
    index: '01',
    title: 'Websites & Conversion',
    shortTitle: 'Websites',
    tier: 'pillar',
    problem:
      'Hjemmesiden ser forældet ud, siger ikke tydeligt hvad I laver, og de besøgende tager ikke kontakt.',
    description:
      'Et website bygget til at skabe tillid og henvendelser — ikke bare til at eksistere.',
    suitedFor:
      'Virksomheder, der skal have et nyt website, eller hvis nuværende side ikke længere matcher forretningen.',
    includes: [
      'Struktur, indholdsplan og brugerrejse',
      'Design og udvikling',
      'Konverteringspunkter og formularer',
      'Landingssider til kampagner',
      'Teknisk SEO-fundament',
      'Tracking-opsætning, så alt efterfølgende kan måles',
      'Hastigheds- og mobiloptimering',
      'Oplæring i at redigere indholdet',
    ],
    excludes: [
      'Tekstforfatning og fotografering i større omfang',
      'Løbende contentproduktion efter lancering',
    ],
    standalone: 'Kan købes alene. Hosting og Care kan tilkøbes, men er ikke et krav.',
    href: '/ydelser#websites',
    pricingHref: '/priser#hjemmesider',
    pricingId: 'launch',
  },
  {
    id: 'seo',
    index: '02',
    // Renamed in visible copy. The id and the /ydelser#seo anchor are unchanged,
    // so every existing link and bookmark still lands in the right place.
    title: 'Search Visibility',
    shortTitle: 'Search Visibility',
    explainer: 'SEO + GEO/AI-synlighed',
    tier: 'pillar',
    problem:
      'I bliver ikke fundet på det, I gerne vil findes på — hverken i Google eller når nogen spørger en AI-assistent.',
    description:
      'Teknisk SEO, søgeintention og struktureret indhold, så I er til at finde og til at citere.',
    suitedFor:
      'Virksomheder med et fungerende website, der skal have flere besøgende fra søgning over tid.',
    includes: [
      'Teknisk SEO og indeksering',
      'Søgeords- og intentionsanalyse',
      'On-page-prioritering',
      'Indholdsstruktur og intern linking',
      'Struktureret data og schema',
      'GEO: synlighed i AI-assisteret søgning',
      'Månedlig handlingsplan og rapportering',
    ],
    excludes: [
      'Løbende produktion af større mængder tekst, medmindre det aftales særskilt',
      'Køb af links',
    ],
    standalone:
      'Kan købes alene, men virker bedst når det tekniske fundament på websitet er på plads.',
    href: '/ydelser#seo',
    pricingHref: '/priser#marketing',
    pricingId: 'seo-ai',
  },
  {
    id: 'google-ads',
    index: '03',
    title: 'Google Ads',
    shortTitle: 'Google Ads',
    tier: 'pillar',
    problem: 'I betaler for klik uden at vide, hvilke af dem der rent faktisk bliver til kunder.',
    description: 'Struktureret annoncering mod den aktive efterspørgsel, med tracking der holder.',
    suitedFor: 'Virksomheder med et produkt eller en ydelse, folk allerede søger aktivt efter.',
    includes: [
      'Gennemgang af eksisterende konto',
      'Søgeordsanalyse og kampagnestruktur',
      'Annonceopsætning',
      'Konverteringssporing',
      'Løbende optimering og budgetstyring',
      'Månedlig rapportering',
    ],
    excludes: [
      'Annoncebudget — det betales direkte til Google af jer',
      'Produktion af billeder, video og landingssider i større omfang',
    ],
    standalone:
      'Kan købes alene. Kræver dog tracking, der virker — ellers ved vi ikke, hvad der virker.',
    href: '/ydelser#google-ads',
    pricingHref: '/priser#marketing',
    pricingId: 'google-ads',
  },
  {
    id: 'meta-ads',
    index: '04',
    title: 'Meta Ads',
    shortTitle: 'Meta Ads',
    tier: 'pillar',
    problem:
      'I vil skabe efterspørgsel hos folk, der endnu ikke søger efter jer — men ved ikke, hvor I skal starte.',
    description:
      'Kampagner på Facebook og Instagram med målgrupper, retargeting og løbende justering.',
    suitedFor: 'Virksomheder med et visuelt produkt eller et tilbud, der kan forklares hurtigt.',
    includes: [
      'Kampagne- og kontoopsætning',
      'Målgrupper og retargeting',
      'Test af annoncevinkler på det materiale, der er',
      'Placeringer og budgetstyring',
      'Løbende optimering',
      'Månedlig rapportering',
    ],
    excludes: [
      'Annoncebudget — det betales direkte til Meta af jer',
      'Annoncemateriale: billeder og video leveres af jer eller aftales som særskilt tilkøb',
      'Løbende organisk opslag og community management',
    ],
    standalone: 'Kan købes alene. Kræver brugbart annoncemateriale for at give mening.',
    href: '/ydelser#meta-ads',
    pricingHref: '/priser#marketing',
    pricingId: 'meta-ads',
  },
  {
    id: 'tracking',
    index: '05',
    title: 'Tracking og analyse',
    shortTitle: 'Tracking',
    tier: 'supporting',
    problem:
      'Tallene i Analytics siger ikke noget om, hvad der faktisk skaber henvendelser og salg.',
    description: 'Et målegrundlag, så beslutninger bygger på data i stedet for fornemmelser.',
    suitedFor: 'Alle, der bruger penge på markedsføring uden et klart billede af effekten.',
    includes: [
      'GA4 og Google Tag Manager',
      'Meta Pixel',
      'Konverteringssporing og events',
      'Grundlæggende måleplan',
      'Validering af at tracking rent faktisk måler rigtigt',
    ],
    excludes: ['Serverside-tracking og avancerede dataopsætninger prissættes særskilt'],
    standalone: 'Kan købes alene som en afgrænset engangsopgave.',
    href: '/ydelser#tracking',
    pricingHref: '/priser#marketing',
    pricingId: 'tracking',
  },
  {
    id: 'hosting',
    index: '06',
    title: 'Hosting og vedligeholdelse',
    shortTitle: 'Hosting',
    tier: 'supporting',
    problem:
      'Ingen har ansvaret for, at siden kører, bliver opdateret og har en backup, hvis noget går galt.',
    description: 'Drift, opdateringer og et aftalt serviceniveau — så det ikke ligger hos jer.',
    suitedFor: 'Virksomheder, der ikke har nogen internt til at holde øje med det tekniske.',
    includes: [
      'Hosting, SSL og backup',
      'Oppetidsovervågning',
      'Sikkerheds- og systemopdateringer',
      'Inkluderet tid til mindre ændringer på Care og Premium Care',
      'Prioriteret support',
    ],
    excludes: [
      'Nye sider, ny funktionalitet og større designændringer',
      'Ubrugt månedstid overføres ikke',
    ],
    standalone: 'Kan købes alene til et eksisterende website.',
    href: '/ydelser#hosting',
    pricingHref: '/priser#hosting',
    pricingId: 'care',
  },
  {
    id: 'woocommerce',
    index: '07',
    title: 'WooCommerce-optimering',
    shortTitle: 'WooCommerce',
    tier: 'supporting',
    problem:
      'Webshoppen har besøgende og produkter, men kurven bliver forladt og mobiloplevelsen halter.',
    description: 'Målrettede forbedringer af en eksisterende webshop — fra produktside til checkout.',
    suitedFor: 'Virksomheder med en WooCommerce-shop, der fungerer, men ikke konverterer godt nok.',
    includes: [
      'Forside, produkt- og kategorisider',
      'Kurv og checkout',
      'Header, footer og navigation',
      'Mobiloptimering',
      'Visuelle og konverteringsmæssige forbedringer',
    ],
    excludes: [
      'Opbygning af en helt ny webshop',
      'Migrering, produktindtastning og specialintegrationer',
    ],
    standalone: 'Kan købes alene. Forudsætter en eksisterende WooCommerce-løsning.',
    href: '/ydelser#woocommerce',
    pricingHref: '/priser#marketing',
    pricingId: 'woocommerce',
  },
  {
    id: 'strategy',
    index: '08',
    title: 'Strategisk rådgivning',
    shortTitle: 'Strategi',
    tier: 'supporting',
    problem: 'Der er for mange mulige indsatser, og ingen klar rækkefølge at gøre dem i.',
    description: 'En prioriteret plan for, hvad der skal ske først, hvorfor — og hvad der kan vente.',
    suitedFor: 'Virksomheder, der har brug for retning, før de bruger penge på eksekvering.',
    includes: [
      'Gennemgang af nuværende setup',
      'Prioriteret handlingsplan',
      'Løbende sparring',
      'Roadmap for de kommende måneder',
    ],
    excludes: ['Selve eksekveringen — den aftales som en separat leverance'],
    standalone: 'Kan købes alene, og er ofte det rigtige første skridt.',
    href: '/ydelser#strategy',
    pricingHref: '/priser#growth-partner',
    pricingId: 'growth-partner',
  },
];

export const getService = (id: string) => services.find((service) => service.id === id);

/* ==========================================================================
   Commercial pillars

   Eight services is the truth of what can be bought. It is not the right
   opening argument. Five pillars carry the first encounter; every one of them
   resolves to the same underlying service data, so nothing is duplicated and
   nothing is hidden.
   ========================================================================== */

export interface Pillar {
  id: string;
  index: string;
  /** Visible name. */
  title: string;
  /** Plain expansion, where the name needs one. */
  explainer?: string;
  /** The commercial promise, in one line. */
  promise: string;
  /** Four to six concrete things this covers. */
  covers: string[];
  /** Underlying services, in the order they should be read. */
  serviceIds: string[];
  /** Anchor on /ydelser. */
  href: string;
}

export const pillars: Pillar[] = [
  {
    id: 'websites',
    index: '01',
    title: 'Websites & Conversion',
    promise:
      'Et website, der er bygget til at blive brugt: hurtigt på mobil, tydeligt i sin struktur og målbart fra dag ét.',
    covers: [
      'Struktur og brugerrejse',
      'Design og udvikling',
      'Konverteringspunkter',
      'Landingssider',
      'Mobil-performance',
      'Måleklar opsætning',
    ],
    serviceIds: ['websites'],
    href: '/ydelser#websites',
  },
  {
    id: 'google-ads',
    index: '02',
    title: 'Google Ads',
    promise:
      'Den aktive efterspørgsel: kampagner mod folk, der allerede søger, med en struktur der kan optimeres på noget rigtigt.',
    covers: [
      'Kampagnestruktur',
      'Søgeord og intention',
      'Konverteringssporing',
      'Budgetstyring',
      'Løbende optimering',
      'Månedlig rapportering',
    ],
    serviceIds: ['google-ads'],
    href: '/ydelser#google-ads',
  },
  {
    id: 'meta-ads',
    index: '03',
    title: 'Meta Ads',
    promise:
      'Efterspørgslen, der endnu ikke findes: målgrupper, retargeting og test af vinkler på Facebook og Instagram.',
    covers: [
      'Målgruppestrategi',
      'Retargeting',
      'Test af annoncevinkler',
      'Placeringer',
      'Løbende optimering',
      'Månedlig rapportering',
    ],
    serviceIds: ['meta-ads'],
    href: '/ydelser#meta-ads',
  },
  {
    id: 'seo',
    index: '04',
    title: 'Search Visibility',
    explainer: 'SEO + GEO/AI-synlighed',
    promise:
      'At blive fundet i Google — og brugt som kilde, når nogen spørger en AI-assistent i stedet for at søge.',
    covers: [
      'Teknisk SEO',
      'Søgeintention',
      'Struktureret indhold',
      'Schema og struktureret data',
      'Intern linking',
      'Synlighed i AI-søgning',
    ],
    serviceIds: ['seo'],
    href: '/ydelser#seo',
  },
  {
    id: 'digital-growth',
    index: '05',
    title: 'Digital Growth',
    promise:
      'Det, der binder resten sammen: måling, prioritering, afprøvning og en fast hånd på, hvad der skal ske næste måned.',
    covers: [
      'Tracking og analyse',
      'Strategisk prioritering',
      'Afprøvning og justering',
      'Konverteringsoptimering',
      'Løbende sparring',
      'Rapportering, der kan bruges',
    ],
    serviceIds: ['tracking', 'strategy'],
    href: '/ydelser#digital-growth',
  },
];

export const pillarServiceIds = new Set(pillars.flatMap((pillar) => pillar.serviceIds));

/** Services that live below the pillars on /ydelser. */
export const supportingServices = services.filter((service) => !pillarServiceIds.has(service.id));

/* ==========================================================================
   The growth system

   The same five pillars, told as the four stages a customer actually moves
   through. Used on the homepage; /ydelser carries the full scope.
   ========================================================================== */

export interface GrowthStage {
  id: string;
  index: string;
  /** The stage, in the language of the visitor's own problem. */
  label: string;
  title: string;
  body: string;
  pillarIds: string[];
}

export const growthStages: GrowthStage[] = [
  {
    id: 'found',
    index: '01',
    label: 'GET FOUND',
    title: 'Bliv fundet',
    body: 'Search Visibility: teknisk SEO, søgeintention og struktureret indhold, så I dukker op i søgeresultater — og bliver brugt som kilde, når nogen spørger en AI-assistent.',
    pillarIds: ['seo'],
  },
  {
    id: 'clicked',
    index: '02',
    label: 'GET CLICKED',
    title: 'Bliv valgt',
    body: 'Google Ads mod den aktive efterspørgsel og Meta Ads mod den, der endnu ikke findes. Samme måling under begge, så budgettet kan flyttes derhen, hvor det virker.',
    pillarIds: ['google-ads', 'meta-ads'],
  },
  {
    id: 'convert',
    index: '03',
    label: 'CONVERT',
    title: 'Bliv til en henvendelse',
    body: 'Websitet er der, hvor opmærksomhed enten bliver til en kunde eller forsvinder. Struktur, hastighed og tydelige næste skridt — bygget til mobil først.',
    pillarIds: ['websites'],
  },
  {
    id: 'grow',
    index: '04',
    label: 'GROW',
    title: 'Bliv ved',
    body: 'Tracking, prioritering og løbende justering. Én ansvarlig, der ser hele kæden og siger, hvad der skal ske næste måned — også når svaret er «ikke endnu».',
    pillarIds: ['digital-growth'],
  },
];

export default services;
