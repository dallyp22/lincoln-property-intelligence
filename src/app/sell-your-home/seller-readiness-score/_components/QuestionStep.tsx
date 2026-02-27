'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import type { Question } from '@/lib/engines/seller-readiness';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface QuestionStepProps {
  questions: Question[];
  answers: Record<string, string | string[]>;
  estimatedValue: number | null;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onEstimatedValue: (value: number) => void;
  categoryLabel: string;
  categoryDescription: string;
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function QuestionStep({
  questions,
  answers,
  estimatedValue,
  onAnswer,
  onEstimatedValue,
  categoryLabel,
  categoryDescription,
}: QuestionStepProps) {
  return (
    <div className="space-y-10">
      <motion.div {...fadeSlide}>
        <h2 className="text-2xl font-bold font-serif text-primary-900">
          {categoryLabel}
        </h2>
        <p className="mt-2 text-primary-600">{categoryDescription}</p>
      </motion.div>

      <AnimatePresence mode="wait">
        <div className="space-y-8">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
            >
              <QuestionField
                question={question}
                currentValue={answers[question.id]}
                estimatedValue={estimatedValue}
                onAnswer={onAnswer}
                onEstimatedValue={onEstimatedValue}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual question renderer
// ---------------------------------------------------------------------------

interface QuestionFieldProps {
  question: Question;
  currentValue: string | string[] | undefined;
  estimatedValue: number | null;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onEstimatedValue: (value: number) => void;
}

function QuestionField({
  question,
  currentValue,
  estimatedValue,
  onAnswer,
  onEstimatedValue,
}: QuestionFieldProps) {
  // Special case: q4_1 (estimated home value) uses a currency input
  if (question.id === 'q4_1') {
    return (
      <CurrencyQuestion
        question={question}
        currentValue={currentValue}
        estimatedValue={estimatedValue}
        onAnswer={onAnswer}
        onEstimatedValue={onEstimatedValue}
      />
    );
  }

  // Special case: q3_1 (neighborhoods) uses a searchable filter
  if (question.id === 'q3_1') {
    return (
      <SearchableQuestion
        question={question}
        currentValue={currentValue}
        onAnswer={onAnswer}
      />
    );
  }

  // Multi-select questions
  if (question.type === 'multi-select') {
    return (
      <MultiSelectQuestion
        question={question}
        currentValue={currentValue}
        onAnswer={onAnswer}
      />
    );
  }

  // Default: single-select card options
  return (
    <SingleSelectQuestion
      question={question}
      currentValue={currentValue}
      onAnswer={onAnswer}
    />
  );
}

// ---------------------------------------------------------------------------
// Single-select question
// ---------------------------------------------------------------------------

interface StandardQuestionFieldProps {
  question: Question;
  currentValue: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
}

function SingleSelectQuestion({
  question,
  currentValue,
  onAnswer,
}: StandardQuestionFieldProps) {
  const selectedValue = Array.isArray(currentValue)
    ? currentValue[0]
    : currentValue;

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-primary-900">
        {question.text}
      </legend>
      {question.helpText && (
        <p className="text-sm italic text-primary-500">{question.helpText}</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(question.id, option.value)}
              className={cn(
                'group relative rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-150',
                isSelected
                  ? 'border-accent-500 bg-accent-50 text-accent-700 ring-1 ring-accent-500'
                  : 'border-surface-200 text-primary-700 hover:border-accent-300 hover:bg-surface-50'
              )}
              aria-pressed={isSelected}
            >
              <span className="flex items-center gap-2.5">
                {/* Selection indicator */}
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected
                      ? 'border-accent-500 bg-accent-500'
                      : 'border-surface-300 bg-white group-hover:border-accent-300'
                  )}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Multi-select question
// ---------------------------------------------------------------------------

function MultiSelectQuestion({
  question,
  currentValue,
  onAnswer,
}: StandardQuestionFieldProps) {
  const selectedValues: string[] = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];

  function toggleOption(optionValue: string) {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];
    onAnswer(question.id, newValues);
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-primary-900">
        {question.text}
      </legend>
      {question.helpText && (
        <p className="text-sm italic text-primary-500">{question.helpText}</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={cn(
                'flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-150',
                isSelected
                  ? 'border-accent-500 bg-accent-50 text-accent-700 ring-1 ring-accent-500'
                  : 'border-surface-200 text-primary-700 hover:border-accent-300 hover:bg-surface-50'
              )}
              aria-pressed={isSelected}
            >
              {/* Checkbox indicator */}
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                  isSelected
                    ? 'border-accent-500 bg-accent-500'
                    : 'border-surface-300 bg-white'
                )}
                aria-hidden="true"
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Searchable question (for neighborhoods)
// ---------------------------------------------------------------------------

function SearchableQuestion({
  question,
  currentValue,
  onAnswer,
}: StandardQuestionFieldProps) {
  const [search, setSearch] = useState('');
  const selectedValue = Array.isArray(currentValue)
    ? currentValue[0]
    : currentValue;

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return question.options;
    const lower = search.toLowerCase();
    return question.options.filter((opt) =>
      opt.label.toLowerCase().includes(lower)
    );
  }, [search, question.options]);

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-primary-900">
        {question.text}
      </legend>
      {question.helpText && (
        <p className="text-sm italic text-primary-500">{question.helpText}</p>
      )}

      {/* Search input */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search neighborhoods..."
          className="block w-full rounded-lg border border-surface-200 py-2.5 pl-10 pr-4 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        />
      </div>

      {/* Options grid */}
      <div className="grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
        {filteredOptions.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(question.id, option.value)}
              className={cn(
                'rounded-lg border-2 px-3 py-2 text-left text-sm font-medium transition-all duration-150',
                isSelected
                  ? 'border-accent-500 bg-accent-50 text-accent-700 ring-1 ring-accent-500'
                  : 'border-surface-200 text-primary-700 hover:border-accent-300 hover:bg-surface-50'
              )}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
        {filteredOptions.length === 0 && (
          <p className="col-span-full py-4 text-center text-sm text-primary-400">
            No neighborhoods match your search.
          </p>
        )}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Currency input question (for estimated home value)
// ---------------------------------------------------------------------------

interface CurrencyQuestionProps {
  question: Question;
  currentValue: string | string[] | undefined;
  estimatedValue: number | null;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onEstimatedValue: (value: number) => void;
}

function CurrencyQuestion({
  question,
  currentValue,
  onAnswer,
  onEstimatedValue,
}: CurrencyQuestionProps) {
  const rawValue = Array.isArray(currentValue)
    ? currentValue[0]
    : currentValue ?? '';

  const numericValue =
    rawValue !== '' && rawValue !== undefined ? parseFloat(rawValue) : '';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === '') {
      onAnswer(question.id, '');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onAnswer(question.id, val);
      onEstimatedValue(num);
    }
  }

  const displayFormatted =
    typeof numericValue === 'number' && numericValue > 0
      ? formatCurrency(numericValue)
      : '';

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-primary-900">
        {question.text}
      </legend>
      {question.helpText && (
        <p className="text-sm italic text-primary-500">{question.helpText}</p>
      )}

      <div className="max-w-sm">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary-400">
            $
          </span>
          <input
            type="number"
            value={numericValue}
            onChange={handleChange}
            min={50000}
            max={2000000}
            step={5000}
            placeholder="250000"
            className="block w-full rounded-lg border border-surface-200 py-2.5 pl-7 pr-4 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            aria-label="Estimated home value in dollars"
          />
        </div>
        {displayFormatted && (
          <p className="mt-1.5 text-sm font-medium text-accent-600">
            {displayFormatted}
          </p>
        )}
        <p className="mt-1 text-xs italic text-primary-400">
          Enter your best estimate between $50,000 and $2,000,000. This helps us
          compare your expectations with market data.
        </p>
      </div>
    </fieldset>
  );
}
