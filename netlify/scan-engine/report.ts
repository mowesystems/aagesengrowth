/**
 * The report a business owner reads, and the internal record behind it.
 *
 * The customer version is deliberately short: a personal headline, at most
 * five opportunities (two sentences each), one recommendation and an honest
 * line about what a free scan cannot see. No scores, no severity labels, no
 * technical vocabulary. Everything else goes to the internal view.
 */
import type {
  InternalFinding,
  InternalScan,
  PublicReport,
  ReportOpportunity,
  ScanArea,
  ScanLocale,
} from '../../src/lib/growthScan/types';
import { scoreOf, type Finding, type Signals } from './rules';

const MAX_SHOWN = 5;
const MAX_PER_AREA = 2;

const NUMBER_DA = ['', 'Én', 'To', 'Tre', 'Fire', 'Fem'];
const NUMBER_EN = ['', 'One', 'Two', 'Three', 'Four', 'Five'];

/** "Plus Eins" → "Plus Eins'", "Tømrer Jensen" → "Tømrer Jensens". */
const genitiveDa = (name: string) => (/[sxz]$/i.test(name) ? `${name}'` : `${name}s`);
const genitiveEn = (name: string) => (/s$/i.test(name) ? `${name}'` : `${name}'s`);

/** Top five by impact × confidence, at most two per area, public findings only. */
export function selectShown(findings: Finding[]): Finding[] {
  const sorted = findings.filter((f) => f.public).sort((a, b) => scoreOf(b) - scoreOf(a));
  const perArea = new Map<ScanArea, number>();
  const shown: Finding[] = [];
  for (const f of sorted) {
    if (shown.length >= MAX_SHOWN) break;
    const n = perArea.get(f.area) ?? 0;
    if (n >= MAX_PER_AREA) continue;
    perArea.set(f.area, n + 1);
    shown.push(f);
  }
  return shown;
}

const NOT_SEEN: Record<ScanLocale, string[]> = {
  da: [
    'Jeres placeringer i Google-søgninger. Det kræver søgedata, som den gratis scanning ikke henter.',
    'Jeres Google Business-profil med anmeldelser og åbningstider. Det kræver adgang til profilen.',
    'Hvad der sker, efter en kunde har skrevet eller ringet. Svartid og opfølgning kan kun ses indefra.',
  ],
  en: [
    "Your rankings in Google searches. That needs search data the free scan doesn't collect.",
    'Your Google Business Profile with reviews and opening hours. That needs access to the profile.',
    'What happens after a customer writes or calls. Response times and follow-up can only be seen from the inside.',
  ],
};

