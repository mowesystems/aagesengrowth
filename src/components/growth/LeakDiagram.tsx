import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/i18n/useLocale';

interface Pt {
  x: number;
  y: number;
}

/**
 * Two lanes, one lead.
 *
 * Top lane: without Growth Engine. Leads travel the channel and fall out at
 * the leak points — not found, unanswered, no follow-up — so almost nothing
 * reaches the end. Bottom lane: the same channel with the engine's nodes on
 * it, and every dot arrives. The lanes are the same length on purpose: the
 * difference is not effort, it is whether there is a system.
 */
const LeakDiagram: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const d = t.problem.diagram;

  return (
    <div ref={ref} className={`${inView ? 'is-visible' : ''} ${className}`}>
      <div className="hidden sm:block">
        <Lanes horizontal labels={d} leakLabels={d.leakLabels} nodeLabels={d.nodeLabels} />
      </div>
      <div className="sm:hidden">
        <Lanes horizontal={false} labels={d} leakLabels={d.leakLabels} nodeLabels={d.nodeLabels} />
      </div>
    </div>
  );
};

const Lanes: React.FC<{
  horizontal: boolean;
  labels: { without: string; with: string; search: string; lead: string; customer: string; lost: string; alt: string };
  leakLabels: readonly string[];
  nodeLabels: readonly string[];
}> = ({ horizontal, labels, leakLabels, nodeLabels }) => {
  const W = horizontal ? 880 : 360;
  const H = horizontal ? 300 : 520;
  const stops = [0.24, 0.5, 0.76];

  const P = (lane: number, tt: number): Pt =>
    horizontal
      ? { x: 60 + tt * 760, y: 92 + lane * 130 }
      : { x: 150 + lane * 130, y: 70 + tt * 400 };

  const line = (lane: number) => {
    const a = P(lane, 0);
    const b = P(lane, 1);
    return `M${a.x} ${a.y} L${b.x} ${b.y}`;
  };

  const leakPath = (tt: number) => {
    const a = P(0, 0);
    const l = P(0, tt);
    return horizontal
      ? `M${a.x} ${a.y} L${l.x} ${l.y} C ${l.x + 14} ${l.y}, ${l.x + 22} ${l.y + 14}, ${l.x + 26} ${l.y + 52}`
      : `M${a.x} ${a.y} L${l.x} ${l.y} C ${l.x} ${l.y + 14}, ${l.x - 14} ${l.y + 22}, ${l.x - 52} ${l.y + 26}`;
  };

  const mono = { fontFamily: 'IBM Plex Mono, monospace', fontSize: horizontal ? 10.5 : 8.5, letterSpacing: horizontal ? '0.12em' : '0.08em', textTransform: 'uppercase' as const };
  const sans = { fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: horizontal ? 12.5 : 11 };

  const dot = (path: string, delay: number, dur: number, key: string, cls: string, r = 3.4) => (
    <circle key={key} r={r} className={`signal ${cls}`} style={{ offsetPath: `path('${path}')`, ['--delay' as string]: `${delay}s`, ['--dur' as string]: `${dur}s` }} />
  );

  const laneLabel = (lane: number, text: string, brand: boolean) => {
    const p = P(lane, 0);
    return (
      <text
        x={horizontal ? p.x : p.x}
        y={horizontal ? p.y - 34 : p.y - 30}
        textAnchor={horizontal ? 'start' : 'middle'}
        className={brand ? 'fill-brand' : 'fill-muted'}
        style={mono}
      >
        {text}
      </text>
    );
  };

  const endLabel = (lane: number, text: string) => {
    const p = P(lane, 1);
    return (
      <text x={horizontal ? p.x : p.x} y={horizontal ? p.y + 30 : p.y + 30} textAnchor="middle" className="fill-ink" style={sans}>
        {text}
      </text>
    );
  };

  const startLabel = (lane: number) => {
    const p = P(lane, 0);
    return (
      <text x={p.x} y={horizontal ? p.y + 30 : p.y - 12} textAnchor="middle" className="fill-ink" style={sans}>
        {labels.search}
      </text>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={labels.alt}>
      {/* lane 0 — without */}
      {laneLabel(0, labels.without, false)}
      <path d={line(0)} pathLength={1} fill="none" stroke="rgba(11,18,32,0.22)" strokeWidth="1" className="draw" />
      {stops.map((tt, i) => {
        const p = P(0, tt);
        const lp = horizontal ? { x: p.x + 26, y: p.y + 52 } : { x: p.x - 52, y: p.y + 26 };
        return (
          <g key={`leak-${i}`}>
            <circle cx={p.x} cy={p.y} r="4" fill="#F7F6F2" stroke="rgba(11,18,32,0.35)" strokeWidth="1" strokeDasharray="2 2" />
            <path
              d={horizontal ? `M${p.x} ${p.y} C ${p.x + 14} ${p.y}, ${p.x + 22} ${p.y + 14}, ${lp.x} ${lp.y}` : `M${p.x} ${p.y} C ${p.x} ${p.y + 14}, ${p.x - 14} ${p.y + 22}, ${lp.x} ${lp.y}`}
              fill="none"
              stroke="rgba(11,18,32,0.18)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x={horizontal ? lp.x : lp.x + 10}
              y={horizontal ? lp.y + 14 : lp.y + 14}
              textAnchor={horizontal ? 'middle' : 'end'}
              className="fill-muted"
              style={mono}
            >
              × {leakLabels[i]}
            </text>
          </g>
        );
      })}
      {startLabel(0)}
      <circle cx={P(0, 0).x} cy={P(0, 0).y} r="4" fill="#0B1220" />
      <circle cx={P(0, 1).x} cy={P(0, 1).y} r="5" fill="none" stroke="rgba(11,18,32,0.35)" strokeWidth="1" />
      {endLabel(0, labels.customer)}

      {/* lane 1 — with */}
      {laneLabel(1, labels.with, true)}
      <path d={line(1)} pathLength={1} fill="none" stroke="#1B4FE8" strokeWidth="1.5" className="draw" style={{ transitionDelay: '300ms' }} />
      {stops.map((tt, i) => {
        const p = P(1, tt);
        return (
          <g key={`node-${i}`}>
            <circle cx={p.x} cy={p.y} r="6" fill="#FFFFFF" stroke="#1B4FE8" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="2.2" fill="#1B4FE8" />
            <text
              x={horizontal ? p.x : p.x + 16}
              y={horizontal ? p.y + 26 : p.y + 3.5}
              textAnchor={horizontal ? 'middle' : 'start'}
              className="fill-ink"
              style={mono}
            >
              {nodeLabels[i]}
            </text>
          </g>
        );
      })}
      {startLabel(1)}
      <circle cx={P(1, 0).x} cy={P(1, 0).y} r="4" fill="#0B1220" />
      <circle cx={P(1, 1).x} cy={P(1, 1).y} r="10" className="node-pulse" fill="#1B4FE8" />
      <circle cx={P(1, 1).x} cy={P(1, 1).y} r="9" fill="#1B4FE8" />
      <path d={`M${P(1, 1).x - 4} ${P(1, 1).y} l3 3 l5.5 -6`} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {endLabel(1, labels.customer)}

      {/* signals: lane 0 mostly leaks, one survives */}
      {stops.map((tt, i) => dot(leakPath(tt), i * 1.7, 4.2 + i * 0.6, `l-${i}`, 'fill-ink/70', 3))}
      {dot(line(0), 5.4, 6.4, 'l-survivor', 'fill-ink/70', 3)}
      {/* signals: lane 1 all arrive */}
      {[0, 1, 2, 3].map((i) => dot(line(1), i * 1.6 + 0.4, 6.4, `w-${i}`, 'fill-brand'))}
    </svg>
  );
};

export default LeakDiagram;
