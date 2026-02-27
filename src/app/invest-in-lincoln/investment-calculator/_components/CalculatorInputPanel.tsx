'use client';

import { useCallback } from 'react';
import { formatCurrency } from '@/lib/utils';
import { InputField } from '@/components/tools/InputField';
import { Button } from '@/components/ui/Button';
import type { InvestmentInputs, PropertyType } from '@/lib/engines/investment-calculator';
import { LINCOLN_REFERENCE } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Action =
  | { type: 'UPDATE_INPUT'; field: keyof InvestmentInputs; value: number | string }
  | { type: 'SAVE_SCENARIO'; name: string }
  | { type: 'DELETE_SCENARIO'; id: string }
  | { type: 'LOAD_SCENARIO'; id: string }
  | { type: 'TOGGLE_COMPARISON' }
  | { type: 'RESET' };

interface CalculatorInputPanelProps {
  inputs: InvestmentInputs;
  dispatch: React.Dispatch<Action>;
  editedFields: Set<string>;
}

// ---------------------------------------------------------------------------
// Property Type Options
// ---------------------------------------------------------------------------

const PROPERTY_TYPE_OPTIONS: { label: string; value: PropertyType }[] = [
  { label: 'Single-Family', value: 'single-family' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Triplex', value: 'triplex' },
  { label: 'Fourplex', value: 'fourplex' },
  { label: 'Condo', value: 'condo' },
];

const LOAN_TERM_OPTIONS = [
  { label: '30 years', value: '30' },
  { label: '15 years', value: '15' },
];

// ---------------------------------------------------------------------------
// Auto Badge
// ---------------------------------------------------------------------------

function AutoBadge() {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-accent-50 px-1.5 py-0.5 text-[10px] font-medium text-accent-600">
      auto
    </span>
  );
}

