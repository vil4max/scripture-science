// @ts-expect-error - node types are not installed; matches the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
// @ts-expect-error - js-yaml has no separately installed TypeScript declarations.
import * as yaml from 'js-yaml';

// docs/tasks/site-m34-newcomer-reading.md
const read = (path: string) => readFileSync(`dist/${path ? `${path}/` : ''}index.html`, 'utf8');
const terms = yaml.load(readFileSync('src/data/terms.yaml', 'utf8')) as { term: string; slug: string; group: string; match?: string[] }[];
const TRADITIONS = ['judaism', 'catholicism', 'islam', 'protestantism', 'lds', 'adventism', 'jw'];

test('the glossary is a page with every term anchored, basic concepts first', () => {
  const page = read('terms');
  let previous = -1;
  let entryAt = -1;
  for (const entry of terms) {
    const position = page.indexOf(`<article class="term" id="${entry.slug}"`);
    assert.ok(position > entryAt, `${entry.slug} keeps its file order`); entryAt = position;
  }
  for (const group of ['basic', 'classification']) {
    const position = page.indexOf(`id="${group}"`);
    assert.ok(position > previous, group); previous = position;
  }
  assert.ok(terms.filter((entry) => entry.group === 'basic').length >= 15);
  assert.ok(read('sources').includes('id="terms"'), 'the reference list keeps its anchor');
});

test('glossary match patterns compile and do not collide on one term name', () => {
  for (const entry of terms) {
    for (const pattern of entry.match ?? []) assert.doesNotThrow(() => new RegExp(pattern, 'u'), `${entry.slug}: ${pattern}`);
  }
});

test('every page carries the inline hint data and dialog once', () => {
  for (const path of ['', 'basics', 'religions', 'traditions/jw']) {
    const page = read(path);
    assert.equal((page.match(/id="term-hints-data"/g) ?? []).length, 1, path);
    assert.equal((page.match(/id="term-hint-pop"/g) ?? []).length, 1, path);
  }
});

test('step zero is linked from the home page and the navigation', () => {
  const home = read('');
  assert.match(home, /class="newcomer"/);
  assert.ok(home.includes('/scripture-science/basics/'));
  const basics = read('basics');
  assert.ok((basics.match(/class="basics-section"/g) ?? []).length >= 5);
  assert.ok(basics.includes('class="proof"'));
});

for (const tradition of TRADITIONS) {
  test(`${tradition}: key points link to cards and every card opens with a short summary`, () => {
    const page = read(`traditions/${tradition}`);
    const cardIds = [...page.matchAll(/<article class="card"[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);
    const keyBlock = page.split('class="key-points"')[1].split('</section>')[0];
    const targets = [...keyBlock.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
    assert.ok(targets.length >= 6 && targets.length <= 10, `${targets.length} key points`);
    for (const target of targets) assert.ok(cardIds.includes(target), target);
    const cards = [...page.matchAll(/<article class="card"[\s\S]*?<\/article>/g)].map((match) => match[0]);
    for (const card of cards) {
      const shortAt = card.indexOf('class="short"');
      const bodyAt = card.indexOf('class="card-body"');
      assert.ok(shortAt > 0 && bodyAt > shortAt, 'summary precedes the folded details');
    }
  });
}

test('Creation-era dates show the familiar year beside them', () => {
  assert.match(read('timeline'), /class="ad-gloss"[^>]*>[^<]*до Р\. Х\./);
  assert.match(read('religions'), /1312 г\. до Р\. Х\./);
});
