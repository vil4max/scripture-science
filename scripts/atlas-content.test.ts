// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
const read = (name: string) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'));
test('new history and introductory claims retain bounded evidence and unique anchors', () => {
  for (const name of ['history-overview','other-traditions','biblical-timeline']) {
    const rows = read(name);
    assert.equal(new Set(rows.map((r: {id: string}) => r.id)).size, rows.length);
    for (const row of rows) {
      assert.ok(row.proof.length, row.id);
      for (const p of row.proof) {
        assert.ok(/^https:\/\//.test(p.url), row.id);
        assert.ok(['reference','official'].includes(p.tier), row.id);
        assert.ok(p.title && p.excerpt && /^\d{4}-\d{2}-\d{2}$/.test(p.accessed), row.id);
        assert.ok(p.excerpt.trim().split(/\s+/).length <= 25, row.id);
      }
    }
  }
});
test('every media asset has a caption, attribution, licence and shipped file', () => {
  const rows = read('media');
  const names = new Set<string>();
  for (const item of rows) {
    assert.ok(item.caption && item.author && item.title && item.source);
    assert.ok(/^https:\/\/creativecommons.org\//.test(item.licenseUrl), item.id);
    assert.ok(item.width > 0 && item.height > 0);
    assert.ok(!names.has(item.file)); names.add(item.file);
    assert.ok(existsSync(new URL(`../public/${item.file}`, import.meta.url)), item.id);
  }
  for (const file of readdirSync(new URL('../public/media/', import.meta.url))) assert.ok(names.has(`media/${file}`), `Uncredited asset: ${file}`);
});
