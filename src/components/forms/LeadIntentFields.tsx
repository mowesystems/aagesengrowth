import { useLocale } from '@/i18n/useLocale';

/** Unknown answers stay unknown; an empty website field is not proof of need. */
export function LeadIntentFields({ idPrefix }: { idPrefix: string }) {
  const { locale } = useLocale();
  const en = locale === 'en';
  const fields = [
    { name: 'need', label: en ? 'What do you need help with?' : 'Hvad har I brug for hjælp til?', values: [
      ['new_website', en ? 'Our first website' : 'Vores første hjemmeside'],
      ['redesign', en ? 'A new version of our website' : 'En ny version af vores hjemmeside'],
      ['more_leads', en ? 'More enquiries from customers' : 'Flere kundehenvendelser'],
      ['not_sure', en ? 'Help figuring that out' : 'Hjælp til at afklare det'],
    ] },
    { name: 'timeline', label: en ? 'When would you like to start?' : 'Hvornår vil I gerne i gang?', values: [
      ['month', en ? 'Within a month' : 'Inden for en måned'],
      ['quarter', en ? 'Within three months' : 'Inden for tre måneder'],
      ['research', en ? 'Just exploring' : 'Vi undersøger mulighederne'],
    ] },
    { name: 'budget', label: en ? 'Website budget, excluding VAT' : 'Budget til hjemmeside, ekskl. moms', values: [
      ['under_10000', en ? 'Under DKK 10,000' : 'Under 10.000 kr.'],
      ['10000_25000', '10.000–25.000 kr.'],
      ['25000_plus', en ? 'Over DKK 25,000' : 'Over 25.000 kr.'],
      ['not_sure', en ? 'Not decided yet' : 'Ikke afklaret endnu'],
    ] },
  ];
  return <div className="mt-5 grid gap-5 sm:grid-cols-2">
    {fields.map(({ name, label, values }) => <div key={name}>
      <label className="field-label" htmlFor={`${idPrefix}-${name}`}>{label} <span className="font-normal text-muted">({en ? 'optional' : 'valgfrit'})</span></label>
      <select id={`${idPrefix}-${name}`} name={name} className="field" defaultValue="unknown">
        <option value="unknown">{en ? 'Choose if you know' : 'Vælg, hvis I ved det'}</option>
        {values.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </div>)}
  </div>;
}
