import { cn, formatCurrency } from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui/Card';
import type { MonthlyBreakdown } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CashFlowBreakdownProps {
  breakdown: MonthlyBreakdown;
}

// ---------------------------------------------------------------------------
// Row Helpers
// ---------------------------------------------------------------------------

interface RowDef {
  label: string;
  monthly: number;
  annual: number;
  bold?: boolean;
  isIncome?: boolean;
  isSubtraction?: boolean;
  isNetCashFlow?: boolean;
  isSeparator?: boolean;
}

function buildRows(b: MonthlyBreakdown): RowDef[] {
  return [
    // Income section
    {
      label: 'Gross Rent',
      monthly: b.grossRent,
      annual: b.grossRent * 12,
      isIncome: true,
    },
    {
      label: 'Other Income',
      monthly: b.otherIncome,
      annual: b.otherIncome * 12,
      isIncome: true,
    },
    {
      label: 'Total Income',
      monthly: b.totalIncome,
      annual: b.totalIncome * 12,
      isIncome: true,
      bold: true,
    },
    {
      label: 'Less: Vacancy Allowance',
      monthly: -b.vacancyAllowance,
      annual: -b.vacancyAllowance * 12,
      isSubtraction: true,
    },
    {
      label: '= Effective Gross Income',
      monthly: b.effectiveGrossIncome,
      annual: b.effectiveGrossIncome * 12,
      bold: true,
      isSeparator: true,
    },
    // Expense section
    {
      label: 'Mortgage Payment',
      monthly: b.mortgage,
      annual: b.mortgage * 12,
    },
    {
      label: 'Property Tax',
      monthly: b.propertyTax,
      annual: b.propertyTax * 12,
    },
    {
      label: 'Insurance',
      monthly: b.insurance,
      annual: b.insurance * 12,
    },
    {
      label: 'Maintenance',
      monthly: b.maintenance,
      annual: b.maintenance * 12,
    },
    {
      label: 'Management Fee',
      monthly: b.managementFee,
      annual: b.managementFee * 12,
    },
    {
      label: '= Total Expenses',
      monthly: b.totalExpenses,
      annual: b.totalExpenses * 12,
      bold: true,
      isSeparator: true,
    },
    // Bottom line
    {
      label: 'Net Cash Flow',
      monthly: b.netCashFlow,
      annual: b.netCashFlow * 12,
      bold: true,
      isNetCashFlow: true,
    },
  ];
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CashFlowBreakdown({ breakdown }: CashFlowBreakdownProps) {
  const rows = buildRows(breakdown);
  const isPositiveCashFlow = breakdown.netCashFlow >= 0;

  return (
    <Card padding="none" as="section">
      <div className="px-6 py-5">
        <CardTitle>Monthly &amp; Annual Cash Flow Breakdown</CardTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-surface-200 bg-surface-50">
              <th className="px-6 py-3 text-left font-semibold text-primary-700">
                Line Item
              </th>
              <th className="px-6 py-3 text-right font-semibold text-primary-700">
                Monthly
              </th>
              <th className="px-6 py-3 text-right font-semibold text-primary-700">
                Annual
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isOddRow = idx % 2 !== 0;

              return (
                <tr
                  key={row.label}
                  className={cn(
                    'border-b border-surface-100 transition-colors',
                    // Alternating row backgrounds
                    isOddRow && 'bg-surface-50',
                    // Income rows get a subtle green tint
                    row.isIncome && !row.bold && 'bg-emerald-50/40',
                    row.isIncome && row.bold && 'bg-emerald-50/60',
                    // Separator rows (EGI and Total Expenses)
                    row.isSeparator && 'border-t-2 border-t-surface-200 bg-surface-100/60',
                    // Net Cash Flow highlight
                    row.isNetCashFlow && (isPositiveCashFlow ? 'bg-emerald-50' : 'bg-red-50'),
                  )}
                >
                  <td
                    className={cn(
                      'px-6 py-3 text-primary-800',
                      row.bold && 'font-semibold',
                      row.isSubtraction && 'pl-10 text-primary-600',
                      row.isNetCashFlow && (isPositiveCashFlow ? 'text-emerald-800' : 'text-red-800'),
                    )}
                  >
                    {row.label}
                  </td>
                  <td
                    className={cn(
                      'px-6 py-3 text-right tabular-nums text-primary-800',
                      row.bold && 'font-semibold',
                      row.isSubtraction && 'text-red-600',
                      row.isNetCashFlow && (isPositiveCashFlow ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'),
                    )}
                  >
                    {row.isSubtraction
                      ? `(${formatCurrency(Math.abs(row.monthly))})`
                      : formatCurrency(row.monthly)}
                  </td>
                  <td
                    className={cn(
                      'px-6 py-3 text-right tabular-nums text-primary-800',
                      row.bold && 'font-semibold',
                      row.isSubtraction && 'text-red-600',
                      row.isNetCashFlow && (isPositiveCashFlow ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'),
                    )}
                  >
                    {row.isSubtraction
                      ? `(${formatCurrency(Math.abs(row.annual))})`
                      : formatCurrency(row.annual)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
