'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'number' | 'currency' | 'select' | 'range';
  value: number | string;
  onChange: (value: number | string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  referenceText?: string;
  tooltip?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const inputBaseStyles =
  'block w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-50';

export function InputField({
  label,
  id,
  type,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
  options,
  referenceText,
  tooltip,
  error,
  disabled = false,
  className,
}: InputFieldProps) {
  const tooltipId = useId();

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === '') {
      onChange('');
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  }

  function handleRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseFloat(e.target.value));
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  function renderInput() {
    switch (type) {
      case 'currency':
        return (
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-primary-400">
              $
            </span>
            <input
              id={id}
              type="number"
              value={value}
              onChange={handleNumberChange}
              min={min}
              max={max}
              step={step ?? 1000}
              disabled={disabled}
              placeholder="0"
              className={cn(inputBaseStyles, 'pl-7')}
              aria-describedby={tooltip ? tooltipId : undefined}
            />
          </div>
        );

      case 'number':
        return (
          <div className="relative">
            {prefix && (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-primary-400">
                {prefix}
              </span>
            )}
            <input
              id={id}
              type="number"
              value={value}
              onChange={handleNumberChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              placeholder="0"
              className={cn(inputBaseStyles, prefix && 'pl-7', suffix && 'pr-12')}
              aria-describedby={tooltip ? tooltipId : undefined}
            />
            {suffix && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-400">
                {suffix}
              </span>
            )}
          </div>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <input
                id={id}
                type="range"
                value={typeof value === 'number' ? value : min ?? 0}
                onChange={handleRangeChange}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-200 accent-accent-500"
                aria-describedby={tooltip ? tooltipId : undefined}
              />
              <span className="ml-4 inline-flex min-w-[3rem] items-center justify-center rounded-md bg-accent-50 px-2 py-1 text-sm font-semibold text-accent-700">
                {prefix}{value}{suffix}
              </span>
            </div>
            {min !== undefined && max !== undefined && (
              <div className="flex justify-between text-xs text-primary-400">
                <span>{prefix}{min}{suffix}</span>
                <span>{prefix}{max}{suffix}</span>
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <select
            id={id}
            value={value}
            onChange={handleSelectChange}
            disabled={disabled}
            className={cn(inputBaseStyles, 'appearance-none bg-white pr-10')}
            aria-describedby={tooltip ? tooltipId : undefined}
          >
            <option value="">Select an option...</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'text':
      default:
        return (
          <div className="relative">
            {prefix && (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-primary-400">
                {prefix}
              </span>
            )}
            <input
              id={id}
              type="text"
              value={value}
              onChange={handleTextChange}
              disabled={disabled}
              className={cn(inputBaseStyles, prefix && 'pl-7')}
              aria-describedby={tooltip ? tooltipId : undefined}
            />
            {suffix && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-400">
                {suffix}
              </span>
            )}
          </div>
        );
    }
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="block text-sm font-medium text-primary-700">
          {label}
        </label>
        {tooltip && (
          <span
            id={tooltipId}
            className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-surface-200 text-[10px] font-bold text-primary-500"
            title={tooltip}
            aria-label={tooltip}
          >
            ?
          </span>
        )}
      </div>

      {renderInput()}

      {referenceText && (
        <p className="text-xs italic text-primary-400">{referenceText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
