// The reader's choice of traditions (docs/tasks/site-m14-selection.md): one
// to read about, or up to three to compare. Pure functions, shared by the
// browser code (./selection-client.ts) and the tests.
import { TRADITION_IDS } from './rules.ts';

export const MAX_SELECTION = 3;
export const SELECTION_PARAM = 't';

/** Known ids from a `?t=` value, in the reader's order, without repeats, at most three. */
export function parseSelection(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const known = new Set<string>(TRADITION_IDS);
  const ids: string[] = [];
  for (const part of raw.split(',')) {
    const id = part.trim();
    if (known.has(id) && !ids.includes(id)) ids.push(id);
    if (ids.length === MAX_SELECTION) break;
  }
  return ids;
}

/** Adds or removes one tradition; a fourth is refused rather than dropping an earlier choice. */
export function toggleSelection(ids: string[], id: string): { ids: string[]; refused: boolean } {
  if (ids.includes(id)) return { ids: ids.filter((x) => x !== id), refused: false };
  if (ids.length >= MAX_SELECTION) return { ids, refused: true };
  return { ids: [...ids, id], refused: false };
}

/** `href` with the choice in its query (or without `t` when nothing is chosen), keeping any hash. */
export function hrefWithSelection(href: string, ids: string[], origin = 'http://x'): string {
  const url = new URL(href, origin);
  if (ids.length) url.searchParams.set(SELECTION_PARAM, ids.join(','));
  else url.searchParams.delete(SELECTION_PARAM);
  const relative = `${url.pathname}${url.search}${url.hash}`;
  return href.startsWith('http') ? url.toString() : relative;
}
