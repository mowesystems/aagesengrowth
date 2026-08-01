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
    title: "Websites & webshops",
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
      "Marketingplan",
      "Sociale medier",
      "Contentproduktion",
      "Kampagner og lanceringer",
      "E-mail og kunderejser",
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
      "Kampagnestruktur",
      "Målgrupper",
      "Annonceindhold",
      "Tracking",
      "Løbende optimering",
      "Rapportering",
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
      "Indholdsstruktur og metadata",
      "Interne links",
      "Lokal synlighed",
      "AI-retrieval og GEO-optimering",
      "Løbende synlighedsforbedringer",
    ],
    href: "/ydelser#seo",
  },
];

export default services;
