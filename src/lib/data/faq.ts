import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { FAQ } from '@/types';

const FAQ_PATH = path.join(process.cwd(), 'content', 'faq.json');

/**
 * Read all site-wide FAQ entries.
 */
export async function getFaqs(): Promise<FAQ[]> {
  const raw = await readFile(FAQ_PATH, 'utf-8');
  return JSON.parse(raw) as FAQ[];
}
