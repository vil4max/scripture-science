// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { citationTitle } from '../src/lib/citations.ts';

test('paragraph labels sharing a title are merged without excerpts', () => {
  assert.equal(citationTitle([
    { title: 'Catechism §880' },
    { title: 'Catechism §882' },
  ]), 'Catechism §880, 882');
});
