// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { comparisonSlots, replaceComparisonSlot } from '../src/lib/comparisonSlots.ts';
import { hrefWithSelection, parseSelection } from '../src/lib/selection.ts';
import { readingUrl } from '../src/lib/comparisonReading.ts';

test('slots fill legacy gaps and always retain two comparison traditions', () => {
  assert.deepEqual(comparisonSlots(['orthodoxy', 'jw'], 'orthodoxy,,jw'), ['orthodoxy', 'catholicism', 'jw']);
  assert.deepEqual(comparisonSlots(['jw'], ',,jw'), ['orthodoxy', 'jw', 'catholicism']);
  assert.deepEqual(comparisonSlots([], ',,'), ['orthodoxy', 'catholicism', 'jw']);
  assert.deepEqual(replaceComparisonSlot(['orthodoxy', 'catholicism', 'jw'], 1, ''), ['orthodoxy', 'catholicism', 'jw']);
});
test('replacement refuses duplicates, unknown ids and invalid slot numbers', () => {
  const slots = ['orthodoxy', '', 'jw'];
  assert.deepEqual(replaceComparisonSlot(slots, 0, ''), slots);
  assert.deepEqual(replaceComparisonSlot(slots, 0, 'islam'), slots);
  assert.deepEqual(replaceComparisonSlot(slots, 1, 'jw'), slots);
  assert.deepEqual(replaceComparisonSlot(slots, 1, 'unknown'), slots);
  assert.deepEqual(replaceComparisonSlot(slots, 3, 'islam'), slots);
  assert.deepEqual(replaceComparisonSlot(slots, 1, 'islam'), ['orthodoxy', 'islam', 'jw']);
});
test('legacy or stale slot URLs fall back to a complete selected order', () => {
  for (const raw of [null, 'jw,jw,', 'unknown,,jw', ',orthodoxy,jw,', 'jw,,orthodoxy']) {
    assert.deepEqual(comparisonSlots(['orthodoxy', 'jw'], raw), ['orthodoxy', 'jw', 'catholicism']);
  }
});
test('selection and reading links retain explicit slots, topic and question anchor', () => {
  const slots = ['orthodoxy', 'catholicism', 'jw'];
  const selected = hrefWithSelection('https://example.test/religion-map/compare/?slots=orthodoxy,catholicism,jw', slots);
  const url = new URL(readingUrl(selected, 'god', 'question-trinity'));
  assert.deepEqual(comparisonSlots(parseSelection(url.searchParams.get('t')), url.searchParams.get('slots')), slots);
  assert.equal(url.searchParams.has('mode'), false);
  assert.equal(url.searchParams.has('topic'), false);
  assert.equal(url.hash, '#question-trinity');
});
