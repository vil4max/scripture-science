import { TRADITION_IDS } from './rules.ts';

export const MAX_SELECTION = 3;
export const SELECTION_PARAM = 't';
export const DEFAULT_SELECTION: string[] = ['orthodoxy', 'catholicism', 'jw'];

/** Absence means defaults; an explicit empty value retains only the fixed foundation. */
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

export function toggleSelection(ids: string[], id: string): { ids: string[]; refused: boolean } {
  const selected = parseSelection(ids.join(','));
  if (id === 'orthodoxy' || !TRADITION_IDS.some(known => known === id)) return { ids: selected, refused: false };
  if (selected.includes(id)) return { ids: selected.filter(value => value !== id), refused: false };
  if (selected.length >= MAX_SELECTION) return { ids: selected, refused: true };
  return { ids: [...selected, id], refused: false };
}

export function hrefWithSelection(href: string, ids: string[], origin = 'http://x'): string {
  const url = new URL(href, origin);
  url.searchParams.set(SELECTION_PARAM, parseSelection(ids.join(',')).join(','));
  const relative = `${url.pathname}${url.search}${url.hash}`;
  return href.startsWith('http') ? url.toString() : relative;
}
