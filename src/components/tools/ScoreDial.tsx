'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreDialProps {
  score: number;
  grade: string;
  gradeLabel: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const SIZES = {
  sm: { px: 160, stroke: 10, scoreFontSize: 'text-3xl', gradeFontSize: 'text-lg', labelFontSize: 'text-xs' },
  md: { px: 220, stroke: 12, scoreFontSize: 'text-5xl', gradeFontSize: 'text-xl', labelFontSize: 'text-sm' },
  lg: { px: 280, stroke: 14, scoreFontSize: 'text-6xl', gradeFontSize: 'text-2xl', labelFontSize: 'text-base' },
} as const;

function getScoreColorClass(score: number): string {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
}

function getScoreStrokeColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#f59e0b';
  return '#ef4444';
}

function getScoreTrackColor(score: number): string {
  if (score >= 80) return '#d1fae5';
  if (score >= 60) return '#fef3c7';
  return '#fee2e2';
}

export function ScoreDial({
  score,
  grade,
  gradeLabel,
  size = 'md',
  animated = true,
  className,
}: ScoreDialProps) {
  const config = SIZES[size];
  const center = config.px / 2;
  const radius = (config.px - config.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score)) / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className={cn('inline-flex flex-col items-center', className)}
      role="img"
      aria-label={`Seller Readiness Score: ${score} out of 100. Grade: ${grade}, ${gradeLabel}`}
    >
      <svg
        width={config.px}
        height={config.px}
        viewBox={`0 0 ${config.px} ${config.px}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getScoreTrackColor(score)}
          strokeWidth={config.stroke}
        />
        {/* Progress arc */}
        {animated ? (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getScoreStrokeColor(score)}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
        ) : (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getScoreStrokeColor(score)}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        )}
      </svg>

      {/* Inner text overlay */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: config.px, height: config.px }}
      >
        <span className={cn('font-bold tabular-nums', config.scoreFontSize, getScoreColorClass(score))}>
          {score}
        </span>
        <span className={cn('font-bold text-primary-900', config.gradeFontSize)}>
          {grade}
        </span>
        <span className={cn('text-primary-500', config.labelFontSize)}>
          {gradeLabel}
        </span>
      </div>
    </div>
  );
}
