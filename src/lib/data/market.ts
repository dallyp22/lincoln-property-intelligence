import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { MarketStats, MarketReport } from '@/types';

const STATS_PATH = path.join(
  process.cwd(),
  'content',
  'market',
  'current-stats.json',
);

const REPORTS_DIR = path.join(process.cwd(), 'content', 'market', 'reports');

/**
 * Read the current Lincoln market statistics snapshot.
 */
export async function getMarketStats(): Promise<MarketStats> {
  const raw = await readFile(STATS_PATH, 'utf-8');
  return JSON.parse(raw) as MarketStats;
}

/**
 * Read a specific monthly market report by slug (e.g. "january-2026").
 */
export async function getMarketReport(slug: string): Promise<MarketReport> {
  const filePath = path.join(REPORTS_DIR, `${slug}.json`);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as MarketReport;
}
