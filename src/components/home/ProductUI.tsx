import React from 'react';
import { ArrowUpRight, Check, Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import ScoreRing from '@/components/scan/ScoreRing';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { useLocale } from '@/i18n/useLocale';

/**
 * Example dashboard data. Illustrative only, and labelled as such in the
 * interface — no customer has produced these numbers.
 */
const SAMPLE = {
  score: 72,
  google: { value: 68, delta: 11 },
  ai: { value: 41, delta: 17 },
  received: 24,
  recovered: 6,
  appointments: 9,
  opportunities: 13,
  actions: 3,
  responseMinutes: 2,
  competitors: [
    { letter: '', value: 68, you: true },
    { letter: 'A', value: 74 },
    { letter: 'B', value: 52 },
    { letter: 'C', value: 39 },
  ],
  trend: [38, 41, 40, 46, 49, 53, 52, 58, 61, 64, 66, 68],
};

const Stat: React.FC<{ label: string; value: number; active: boolean; delay?: number; suffix?: string; delta?: number }> = ({
  label,
  value,
  active,
  delay = 0,
  suffix,
  delta,
}) => {
  const shown = useCountUp(value, active, 1300, delay);
  return (
    <div className="border-t border-paper/10 pt-4">
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-lit">{label}</p>
      <p className="mt-2 flex items-baseline gap-2 font-sans text-[1.7rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-paper">
        {shown}
        {suffix && <span className="text-[0.9rem] font-normal text-muted-lit">{suffix}</span>}
        {typeof delta === 'number' && (
          <span className="inline-flex items-center gap-0.5 text-[0.72rem] font-medium text-brand-lit">
            <ArrowUpRight size={12} aria-hidden="true" />
            {delta}
          </span>
        )}
      </p>
    </div>
  );
};

const Sparkline: React.FC<{ points: number[]; active: boolean }> = ({ points, active }) => {
  const W = 260;
  const H = 64;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((p - min) / (max - min || 1)) * (H - 8) - 4;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`h-16 w-full ${active ? 'is-visible' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${W} ${H} L0 ${H} Z`} fill="url(#spark)" opacity={active ? 1 : 0} style={{ transition: 'opacity 1.2s ease 0.6s' }} />
      <path d={d} pathLength={1} fill="none" stroke="#5B8CFF" strokeWidth="1.5" className="draw" />
    </svg>
  );
};

/**
 * Growth Engine's interface, built as real components — a dark device
 * frame embedded inside the "how it works" section rather than a full
 * section of its own. Everything animates once it arrives: the score
 * fills, the counters count, the bars grow, the sparkline draws.
 */
