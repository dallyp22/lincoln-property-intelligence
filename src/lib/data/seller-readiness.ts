import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { FAQ } from '@/types';

const SELLER_READINESS_FAQ_PATH = path.join(
  process.cwd(),
  'content',
  'seller-readiness-faq.json',
);

/**
 * Read all Seller Readiness Score FAQ entries.
 */
export async function getSellerReadinessFaqs(): Promise<FAQ[]> {
  const raw = await readFile(SELLER_READINESS_FAQ_PATH, 'utf-8');
  return JSON.parse(raw) as FAQ[];
}
