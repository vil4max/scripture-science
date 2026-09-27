// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';


const html: string = readFileSync(new URL('../dist/compare/index.html', import.meta.url), 'utf8');
test('embedded pair retains all arguments and correction destinations without duplicate IDs', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal((html.match(/class="pair-argument\b/g) ?? []).length, 24);
  assert.doesNotMatch(html, /id="pair-history"|Исторический масштаб|Что совпадает и что различается/);
  assert.match(html, /id="pair-continuity"/);
});
test('embedded citation links and SVG markers resolve after namespacing', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/(?:href="#|url\(#)(pair-[^"\s)]+)/g)) {
    assert.ok(ids.has(match[1]), `missing target: ${match[1]}`);
  }
  assert.equal(/url\(#(?!pair-)/.test(html), false);
  assert.equal(/class="full-table\b|id="pairs"|id="jw-legal-note"/.test(html), false);
});

test('legacy public route is a bridge to the revision, not an alternate edition', () => {
  const bridge = readFileSync('dist/pairs/orthodoxy-jw/index.html', 'utf8');
  assert.match(bridge, /id="revised-comparison"/);
  assert.doesNotMatch(bridge, /Исторический масштаб|Что совпадает и что различается|class="topic"/);
  assert.doesNotMatch(html, /href="[^"#]*pairs\/orthodoxy-jw\/#/);
});

test('all thirteen disputes retain documented participants without topic fallbacks', () => {
  const questions = [...html.matchAll(/<aside\b[^>]*\bid="question-[\s\S]*?<\/aside>/g)];
  assert.equal(questions.length, 13);
  for (const [question] of questions) {
    const participants = [...question.matchAll(/data-trad="([^"]+)"/g)].map(m => m[1]);
    assert.ok(participants.includes('orthodoxy'));
    assert.equal(participants.length, new Set(participants).size);
    assert.ok(participants.length < 8);
  }
  assert.doesNotMatch(html, /Отдельного разбора этого вопроса в подборке пока нет/);
});

test('comparison keeps topic evidence on demand and history in its own section', () => {
  assert.equal((html.match(/<details class="evidence"/g) ?? []).length, 120);
  assert.doesNotMatch(html, /<details class="evidence"[^>]* open/);
  const history = readFileSync('dist/timeline/index.html', 'utf8');
  for (const year of ['1879', '1914', '1931']) assert.match(history, new RegExp(`<strong[^>]*>${year}</strong>`));
  assert.ok(history.includes('bible/#scripture-new-world'));
});

 test('reading approaches remain within interpretation with selected-column alignment', () => {
  const start = html.indexOf('id="topic-authority"');
  const end = html.indexOf('id="topic-salvation"');
  const authority = html.slice(start, end);
  assert.match(authority, /id="pair-summary"/);
  assert.match(authority, /Возвращение к Библии/);
  assert.doesNotMatch(authority, /цитаты и полный итог сравнения/);
  const approaches = authority.slice(authority.indexOf('id="pair-summary"'), authority.length);
  for (const id of ['orthodoxy', 'jw']) assert.ok(approaches.includes(`data-pair-trad="${id}"`));
});

test('bibliography and correction catalog live on the reference page', () => {
  assert.doesNotMatch(html, /id="pair-refs"|class="pair-corrections"/);
  const sources = readFileSync('dist/sources/index.html', 'utf8');
  assert.match(sources, /id="pair-refs"/);
  assert.match(sources, /id="pair-corrections"/);
  assert.equal((sources.match(/id="pair-correction-/g) ?? []).length, 14);
});
