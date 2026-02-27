'use client';

import dynamic from 'next/dynamic';
import type { Neighborhood } from '@/types';

const NeighborhoodExplorerPreview = dynamic(
  () =>
    import('@/components/home/NeighborhoodExplorerPreview').then(
      (mod) => mod.NeighborhoodExplorerPreview
    ),
  { ssr: false }
);

export function NeighborhoodExplorerPreviewWrapper({
  neighborhoods,
}: {
  neighborhoods: Neighborhood[];
}) {
  return <NeighborhoodExplorerPreview neighborhoods={neighborhoods} />;
}