// ---------------------------------------------------------------------------
// Collapsible Section — uses HTML details/summary for zero-JS collapsibility
// ---------------------------------------------------------------------------

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-surface-200 bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors hover:bg-surface-50 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-semibold text-primary-900">{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-primary-400 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div className="space-y-4 border-t border-surface-100 px-5 py-5">
        {children}
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CalculatorInputPanel({
  inputs,
  dispatch,
  editedFields,
}: CalculatorInputPanelProps) {
  const update = useCallback(
    (field: keyof InvestmentInputs) => (value: number | string) => {
      dispatch({ type: 'UPDATE_INPUT', field, value });
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const isAutoPropertyTax = !editedFields.has('annualPropertyTax');
  const isAutoMaintenance = !editedFields.has('monthlyMaintenance');

  return (
    <div className="space-y-4">
      {/* ── Property Details ──────────────────────────────────────────── */}
      <Section title="Property Details">
        <InputField
          label="Purchase Price"
          id="purchasePrice"
          type="currency"
          value={inputs.purchasePrice}
          onChange={update('purchasePrice')}
          min={50000}
          max={2000000}
          step={5000}
          referenceText={`Lincoln median: ${LINCOLN_REFERENCE.medianHomePrice}`}
        />

        <InputField
          label="Rehab / Renovation Cost"
          id="rehabCost"
          type="currency"
          value={inputs.rehabCost}
          onChange={update('rehabCost')}
          min={0}
          max={200000}
          step={1000}
        />

        <InputField
          label="Closing Cost"
          id="closingCostPercent"
          type="number"
          value={inputs.closingCostPercent}
          onChange={update('closingCostPercent')}
          suffix="%"
          min={0}
          max={10}
          step={0.5}
          referenceText={`Typical: 2-3% (${formatCurrency(inputs.purchasePrice * (inputs.closingCostPercent / 100))})`}
        />

        <InputField
          label="Property Type"
          id="propertyType"
          type="select"
          value={inputs.propertyType}
          onChange={update('propertyType')}
          options={PROPERTY_TYPE_OPTIONS}
        />
      </Section>

      {/* ── Financing ─────────────────────────────────────────────────── */}
      <Section title="Financing">
        <InputField
          label="Down Payment"
          id="downPaymentPercent"
          type="range"
          value={inputs.downPaymentPercent}
          onChange={update('downPaymentPercent')}
          suffix="%"
          min={0}
          max={100}
          step={5}
          referenceText={`20% avoids PMI (${formatCurrency(inputs.purchasePrice * (inputs.downPaymentPercent / 100))})`}
        />

        <InputField
          label="Interest Rate"
          id="interestRate"
          type="number"
          value={inputs.interestRate}
          onChange={update('interestRate')}
          suffix="%"
          min={0}
          max={15}
          step={0.125}
          referenceText={`Current 30yr: ${LINCOLN_REFERENCE.mortgageRate30yr} | 15yr: ${LINCOLN_REFERENCE.mortgageRate15yr}`}
        />

        <InputField
          label="Loan Term"
          id="loanTermYears"
          type="select"
          value={String(inputs.loanTermYears)}
          onChange={(val) => update('loanTermYears')(Number(val))}
          options={LOAN_TERM_OPTIONS}
        />
      </Section>

      {/* ── Income ─────────────────────────────────────────────────────── */}
      <Section title="Income">
        <InputField
          label="Monthly Gross Rent"
          id="monthlyGrossRent"
          type="currency"
          value={inputs.monthlyGrossRent}
          onChange={update('monthlyGrossRent')}
          min={0}
          max={20000}
          step={50}
          referenceText={`Lincoln avg 2BR: ${LINCOLN_REFERENCE.avg2BRRent}`}
        />

        <InputField
          label="Other Monthly Income"
          id="otherMonthlyIncome"
          type="currency"
          value={inputs.otherMonthlyIncome}
          onChange={update('otherMonthlyIncome')}
          min={0}
          max={5000}
          step={25}
          referenceText="Laundry, parking, storage, pet rent"
        />
      </Section>

      {/* ── Expenses ──────────────────────────────────────────────────── */}
      <Section title="Expenses">
        <div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-primary-700">Annual Property Tax</span>
            {isAutoPropertyTax && <AutoBadge />}
          </div>
          <InputField
            label=""
            id="annualPropertyTax"
            type="currency"
            value={inputs.annualPropertyTax}
            onChange={update('annualPropertyTax')}
            min={0}
            max={50000}
            step={100}
            referenceText={`Lincoln effective rate: ${LINCOLN_REFERENCE.effectiveTaxRate}`}
            tooltip="Auto-calculated from purchase price at 1.55% unless manually overridden"
          />
        </div>

        <InputField
          label="Annual Insurance"
          id="annualInsurance"
          type="currency"
          value={inputs.annualInsurance}
          onChange={update('annualInsurance')}
          min={0}
          max={20000}
          step={100}
          referenceText={`Lincoln avg: ${LINCOLN_REFERENCE.avgInsurance300k}`}
        />

        <div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-primary-700">Monthly Maintenance</span>
            {isAutoMaintenance && <AutoBadge />}
          </div>
          <InputField
            label=""
            id="monthlyMaintenance"
            type="currency"
            value={inputs.monthlyMaintenance}
            onChange={update('monthlyMaintenance')}
            min={0}
            max={5000}
            step={25}
            referenceText="Rule of thumb: 1% of value / 12"
            tooltip="Auto-calculated as 1% of purchase price annually unless manually overridden"
          />
        </div>

        <InputField
          label="Vacancy Rate"
          id="vacancyRatePercent"
          type="range"
          value={inputs.vacancyRatePercent}
          onChange={update('vacancyRatePercent')}
          suffix="%"
          min={0}
          max={30}
          step={1}
          referenceText={`Lincoln avg: ${LINCOLN_REFERENCE.avgVacancy}`}
        />

        <InputField
          label="Management Fee"
          id="managementFeePercent"
          type="range"
          value={inputs.managementFeePercent}
          onChange={update('managementFeePercent')}
          suffix="%"
          min={0}
          max={15}
          step={1}
          referenceText="0% if self-managing"
        />
      </Section>

      {/* ── Growth Assumptions ─────────────────────────────────────────── */}
      <Section title="Growth Assumptions">
        <InputField
          label="Annual Appreciation"
          id="appreciationRatePercent"
          type="range"
          value={inputs.appreciationRatePercent}
          onChange={update('appreciationRatePercent')}
          suffix="%"
          min={0}
          max={15}
          step={0.5}
          referenceText={`Lincoln avg: ${LINCOLN_REFERENCE.avgAppreciation}`}
        />

        <InputField
          label="Annual Rent Increase"
          id="rentIncreasePercent"
          type="range"
          value={inputs.rentIncreasePercent}
          onChange={update('rentIncreasePercent')}
          suffix="%"
          min={0}
          max={10}
          step={0.5}
          referenceText={`Lincoln avg: ${LINCOLN_REFERENCE.rentGrowth}`}
        />
      </Section>

      {/* ── Reset Button ──────────────────────────────────────────────── */}
      <div className="pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="w-full">
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            />
          </svg>
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
