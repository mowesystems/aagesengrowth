/**
 * The Growth Scan contract.
 *
 * Shared by the Netlify functions that run a scan (netlify/scan-engine) and
 * the UI that renders it. A scan is started with POST /api/growth-scan, runs
 * in a background function with a real browser, and is read back with
 * GET /api/growth-scan/:id until it is done.
 *
 * Two audiences, two shapes. `PublicScan` is what a visitor sees: a short
 * report in plain language, no scores and no technical terms. `InternalScan`
 * holds everything behind it — evidence, sources, confidence and suggested
 * Growth Engine tasks — and is only served to the token-protected internal
 * view. Honesty is part of the contract: a finding only exists when the scan
 * actually observed it, and what the scan cannot see is said, not guessed.
 */

export type ScanLocale = 'da' | 'en';

/** The five areas Aagesen Growth sells help with. */
export type ScanArea = 'website' | 'google' | 'gbp' | 'contact' | 'followup';

export type Confidence = 'high' | 'medium' | 'low';

export interface ReportOpportunity {
  id: string;
  area: ScanArea;
  /** What we saw. One short sentence. */
  observed: string;
  /** What it means for the business. One short sentence. */
  opportunity: string;
}

export interface ReportRecommendation {
  /** `website`: a new site is genuinely the next step. `improve`: fix the list. `healthy`: nothing obvious found. */
  kind: 'website' | 'improve' | 'healthy';
  text: string;
}

export interface PublicReport {
  /** The company name as the website presents it. */
  company: string;
  headline: string;
  sub: string;
  /** At most five, most valuable first. */
  opportunities: ReportOpportunity[];
  recommendation: ReportRecommendation;
  /** Areas the free scan cannot see, said plainly. */
  notSeen: string[];
  pagesReviewed: number;
}

export type ScanStatus = 'queued' | 'running' | 'done' | 'error';

export type ScanStage = 'queued' | 'open' | 'pages' | 'analyse' | 'report' | 'files' | 'done';

export interface ScanProgress {
  stage: ScanStage;
  pagesDone: number;
  pagesPlanned: number;
}

export interface GrowthScanError {
  error:
    | 'invalid_url'
    | 'unreachable'
    | 'blocked'
    | 'timeout'
    | 'server_error'
    | 'rate_limited'
    | 'not_found';
  message: string;
  domain?: string;
}

/** What GET /api/growth-scan/:id returns to anyone holding the id. */
export interface PublicScan {
  id: string;
  status: ScanStatus;
  progress: ScanProgress;
  url: string;
  domain: string;
  finalUrl?: string;
  locale: ScanLocale;
  createdAt: string;
  finishedAt?: string;
  websiteJustified?: boolean;
  /** Both languages, so switching language after a scan needs no re-run. */
  report?: Record<ScanLocale, PublicReport>;
  /** The PDF and share image, generated after the report in the scan's language. */
  files?: { pdf: boolean; png: boolean };
  error?: GrowthScanError;
}

/* ---------------------------------------------------------------- internal */

export interface InternalFinding {
  id: string;
  area: ScanArea;
  confidence: Confidence;
  /** impact × confidence. Higher first. */
  score: number;
  /** Eligible for the customer report. Technical items are internal only. */
  public: boolean;
  /** Actually shown in the customer report (top five, spread across areas). */
  shown: boolean;
  observed: string;
  opportunity: string;
  /** What was measured, in technical terms. */
  evidence: string[];
  /** The page URLs the evidence comes from. */
  sources: string[];
  /** The Growth Engine task this points to. */
  task: string;
  /** Would a new website fix this where a patch rarely does? */
  structural?: boolean;
}

export interface InternalPage {
  url: string;
  finalUrl: string;
  kind: string;
  status: number;
  title: string;
  loadMs: number;
  textLength: number;
  bodyCtas: number;
  telLinks: number;
  forms: number;
}

export interface InternalScan {
  findings: InternalFinding[];
  pages: InternalPage[];
  /** Raw facts the findings were derived from, for checking a finding by hand. */
  signals: Record<string, unknown>;
  websiteJustified: boolean;
  websiteReasons: string[];
  /** A suggested opening line for a personal conversation. Never sent automatically. */
  conversationStarter: string;
  durationMs: number;
  notes: string[];
}

/** What is stored, and what the internal view reads. */
export interface ScanRecord extends PublicScan {
  internal?: InternalScan;
}

/** One row in the internal list. */
export interface ScanListItem {
  id: string;
  domain: string;
  createdAt: string;
}
