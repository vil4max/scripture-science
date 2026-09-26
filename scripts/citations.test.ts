// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { Citations, citationsFor, citationTitle } from '../src/lib/citations.ts';

test('one URL retains every paragraph and excerpt with unique return anchors', () => {
  const citations = new Citations();
  const a = citations.add({ url: 'https://example.org', title: '§880', excerpt: 'first' });
  const b = citations.add({ url: 'https://example.org', title: '§882', excerpt: 'second' });
  assert.equal(a.number, b.number);
  assert.notEqual(a.id, b.id);
  assert.equal(citations.entries.length, 1);
  assert.deepEqual(citations.entries[0].proofs.map((p) => p.title), ['§880', '§882']);
});
test('excluded references enrich metadata without creating dead return links', () => {
  const citations = new Citations();
  citations.add({ url: 'https://example.org', title: 'full title' }, false);
  assert.deepEqual(citations.entries[0].references, []);
});
test('registries persist within a page and are isolated between pages', () => {
  const page = {};
  assert.equal(citationsFor(page), citationsFor(page));
  assert.notEqual(citationsFor(page), citationsFor({}));
});

test('paragraph labels sharing a title are merged without excerpts', () => {
  assert.equal(citationTitle([
    { url: 'x', title: 'Catechism §880', excerpt: 'one' },
    { url: 'x', title: 'Catechism §882', excerpt: 'two' },
  ]), 'Catechism §880, 882');
});
