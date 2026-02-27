import { cn, formatCurrency } from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui/Card';
import type { YearProjection } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectionTableProps {
  projections: YearProjection[];
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ProjectionTable({ projections }: ProjectionTableProps) {
  return (
    <Card padding="none" as="section">
      <div className="px-6 py-5">
        <CardTitle>5-Year Projection Summary</CardTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-y border-surface-200 bg-surface-50">
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-primary-700">
                Year
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Property Value
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Loan Balance
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Equity
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Annual Cash Flow
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Cumulative Cash Flow
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                Total Return
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-primary-700">
                ROI
              </th>
            </tr>
          </thead>
          <tbody>
            {projections.map((row, idx) => {
              const isYear5 = row.year === 5;
              const isPurchase = row.year === 0;

              return (
                <tr
                  key={row.year}
                  className={cn(
                    'border-b border-surface-100 transition-colors',
                    idx % 2 === 0 ? 'bg-white' : 'bg-surface-50/50',
                    isYear5 && 'bg-accent-50/30 font-bold',
                  )}
                >
                  <td
                    className={cn(
                      'whitespace-nowrap px-4 py-3 font-medium text-primary-900',
                      isYear5 && 'font-bold',
                    )}
                  >
                    {isPurchase ? 'Purchase' : `Year ${row.year}`}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-primary-800">
                    {formatCurrency(row.propertyValue)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-primary-800">
                    {formatCurrency(row.loanBalance)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-emerald-700">
                    {formatCurrency(row.equity)}
                  </td>
                  <td
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-right tabular-nums',
                      row.annualCashFlow >= 0 ? 'text-emerald-700' : 'text-red-700',
                    )}
                  >
                    {formatCurrency(row.annualCashFlow)}
                  </td>
                  <td
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-right tabular-nums',
                      row.cumulativeCashFlow >= 0 ? 'text-emerald-700' : 'text-red-700',
                    )}
                  >
                    {formatCurrency(row.cumulativeCashFlow)}
                  </td>
                  <td
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-right tabular-nums',
                      row.totalReturn >= 0 ? 'text-emerald-700' : 'text-red-700',
                    )}
                  >
                    {formatCurrency(row.totalReturn)}
                  </td>
                  <td
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-right tabular-nums font-medium',
                      row.roi >= 0 ? 'text-emerald-700' : 'text-red-700',
                      isYear5 && 'font-bold',
                    )}
                  >
                    {row.roi.toFixed(1)}%
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
