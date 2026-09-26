// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync, readdirSync } from 'node:fs';
import { collectTextSources } from '../src/lib/sourceCatalog.ts';

test('text catalog retains quote and translation URLs without proof metadata', () => {
  assert.deepEqual(collectTextSources({
    quote: { source: 'A document', url: 'https://example.org/document', text: 'Quote' },
    scripture: { ref: 'John 1:1', url: 'https://example.org/verse', text: 'Verse' },
    translation: { name: 'A translation', url: 'https://example.org/book' },
  }), [
    { title: 'A document', url: 'https://example.org/document' },
    { title: 'John 1:1', url: 'https://example.org/verse' },
    { title: 'A translation', url: 'https://example.org/book' },
  ]);
});

test('built reading pages have no numbered citations or page bibliographies', () => {
  for (const path of readdirSync('dist', { recursive: true }).filter((path: string) => path.endsWith('.html'))) {
    const html = readFileSync(`dist/${path}`, 'utf8');
    assert.doesNotMatch(html, /href="#source-\d+"|class="page-sources"/, String(path));
  }
  const sources = readFileSync('dist/sources/index.html', 'utf8');
  const bible = JSON.parse(readFileSync('src/data/bible-guide.json', 'utf8'));
  for (const { url } of collectTextSources(bible)) assert.ok(sources.includes(url), url);
  assert.ok(sources.includes('Численность: даты и способы подсчёта'));
});
