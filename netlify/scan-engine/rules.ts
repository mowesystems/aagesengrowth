/**
 * From observed facts to findings.
 *
 * Every rule here fires only on something the crawl actually saw, and says so
 * in plain language: one sentence for what we observed, one for what it means
 * for the business. Rules that are only meaningful to a specialist (titles in
 * metadata, structured data, sitemaps) are marked `public: false` and live in
 * the internal view only.
 *
 * Impact is how close the issue sits to a customer getting in touch (a phone
 * number you cannot tap is closer than a missing sitemap). Confidence is how
 * sure the observation is. The report shows the five highest impact ×
 * confidence, at most two per area.
 */
import type { Confidence, ScanArea, ScanLocale } from '../../src/lib/growthScan/types';
import type { CrawlResult, CrawledPage } from './crawl';
import type { PageFacts } from './extract';

type Bilingual = Record<ScanLocale, { observed: string; opportunity: string }>;

export interface Finding {
  id: string;
  area: ScanArea;
  confidence: Confidence;
  impact: number;
  public: boolean;
  structural?: boolean;
  text: Bilingual;
  evidence: string[];
  sources: string[];
  task: string;
}

export interface Signals {
  company: string;
  city: string | null;
  pagesReviewed: number;
  contactPageFound: boolean;
  clientRendered: boolean;
  websiteJustified: boolean;
  websiteReasons: { da: string; en: string; internal: string }[];
  facts: Record<string, unknown>;
}

const CONF: Record<Confidence, number> = { high: 1, medium: 0.75, low: 0.4 };
export const scoreOf = (f: Finding) => Math.round(f.impact * CONF[f.confidence] * 10) / 10;

const BOOKING_RE = /(calendly\.com|cal\.com\/|simplybook|youcanbook|setmore|acuityscheduling|outlook\.office365\.com\/(owa\/)?(calendar|book)|bookings\.|planway|timely|onlinebooq|easypractice|meetings\.hubspot|hubspot\.com\/meetings|booksy|fresha|zcal|tidycal)/i;
const FORM_PROVIDER_RE = /(typeform|jotform|forms\.hubspot|hsforms|google\.com\/forms|docs\.google\.com\/forms|tally\.so|paperform|formstack|cognitoforms|123formbuilder|wufoo|pipedrive.*forms|webforms\.pipedrive)/i;
const CHAT_RE = /(intercom|crisp\.chat|tidio|trengo|zdassets|zendesk|js\.hs-scripts|hubspot.*conversations|livechatinc|tawk\.to|drift\.com|smartsupp|userlike|weply|botpress|messenger|chatbase)/i;
const MAPS_RE = /(google\.[a-z.]+\/maps|maps\.google\.|goo\.gl\/maps|maps\.app\.goo\.gl|g\.page\/|search\.google\.com\/local|g\.co\/kgs)/i;
const REVIEW_WIDGET_RE = /(trustpilot|trustindex|elfsight|reviews\.io|feefo|embedsocial|sociablekit|featurable|reviewsonmywebsite|widget\.reviews|google-reviews|anmeldelser\.)/i;
const REVIEW_TEXT_RE = /(anmeldelse|kundeudtalelse|udtalelse|hvad (vores )?kunder(ne)? siger|kunderne siger|tilfredse kunder|★|⭐|\b[1-5][,.]\d\s*(\/\s*5|ud af 5|stjerne)|testimonial|what our (customers|clients) say|customer reviews)/i;
const RESPONSE_PROMISE_RE = /(inden for (én|en|\d+|to|tre|24|48) (time|timer|arbejdsdag|arbejdsdage|dag|dage|hverdag|hverdage)|samme dag|hurtigt svar|svarer (typisk |altid |hurtigst |inden)|vender (hurtigst muligt |hurtigt )?tilbage (inden|samme|hurtigst|til dig inden)|within (one|\d+) (hours?|business days?|working days?|days?)|same day|we reply within)/i;
const CALLBACK_RE = /(ring(er)? (dig|jer) op|bliv ringet op|ring mig op|vi ringer (dig )?op|callback|call me back|request a call)/i;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pathOf = (url: string) => {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname) || '/';
  } catch {
    return url;
  }
};

/** The company as the site names itself: structured data, og:site_name, or the title segment that matches the domain. */
function companyName(home: PageFacts, domain: string): string {
  const fromLd = (() => {
    for (const block of home.jsonLd) {
      const list = Array.isArray(block) ? block : (block as { '@graph'?: unknown[] })['@graph'] ?? [block];
      for (const node of list as Record<string, unknown>[]) {
        const t = String(node?.['@type'] ?? '');
        if (/Organization|LocalBusiness|Store|Contractor|Business|Restaurant|Cafe/i.test(t) && typeof node.name === 'string') return node.name;
      }
    }
    return '';
  })();
  if (fromLd && fromLd.length <= 40) return fromLd.trim();
  if (home.siteName && home.siteName.length <= 40) return home.siteName.trim();
  const label = domain.replace(/^www\./, '').split('.')[0].toLowerCase().replace(/[^a-z0-9æøå]/g, '');
  const segments = home.title.split(/\s[|–—·:-]\s|\s[|–—·]\s?/).map((s) => s.trim()).filter(Boolean);
  const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9æøå]/g, '');
  const hit = segments.find((s) => s.length <= 40 && (squash(s).includes(label) || label.includes(squash(s))) && squash(s).length >= 3);
  if (hit) return hit;
  if (segments[0] && segments[0].length <= 30 && !/^(forside|home|velkommen|welcome)$/i.test(segments[0])) return segments[0];
  return cap(label);
}

