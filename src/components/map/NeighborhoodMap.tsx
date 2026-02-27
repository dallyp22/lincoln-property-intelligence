'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LINCOLN_MAP_CENTER, LINCOLN_MAP_ZOOM } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import type { NeighborhoodGeoCollection } from '@/types';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface NeighborhoodMapProps {
  geojson: NeighborhoodGeoCollection;
  colorMap: Record<string, string>;
  onNeighborhoodSelect?: (slug: string) => void;
  selectedSlug?: string | null;
  className?: string;
}

export function NeighborhoodMap({
  geojson,
  colorMap,
  onNeighborhoodSelect,
  selectedSlug,
  className,
}: NeighborhoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const tooltipRef = useRef<mapboxgl.Popup | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const onSelectRef = useRef(onNeighborhoodSelect);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Keep callback ref current to avoid stale closures
  onSelectRef.current = onNeighborhoodSelect;

  // Build a match expression for fill color based on neighborhood name
  const buildColorExpression = useCallback((): mapboxgl.Expression => {
    const entries: (string | string[])[] = [];
    for (const [name, color] of Object.entries(colorMap)) {
      entries.push(name, color);
    }
    return ['match', ['get', 'name'], ...entries, '#94a3b8'] as mapboxgl.Expression;
  }, [colorMap]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [LINCOLN_MAP_CENTER.lng, LINCOLN_MAP_CENTER.lat],
      zoom: LINCOLN_MAP_ZOOM,
      attributionControl: true,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const tooltip = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 15,
      className: 'neighborhood-tooltip',
    });

    tooltipRef.current = tooltip;
    mapRef.current = map;

    map.on('load', () => {
      // Add GeoJSON source
      map.addSource('neighborhoods', {
        type: 'geojson',
        data: geojson as GeoJSON.FeatureCollection,
        promoteId: 'slug',
      });

      // Fill layer with choropleth coloring
      map.addLayer({
        id: 'neighborhoods-fill',
        type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-color': buildColorExpression(),
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            0.55,
            ['boolean', ['feature-state', 'hover'], false],
            0.45,
            0.25,
          ],
        },
      });

      // Border line layer
      map.addLayer({
        id: 'neighborhoods-line',
        type: 'line',
        source: 'neighborhoods',
        paint: {
          'line-color': buildColorExpression(),
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            3,
            ['boolean', ['feature-state', 'hover'], false],
            2.5,
            1.5,
          ],
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            1,
            ['boolean', ['feature-state', 'hover'], false],
            0.9,
            0.6,
          ],
        },
      });

      // Hover interactions
      map.on('mousemove', 'neighborhoods-fill', (e) => {
        if (!e.features || e.features.length === 0) return;

        map.getCanvas().style.cursor = 'pointer';

        const feature = e.features[0];
        const slug = feature.properties?.slug as string;

        // Clear previous hover
        if (hoveredIdRef.current && hoveredIdRef.current !== slug) {
          map.setFeatureState(
            { source: 'neighborhoods', id: hoveredIdRef.current },
            { hover: false }
          );
        }

        hoveredIdRef.current = slug;
        map.setFeatureState(
          { source: 'neighborhoods', id: slug },
          { hover: true }
        );

        // Show tooltip
        const name = feature.properties?.name as string;
        const medianPrice = feature.properties?.medianPrice as number;
        const segment = feature.properties?.segment as string;

        const priceHtml = medianPrice > 0
          ? `<p class="text-primary-600 text-xs mt-0.5">${formatCurrency(medianPrice)} median</p>`
          : segment && segment !== 'Unassigned'
            ? `<p class="text-primary-600 text-xs mt-0.5">${segment}</p>`
            : `<p class="text-primary-400 text-xs mt-0.5 italic">Click for details</p>`;

        tooltip
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="px-3 py-2">
              <p class="font-semibold text-primary-900 text-sm">${name}</p>
              ${priceHtml}
            </div>`
          )
          .addTo(map);
      });

      map.on('mouseleave', 'neighborhoods-fill', () => {
        map.getCanvas().style.cursor = '';

        if (hoveredIdRef.current) {
          map.setFeatureState(
            { source: 'neighborhoods', id: hoveredIdRef.current },
            { hover: false }
          );
          hoveredIdRef.current = null;
        }

        tooltip.remove();
      });

      // Click interaction
      map.on('click', 'neighborhoods-fill', (e) => {
        if (!e.features || e.features.length === 0) return;

        const slug = e.features[0].properties?.slug as string;
        onSelectRef.current?.(slug);
      });

      setMapLoaded(true);
    });

    return () => {
      tooltip.remove();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update selected feature state when selectedSlug changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    // Clear all selected states
    for (const feature of geojson.features) {
      map.setFeatureState(
        { source: 'neighborhoods', id: feature.properties.slug },
        { selected: false }
      );
    }

    // Set new selected state
    if (selectedSlug) {
      map.setFeatureState(
        { source: 'neighborhoods', id: selectedSlug },
        { selected: true }
      );
    }
  }, [selectedSlug, mapLoaded, geojson.features]);

  return (
    <div
      ref={containerRef}
      className={className ?? 'h-[500px] w-full rounded-xl lg:h-[650px]'}
      aria-label="Interactive neighborhood map of Lincoln, Nebraska"
      role="application"
    />
  );
}
