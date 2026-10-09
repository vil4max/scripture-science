// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { matchesSearch } from '../src/lib/search.ts';
import { hrefWithReadingContext } from '../src/lib/readingContext.ts';

test('question search handles Russian inflections, case, punctuation and multiple words', () => {
  assert.ok(matchesSearch('Учение о Троице и Крещении', 'ТРОИЦА крещение'));
  assert.ok(matchesSearch('Иконопочитание: объяснение', 'иконы'));
  assert.ok(matchesSearch('Всё о вере', 'все'));
  assert.ok(matchesSearch('Any question', ''));
  assert.ok(!matchesSearch('Учение о Троице', 'Троица пост'));
  assert.ok(!matchesSearch('Учение о Троице', '<script>'));
});

test('reading links carry the chosen tradition and the destination anchor and drop old column slots', () => {
  const current = 'https://example.test/scripture-science/compare/?t=orthodoxy,islam&slots=orthodoxy,islam,jw#topic-god';
  const href = hrefWithReadingContext('/scripture-science/traditions/islam/#crucifixion', ['orthodoxy', 'islam'], current);
  const profile = new URL(href, current);
  assert.equal(profile.searchParams.get('t'), 'orthodoxy,islam');
  assert.equal(profile.searchParams.get('slots'), null);
  assert.equal(profile.hash, '#crucifixion');
  const back = new URL(hrefWithReadingContext('/scripture-science/compare/?t=orthodoxy,jw#topic-god', ['orthodoxy', 'islam'], profile.href), current);
  assert.equal(back.searchParams.get('t'), 'orthodoxy,islam');
  assert.equal(back.hash, '#topic-god');
  assert.ok(!hrefWithReadingContext('/compare/?slots=old', ['orthodoxy', 'jw'], 'https://example.test/reading/').includes('slots='));
});

test('search results and adjacent navigation target actual reading cards', () => {
  const search: string = readFileSync('dist/search/index.html', 'utf8');
  const targets = [...search.matchAll(/href="\/scripture-science\/(traditions\/[^/]+|orthodoxy)\/#([^"]+)"/g)];
  assert.equal(targets.length, 207);
  for (const [, path, id] of targets) {
    const page: string = readFileSync(`dist/${path}/index.html`, 'utf8');
    assert.ok(page.includes(`id="${id}"`));
  }
  const jw: string = readFileSync('dist/traditions/jw/index.html', 'utf8');
  assert.equal((jw.match(/rel="prev"/g) ?? []).length, 34);
  assert.equal((jw.match(/rel="next"/g) ?? []).length, 34);
  assert.match(jw, /#topic-god" data-carry-selection/);
});
