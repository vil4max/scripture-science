import { TRADITION_IDS } from './rules.ts';

// Orthodoxy and one chosen tradition (owner, 2026-10-09: two columns read
// better than three); Jehovah's Witnesses is the default.
export const MAX_SELECTION = 2;
export const SELECTION_PARAM = 't';
export const DEFAULT_SELECTION: string[] = ['orthodoxy', 'jw'];

/**
 * Absence means the default; an explicit empty value retains only the fixed
 * foundation. Older addresses with two choices keep the first one.
 */
export function parseSelection(raw: string | null | undefined): string[] {
  if (raw == null) return [...DEFAULT_SELECTION];
  const known = new Set<string>(TRADITION_IDS);
  const ids = ['orthodoxy'];
  for (const part of raw.split(',')) {
    const id = part.trim();
    if (known.has(id) && !ids.includes(id)) ids.push(id);
    if (ids.length === MAX_SELECTION) break;
  }
  return ids;
}

/** Choosing a tradition replaces the current one; choosing it again clears it. */
export function toggleSelection(ids: string[], id: string): string[] {
  const selected = parseSelection(ids.join(','));
  if (id === 'orthodoxy' || !TRADITION_IDS.some(known => known === id)) return selected;
  return selected.includes(id) ? ['orthodoxy'] : ['orthodoxy', id];
}

export function hrefWithSelection(href: string, ids: string[], origin = 'http://x'): string {
  const url = new URL(href, origin);
  url.searchParams.set(SELECTION_PARAM, parseSelection(ids.join(',')).join(','));
  const relative = `${url.pathname}${url.search}${url.hash}`;
  return href.startsWith('http') ? url.toString() : relative;
}
