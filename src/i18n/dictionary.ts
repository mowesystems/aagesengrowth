import da from '@/i18n/dict/da';
import type { Locale } from '@/i18n/config';

/**
 * The dictionary shape, taken from the Danish file.
 *
 * Danish is the source language and, today, the only one. A second language
 * annotates itself as `Dictionary` so a missing key fails `npm run typecheck`
 * instead of rendering as `undefined` on a live page.
 */
export type Dictionary = typeof da;

export const dictionaries: Record<Locale, Dictionary> = { da };

export default dictionaries;
