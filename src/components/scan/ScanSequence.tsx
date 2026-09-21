import React from 'react';
import { Check } from 'lucide-react';
import { useScan } from '@/components/scan/ScanContext';
import { prefersReducedMotion } from '@/lib/motion';
import { useLocale } from '@/i18n/useLocale';

type StepState = 'idle' | 'running' | 'done' | 'queued';

/** Steps whose real answer needs search data: they end as "full review". */
const QUEUED = new Set(['google', 'ai', 'competitors']);

/** Minimum time each stage is shown, in ms. The whole run is ~8 seconds. */
const DURATIONS: Record<string, number> = {
  connect: 900,
  google: 1400,
  ai: 1300,
  capture: 1300,
  trust: 1100,
  competitors: 1200,
  opportunities: 1000,
};

/**
 * The scanning sequence.
 *
 * A precision readout, not a loading spinner: a ring that fills with
 * progress, a rotating sweep, and a ledger of stages with elapsed time.
 * Stages that cannot be answered from the website alone finish as "queued
 * for the full review" rather than pretending to have measured something.
 * When the request fails, the sequence stops at the current stage.
 */
const ScanSequence: React.FC = () => {
  const { t } = useLocale();
  const { domain, error, finishSequence, sequenceDone } = useScan();
  const steps = t.scan.steps;
  const [index, setIndex] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);
  const startRef = React.useRef(performance.now());
  const stopped = Boolean(error);

  React.useEffect(() => {
    if (sequenceDone) return;
    if (stopped) {
      finishSequence();
      return;
    }
    if (index >= steps.length) {
      finishSequence();
      return;
    }
    const reduced = prefersReducedMotion();
    const key = steps[index].key;
    const timer = window.setTimeout(
      () => setIndex((i) => i + 1),
      reduced ? 250 : DURATIONS[key] ?? 1000
    );
    return () => window.clearTimeout(timer);
  }, [index, steps, stopped, sequenceDone, finishSequence]);

  React.useEffect(() => {
    const timer = window.setInterval(() => setElapsed(performance.now() - startRef.current), 100);
    return () => window.clearInterval(timer);
  }, []);

  const progress = Math.min(1, index / steps.length);
  const percent = Math.round(progress * 100);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const stateOf = (i: number, key: string): StepState => {
    if (i < index) return QUEUED.has(key) ? 'queued' : 'done';
    if (i === index && !stopped) return 'running';
    return 'idle';
  };

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10" aria-live="polite" aria-busy="true">
      {/* ------------------------------------------------------------ dial */}
      <div className="flex flex-col items-center md:col-span-5 md:items-start">
        <div className="relative h-[184px] w-[184px] sm:h-[208px] sm:w-[208px]">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
              const lit = i / 60 < progress;
              return (
                <line
                  key={i}
                  x1={50 + Math.cos(angle) * 41}
                  y1={50 + Math.sin(angle) * 41}
                  x2={50 + Math.cos(angle) * (i % 5 === 0 ? 37 : 39)}
                  y2={50 + Math.sin(angle) * (i % 5 === 0 ? 37 : 39)}
                  strokeWidth={0.7}
                  className={lit ? 'stroke-brand' : 'stroke-ink/15'}
                  style={{ transition: 'stroke 300ms ease' }}
                />
              );
            })}
            <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="2.5" className="ring-track" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="2.5"
              className="ring-fill"
              style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.16,0.84,0.44,1)' }}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transform="rotate(-90 50 50)"
            />
            {/* sweep */}
            {!stopped && (
              <g className="spin-slow">
                <path
                  d="M50 50 L50 4 A46 46 0 0 1 82 17 Z"
                  fill="url(#sweepGradient)"
                  opacity="0.55"
                />
              </g>
            )}
            <defs>
              <linearGradient id="sweepGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B4FE8" stopOpacity="0" />
                <stop offset="100%" stopColor="#1B4FE8" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="none" strokeWidth="0.5" className="stroke-ink/10" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-sans text-[2.4rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">
              {percent}
              <span className="text-[1.1rem] text-muted">%</span>
            </span>
            <span className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted">
              {t.scan.running}
            </span>
          </div>
        </div>

        <div className="mt-5 w-full max-w-[208px] border-t pt-3" style={{ borderColor: 'var(--line)' }}>
          <p className="truncate font-mono text-[0.68rem] tracking-[0.06em] text-ink" title={domain}>
            {domain}
          </p>
          <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted tabular-nums">
            {(elapsed / 1000).toFixed(1)} s
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------- ledger */}
      <ol className="md:col-span-7">
        {steps.map((step, i) => {
          const state = stateOf(i, step.key);
          const failed = stopped && i === index;
          return (
            <li
              key={step.key}
              className={`flex min-h-11 items-center gap-4 border-b py-2.5 transition-opacity duration-300 ${
                state === 'idle' && !failed ? 'opacity-40' : 'opacity-100'
              }`}
              style={{ borderColor: 'var(--line)' }}
            >
              <span className="index-mark w-6 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                  state === 'done'
                    ? 'border-brand bg-brand text-paper-2'
                    : state === 'queued'
                      ? 'border-dashed border-ink/40 text-ink'
                      : failed
                        ? 'border-critical text-critical'
                        : 'border-ink/25'
                }`}
              >
                {state === 'done' && <Check size={11} strokeWidth={3} />}
                {state === 'running' && (
                  <span className="blink h-1.5 w-1.5 rounded-full bg-brand" />
                )}
                {state === 'queued' && <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />}
                {failed && <span className="text-[0.7rem] font-bold leading-none">×</span>}
              </span>
              <span className="flex-1 text-[0.95rem] font-medium leading-snug">
                {step.label}
                {state === 'running' && <span className="blink">…</span>}
              </span>
              <span className="shrink-0 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
                {state === 'done' && t.scan.stepStatus.done}
                {state === 'queued' && t.scan.stepStatus.queued}
                {state === 'running' && t.scan.stepStatus.running}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ScanSequence;
