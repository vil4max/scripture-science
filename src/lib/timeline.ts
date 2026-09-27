// Data model, validation and pure layout math for the M2b timeline
// (docs/tasks/site-m2-timeline-tree.md). No astro:* imports, so this runs
// directly under Node's stripped-types execution (scripts/timeline.test.ts)
// as well as inside the Astro build - the same split as src/lib/rules.ts.
import { z } from 'astro/zod';

// The eight traditions with a dedicated `--t-<id>` colour in Base.astro.
// Any node/branch outside this set (an undivided church, a milieu, a
// schismatic group that isn't one of the eight) uses `--t-other` instead -
// enforced by leaving `tradition` unset on that node, never by inventing a
// ninth colour.
export const TRADITION_IDS = [
  'judaism',
  'orthodoxy',
  'catholicism',
  'islam',
  'protestantism',
  'lds',
  'adventism',
  'jw',
] as const;
export const traditionIdSchema = z.enum(TRADITION_IDS);
export type TraditionId = z.infer<typeof traditionIdSchema>;

const proofSchema = z.object({
  url: z.url(),
  title: z.string().min(1),
  tier: z.enum(['official', 'reference', 'news']),
  excerpt: z.string().min(1),
  accessed: z.iso.date(),
});
export type Proof = z.infer<typeof proofSchema>;

// A dated claim: either backed by at least one opened-page proof, or marked
// `todo` when the date could not be verified this session (SOURCES.md "What
// 'verified' means" - unverifiable stays out or is visibly marked, never
// silently asserted).
const datedClaimSchema = z
  .object({
    label: z.string().min(1),
    proof: z.array(proofSchema).optional(),
    todo: z.string().optional(),
  })
  .refine((v) => (v.proof && v.proof.length > 0) || v.todo, {
    message: 'a dated claim needs either proof or a todo',
  });

const yearPointSchema = z.intersection(
  z.object({
    year: z.number().int(),
    approx: z.boolean().default(false),
  }),
  datedClaimSchema,
);
export type YearPoint = z.infer<typeof yearPointSchema>;

export const nodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  tradition: traditionIdSchema.optional(),
  parent: z.string().min(1).optional(),
  kind: z.enum(['trunk', 'branch', 'other']),
  start: yearPointSchema,
  event: datedClaimSchema.optional(),
});
export type LineageNode = z.infer<typeof nodeSchema>;

export const unionSchema = z.object({
  description: z.string().min(1).optional(),
  id: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  year: z.number().int(),
  label: z.string().min(1),
  proof: z.array(proofSchema).min(1),
});
export type Union = z.infer<typeof unionSchema>;

export const otherSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  from: z.number().int(),
  to: z.number().int().optional(),
  approx: z.boolean().default(false),
  proof: z.array(proofSchema).min(1),
});
export type Other = z.infer<typeof otherSchema>;

// A tradition's own "creation of the world" epoch (EDITORIAL.md principle 8:
// shown as its own labelled axis marker, never as the historical date the
// neutral BCE/CE axis itself uses). `tradition` is optional: Ussher's
// chronology is a 17th-century Anglican archbishop's private calculation,
// influential in English Bible printing but not an official position of any
// of the eight traditions, so it is labelled by attribution instead and
// coloured `--t-other`.
export const epochSchema = z.object({
  id: z.string().min(1),
  tradition: traditionIdSchema.optional(),
  year: z.number().int(),
  label: z.string().min(1),
  proof: z.array(proofSchema).min(1),
});
export type Epoch = z.infer<typeof epochSchema>;

const selfViewFromSchema = z
  .object({
    year: z.number().int().optional(),
    node: z.string().min(1).optional(),
    label: z.string().min(1),
  })
  .refine((v) => v.year !== undefined || v.node !== undefined, {
    message: 'selfView.from needs a year or a node id',
  });

const gapSchema = z.object({
  from: z.number().int(),
  to: z.number().int(),
  label: z.string().min(1),
});

export const selfViewSchema = z.object({
  tradition: traditionIdSchema,
  from: selfViewFromSchema,
  gaps: z.array(gapSchema).optional(),
  summary: z.string().min(1),
  proof: z.array(proofSchema).min(1),
});
export type SelfView = z.infer<typeof selfViewSchema>;

