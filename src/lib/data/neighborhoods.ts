import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type {
  Neighborhood,
  NeighborhoodGeoCollection,
} from '@/types';

const NEIGHBORHOODS_DIR = path.join(process.cwd(), 'content', 'neighborhoods');
const GEOJSON_PATH = path.join(process.cwd(), 'content', 'geo', 'neighborhoods.geojson');

/**
 * Read all neighborhood JSON files from content/neighborhoods/ and return a
 * typed array sorted alphabetically by name.
 */
export async function getAllNeighborhoods(): Promise<Neighborhood[]> {
  const files = await readdir(NEIGHBORHOODS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  const neighborhoods = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = path.join(NEIGHBORHOODS_DIR, file);
      const raw = await readFile(filePath, 'utf-8');
      return JSON.parse(raw) as Neighborhood;
    }),
  );

  return neighborhoods.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Read a single neighborhood by slug.
 * Returns `null` if no matching file is found.
 */
export async function getNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | null> {
  const filePath = path.join(NEIGHBORHOODS_DIR, `${slug}.json`);
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Neighborhood;
  } catch {
    return null;
  }
}

/**
 * Read the GeoJSON FeatureCollection containing approximate polygon boundaries
 * for all mapped neighborhoods.
 */
export async function getNeighborhoodGeoJson(): Promise<NeighborhoodGeoCollection> {
  const raw = await readFile(GEOJSON_PATH, 'utf-8');
  return JSON.parse(raw) as NeighborhoodGeoCollection;
}
