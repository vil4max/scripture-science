// Thin loading layer between the content collections and pages: applies the
// pure rules from ./rules so a data violation fails `npm run build` instead
// of silently rendering an incomplete comparison.
import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { TOPIC_ORDER, checkTopic, orderByAge } from './rules';

/**
 * Traditions being compared, ordered older-first (EDITORIAL.md principle 2).
 * `ids` restricts the set for a page that compares a specific subset (e.g. a
 * pair page); omit it to order every tradition in the collection.
 *
 * Age comes from the tradition's `matrix` entry (docs/tasks/site-m2-main-page.md
 * W1: matrix is the single source of truth for `since`). A tradition without
 * a matrix entry yet - six of eight, at this slice's base
 * (docs/tasks/site-m2-main-page.md "Data availability") - has no age to
 * derive any more (`traditions.yaml` is presentation-only now), so it keeps
 * the position it was given in the caller's `ids` array instead of an
 * invented one; a caller with no matrix data and no `ids` gets whatever
 * order the content store returns. See "Conflicts found" in the Writer's
 * final report for this slice.
 */
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

/**
 * Every tradition with a matrix entry (docs/tasks/site-m3-matrix-content.md),
 * ordered older-first with the eight-tradition tie-break rule
 * (EDITORIAL.md principle 2; src/lib/rules.ts `orderByAge`). Only the
 * matrix files that exist are returned - a tradition still being written
 * (docs/tasks/site-m2-main-page.md "Data availability") is simply absent,
 * not rendered incomplete.
 */
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

/**
 * How each tradition officially views the others (EDITORIAL.md principle 9),
 * ordered older-first by matrix age where known. `src/data/views-of-others.yaml`
 * is still being written (docs/tasks/site-m2-main-page.md "Data
 * availability"): while it is absent this returns an empty list, and the
 * page section it backs renders nothing rather than failing the build.
 */
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

/**
 * Verified disputes between traditions (EDITORIAL.md principle 10), in the
 * order of their topics; a dispute still marked `todo` is not published.
 */
export async function getDisputes(): Promise<CollectionEntry<'disputes'>[]> {
  const all = await getCollection('disputes');
  const rank = (topic: string) => TOPIC_ORDER.indexOf(topic as (typeof TOPIC_ORDER)[number]);
  return all.filter((d) => d.data.status === 'verified').sort((a, b) => rank(a.data.topic) - rank(b.data.topic));
}

/**
 * The terms box (EDITORIAL.md principle 5). `src/data/terms.yaml` is still
 * being written - see `getOrderedViews` above for the same "renders
 * nothing while absent" contract.
 */
export async function getTerms(): Promise<CollectionEntry<'terms'>[]> {
  return getCollection('terms');
}
