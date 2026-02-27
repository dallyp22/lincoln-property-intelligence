import { cn } from '@/lib/utils';
import { SEGMENT_COLORS } from '@/lib/constants';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  /** Segment name — color will be pulled from SEGMENT_COLORS if available */
  segment?: string;
  /** Manual color override (hex, rgb, etc.) */
  color?: string;
  /** Size variant */
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  segment,
  color,
  size = 'sm',
}: BadgeProps) {
  const resolvedColor = color ?? (segment ? SEGMENT_COLORS[segment] : undefined);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  // When a segment color is available, render with inline styles for the dynamic color
  if (resolvedColor) {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full font-medium whitespace-nowrap',
          sizeClasses[size],
          className
        )}
        style={{
          backgroundColor: `${resolvedColor}15`,
          color: resolvedColor,
          borderWidth: '1px',
          borderColor: `${resolvedColor}30`,
        }}
      >
        {children}
      </span>
    );
  }

  // Default neutral badge
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap border border-surface-200 bg-surface-50 text-primary-700',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
