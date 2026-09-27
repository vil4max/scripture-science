// docs/tasks/site-m5-reading-polish.md W3 "Family line": loads
// src/data/families.yaml as a Vite `?raw` string and parses it with js-yaml
// (the same parser astro/loaders' own file() loader uses internally - see
// the comment in src/content.config.ts - so this is not a new dependency)
// rather than through a new Astro content collection, because
// content.config.ts is outside this slice's owned files
// (docs/tasks/site-m5-reading-polish.md "Boundaries"). `?raw` (not
// node:fs) is what survives Astro's build, which moves this module into
// dist/.prerender/chunks and so breaks any path built from import.meta.url.
import familiesRaw from '../data/families.yaml?raw';
// @ts-expect-error - js-yaml has no types without @types/js-yaml (see
// src/content.config.ts for why this is not a new dependency).
import * as yaml from 'js-yaml';
import type { TraditionId } from './rules';

interface FamilyProof {
  url: string;
  title: string;
  tier: 'official' | 'reference' | 'news';
  excerpt: string;
  accessed: string;
}

export interface Family {
  tradition: TraditionId;
  family: string;
  path: string[];
  proof: FamilyProof[];
}

let cached: Family[] | undefined;

/**
 * The family-classification line for every tradition that has one
 * (docs/tasks/site-m5-reading-polish.md: "No proof -> no family line" - a
 * tradition simply absent from src/data/families.yaml gets none).
 */
export function getFamilies(): Family[] {
  if (!cached) {
    const parsed = yaml.load(familiesRaw);
    cached = Array.isArray(parsed) ? (parsed as Family[]) : [];
  }
  return cached;
}

export function getFamilyByTradition(id: string): Family | undefined {
  return getFamilies().find((f) => f.tradition === id);
}
