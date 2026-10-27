/**
 * The canonical origin, in a module with no `import.meta.env` in it.
 *
 * The Vite config imports this to generate sitemap.xml and robots.txt at build
 * time, and it runs in Node — where `import.meta.env` does not exist — while
 * the app runs in the browser, where `process` does not. So the literal lives
 * here and each side layers its own override on top: one value, two consumers,
 * no chance of the sitemap pointing somewhere the canonical tags do not.
 *
 * `globalThis` is used rather than a bare `process` because tsconfig.app.json
 * deliberately carries no Node types.
 */
export const DEFAULT_SITE_URL = 'https://aagesengrowth.com';

/** Resolved origin for build-time output. Honours VITE_SITE_URL when set. */
export const buildSiteUrl = (): string => {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env;
  return env?.VITE_SITE_URL || DEFAULT_SITE_URL;
};
