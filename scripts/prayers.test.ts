// @ts-expect-error - node types are not installed; matches the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
// @ts-expect-error - js-yaml has no separately installed TypeScript declarations.
import * as yaml from 'js-yaml';
import { CREED_ARTICLES } from '../src/lib/creed.ts';
import { prayersDestination } from '../src/lib/legacyRoutes.ts';

const prayers = yaml.load(readFileSync('src/data/prayers.yaml', 'utf8')) as { id: string; text_cs?: string }[];
const read = (path: string): string => readFileSync(`dist/${path}/index.html`, 'utf8');

// The prayers belong to «Богослужение и молитва» (owner, 2026-10-09).
test('«Богослужение и молитва» carries the prayers with the anchors the comparisons link to', () => {
  const ids = prayers.map((prayer) => prayer.id);
  for (const id of ['simvol-very', 'otche-nash', 'dostojno-est', 'psalom-50']) assert.ok(ids.includes(id), id);
  const worship = read('worship');
  const texts = worship.slice(worship.indexOf('id="prayers"'));
  assert.ok(worship.indexOf('id="part-worship"') < worship.indexOf('id="prayers"'), 'questions first, then the texts');
  for (const id of ids) assert.ok(texts.includes(`id="${id}"`), id);
  assert.ok(read('compare').includes('worship/#simvol-very'));
  for (const id of ['otche-nash', 'psalom-50', 'dostojno-est', 'tsaryu-nebesnyj', 'iisusova-molitva']) assert.ok(worship.includes(`worship/#${id}`), id);
  assert.ok(read('compare').includes('worship/#tsaryu-nebesnyj'), 'the Holy Spirit question links its prayer');
  assert.ok(!read('compare').includes('prayers/#'));
});

test('the retired «Молитвы» address forwards to the same prayer', () => {
  const base = '/scripture-science/';
  assert.equal(prayersDestination('https://example.test/scripture-science/prayers/?t=orthodoxy,jw#otche-nash', base), '/scripture-science/worship/?t=orthodoxy,jw#otche-nash');
  assert.equal(prayersDestination('https://example.test/scripture-science/prayers/', base), '/scripture-science/worship/#prayers');
  assert.match(read('prayers'), /id="moved" href="\/scripture-science\/worship\/#prayers"/);
});

test('the Church Slavonic Creed among the prayers is the text the comparison quotes', () => {
  const creed = prayers.find((prayer) => prayer.id === 'simvol-very')!;
  const lines = creed.text_cs!.trim().split('\n').map((line) => line.trim());
  assert.deepEqual(lines, CREED_ARTICLES.map((article) => article.text));
});
