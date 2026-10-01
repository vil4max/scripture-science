// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { assessments, validateAssessments } from '../src/lib/orthodox.ts';
import { legacyPairDestination } from '../src/lib/legacyPairRoute.ts';
import { DEFAULT_SELECTION } from '../src/lib/selection.ts';
import { TOPIC_ORDER } from '../src/lib/rules.ts';

const html: string = readFileSync('dist/compare/index.html', 'utf8');
test('105 separately sourced assessments are complete and malformed coverage fails', () => {
  assert.equal(assessments.length, 105);
  assert.doesNotThrow(() => validateAssessments(assessments));
  assert.throws(() => validateAssessments(assessments.slice(1)), /105/);
  const duplicate = [...assessments]; duplicate[0] = duplicate[1];
  assert.throws(() => validateAssessments(duplicate), /105/);
  const incomplete = structuredClone(assessments); incomplete[0].positionProof = [];
  assert.throws(() => validateAssessments(incomplete), /Incomplete/);
  for (const record of assessments) {
    assert.ok(html.includes(`data-assessment="${record.id}"`), record.id);
    // A curated profile (M33) answers each topic in its analysis cards instead.
    const profile = readFileSync(`dist/traditions/${record.tradition}/index.html`, 'utf8');
    assert.ok(profile.includes(`data-assessment="${record.id}"`) || profile.includes(`data-topic="${record.topic}"`), record.id);
    assert.equal(record.assessmentAuthority, 'editorial-application');
  }
});
test('server output keeps a fixed Orthodox foundation column in every comparison row', () => {
  const blocks = [...html.matchAll(/<article class="block"[^>]+>/g)].map(m => m[0]);
  assert.equal(blocks.length, 120);
  assert.equal(blocks.filter(b => !/\bhidden\b/.test(b)).length, 45);
  for (const block of blocks) {
    const id = block.match(/data-trad="([^"]+)"/)![1];
    assert.equal(/\bhidden\b/.test(block), !DEFAULT_SELECTION.includes(id));
    if (id === 'orthodoxy') {
      assert.match(block, /grid-column:1/);
      assert.match(block, /data-foundation-column/);
    }
  }
  const factCells = [...html.matchAll(/<div class="cell"[^>]+>/g)].map(m => m[0]);
  assert.equal(factCells.filter(cell => /data-trad="orthodoxy"/.test(cell)).length, 5);
  assert.ok(factCells.filter(cell => /data-trad="orthodoxy"/.test(cell)).every(cell => /data-foundation-column/.test(cell)));
  assert.match(html, /class="colcell foundation" data-foundation-column/);
  const selects = [...html.matchAll(/<select[^>]*data-slot="(\d)"/g)].map(m => m[1]);
  assert.deepEqual(selects, ['1', '2']);
  assert.ok(!html.includes('Очистить колонку'));
  assert.ok(!html.includes('<option value="">'));
  assert.match(html, /aria-labelledby="comparison-contents-title"/);
  for (const topic of TOPIC_ORDER) assert.ok(html.includes(`href="#topic-${topic}"`), topic);
  assert.match(html, /<header class="views-heading"/);
  assert.ok(html.indexOf('id="views"') < html.indexOf('data-comparison-slots'));
  assert.ok(!html.includes('Итоговый раздел'));
  assert.ok(!html.includes('class="section-links"'));
  assert.match(html, /data-back-to-top/);
});
test('legacy pair destinations preserve parameters and resolve published anchors', () => {
  const analysis = readFileSync('dist/traditions/jw/index.html', 'utf8');
  const cards = Object.fromEntries([...analysis.matchAll(/<article class="card" id="([^"]+)"[^>]*data-legacy="([^"]+)"/g)]
    .flatMap((match) => match[2].split(' ').map((slug: string) => [slug, match[1]])));
  const routes = new Map<string, string>([
    ['#summary', 'tradition'], ['#bog-troica-ili-odna-lichnost', 'trinity'], ['#structure', 'governing-body'],
    ['#history', 'detailed-chronology'], ['#corrections', 'pair-reference'],
    ['#corr-blood-comparison', 'pair-correction-blood-comparison'], ['#theology', ''], ['#common', ''],
  ]);
  for (const [old, expected] of routes) {
    const result = legacyPairDestination(`https://example.test/scripture-science/pairs/orthodoxy-jw/?extra=keep${old}`, '/scripture-science/', cards);
    const url = new URL(result, 'https://example.test');
    assert.equal(url.hash, expected ? '#' + expected : ''); assert.equal(url.searchParams.get('extra'), 'keep');
    const page = readFileSync(`dist/${url.pathname.replace('/scripture-science/', '')}index.html`, 'utf8');
    if (expected) assert.ok(page.includes(`id="${expected}"`), result);
  }
});

test('unique legacy continuity arguments and attributed quotations remain in the revised edition', () => {
  const analysis = readFileSync('dist/traditions/jw/index.html', 'utf8');
  const card = analysis.slice(analysis.indexOf('id="great-apostasy"'), analysis.indexOf('</article>', analysis.indexOf('id="great-apostasy"')));
  assert.ok(card.includes('Мф 13:30'));
  assert.ok(card.includes('1 Тим 4:14'));
  assert.ok(card.includes('Авел'));
  const sources = readFileSync('dist/sources/index.html', 'utf8');
  assert.ok(sources.includes('id="pair-voices"'));
  assert.ok(sources.includes('Григорий Богослов'));
  assert.ok(sources.includes('Александр Шмеман'));
});

test('the correction register covers every foundation, assessment, question and original pair topic', () => {
  const register = JSON.parse(readFileSync('docs/research/orthodox-edition-register.json', 'utf8'));
  assert.equal(register.foundations.length, 15);
  assert.equal(register.questions.length, 13);
  assert.equal(register.pairs.length, 12);
  assert.deepEqual(register.assessments.map((r: {id:string})=>r.id), assessments.map(r=>r.id));
  for (const r of [...register.foundations, ...register.assessments, ...register.questions, ...register.pairs]) {
    assert.ok(r.before && r.after && r.reason && r.evidence.length, r.id);
    assert.ok(['incorrect-formulation','missing-explanation','change-of-perspective'].includes(r.type));
  }
  const check = JSON.parse(readFileSync('docs/research/orthodox-edition-source-check.json', 'utf8'));
  assert.ok(check.checks.length >= 70);
  assert.ok(check.checks.every((c:{result:string}) => c.result === 'matched'));
});
