// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:fs has no types without @types/node
import { readFileSync } from 'node:fs';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';

const page: string = readFileSync(new URL('../dist/traditions/jw/index.html', import.meta.url), 'utf8');
const compare: string = readFileSync(new URL('../dist/compare/index.html', import.meta.url), 'utf8');
const cardIds = [...page.matchAll(/<article class="card"[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);

test('analysis page renders unique cards with all three blocks', () => {
  assert.ok(cardIds.length > 0);
  const ids = [...page.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  const cards = [...page.matchAll(/<article class="card"[\s\S]*?<\/article>/g)].map((match) => match[0]);
  assert.equal(cards.length, cardIds.length);
  for (const card of cards) {
    for (const label of ['Учение Церкви', 'Учение: Свидетели Иеговы', 'Православный ответ']) assert.ok(card.includes(label), label);
  }
});

test('analysis states that no synodal act addresses Jehovah\'s Witnesses and carries the legal note', () => {
  assert.match(page, /Ни один соборный или синодальный акт/);
  assert.match(page, /id="jw-legal-note"/);
});

test('every comparison link into the analysis resolves to a card', () => {
  const targets = [...compare.matchAll(/href="[^"]*traditions\/jw\/#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(targets.length > 0);
  for (const target of targets) assert.ok(cardIds.includes(target), `missing card: ${target}`);
});

test('contents lists every card', () => {
  const start = page.indexOf('<nav class="analysis-contents"');
  const nav = page.slice(start, page.indexOf('</nav>', start));
  for (const id of cardIds) assert.match(nav, new RegExp(`href="#${id}"`));
});
