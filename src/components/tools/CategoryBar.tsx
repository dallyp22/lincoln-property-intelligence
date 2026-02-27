'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryBarProps {
  label: string;
  score: number;
  weight: number;
  color: 'green' | 'yellow' | 'red';
  interpretation?: string;
  animated?: boolean;
  className?: string;
}

const BAR_COLORS = {
  green: { bar: 'bg-emerald-500', track: 'bg-emerald-100' },
  yellow: { bar: 'bg-amber-500', track: 'bg-amber-100' },
  red: { bar: 'bg-red-500', track: 'bg-red-100' },
} as const;

const WEIGHT_BADGE_COLORS = {
  green: 'bg-emerald-100 text-emerald-700',
  yellow: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
} as const;

export function CategoryBar({
  label,
  score,
  weight,
  color,
  interpretation,
  animated = true,
  className,
}: CategoryBarProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const weightPercent = Math.round(weight * 100);
  const colors = BAR_COLORS[color];

  return (
    <div className={cn('space-y-2', className)}>
      {/* Top row: label, weight badge, score */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-primary-900">{label}</span>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              WEIGHT_BADGE_COLORS[color]
            )}
          >
            {weightPercent}% weight
          </span>
          <span className="min-w-[2.5rem] text-right text-sm font-bold tabular-nums text-primary-900">
            {clampedScore}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={cn('h-3 w-full overflow-hidden rounded-full', colors.track)}>
        {animated ? (
          <motion.div
            className={cn('h-full rounded-full', colors.bar)}
            initial={{ width: '0%' }}
            animate={{ width: `${clampedScore}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full', colors.bar)}
            style={{ width: `${clampedScore}%` }}
          />
        )}
      </div>

      {/* Interpretation text */}
      {interpretation && (
        <p className="text-sm italic text-primary-500">{interpretation}</p>
      )}
    </div>
  );
}
