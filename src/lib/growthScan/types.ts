/**
 * The Growth Scan contract.
 *
 * Shared by the Netlify function that produces a result today and the UI that
 * renders it. When MOWE takes over the analysis, it returns this same shape
 * from POST /api/growth-scan — the frontend does not change.
 *
 * Honesty is part of the contract: a dimension is either measured (a number)
 * or `null` (pending, to be done in the full review). Nothing is estimated.
 */

export type ScanDimension = 'google' | 'ai' | 'capture' | 'trust' | 'website';

export type Severity = 'critical' | 'opportunity' | 'quickwin';

export interface ScanFinding {
  id: string;
  severity: Severity;
  /** Which part of the system the finding belongs to. */
  dimension: ScanDimension | 'website';
  title: string;
  body: string;
  /** The raw measurement behind the finding, for the review. */
  evidence?: string;
}

export interface ScanCompetitor {
  name: string;
  domain?: string;
  /** Visible where the scanned business is not. Only from real search data. */
  surfacedWhereYouAreNot?: number;
}

/** A single measured fact about the site. The findings are derived from these. */
export interface ScanSignal {
  key: string;
  label: string;
  ok: boolean;
  value?: string | number | boolean | null;
}

export interface GrowthScanResult {
  scanId: string;
  domain: string;
  /** The URL that was actually analysed, after redirects. */
  finalUrl: string;
  scanTimestamp: string;
  /** `preliminary`: website signals only. `complete`: search data included. */
  status: 'preliminary' | 'complete';
  engine: 'website-signals-v1' | 'mowe';

  /** Weighted over the measured dimensions only. */
  overallScore: number;
  googleVisibilityScore: number | null;
  aiVisibilityScore: number | null;
  /** `null` when the site is client-rendered and the raw HTML carries no content. */
  leadCaptureScore: number | null;
  trustScore: number | null;
  /** Technical foundation: HTTPS, speed, titles, indexability, structured data. */
  websiteScore: number;
  /** The document is a JavaScript app shell; content signals were not measurable. */
  clientRendered: boolean;

  /** Which dimensions still need search data. */
  pending: ScanDimension[];
  signals: ScanSignal[];
  competitors: ScanCompetitor[];

  findings: ScanFinding[];
  criticalIssues: ScanFinding[];
  opportunities: ScanFinding[];
  quickWins: ScanFinding[];

  timing: { ttfbMs: number; totalMs: number };
}

export interface GrowthScanError {
  error: 'invalid_url' | 'unreachable' | 'blocked' | 'timeout' | 'server_error';
  message: string;
  domain?: string;
}

export const isScanError = (value: unknown): value is GrowthScanError =>
  typeof value === 'object' && value !== null && 'error' in value;
