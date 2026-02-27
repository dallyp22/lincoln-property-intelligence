'use client';

import dynamic from 'next/dynamic';
import type { Neighborhood, NeighborhoodGeoCollection } from '@/types';

const NeighborhoodExplorer = dynamic(
  () =>
    import('@/components/map/NeighborhoodExplorer').then(
      (mod) => mod.NeighborhoodExplorer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-surface-200 bg-surface-50 lg:h-[650px]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-surface-200 border-t-accent-500" />
          <p className="mt-3 text-sm text-primary-400">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export function NeighborhoodExplorerWrapper({
  neighborhoods,
  geojson,
}: {
  neighborhoods: Neighborhood[];
  geojson: NeighborhoodGeoCollection;
}) {
  return <NeighborhoodExplorer neighborhoods={neighborhoods} geojson={geojson} />;
}
