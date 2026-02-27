'use client';

import { formatCurrency } from '@/lib/utils';
import { MetricCard } from '@/components/tools/MetricCard';
import type { InvestmentMetrics } from '@/lib/engines/investment-calculator';
import { getMetricColor } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetricsDashboardProps {
  metrics: InvestmentMetrics;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
      aria-label="Investment metrics summary"
    >
      <MetricCard
        label="Monthly Cash Flow"
        value={formatCurrency(metrics.monthlyCashFlow)}
        sublabel={`${formatCurrency(metrics.annualCashFlow)}/yr`}
        color={getMetricColor('monthlyCashFlow', metrics.monthlyCashFlow)}
        tooltip="Net monthly income after all expenses including mortgage, taxes, insurance, maintenance, and management fees"
      />

      <MetricCard
        label="Cash-on-Cash Return"
        value={`${metrics.cashOnCashReturn.toFixed(1)}%`}
        sublabel={`on ${formatCurrency(metrics.totalCashInvested)} invested`}
        color={getMetricColor('cashOnCashReturn', metrics.cashOnCashReturn)}
        tooltip="Annual cash flow divided by total cash invested (down payment + closing costs + rehab)"
      />

      <MetricCard
        label="Cap Rate"
        value={`${metrics.capRate.toFixed(1)}%`}
        sublabel="NOI &divide; Purchase Price"
        color={getMetricColor('capRate', metrics.capRate)}
        tooltip="Net Operating Income divided by purchase price - measures unlevered return"
      />

      <MetricCard
        label="Gross Rent Multiplier"
        value={`${metrics.grossRentMultiplier.toFixed(1)}x`}
        sublabel="years to recoup"
        color={getMetricColor('grossRentMultiplier', metrics.grossRentMultiplier)}
        tooltip="Purchase price divided by annual gross rent - lower is generally better"
      />

      <MetricCard
        label="Break-Even Occupancy"
        value={`${metrics.breakEvenOccupancy.toFixed(0)}%`}
        sublabel="minimum occupancy needed"
        color={getMetricColor('breakEvenOccupancy', metrics.breakEvenOccupancy)}
        tooltip="The occupancy rate needed to cover all expenses - lower gives more vacancy cushion"
      />

      <MetricCard
        label="5-Year ROI"
        value={`${metrics.fiveYearTotalROI.toFixed(1)}%`}
        sublabel="total return on investment"
        color={getMetricColor('fiveYearTotalROI', metrics.fiveYearTotalROI)}
        tooltip="Total return including equity growth, appreciation, and cumulative cash flow over 5 years"
      />
    </div>
  );
}
