import React from 'react';

/**
 * A project's status, e.g. "Launching soon". Renders nothing for an empty
 * label, so finished projects carry no tag at all.
 */
const StatusTag: React.FC<{ label?: string; className?: string }> = ({ label, className = '' }) => {
  if (!label?.trim()) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 border border-brand/40 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brand ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {label}
    </span>
  );
};

export default StatusTag;
