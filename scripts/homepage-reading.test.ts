// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import overview from '../src/data/family-overview.json' with { type: 'json' };
import media from '../src/data/media.json' with { type: 'json' };
import { collectProofs } from '../src/lib/sourceCatalog.ts';

test('homepage keeps eight unique comparison actions in doctrinal groups', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const ids = [...html.matchAll(/data-add-compare="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 8);
  assert.equal(new Set(ids).size, 8);
  const trinitarian = html.split('data-doctrine-group="trinitarian"')[1].split('data-doctrine-group="nontrinitarian"')[0];
  assert.match(trinitarian, /data-add-compare="adventism"/);
  assert.doesNotMatch(trinitarian, /data-add-compare="(?:lds|jw)"/);
  assert.doesNotMatch(html, /class="wc"|id="jw-legal-note"|class="site-footer"|Как читать приблизительные доли/);
});

test('source relocation preserves every image credit and new overview proof', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const sources = readFileSync('dist/sources/index.html', 'utf8');
  for (const item of media) {
    assert.ok(sources.includes(`id="media-${item.id}"`));
    assert.ok(sources.includes(item.author));
    assert.ok(sources.includes(item.licenseUrl));
    if (html.includes(`/media/${item.id}.`)) assert.ok(html.includes(`/sources/#media-${item.id}`));
  }
  for (const proof of collectProofs(overview)) {
    assert.ok(sources.includes(proof.url.replaceAll('&', '&amp;')), proof.url);
    assert.ok(proof.excerpt.split(/\s+/).length <= 25);
  }
  assert.match(sources, /world-composition-title/);
  assert.match(sources, /id="world-methodology"/);
  assert.match(sources, /id="legal-context"/);
});
