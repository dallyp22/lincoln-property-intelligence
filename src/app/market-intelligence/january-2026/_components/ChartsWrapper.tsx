'use client';

import dynamic from 'next/dynamic';
import type { ReportNeighborhood, ReportRentalUnit } from '@/types';

const NeighborhoodPriceChart = dynamic(
  () => import('./ReportCharts').then((mod) => mod.NeighborhoodPriceChart),
  { ssr: false, loading: () => <ChartSkeleton height={540} /> }
);

const NeighborhoodChangeChart = dynamic(
  () => import('./ReportCharts').then((mod) => mod.NeighborhoodChangeChart),
  { ssr: false, loading: () => <ChartSkeleton height={540} /> }
);

const RentalRatesChart = dynamic(
  () => import('./ReportCharts').then((mod) => mod.RentalRatesChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> }
);

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="animate-pulse rounded-lg bg-surface-100"
      style={{ height }}
      aria-label="Loading chart..."
    />
  );
}

export function NeighborhoodPriceChartWrapper({ data }: { data: ReportNeighborhood[] }) {
  return <NeighborhoodPriceChart data={data} />;
}

export function NeighborhoodChangeChartWrapper({ data }: { data: ReportNeighborhood[] }) {
  return <NeighborhoodChangeChart data={data} />;
}

export function RentalRatesChartWrapper({ data }: { data: ReportRentalUnit[] }) {
  return <RentalRatesChart data={data} />;
}
