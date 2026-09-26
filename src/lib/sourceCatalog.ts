export interface CatalogProof {
  url: string;
  title: string;
  tier: 'official' | 'reference' | 'news';
  excerpt: string;
  accessed: string;
}

/** Collect nested evidence, including unity marks, events and demographic breakdowns. */
export function collectProofs(value: unknown): CatalogProof[] {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(collectProofs);
  const row = value as Record<string, unknown>;
  if (['url', 'title', 'excerpt', 'accessed'].every((key) => typeof row[key] === 'string') &&
      ['official', 'reference', 'news'].includes(String(row.tier))) {
    return [row as unknown as CatalogProof];
  }
  return Object.values(row).flatMap(collectProofs);
}

/** Include quotation and translation URLs even when they have no proof metadata. */
export function collectTextSources(value: unknown): { url: string; title: string }[] {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(collectTextSources);
  const row = value as Record<string, unknown>;
  const title = row.source ?? row.ref ?? row.name ?? row.title;
  const own = typeof row.url === 'string' && typeof title === 'string'
    ? [{ url: row.url, title }] : [];
  return [...own, ...Object.values(row).flatMap(collectTextSources)];
}
