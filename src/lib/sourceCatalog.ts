import { matchesSearch } from './search.ts';

export interface CatalogProof {
  url: string;
  title: string;
  tier: 'official' | 'reference' | 'news';
  excerpt: string;
  accessed: string;
}

export interface CatalogUsage {
  traditionId?: string;
  traditionName?: string;
  topic?: string;
  section: string;
  cardId?: string;
  cardTitle?: string;
  role?: 'church' | 'tradition' | 'answer';
}

export interface CatalogRecord {
  proof: CatalogProof;
  usage: CatalogUsage;
}

export interface CatalogEntry {
  url: string;
  references: { proof: CatalogProof; usages: CatalogUsage[] }[];
}

export const EVIDENCE_ROLE_LABELS = {
  church: 'Учение Православной Церкви',
  tradition: 'Учение традиции',
  answer: 'Православный ответ',
} as const;

export const READING_KIND_LABELS = {
  church: 'церковный документ',
  encyclopedia: 'энциклопедия «Азбуки веры»',
  author: 'мнение автора',
  conference: 'итоговый документ конференции',
  testimony: 'свидетельство',
} as const;

export function sourceAnchor(url: string): string {
  // Stable across catalogue sorting and additions; uniqueness is checked at build time.
  let hash = 0xcbf29ce484222325n;
  for (const character of url) hash = BigInt.asUintN(64, (hash ^ BigInt(character.codePointAt(0)!)) * 0x100000001b3n);
  return `source-${hash.toString(16)}`;
}

export interface CatalogFilter { query: string; topic: string; tradition: string; role: string; }

export function matchesCatalogUsage(usage: CatalogUsage, filter: CatalogFilter, proofText: string): boolean {
  return (!filter.topic || usage.topic === filter.topic)
    && (!filter.tradition || usage.traditionId === filter.tradition)
    && (!filter.role || usage.role === filter.role)
    && matchesSearch(`${proofText} ${usage.traditionName ?? ''} ${usage.section} ${usage.cardTitle ?? ''}`, filter.query);
}

export function proofKey(proof: CatalogProof): string {
  return JSON.stringify([proof.url, proof.title, proof.tier, proof.excerpt, proof.accessed]);
}

export function uniqueProofs(proofs: CatalogProof[]): CatalogProof[] {
  return [...new Map(proofs.map((proof) => [proofKey(proof), proof])).values()];
}

function usageKey(usage: CatalogUsage): string {
  return JSON.stringify([
    usage.traditionId, usage.traditionName, usage.topic, usage.section,
    usage.cardId, usage.cardTitle, usage.role,
  ]);
}

export function buildSourceCatalog(records: CatalogRecord[]): CatalogEntry[] {
  const byUrl = new Map<string, Map<string, CatalogEntry['references'][number]>>();
  for (const { proof, usage } of records) {
    const references = byUrl.get(proof.url) ?? new Map<string, CatalogEntry['references'][number]>();
    const key = proofKey(proof);
    const reference = references.get(key) ?? { proof, usages: [] };
    if (!reference.usages.some((existing) => usageKey(existing) === usageKey(usage))) {
      reference.usages.push(usage);
    }
    references.set(key, reference);
    byUrl.set(proof.url, references);
  }
  return [...byUrl].map(([url, references]) => ({ url, references: [...references.values()] }))
    .sort((a, b) => a.references[0].proof.title.localeCompare(b.references[0].proof.title, 'ru'));
}

export function filterSourceCatalog(
  entries: CatalogEntry[],
  include: (usage: CatalogUsage) => boolean,
): CatalogEntry[] {
  return entries.map((entry) => ({
    url: entry.url,
    references: entry.references.map((reference) => ({
      proof: reference.proof,
      usages: reference.usages.filter(include),
    })).filter((reference) => reference.usages.length > 0),
  })).filter((entry) => entry.references.length > 0);
}

interface AnalysisEvidence {
  tradition: string;
  groups: {
    cards: {
      id: string;
      title: string;
      topic?: string;
      church: { proof: CatalogProof[] };
      tradition: { proof: CatalogProof[] };
      answer: { proof: CatalogProof[] };
    }[];
  }[];
}

export function collectAnalysisSources(
  analyses: AnalysisEvidence[],
  names: ReadonlyMap<string, string>,
): CatalogRecord[] {
  return analyses.flatMap((analysis) => analysis.groups.flatMap((group) => group.cards.flatMap((card) =>
    (['church', 'tradition', 'answer'] as const).flatMap((role) => card[role].proof.map((proof) => ({
      proof,
      usage: {
        traditionId: analysis.tradition,
        traditionName: names.get(analysis.tradition),
        topic: card.topic,
        section: 'Подробный разбор',
        cardId: card.id,
        cardTitle: card.title,
        role,
      },
    }))),
  )));
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
