import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Testimonial } from '@/types';

const TESTIMONIALS_PATH = path.join(
  process.cwd(),
  'content',
  'testimonials.json',
);

/**
 * Read all testimonials, returned in the order they appear in the JSON file
 * (newest first by convention).
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const raw = await readFile(TESTIMONIALS_PATH, 'utf-8');
  return JSON.parse(raw) as Testimonial[];
}
