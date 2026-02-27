'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StepProgress } from '@/components/tools/StepProgress';
import { Accordion } from '@/components/ui/Accordion';
import { useQuestionnaireState } from '../_hooks/useQuestionnaireState';
import { QuestionStep } from './QuestionStep';
import { LeadCaptureStep } from './LeadCaptureStep';
import { ScoreResults } from './ScoreResults';
import {
  getStepQuestions,
  CATEGORY_WEIGHTS,
} from '@/lib/engines/seller-readiness';
import type { FAQ } from '@/types';

// ---------------------------------------------------------------------------
// Step metadata
// ---------------------------------------------------------------------------

const STEP_META: { label: string; description: string }[] = [
  {
    label: 'Structural',
    description:
      'Tell us about your home\'s major systems -- roof, foundation, HVAC, plumbing, and electrical. These are the first things inspectors and savvy Lincoln buyers evaluate.',
  },
  {
    label: 'Cosmetic',
    description:
      'How does your home look and feel? Paint, flooring, kitchen, and bathrooms drive first impressions and emotional buyer decisions.',
  },
  {
    label: 'Market',
    description:
      'Your location and local market conditions heavily influence how quickly your home sells and at what price in the Lincoln, Nebraska market.',
  },
  {
    label: 'Pricing',
    description:
      'Pricing strategy is critical. Help us understand your expectations and timeline so we can align them with current market data.',
  },
  {
    label: 'Presentation',
    description:
      'First impressions happen online and at the curb. These questions help us assess how show-ready your home is right now.',
  },
  {
    label: 'Your Info',
    description: '',
  },
];

const PROGRESS_STEPS = STEP_META.map((s) => ({ label: s.label }));

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SellerReadinessClientProps {
  faqs: FAQ[];
}

export function SellerReadinessClient({ faqs }: SellerReadinessClientProps) {
  const {
    state,
    answerQuestion,
    nextStep,
    prevStep,
    goToStep,
    setEstimatedValue,
    submitLead,
    showResults,
    reset,
  } = useQuestionnaireState();

  const {
    currentStep,
    answers,
    showResults: resultsVisible,
    result,
    leadData,
    estimatedValue,
  } = state;

  // Get questions for the current step (steps 0-4)
  const stepQuestions = useMemo(
    () => (currentStep < 5 ? getStepQuestions(currentStep) : []),
    [currentStep]
  );

  // Check if all questions in the current step are answered
  const allAnswered = useMemo(() => {
    if (currentStep >= 5) return true;
    return stepQuestions.every((q) => {
      const answer = answers[q.id];
      if (answer === undefined || answer === null) return false;
      if (Array.isArray(answer)) return answer.length > 0;
      if (q.id === 'q4_1') {
        // Currency input: any non-empty value counts
        return answer !== '';
      }
      return answer !== '';
    });
  }, [currentStep, stepQuestions, answers]);

  // Direction for slide animation (1 = forward, -1 = backward)
  // We track this implicitly: positive when stepping forward
  const direction = 1;

  // If results are visible, show the results view
  if (resultsVisible && result) {
    return (
      <div className="mx-auto max-w-3xl">
        <ScoreResults
          result={result}
          ownerName={leadData ? `${leadData.firstName} ${leadData.lastName}` : undefined}
          address={leadData?.address}
          onReset={reset}
        />

        {/* FAQ section -- always visible */}
        {faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-serif text-primary-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-primary-600">
              Common questions about the Seller Readiness Score and what it means
              for your home sale.
            </p>
            <div className="mt-6">
              <Accordion items={faqs} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Step progress indicator */}
      <StepProgress
        steps={PROGRESS_STEPS}
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step < currentStep) goToStep(step);
        }}
        className="mb-8"
      />

      {/* Step content with animated transitions */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
          {currentStep < 5 ? (
            <QuestionStep
              questions={stepQuestions}
              answers={answers}
              estimatedValue={estimatedValue}
              onAnswer={answerQuestion}
              onEstimatedValue={setEstimatedValue}
              categoryLabel={
                CATEGORY_WEIGHTS[currentStep]?.label ??
                STEP_META[currentStep].label
              }
              categoryDescription={STEP_META[currentStep].description}
            />
          ) : (
            <LeadCaptureStep
              onSubmit={submitLead}
              onShowResults={showResults}
              answers={answers}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons (not shown on lead capture step -- it has its own submit) */}
      {currentStep < 5 && (
        <div className="mt-10 flex items-center justify-between border-t border-surface-200 pt-6">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-700 transition-all duration-200 hover:bg-surface-100 hover:text-primary-900"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={nextStep}
            disabled={!allAnswered}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200',
              allAnswered
                ? 'bg-accent-500 text-white hover:bg-accent-600 hover:shadow-md'
                : 'cursor-not-allowed bg-surface-200 text-primary-400'
            )}
          >
            {currentStep === 4 ? 'Continue to Results' : 'Next'}
            <svg
              className="h-4 w-4"
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
          </button>
        </div>
      )}

      {/* FAQ section -- always visible below the tool */}
      {faqs.length > 0 && (
        <div className="mt-16 border-t border-surface-200 pt-12">
          <h2 className="text-2xl font-bold font-serif text-primary-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-primary-600">
            Common questions about the Seller Readiness Score and what it means
            for your home sale.
          </p>
          <div className="mt-6">
            <Accordion items={faqs} />
          </div>
        </div>
      )}
    </div>
  );
}
