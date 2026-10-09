// @ts-expect-error - node types are not installed; matches the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { CREED_ARTICLES, CREED_TOPICS, OTHER_TOPICS, creedArticlesFor } from '../src/lib/creed.ts';
import { TOPIC_ORDER } from '../src/lib/rules.ts';

// The Creed is the framework of the comparison (owner, 2026-10-09).
test('the Creed has its twelve articles, every article is discussed and every topic belongs to one part', () => {
  assert.deepEqual(CREED_ARTICLES.map((article) => article.n), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  assert.match(CREED_ARTICLES[0].text, /^Верую во единаго Бога Отца, Вседержителя, Творца небу и земли/);
  const discussed = new Set(CREED_TOPICS.flatMap((topic) => creedArticlesFor(topic).map((article) => article.n)));
  assert.deepEqual([...discussed].sort((a, b) => a - b), CREED_ARTICLES.map((article) => article.n));
  assert.deepEqual([...CREED_TOPICS, ...OTHER_TOPICS].sort(), [...TOPIC_ORDER].sort());
  for (const topic of OTHER_TOPICS) assert.equal(creedArticlesFor(topic).length, 0, topic);
  assert.equal(CREED_TOPICS[0], 'god');
});

test('the comparison opens with the Creed part, quoting its articles before the plain explanation', () => {
  const html: string = readFileSync('dist/compare/index.html', 'utf8');
  const creedPart = html.slice(html.indexOf('id="part-creed"'), html.indexOf('id="part-other"'));
  const order = [...creedPart.matchAll(/<section class="question"[^>]*id="topic-([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(order, CREED_TOPICS.flatMap((topic): string[] => topic === 'jesus' ? [topic, 'theotokos'] : [topic]));
  assert.deepEqual(creedArticlesFor('theotokos').map((article) => article.n), [3]);
  const god = creedPart.slice(creedPart.indexOf('id="topic-god"'), creedPart.indexOf('class="pair"'));
  assert.ok(god.indexOf('Творца небу и земли, видимым же всем и невидимым') < god.indexOf('Простыми словами'));
  assert.match(god, /Творец неба и земли/);
  assert.ok(html.includes('worship/#simvol-very'));
  assert.match(html, /Православный взгляд на расхождение/);
});
