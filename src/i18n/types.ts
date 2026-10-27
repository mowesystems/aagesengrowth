/**
 * Shapes shared by the three dictionary files.
 *
 * Case copy is keyed by project id rather than listed positionally, so a
 * translator adding a project cannot silently shift the others. Declaring it
 * as `Record<string, CaseCopy>` is what makes the lookup in the work pages
 * total: an id with no copy yet falls back rather than crashing.
 */
export interface CaseCopySection {
  heading: string;
  body: string;
}

export interface CaseCopyMedia {
  alt: string;
  /** Rendered under the frame when non-empty. */
  caption: string;
}

export interface CaseCopy {
  kind: string;
  disciplines: string[];
  summary: string;
  strapline: string;
  challenge: string;
  sections: CaseCopySection[];
  delivered: string[];
  demonstrates: string;
  proofLine: string;
  /** Empty when the timeframe is not something we can state. */
  period: string;
  /** Empty when there is nothing to disclose. */
  disclosure: string;
  media: Record<string, CaseCopyMedia>;
}
