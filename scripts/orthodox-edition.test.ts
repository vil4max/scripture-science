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
test('server output opens every question with the Orthodox answer, then one chosen tradition', () => {
  const questions = [...html.matchAll(/<section class="question"[^>]*id="topic-([^"]+)"[\s\S]*?<\/section>/g)];
  assert.deepEqual(questions.map(m => m[1]), [...TOPIC_ORDER]);
  for (const [question] of questions) {
    const first = question.match(/<div class="side [^"]+"[^>]*>/)![0];
    assert.match(first, /data-trad="orthodoxy"/);
    assert.match(first, /data-foundation-column/);
    const pairs = [...question.matchAll(/<div class="pair"[^>]*>[\s\S]*?<\/details>\s*<\/div>\s*<\/div>/g)].map(m => m[0]);
    assert.equal(pairs.length, 7);
    const visible = pairs.filter(pair => !/^<div class="pair"[^>]*\bhidden\b/.test(pair));
    assert.deepEqual(visible.map(pair => pair.match(/data-trad="([^"]+)"/)![1]), [DEFAULT_SELECTION[1]]);
    for (const pair of pairs) {
      // Three blocks: Orthodox teaching (above), the tradition's teaching, then the difference and Orthodox answer.
      const verdict = pair.indexOf('class="side verdict"');
      assert.ok(pair.indexOf('class="side tradition"') < verdict);
      const fold = pair.indexOf('<details class="more"');
      assert.ok(verdict < pair.indexOf('class="difference"') && pair.indexOf('class="response"') < fold, 'difference and answer are visible before the fold');
    }
    assert.equal((question.match(/data-pick-row=/g) ?? []).length, 7, 'one line per tradition in «Этот вопрос у всех»');
  }
  assert.equal((html.match(/data-pick="/g) ?? []).length, 7);
  for (const topic of TOPIC_ORDER) assert.ok(html.includes(`href="#topic-${topic}"`), topic);
  assert.ok(!html.includes('data-comparison-slots') && !html.includes('data-slot='));
  assert.ok(html.indexOf('id="views"') < html.indexOf('data-question-compare'));
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
