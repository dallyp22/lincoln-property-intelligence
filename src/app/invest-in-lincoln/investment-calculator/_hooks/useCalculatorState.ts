'use client';

import { useReducer, useMemo } from 'react';
import {
  type InvestmentInputs,
  type InvestmentMetrics,
  type SavedScenario,
  getDefaultInputs,
  calculateMetrics,
} from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface CalculatorState {
  inputs: InvestmentInputs;
  scenarios: SavedScenario[];
  showComparison: boolean;
  editedFields: Set<string>;
}

function getInitialState(): CalculatorState {
  return {
    inputs: getDefaultInputs(),
    scenarios: [],
    showComparison: false,
    editedFields: new Set(),
  };
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type Action =
  | { type: 'UPDATE_INPUT'; field: keyof InvestmentInputs; value: number | string }
  | { type: 'SAVE_SCENARIO'; name: string }
  | { type: 'DELETE_SCENARIO'; id: string }
  | { type: 'LOAD_SCENARIO'; id: string }
  | { type: 'TOGGLE_COMPARISON' }
  | { type: 'RESET' };

// ---------------------------------------------------------------------------
// Auto-calculated dependents
// ---------------------------------------------------------------------------

const AUTO_CALC_DEPENDENTS: (keyof InvestmentInputs)[] = [
  'annualPropertyTax',
  'monthlyMaintenance',
  'closingCostPercent',
];

function recalculateDependents(
  inputs: InvestmentInputs,
  editedFields: Set<string>,
): InvestmentInputs {
  const next = { ...inputs };

  if (!editedFields.has('annualPropertyTax')) {
    next.annualPropertyTax = Math.round(next.purchasePrice * 0.0155 * 100) / 100;
  }

  if (!editedFields.has('monthlyMaintenance')) {
    next.monthlyMaintenance = Math.round((next.purchasePrice * 0.01) / 12);
  }

  // closingCostPercent stays at whatever value it already has (auto-calc
  // means the *dollar* cost is recalculated from purchasePrice * percent,
  // but the percent itself is user-driven unless they've never touched it).

  return next;
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'UPDATE_INPUT': {
      const { field, value } = action;

      // Track manual overrides of auto-calc fields
      const nextEdited = new Set(state.editedFields);
      if (AUTO_CALC_DEPENDENTS.includes(field) && field !== 'closingCostPercent') {
        nextEdited.add(field);
      }

      let nextInputs = { ...state.inputs, [field]: value };

      // When purchasePrice changes, recalculate dependents that the user
      // hasn't manually edited
      if (field === 'purchasePrice') {
        nextInputs = recalculateDependents(nextInputs, nextEdited);
      }

      return { ...state, inputs: nextInputs, editedFields: nextEdited };
    }

    case 'SAVE_SCENARIO': {
      if (state.scenarios.length >= 3) return state;

      const metrics = calculateMetrics(state.inputs);
      const scenario: SavedScenario = {
        id: `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: action.name,
        inputs: { ...state.inputs },
        metrics,
        savedAt: new Date().toISOString(),
      };

      return {
        ...state,
        scenarios: [...state.scenarios, scenario],
        showComparison: true,
      };
    }

    case 'DELETE_SCENARIO': {
      const filtered = state.scenarios.filter((s) => s.id !== action.id);
      return {
        ...state,
        scenarios: filtered,
        showComparison: filtered.length >= 2,
      };
    }

    case 'LOAD_SCENARIO': {
      const scenario = state.scenarios.find((s) => s.id === action.id);
      if (!scenario) return state;
      return {
        ...state,
        inputs: { ...scenario.inputs },
        editedFields: new Set(),
      };
    }

    case 'TOGGLE_COMPARISON':
      return { ...state, showComparison: !state.showComparison };

    case 'RESET':
      return {
        ...state,
        inputs: getDefaultInputs(),
        editedFields: new Set(),
      };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCalculatorState(): [CalculatorState, React.Dispatch<Action>, InvestmentMetrics] {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const metrics = useMemo(() => calculateMetrics(state.inputs), [state.inputs]);
  return [state, dispatch, metrics];
}
