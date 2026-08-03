/**
 * Single source of truth for every FAQ on the site.
 *
 * Previously there were two independent sets — one here and one in pricing.ts —
 * which gave contradictory answers to the same question (binding period) and
 * emitted two competing FAQPage schemas on two different URLs. Everything now
 * comes from this file, and only /faq emits FAQPage structured data.
 */

export type FaqTopic = 'samarbejde' | 'website' | 'pris' | 'marketing' | 'drift';

export interface FAQItem {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
  /** Surfaced in the pricing page's own FAQ block. */
  pricingRelevant?: boolean;
  /** Surfaced in the short FAQ on the homepage. */
  featured?: boolean;
}

export const topicLabels: Record<FaqTopic, string> = {
  samarbejde: 'Samarbejde',
  website: 'Website',
  pris: 'Pris og betaling',
  marketing: 'Marketing',
  drift: 'Drift og support',
};

export const faqItems: FAQItem[] = [
  // --- Samarbejde ----------------------------------------------------------
  {
    id: 'hvordan-foregaar-det',
    topic: 'samarbejde',
    question: 'Hvordan foregår et samarbejde i praksis?',
    answer:
      'Vi starter med en kort afklaring af, hvad I vil opnå, og hvad der står i vejen. Derefter får I et skriftligt tilbud med leverancer, tidsplan og pris. Undervejs taler I med den samme person, som laver arbejdet — der er ikke en projektleder imellem.',
    featured: true,
  },
  {
    id: 'hvem-taler-vi-med',
    topic: 'samarbejde',
    question: 'Hvem kommer vi til at tale med?',
    answer:
      'Den samme person hele vejen. Aagesen Growth arbejder med et begrænset antal kunder ad gangen, netop for at kunne det. Det betyder korte beslutningsveje og ét sted at gå hen, når noget skal ændres.',
    featured: true,
  },
  {
    id: 'efter-formular',
    topic: 'samarbejde',
    question: 'Hvad sker der, når jeg har sendt formularen?',
    answer:
      'I får en bekræftelse på skærmen med det samme. Derefter vender vi tilbage med enten et par opklarende spørgsmål eller et forslag til en kort samtale. Der er ingen automatiske mailsekvenser og ingen opfølgende salgsopkald.',
    featured: true,
  },
  {
    id: 'binding',
    topic: 'samarbejde',
    question: 'Er der en bindingsperiode?',
    answer:
      'Bindingsperiode og opsigelsesvilkår fremgår af det konkrete tilbud og aftalegrundlag. De aftales, før noget sættes i gang, så der ikke opstår tvivl undervejs.',
    pricingRelevant: true,
  },

  // --- Website -------------------------------------------------------------
  {
    id: 'hvad-koster-website',
    topic: 'website',
    question: 'Hvad koster en hjemmeside?',
    answer:
      'Launch koster 9.995 kr., Growth 14.995 kr., og Custom starter ved 24.995 kr. — alle ekskl. moms. Hvad der er det rigtige valg afhænger af, hvor mange sider I har brug for, og om der skal funktionalitet som booking eller login med. Alle priser fremgår af prissiden.',
    pricingRelevant: true,
    featured: true,
  },
  {
    id: 'hvad-skal-vi-levere',
    topic: 'website',
    question: 'Hvad skal vi selv levere?',
    answer:
      'Som udgangspunkt tekster, billeder, logo og virksomhedsoplysninger. Vi hjælper med struktur, redigering og med at få materialet til at fungere på siden. Skal vi producere større mængder tekst eller billeder, aftales det som en separat opgave.',
    pricingRelevant: true,
  },
  {
    id: 'rettelser',
    topic: 'website',
    question: 'Hvor mange rettelser er inkluderet?',
    answer:
      'Launch indeholder 2 korrekturrunder, Growth 3. Rettelser samles og gennemgås pr. runde, hvilket giver et hurtigere forløb end løbende enkeltbeskeder. Ny funktionalitet eller ændringer uden for det godkendte scope prissættes separat.',
    pricingRelevant: true,
  },
  {
    id: 'hvor-lang-tid',
    topic: 'website',
    question: 'Hvor lang tid tager det?',
    answer:
      'Tidsplanen aftales konkret i tilbuddet, fordi den afhænger af omfanget. Den største variabel er som regel ikke udviklingen, men hvor hurtigt tekster og billeder er klar. Vi siger det ærligt på forhånd, hvis noget ser ud til at trække ud.',
  },
  {
    id: 'forbedre-eksisterende',
    topic: 'website',
    question: 'Kan I forbedre vores nuværende hjemmeside i stedet for at bygge en ny?',
    answer:
      'Ofte ja. Hvis fundamentet er i orden, er målrettede forbedringer af struktur, hastighed, mobiloplevelse og konverteringspunkter både billigere og hurtigere end et helt nyt website. Vi siger også til, hvis det omvendte er tilfældet.',
    featured: true,
  },

  // --- Pris ----------------------------------------------------------------
  {
    id: 'moms',
    topic: 'pris',
    question: 'Er priserne inklusive moms?',
    answer:
      'Nej. Alle priser på siden er ekskl. moms, medmindre andet står direkte. Den endelige pris og betalingsplan fremgår altid af det skriftlige tilbud.',
    pricingRelevant: true,
  },
  {
    id: 'betaling',
    topic: 'pris',
    question: 'Skal hele beløbet betales på én gang?',
    answer:
      'Betalingsplanen aftales før opstart. Større projekter deles typisk i rater — for eksempel ved opstart, ved designgodkendelse og ved lancering.',
    pricingRelevant: true,
  },
  {
    id: 'tilpasning',
    topic: 'pris',
    question: 'Kan pakkerne tilpasses?',
    answer:
      'Ja. Pakkerne er et tydeligt udgangspunkt, ikke en spændetrøje. Den endelige løsning tilpasses jeres behov og tekniske udgangspunkt — og prisen følger med, i begge retninger.',
    pricingRelevant: true,
  },
  {
    id: 'stoerre-aendringer',
    topic: 'pris',
    question: 'Hvordan prissættes større ændringer undervejs?',
    answer:
      'Ændringer uden for det aftalte scope vurderes, inden de sættes i gang, og prissættes enten fast eller til 850 kr./time. I får altid besked, før noget bliver til en ekstraregning — aldrig efter.',
    pricingRelevant: true,
  },

  // --- Marketing -----------------------------------------------------------
  {
    id: 'annoncebudget',
    topic: 'marketing',
    question: 'Er annoncebudgettet inkluderet i prisen?',
    answer:
      'Nej. Annoncebudgettet betales direkte af jer til Google eller Meta. Vores pris dækker opsætning, drift, optimering og rapportering. På den måde kan I altid se, hvad der går til medie, og hvad der går til arbejde.',
    pricingRelevant: true,
    featured: true,
  },
  {
    id: 'annoncemateriale',
    topic: 'marketing',
    question: 'Producerer I billeder og video til annoncerne?',
    answer:
      'Ikke som standard. Annoncemateriale leveres som udgangspunkt af jer. Tilpasning eller produktion kan aftales som et separat tilkøb. Løbende organisk indhold og community management er ikke en del af ydelsen.',
    pricingRelevant: true,
  },
  {
    id: 'seo-vs-geo',
    topic: 'marketing',
    question: 'Hvad er forskellen på SEO og GEO?',
    answer:
      'SEO handler om at blive fundet i klassiske søgeresultater. GEO handler om at blive brugt som kilde, når nogen spørger en AI-assistent som ChatGPT eller Google AI Overviews. Meget af det tekniske arbejde overlapper, men indholdet skal struktureres anderledes for at kunne citeres.',
    featured: true,
  },
  {
    id: 'garanti',
    topic: 'marketing',
    question: 'Kan I garantere placeringer eller et bestemt antal leads?',
    answer:
      'Nej, og det bør ingen love. Placeringer og resultater afhænger af konkurrence, budget, marked og produkt — faktorer ingen leverandør kontrollerer. Det vi kan love, er en prioriteret indsats, målbar opsætning og ærlig rapportering på, hvad der virker.',
    featured: true,
  },

  // --- Drift ---------------------------------------------------------------
  {
    id: 'hosting-obligatorisk',
    topic: 'drift',
    question: 'Er hosting hos jer obligatorisk?',
    answer:
      'Nej. I kan hoste hvor I vil, og løsningen kan overdrages efter aftale. Mange vælger Hosting eller Care, fordi de hellere vil have ansvaret placeret ét sted — men det er et valg, ikke et krav.',
    pricingRelevant: true,
  },
  {
    id: 'hvad-er-mindre-aendringer',
    topic: 'drift',
    question: 'Hvad tæller som "mindre ændringer" på en Care-aftale?',
    answer:
      'Tekstrettelser, udskiftning af eksisterende billeder, opdatering af åbningstider og små justeringer på eksisterende sider. Nye sider, ny funktionalitet og større designændringer ligger uden for og afregnes separat. Ubrugt tid overføres ikke til næste måned.',
    pricingRelevant: true,
  },
];

/** Questions relevant to the pricing page. */
export const pricingFaq = faqItems.filter((item) => item.pricingRelevant);

/** Short set for the homepage. */
export const featuredFaq = faqItems.filter((item) => item.featured);

export const faqTopics: FaqTopic[] = ['samarbejde', 'website', 'pris', 'marketing', 'drift'];

export default faqItems;