export const lineageSchema = z.object({
  nodes: z.array(nodeSchema).min(1),
  unions: z.array(unionSchema).default([]),
  others: z.array(otherSchema).default([]),
  selfViews: z.array(selfViewSchema).default([]),
  epochs: z.array(epochSchema).default([]),
});
export type Lineage = z.infer<typeof lineageSchema>;

/** Parses and validates raw JSON against the schema; throws a Zod error listing every issue. */
export function parseLineage(data: unknown): Lineage {
  return lineageSchema.parse(data);
}

/**
 * Cross-reference checks the schema alone cannot express: every `parent`
 * points at a real node, every `tradition` is one of the eight ids (the
 * enum already guarantees this, but a self-view or union can reference a
 * tradition/node that has no matching node), and every union/self-view
 * `node` reference resolves.
 */
export function validateReferences(lineage: Lineage): void {
  const ids = new Set(lineage.nodes.map((n) => n.id));
  for (const node of lineage.nodes) {
    if (node.parent && !ids.has(node.parent)) {
      throw new Error(`Node "${node.id}" has unknown parent "${node.parent}"`);
    }
  }
  for (const union of lineage.unions) {
    if (!ids.has(union.from)) {
      throw new Error(`Union "${union.id}" has unknown "from" node "${union.from}"`);
    }
    if (!ids.has(union.to)) {
      throw new Error(`Union "${union.id}" has unknown "to" node "${union.to}"`);
    }
  }
  const traditionsWithNodes = new Set(
    lineage.nodes.map((n) => n.tradition).filter((t): t is TraditionId => Boolean(t)),
  );
  for (const selfView of lineage.selfViews) {
    if (!traditionsWithNodes.has(selfView.tradition)) {
      throw new Error(
        `selfView "${selfView.tradition}" has no node of that tradition on the tree`,
      );
    }
    if (selfView.from.node && !ids.has(selfView.from.node)) {
      throw new Error(
        `selfView "${selfView.tradition}" has unknown "from.node" "${selfView.from.node}"`,
      );
    }
  }
  for (const epoch of lineage.epochs) {
    if (epoch.tradition && !traditionsWithNodes.has(epoch.tradition)) {
      throw new Error(`epoch "${epoch.id}" has no node of tradition "${epoch.tradition}"`);
    }
  }
}

// --- Tree layout -----------------------------------------------------

export interface TreeNode extends LineageNode {
  children: TreeNode[];
}

/** Groups nodes into parent/child trees, preserving each node's position in the source array among its siblings. */
export function buildForest(nodes: LineageNode[]): TreeNode[] {
  const byId = new Map<string, TreeNode>(nodes.map((n) => [n.id, { ...n, children: [] }]));
  const roots: TreeNode[] = [];
  for (const node of nodes) {
    const treeNode = byId.get(node.id)!;
    if (node.parent) {
      const parent = byId.get(node.parent);
      // validateReferences() catches a missing parent before this runs in
      // the page/tests; fall back to treating it as a root so layout code
      // never throws on data it didn't check itself.
      if (parent) {
        parent.children.push(treeNode);
        continue;
      }
    }
    roots.push(treeNode);
  }
  return roots;
}

/**
 * One lane per node, in tree order: a node's lane comes immediately after
 * its parent's, before any sibling subtree started after it (pre-order
 * depth-first) - matching the brief's "parent, then children" lane order.
 */
export function assignLanes(roots: TreeNode[]): Map<string, number> {
  const lanes = new Map<string, number>();
  let next = 0;
  function visit(node: TreeNode): void {
    lanes.set(node.id, next++);
    for (const child of node.children) visit(child);
  }
  for (const root of roots) visit(root);
  return lanes;
}

// --- Chronology (M11) -------------------------------------------------

// The span the data may use: the Byzantine creation epoch (5508 BC) is the
// earliest date, the present the latest. The tests keep every date inside.
export const AXIS_MIN_YEAR = -5600;
export const AXIS_MAX_YEAR = 2026;

// W1 of M6, kept for the vertical chronicle: no text below 13px.
export const MIN_LABEL_FONT_PX = 13;

