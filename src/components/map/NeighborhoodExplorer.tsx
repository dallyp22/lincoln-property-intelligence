'use client';

import { useState, useCallback, useMemo } from 'react';
import { NeighborhoodMap } from './NeighborhoodMap';
import { NeighborhoodPanel } from './NeighborhoodPanel';
import { NeighborhoodBasicPanel } from './NeighborhoodBasicPanel';
import { MapControls } from './MapControls';
import { generateNeighborhoodColorMap } from '@/lib/constants';
import type { Neighborhood, NeighborhoodGeoCollection, NeighborhoodGeoProperties } from '@/types';

interface NeighborhoodExplorerProps {
  neighborhoods: Neighborhood[];
  geojson: NeighborhoodGeoCollection;
}

export function NeighborhoodExplorer({
  neighborhoods,
  geojson,
}: NeighborhoodExplorerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const colorMap = useMemo(() => {
    const names = geojson.features.map((f) => f.properties.name);
    return generateNeighborhoodColorMap(names);
  }, [geojson.features]);

  const selectedNeighborhood = selectedSlug
    ? neighborhoods.find((n) => n.slug === selectedSlug) ?? null
    : null;

  // For neighborhoods without a full profile, get GeoJSON properties
  const selectedGeoProperties = useMemo<NeighborhoodGeoProperties | null>(() => {
    if (!selectedSlug || selectedNeighborhood) return null;
    const feature = geojson.features.find((f) => f.properties.slug === selectedSlug);
    return feature?.properties ?? null;
  }, [selectedSlug, selectedNeighborhood, geojson.features]);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug));
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSlug(null);
  }, []);

  return (
    <div className="relative">
      <NeighborhoodMap
        geojson={geojson}
        colorMap={colorMap}
        onNeighborhoodSelect={handleSelect}
        selectedSlug={selectedSlug}
      />
      <MapControls colorMap={colorMap} />

      {selectedNeighborhood && (
        <NeighborhoodPanel
          neighborhood={selectedNeighborhood}
          onClose={handleClose}
        />
      )}

      {selectedGeoProperties && (
        <NeighborhoodBasicPanel
          properties={selectedGeoProperties}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