function buildPublic(locale: ScanLocale, shown: Finding[], signals: Signals, domain: string): PublicReport {
  const da = locale === 'da';
  const n = shown.length;
  const name = signals.company;
  const where = signals.city ? (da ? `${name} i ${signals.city}` : `${name} in ${signals.city}`) : name;

  let headline: string;
  if (signals.websiteJustified) {
    headline = da ? `${where}: websitet holder henvendelserne tilbage` : `${where}: the website is holding enquiries back`;
  } else if (n === 0) {
    headline = da ? `${genitiveDa(name)} website er i god form` : `${genitiveEn(name)} website is in good shape`;
  } else {
    headline = da
      ? `${where}: ${NUMBER_DA[n].toLowerCase()} ${n === 1 ? 'mulighed' : 'muligheder'} for flere henvendelser`
      : `${where}: ${NUMBER_EN[n].toLowerCase()} ${n === 1 ? 'way' : 'ways'} to get more enquiries`;
  }

  const pages = signals.pagesReviewed;
  const sub = da
    ? `Vi gennemgik ${pages} ${pages === 1 ? 'side' : 'sider'} på ${domain} i en rigtig browser, på mobil og computer.`
    : `We reviewed ${pages} ${pages === 1 ? 'page' : 'pages'} on ${domain} in a real browser, on mobile and desktop.`;

  const opportunities: ReportOpportunity[] = shown.map((f) => ({
    id: f.id,
    area: f.area,
    observed: f.text[locale].observed,
    opportunity: f.text[locale].opportunity,
  }));

  let recommendation: PublicReport['recommendation'];
  if (signals.websiteJustified) {
    const reason = signals.websiteReasons[0]?.[locale];
    recommendation = {
      kind: 'website',
      text: da
        ? `Start med et nyt website. ${reason ? `${reason.charAt(0).toUpperCase()}${reason.slice(1)}, og det` : 'Det nuværende'} kan ikke rettes med små ændringer. Et nyt website løser flere af punkterne på én gang.`
        : `Start with a new website. ${reason ? `${reason.charAt(0).toUpperCase()}${reason.slice(1)}, and that` : 'The current one'} can't be fixed with small changes. A new website solves several of these points at once.`,
    };
  } else if (n === 0) {
    recommendation = {
      kind: 'healthy',
      text: da
        ? 'Websitet gør det, det skal. Det næste skridt er det, vi ikke kan se udefra: jeres Google-profil og hvad der sker efter en henvendelse. Det gennemgår vi gerne sammen med jer.'
        : "The website does what it should. The next step is what we can't see from the outside: your Google profile and what happens after an enquiry. We're happy to go through that with you.",
    };
  } else {
    recommendation = {
      kind: 'improve',
      text: da
        ? `${n === 1 ? 'Punktet kan' : 'Punkterne kan'} rettes på jeres nuværende website. Vil I have hjælp, prioriterer og gennemfører vi ${n === 1 ? 'det' : 'dem'} som en del af Growth Engine og følger op på, om ${n === 1 ? 'det virker' : 'de virker'}.`
        : `${n === 1 ? 'This can' : 'These can all'} be fixed on your current website. If you'd like help, we prioritise and carry ${n === 1 ? 'it' : 'them'} out as part of Growth Engine and follow up on whether ${n === 1 ? 'it works' : 'they work'}.`,
    };
  }

  return { company: name, headline, sub, opportunities, recommendation, notSeen: NOT_SEEN[locale], pagesReviewed: pages };
}

export function buildReports(findings: Finding[], signals: Signals, domain: string) {
  const shown = selectShown(findings);
  const report = {
    da: buildPublic('da', shown, signals, domain),
    en: buildPublic('en', shown, signals, domain),
  };
  return { shown, report };
}

export function buildInternal(
  findings: Finding[],
  shown: Finding[],
  signals: Signals,
  pages: InternalScan['pages'],
  domain: string,
  durationMs: number,
  notes: string[]
): InternalScan {
  const internalFindings: InternalFinding[] = findings
    .map((f) => ({
      id: f.id,
      area: f.area,
      confidence: f.confidence,
      score: scoreOf(f),
      public: f.public,
      shown: shown.includes(f),
      observed: f.text.da.observed,
      opportunity: f.text.da.opportunity,
      evidence: f.evidence,
      sources: f.sources,
      task: f.task,
      structural: f.structural,
    }))
    .sort((a, b) => Number(b.shown) - Number(a.shown) || b.score - a.score);

  const top = shown[0];
  const observation = top ? top.text.da.observed.replace(/\.$/, '') : '';
  const conversationStarter = top
    ? `Hej [navn]. Jeg kiggede på ${domain} og lagde mærke til én ting: ${observation.charAt(0).toLowerCase()}${observation.slice(1)}. Jeg har samlet det og et par andre konkrete forslag i en kort rapport. Må jeg sende den til dig?`
    : `Hej [navn]. Jeg kiggede på ${domain}. Websitet gør det, det skal, så det interessante er det, man ikke kan se udefra: Google-profilen og hvad der sker efter en henvendelse. Har du lyst til en kort snak om det?`;

  return {
    findings: internalFindings,
    pages,
    signals: signals.facts,
    websiteJustified: signals.websiteJustified,
    websiteReasons: signals.websiteReasons.map((r) => r.internal),
    conversationStarter,
    durationMs,
    notes,
  };
}
