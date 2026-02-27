'use client';

import { cn } from '@/lib/utils';

interface StepProgressProps {
  steps: { label: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function StepProgress({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: simple text indicator */}
      <div className="block md:hidden">
        <p className="text-sm font-medium text-primary-700">
          Step {currentStep + 1} of {steps.length} &mdash;{' '}
          <span className="text-accent-600">{steps[currentStep]?.label}</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-200">
          <div
            className="h-full rounded-full bg-accent-500 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: horizontal numbered circles with connecting lines */}
      <nav className="hidden md:block" aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isFuture = index > currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <li
                key={index}
                className={cn(
                  'relative flex flex-1 items-center',
                  index < steps.length - 1 && 'pr-4'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Circle */}
                  <button
                    type="button"
                    onClick={() => isClickable && onStepClick(index)}
                    disabled={!isClickable}
                    className={cn(
                      'relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                      isCompleted &&
                        'bg-emerald-500 text-white hover:bg-emerald-600',
                      isCurrent &&
                        'bg-accent-500 text-white ring-4 ring-accent-500/20',
                      isFuture && 'bg-surface-200 text-primary-400',
                      isClickable && 'cursor-pointer',
                      !isClickable && 'cursor-default'
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-label={`${step.label}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
                  >
                    {isCompleted ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>
                  {/* Label */}
                  <span
                    className={cn(
                      'whitespace-nowrap text-xs font-medium',
                      isCompleted && 'text-emerald-600',
                      isCurrent && 'text-accent-600',
                      isFuture && 'text-primary-400'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] top-5 h-0.5',
                      index < currentStep ? 'bg-emerald-500' : 'bg-surface-200'
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
