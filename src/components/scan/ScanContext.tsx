import React from 'react';
import { track } from '@/lib/analytics';
import { normaliseUrl, ScanFailure, startScan } from '@/lib/growthScan/client';
import type { GrowthScanError, GrowthScanResult } from '@/lib/growthScan/types';
import { useLocale } from '@/i18n/useLocale';

export type ScanSource = 'hero' | 'section' | 'page' | 'header' | 'founder' | 'other';

export type ScanStatus = 'idle' | 'running' | 'done' | 'error';

export interface ScanState {
  status: ScanStatus;
  url: string;
  domain: string;
  source: ScanSource;
  /** Where on the page the scan was started; the result renders there. */
  anchorId: string | null;
  result: GrowthScanResult | null;
  error: GrowthScanError | null;
  /** Set once the visual sequence has run its course. */
  sequenceDone: boolean;
  /** The visitor arrived via the Founder Program call to action. */
  founder: boolean;
}

interface ScanApi extends ScanState {
  run: (input: string, source: ScanSource, anchorId: string) => boolean;
  finishSequence: () => void;
  reset: () => void;
  markFounder: () => void;
}

const initial: ScanState = {
  status: 'idle',
  url: '',
  domain: '',
  source: 'other',
  anchorId: null,
  result: null,
  error: null,
  sequenceDone: false,
  founder: false,
};

const ScanContext = React.createContext<ScanApi>({
  ...initial,
  run: () => false,
  finishSequence: () => undefined,
  reset: () => undefined,
  markFounder: () => undefined,
});

/**
 * One scan per page.
 *
 * The scanner appears twice on the homepage (hero and the scan section) and
 * once on the Growth Scan page. They share this state, so a scan started in the hero is the scan,
 * and the other two instances point at it rather than offering to run a
 * second one. The API call and the visual sequence run in parallel; the
 * result is shown only when both are finished, so a fast response never
 * cuts the sequence short and a slow one never shows an empty result.
 */
export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLocale();
  const [state, setState] = React.useState<ScanState>(initial);
  const abortRef = React.useRef<AbortController | null>(null);

  const run = React.useCallback((input: string, source: ScanSource, anchorId: string) => {
    const url = normaliseUrl(input);
    if (!url) return false;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const domain = new URL(url).hostname.replace(/^www\./, '');
    setState((prev) => ({
      ...initial,
      founder: prev.founder,
      status: 'running',
      url,
      domain,
      source,
      anchorId,
    }));
    track('growth_scan_started', { source, domain });

    startScan(url, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setState((prev) => ({ ...prev, result }));
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const detail: GrowthScanError =
          error instanceof ScanFailure
            ? error.detail
            : { error: 'server_error', message: t.scan.result.networkError };
        setState((prev) => ({ ...prev, error: detail }));
      });

    return true;
  }, [t]);

  const finishSequence = React.useCallback(() => {
    setState((prev) => ({ ...prev, sequenceDone: true }));
  }, []);

  const reset = React.useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...initial, founder: prev.founder }));
  }, []);

  const markFounder = React.useCallback(() => {
    setState((prev) => ({ ...prev, founder: true }));
  }, []);

  // Resolve running -> done | error once the sequence and the request agree.
  React.useEffect(() => {
    if (state.status !== 'running') return;
    if (state.error && state.sequenceDone) {
      setState((prev) => ({ ...prev, status: 'error' }));
      track('growth_scan_failed', { source: state.source, domain: state.domain, reason: state.error.error });
    } else if (state.result && state.sequenceDone) {
      setState((prev) => ({ ...prev, status: 'done' }));
      track('growth_scan_completed', {
        source: state.source,
        domain: state.domain,
        score: state.result.overallScore,
        findings: state.result.findings.length,
        engine: state.result.engine,
      });
    }
  }, [state.status, state.error, state.result, state.sequenceDone, state.source, state.domain]);

  const value = React.useMemo<ScanApi>(
    () => ({ ...state, run, finishSequence, reset, markFounder }),
    [state, run, finishSequence, reset, markFounder]
  );

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
};

export const useScan = () => React.useContext(ScanContext);
