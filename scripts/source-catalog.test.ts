// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { buildSourceCatalog, collectAnalysisSources, collectProofs, filterSourceCatalog, matchesCatalogUsage, sourceAnchor, proofKey, uniqueProofs, type CatalogProof } from '../src/lib/sourceCatalog.ts';
// @ts-expect-error - node types are not installed.
import { readFileSync, readdirSync } from 'node:fs';
// @ts-expect-error - the existing YAML parser has no separately installed types.
import * as yaml from 'js-yaml';

test('every YAML data file parses independently of the Astro content cache', () => {
  function check(directory: URL) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) check(url);
      else if (entry.name.endsWith('.yaml')) assert.doesNotThrow(() => yaml.load(readFileSync(url, 'utf8')), url.pathname);
    }
  }
  check(new URL('../src/data/', import.meta.url));
});

test('the catalogue includes nested unity and event evidence without treating naked links as verified', () => {
  const claim = { url: 'https://example.test/claim', title: 'Claim', tier: 'official', excerpt: 'Claim excerpt.', accessed: '2026-09-26' };
  const unity = { ...claim, url: 'https://example.test/unity', title: 'Unity' };
  const event = { ...claim, url: 'https://example.test/event', tier: 'reference' };
  const result = collectProofs({
    positions: [{ proof: [claim], unity: { proof: [unity] }, quote: { url: claim.url, source: 'Claim' } }],
    nodes: [{ event: { proof: [event] } }],
    missing: null,
  });
  assert.deepEqual(result, [claim, unity, event]);
});

const sample: CatalogProof = {
  url: 'https://example.test/teaching', title: 'Teaching §1', tier: 'official',
  excerpt: 'First passage.', accessed: '2026-10-01',
};

test('only identical evidence tuples merge, regardless of object property order', () => {
  const reordered = { accessed: sample.accessed, excerpt: sample.excerpt, tier: sample.tier, title: sample.title, url: sample.url };
  const distinct: CatalogProof[] = [
    { ...sample, url: `${sample.url}#section` },
    { ...sample, title: 'Teaching §2' },
    { ...sample, tier: 'reference' },
    { ...sample, excerpt: 'Second passage.' },
    { ...sample, accessed: '2026-09-30' },
  ];
  assert.deepEqual(uniqueProofs([sample, reordered, ...distinct]), [sample, ...distinct]);
});

test('catalogue grouping retains the exact claim usages of each passage', () => {
  const church = { traditionId: 'jw', topic: 'god', section: 'Analysis', cardId: 'trinity', cardTitle: 'Trinity', role: 'church' as const };
  const answer = { ...church, role: 'answer' as const };
  const other = { ...church, traditionId: 'catholicism', cardId: 'filioque', topic: 'spirit' };
  const different = { ...sample, excerpt: 'Different passage.' };
  const entries = buildSourceCatalog([
    { proof: sample, usage: church }, { proof: sample, usage: { ...church } },
    { proof: sample, usage: answer }, { proof: different, usage: other },
  ]);
  assert.equal(entries.length, 1);
  assert.deepEqual(entries[0].references, [
    { proof: sample, usages: [church, answer] }, { proof: different, usages: [other] },
  ]);
  const selected = filterSourceCatalog(entries, (usage) => usage.traditionId === 'jw' && usage.role === 'answer');
  assert.deepEqual(selected[0].references, [{ proof: sample, usages: [answer] }]);
  assert.equal(entries[0].references.length, 2);
});

test('source filters must match the same usage, including its query context', () => {
  const first = { traditionId: 'jw', topic: 'god', role: 'church' as const, section: 'Analysis', cardTitle: 'Троица' };
  const second = { traditionId: 'islam', topic: 'images', role: 'tradition' as const, section: 'Analysis', cardTitle: 'Иконы' };
  const filter = { query: '', tradition: 'jw', topic: 'images', role: 'tradition' };
  assert.ok(![first, second].some((usage) => matchesCatalogUsage(usage, filter, 'Same source')));
  assert.ok(matchesCatalogUsage(first, { query: 'Троица', tradition: 'jw', topic: 'god', role: 'church' }, 'Same source'));
  assert.ok(!matchesCatalogUsage(first, { query: 'Иконы', tradition: 'jw', topic: '', role: '' }, 'Same source'));
  assert.equal(sourceAnchor(sample.url), sourceAnchor(sample.url));
  assert.notEqual(sourceAnchor(sample.url), sourceAnchor(`${sample.url}#other`));
});

test('each source has one canonical disclosure and every compact evidence link resolves', () => {
  const html: string = readFileSync('dist/sources/index.html', 'utf8');
  const ids = [...html.matchAll(/id="(source-[a-f0-9]+)"/g)].map((match) => match[1]);
  assert.ok(ids.length > 870);
  assert.equal(new Set(ids).size, ids.length);
  const targets = [...html.matchAll(/href="#(source-[a-f0-9]+)"/g)].map((match) => match[1]);
  assert.ok(targets.length > 0);
  for (const id of targets) assert.ok(ids.includes(id));
});

