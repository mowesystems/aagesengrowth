import React from 'react';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/i18n/useLocale';

interface SignalFieldProps {
  className?: string;
}

interface Pt {
  x: number;
  y: number;
}

/**
 * The visual signature of Growth Engine.
 *
 * Search signals leave their sources — Google, ChatGPT, Maps, AI search —
 * travel along converging paths into the engine, and leave it as one line
 * through lead, follow-up and customer. Everything is one SVG; the dots move
 * with `offset-path`, the paths draw in once the section is visible, and the
 * engine's inner ring turns slowly so the system reads as running even when
 * nothing else on the page is moving.
 *
 * Two layouts, chosen by breakpoint rather than scaled: horizontal on
 * desktop, vertical on phones, so the labels stay legible on both.
 */
const SignalField: React.FC<SignalFieldProps> = ({ className = '' }) => {
  const { t } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className={`${inView ? 'is-visible' : ''} ${className}`}>
      <div className="hidden md:block">
        <Field horizontal sources={t.hero.sources} core={t.hero.core} outputs={t.hero.outputs} alt={t.hero.diagramAlt} />
      </div>
      <div className="md:hidden">
        <Field horizontal={false} sources={t.hero.sources} core={t.hero.core} outputs={t.hero.outputs} alt={t.hero.diagramAlt} />
      </div>
    </div>
  );
};

