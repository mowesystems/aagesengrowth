/**
 * POST /api/growth-scan — Growth Scan, V1.
 *
 * What this does today: fetches the submitted website and measures a set of
 * concrete, verifiable signals about lead capture, trust and technical
 * foundations. Every score and finding it returns is derived from those
 * measurements. What it does not do: search Google or query AI models. Those
 * dimensions are returned as `null` and listed in `pending`, and the UI shows
 * them as part of the full review.
 *
 * When MOWE takes over, it replaces this function behind the same path and the
 * same response shape (see src/lib/growthScan/types.ts).
 */
import type { Config, Context } from '@netlify/functions';

type Severity = 'critical' | 'opportunity' | 'quickwin';
type Dimension = 'google' | 'ai' | 'capture' | 'trust';

interface Finding {
  id: string;
  severity: Severity;
  dimension: Dimension | 'website';
  title: string;
  body: string;
  evidence?: string;
}

interface Signal {
  key: string;
  label: string;
  ok: boolean;
  value?: string | number | boolean | null;
}

/** One observed reason the website itself holds conversion back. */
interface WebsiteReason {
  key: string;
  /** Structural problems are the ones a new site fixes and a patch rarely does. */
  structural: boolean;
  title: string;
  evidence: string;
}

interface WebsiteAssessment {
  /** True when the website itself is judged to materially limit conversion. */
  limitsGrowth: boolean;
  /** Only issues that were actually detected. Empty when nothing was found. */
  reasons: WebsiteReason[];
}

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 1_500_000;
const USER_AGENT =
  'Mozilla/5.0 (compatible; AagesenGrowthScan/1.0; +https://aagesengrowth.com/growth-scan)';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const fail = (error: string, message: string, status: number, domain?: string) =>
  json({ error, message, domain }, status);

/** Rejects anything that is not a public hostname. */
const parseTarget = (input: unknown): URL | null => {
  if (typeof input !== 'string') return null;
  const raw = input.trim();
  if (!raw || raw.length > 2048) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const host = url.hostname.toLowerCase();
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) return null;
    if (/^(localhost|.*\.local|.*\.internal)$/.test(host)) return null;
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return null;
    url.hash = '';
    return url;
  } catch {
    return null;
  }
};

const fetchWithTimeout = async (url: string, init: RequestInit = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'da-DK,da;q=0.9,en;q=0.7',
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
};

const readCapped = async (response: Response) => {
  const reader = response.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    chunks.push(value);
    total += value.byteLength;
    if (total >= MAX_BYTES) {
      await reader.cancel().catch(() => undefined);
      break;
    }
  }
  return new TextDecoder('utf-8').decode(concat(chunks));
};

const concat = (chunks: Uint8Array[]) => {
  const out = new Uint8Array(chunks.reduce((n, c) => n + c.byteLength, 0));
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.byteLength;
  }
  return out;
};

const exists = async (url: string) => {
  try {
    const res = await fetchWithTimeout(url, { method: 'GET' });
    if (!res.ok) return false;
    const type = res.headers.get('content-type') ?? '';
    // Many SPAs answer 200 with the app shell for any path; require the real thing.
    return !/text\/html/i.test(type);
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------- analysis

const strip = (html: string) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

const attr = (tag: string, name: string) => {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return (match?.[2] ?? match?.[3] ?? match?.[4] ?? '').trim();
};

const metaContent = (html: string, key: string) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = (attr(tag, 'name') || attr(tag, 'property')).toLowerCase();
    if (name === key.toLowerCase()) return attr(tag, 'content');
  }
  return '';
};

const jsonLdTypes = (html: string): string[] => {
  const blocks = html.match(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === 'object') {
      const record = node as Record<string, unknown>;
      const t = record['@type'];
      if (typeof t === 'string') types.add(t);
      if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x));
      Object.values(record).forEach(walk);
    }
  };
  for (const block of blocks) {
    const inner = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    try {
      walk(JSON.parse(inner));
    } catch {
      /* malformed JSON-LD counts as absent */
    }
  }
  return [...types];
};

