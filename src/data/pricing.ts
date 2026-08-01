export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaType: "booking" | "contact";
  recommended?: boolean;
}

export const packages: PricingPackage[] = [
  {
    id: "foundation",
    name: "Foundation",
    price: "Fra 10.000 kr.",
    priceNote: "pr. måned ekskl. moms",
    description: "Fast struktur og løbende eksekvering.",
    features: [
      "Fast marketingplan",
      "Sociale medier og content",
      "Mindre websiteopdateringer",
      "Basal SEO",
      "Månedlig opfølgning",
    ],
    ctaLabel: "Book en afklaring",
    ctaType: "booking",
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: "Fra 15.000 kr.",
    priceNote: "pr. måned ekskl. moms",
    description: "Strategi og fast marketingansvar.",
    features: [
      "Strategi og fast marketingansvar",
      "Website- eller webshopvedligeholdelse",
      "Google Ads eller Meta Ads",
      "SEO og GEO",
      "Kampagneplanlægning",
      "Rapportering og optimering",
    ],
    ctaLabel: "Book et møde",
    ctaType: "booking",
    recommended: true,
  },
  {
    id: "projects",
    name: "Digital Projects",
    price: "Fast pris",
    priceNote: "efter opgave",
    description: "Afgrænsede projekter med fast leverance.",
    features: [
      "Hjemmesider fra 15.000 kr.",
      "Webshops efter omfang",
      "Digital identitet fra 7.500 kr.",
      "Analyse og strategi fra 5.000 kr.",
    ],
    ctaLabel: "Få en vurdering",
    ctaType: "contact",
  },
];

export const pricingNote =
  "Pakkerne er udgangspunkter og tilpasses den konkrete opgave. Software, annoncebudgetter, hosting, apps og øvrige tredjepartsudgifter afregnes separat.";
