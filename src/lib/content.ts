// Thin loading layer between the content collections and pages: applies the
// pure rules from ./rules so a data violation fails `npm run build` instead
// of silently rendering an incomplete comparison.
import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { TOPIC_ORDER, checkTopic, orderByAge } from './rules';

/** Legacy presentation entries ordered by matrix age; missing ages retain the requested order. */
export async function getOrderedTraditions(
  ids?: string[],
): Promise<CollectionEntry<'traditions'>[]> {
  const all = await getCollection('traditions');
  const matrixById = new Map((await getCollection('matrix')).map((m) => [m.id, m.data]));
  const selected = ids ? all.filter((t) => ids.includes(t.id)) : all;
  // The content store does not promise to preserve traditions.yaml's own
  // key order (observed: it comes back alphabetical), so the fallback index
  // below is read from the caller's `ids` - the order the caller actually
  // asked for - never from `selected`'s own position.
  const decorated = selected.map((entry) => {
    const since = matrixById.get(entry.id)?.since;
    return {
      entry,
      index: ids ? ids.indexOf(entry.id) : 0,
      since: since ? { year: since.year } : undefined,
      name: matrixById.get(entry.id)?.name,
    };
  });
  decorated.sort((a, b) => {
    if (a.since && b.since) {
      if (a.since.year !== b.since.year) return a.since.year - b.since.year;
      return (a.name ?? '').localeCompare(b.name ?? '', 'ru');
    }
    return a.index - b.index;
  });
  return decorated.map((d) => d.entry);
}

/** Matrix entries ordered by historical age with the shared tie-break rule. */
export async function getOrderedMatrix(): Promise<CollectionEntry<'matrix'>[]> {
  const all = await getCollection('matrix');
  const wrapped = all.map((entry) => ({
    since: { year: entry.data.since.year },
    id: entry.data.id,
    name: entry.data.name,
    entry,
  }));
  return orderByAge(wrapped).map((w) => w.entry);
}

/**
 * Topics sorted by their declared `order`, each checked to carry exactly the
 * given traditions' positions - no more, no fewer. Throws (failing the
 * build) on the first topic that doesn't.
 */
export async function getCheckedTopics(
  traditionIds: string[],
): Promise<CollectionEntry<'topics'>[]> {
  const topics = await getCollection('topics');
  const sorted = [...topics].sort((a, b) => a.data.order - b.data.order);
  for (const topic of sorted) {
    checkTopic(topic.data, traditionIds);
  }
  return sorted;
}

/** A verbatim HTML section fragment by id; throws if the migration never produced it. */
export async function getSection(id: string): Promise<CollectionEntry<'sections'>> {
  const entry = await getEntry('sections', id);
  if (!entry) {
    throw new Error(`Missing section "${id}" in src/data/sections-orthodoxy-jw.yaml`);
  }
  return entry;
}

/** Attributed documents ordered by their issuing tradition's historical age. */
export async function getOrderedViews(): Promise<CollectionEntry<'views'>[]> {
  const all = await getCollection('views');
  const matrixById = new Map((await getCollection('matrix')).map((m) => [m.id, m.data]));
  const decorated = all.map((entry, index) => {
    const since = matrixById.get(entry.id)?.since;
    return {
      entry,
      index,
      since: since ? { year: since.year } : undefined,
      name: matrixById.get(entry.id)?.name,
    };
  });
  decorated.sort((a, b) => {
    if (a.since && b.since) {
      if (a.since.year !== b.since.year) return a.since.year - b.since.year;
      return (a.name ?? '').localeCompare(b.name ?? '', 'ru');
    }
    return a.index - b.index;
  });
  return decorated.map((d) => d.entry);
}

/** Publish verified disputes in comparison-topic order. */
export async function getDisputes(): Promise<CollectionEntry<'disputes'>[]> {
  const all = await getCollection('disputes');
  const rank = (topic: string) => TOPIC_ORDER.indexOf(topic as (typeof TOPIC_ORDER)[number]);
  return all.filter((d) => d.data.status === 'verified').sort((a, b) => rank(a.data.topic) - rank(b.data.topic));
}

export async function getTerms(): Promise<CollectionEntry<'terms'>[]> {
  return getCollection('terms');
}
