import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  color: 'green' | 'yellow' | 'red';
  tooltip?: string;
  className?: string;
}

const BORDER_COLORS = {
  green: 'border-l-emerald-500',
  yellow: 'border-l-amber-500',
  red: 'border-l-red-500',
} as const;

const VALUE_COLORS = {
  green: 'text-emerald-600',
  yellow: 'text-amber-600',
  red: 'text-red-600',
} as const;

export function MetricCard({
  label,
  value,
  sublabel,
  color,
  tooltip,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-surface-200 border-l-4 bg-white p-4 shadow-sm',
        BORDER_COLORS[color],
        className
      )}
      title={tooltip}
    >
      <p className={cn('text-2xl font-bold tabular-nums', VALUE_COLORS[color])}>
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-primary-700">{label}</p>
      {sublabel && (
        <p className="mt-0.5 text-xs text-primary-400">{sublabel}</p>
      )}
    </div>
  );
}