const analyses: Parameters<typeof collectAnalysisSources>[0] = readdirSync('src/data/analyses')
  .filter((name: string) => name.endsWith('.yaml'))
  .map((name: string) => yaml.load(readFileSync(`src/data/analyses/${name}`, 'utf8'), { schema: yaml.JSON_SCHEMA }));

test('every analysis proof keeps its tradition, topic, card and role', () => {
  assert.equal(analyses.length, 7);
  const records = collectAnalysisSources(analyses, new Map(analyses.map((analysis) => [analysis.tradition, analysis.tradition])));
  const entries = buildSourceCatalog(records);
  for (const analysis of analyses) for (const group of analysis.groups) for (const card of group.cards) {
    for (const role of ['church', 'tradition', 'answer'] as const) for (const proof of card[role].proof) {
      const reference = entries.find((entry) => entry.url === proof.url)?.references.find((item) => proofKey(item.proof) === proofKey(proof));
      assert.ok(reference?.usages.some((usage) => usage.traditionId === analysis.tradition
        && usage.traditionName === analysis.tradition && usage.topic === card.topic
        && usage.cardId === card.id && usage.cardTitle === card.title && usage.role === role), `${card.id}/${role}/${proof.url}`);
    }
  }
  const furtherOnly = 'https://example.test/further-reading-only';
  const withReading = [{ ...analyses[0], groups: [{ cards: [{ ...analyses[0].groups[0].cards[0], more: [{ url: furtherOnly, title: 'Further reading' }] }] }] }];
  assert.ok(!collectAnalysisSources(withReading, new Map()).some(({ proof }) => proof.url === furtherOnly));
});

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

test('the built source catalogue includes every analysis URL and links back to each card', () => {
  const html: string = readFileSync('dist/sources/index.html', 'utf8');
  for (const { proof, usage } of collectAnalysisSources(analyses, new Map())) {
    assert.ok(html.includes(`href="${escapeHtml(proof.url)}"`), proof.url);
    assert.ok(html.includes(`href="/scripture-science/traditions/${usage.traditionId}/#${usage.cardId}"`), usage.cardId);
  }
  assert.match(html, /data-analysis-coverage/);
  assert.match(html, /Темы сравнения: по традиции/);
  assert.match(html, /Дополнительное чтение к подробным разборам/);
  assert.ok(html.includes('This interactive table shows the religious makeup of 201 countries and territories.'));
});

test('each rendered card retains all distinct evidence and omits exact repeats', () => {
  for (const analysis of analyses) {
    const html: string = readFileSync(`dist/traditions/${analysis.tradition}/index.html`, 'utf8');
    for (const group of analysis.groups) for (const card of group.cards) {
      const article = html.match(new RegExp(`<article class="card" id="${card.id}"[\\s\\S]*?</article>`))?.[0];
      if (!article) throw new Error(`Missing card: ${card.id}`);
      const disclosure = article.match(/<details class="proof"[\s\S]*?<\/details>/)?.[0] ?? '';
      const expected = uniqueProofs([...card.church.proof, ...card.tradition.proof, ...card.answer.proof]);
      assert.equal((disclosure.match(/<li\b/g) ?? []).length, expected.length, card.id);
      for (const proof of expected) assert.ok(disclosure.includes(escapeHtml(proof.excerpt)), `${card.id}: ${proof.excerpt}`);
    }
  }
});

test('analysis coverage preserves pending cards and further reading stays separately labelled', () => {
  const html: string = readFileSync('dist/sources/index.html', 'utf8');
  const further = html.match(/<details class="source-topic" id="further-reading"[\s\S]*?<\/details>/)?.[0] ?? '';
  for (const analysis of analyses) {
    const data = yaml.load(readFileSync(`src/data/analyses/${analysis.tradition}.yaml`, 'utf8'));
    const cards = data.groups.flatMap((group: { cards: { status: string; more?: { url: string }[] }[] }) => group.cards);
    const todo = cards.filter((card: { status: string }) => card.status === 'todo').length;
    const row = html.match(new RegExp(`<tr data-tradition="${analysis.tradition}"[\\s\\S]*?</tr>`))?.[0] ?? '';
    assert.ok(row.includes(`${cards.length - todo} / ${cards.length}`), analysis.tradition);
    assert.ok(row.includes(`${todo} / ${cards.length}`), analysis.tradition);
    for (const card of cards) for (const item of card.more ?? []) {
      assert.ok(further.includes(`href="${escapeHtml(item.url)}"`), item.url);
    }
  }
});
