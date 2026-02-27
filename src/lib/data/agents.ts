import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { AgentData } from '@/types';

const AGENTS_PATH = path.join(process.cwd(), 'content', 'agents.json');

/**
 * Read the canonical agent and team data.
 */
export async function getAgentData(): Promise<AgentData> {
  const raw = await readFile(AGENTS_PATH, 'utf-8');
  return JSON.parse(raw) as AgentData;
}
