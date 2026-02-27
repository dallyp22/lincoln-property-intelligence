import { cn } from '@/lib/utils';
import { ChangeIndicator } from './ChangeIndicator';

interface StatCardProps {
  /** The large headline value (e.g., "$285,000") */
  value: string;
  /** Descriptive label below the value */
  label: string;
  /** Optional percentage change to show */
  change?: number;
  /** Label for the change indicator (e.g., "YoY") */
  changeLabel?: string;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  value,
  label,
  change,
  changeLabel,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
            {value}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-primary-500">
            {icon && (
              <span className="shrink-0 text-primary-400" aria-hidden="true">
                {icon}
              </span>
            )}
            {label}
          </p>
        </div>
        {change !== undefined && (
          <div className="shrink-0 pt-1">
            <ChangeIndicator value={change} label={changeLabel} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
