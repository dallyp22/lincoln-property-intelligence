import { cn } from '@/lib/utils';

interface ChangeIndicatorProps {
  /** The percentage change value (e.g., 5.2 for +5.2%, -3.1 for -3.1%) */
  value: number;
  /** Number of decimal places (default: 1) */
  decimals?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label shown after the percentage */
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function ChangeIndicator({
  value,
  decimals = 1,
  size = 'md',
  label,
  className,
}: ChangeIndicatorProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(decimals)}%`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        sizeClasses[size],
        isNeutral
          ? 'text-primary-400'
          : isPositive
            ? 'text-emerald-600'
            : 'text-red-600',
        className
      )}
      aria-label={`${formattedValue} change${label ? ` ${label}` : ''}`}
    >
      {!isNeutral && (
        <svg
          className={cn(iconSizes[size], 'shrink-0')}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {isPositive ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
          )}
        </svg>
      )}
      <span>{formattedValue}</span>
      {label && <span className="text-primary-400 font-normal">{label}</span>}
    </span>
  );
}
