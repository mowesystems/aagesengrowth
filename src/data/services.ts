export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Hjemmesider & webshops",
    tagline: "Design og udvikling af professionelle websites",
    description:
      "Design og udvikling af professionelle hjemmesider og webshops med stærk struktur, visuel identitet og fokus på konvertering.",
    features: [
      "UX og sidestruktur",
      "Visuelt design",
      "Udvikling",
      "Responsive layouts",
      "Webshopopsætning",
      "Løbende vedligeholdelse",
      "Konverteringsoptimering",
    ],
    href: "/ydelser#websites",
    featured: true,
  },
  {
    id: "marketing",
    index: "02",
    title: "Marketing & content",
    tagline: "Indhold der skaber sammenhæng",
    description:
      "Strategi, planlægning og produktion af indhold, der skaber en sammenhængende tilstedeværelse på tværs af relevante kanaler.",
    features: [
      "Marketingstrategi",
      "Indholdsplanlægning",
      "Tekst og redigering",
      "Publicering",
      "Sociale medier",
    ],
    href: "/ydelser#marketing",
  },
  {
    id: "ads",
    index: "03",
    title: "Google Ads & Meta Ads",
    tagline: "Annoncering der virker",
    description:
      "Opsætning, tracking, test og løbende optimering med fokus på relevante handlinger og bedre udnyttelse af annoncebudgettet.",
    features: [
      "Google Search Ads",
      "Meta Ads",
      "Tracking og konvertering",
      "A/B-test",
      "Løbende optimering",
    ],
    href: "/ydelser#ads",
  },
  {
    id: "seo",
    index: "04",
    title: "SEO, GEO & synlighed",
    tagline: "Bliv fundet og forstået",
    description:
      "Tekniske, strukturelle og indholdsmæssige forbedringer, der gør virksomheden nemmere at finde og forstå i Google og AI-søgninger.",
    features: [
      "Teknisk SEO",
      "Indhold og struktur",
      "Lokal synlighed",
      "GEO og AI visibility",
      "Strukturerede data",
    ],
    href: "/ydelser#seo",
  },
];

export default services;
