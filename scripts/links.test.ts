// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:fs has no types without @types/node
import { readdirSync, readFileSync } from 'node:fs';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
// @ts-expect-error - node:url has no types without @types/node
import { fileURLToPath } from 'node:url';

// BASE_URL has no trailing slash, so gluing a path to it drops the slash
// ("/religion-mapsources/"). Internal links go through src/lib/paths.ts.
test('no internal link is glued directly to BASE_URL', () => {
  const root = fileURLToPath(new URL('../src/', import.meta.url));
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}${entry.name}`;
      if (entry.isDirectory()) walk(`${path}/`);
      else if (/\.(astro|ts)$/.test(entry.name)) files.push(path);
    }
  };
  walk(root);
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /BASE_URL\}[^`]/, `${file} glues a path to BASE_URL`);
    assert.doesNotMatch(source, /\$\{BASE\}/, `${file} glues a path to BASE`);
  }
});
