export interface Service {
  id: string;
  index: string;
  title: string;
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
    title: 'Websites',
    problem:
      'Hjemmesiden ser forældet ud, siger ikke tydeligt hvad I laver, og de besøgende tager ikke kontakt.',
    description: 'Et website bygget til at skabe tillid og henvendelser — ikke bare til at eksistere.',
    suitedFor:
      'Virksomheder, der skal have et nyt website, eller hvis nuværende side ikke længere matcher forretningen.',
    includes: [
      'Struktur, indholdsplan og brugerrejse',
      'Design og udvikling',
      'Konverteringspunkter og formularer',
      'Teknisk SEO-fundament',
      'Tracking-opsætning',
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
    title: 'SEO og AI-synlighed',
    problem:
      'I bliver ikke fundet på det, I gerne vil findes på — hverken i Google eller når nogen spørger en AI-assistent.',
    description: 'Teknisk SEO, indholdsstruktur og GEO, så I er til at finde og til at forstå.',
    suitedFor:
      'Virksomheder med et fungerende website, der skal have flere besøgende fra søgning over tid.',
    includes: [
      'Teknisk SEO og indeksering',
      'Søgeords- og intentionsanalyse',
      'On-page-prioritering',
      'Struktur og intern linking',
      'Struktureret data og GEO-forberedelse',
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
    problem:
      'I vil skabe efterspørgsel hos folk, der endnu ikke søger efter jer — men ved ikke, hvor I skal starte.',
    description: 'Kampagner på Facebook og Instagram med målgrupper, retargeting og løbende justering.',
    suitedFor: 'Virksomheder med et visuelt produkt eller et tilbud, der kan forklares hurtigt.',
    includes: [
      'Kampagne- og kontoopsætning',
      'Målgrupper og retargeting',
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
    problem: 'Tallene i Analytics siger ikke noget om, hvad der faktisk skaber henvendelser og salg.',
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

export default services;