interface Analysis {
  signals: Signal[];
  findings: Finding[];
  website: WebsiteAssessment;
  leadCaptureScore: number | null;
  trustScore: number | null;
  websiteScore: number;
  clientRendered: boolean;
}

const analyse = (
  html: string,
  finalUrl: URL,
  timing: { ttfbMs: number; totalMs: number },
  extras: { sitemap: boolean; robots: boolean }
): Analysis => {
  const clean = strip(html);
  const text = clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  const anchors = clean.match(/<a\b[^>]*>/gi) ?? [];
  const hrefs = anchors.map((a) => attr(a, 'href').toLowerCase());

  const title = (clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').replace(/\s+/g, ' ').trim();
  const description = metaContent(clean, 'description');
  const viewport = metaContent(clean, 'viewport');
  const robotsMeta = metaContent(clean, 'robots').toLowerCase();
  const canonical = /<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i.test(clean);
  const lang = attr(clean.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang');
  const h1Count = (clean.match(/<h1\b/gi) ?? []).length;
  const ogTitle = metaContent(clean, 'og:title');

  const telLinks = hrefs.filter((h) => h.startsWith('tel:')).length;
  const mailLinks = hrefs.filter((h) => h.startsWith('mailto:')).length;
  const forms = (clean.match(/<form\b/gi) ?? []).length;
  const contactLink = hrefs.some((h) => /kontakt|contact|tilbud|book|bestil/.test(h));
  const ctaWords = /(få et tilbud|få tilbud|book|bestil|ring|kontakt os|uforpligtende|gratis tilbud)/.test(text);
  const phonePattern = /(\+45\s?)?(\d{2}\s?){4}\b/.test(text);
  const mapsLink = hrefs.some((h) => /maps\.google|google\.com\/maps|goo\.gl\/maps|g\.page|maps\.app\.goo\.gl/.test(h)) ||
    /google\.com\/maps\/embed/i.test(clean);
  const reviewSignal = /(trustpilot|anmeldelser|google reviews|google-anmeldelser|kundeudtalelser|stjerner|⭐|★)/.test(text) ||
    hrefs.some((h) => /trustpilot|anmeld/.test(h));
  const cvr = /\bcvr\b/.test(text);
  const types = jsonLdTypes(clean);
  const hasLocalBusiness = types.some((t) => /LocalBusiness|Organization|Plumber|Electrician|RoofingContractor|HVACBusiness|HomeAndConstructionBusiness|GeneralContractor|ProfessionalService/i.test(t));
  const hasServiceSchema = types.some((t) => /^Service$|Offer|FAQPage/i.test(t));
  const images = clean.match(/<img\b[^>]*>/gi) ?? [];
  const imagesWithoutAlt = images.filter((img) => !/\balt\s*=/i.test(img)).length;
  const https = finalUrl.protocol === 'https:';
  const noindex = /noindex/.test(robotsMeta);
  const fast = timing.ttfbMs < 800;

  // A JavaScript app shell: almost no text in the document and a mount point
  // for a framework. Nothing about phone numbers, forms or reviews can be
  // measured from the raw HTML, so those signals are reported as not
  // measurable rather than as missing.
  const visibleChars = text.replace(/\s/g, '').length;
  const hasMountPoint = /<div\b[^>]*id\s*=\s*["'](root|app|__next|__nuxt|svelte)["'][^>]*>\s*<\/div>/i.test(clean);
  // Table/font/center markup is hand-written HTML, never an app shell, even
  // when the page carries very little text.
  const legacyMarkup = /<(font|center|table)\b/i.test(clean);
  const clientRendered = visibleChars < 400 && !legacyMarkup && (hasMountPoint || anchors.length < 3);

  const signals: Signal[] = [
    { key: 'https', label: 'HTTPS', ok: https },
    { key: 'ttfb', label: 'Svartid fra server', ok: fast, value: timing.ttfbMs },
    { key: 'viewport', label: 'Mobilvisning (viewport)', ok: Boolean(viewport) },
    { key: 'title', label: 'Sidetitel', ok: title.length >= 15 && title.length <= 70, value: title },
    { key: 'description', label: 'Metabeskrivelse', ok: description.length >= 50 && description.length <= 170 },
    { key: 'h1', label: 'Én H1-overskrift', ok: h1Count === 1, value: h1Count },
    { key: 'canonical', label: 'Canonical-URL', ok: canonical },
    { key: 'noindex', label: 'Indekserbar', ok: !noindex },
    { key: 'lang', label: 'Sprog angivet', ok: Boolean(lang) },
    { key: 'sitemap', label: 'sitemap.xml', ok: extras.sitemap },
    { key: 'robots', label: 'robots.txt', ok: extras.robots },
    { key: 'og', label: 'Open Graph', ok: Boolean(ogTitle) },
    { key: 'rendering', label: 'Indhold synligt i rå HTML', ok: !clientRendered, value: visibleChars },
    { key: 'localBusiness', label: 'Struktureret virksomhedsdata (schema.org)', ok: hasLocalBusiness, value: types.join(', ') || null },
    { key: 'serviceSchema', label: 'Service-/FAQ-data (schema.org)', ok: hasServiceSchema },
  ];

  const contentSignals: Signal[] = [
    { key: 'tel', label: 'Klikbart telefonnummer', ok: telLinks > 0, value: telLinks },
    { key: 'phoneText', label: 'Telefonnummer på forsiden', ok: phonePattern },
    { key: 'form', label: 'Formular på forsiden', ok: forms > 0, value: forms },
    { key: 'contactPath', label: 'Vej til kontakt/tilbud', ok: contactLink },
    { key: 'cta', label: 'Tydelig opfordring til handling', ok: ctaWords },
    { key: 'mail', label: 'E-mail-link', ok: mailLinks > 0 },
    { key: 'maps', label: 'Google Maps / Business-profil', ok: mapsLink },
    { key: 'reviews', label: 'Anmeldelsessignaler', ok: reviewSignal },
    { key: 'cvr', label: 'CVR / virksomhedsoplysninger', ok: cvr },
    { key: 'alt', label: 'Billeder med alt-tekst', ok: images.length === 0 || imagesWithoutAlt / images.length < 0.3, value: `${images.length - imagesWithoutAlt}/${images.length}` },
  ];
  if (!clientRendered) signals.push(...contentSignals);

  // Scores: a weighted checklist. Deterministic and explainable — every point
  // maps to a signal above.
  const weigh = (parts: Array<[boolean, number]>) => {
    const max = parts.reduce((n, [, w]) => n + w, 0);
    const got = parts.reduce((n, [ok, w]) => n + (ok ? w : 0), 0);
    return Math.round((got / max) * 100);
  };

  const leadCaptureScore = clientRendered
    ? null
    : weigh([
        [telLinks > 0, 22],
        [phonePattern, 8],
        [forms > 0, 20],
        [contactLink, 14],
        [ctaWords, 12],
        [Boolean(viewport), 10],
        [fast, 8],
        [mailLinks > 0, 6],
      ]);

  const trustScore = clientRendered
    ? null
    : weigh([
        [reviewSignal, 28],
        [mapsLink, 20],
        [hasLocalBusiness, 20],
        [cvr, 12],
        [https, 10],
        [h1Count === 1 && title.length >= 15, 10],
      ]);

  // Technical foundation: what Google and AI crawlers meet before any content.
  const websiteScore = weigh([
    [https, 12],
    [fast, 12],
    [Boolean(viewport), 8],
    [title.length >= 15 && title.length <= 70, 12],
    [description.length >= 50 && description.length <= 170, 10],
    [h1Count === 1, 8],
    [canonical, 6],
    [!noindex, 10],
    [extras.sitemap, 6],
    [Boolean(ogTitle), 4],
    [!clientRendered, 12],
  ]);

  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);

  if (noindex)
    add({ id: 'noindex', severity: 'critical', dimension: 'google', title: 'Forsiden beder Google om ikke at indeksere den', body: 'Et robots-meta med "noindex" holder siden ude af søgeresultaterne. Det bør fjernes med det samme.', evidence: `robots=${robotsMeta}` });
  if (clientRendered)
    add({ id: 'rendering', severity: 'critical', dimension: 'ai', title: 'Indholdet findes ikke i den rå HTML', body: 'Websitet bygges først i browseren med JavaScript. Google kan rendere det med forsinkelse, men de fleste AI-crawlere læser kun den rå HTML — og ser en tom side.', evidence: `${visibleChars} tegn synlig tekst i dokumentet` });
  if (!clientRendered && telLinks === 0)
    add({ id: 'tel', severity: 'critical', dimension: 'capture', title: 'Ingen klikbart telefonnummer på forsiden', body: 'På mobil ringer kunden ved at trykke. Uden et tel:-link skal nummeret kopieres — og en del gør det ikke.', evidence: phonePattern ? 'Nummer fundet som tekst, ikke som link' : 'Intet nummer fundet' });
  if (!clientRendered && forms === 0 && !contactLink)
    add({ id: 'no-path', severity: 'critical', dimension: 'capture', title: 'Ingen tydelig vej til at sende en henvendelse', body: 'Hverken formular eller link til kontakt/tilbud på forsiden. Kunden skal selv finde ud af, hvordan man kommer i kontakt.' });
  if (!https)
    add({ id: 'https', severity: 'critical', dimension: 'trust', title: 'Websitet kører ikke på HTTPS', body: 'Browsere markerer siden som usikker, og det påvirker både tillid og placering.' });

  if (!hasLocalBusiness)
    add({ id: 'schema', severity: 'opportunity', dimension: 'ai', title: 'Ingen struktureret virksomhedsdata (schema.org)', body: 'Google og AI-modeller læser virksomhedstype, område og ydelser mest pålideligt fra struktureret data. Den mangler.', evidence: types.length ? `Fundet: ${types.join(', ')}` : 'Ingen JSON-LD fundet' });
  if (!clientRendered && !reviewSignal)
    add({ id: 'reviews', severity: 'opportunity', dimension: 'trust', title: 'Ingen anmeldelser vist på forsiden', body: 'Kunden vælger den, andre har valgt. Anmeldelser hører til der, hvor beslutningen træffes.' });
  if (!hasServiceSchema)
    add({ id: 'service-schema', severity: 'opportunity', dimension: 'ai', title: 'Ydelser er ikke beskrevet som data', body: 'Service- eller FAQ-markup gør det tydeligt for AI-søgning, hvad I laver og for hvem.' });
  if (description.length < 50)
    add({ id: 'description', severity: 'opportunity', dimension: 'google', title: 'Metabeskrivelsen mangler eller er for kort', body: 'Det er teksten under overskriften i Google. Uden den vælger Google selv — sjældent til jeres fordel.', evidence: description ? `${description.length} tegn` : 'Mangler' });
  if (title.length < 15 || title.length > 70)
    add({ id: 'title', severity: 'opportunity', dimension: 'google', title: 'Sidetitlen er ikke optimeret', body: 'Titlen bør fortælle ydelse og område på under 70 tegn. Det er det første, Google og kunden læser.', evidence: `"${title || '(tom)'}" — ${title.length} tegn` });
  if (!clientRendered && !ctaWords)
    add({ id: 'cta', severity: 'opportunity', dimension: 'capture', title: 'Ingen tydelig opfordring til at tage kontakt', body: 'Forsiden nævner ikke tilbud, booking eller "ring". Kunden skal have én oplagt næste handling.' });

  if (!fast)
    add({ id: 'ttfb', severity: 'quickwin', dimension: 'website', title: 'Serveren svarer langsomt', body: 'Første byte tager over 0,8 sekunder. Det koster både placering og tålmodighed på mobil.', evidence: `${timing.ttfbMs} ms til første byte` });
  if (!clientRendered && !mapsLink)
    add({ id: 'maps', severity: 'quickwin', dimension: 'trust', title: 'Ingen link til Google Business-profil eller kort', body: 'Et link til profilen kobler websitet og den lokale søgning sammen — og gør det let at finde vej og anmelde.' });
  if (!viewport)
    add({ id: 'viewport', severity: 'quickwin', dimension: 'website', title: 'Ingen viewport-indstilling til mobil', body: 'Uden den skaleres siden forkert på telefoner, hvor størstedelen af lokale søgninger sker.' });
  if (!canonical)
    add({ id: 'canonical', severity: 'quickwin', dimension: 'google', title: 'Canonical-URL mangler', body: 'Fortæller Google, hvilken adresse der er den rigtige, når samme side kan nås på flere.' });
  if (!extras.sitemap)
    add({ id: 'sitemap', severity: 'quickwin', dimension: 'google', title: 'Ingen sitemap.xml', body: 'Et sitemap er den korteste vej til at få alle sider indekseret.' });
  if (h1Count !== 1)
    add({ id: 'h1', severity: 'quickwin', dimension: 'google', title: h1Count === 0 ? 'Forsiden har ingen H1-overskrift' : 'Forsiden har flere H1-overskrifter', body: 'Én hovedoverskrift, der siger ydelse og område, gør sidens emne entydigt.', evidence: `${h1Count} H1` });
  if (!clientRendered && images.length > 0 && imagesWithoutAlt / images.length >= 0.3)
    add({ id: 'alt', severity: 'quickwin', dimension: 'website', title: 'Mange billeder uden alt-tekst', body: 'Alt-tekst er både tilgængelighed og en ekstra beskrivelse af, hvad I laver.', evidence: `${imagesWithoutAlt} af ${images.length} uden alt` });
  if (!clientRendered && !cvr)
    add({ id: 'cvr', severity: 'quickwin', dimension: 'trust', title: 'CVR-nummer vises ikke på forsiden', body: 'Et synligt CVR er et lille, konkret tillidssignal for både kunder og AI-modeller.' });
  if (!ogTitle)
    add({ id: 'og', severity: 'quickwin', dimension: 'website', title: 'Ingen Open Graph-data', body: 'Uden det ser links til jer tomme ud, når de deles i beskeder og på sociale medier.' });

  // ------------------------------------------------ is the website the problem?
  //
  // Growth Scan recommends a new website only when the site itself is the
  // bottleneck. Every reason below is an observation from this fetch, with
  // the evidence that triggered it, and a reason is only listed when it was
  // actually detected. Content-level checks are skipped for client-rendered
  // sites, where the raw HTML says nothing about them.
  const reasons: WebsiteReason[] = [];
  const reason = (r: WebsiteReason) => reasons.push(r);

  // Mobile: no viewport, or a viewport pinned to a desktop width.
  const fixedWidth = viewport.match(/width\s*=\s*(\d{3,4})/i);
  if (!viewport)
    reason({ key: 'mobile', structural: true, title: 'Siden er ikke bygget til mobil', evidence: 'Ingen viewport-indstilling, så siden vises som en formindsket desktopside på telefoner' });
  else if (fixedWidth && Number(fixedWidth[1]) >= 600)
    reason({ key: 'mobile', structural: true, title: 'Siden er ikke bygget til mobil', evidence: `Viewport er låst til ${fixedWidth[1]} px bredde` });

  // Outdated presentation: markup and markers that belong to an older web.
  const legacy: string[] = [];
  const tables = clean.match(/<table\b[^>]*>/gi) ?? [];
  const layoutTables = tables.filter((tag) => /\b(width|cellpadding|cellspacing|bgcolor|border)\s*=/i.test(tag)).length;
  if (layoutTables >= 2) legacy.push(`${layoutTables} tabeller brugt til layout`);
  if (/<font\b/i.test(clean)) legacy.push('<font>-tags');
  if (/<center\b/i.test(clean)) legacy.push('<center>-tags');
  if (/<marquee\b/i.test(clean)) legacy.push('<marquee>-tags');
  if (/<frameset\b|<frame\b/i.test(clean)) legacy.push('frames');
  if (/\.swf\b|application\/x-shockwave-flash/i.test(html)) legacy.push('Flash-indhold');
  const jquery = html.match(/jquery[.-]?(1\.\d+(\.\d+)?)(\.min)?\.js/i);
  if (jquery) legacy.push(`jQuery ${jquery[1]}`);
  const thisYear = new Date().getUTCFullYear();
  const copyrightYears = [...text.matchAll(/(?:©|&copy;|copyright)[^0-9]{0,12}((?:19|20)\d{2})(?:\s*[-–]\s*((?:19|20)\d{2}))?/gi)]
    .map((m) => Number(m[2] ?? m[1]));
  const latestCopyright = copyrightYears.length ? Math.max(...copyrightYears) : null;
  if (latestCopyright !== null && latestCopyright <= thisYear - 3) legacy.push(`copyright-år ${latestCopyright}`);
  if (legacy.length > 0)
    reason({ key: 'outdated', structural: true, title: 'Websitet bærer tydelige tegn på at være forældet', evidence: `Fundet: ${legacy.join(', ')}` });

  // Performance.
  if (timing.ttfbMs > 1500 || timing.totalMs > 4000)
    reason({ key: 'slow', structural: true, title: 'Websitet er langsomt', evidence: `${timing.ttfbMs} ms til første byte, ${timing.totalMs} ms til hele forsiden` });

  if (!https)
    reason({ key: 'https', structural: true, title: 'Websitet kører ikke på HTTPS', evidence: 'Browseren markerer siden som ikke sikker' });

  // Internal navigation: count distinct internal pages the homepage links to.
  const internalPaths = new Set<string>();
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/.test(href)) continue;
    try {
      const target = new URL(href, finalUrl);
      if (target.hostname.replace(/^www\./, '') !== finalUrl.hostname.replace(/^www\./, '')) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|svg|zip|docx?)$/i.test(target.pathname)) continue;
      const path = target.pathname.replace(/\/$/, '') || '/';
      if (path !== '/') internalPaths.add(path);
    } catch {
      /* unparsable href */
    }
  }

  if (!clientRendered) {
    if (telLinks === 0 && forms === 0)
      reason({ key: 'capture', structural: true, title: 'Svag lead-indfangning', evidence: 'Hverken klikbart telefonnummer eller formular på forsiden' });

    if (!ctaWords && !contactLink)
      reason({ key: 'cta', structural: false, title: 'Ingen tydelig opfordring til handling', evidence: 'Forsiden nævner hverken tilbud, booking, "ring" eller kontakt' });

    if (!(clean.match(/<nav\b/i)) && internalPaths.size < 3)
      reason({ key: 'navigation', structural: false, title: 'Navigationen er svær at finde', evidence: `Ingen <nav>-menu og kun ${internalPaths.size} ${internalPaths.size === 1 ? 'internt link' : 'interne links'} på forsiden` });
    else if (internalPaths.size > 120)
      reason({ key: 'navigation', structural: false, title: 'Navigationen er uoverskuelig', evidence: `${internalPaths.size} forskellige interne links fra forsiden` });

    if (internalPaths.size < 4)
      reason({ key: 'structure', structural: false, title: 'Ydelserne har ikke egne sider', evidence: internalPaths.size === 0 ? 'Forsiden linker ikke til nogen undersider' : `Forsiden linker kun til ${internalPaths.size} ${internalPaths.size === 1 ? 'underside' : 'undersider'}` });

    if (!reviewSignal && !cvr && !hasLocalBusiness)
      reason({ key: 'trust', structural: false, title: 'Svage tillidssignaler', evidence: 'Ingen anmeldelser, intet CVR og ingen struktureret virksomhedsdata på forsiden' });
  }

  const seoMissing = [
    title.length < 15 || title.length > 70 ? 'sidetitel' : '',
    description.length < 50 ? 'metabeskrivelse' : '',
    h1Count !== 1 ? 'én H1' : '',
    !canonical ? 'canonical' : '',
    !extras.sitemap ? 'sitemap.xml' : '',
  ].filter(Boolean);
  if (seoMissing.length >= 3)
    reason({ key: 'seo', structural: false, title: 'Tekniske SEO-basics mangler', evidence: `Mangler eller er forkert: ${seoMissing.join(', ')}` });

  // The verdict. One structural problem plus two more issues, or four issues
  // of any kind, means the site itself is the bottleneck rather than a
  // detail on it.
  const structuralCount = reasons.filter((r) => r.structural).length;
  const limitsGrowth = (structuralCount >= 1 && reasons.length >= 3) || reasons.length >= 4 || structuralCount >= 2;

  signals.push({ key: 'websiteLimits', label: 'Websitet begrænser konvertering', ok: !limitsGrowth, value: reasons.map((r) => r.key).join(', ') || null });

  return { signals, findings, website: { limitsGrowth, reasons }, leadCaptureScore, trustScore, websiteScore, clientRendered };
};

