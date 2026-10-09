// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { hrefWithSelection, parseSelection, toggleSelection } from '../src/lib/selection.ts';

test('parseSelection inserts Orthodoxy, keeps one choice and distinguishes absence from empty', () => {
  assert.deepEqual(parseSelection('orthodoxy,catholicism'), ['orthodoxy', 'catholicism']);
  assert.deepEqual(parseSelection(' jw , nonsense,jw,islam'), ['orthodoxy', 'jw']);
  assert.deepEqual(parseSelection('judaism,orthodoxy,catholicism,islam'), ['orthodoxy', 'judaism']);
  assert.deepEqual(parseSelection(''), ['orthodoxy']);
  assert.deepEqual(parseSelection(null), ['orthodoxy', 'jw']);
});

test('toggleSelection replaces the chosen tradition and clears it when chosen again', () => {
  assert.deepEqual(toggleSelection([], 'islam'), ['orthodoxy', 'islam']);
  assert.deepEqual(toggleSelection(['orthodoxy', 'jw'], 'islam'), ['orthodoxy', 'islam']);
  assert.deepEqual(toggleSelection(['orthodoxy', 'islam'], 'islam'), ['orthodoxy']);
});

test('hrefWithSelection keeps an explicit Orthodox-only selection and keeps the path and hash', () => {
  assert.equal(hrefWithSelection('/religion-map/compare/', ['orthodoxy', 'islam']), '/religion-map/compare/?t=orthodoxy%2Cislam');
  assert.equal(hrefWithSelection('/religion-map/compare/?t=jw#topic-god', []), '/religion-map/compare/?t=orthodoxy#topic-god');
  const roundTrip = new URL(hrefWithSelection('/a/', ['jw', 'lds']), 'http://x').searchParams.get('t');
  assert.deepEqual(parseSelection(roundTrip), ['orthodoxy', 'jw']);
});

test('Orthodoxy cannot be removed and unknown toggles do not alter selection', () => {
  assert.deepEqual(toggleSelection(['orthodoxy', 'jw'], 'orthodoxy'), ['orthodoxy', 'jw']);
  assert.deepEqual(toggleSelection(['jw'], 'missing'), ['orthodoxy', 'jw']);
});
