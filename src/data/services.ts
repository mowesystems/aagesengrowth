export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  pricingHref: string;
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
    pricingHref: "/priser#hjemmesider",
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
    pricingHref: "/priser#marketing",
  },
  {
    id: "google-ads",
    index: "03",
    title: "Google Ads",
    tagline: "Fang den aktive efterspørgsel",
    description:
      "Målrettede kampagner, der skaber kvalificerede leads og dokumenterbare resultater.",
    features: [
      "Opsætning og kampagnestruktur",
      "Konverteringssporing",
      "Optimering og rapportering",
    ],
    href: "/ydelser#google-ads",
    pricingHref: "/priser#marketing",
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
      "Målgrupper og tracking",
      "Optimering og rapportering",
    ],
    href: "/ydelser#meta-ads",
    pricingHref: "/priser#marketing",
  },
  {
    id: "tracking",
    index: "05",
    title: "Tracking og analyse",
    tagline: "Et tydeligt beslutningsgrundlag",
    description:
      "Et klart datagrundlag, så indsatsen kan prioriteres og forbedres løbende.",
    features: [
      "Måleplan og events",
      "Konverteringssporing",
      "Analyse og prioritering",
    ],
    href: "/ydelser#tracking",
    pricingHref: "/priser#marketing",
  },
  {
    id: "hosting",
    index: "06",
    title: "Hosting og vedligeholdelse",
    tagline: "Stabil teknik i hverdagen",
    description:
      "Sikker hosting, opdateringer og teknisk vedligeholdelse med et tydeligt serviceniveau.",
    features: [
      "Sikker hosting og SSL",
      "Backup og overvågning",
      "Care og teknisk support",
    ],
    href: "/ydelser#hosting",
    pricingHref: "/priser#hosting",
  },
  {
    id: "woocommerce",
    index: "07",
    title: "WooCommerce-optimering",
    tagline: "En bedre eksisterende webshop",
    description:
      "Målrettede forbedringer af design, mobiloplevelse, kurv og checkout i eksisterende WooCommerce-løsninger.",
    features: [
      "Produkt- og kategorisider",
      "Kurv og checkout",
      "Mobil- og konverteringsoptimering",
    ],
    href: "/ydelser#woocommerce",
    pricingHref: "/priser#woocommerce",
  },
  {
    id: "strategy",
    index: "08",
    title: "Strategisk rådgivning",
    tagline: "Klar retning og prioritering",
    description:
      "Klar retning, skarpe prioriteringer og en strategi, der samler den digitale indsats.",
    features: [
      "Strategisk sparring",
      "Marketingplan",
      "Prioritering og roadmap",
    ],
    href: "/ydelser#strategy",
    pricingHref: "/priser#growth-partner",
  },
];

export default services;