// ----------------------------------------------------------------- handler

export default async (request: Request, _context: Context) => {
  if (request.method === 'GET') {
    // Reserved for persisted scans: GET /api/growth-scan/:id. Results are not
    // stored in V1, so there is nothing to return yet.
    return fail('not_found', 'Scan results are not persisted in this version.', 404);
  }
  if (request.method !== 'POST') return fail('method_not_allowed', 'Use POST.', 405);

  let payload: { url?: unknown } = {};
  try {
    payload = (await request.json()) as { url?: unknown };
  } catch {
    return fail('invalid_url', 'Body must be JSON with a url field.', 400);
  }

  const target = parseTarget(payload.url);
  if (!target) return fail('invalid_url', 'Skriv en gyldig webadresse, fx dinvirksomhed.dk', 400);

  const started = Date.now();
  let response: Response;
  try {
    response = await fetchWithTimeout(target.toString());
  } catch (error) {
    const timeout = error instanceof Error && error.name === 'AbortError';
    return fail(
      timeout ? 'timeout' : 'unreachable',
      timeout ? 'Websitet svarede ikke inden for 8 sekunder.' : 'Websitet kunne ikke nås.',
      502,
      target.hostname
    );
  }
  const ttfbMs = Date.now() - started;

  if (response.status === 403 || response.status === 429 || response.status === 503) {
    return fail('blocked', `Websitet afviste scanningen (HTTP ${response.status}).`, 502, target.hostname);
  }
  if (!response.ok) {
    return fail('unreachable', `Websitet svarede med HTTP ${response.status}.`, 502, target.hostname);
  }

  const html = await readCapped(response);
  const totalMs = Date.now() - started;
  const finalUrl = new URL(response.url || target.toString());

  const [sitemap, robots] = await Promise.all([
    exists(`${finalUrl.origin}/sitemap.xml`),
    exists(`${finalUrl.origin}/robots.txt`),
  ]);

  const { signals, findings, website, leadCaptureScore, trustScore, websiteScore, clientRendered } = analyse(
    html,
    finalUrl,
    { ttfbMs, totalMs },
    { sitemap, robots }
  );

  // Weighted over what was measured. Weights: capture 40, trust 30, website 30.
  const parts: Array<[number | null, number]> = [
    [leadCaptureScore, 40],
    [trustScore, 30],
    [websiteScore, 30],
  ];
  const measured = parts.filter((p): p is [number, number] => p[0] !== null);
  const weightSum = measured.reduce((n, [, w]) => n + w, 0);
  const overallScore = Math.round(measured.reduce((n, [v, w]) => n + v * w, 0) / weightSum);
  const pending: Dimension[] = ['google', 'ai'];
  if (clientRendered) pending.push('capture', 'trust');
  const severityOrder: Severity[] = ['critical', 'opportunity', 'quickwin'];
  findings.sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity));

  return json({
    scanId: crypto.randomUUID(),
    domain: finalUrl.hostname.replace(/^www\./, ''),
    finalUrl: finalUrl.toString(),
    scanTimestamp: new Date().toISOString(),
    status: 'preliminary',
    engine: 'website-signals-v1',
    overallScore,
    googleVisibilityScore: null,
    aiVisibilityScore: null,
    leadCaptureScore,
    trustScore,
    websiteScore,
    clientRendered,
    pending,
    signals,
    competitors: [],
    findings,
    website,
    criticalIssues: findings.filter((f) => f.severity === 'critical'),
    opportunities: findings.filter((f) => f.severity === 'opportunity'),
    quickWins: findings.filter((f) => f.severity === 'quickwin'),
    timing: { ttfbMs, totalMs },
  });
};

export const config: Config = {
  path: ['/api/growth-scan', '/api/growth-scan/:id'],
};
