'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { YearProjection } from '@/lib/engines/investment-calculator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectionChartInnerProps {
  projections: YearProjection[];
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------

function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-surface-200 bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-primary-900">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="text-xs text-primary-600">{entry.name}</span>
            </div>
            <span className="text-xs font-medium tabular-nums text-primary-900">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Format Y-Axis as compact currency ($0, $50K, $100K, etc.)
// ---------------------------------------------------------------------------

function formatYAxisTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ProjectionChartInner({ projections }: ProjectionChartInnerProps) {
  const data = projections.map((p) => ({
    name: `Year ${p.year}`,
    'Property Value': p.propertyValue,
    'Loan Balance': p.loanBalance,
    Equity: p.equity,
    'Cumulative Cash Flow': p.cumulativeCashFlow,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          tickFormatter={formatYAxisTick}
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={65}
        />
        <Tooltip content={<CustomChartTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
        />
        <Line
          type="monotone"
          dataKey="Property Value"
          stroke="#1e3a5f"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#1e3a5f' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Loan Balance"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 4, fill: '#ef4444' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Equity"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#10b981' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Cumulative Cash Flow"
          stroke="#d4af37"
          strokeWidth={2}
          dot={{ r: 4, fill: '#d4af37' }}
          activeDot={{ r: 6 }}
          strokeDasharray="5 3"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
