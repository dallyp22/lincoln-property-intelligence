'use client';

import { useState } from 'react';

interface MapControlsProps {
  colorMap: Record<string, string>;
}

export function MapControls({ colorMap }: MapControlsProps) {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(colorMap);

  return (
    <div className="absolute bottom-4 left-4 z-10 rounded-xl border border-surface-200 bg-white/95 shadow-lg backdrop-blur-sm">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
        aria-expanded={expanded}
        aria-controls="legend-list"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
          Neighborhoods
        </span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-primary-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Scrollable list */}
      <div
        id="legend-list"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-[320px] border-t border-surface-100' : 'max-h-0'
        }`}
      >
        <div className="overflow-y-auto overscroll-contain px-3 py-2" style={{ maxHeight: 308 }}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {entries.map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5 min-w-0">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <span className="truncate text-[11px] leading-tight text-primary-700">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
