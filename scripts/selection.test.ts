// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { hrefWithSelection, parseSelection, toggleSelection } from '../src/lib/selection.ts';

test('parseSelection keeps known ids in the reader\'s order, drops repeats and unknown ids, and stops at three', () => {
  assert.deepEqual(parseSelection('orthodoxy,catholicism'), ['orthodoxy', 'catholicism']);
  assert.deepEqual(parseSelection(' jw , nonsense,jw,islam'), ['jw', 'islam']);
  assert.deepEqual(parseSelection('judaism,orthodoxy,catholicism,islam'), ['judaism', 'orthodoxy', 'catholicism']);
  assert.deepEqual(parseSelection(''), []);
  assert.deepEqual(parseSelection(null), []);
});

test('toggleSelection adds, removes, and refuses a fourth without dropping an earlier choice', () => {
  assert.deepEqual(toggleSelection([], 'islam'), { ids: ['islam'], refused: false });
  assert.deepEqual(toggleSelection(['islam', 'jw'], 'islam'), { ids: ['jw'], refused: false });
  const full = ['judaism', 'orthodoxy', 'catholicism'];
  assert.deepEqual(toggleSelection(full, 'islam'), { ids: full, refused: true });
});

test('hrefWithSelection sets or removes ?t= and keeps the path and hash', () => {
  assert.equal(hrefWithSelection('/religion-map/compare/', ['orthodoxy', 'islam']), '/religion-map/compare/?t=orthodoxy%2Cislam');
  assert.equal(hrefWithSelection('/religion-map/compare/?t=jw#topic-god', []), '/religion-map/compare/#topic-god');
  const roundTrip = new URL(hrefWithSelection('/a/', ['jw', 'lds']), 'http://x').searchParams.get('t');
  assert.deepEqual(parseSelection(roundTrip), ['jw', 'lds']);
});