/**
 * Year from the Creation of the world in the Byzantine (Orthodox) era
 * (docs/DECISIONS.md, "Orthodox chronology"): year 1 ran from 1 September
 * 5509 BC to 31 August 5508 BC. Data years are historical years with no
 * year 0 (-5508 is 5508 BC, 33 is AD 33). Most carry no month, so this uses
 * the January-August reckoning; `fromSeptember` adds the one year a
 * September-December date gets.
 */
export function yearFromCreation(year: number, fromSeptember = false): number {
  if (year === 0) throw new Error('There is no year 0 in historical dating');
  const am = year < 0 ? 5509 + year : 5508 + year;
  return fromSeptember ? am + 1 : am;
}

/** A year before or after the Nativity, in the site's Russian wording. */
export function formatYearAd(year: number): string {
  return year < 0 ? `${-year} г. до Р.Х.` : `${year} г.`;
}

// --- Chronicle rows (M11) --------------------------------------------------

export type ChronicleRowKind = 'node' | 'union' | 'epoch' | 'other' | 'biblical';

export interface ChronicleRow {
  kind: ChronicleRowKind;
  id: string;
  year: number;
  approx: boolean;
  /** Bold lead: the branch, the religion or the epoch. */
  title: string;
  /** What happened, without the year (the year columns carry it). */
  text: string;
  proof?: Proof;
  todo?: string;
  /** The tradition whose colour the row carries, if one of the eight. */
  tradition?: TraditionId;
}

/**
 * The event text of a node row. `start.label` reads "1054 г. · раскол с
 * Западной церковью"; its part after the date matches the start year, while
 * `event.label` may add a name ("Великая схизма") or a later event (Karbala
 * for the Shia line). The longer wins when one contains the other.
 */
export function nodeEventText(node: LineageNode): string {
  const cut = node.start.label.indexOf(' · ');
  const part = cut === -1 ? '' : node.start.label.slice(cut + 3);
  const event = node.event?.label ?? '';
  if (!part) return event;
  if (!event) return part;
  const a = part.toLowerCase();
  const b = event.toLowerCase();
  if (a.includes(b)) return part;
  if (b.includes(a)) return event;
  return `${part} (${event})`;
}

const KIND_ORDER: Record<ChronicleRowKind, number> = { epoch: 0, biblical: 1, other: 2, node: 3, union: 4 };

/**
 * Every dated item as one row, oldest first. Ties keep epochs and biblical
 * milestones, then other religions and separations in tree order (parent first),
 * then unions.
 */
export function buildChronicleRows(lineage: Lineage, biblical: readonly { id: string; year: number; title: string; ref: string }[] = []): ChronicleRow[] {
  const treeOrder = assignLanes(buildForest(lineage.nodes));
  const rows: Array<ChronicleRow & { rank: number }> = [];
  for (const n of lineage.nodes) {
    rows.push({
      kind: 'node',
      id: n.id,
      year: n.start.year,
      approx: n.start.approx,
      title: n.label,
      text: nodeEventText(n),
      proof: (n.event?.proof ?? n.start.proof ?? [])[0],
      todo: n.event?.todo ?? n.start.todo,
      tradition: n.tradition,
      rank: treeOrder.get(n.id)!,
    });
  }
  for (const u of lineage.unions) {
    rows.push({
      kind: 'union',
      id: u.id,
      year: u.year,
      approx: false,
      title: u.label.replace(/,\s*\d+\s*г\.$/, ''),
      text: u.description ?? `${lineage.nodes.find((n) => n.id === u.from)!.label} → ${lineage.nodes.find((n) => n.id === u.to)!.label}`,
      proof: u.proof[0],
      rank: 0,
    });
  }
  for (const e of lineage.epochs) {
    const dash = e.label.lastIndexOf(' — ');
    rows.push({
      kind: 'epoch',
      id: e.id,
      year: e.year,
      approx: false,
      title: dash === -1 ? e.label : e.label.slice(0, dash),
      text: '',
      proof: e.proof[0],
      tradition: e.tradition,
      rank: 0,
    });
  }
  for (const o of lineage.others) {
    rows.push({
      kind: 'other',
      id: o.id,
      year: o.from,
      approx: o.approx,
      title: o.label,
      text: o.to !== undefined ? `до ${o.approx ? 'ок. ' : ''}${formatYearAd(o.to)}` : '',
      proof: o.proof[0],
      rank: 0,
    });
  }
  for (const event of biblical) {
    rows.push({ kind: 'biblical', id: event.id, year: event.year, title: event.title,
      text: event.ref, approx: event.id === 'biblical-nativity', rank: 0 });
  }
  rows.sort((a, b) => a.year - b.year || KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.rank - b.rank);
  return rows.map(({ rank: _rank, ...row }) => row);
}