const ProductUI: React.FC = () => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const p = t.product;
  const feedIcon = { lead: MessageSquare, recovered: Phone, booked: CalendarCheck } as const;

  return (
    <div ref={ref} className={`on-dark ${inView ? 'is-visible' : ''}`}>
      <div className="instrument-lit instrument overflow-hidden">
            {/* --------------------------------------------------- top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 px-5 py-3 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-lit" aria-hidden="true" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper">Growth Engine</span>
                <span className="hidden font-mono text-[0.62rem] tracking-[0.06em] text-muted-lit sm:inline">· dinvirksomhed.dk</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-lit">{p.period}</span>
                <span className="chip chip-pending">{p.note}</span>
              </div>
            </div>

            <div className="grid gap-px bg-paper/10 lg:grid-cols-12">
              {/* ------------------------------------------------ score */}
              <div className="bg-ink-2 p-6 sm:p-7 lg:col-span-4">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-lit">{p.metrics.score}</p>
                <div className="mt-4 flex items-center gap-6">
                  <ScoreRing value={SAMPLE.score} active={inView} label={p.metrics.score} size={150} className="text-paper" />
                  <div className="min-w-0 flex-1">
                    <Sparkline points={SAMPLE.trend} active={inView} />
                    <p className="mt-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted-lit">{p.trendLabel}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                  <Stat label={p.metrics.google} value={SAMPLE.google.value} delta={SAMPLE.google.delta} active={inView} delay={200} />
                  <Stat label={p.metrics.ai} value={SAMPLE.ai.value} delta={SAMPLE.ai.delta} active={inView} delay={320} />
                </div>
              </div>

              {/* ------------------------------------------------ leads */}
              <div className="bg-ink-2 p-6 sm:p-7 lg:col-span-4">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-lit">{p.feed.heading}</p>
                <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5">
                  <Stat label={p.metrics.received} value={SAMPLE.received} active={inView} delay={260} />
                  <Stat label={p.metrics.recovered} value={SAMPLE.recovered} active={inView} delay={380} />
                  <Stat label={p.metrics.appointments} value={SAMPLE.appointments} active={inView} delay={500} />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-4">
                  <Stat label={p.metrics.response} value={SAMPLE.responseMinutes} suffix="min" active={inView} delay={560} />
                  <Stat label={p.metrics.actions} value={SAMPLE.actions} suffix="/ 3" active={inView} delay={620} />
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.feed.items.map((item, i) => {
                    const Icon = feedIcon[item.kind as keyof typeof feedIcon];
                    return (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 border border-paper/10 bg-ink px-3 py-2.5 transition-opacity duration-700"
                        style={{ opacity: inView ? 1 : 0, transitionDelay: `${700 + i * 160}ms` }}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-paper/15 text-brand-lit">
                          <Icon size={13} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.85rem] font-medium text-paper">{item.text}</span>
                          <span className="block truncate font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted-lit">{item.meta}</span>
                        </span>
                        <Check size={13} className="shrink-0 text-brand-lit" aria-hidden="true" />
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* ------------------------------------- competitors + actions */}
              <div className="bg-ink-2 p-6 sm:p-7 lg:col-span-4">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-lit">{p.competitors.heading}</p>
                <ul className="mt-4 space-y-3">
                  {SAMPLE.competitors.map((c, i) => (
                    <li key={c.letter || 'you'}>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-[0.82rem] ${c.you ? 'font-semibold text-paper' : 'text-muted-lit'}`}>{c.you ? p.competitors.you : `${p.competitors.competitor} ${c.letter}`}</span>
                        <span className="font-mono text-[0.62rem] tabular-nums text-muted-lit">{c.value}</span>
                      </div>
                      <div className="meter mt-1.5">
                        <span
                          className={`meter-fill ${c.you ? 'bg-brand-lit' : 'bg-paper/35'}`}
                          style={{ ['--fill' as string]: c.value / 100, transitionDelay: `${300 + i * 120}ms` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-lit">
                  {p.actions.heading} · {SAMPLE.opportunities} {p.metrics.opportunities.toLowerCase()}
                </p>
                <ol className="mt-3 space-y-2">
                  {p.actions.items.map((item, i) => {
                    const status = (['done', 'active', 'next'] as const)[i];
                    return (
                      <li key={item} className="flex items-start gap-3 border-t border-paper/10 pt-2.5">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${
                            status === 'done' ? 'border-brand-lit bg-brand-lit text-ink' : status === 'active' ? 'border-brand-lit' : 'border-paper/25'
                          }`}
                          aria-hidden="true"
                        >
                          {status === 'done' && <Check size={10} strokeWidth={3} />}
                          {status === 'active' && <span className="blink h-1.5 w-1.5 bg-brand-lit" />}
                        </span>
                        <span className="min-w-0 flex-1 text-[0.85rem] leading-snug text-paper">{item}</span>
                        <span className="shrink-0 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted-lit">{p.actions.status[status]}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
      </div>
      <p className="mt-5 max-w-measure text-[0.85rem] leading-relaxed text-muted">{p.caption}</p>
    </div>
  );
};

export default ProductUI;
