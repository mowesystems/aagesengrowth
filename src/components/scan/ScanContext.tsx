import React from 'react';
import { track } from '@/lib/analytics';
import { normaliseUrl, pollScan, ScanFailure, startScan } from '@/lib/growthScan/client';
import type { GrowthScanError, PublicScan, ScanProgress } from '@/lib/growthScan/types';
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
  /** The scan as the backend last reported it. Has `report` once done. */
  result: PublicScan | null;
  progress: ScanProgress | null;
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
  progress: null,
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
 * The scanner appears more than once on a page; every instance shares this
 * state, so a scan started in the hero is the scan and the others point at
 * it. The scan runs on the server in a real browser (~20–30 s); this polls
 * it and passes progress to the sequence. The result shows once both the
 * backend and the sequence are done, so a fast scan never cuts the sequence
 * short and a slow one never shows an empty result.
 */
export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, locale } = useLocale();
  const [state, setState] = React.useState<ScanState>(initial);
  const abortRef = React.useRef<AbortController | null>(null);

  const run = React.useCallback(
    (input: string, source: ScanSource, anchorId: string) => {
      const url = normaliseUrl(input);
      if (!url) return false;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const domain = new URL(url).hostname.replace(/^www\./, '');
      setState((prev) => ({ ...initial, founder: prev.founder, status: 'running', url, domain, source, anchorId }));
      track('growth_scan_started', { source, domain });

      const fail = (error: unknown) => {
        if (controller.signal.aborted) return;
        const detail: GrowthScanError =
          error instanceof ScanFailure ? error.detail : { error: 'server_error', message: t.scan.result.networkError };
        setState((prev) => ({ ...prev, error: detail }));
      };

      startScan(url, locale, controller.signal)
        .then((id) =>
          pollScan(
            id,
            (scan) => {
              if (controller.signal.aborted) return;
              setState((prev) => ({
                ...prev,
                result: scan,
                progress: scan.progress,
                error: scan.status === 'error' ? scan.error ?? { error: 'server_error', message: '' } : prev.error,
              }));
            },
            controller.signal
          )
        )
        .catch(fail);

      return true;
    },
    [t, locale]
  );

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

  // Resolve running -> done | error once the sequence and the backend agree.
  const reportReady = Boolean(state.result?.report);
  React.useEffect(() => {
    if (state.status !== 'running') return;
    if (state.error && state.sequenceDone) {
      setState((prev) => ({ ...prev, status: 'error' }));
      track('growth_scan_failed', { source: state.source, domain: state.domain, reason: state.error.error });
    } else if (reportReady && state.sequenceDone) {
      setState((prev) => ({ ...prev, status: 'done' }));
      track('growth_scan_completed', {
        source: state.source,
        domain: state.domain,
        opportunities: state.result?.report?.da.opportunities.length ?? 0,
        website: Boolean(state.result?.websiteJustified),
      });
    }
  }, [state.status, state.error, reportReady, state.result, state.sequenceDone, state.source, state.domain]);

  const value = React.useMemo<ScanApi>(
    () => ({ ...state, run, finishSequence, reset, markFounder }),
    [state, run, finishSequence, reset, markFounder]
  );

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScan = () => React.useContext(ScanContext);