/** A tradition's self-view belongs to its first node on the tree. */
export function selfViewTargetId(lineage: Lineage, tradition: string): string | undefined {
  return lineage.nodes.find((n) => n.tradition === tradition)?.id;
}

// --- Branch columns (M11) -------------------------------------------------

// Structural nodes that stop being their own line once every child has
// split off: the line ends at the last child's row. Every other line (a
// living tradition) runs to the end of the chronicle.
export const TRANSITIONAL_NODE_IDS = new Set([
  'israelite-second-temple',
  'early-christianity',
  'chalcedonian-christianity',
  'reformation',
  'second-great-awakening',
  'islam',
]);

export interface BranchLayout {
  /** Graph column of each node's line. */
  column: Map<string, number>;
  /**
   * Lines that run on to the present: every node except a structural one
   * that has children (its line ends at its last child's row, even when that
   * row is the chronicle's last).
   */
  living: Set<string>;
  /** First and last row index (inclusive) each node's line occupies. */
  span: Map<string, [number, number]>;
  columns: number;
}

/**
 * Gives each node's line a graph column like a git log graph. Lines are
 * placed in the order they start (the fewest columns an interval layout
 * allows: one per line alive at the same row), each in the leftmost free
 * column. The last child of a structural node continues its parent's
 * column, so the line bends once instead of jumping.
 */
export function assignBranchColumns(lineage: Lineage, rows: ChronicleRow[]): BranchLayout {
  const rowOf = new Map<string, number>();
  rows.forEach((r, i) => {
    if (r.kind === 'node') rowOf.set(r.id, i);
  });
  const lastRow = rows.length - 1;
  const children = new Map<string, string[]>();
  for (const n of lineage.nodes) if (n.parent) children.set(n.parent, [...(children.get(n.parent) ?? []), n.id]);
  const span = new Map<string, [number, number]>();
  for (const n of lineage.nodes) {
    const kids = children.get(n.id);
    const last = TRANSITIONAL_NODE_IDS.has(n.id) && kids ? Math.max(...kids.map((k) => rowOf.get(k)!)) : lastRow;
    // A line starts at its own row: the connector to the parent is drawn on
    // that row, inside the parent's still-open span.
    span.set(n.id, [rowOf.get(n.id)!, last]);
  }
  const treeOrder = assignLanes(buildForest(lineage.nodes));
  const ordered = [...lineage.nodes].sort(
    (a, b) => span.get(a.id)![0] - span.get(b.id)![0] || treeOrder.get(a.id)! - treeOrder.get(b.id)!,
  );
  const taken: Array<Array<[number, number]>> = [];
  const column = new Map<string, number>();
  const free = (c: number, [a, b]: [number, number]) => !(taken[c] ?? []).some(([x, y]) => a <= y && x <= b);
  for (const n of ordered) {
    const [a, b] = span.get(n.id)!;
    const parent = n.parent ? lineage.nodes.find((p) => p.id === n.parent)! : undefined;
    let c = -1;
    if (parent && TRANSITIONAL_NODE_IDS.has(parent.id) && span.get(parent.id)![1] === a) {
      // The parent's span ends on this row; the continuation shares it.
      const pc = column.get(parent.id)!;
      if (free(pc, [a + 1, b])) c = pc;
    }
    if (c === -1) {
      c = 0;
      while (!free(c, [a, b])) c++;
    }
    (taken[c] ??= []).push(c === column.get(parent?.id ?? '') ? [a + 1, b] : [a, b]);
    column.set(n.id, c);
  }
  const living = new Set(
    lineage.nodes.filter((n) => !(TRANSITIONAL_NODE_IDS.has(n.id) && children.has(n.id))).map((n) => n.id),
  );
  return { column, span, living, columns: taken.length };
}
