'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import type { FAQ, InvestmentReferenceData } from '@/types';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { useCalculatorState } from '../_hooks/useCalculatorState';
import { getEducationCallouts } from '@/lib/engines/investment-calculator';
import { CalculatorInputPanel } from './CalculatorInputPanel';
import { MetricsDashboard } from './MetricsDashboard';
import { CashFlowBreakdown } from './CashFlowBreakdown';
import { ProjectionChart } from './ProjectionChart';
import { ProjectionTable } from './ProjectionTable';
import { EducationCallouts } from './EducationCallouts';
import { ScenarioComparison } from './ScenarioComparison';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InvestmentCalculatorClientProps {
  referenceData: InvestmentReferenceData;
  faqs: FAQ[];
}

// ---------------------------------------------------------------------------
// Main Orchestrator
// ---------------------------------------------------------------------------

export function InvestmentCalculatorClient({
  referenceData,
  faqs,
}: InvestmentCalculatorClientProps) {
  const [state, dispatch, metrics] = useCalculatorState();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Generate education callouts from current metrics
  const callouts = useMemo(() => getEducationCallouts(metrics), [metrics]);

  const handleDownloadPdf = useCallback(async () => {
    setDownloading(true);
    try {
      const { downloadInvestmentPdf } = await import('@/lib/pdf/download');
      await downloadInvestmentPdf(state.inputs, metrics, state.scenarios);
    } catch {
      // Silently fail
    } finally {
      setDownloading(false);
    }
  }, [state.inputs, metrics, state.scenarios]);

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Scenario handlers that dispatch to the reducer
  const handleSaveScenario = useCallback(
    (name: string) => {
      dispatch({ type: 'SAVE_SCENARIO', name });
    },
    [dispatch],
  );

  const handleDeleteScenario = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_SCENARIO', id });
    },
    [dispatch],
  );

  const handleLoadScenario = useCallback(
    (id: string) => {
      dispatch({ type: 'LOAD_SCENARIO', id });
    },
    [dispatch],
  );

  // FAQ items formatted for the Accordion component
  const faqItems = useMemo(
    () => faqs.map((f) => ({ question: f.question, answer: f.answer })),
    [faqs],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ── Calculator Layout ─────────────────────────────────────────── */}
      <div className="lg:flex lg:gap-8">
        {/* ── Left column: Inputs (sticky on desktop) ─────────────── */}
        <div className="lg:w-[420px] lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-primary-900">
                Property Inputs
              </h2>
            </div>

            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 lg:pb-8">
              <CalculatorInputPanel
                inputs={state.inputs}
                dispatch={dispatch}
                editedFields={state.editedFields}
              />
            </div>

            {/* Mobile: sticky "View Results" button */}
            <div className="sticky bottom-4 mt-4 lg:hidden">
              <Button
                size="lg"
                className="w-full shadow-lg"
                onClick={scrollToResults}
              >
                View Results
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right column: Results ───────────────────────────────── */}
        <div className="mt-8 min-w-0 flex-1 lg:mt-0" ref={resultsRef}>
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-primary-900">
                Investment Analysis
              </h2>
              <p className="mt-1 text-sm text-primary-500">
                Results update automatically as you adjust inputs
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="shrink-0"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {downloading ? 'Generating...' : 'PDF'}
            </Button>
          </div>

          <div className="space-y-8">
            {/* Key Metrics */}
            <MetricsDashboard metrics={metrics} />

            {/* Cash Flow Breakdown */}
            <CashFlowBreakdown breakdown={metrics.monthlyBreakdown} />

            {/* 5-Year Projection Chart */}
            <ProjectionChart projections={metrics.fiveYearProjection} />

            {/* 5-Year Projection Table */}
            <ProjectionTable projections={metrics.fiveYearProjection} />

            {/* Education Callouts */}
            <EducationCallouts callouts={callouts} />

            {/* Scenario Comparison */}
            <ScenarioComparison
              scenarios={state.scenarios}
              currentMetrics={metrics}
              onSave={handleSaveScenario}
              onDelete={handleDeleteScenario}
              onLoad={handleLoadScenario}
            />
          </div>
        </div>
      </div>

      {/* ── FAQ Section ───────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <div className="mt-16 border-t border-surface-200 pt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-primary-600">
              Common questions about investing in Lincoln, Nebraska rental properties
              and how to interpret your calculator results.
            </p>
            <div className="mt-8">
              <Accordion items={faqItems} allowMultiple />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
