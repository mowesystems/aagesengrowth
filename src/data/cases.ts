export interface CaseSection {
  heading: string;
  body: string;
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
  logoPath: string;
  logoAlt: string;
  /**
   * Per-asset optical tuning. The supplied PNGs have very different amounts of
   * transparent padding baked in — MOWE's mark sits in the upper portion of a
   * 1080x1080 canvas, Plus Eins fills most of a 655x557 canvas. These values
   * bring both to a consistent optical size on the brand plate.
   * TODO(owner): re-export tightly-cropped logos and these can all go to 1 / '50% 50%'.
   */
  logoScale: number;
  logoPosition: string;
  url: string;
  /** Timeframe, only where it is known. */
  period?: string;
  /** Any disclosure the reader deserves. */
  disclosure?: string;
}

export const cases: CaseItem[] = [
  {
    id: 'plus-eins',
    slug: 'plus-eins',
    client: 'Plus Eins',
    kind: 'Boutique · København',
    disciplines: ['Website', 'Brand', 'SEO & GEO', 'Marketing'],
    summary:
      'Et digitalt fundament for en fysisk boutique, der skulle være lige så tydelig online som i butikken.',
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
      'SEO og GEO',
      'Forberedelse til webshop',
    ],
    serviceIds: ['websites', 'seo', 'meta-ads', 'strategy'],
    demonstrates:
      'At et website skal bygges til det, der kommer bagefter. Strukturen holdt, da et helt nyt koncept skulle ind.',
    logoPath: '/plus-eins.png',
    logoAlt: 'Plus Eins',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk',
    period: 'Løbende samarbejde',
  },
  {
    id: 'plus-eins-deli',
    slug: 'plus-eins-deli',
    client: 'Plus Eins Deli',
    kind: 'Konceptlancering',
    disciplines: ['Lancering', 'Indhold', 'Marketing'],
    summary:
      'Lanceringen af et nyt deli-koncept under et eksisterende brand — uden at fortynde det brand, det voksede ud af.',
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
    logoPath: '/plus-eins.png',
    logoAlt: 'Plus Eins Deli',
    logoScale: 1,
    logoPosition: '50% 50%',
    url: 'https://www.pluseins.dk',
    period: 'Løbende samarbejde',
    disclosure: 'Del af det løbende samarbejde med Plus Eins.',
  },
  {
    id: 'mowe-systems',
    slug: 'mowe-systems',
    client: 'MOWE Systems',
    kind: 'SaaS · AI visibility',
    disciplines: ['Brand', 'Produkt', 'Website', 'SEO & GEO'],
    summary:
      'Fra kompleks softwareidé til et produkt, man kan forstå på tredive sekunder — og en platform, der kan vokse.',
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
        body: 'SEO og GEO blev bygget ind fra start. Når kategorien er ny, er der få etablerede søgninger at kæmpe om — til gengæld er der en reel mulighed for at blive den kilde, både søgemaskiner og AI-assistenter trækker på.',
      },
    ],
    delivered: [
      'Brand og positionering',
      'Website og produktkommunikation',
      'Produktarkitektur og konverteringsstruktur',
      'SEO- og GEO-strategi',
      'Teknisk fundament for platformen',
    ],
    serviceIds: ['websites', 'seo', 'tracking', 'strategy'],
    demonstrates:
      'At teknisk dybde og enkel kommunikation ikke er modsætninger. Det svære er at gøre det komplekse forståeligt uden at gøre det forkert.',
    logoPath: '/mowe-systems.png',
    logoAlt: 'MOWE Systems',
    // The mark occupies roughly the upper 60% of a square canvas with heavy
    // asymmetric transparent padding; scale up and pull toward the mark.
    logoScale: 1.5,
    logoPosition: '50% 38%',
    url: 'https://mowesystems.com',
    disclosure:
      'MOWE Systems er skabt og udviklet af samme person, der står bag Aagesen Growth.',
  },
];

export const getCaseBySlug = (slug: string) => cases.find((item) => item.slug === slug);

export default cases;
