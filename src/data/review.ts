/**
 * The logic behind the "website-tjek" tool.
 *
 * This deliberately contains no scoring and no fabricated measurements. It does
 * the one thing that is genuinely useful and genuinely honest: it takes the
 * symptoms a business owner recognises and returns a *prioritised order of
 * work*, including the dependencies between them. Sequencing is the actual
 * service — so the tool demonstrates the service rather than illustrating it.
 */

export interface Symptom {
  id: string;
  /** What the business owner would say. */
  label: string;
  /** Which recommendation this triggers. */
  triggers: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  /** Why this is the right move, given the symptom. */
  rationale: string;
  /** Service id from services.ts */
  serviceId: string;
  /**
   * Lower runs earlier. Encodes real dependencies: you cannot judge advertising
   * without measurement, and you should not send paid traffic to a page that
   * does not convert.
   */
  order: number;
  /** Pulled in automatically when a dependent recommendation is selected. */
  prerequisiteFor?: string[];
}

export const symptoms: Symptom[] = [
  {
    id: 'few-enquiries',
    label: 'Vi får for få henvendelser fra siden',
    triggers: ['conversion'],
  },
  {
    id: 'looks-dated',
    label: 'Siden ser forældet ud og matcher ikke forretningen',
    triggers: ['rebuild'],
  },
  {
    id: 'not-found',
    label: 'Vi bliver ikke fundet, når folk søger',
    triggers: ['seo'],
  },
  {
    id: 'slow-mobile',
    label: 'Siden er langsom — især på mobil',
    triggers: ['performance'],
  },
  {
    id: 'no-numbers',
    label: 'Vi ved ikke, hvad vores markedsføring egentlig giver',
    triggers: ['tracking'],
  },
  {
    id: 'ads-unclear',
    label: 'Vi betaler for annoncer uden rigtigt overblik',
    triggers: ['ads'],
  },
  {
    id: 'shop-converts-poorly',
    label: 'Webshoppen får besøg, men for få køb',
    triggers: ['shop'],
  },
  {
    id: 'nobody-owns-it',
    label: 'Ingen har ansvaret for det tekniske',
    triggers: ['operations'],
  },
  {
    id: 'no-plan',
    label: 'Vi mangler en plan for, hvad der skal ske først',
    triggers: ['strategy'],
  },
];

export const recommendations: Record<string, Recommendation> = {
  strategy: {
    id: 'strategy',
    title: 'Afklaring og prioriteret plan',
    rationale:
      'Før der bruges penge på eksekvering, lægges rækkefølgen fast: hvad der betyder mest, hvad der kan vente, og hvad der er spild lige nu.',
    serviceId: 'strategy',
    order: 1,
  },
  tracking: {
    id: 'tracking',
    title: 'Få målingen på plads',
    rationale:
      'Uden troværdig tracking er enhver vurdering af markedsføring gætteri. Det er billigt at sætte op og gør alt det efterfølgende arbejde målbart.',
    serviceId: 'tracking',
    order: 2,
    prerequisiteFor: ['ads'],
  },
  conversion: {
    id: 'conversion',
    title: 'Konverteringspunkterne på siden',
    rationale:
      'Trafik uden tydelige næste skridt bliver ikke til henvendelser. Struktur, tekst og kontaktpunkter gennemgås, før der købes mere trafik ind.',
    serviceId: 'websites',
    order: 3,
  },
  performance: {
    id: 'performance',
    title: 'Hastighed og mobiloplevelse',
    rationale:
      'De fleste besøgende kommer fra mobil. Er siden langsom dér, forsvinder en del af dem, før de overhovedet har set indholdet.',
    serviceId: 'websites',
    order: 4,
  },
  rebuild: {
    id: 'rebuild',
    title: 'Nyt website',
    rationale:
      'Når fundamentet er forældet, er lapperier dyrere end at bygge rigtigt. Vi siger det også, hvis det modsatte er tilfældet hos jer.',
    serviceId: 'websites',
    order: 5,
  },
  shop: {
    id: 'shop',
    title: 'Optimering af webshoppen',
    rationale:
      'Produktside, kurv og checkout er der, pengene tabes. Målrettede forbedringer dér flytter mere end et redesign af forsiden.',
    serviceId: 'woocommerce',
    order: 6,
  },
  seo: {
    id: 'seo',
    title: 'Search Visibility',
    rationale:
      'Teknisk fundament, indholdsstruktur og GEO, så I både kan findes i søgeresultater og bruges som kilde af AI-assistenter.',
    serviceId: 'seo',
    order: 7,
  },
  ads: {
    id: 'ads',
    title: 'Annoncering med styr på tallene',
    rationale:
      'Når målingen står, kan annoncekronerne styres efter, hvad der faktisk skaber henvendelser — i stedet for efter klikpriser.',
    serviceId: 'google-ads',
    order: 8,
  },
  operations: {
    id: 'operations',
    title: 'Drift og vedligeholdelse',
    rationale:
      'Hosting, backup, opdateringer og et aftalt serviceniveau, så ansvaret ligger ét sted i stedet for ingen steder.',
    serviceId: 'hosting',
    order: 9,
  },
};

/**
 * Turns selected symptoms into an ordered plan, pulling in prerequisites that
 * the visitor did not select but that the work genuinely depends on.
 */
export const buildPlan = (selectedSymptomIds: string[]) => {
  const chosen = new Set<string>();

  selectedSymptomIds.forEach((symptomId) => {
    const symptom = symptoms.find((item) => item.id === symptomId);
    symptom?.triggers.forEach((trigger) => chosen.add(trigger));
  });

  // Pull in anything the chosen work depends on.
  const added = new Set<string>();
  Object.values(recommendations).forEach((rec) => {
    if (!rec.prerequisiteFor) return;
    const isNeeded = rec.prerequisiteFor.some((dependent) => chosen.has(dependent));
    if (isNeeded && !chosen.has(rec.id)) {
      chosen.add(rec.id);
      added.add(rec.id);
    }
  });

  const plan = Array.from(chosen)
    .map((id) => recommendations[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  return { plan, autoAdded: added };
};
