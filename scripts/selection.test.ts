// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { hrefWithSelection, parseSelection, toggleSelection } from '../src/lib/selection.ts';

test('parseSelection inserts Orthodoxy, preserves two distinct choices and distinguishes absence from empty', () => {
  assert.deepEqual(parseSelection('orthodoxy,catholicism'), ['orthodoxy', 'catholicism']);
  assert.deepEqual(parseSelection(' jw , nonsense,jw,islam'), ['orthodoxy', 'jw', 'islam']);
  assert.deepEqual(parseSelection('judaism,orthodoxy,catholicism,islam'), ['orthodoxy', 'judaism', 'catholicism']);
  assert.deepEqual(parseSelection(''), ['orthodoxy']);
  assert.deepEqual(parseSelection(null), ['orthodoxy', 'catholicism', 'jw']);
});

test('toggleSelection adds, removes, and refuses a fourth without dropping an earlier choice', () => {
  assert.deepEqual(toggleSelection([], 'islam'), { ids: ['orthodoxy', 'islam'], refused: false });
  assert.deepEqual(toggleSelection(['islam', 'jw'], 'islam'), { ids: ['orthodoxy', 'jw'], refused: false });
  const full = ['orthodoxy', 'judaism', 'catholicism'];
  assert.deepEqual(toggleSelection(full, 'islam'), { ids: full, refused: true });
});

test('hrefWithSelection keeps an explicit Orthodox-only selection and keeps the path and hash', () => {
  assert.equal(hrefWithSelection('/religion-map/compare/', ['orthodoxy', 'islam']), '/religion-map/compare/?t=orthodoxy%2Cislam');
  assert.equal(hrefWithSelection('/religion-map/compare/?t=jw#topic-god', []), '/religion-map/compare/?t=orthodoxy#topic-god');
  const roundTrip = new URL(hrefWithSelection('/a/', ['jw', 'lds']), 'http://x').searchParams.get('t');
  assert.deepEqual(parseSelection(roundTrip), ['orthodoxy', 'jw', 'lds']);
});

test('Orthodoxy cannot be removed and unknown toggles do not alter selection', () => {
  assert.deepEqual(toggleSelection(['orthodoxy', 'jw'], 'orthodoxy'), { ids: ['orthodoxy', 'jw'], refused: false });
  assert.deepEqual(toggleSelection(['jw'], 'missing'), { ids: ['orthodoxy', 'jw'], refused: false });
});
