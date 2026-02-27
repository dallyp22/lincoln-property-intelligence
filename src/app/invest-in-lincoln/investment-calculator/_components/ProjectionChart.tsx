'use client';

import dynamic from 'next/dynamic';
import type { YearProjection } from '@/lib/engines/investment-calculator';
import { Card, CardTitle } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectionChartProps {
  projections: YearProjection[];
}

// ---------------------------------------------------------------------------
// Dynamically imported chart (Recharts requires browser APIs)
// ---------------------------------------------------------------------------

const RechartsChart = dynamic(() => import('./ProjectionChartInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-surface-200 border-t-accent-500" />
        <p className="text-sm text-primary-400">Loading chart...</p>
      </div>
    </div>
  ),
});

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ProjectionChart({ projections }: ProjectionChartProps) {
  return (
    <Card padding="none" as="section">
      <div className="px-6 py-5">
        <CardTitle>5-Year Projection</CardTitle>
      </div>
      <div className="px-2 pb-6 sm:px-4">
        <RechartsChart projections={projections} />
      </div>
    </Card>
  );
}
