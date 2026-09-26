import { buildChronicleRows, type Lineage } from './timeline';
import type { TraditionId } from './rules';

export function profileChronology(lineage: Lineage, tradition: TraditionId) {
  const nodes = new Map(lineage.nodes.map((node) => [node.id, node]));
  const own = new Set(lineage.nodes.filter((node) => node.tradition === tradition).map((node) => node.id));
  const ancestors = new Set<string>();
  for (const id of own) {
    const visited = new Set<string>([id]);
    let parent = nodes.get(id)?.parent;
    while (parent) {
      if (visited.has(parent)) throw new Error(`Cyclic profile ancestry: ${parent}`);
      visited.add(parent);
      ancestors.add(parent);
      parent = nodes.get(parent)?.parent;
    }
  }
  // Unions belong only to explicitly tagged endpoints, not inherited ancestors.
  const unions = new Set(lineage.unions.filter((union) => own.has(union.from) || own.has(union.to)).map((union) => union.id));
  return buildChronicleRows(lineage).filter((row) =>
    row.tradition === tradition
    || (row.kind === 'node' && ancestors.has(row.id))
    || (row.kind === 'union' && unions.has(row.id)),
  ).map((row) => ({
    ...row,
    association: row.kind === 'union' ? 'union' as const
      : row.kind === 'node' && !own.has(row.id) ? 'ancestor' as const
        : row.kind === 'epoch' ? 'epoch' as const : 'own' as const,
  }));
}
