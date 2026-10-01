// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';


const html: string = readFileSync(new URL('../dist/compare/index.html', import.meta.url), 'utf8');
const analysis: string = readFileSync(new URL('../dist/traditions/jw/index.html', import.meta.url), 'utf8');
const legacyBySlug = new Map([...analysis.matchAll(/<article class="card" id="([^"]+)"[^>]*data-legacy="([^"]+)"/g)]
  .flatMap((match) => match[2].split(' ').map((slug) => [slug, match[1]] as [string, string])));

test('retired pair arguments live on the analysis page, not in the comparison', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.doesNotMatch(html, /class="pair-argument\b|data-pair-supplement|id="pair-/);
  const slugs = [
    'bog-troica-ili-odna-lichnost', 'kto-takoi-iisus-hristos', 'hristos-i-arhangel-mihail', 'mozhno-li-molitsya-hristu',
    'voskresenie-hrista', 'svyatoi-duh-lico-ili-sila', 'dusha-smert-i-ad', 'spasenie-144-000-tysyacheletie-i-1914-god',
    'kto-tolkuet-pisanie', 'bibliya-perevod-novogo-mira', 'ikony-svyatye-i-bogorodica', 'prazdniki-i-dni-rozhdeniya',
    'summary', 'sources', 'structure', 'dynamics',
  ];
  for (const slug of slugs) assert.ok(legacyBySlug.has(slug), `no card absorbs ${slug}`);
});
test('legacy public route is a bridge to the revision, not an alternate edition', () => {
  const bridge = readFileSync('dist/pairs/orthodoxy-jw/index.html', 'utf8');
  assert.match(bridge, /id="revised-comparison" href="[^"]*traditions\/jw\/"/);
  assert.doesNotMatch(bridge, /Исторический масштаб|Что совпадает и что различается|class="topic"/);
  assert.doesNotMatch(html, /href="[^"#]*pairs\/orthodoxy-jw\/#/);
});

test('all thirteen disputes live on tradition profiles with documented participants', () => {
  assert.doesNotMatch(html, /class="dispute"/);
  const ids = ['orthodoxy', 'judaism', 'catholicism', 'islam', 'protestantism', 'lds', 'adventism', 'jw'];
  const questions = new Map<string, string>();
  for (const id of ids) {
    const profile = readFileSync(`dist/traditions/${id}/index.html`, 'utf8');
    for (const [question, qid] of profile.matchAll(/<aside\b[^>]*\bid="(question-[^"]+)"[\s\S]*?<\/aside>/g)) questions.set(qid, question);
  }
  assert.equal(questions.size, 13);
  for (const question of questions.values()) {
    const participants = [...question.matchAll(/data-trad="([^"]+)"/g)].map(m => m[1]);
    assert.ok(participants.includes('orthodoxy'));
    assert.equal(participants.length, new Set(participants).size);
  }
});

test('comparison keeps theses and links each tradition to its analysis; history has its own section', () => {
  // Every column is a thesis; the Orthodox one links to «Православная вера» (owner, 2026-10-01).
  assert.equal((html.match(/<details class="evidence"/g) ?? []).length, 0);
  assert.equal((html.match(/class="foundation-link"[^>]*><a href="[^"]*orthodoxy\/#topic-/g) ?? []).length, 15);
  assert.doesNotMatch(html, /<details class="evidence"[^>]* open/);
  assert.doesNotMatch(html, /Основание ответа/);
  assert.equal((html.match(/class="analysis"/g) ?? []).length, 7 * 15);
  const history = readFileSync('dist/timeline/index.html', 'utf8');
  for (const year of ['1879', '1914', '1931']) assert.match(history, new RegExp(`<strong[^>]*>${year}</strong>`));
  assert.ok(history.includes('bible/#scripture-new-world'));
});

test('reading approaches from the pair summary are a Scripture and Tradition card', () => {
  const card = legacyBySlug.get('summary');
  assert.equal(card, legacyBySlug.get('kto-tolkuet-pisanie'));
  assert.match(analysis, new RegExp(`id="${card}"[^>]*>[\\s\\S]*?Учение Церкви[\\s\\S]*?Учение: Свидетели Иеговы[\\s\\S]*?Православный ответ`));
});

test('bibliography and correction catalog live on the reference page', () => {
  assert.doesNotMatch(html, /id="pair-refs"|class="pair-corrections"/);
  const sources = readFileSync('dist/sources/index.html', 'utf8');
  assert.match(sources, /id="pair-refs"/);
  assert.match(sources, /id="pair-corrections"/);
  assert.equal((sources.match(/id="pair-correction-/g) ?? []).length, 14);
});
