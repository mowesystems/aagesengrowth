import da from '@/i18n/dict/da';
import en from '@/i18n/dict/en';
import type { Locale } from '@/i18n/config';

/**
 * The dictionary shape, taken from the Danish file.
 *
 * Danish is the source language, so it is the one allowed to introduce keys.
 * `en.ts` annotates itself as `Dictionary`, which means a key added here and
 * forgotten there fails `npm run typecheck` instead of rendering as
 * `undefined` on a live page.
 */
export type Dictionary = typeof da;

export const dictionaries: Record<Locale, Dictionary> = { da, en };

export default dictionaries;
