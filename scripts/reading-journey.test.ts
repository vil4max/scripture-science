// @ts-expect-error - node types are not installed; matches the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { HOME_SECTION_TARGETS } from '../src/lib/homeSections.ts';
const read = (path: string) => readFileSync(`dist/${path ? `${path}/` : ''}index.html`, 'utf8');
test('the homepage is a short introduction with ordered links to every chapter', () => {
  const home = read('');
  const chapters = home.split('class="chapters"')[1].split('</ol>')[0];
  let previous = -1;
  for (const path of ['religions', 'timeline', 'numbers', 'geography', 'differences', 'compare']) {
    const position = chapters.indexOf(`/scripture-science/${path}/`);
    assert.ok(position > previous, path); previous = position;
  }
  assert.doesNotMatch(home, /data-country=|data-add-compare=|data-population-summary=/);
  assert.match(home, /истинности православной веры/);
  assert.match(read('differences'), /Что связывает традиции/);
});
test('published homepage fragments retain real destinations and fallback links', () => {
  const home = read('');
  for (const [id, destination] of Object.entries(HOME_SECTION_TARGETS)) {
    assert.ok(home.includes(`id="${id}"`), id);
    const [path, hash] = destination.split('#');
    const target = read(path.replace(/\/$/, ''));
    assert.ok(target.includes(`id="${hash}"`), destination);
    assert.ok(home.includes(`/scripture-science/${destination}`), destination);
  }
});
test('world summary and Christian breakdown appear once and the map has no duplicate world table', () => {
  const numbers = read('numbers');
  assert.equal((numbers.match(/data-population-summary="world"/g) ?? []).length, 1);
  const world = numbers.split('data-population-summary="world"')[1].split('</table>')[0];
  assert.equal((world.match(/data-group="christians"/g) ?? []).length, 1);
  assert.doesNotMatch(world, /data-group="(?:catholics|protestants|orthodox)"/);
  assert.match(numbers, /100 % — все христиане/);
  const map = read('geography');
  assert.match(map, /value="religions"/); assert.match(map, /value="christian"/);
  assert.doesNotMatch(map, /class="bar-track"/);
  assert.match(map, /numbers\/#world/);
  assert.doesNotMatch(numbers, /Оценки христианских ветвей частично пересекаются/);
});