const CITY_STOP = /^(mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag|alle|åbningstider|åbent|lukket|kontakt|telefon|tlf|cvr|email|e-mail|mail|danmark|denmark|projekter|kunder|stk|kr|adresse|ring|følg|instagram|facebook|linkedin|info|web|hjem|forside)$/i;

function findCity(pages: PageFacts[]): string | null {
  for (const facts of pages) {
    for (const block of facts.jsonLd) {
      const s = JSON.stringify(block);
      const m = /"addressLocality"\s*:\s*"([^"]{2,40})"/.exec(s);
      if (m) return m[1].trim();
    }
  }
  const re = /\b([1-9]\d{3})\s+([A-ZÆØÅ][a-zæøåé]+(?:[ -][A-ZÆØÅ][a-zæøå]+)?)/g;
  for (const facts of pages) {
    for (const hay of [facts.footerText, facts.text]) {
      let m: RegExpExecArray | null;
      re.lastIndex = 0;
      while ((m = re.exec(hay))) {
        const year = Number(m[1]);
        if (year >= 1900 && year <= 2100 && !/(vej|gade|allé|alle|plads|stræde|torv|vænge|park)/i.test(hay.slice(Math.max(0, m.index - 30), m.index))) continue;
        const words = m[2].split(/[ -]/);
        if (CITY_STOP.test(words[0])) continue;
        return words.length > 1 && !CITY_STOP.test(words[1]) ? m[2] : words[0];
      }
    }
  }
  return null;
}

