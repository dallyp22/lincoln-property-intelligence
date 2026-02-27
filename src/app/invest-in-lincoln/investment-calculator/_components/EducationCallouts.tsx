import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { EducationCallout } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EducationCalloutsProps {
  callouts: EducationCallout[];
}

// ---------------------------------------------------------------------------
// Style Maps
// ---------------------------------------------------------------------------

const typeStyles: Record<
  EducationCallout['type'],
  { border: string; bg: string; iconColor: string }
> = {
  info: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50/60',
    iconColor: 'text-blue-500',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50/60',
    iconColor: 'text-amber-500',
  },
  success: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50/60',
    iconColor: 'text-emerald-500',
  },
};

// ---------------------------------------------------------------------------
// SVG Icons (not emoji)
// ---------------------------------------------------------------------------

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

const iconMap: Record<EducationCallout['type'], React.FC<{ className?: string }>> = {
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function EducationCallouts({ callouts }: EducationCalloutsProps) {
  if (callouts.length === 0) return null;

  return (
    <div className="space-y-4" role="region" aria-label="Investment insights and recommendations">
      {callouts.map((callout, idx) => {
        const styles = typeStyles[callout.type];
        const Icon = iconMap[callout.type];

        return (
          <div
            key={`${callout.type}-${idx}`}
            className={cn(
              'rounded-lg border border-surface-200 border-l-4 p-5',
              styles.border,
              styles.bg,
            )}
          >
            <div className="flex gap-3">
              <Icon className={cn('h-6 w-6 shrink-0', styles.iconColor)} />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-primary-900">
                  {callout.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-primary-600">
                  {callout.message}
                </p>
                {callout.ctaText && callout.ctaHref && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      href={callout.ctaHref}
                    >
                      {callout.ctaText}
                      <svg
                        className="ml-1 h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
