/**
 * Network helpers: which targets may be scanned, and plain HTTP fetches for
 * the few things that do not need a browser (robots.txt, sitemap, the raw
 * HTML used to tell a client-rendered site from a server-rendered one).
 */
import { lookup } from 'node:dns/promises';

export const USER_AGENT_DESKTOP =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 AagesenGrowthScan/2.0';
export const USER_AGENT_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1 AagesenGrowthScan/2.0';

/** Parses what a visitor typed into a public http(s) URL, or null. */
export const parseTarget = (input: unknown): URL | null => {
  if (typeof input !== 'string') return null;
  const raw = input.trim();
  if (!raw || raw.length > 2048) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!/^https?:$/.test(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) return null;
    if (/(^|\.)(localhost|local|internal|lan|home|corp)$/.test(host)) return null;
    url.hash = '';
    url.username = '';
    url.password = '';
    return url;
  } catch {
    return null;
  }
};

const PRIVATE_V4 = [
  /^10\./,
  /^127\./,
  /^0\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,
];

/** True when the host resolves only to public addresses. Guards against scanning internal networks. */
export const resolvesPublic = async (host: string): Promise<boolean> => {
  try {
    const addresses = await lookup(host, { all: true });
    if (!addresses.length) return false;
    return addresses.every(({ address, family }) => {
      if (family === 4) return !PRIVATE_V4.some((re) => re.test(address));
      const a = address.toLowerCase();
      return !(a === '::1' || a.startsWith('fc') || a.startsWith('fd') || a.startsWith('fe80') || a.startsWith('::ffff:127.'));
    });
  } catch {
    return false;
  }
};

export const fetchText = async (
  url: string,
  timeoutMs = 6000
): Promise<{ status: number; text: string; finalUrl: string; contentType: string } | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT_DESKTOP, Accept: 'text/html,*/*;q=0.8', 'Accept-Language': 'da-DK,da;q=0.9,en;q=0.7' },
    });
    const contentType = res.headers.get('content-type') ?? '';
    const text = (await res.text()).slice(0, 1_500_000);
    return { status: res.status, text, finalUrl: res.url || url, contentType };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/** Visible text in a raw HTML document, roughly — scripts, styles and tags removed. */
export const rawVisibleText = (html: string): string =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Does robots.txt tell every crawler to stay away from the whole site? And GPTBot specifically? */
export const readRobots = (text: string) => {
  const groups: { agents: string[]; rules: string[] }[] = [];
  let current: { agents: string[]; rules: string[] } | null = null;
  for (const line of text.split(/\r?\n/)) {
    const clean = line.replace(/#.*/, '').trim();
    if (!clean) continue;
    const [k, ...rest] = clean.split(':');
    const key = k.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && (key === 'disallow' || key === 'allow')) {
      current.rules.push(`${key}:${value}`);
    }
  }
  const blocksAll = (agent: string) =>
    groups.some((g) => g.agents.includes(agent) && g.rules.includes('disallow:/') && !g.rules.some((r) => r === 'allow:/'));
  return { blocksAll: blocksAll('*'), blocksGptBot: blocksAll('gptbot'), sitemapDeclared: /^\s*sitemap:/im.test(text) };
};
