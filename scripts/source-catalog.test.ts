// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { collectProofs } from '../src/lib/sourceCatalog.ts';
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
