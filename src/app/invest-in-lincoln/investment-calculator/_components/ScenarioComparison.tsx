'use client';

import { useState, useCallback } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import type {
  InvestmentMetrics,
  SavedScenario,
} from '@/lib/engines/investment-calculator';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScenarioComparisonProps {
  scenarios: SavedScenario[];
  currentMetrics: InvestmentMetrics;
  onSave: (name: string) => void;
  onDelete: (id: string) => void;
  onLoad: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Comparison Row Definition
// ---------------------------------------------------------------------------

interface ComparisonRow {
  label: string;
  getScenarioValue: (s: SavedScenario) => number;
  getCurrentValue: (m: InvestmentMetrics) => number;
  format: 'currency' | 'percent' | 'number';
  higherIsBetter?: boolean;
  lowerIsBetter?: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: 'Purchase Price',
    getScenarioValue: (s) => s.inputs.purchasePrice,
    getCurrentValue: () => 0, // Handled separately
    format: 'currency',
  },
  {
    label: 'Down Payment',
    getScenarioValue: (s) => s.inputs.purchasePrice * (s.inputs.downPaymentPercent / 100),
    getCurrentValue: () => 0,
    format: 'currency',
  },
  {
    label: 'Monthly Rent',
    getScenarioValue: (s) => s.inputs.monthlyGrossRent,
    getCurrentValue: () => 0,
    format: 'currency',
    higherIsBetter: true,
  },
  {
    label: 'Monthly Cash Flow',
    getScenarioValue: (s) => s.metrics.monthlyCashFlow,
    getCurrentValue: (m) => m.monthlyCashFlow,
    format: 'currency',
    higherIsBetter: true,
  },
  {
    label: 'Cash-on-Cash',
    getScenarioValue: (s) => s.metrics.cashOnCashReturn,
    getCurrentValue: (m) => m.cashOnCashReturn,
    format: 'percent',
    higherIsBetter: true,
  },
  {
    label: 'Cap Rate',
    getScenarioValue: (s) => s.metrics.capRate,
    getCurrentValue: (m) => m.capRate,
    format: 'percent',
    higherIsBetter: true,
  },
  {
    label: 'GRM',
    getScenarioValue: (s) => s.metrics.grossRentMultiplier,
    getCurrentValue: (m) => m.grossRentMultiplier,
    format: 'number',
    lowerIsBetter: true,
  },
  {
    label: '5-Year ROI',
    getScenarioValue: (s) => s.metrics.fiveYearTotalROI,
    getCurrentValue: (m) => m.fiveYearTotalROI,
    format: 'percent',
    higherIsBetter: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatValue(value: number, format: 'currency' | 'percent' | 'number'): string {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'number':
      return value.toFixed(1);
  }
}

function getBestIndex(
  values: number[],
  row: ComparisonRow,
): number | null {
  if (values.length < 2) return null;
  if (!row.higherIsBetter && !row.lowerIsBetter) return null;

  if (row.higherIsBetter) {
    const max = Math.max(...values);
    return values.indexOf(max);
  }
  if (row.lowerIsBetter) {
    const min = Math.min(...values);
    return values.indexOf(min);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ScenarioComparison({
  scenarios,
  currentMetrics,
  onSave,
  onDelete,
  onLoad,
}: ScenarioComparisonProps) {
  const [scenarioName, setScenarioName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const canSave = scenarios.length < 3;

  const handleSave = useCallback(() => {
    const name = scenarioName.trim() || `Scenario ${scenarios.length + 1}`;
    onSave(name);
    setScenarioName('');
    setShowNameInput(false);
  }, [scenarioName, scenarios.length, onSave]);

  // Build columns: saved scenarios + current
  const allColumns = [
    ...scenarios.map((s) => ({
      id: s.id,
      name: s.name,
      isCurrent: false,
      scenario: s,
    })),
    {
      id: 'current',
      name: 'Current',
      isCurrent: true,
      scenario: null as SavedScenario | null,
    },
  ];

  return (
    <Card padding="md" as="section">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <CardTitle>Scenario Comparison</CardTitle>
        {canSave && (
          <div className="flex items-center gap-2">
            {showNameInput ? (
              <>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="Scenario name..."
                  maxLength={30}
                  className="w-40 rounded-lg border border-surface-200 px-3 py-2 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  autoFocus
                />
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowNameInput(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setShowNameInput(true)}>
                <svg
                  className="mr-1.5 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Save Current Scenario
              </Button>
            )}
          </div>
        )}
        {!canSave && (
          <p className="text-xs text-primary-400">
            Maximum 3 scenarios reached. Delete one to save a new scenario.
          </p>
        )}
      </div>

      {/* Empty State */}
      {scenarios.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-surface-200 py-10 text-center">
          <svg
            className="mx-auto h-10 w-10 text-surface-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
          <p className="mt-3 text-sm text-primary-500">
            Save your current inputs as a scenario to compare different investment options side by side.
          </p>
          <p className="mt-1 text-xs text-primary-400">
            You can save up to 3 scenarios for comparison.
          </p>
        </div>
      )}

      {/* Single scenario saved: show simple list */}
      {scenarios.length === 1 && (
        <div className="space-y-3">
          <p className="text-sm text-primary-500">
            One scenario saved. Save at least one more to see a side-by-side comparison table.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-surface-200 bg-surface-50 px-4 py-3">
            <span className="text-sm font-medium text-primary-900">{scenarios[0].name}</span>
            <span className="flex-1 text-right text-xs tabular-nums text-primary-400">
              {formatCurrency(scenarios[0].inputs.purchasePrice)} |{' '}
              {formatCurrency(scenarios[0].metrics.monthlyCashFlow)}/mo
            </span>
            <button
              type="button"
              onClick={() => onLoad(scenarios[0].id)}
              className="text-xs font-medium text-accent-600 transition-colors hover:text-accent-700"
            >
              Load
            </button>
            <button
              type="button"
              onClick={() => onDelete(scenarios[0].id)}
              className="text-xs font-medium text-red-500 transition-colors hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* 2+ scenarios: full comparison table */}
      {scenarios.length >= 2 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="py-3 pr-4 text-left font-semibold text-primary-700">
                  Metric
                </th>
                {allColumns.map((col) => (
                  <th key={col.id} className="px-3 py-3 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          'font-semibold',
                          col.isCurrent ? 'text-accent-600' : 'text-primary-900',
                        )}
                      >
                        {col.name}
                      </span>
                      {!col.isCurrent && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onLoad(col.id)}
                            className="text-xs font-medium text-accent-600 transition-colors hover:text-accent-700"
                          >
                            Load
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(col.id)}
                            className="text-xs font-medium text-red-500 transition-colors hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, rowIdx) => {
                // Collect all numeric values for highlight comparison
                const allValues = allColumns.map((col) => {
                  if (col.isCurrent) {
                    return row.getCurrentValue(currentMetrics);
                  }
                  return row.getScenarioValue(col.scenario!);
                });
                const bestIdx = getBestIndex(allValues, row);

                return (
                  <tr
                    key={row.label}
                    className={cn(
                      'border-b border-surface-100',
                      rowIdx % 2 === 0 ? 'bg-white' : 'bg-surface-50/50',
                    )}
                  >
                    <td className="py-3 pr-4 text-sm font-medium text-primary-700">
                      {row.label}
                    </td>
                    {allColumns.map((col, colIdx) => {
                      const value = allValues[colIdx];
                      const isBest = bestIdx === colIdx;

                      return (
                        <td
                          key={col.id}
                          className={cn(
                            'px-3 py-3 text-right tabular-nums',
                            isBest && 'bg-emerald-50 font-bold text-emerald-700',
                            col.isCurrent && !isBest && 'text-accent-600',
                          )}
                        >
                          {formatValue(value, row.format)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
