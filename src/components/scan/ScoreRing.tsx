import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface ScoreRingProps {
  value: number;
  active: boolean;
  label: string;
  sublabel?: string;
  size?: number;
  className?: string;
}

/**
 * A score, 0–100, drawn as an arc that fills while the number counts up.
 * Pure SVG: one track circle, one fill circle whose dash offset is the score.
 */
const ScoreRing: React.FC<ScoreRingProps> = ({
  value,
  active,
  label,
  sublabel,
  size = 176,
  className = '',
}) => {
  const shown = useCountUp(value, active, 1500, 150);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (active ? value : 0) / 100);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value} ud af 100`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        {/* tick marks */}
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2 - Math.PI / 2;
          const inner = 41;
          const outer = i % 5 === 0 ? 37.5 : 39;
          return (
            <line
              key={i}
              x1={50 + Math.cos(angle) * inner}
              y1={50 + Math.sin(angle) * inner}
              x2={50 + Math.cos(angle) * outer}
              y2={50 + Math.sin(angle) * outer}
              stroke="currentColor"
              strokeWidth={0.6}
              className="text-ink/20"
            />
          );
        })}
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="3" className="ring-track" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="3"
          className="ring-fill"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sans text-[2.6rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">
          {shown}
        </span>
        <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
          / 100
        </span>
        {sublabel && (
          <span className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-brand">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreRing;
