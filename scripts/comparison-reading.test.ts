// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { readingState, readingUrl } from '../src/lib/comparisonReading.ts';

test('reading defaults and invalid input cannot hide every topic', () => {
  assert.deepEqual(readingState(''), { topic: '' });
  assert.deepEqual(readingState('?mode=unknown&topic=unknown'), { topic: '' });
  assert.equal(readingState('?topic=god', '#topic-invalid').topic, 'god');
});
test('a valid topic anchor overrides a stale filter', () => {
  assert.deepEqual(readingState('?mode=detail&topic=god', '#topic=jesus'), { topic: 'god' });
  assert.deepEqual(readingState('?mode=detail&topic=god', '#topic-jesus'), { topic: 'jesus' });
});
test('shared links retain selected traditions, base path and question anchor', () => {
  const href = readingUrl('https://example.test/religion-map/compare/?t=orthodoxy,jw', 'god', 'question-trinity');
  const url = new URL(href);
  assert.equal(url.pathname, '/religion-map/compare/');
  assert.equal(url.searchParams.get('t'), 'orthodoxy,jw');
  assert.equal(url.hash, '#question-trinity');
  assert.equal(url.searchParams.has('topic'), false);
  const reset = new URL(readingUrl(href, '', ''));
  assert.equal(reset.searchParams.has('topic'), false);
  assert.equal(reset.hash, '');
  assert.equal(reset.searchParams.get('t'), 'orthodoxy,jw');
});

test('legacy reading modes normalize without losing selection or topic', () => {
  for (const mode of ['brief', 'detail']) {
    const old = `https://example.test/religion-map/compare/?t=islam,judaism&slots=islam,,judaism&mode=${mode}&topic=god#topic-god`;
    const state = readingState(new URL(old).search);
    const url = new URL(readingUrl(old, state.topic));
    assert.equal(url.searchParams.has('mode'), false);
    assert.equal(url.searchParams.get('t'), 'islam,judaism');
    assert.equal(url.searchParams.get('slots'), 'islam,,judaism');
    assert.equal(url.searchParams.has('topic'), false);
    assert.equal(url.hash, '#topic-god');
  }
});

test('legacy topic-only links become anchors without a filter parameter', () => {
  const href = 'https://example.test/religion-map/compare/?t=islam,jw&topic=name-of-god';
  const url = new URL(readingUrl(href, readingState(new URL(href).search).topic));
  assert.equal(url.hash, '#topic-name-of-god');
  assert.equal(url.searchParams.has('topic'), false);
  assert.equal(url.searchParams.get('t'), 'islam,jw');
});