const Field: React.FC<{
  horizontal: boolean;
  sources: readonly string[];
  core: string;
  outputs: readonly string[];
  alt: string;
}> = ({ horizontal, sources, core, outputs, alt }) => {
  const W = horizontal ? 1200 : 360;
  const H = horizontal ? 320 : 480;
  const coreR = horizontal ? 58 : 46;
  const corePt: Pt = horizontal ? { x: 600, y: 160 } : { x: 180, y: 205 };

  const sourcePts: Pt[] = sources.map((_, i) =>
    horizontal
      ? { x: 120, y: 40 + i * 60 }
      : { x: 36 + i * 72, y: 56 }
  );
  const outPts: Pt[] = outputs.map((_, i) =>
    horizontal
      ? { x: 840 + i * 150, y: 160 }
      : { x: 180, y: 300 + i * 66 }
  );

  const coreIn: Pt = horizontal ? { x: corePt.x - coreR, y: corePt.y } : { x: corePt.x, y: corePt.y - coreR };
  const coreOut: Pt = horizontal ? { x: corePt.x + coreR, y: corePt.y } : { x: corePt.x, y: corePt.y + coreR };

  const inPath = (s: Pt) =>
    horizontal
      ? `M${s.x} ${s.y} C ${s.x + (coreIn.x - s.x) * 0.55} ${s.y}, ${s.x + (coreIn.x - s.x) * 0.45} ${coreIn.y}, ${coreIn.x} ${coreIn.y}`
      : `M${s.x} ${s.y} C ${s.x} ${s.y + (coreIn.y - s.y) * 0.55}, ${coreIn.x} ${s.y + (coreIn.y - s.y) * 0.45}, ${coreIn.x} ${coreIn.y}`;

  const last = outPts[outPts.length - 1];
  const outPath = `M${coreOut.x} ${coreOut.y} L${last.x} ${last.y}`;

  const dot = (d: string, delay: number, dur: number, key: string, r = 3.2) => (
    <circle
      key={key}
      r={r}
      className="signal fill-pink"
      style={{ offsetPath: `path('${d}')`, ['--delay' as string]: `${delay}s`, ['--dur' as string]: `${dur}s` }}
    />
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={alt}
    >
      <defs>
        <radialGradient id={`coreGlow-${horizontal ? 'h' : 'v'}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B4FE8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1B4FE8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* incoming paths */}
      {sourcePts.map((s, i) => (
        <path
          key={`in-${i}`}
          d={inPath(s)}
          pathLength={1}
          fill="none"
          stroke="rgba(11,18,32,0.22)"
          strokeWidth="1"
          className="draw"
          style={{ transitionDelay: `${i * 90}ms` }}
        />
      ))}

      {/* outgoing line */}
      <path
        d={outPath}
        pathLength={1}
        fill="none"
        stroke="#1B4FE8"
        strokeWidth="1.5"
        className="draw"
        style={{ transitionDelay: '700ms' }}
      />

      {/* sources */}
      {sourcePts.map((s, i) => (
        <g key={`src-${i}`}>
          <circle cx={s.x} cy={s.y} r="3.5" fill="#F7F6F2" stroke="rgba(11,18,32,0.5)" strokeWidth="1" />
          <text
            x={horizontal ? s.x - 14 : s.x}
            y={horizontal ? s.y + 3.5 : s.y - (i % 2 === 0 ? 12 : 28)}
            textAnchor={horizontal ? 'end' : 'middle'}
            className="fill-ink"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: horizontal ? 11 : 9, letterSpacing: horizontal ? '0.12em' : '0.08em', textTransform: 'uppercase' }}
          >
            {sources[i]}
          </text>
        </g>
      ))}

      {/* engine core */}
      <g>
        <circle cx={corePt.x} cy={corePt.y} r={coreR * 2.1} fill={`url(#coreGlow-${horizontal ? 'h' : 'v'})`} />
        <circle cx={corePt.x} cy={corePt.y} r={coreR} fill="#FFFFFF" stroke="rgba(11,18,32,0.28)" strokeWidth="1" />
        {/* outer ticks */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r1 = coreR - 3;
          const r2 = coreR - (i % 6 === 0 ? 9 : 6);
          return (
            <line
              key={i}
              x1={corePt.x + Math.cos(a) * r1}
              y1={corePt.y + Math.sin(a) * r1}
              x2={corePt.x + Math.cos(a) * r2}
              y2={corePt.y + Math.sin(a) * r2}
              stroke="rgba(11,18,32,0.3)"
              strokeWidth="0.8"
            />
          );
        })}
        {/* rotating inner ring */}
        <g className="spin-slow">
          <circle
            cx={corePt.x}
            cy={corePt.y}
            r={coreR * 0.62}
            fill="none"
            stroke="#1B4FE8"
            strokeWidth="1.5"
            strokeDasharray={`${coreR * 0.62 * 2 * Math.PI * 0.18} ${coreR * 0.62 * 2 * Math.PI * 0.07}`}
          />
        </g>
        <circle cx={corePt.x} cy={corePt.y} r={coreR * 0.62} fill="none" stroke="rgba(27,79,232,0.25)" strokeWidth="0.75" />
        <circle cx={corePt.x} cy={corePt.y} r="7" className="node-pulse" fill="#1B4FE8" />
        <circle cx={corePt.x} cy={corePt.y} r="7" fill="#1B4FE8" />
        <text
          x={corePt.x}
          y={corePt.y + coreR + (horizontal ? 24 : 22)}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: horizontal ? 13 : 12, letterSpacing: '-0.01em' }}
        >
          {core}
        </text>
      </g>

      {/* outputs */}
      {outPts.map((o, i) => {
        const isLast = i === outPts.length - 1;
        return (
          <g key={`out-${i}`}>
            {isLast ? (
              <>
                <circle cx={o.x} cy={o.y} r="10" className="node-pulse" fill="#FD91CC" />
                <circle cx={o.x} cy={o.y} r="9" fill="#FD91CC" />
                <path
                  d={`M${o.x - 4} ${o.y} l3 3 l5.5 -6`}
                  fill="none"
                  stroke="#0B1220"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <>
                <circle cx={o.x} cy={o.y} r="7" fill="#FFFFFF" stroke="#1B4FE8" strokeWidth="1.5" />
                <circle cx={o.x} cy={o.y} r="2.5" fill="#1B4FE8" />
              </>
            )}
            <text
              x={horizontal ? o.x : o.x + 20}
              y={horizontal ? o.y + 30 : o.y + 4}
              textAnchor={horizontal ? 'middle' : 'start'}
              className="fill-ink"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: horizontal ? 11 : 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {outputs[i]}
            </text>
          </g>
        );
      })}

      {/* travelling signals */}
      {sourcePts.map((s, i) => [
        dot(inPath(s), i * 0.9, 6.5, `d1-${i}`, 2.6),
        dot(inPath(s), i * 0.9 + 3.4, 7, `d2-${i}`, 2.2),
      ])}
      {[0, 1, 2].map((i) => dot(outPath, 1.2 + i * 2.3, 6, `o-${i}`, 3.6))}
    </svg>
  );
};

export default SignalField;
