// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';

// The genealogy of Christ on bible/ (docs/tasks/site-genealogy.md).
const genealogy = JSON.parse(readFileSync(new URL('../src/data/genealogy.json', import.meta.url), 'utf8'));
type Proof = { url: string; title: string; tier: string; excerpt: string; accessed: string };
const names = (segment: { people?: { name: string }[]; lines?: Record<string, { people: string[] }>; join?: string[] }, line?: string) =>
  [...(segment.people ?? []).map((person) => person.name), ...(line && segment.lines ? segment.lines[line].people : []), ...(segment.join ?? [])];

test('Luke\'s line from Joseph up to Adam has the Gospel\'s 75 names', () => {
  // Lk 3:23–38: «Сын Иосифов, Илиев, …, Адамов, Божий» — 75 names after «Божий» is left out.
  const luke = genealogy.segments.flatMap((segment: never) => names(segment, 'luke'));
  const fromAdam = ['Адам', 'Сиф', 'Енос', 'Каинан', 'Малелеил', 'Иаред', 'Енох', 'Мафусал', 'Ламех', 'Ной', 'Сим', 'Арфаксад', 'Каинан', 'Сала', 'Евер', 'Фалек', 'Рагав', 'Серух', 'Нахор', 'Фарра', 'Авраам'];
  assert.deepEqual(luke.slice(0, fromAdam.length), fromAdam);
  assert.equal(luke.length, 75);
  assert.equal(luke.at(-1), 'Иосиф, муж Марии');
});

test('Matthew\'s line from Abraham names Solomon\'s kings and ends at Joseph', () => {
  const matthew = genealogy.segments.slice(1).flatMap((segment: never) => names(segment, 'matthew'));
  const start = matthew.indexOf('Авраам');
  assert.ok(start >= 0);
  assert.deepEqual(matthew.slice(start, start + 15), ['Авраам', 'Исаак', 'Иаков', 'Иуда', 'Фарес', 'Есром', 'Арам', 'Аминадав', 'Наассон', 'Салмон', 'Вооз', 'Овид', 'Иессей', 'Давид', 'Соломон']);
  assert.equal(matthew.at(-1), 'Иосиф, муж Марии');
});

test('every genealogy proof is a Synodal verse or St John of Damascus on azbyka', () => {
  const proofs: Proof[] = JSON.stringify(genealogy).match(/\{"url[^{}]*\}/g)!.map((row) => JSON.parse(row));
  assert.ok(proofs.length > 50);
  for (const proof of proofs) {
    assert.match(proof.url, /^https:\/\/azbyka\.ru\/(biblia\/\?[A-Za-z]+\.\d+:\d+(-\d+)?&r|otechnik\/Ioann_Damaskin\/)/, proof.title);
    assert.equal(proof.tier, 'official');
    assert.ok(proof.excerpt.trim() && /^\d{4}-\d{2}-\d{2}$/.test(proof.accessed), proof.title);
  }
});