export function evaluate(crawl: CrawlResult, domain: string): { findings: Finding[]; signals: Signals } {
  const home = crawl.home.facts!;
  const desktop = crawl.homeDesktop?.facts ?? null;
  const subpages = crawl.pages.filter((p) => p.facts && p.status < 400) as (CrawledPage & { facts: PageFacts })[];
  const all = [{ ...crawl.home, facts: home } as CrawledPage & { facts: PageFacts }, ...subpages];
  const allFacts = all.map((p) => p.facts);
  const everything = desktop ? [...allFacts, desktop] : allFacts;
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);

  const company = companyName(home, domain);
  const city = findCity(all.filter((p) => ['home', 'contact', 'about'].includes(p.kind)).map((p) => p.facts));
  const contactPage = all.find((p) => p.kind === 'contact');
  const contactPageFound = Boolean(contactPage) || crawl.discovered.some((d) => d.kind === 'contact');

  /* ------------------------------------------------------------ signals */
  const telPages = all.filter((p) => p.facts.telLinks.length > 0);
  const anyTel = telPages.length > 0 || Boolean(desktop?.telLinks.length);
  const phoneTextPages = all.filter((p) => p.facts.phonesInText.length > 0);
  const homeMobileTelAbove = home.telLinks.some((t) => t.aboveFold);
  const homeMobileCtaAbove = home.ctas.some((c) => c.aboveFold);
  const joinedSrc = (f: PageFacts) => [...f.iframes, ...f.scripts, ...f.links.map((l) => l.href)].join(' ');
  const bookingPages = all.filter((p) => BOOKING_RE.test(joinedSrc(p.facts)));
  const formProviderPages = all.filter((p) => FORM_PROVIDER_RE.test(p.facts.iframes.join(' ') + ' ' + p.facts.scripts.join(' ')));
  const chat = everything.some((f) => f.globals.length > 0 || CHAT_RE.test(f.scripts.join(' ')));
  const whatsapp = everything.some((f) => f.links.some((l) => /wa\.me|api\.whatsapp\.com/i.test(l.href)));
  const contactForms = all.flatMap((p) =>
    p.facts.forms.filter((f) => f.hasMessage || f.hasEmail || f.hasPhone || f.fields >= 3).map((f) => ({ ...f, page: p.finalUrl }))
  );
  const hasContactForm = contactForms.length > 0 || formProviderPages.length > 0;
  const mapsLinked = everything.some((f) => f.links.some((l) => MAPS_RE.test(l.href)) || f.iframes.some((s) => /google\.[a-z.]+\/maps/i.test(s)));
  const reviewWidget = everything.some((f) => REVIEW_WIDGET_RE.test([...f.iframes, ...f.scripts].join(' ')) || f.links.some((l) => /trustpilot\.com\/review/i.test(l.href)));
  const reviewTextPages = all.filter((p) => REVIEW_TEXT_RE.test(p.facts.text));
  const referencesPage = crawl.discovered.some((d) => d.kind === 'references');
  const socialProof = reviewWidget || reviewTextPages.length > 0 || referencesPage;
  const responsePromise = all.some((p) => RESPONSE_PROMISE_RE.test(p.facts.text));
  const callbackOffered = all.some((p) => CALLBACK_RE.test(p.facts.text));
  const clientRendered = crawl.rawHomeTextLength < Math.max(120, home.textLength * 0.2) && home.textLength > 300;

  /* ---------------------------------------------------- contact and booking */
  if (!anyTel && phoneTextPages.length > 0) {
    add({
      id: 'phone_not_clickable',
      area: 'contact',
      confidence: 'high',
      impact: 9,
      public: true,
      text: {
        da: { observed: 'Jeres telefonnummer står på siden, men man kan ikke trykke på det fra en mobil.', opportunity: 'Et klikbart nummer gør det til ét tryk at ringe til jer.' },
        en: { observed: "Your phone number is on the page, but it can't be tapped on a phone.", opportunity: 'A tappable number turns calling you into a single tap.' },
      },
      evidence: [`Telefonnummer i tekst (${phoneTextPages[0].facts.phonesInText[0]}), 0 tel:-links på ${all.length} sider`],
      sources: phoneTextPages.slice(0, 3).map((p) => p.finalUrl),
      task: 'Gør telefonnummeret klikbart (tel:-link) i header, footer og på kontaktsiden.',
    });
  } else if (!anyTel && phoneTextPages.length === 0) {
    add({
      id: 'no_phone',
      area: 'contact',
      confidence: contactPageFound ? 'high' : 'medium',
      impact: 7,
      public: true,
      text: {
        da: { observed: 'Vi fandt ikke et telefonnummer på de sider, vi gennemgik.', opportunity: 'Mange vil hellere ringe end skrive, og et synligt nummer fanger dem, der er klar nu.' },
        en: { observed: "We didn't find a phone number on the pages we reviewed.", opportunity: 'Many people would rather call than write, and a visible number catches those ready to act now.' },
      },
      evidence: [`0 tel:-links og 0 telefonnumre i tekst på ${all.length} sider${contactPageFound ? ' (inkl. kontaktside)' : ''}`],
      sources: all.map((p) => p.finalUrl).slice(0, 4),
      task: 'Afklar om de vil tage imod opkald; i så fald nummer + klik-for-at-ringe i header.',
    });
  }

  if (!homeMobileCtaAbove) {
    add({
      id: 'no_contact_first_screen',
      area: 'contact',
      confidence: 'high',
      impact: 7,
      public: true,
      text: {
        da: { observed: 'Den første skærm på mobilen viser ingen tydelig måde at tage kontakt på.', opportunity: "En klar knap som 'Få et tilbud' eller 'Ring til os' giver de mest interesserede besøgende en vej videre." },
        en: { observed: 'The first screen on mobile shows no clear way to get in touch.', opportunity: "A clear button such as 'Get a quote' or 'Call us' gives your most interested visitors a way forward." },
      },
      evidence: [`Ingen kontakt-, tilbuds-, booking- eller ring-knap og intet tel:-link synligt i de første ${home.viewportHeight}px på ${home.viewportWidth}px bred mobil`],
      sources: [crawl.home.finalUrl],
      task: "Primær CTA i mobil-heroen ('Få et tilbud' / 'Ring nu') og evt. sticky ring-knap.",
    });
  } else if (anyTel && !homeMobileTelAbove) {
    const where = telPages.some((p) => p.facts.telLinks.some((t) => t.inChrome && !t.inHeader)) ? 'footer' : 'menu';
    add({
      id: 'phone_hidden_mobile',
      area: 'contact',
      confidence: 'high',
      impact: 5,
      public: true,
      text: {
        da: { observed: 'På mobilen skal man scrolle eller åbne menuen for at finde jeres telefonnummer.', opportunity: "Et synligt nummer eller en 'Ring'-knap øverst gør det let for dem, der vil ringe med det samme." },
        en: { observed: 'On mobile, visitors have to scroll or open the menu to find your phone number.', opportunity: "A visible number or a 'Call' button at the top makes it easy for people who want to call right away." },
      },
      evidence: [`tel:-link findes (${where}), men ikke synligt i første mobilskærm`],
      sources: [crawl.home.finalUrl],
      task: 'Nummer eller ring-ikon i mobil-headeren.',
    });
  }

  if (!hasContactForm && bookingPages.length === 0) {
    add({
      id: 'no_form',
      area: 'contact',
      confidence: contactPageFound ? 'high' : 'medium',
      impact: 6,
      public: true,
      text: {
        da: { observed: 'Der er ingen kontaktformular på de sider, vi gennemgik.', opportunity: 'En kort formular gør det let at skrive til jer, også om aftenen og i weekenden.' },
        en: { observed: "There's no contact form on the pages we reviewed.", opportunity: 'A short form makes it easy to reach you, even in the evening or at weekends.' },
      },
      evidence: [`0 kontaktformularer og 0 formular-/bookingværktøjer på ${all.length} sider${contactPageFound ? ' (inkl. kontaktside)' : ', kontaktside ikke fundet'}`],
      sources: all.map((p) => p.finalUrl).slice(0, 4),
      task: 'Kort henvendelsesformular (navn, telefon, opgave) + notifikation til virksomheden.',
    });
  }

  const longForm = contactForms.find((f) => f.fields >= 8 || f.required >= 6);
  if (longForm) {
    add({
      id: 'long_form',
      area: 'contact',
      confidence: 'high',
      impact: 5,
      public: true,
      text: {
        da: { observed: `Kontaktformularen har ${longForm.fields} felter, der skal udfyldes.`, opportunity: 'Færre felter gør det hurtigere at skrive, og detaljerne kan I tage i samtalen.' },
        en: { observed: `The contact form has ${longForm.fields} fields to fill in.`, opportunity: 'Fewer fields make it quicker to reach out, and the details can wait for the conversation.' },
      },
      evidence: [`${longForm.fields} felter, ${longForm.required} påkrævede`],
      sources: [longForm.page],
      task: 'Skær formularen ned til 3–4 felter.',
    });
  }

  if (desktop && contactPageFound) {
    const headerContact =
      desktop.links.some((l) => l.inHeader && /(kontakt|contact|visit|besøg|find os)/i.test(l.text + ' ' + l.href)) ||
      desktop.ctas.some((c) => c.inHeader && c.kind !== 'email');
    if (!headerContact) {
      add({
        id: 'contact_not_in_menu',
        area: 'contact',
        confidence: 'high',
        impact: 4,
        public: true,
        text: {
          da: { observed: 'Kontaktsiden er ikke med i menuen øverst på siden.', opportunity: 'Når kontakt er ét klik væk fra alle sider, er det lettere at tage det sidste skridt.' },
          en: { observed: "Your contact page isn't in the menu at the top.", opportunity: 'When contact is one click away from every page, the last step is easier to take.' },
        },
        evidence: ['Kontaktside fundet, men intet kontaktlink eller kontaktknap i headeren på desktop'],
        sources: [crawl.home.finalUrl],
        task: 'Kontakt-knap i hovedmenuen.',
      });
    }
  }

  const deadEnds = subpages.filter(
    (p) =>
      !['contact', 'booking', 'legal', 'blog'].includes(p.kind) &&
      p.facts.ctas.filter((c) => !c.inChrome).length === 0 &&
      p.facts.forms.filter((f) => !f.inFooter).length === 0 &&
      !p.facts.links.some((l) => !l.inHeader && !l.inFooter && /(kontakt|contact|book|tilbud|quote)/i.test(l.href + ' ' + l.text))
  );
  if (deadEnds.length >= 2 || (deadEnds.length === 1 && subpages.length <= 2)) {
    const name = deadEnds[0].facts.h1[0] || deadEnds[0].linkText || pathOf(deadEnds[0].finalUrl);
    add({
      id: 'dead_end_pages',
      area: 'contact',
      confidence: 'medium',
      impact: 5,
      public: true,
      text: {
        da: {
          observed: deadEnds.length === 1 ? `Siden "${name}" slutter uden en opfordring til at tage kontakt.` : `${deadEnds.length} af jeres undersider, fx "${name}", slutter uden en opfordring til at tage kontakt.`,
          opportunity: 'En knap i bunden af hver side fanger besøgende, mens de er mest interesserede.',
        },
        en: {
          observed: deadEnds.length === 1 ? `The page "${name}" ends without an invitation to get in touch.` : `${deadEnds.length} of your pages, such as "${name}", end without an invitation to get in touch.`,
          opportunity: "A button at the end of every page catches visitors while they're most interested.",
        },
      },
      evidence: [`Ingen CTA, formular eller kontaktlink i sideindholdet (uden for header/footer) på: ${deadEnds.map((p) => pathOf(p.finalUrl)).join(', ')}`],
      sources: deadEnds.map((p) => p.finalUrl),
      task: 'Fast CTA-blok nederst på ydelses- og undersider.',
    });
  }

  /* ------------------------------------------------------------- follow-up */
  if (hasContactForm && !responsePromise) {
    add({
      id: 'no_response_promise',
      area: 'followup',
      confidence: 'medium',
      impact: 4,
      public: true,
      text: {
        da: { observed: 'Ved kontaktformularen står der ikke, hvornår man hører fra jer.', opportunity: "Et konkret løfte som 'Svar inden for én arbejdsdag' gør det trygt at skrive til jer frem for en konkurrent." },
        en: { observed: "Your contact form doesn't say when people will hear back.", opportunity: "A concrete promise like 'Reply within one business day' makes it feel safe to contact you rather than a competitor." },
      },
      evidence: ['Formular fundet; ingen tekst om svartid på de gennemgåede sider'],
      sources: contactForms.map((f) => f.page).slice(0, 2),
      task: 'Svarløfte ved formularen + automatisk kvittering til kunden (Growth Action).',
    });
  }
  if (!hasContactForm && !callbackOffered && !chat && !whatsapp && bookingPages.length === 0 && anyTel) {
    add({
      id: 'no_after_hours',
      area: 'followup',
      confidence: 'medium',
      impact: 3,
      public: false,
      text: {
        da: { observed: 'Uden for åbningstid er der kun e-mail eller telefonsvarer.', opportunity: 'En mulighed for at blive ringet op fanger henvendelser, der ellers går tabt om aftenen.' },
        en: { observed: 'Outside opening hours there is only email or voicemail.', opportunity: 'An option to request a callback catches enquiries that would otherwise be lost in the evening.' },
      },
      evidence: ['Ingen formular, chat, WhatsApp, booking eller "ring mig op"'],
      sources: [crawl.home.finalUrl],
      task: 'Ring-mig-op-formular / missed-call-opfølgning (Growth Action).',
    });
  }

  /* ---------------------------------------------------------------- Google */
  const noindexPages = all.filter((p) => /noindex/.test(p.facts.robotsMeta));
  if (noindexPages.length) {
    const isHome = noindexPages.some((p) => p.kind === 'home');
    add({
      id: 'noindex',
      area: 'google',
      confidence: 'high',
      impact: 10,
      public: true,
      text: {
        da: {
          observed: isHome ? 'Forsiden er sat op til ikke at blive vist på Google.' : `${noindexPages.length} af jeres sider er sat op til ikke at blive vist på Google.`,
          opportunity: 'Når indstillingen fjernes, kan de, der søger efter jer, finde siderne igen.',
        },
        en: {
          observed: isHome ? 'Your homepage is set not to appear on Google.' : `${noindexPages.length} of your pages are set not to appear on Google.`,
          opportunity: 'Removing that setting lets people searching for you find the pages again.',
        },
      },
      evidence: noindexPages.map((p) => `meta robots "${p.facts.robotsMeta}" på ${pathOf(p.finalUrl)}`),
      sources: noindexPages.map((p) => p.finalUrl),
      task: 'Fjern noindex; genindsend i Google Search Console.',
    });
  }
  if (crawl.robots.blocksAll) {
    add({
      id: 'robots_block',
      area: 'google',
      confidence: 'high',
      impact: 10,
      public: true,
      text: {
        da: { observed: 'Websitet beder søgemaskiner om ikke at læse siderne.', opportunity: 'Når det rettes, kan Google igen vise jeres sider i søgeresultaterne.' },
        en: { observed: 'The website tells search engines not to read its pages.', opportunity: 'Once fixed, Google can show your pages in search results again.' },
      },
      evidence: ['robots.txt: User-agent: * / Disallow: /'],
      sources: [`${new URL(crawl.home.finalUrl).origin}/robots.txt`],
      task: 'Ret robots.txt; tjek indeksering i Search Console.',
    });
  }

  const titleCounts = new Map<string, number>();
  all.forEach((p) => titleCounts.set(p.facts.title, (titleCounts.get(p.facts.title) ?? 0) + 1));
  const [topTitle, topCount] = [...titleCounts.entries()].sort((a, b) => b[1] - a[1])[0] ?? ['', 0];
  const missingTitles = all.filter((p) => !p.facts.title).length;
  if (all.length >= 3 && ((topCount >= 3 && topCount / all.length >= 0.5) || missingTitles >= 2)) {
    const n = missingTitles >= 2 ? missingTitles : topCount;
    add({
      id: 'same_titles',
      area: 'google',
      confidence: 'high',
      impact: 5,
      public: true,
      text: {
        da: {
          observed: missingTitles >= 2 ? `${n} af jeres sider har ingen titel, når de vises på Google.` : `${n} af de ${all.length} sider, vi gennemgik, har den samme titel på Google.`,
          opportunity: 'Når hver side har sin egen titel, kan Google vise den rigtige side på den rigtige søgning.',
        },
        en: {
          observed: missingTitles >= 2 ? `${n} of your pages have no title when they appear on Google.` : `${n} of the ${all.length} pages we reviewed share the same title on Google.`,
          opportunity: 'Giving each page its own title lets Google show the right page for the right search.',
        },
      },
      evidence: missingTitles >= 2 ? [`${missingTitles} sider uden <title>`] : [`"${topTitle}" på ${topCount}/${all.length} sider (renderet)`],
      sources: all.filter((p) => p.facts.title === topTitle || !p.facts.title).map((p) => p.finalUrl),
      task: 'Unik titel og beskrivelse pr. side (ydelse + område).',
    });
  }

  if (city) {
    const cityRe = new RegExp(city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const inTitles = all.some((p) => cityRe.test(p.facts.title) || cityRe.test(p.facts.description));
    if (!inTitles) {
      add({
        id: 'no_city',
        area: 'google',
        confidence: 'medium',
        impact: 5,
        public: true,
        text: {
          da: { observed: `Ingen af jeres sidetitler nævner ${city}, hvor I holder til.`, opportunity: 'Lokale søgninger med bynavn er ofte dem, der ender med en kunde, og dem kan siderne matche bedre.' },
          en: { observed: `None of your page titles mention ${city}, where you're based.`, opportunity: 'Local searches that include a town name are often the ones that turn into customers, and your pages could match them better.' },
        },
        evidence: [`By fundet: ${city}; ikke i title/description på ${all.length} sider`],
        sources: all.map((p) => p.finalUrl).slice(0, 4),
        task: 'Lokale søgeord (ydelse + by) i titler, H1 og beskrivelser; evt. områdesider.',
      });
    }
  }

  const contentPages = crawl.discovered.filter((d) => !['legal', 'blog'].includes(d.kind));
  if (contentPages.length < 2) {
    add({
      id: 'few_pages',
      area: 'google',
      confidence: 'medium',
      impact: 4,
      public: true,
      text: {
        da: { observed: `Vi fandt kun ${contentPages.length + 1} ${contentPages.length === 0 ? 'side' : 'sider'} på websitet.`, opportunity: 'En side pr. ydelse giver Google flere måder at finde jer på, og kunden et mere præcist svar.' },
        en: { observed: `We found only ${contentPages.length + 1} ${contentPages.length === 0 ? 'page' : 'pages'} on the website.`, opportunity: 'A page for each service gives Google more ways to find you, and the customer a more precise answer.' },
      },
      evidence: [`${crawl.discovered.length} interne links fundet fra forsiden`],
      sources: [crawl.home.finalUrl],
      task: 'Servicesider pr. ydelse og intern linkstruktur.',
    });
  }

  if (clientRendered) {
    add({
      id: 'ai_readability',
      area: 'google',
      confidence: 'high',
      impact: 3,
      public: true,
      text: {
        da: { observed: 'Når AI-assistenter som ChatGPT henter jeres sider, er de næsten tomme, fordi indholdet først vises, når en browser har åbnet dem.', opportunity: 'En lille teknisk tilpasning gør indholdet synligt for dem også, uden at websitet skal laves om.' },
        en: { observed: 'When AI assistants like ChatGPT fetch your pages, they are almost empty, because the content only appears once a browser has opened them.', opportunity: 'A small technical adjustment makes the content visible to them too, without rebuilding the website.' },
      },
      evidence: [`Rå HTML: ${crawl.rawHomeTextLength} tegn synlig tekst; renderet i browser: ${home.textLength} tegn (klient-renderet app)`],
      sources: [crawl.home.finalUrl],
      task: 'Prerendering/SSG så indholdet findes i rå HTML (AI-crawlere, previews). Ikke nyt website.',
    });
  }

  const missingDesc = all.filter((p) => !p.facts.description).length;
  if (missingDesc >= Math.max(2, Math.ceil(all.length / 2))) {
    add({
      id: 'no_descriptions',
      area: 'google',
      confidence: 'high',
      impact: 3,
      public: false,
      text: {
        da: { observed: `${missingDesc} sider mangler en beskrivelse til søgeresultaterne.`, opportunity: 'Uden beskrivelse vælger Google selv teksten under titlen.' },
        en: { observed: `${missingDesc} pages have no search-result description.`, opportunity: 'Without one, Google picks the snippet itself.' },
      },
      evidence: [`meta description mangler på ${missingDesc}/${all.length}`],
      sources: all.filter((p) => !p.facts.description).map((p) => p.finalUrl),
      task: 'Meta descriptions pr. side.',
    });
  }
  const ldTypes = everything.flatMap((f) => (JSON.stringify(f.jsonLd).match(/"@type"\s*:\s*"([^"]+)"/g) ?? []).map((m) => m.split('"')[3]));
  if (!ldTypes.some((t) => /LocalBusiness|Organization|Store|Contractor|Plumber|Roofing|HomeAndConstruction|ProfessionalService|Restaurant|Cafe|Bakery|Establishment|Business|Service/i.test(t))) {
    add({
      id: 'no_business_data',
      area: 'google',
      confidence: 'high',
      impact: 3,
      public: false,
      text: {
        da: { observed: 'Ingen struktureret virksomhedsdata (adresse, telefon, åbningstider).', opportunity: 'Hjælper Google og AI med at forstå, hvem og hvor I er.' },
        en: { observed: 'No structured business data (address, phone, opening hours).', opportunity: 'Helps Google and AI understand who and where you are.' },
      },
      evidence: [`JSON-LD typer fundet: ${[...new Set(ldTypes)].join(', ') || 'ingen'}`],
      sources: [crawl.home.finalUrl],
      task: 'LocalBusiness-schema med NAP og åbningstider.',
    });
  }
  if (!home.h1.length) {
    add({
      id: 'no_h1',
      area: 'google',
      confidence: 'high',
      impact: 2,
      public: false,
      text: {
        da: { observed: 'Forsiden har ingen H1-overskrift.', opportunity: 'En H1 med ydelse og område gør sidens emne entydigt.' },
        en: { observed: 'The homepage has no H1 heading.', opportunity: 'An H1 with service and area makes the topic unambiguous.' },
      },
      evidence: ['0 H1 på renderet forside'],
      sources: [crawl.home.finalUrl],
      task: 'H1 med ydelse + område på forsiden.',
    });
  }
  if (!crawl.sitemapFound) {
    add({
      id: 'no_sitemap',
      area: 'google',
      confidence: 'medium',
      impact: 2,
      public: false,
      text: { da: { observed: 'Ingen sitemap.xml.', opportunity: 'Hurtigere indeksering af alle sider.' }, en: { observed: 'No sitemap.xml.', opportunity: 'Faster indexing of every page.' } },
      evidence: ['/sitemap.xml svarede ikke med XML'],
      sources: [`${new URL(crawl.home.finalUrl).origin}/sitemap.xml`],
      task: 'Sitemap + indsendelse i Search Console.',
    });
  }
  if (crawl.robots.blocksGptBot) {
    add({
      id: 'gptbot_blocked',
      area: 'google',
      confidence: 'high',
      impact: 2,
      public: false,
      text: { da: { observed: 'robots.txt blokerer GPTBot.', opportunity: 'ChatGPT kan ikke læse siderne.' }, en: { observed: 'robots.txt blocks GPTBot.', opportunity: "ChatGPT can't read the pages." } },
      evidence: ['User-agent: GPTBot / Disallow: /'],
      sources: [`${new URL(crawl.home.finalUrl).origin}/robots.txt`],
      task: 'Afklar om AI-crawlere skal have adgang.',
    });
  }

  /* ---------------------------------------------- reviews and Google profile */
  if (!socialProof) {
    add({
      id: 'no_reviews',
      area: 'gbp',
      confidence: 'medium',
      impact: 5,
      public: true,
      text: {
        da: { observed: 'Vi fandt ingen anmeldelser eller udtalelser fra kunder på websitet.', opportunity: 'Et par konkrete kundeudtalelser tæt på kontaktknappen hjælper nye kunder med at vælge jer.' },
        en: { observed: 'We found no reviews or customer testimonials on the website.', opportunity: 'A few concrete testimonials near your contact button help new customers choose you.' },
      },
      evidence: ['Ingen anmeldelses-widgets, ingen anmeldelsestekst og ingen referenceside på de gennemgåede sider'],
      sources: all.map((p) => p.finalUrl).slice(0, 4),
      task: 'Anmeldelsesflow efter afsluttet opgave + udtalelser ved CTA.',
    });
  }
  if (!mapsLinked) {
    add({
      id: 'no_gbp_link',
      area: 'gbp',
      confidence: 'medium',
      impact: 3,
      public: true,
      text: {
        da: { observed: 'Websitet viser ikke vej til jeres Google-profil.', opportunity: 'Et link til profilen gør det let for tilfredse kunder at skrive en anmeldelse, som nye kunder ser på Google.' },
        en: { observed: "The website doesn't point to your Google Business Profile.", opportunity: 'A link to the profile makes it easy for happy customers to leave a review that new customers see on Google.' },
      },
      evidence: ['Intet link til Google Maps/Business-profil og intet kort-embed på de gennemgåede sider'],
      sources: [crawl.home.finalUrl],
      task: "Link til Google-profil + 'Giv os en anmeldelse'-link; gennemgå profilen.",
    });
  }

  /* --------------------------------------------------------------- website */
  const overflowPages = all.filter((p) => p.facts.overflowPx > 12);
  const websiteReasons: Signals['websiteReasons'] = [];
  if (!home.viewportMeta) {
    add({
      id: 'not_mobile',
      area: 'website',
      confidence: 'high',
      impact: 10,
      public: true,
      structural: true,
      text: {
        da: { observed: 'Websitet er ikke tilpasset mobiltelefoner og vises som en formindsket computerside.', opportunity: 'De fleste finder lokale virksomheder på mobilen, så det er ofte her, flest henvendelser går tabt.' },
        en: { observed: "The website isn't built for phones and shows up as a shrunken desktop page.", opportunity: 'Most people find local businesses on their phone, so this is often where most enquiries are lost.' },
      },
      evidence: ['Ingen viewport-meta på forsiden'],
      sources: [crawl.home.finalUrl],
      task: 'Nyt mobilvenligt website.',
    });
    websiteReasons.push({ da: 'det nuværende er ikke tilpasset mobiltelefoner', en: "the current one isn't built for phones", internal: 'Ingen viewport-meta' });
  } else if (overflowPages.some((p) => p.kind === 'home') || overflowPages.length >= 2) {
    add({
      id: 'mobile_overflow',
      area: 'website',
      confidence: 'high',
      impact: 7,
      public: true,
      structural: overflowPages.length / all.length >= 0.6,
      text: {
        da: { observed: 'På mobil er siden bredere end skærmen, så man skal scrolle til siden for at læse.', opportunity: 'Når siden passer til skærmen, er den lettere at læse og at tage kontakt fra.' },
        en: { observed: 'On mobile the page is wider than the screen, so people have to scroll sideways to read.', opportunity: "When the page fits the screen, it's easier to read and to get in touch from." },
      },
      evidence: overflowPages.map((p) => `${pathOf(p.finalUrl)}: ${p.facts.overflowPx}px bredere end 390px`),
      sources: overflowPages.map((p) => p.finalUrl),
      task: 'Ret mobil-layout (overflow).',
    });
    if (overflowPages.length / all.length >= 0.6) websiteReasons.push({ da: 'flere sider passer ikke til en mobilskærm', en: "several pages don't fit a phone screen", internal: `Overflow på ${overflowPages.length}/${all.length} sider` });
  }
  if (everything.some((f) => f.hasFrameset || f.hasFlash)) {
    websiteReasons.push({ da: 'det er bygget med teknik, som moderne browsere ikke understøtter', en: "it's built with technology modern browsers no longer support", internal: 'Frameset/Flash fundet' });
  }
  if (!crawl.https) {
    add({
      id: 'no_https',
      area: 'website',
      confidence: 'high',
      impact: 8,
      public: true,
      text: {
        da: { observed: "Websitet bruger ikke en sikker forbindelse, så browseren kan vise 'Ikke sikker'.", opportunity: 'En sikker forbindelse fjerner advarslen og gør det trygt at udfylde en formular.' },
        en: { observed: "The website doesn't use a secure connection, so browsers may show 'Not secure'.", opportunity: 'A secure connection removes the warning and makes filling in a form feel safe.' },
      },
      evidence: [`Endelig URL: ${crawl.home.finalUrl}`],
      sources: [crawl.home.finalUrl],
      task: 'SSL-certifikat + redirect til https.',
    });
  }
  if (crawl.brokenLinks.length) {
    add({
      id: 'broken_links',
      area: 'website',
      confidence: 'high',
      impact: 6,
      public: true,
      text: {
        da: {
          observed: crawl.brokenLinks.length === 1 ? 'Et link på websitet fører til en side, der ikke findes.' : `${crawl.brokenLinks.length} links på websitet fører til sider, der ikke findes.`,
          opportunity: `Når ${crawl.brokenLinks.length === 1 ? 'det rettes' : 'de rettes'}, lander besøgende dér, hvor de forventer, i stedet for at give op.`,
        },
        en: {
          observed: crawl.brokenLinks.length === 1 ? "A link on the website leads to a page that doesn't exist." : `${crawl.brokenLinks.length} links on the website lead to pages that don't exist.`,
          opportunity: `Fixing ${crawl.brokenLinks.length === 1 ? 'it' : 'them'} means visitors land where they expect instead of giving up.`,
        },
      },
      evidence: crawl.brokenLinks.map((b) => `${pathOf(b.url)} → HTTP ${b.status}`),
      sources: crawl.brokenLinks.map((b) => b.url),
      task: 'Ret eller omdiriger døde links.',
    });
  }
  const failed = crawl.pages.filter((p) => !p.facts || p.status >= 400).length;
  if (crawl.pages.length >= 2 && failed / crawl.pages.length >= 0.5) {
    websiteReasons.push({ da: 'mange af siderne virker ikke', en: "many of the pages don't work", internal: `${failed}/${crawl.pages.length} undersider fejlede` });
  }
  if (home.loadMs > 9000) {
    add({
      id: 'slow',
      area: 'website',
      confidence: 'medium',
      impact: 4,
      public: true,
      text: {
        da: { observed: `Forsiden var ${Math.round(home.loadMs / 1000)} sekunder om at blive færdig hos os.`, opportunity: 'En hurtigere side holder på flere besøgende, særligt på mobil.' },
        en: { observed: `The homepage took ${Math.round(home.loadMs / 1000)} seconds to finish loading for us.`, opportunity: 'A faster page keeps more visitors, especially on mobile.' },
      },
      evidence: [`loadEventEnd ${home.loadMs} ms (mobil, servermiljø)`],
      sources: [crawl.home.finalUrl],
      task: 'Performance: billeder, scripts, hosting.',
    });
  }
  const imgsNoAlt = all.reduce((n, p) => n + p.facts.imagesNoAlt, 0);
  const imgs = all.reduce((n, p) => n + p.facts.imagesTotal, 0);
  if (imgs >= 5 && imgsNoAlt / imgs >= 0.4) {
    add({
      id: 'images_alt',
      area: 'website',
      confidence: 'high',
      impact: 1,
      public: false,
      text: { da: { observed: `${imgsNoAlt} af ${imgs} billeder mangler alt-tekst.`, opportunity: 'Tilgængelighed og billedsøgning.' }, en: { observed: `${imgsNoAlt} of ${imgs} images lack alt text.`, opportunity: 'Accessibility and image search.' } },
      evidence: [`${imgsNoAlt}/${imgs}`],
      sources: [crawl.home.finalUrl],
      task: 'Alt-tekster.',
    });
  }

  const websiteJustified =
    websiteReasons.some((r) => /viewport|Frameset|fejlede/.test(r.internal)) || websiteReasons.length >= 2;

  return {
    findings,
    signals: {
      company,
      city,
      pagesReviewed: all.length,
      contactPageFound,
      clientRendered,
      websiteJustified,
      websiteReasons,
      facts: {
        https: crawl.https,
        rawHomeTextLength: crawl.rawHomeTextLength,
        renderedHomeTextLength: home.textLength,
        telLinks: telPages.map((p) => pathOf(p.finalUrl)),
        phonesInText: [...new Set(all.flatMap((p) => p.facts.phonesInText))],
        mailto: [...new Set(all.flatMap((p) => p.facts.mailto))],
        homeMobileCtasAboveFold: home.ctas.filter((c) => c.aboveFold).map((c) => `${c.kind}: ${c.text}`),
        homeDesktopHeaderCtas: desktop?.ctas.filter((c) => c.inHeader).map((c) => `${c.kind}: ${c.text}`) ?? [],
        contactForms: contactForms.map((f) => `${pathOf(f.page)}: ${f.fields} felter (${f.required} påkrævet), knap "${f.submit}"`),
        formProviders: formProviderPages.map((p) => pathOf(p.finalUrl)),
        booking: bookingPages.map((p) => pathOf(p.finalUrl)),
        chat,
        whatsapp,
        callbackOffered,
        responsePromise,
        mapsLinked,
        reviewWidget,
        reviewTextOn: reviewTextPages.map((p) => pathOf(p.finalUrl)),
        referencesPage,
        city,
        titles: Object.fromEntries(titleCounts),
        jsonLdTypes: [...new Set(ldTypes)],
        robots: crawl.robots,
        sitemap: crawl.sitemapFound,
        copyrightYear: home.copyrightYear,
        discovered: crawl.discovered.map((d) => `${d.kind} ${pathOf(d.url)}`),
      },
    },
  };
}
