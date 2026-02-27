'use client';

import { useReducer, useCallback } from 'react';
import type { LeadCaptureData } from '@/types';
import {
  calculateSellerReadiness,
  type SellerReadinessResult,
} from '@/lib/engines/seller-readiness';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface QuestionnaireState {
  currentStep: number; // 0-4 = question steps, 5 = lead capture, 6 = results
  answers: Record<string, string | string[]>;
  leadData: LeadCaptureData | null;
  result: SellerReadinessResult | null;
  showResults: boolean;
  estimatedValue: number | null;
}

const initialState: QuestionnaireState = {
  currentStep: 0,
  answers: {},
  leadData: null,
  result: null,
  showResults: false,
  estimatedValue: null,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type QuestionnaireAction =
  | { type: 'ANSWER_QUESTION'; questionId: string; value: string | string[] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_ESTIMATED_VALUE'; value: number | null }
  | { type: 'SUBMIT_LEAD'; leadData: LeadCaptureData }
  | { type: 'SHOW_RESULTS' }
  | { type: 'RESET' };

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function questionnaireReducer(
  state: QuestionnaireState,
  action: QuestionnaireAction
): QuestionnaireState {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.value,
        },
      };

    case 'NEXT_STEP':
      // Max step is 6 (results). Step 4 -> 5 (lead capture).
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 6),
      };

    case 'PREV_STEP': {
      // Skip results step on back navigation: if on step 6, go to 5.
      // Otherwise decrement normally (min 0).
      let target = state.currentStep - 1;
      if (state.showResults && target >= 5) {
        target = 5;
      }
      return {
        ...state,
        currentStep: Math.max(target, 0),
        // If going back from results, hide them
        showResults: target < 6 ? false : state.showResults,
      };
    }

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, 6)),
        // If navigating away from results, hide them
        showResults: action.step < 6 ? false : state.showResults,
      };

    case 'SET_ESTIMATED_VALUE':
      return {
        ...state,
        estimatedValue: action.value,
      };

    case 'SUBMIT_LEAD':
      return {
        ...state,
        leadData: action.leadData,
      };

    case 'SHOW_RESULTS': {
      const result = calculateSellerReadiness(state.answers);
      return {
        ...state,
        result,
        showResults: true,
        currentStep: 6,
      };
    }

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useQuestionnaireState() {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);

  const answerQuestion = useCallback(
    (questionId: string, value: string | string[]) => {
      dispatch({ type: 'ANSWER_QUESTION', questionId, value });
    },
    []
  );

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'GO_TO_STEP', step });
  }, []);

  const setEstimatedValue = useCallback((value: number | null) => {
    dispatch({ type: 'SET_ESTIMATED_VALUE', value });
  }, []);

  const submitLead = useCallback((leadData: LeadCaptureData) => {
    dispatch({ type: 'SUBMIT_LEAD', leadData });
  }, []);

  const showResults = useCallback(() => {
    dispatch({ type: 'SHOW_RESULTS' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    answerQuestion,
    nextStep,
    prevStep,
    goToStep,
    setEstimatedValue,
    submitLead,
    showResults,
    reset,
  };
}
