// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync, readdirSync } from 'node:fs';
// @ts-expect-error - js-yaml has no separately installed TypeScript declarations.
import * as yaml from 'js-yaml';

// One title and a paragraph number for every excerpt from the Filaret
// catechism (site audit 2026-10-10, T3-2, T3-3, G4-23).
const files = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
  .flatMap((entry: { name: string; isDirectory(): boolean }) => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`])
  .filter((file: string) => /\.(ya?ml|json)$/.test(file) && !/sections-orthodoxy|corrections-orthodoxy/.test(file));
const proofs: { file: string; title: string; excerpt: string }[] = [];
const walk = (node: unknown, file: string) => {
  if (Array.isArray(node)) node.forEach((item) => walk(item, file));
  else if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if (typeof record.url === 'string' && record.url.includes('prostrannyj-pravoslavnyj-katekhizis') && typeof record.excerpt === 'string' && record.excerpt)
      proofs.push({ file, title: String(record.title), excerpt: record.excerpt });
    Object.values(record).forEach((value) => walk(value, file));
  }
};
for (const file of files('src/data')) {
  const text = readFileSync(file, 'utf8');
  walk(file.endsWith('.json') ? JSON.parse(text) : yaml.load(text), file);
}

test('every Filaret catechism excerpt has the canonical title and a paragraph number', () => {
  assert.ok(proofs.length > 1000);
  for (const proof of proofs) {
    if (proof.title.includes('аннотация «Азбуки веры»')) continue;
    assert.match(proof.title, /^Свт\. Филарет Московский\. Пространный катехизис, §§?\d+(?:–\d+)?(?:: .+)?$/, `${proof.file}: ${proof.title}`);
  }
});
