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
    title: "Websites",
    tagline: "Et stærkt digitalt fundament",
    description:
      "Hurtige, konverteringsstærke hjemmesider, der bygger tillid og skaber kunder.",
    features: [
      "UX og struktur",
      "Design og udvikling",
      "Konverteringsoptimering",
    ],
    href: "/ydelser#websites",
    featured: true,
  },
  {
    id: "seo",
    index: "02",
    title: "SEO og AI-synlighed",
    tagline: "Bliv fundet og forstået",
    description:
      "Bliv fundet i Google og i AI-søgninger gennem SEO, GEO og struktureret indhold.",
    features: [
      "Teknisk SEO",
      "GEO og AI-retrieval",
      "Indholdsstruktur",
    ],
    href: "/ydelser#seo",
  },
  {
    id: "google-ads",
    index: "03",
    title: "Google Ads",
    tagline: "Fang den aktive efterspørgsel",
    description:
      "Målrettede kampagner, der skaber kvalificerede leads og dokumenterbare resultater.",
    features: [
      "Search og Performance Max",
      "Konverteringssporing",
      "Løbende optimering",
    ],
    href: "/ydelser#google-ads",
  },
  {
    id: "meta-ads",
    index: "04",
    title: "Meta Ads",
    tagline: "Skab opmærksomhed og handling",
    description:
      "Kampagner på Facebook og Instagram, der skaber opmærksomhed, efterspørgsel og salg.",
    features: [
      "Kampagnestruktur",
      "Målgrupper og budskaber",
      "Test og optimering",
    ],
    href: "/ydelser#meta-ads",
  },
  {
    id: "content",
    index: "05",
    title: "Indhold og sociale medier",
    tagline: "Indhold med retning",
    description:
      "Strategisk indhold, der engagerer, styrker brandet og skaber handling.",
    features: [
      "Indholdsplan",
      "Sociale medier",
      "Kampagner og lanceringer",
    ],
    href: "/ydelser#content",
  },
  {
    id: "tracking",
    index: "06",
    title: "Tracking og analyse",
    tagline: "Et tydeligt beslutningsgrundlag",
    description:
      "Et klart datagrundlag, så indsatsen kan prioriteres og forbedres løbende.",
    features: [
      "Måleplan og events",
      "Dashboard og rapportering",
      "Analyse og prioritering",
    ],
    href: "/ydelser#tracking",
  },
  {
    id: "hosting",
    index: "07",
    title: "Hosting og drift",
    tagline: "Stabil teknik i hverdagen",
    description:
      "Sikker hosting, vedligeholdelse og teknisk drift uden unødvendige problemer.",
    features: [
      "Sikker hosting",
      "Opdateringer og backup",
      "Løbende teknisk support",
    ],
    href: "/ydelser#hosting",
  },
  {
    id: "strategy",
    index: "08",
    title: "Rådgivning og strategi",
    tagline: "Klar retning og prioritering",
    description:
      "Klar retning, skarpe prioriteringer og en strategi, der samler den digitale indsats.",
    features: [
      "Strategisk sparring",
      "Marketingplan",
      "Prioritering og roadmap",
    ],
    href: "/ydelser#strategy",
  },
];

export default services;
