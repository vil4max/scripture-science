// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { accessedRange, catalogLabel, formatAccessed } from '../src/lib/citations.ts';

test('a catalogue entry is labelled by its work, and access dates read in Russian', () => {
  assert.equal(catalogLabel([
    { title: 'Свт. Филарет Московский. Пространный катехизис, §90: Троица' },
    { title: 'Свт. Филарет Московский. Пространный катехизис, §§237–240: Дух' },
  ]), 'Свт. Филарет Московский. Пространный катехизис');
  assert.equal(formatAccessed('2026-10-01'), '1 октября 2026');
  assert.equal(accessedRange(['2026-10-09', '2026-09-25', '2026-10-09']), '25 сентября 2026 — 9 октября 2026');
});
