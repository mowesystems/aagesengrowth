export interface CaseItem {
  id: string;
  client: string;
  category: string;
  introduction: string;
  description: string;
  responsibilities: string[];
  logoPath: string;
  logoAlt: string;
  url: string;
  cta: string;
  projectNote?: string;
  theme: 'light' | 'dark';
}

export const cases: CaseItem[] = [
  {
    id: 'plus-eins',
    client: 'Plus Eins & Plus Eins Deli',
    category: 'Website · Brand · Content · Marketing',
    introduction: 'Et samlet digitalt fundament for boutique, deli og den videre udvikling af Plus Eins.',
    description:
      'Aagesen Growth har siden slutningen af juni været en aktiv del af den digitale udvikling af både Plus Eins og Plus Eins Deli. Arbejdet har omfattet website, indhold, visuel kommunikation, lanceringen af Deli-konceptet og den løbende marketingretning.',
    responsibilities: [
      'Website og løbende forbedringer',
      'Lancering af Plus Eins Deli',
      'Sociale medier, content og kampagner',
      'Brandets digitale retning',
      'Webshopforberedelse og online vækst',
      'SEO, GEO og løbende synlighed',
    ],
    logoPath: '/plus-eins.png',
    logoAlt: 'Plus Eins',
    url: 'https://www.pluseins.dk',
    cta: 'Se Plus Eins',
    theme: 'light',
  },
  {
    id: 'mowe-systems',
    client: 'MOWE Systems',
    category: 'Brand · Product · Website · AI visibility',
    introduction: 'Fra kompleks softwareidé til et tydeligt digitalt produkt og en skalerbar platform.',
    description:
      'MOWE Systems er udviklet som en AI visibility-platform med fokus på målbar forretningsvækst. Arbejdet omfatter brand, positionering, website, produktstruktur, SEO, GEO og udviklingen af en kompleks digital platform.',
    responsibilities: [
      'Brand og positionering',
      'Website og produktkommunikation',
      'Produktarkitektur og konvertering',
      'SEO- og GEO-strategi',
      'Digitalt fundament for platformen',
      'En klar oplevelse af teknisk kompleksitet',
    ],
    logoPath: '/mowe-systems.png',
    logoAlt: 'MOWE Systems',
    url: 'https://mowesystems.com',
    cta: 'Se MOWE Systems',
    projectNote: 'Et projekt skabt og udviklet af samme founder som Aagesen Growth.',
    theme: 'dark',
  },
];

export default cases;
