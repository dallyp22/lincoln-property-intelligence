import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { FAQ, InvestmentReferenceData } from '@/types';

const INVESTMENT_REFERENCE_PATH = path.join(
  process.cwd(),
  'content',
  'investment-reference-data.json',
);

const INVESTMENT_FAQ_PATH = path.join(
  process.cwd(),
  'content',
  'investment-calculator-faq.json',
);

/**
 * Read the Lincoln market reference data used by the investment calculator.
 */
export async function getInvestmentReferenceData(): Promise<InvestmentReferenceData> {
  const raw = await readFile(INVESTMENT_REFERENCE_PATH, 'utf-8');
  return JSON.parse(raw) as InvestmentReferenceData;
}

/**
 * Read all Investment Calculator FAQ entries.
 */
export async function getInvestmentFaqs(): Promise<FAQ[]> {
  const raw = await readFile(INVESTMENT_FAQ_PATH, 'utf-8');
  return JSON.parse(raw) as FAQ[];
}
