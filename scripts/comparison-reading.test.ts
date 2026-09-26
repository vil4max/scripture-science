// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { readingState, readingUrl } from '../src/lib/comparisonReading.ts';

test('reading defaults and invalid input cannot hide every topic', () => {
  assert.deepEqual(readingState(''), { mode: 'brief', topic: '' });
  assert.deepEqual(readingState('?mode=unknown&topic=unknown'), { mode: 'brief', topic: '' });
  assert.equal(readingState('?topic=god', '#topic-invalid').topic, 'god');
});
test('a valid topic anchor overrides a stale filter', () => {
  assert.deepEqual(readingState('?mode=detail&topic=god', '#topic=jesus'), { mode: 'detail', topic: 'god' });
  assert.deepEqual(readingState('?mode=detail&topic=god', '#topic-jesus'), { mode: 'detail', topic: 'jesus' });
});
test('shared links retain selected traditions, base path and question anchor', () => {
  const href = readingUrl('https://example.test/religion-map/compare/?t=orthodoxy,jw', 'detail', 'god', 'question-trinity');
  const url = new URL(href);
  assert.equal(url.pathname, '/religion-map/compare/');
  assert.equal(url.searchParams.get('t'), 'orthodoxy,jw');
  assert.equal(url.hash, '#question-trinity');
  assert.deepEqual(readingState(url.search, url.hash), { mode: 'detail', topic: 'god' });
  const reset = new URL(readingUrl(href, 'brief', '', ''));
  assert.equal(reset.searchParams.has('topic'), false);
  assert.equal(reset.hash, '');
  assert.equal(reset.searchParams.get('t'), 'orthodoxy,jw');
});
