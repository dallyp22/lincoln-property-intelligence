'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { ReportNeighborhood, ReportRentalUnit } from '@/types';

// ─── Shared ─────────────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function formatCompactCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

// ─── Neighborhood Price Chart ───────────────────────────────────────────────

function PriceTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-200 bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-primary-900">{(d.name ?? d.fullName) as string}</p>
      <p className="text-primary-600 mt-1">
        Median: <span className="font-medium text-primary-900">{formatCurrency(d.medianPrice as number)}</span>
      </p>
      <p className="text-primary-600">
        YoY: <span className={`font-medium ${(d.yoyChange as number) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {(d.yoyChange as number) >= 0 ? '+' : ''}{d.yoyChange as number}%
        </span>
      </p>
      <p className="text-primary-400 mt-0.5">{d.marketType as string}</p>
    </div>
  );
}

function getBarColor(yoyChange: number): string {
  if (yoyChange >= 10) return '#d4af37';   // gold — explosive growth
  if (yoyChange >= 3) return '#0d9488';    // teal — strong
  if (yoyChange >= 0) return '#1e3a5f';    // navy — stable
  return '#ef4444';                         // red — declining
}

export function NeighborhoodPriceChart({ data }: { data: ReportNeighborhood[] }) {
  const sorted = [...data].sort((a, b) => a.medianPrice - b.medianPrice);
  const chartData = sorted.map((n) => ({
    name: n.name,
    medianPrice: n.medianPrice,
    yoyChange: n.yoyChange,
    marketType: n.marketType,
  }));
  const chartHeight = Math.max(420, data.length * 36);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={formatCompactCurrency}
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={160}
        />
        <Tooltip content={<PriceTooltip />} />
        <Bar dataKey="medianPrice" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={getBarColor(entry.yoyChange)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Rental Rates Chart ─────────────────────────────────────────────────────

function RentTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-200 bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-primary-900">{d.type as string}</p>
      <p className="text-primary-600 mt-1">
        Avg Rent: <span className="font-medium text-primary-900">{formatCurrency(d.avgRent as number)}/mo</span>
      </p>
      <p className="text-primary-600">
        Market Share: <span className="font-medium">{d.marketShare as number}%</span>
      </p>
      {(d.yoyChange as number | null) != null && (
        <p className="text-primary-600">
          YoY: <span className="font-medium text-emerald-600">+{d.yoyChange as number}%</span>
        </p>
      )}
    </div>
  );
}

const RENT_COLORS = ['#6366f1', '#0d9488', '#1e3a5f', '#d4af37', '#b45309'];

export function RentalRatesChart({ data }: { data: ReportRentalUnit[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="type"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          tickFormatter={(v: number) => `$${v.toLocaleString()}`}
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip content={<RentTooltip />} />
        <Bar dataKey="avgRent" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={RENT_COLORS[i % RENT_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── YoY Change Chart (Neighborhood) ────────────────────────────────────────

function ChangeTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-surface-200 bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-primary-900">{d.fullName as string}</p>
      <p className="text-primary-600 mt-1">
        YoY Change: <span className={`font-medium ${(d.yoyChange as number) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {(d.yoyChange as number) >= 0 ? '+' : ''}{d.yoyChange as number}%
        </span>
      </p>
      <p className="text-primary-600">
        Median: <span className="font-medium">{formatCurrency(d.medianPrice as number)}</span>
      </p>
    </div>
  );
}

export function NeighborhoodChangeChart({ data }: { data: ReportNeighborhood[] }) {
  const sorted = [...data].sort((a, b) => a.yoyChange - b.yoyChange);
  const chartData = sorted.map((n) => ({
    name: n.name,
    fullName: n.name,
    yoyChange: n.yoyChange,
    medianPrice: n.medianPrice,
  }));
  const chartHeight = Math.max(420, data.length * 36);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v: number) => `${v > 0 ? '+' : ''}${v}%`}
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={160}
        />
        <Tooltip content={<ChangeTooltip />} />
        <Bar dataKey="yoyChange" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.yoyChange >= 0 ? '#0d9488' : '#ef4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
