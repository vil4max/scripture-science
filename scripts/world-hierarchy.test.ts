// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import data from '../src/data/world-hierarchy-2026.json' with { type: 'json' };
import { hierarchySlices, ringPath } from '../src/lib/worldHierarchy.ts';

test('2026 estimates keep population totals and explicitly normalize Christian weights', () => {
  assert.equal(data.year, 2026);
  assert.equal(data.edition, 2026);
  assert.equal(data.groups.reduce((sum, g) => sum + g.count, 0), data.population);
  assert.ok(Math.abs(data.groups.reduce((sum, g) => sum + g.share, 0) - 100) < 1e-10);
  assert.ok(Math.abs(data.branches.reduce((sum, g) => sum + g.share, 0) - 100) < 1e-10);
  assert.equal(data.branches.reduce((sum, g) => sum + g.count, 0), data.branchWeightTotal);
  assert.ok(data.branchWeightTotal > data.groups.find((g) => g.id === 'christians')!.count);
  assert.match(data.method, /schematic proportions/);
  assert.equal(new Set([...data.groups, ...data.branches].map((g) => g.id)).size, 13);
  for (const group of data.groups) assert.equal(group.share, group.count / data.population * 100);
  for (const branch of data.branches) {
    assert.equal(branch.share, branch.count / data.branchWeightTotal * 100);
    assert.ok(branch.proof.some((p) => p.excerpt === branch.count.toLocaleString('en-US')));
  }
  for (const proof of [...data.proof, ...data.groups.flatMap((g) => g.proof), ...data.branches.flatMap((g) => g.proof)]) {
    assert.ok(proof.excerpt.split(/\s+/).length <= 25);
    assert.match(proof.url, /Status-of-Global-Christianity-2026/);
  }
});

test('child arcs exactly tile the Christian parent and conserve its world share', () => {
  const { parents, children } = hierarchySlices(data.groups, data.branches);
  const parent = parents.find((g) => g.id === 'christians')!;
  assert.ok(Math.abs(parents.at(-1)!.end - 360) < 1e-10);
  assert.equal(children[0].start, parent.start);
  assert.ok(Math.abs(children.at(-1)!.end - parent.end) < 1e-10);
  assert.ok(Math.abs(children.reduce((sum, g) => sum + g.worldShare, 0) - parent.share) < 1e-10);
  children.forEach((child, i) => {
    if (i) assert.equal(child.start, children[i - 1].end);
    assert.ok(child.end > child.start);
    assert.doesNotMatch(ringPath(child.start, child.end, 134, 190), /NaN|Infinity/);
  });
  assert.ok(children.find((g) => g.id === 'catholics')!.worldShare > 14);
});
