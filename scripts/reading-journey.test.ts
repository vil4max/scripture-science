// @ts-expect-error - node types are not installed; matches the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { HOME_SECTION_TARGETS } from '../src/lib/homeSections.ts';
import { differencesDestination } from '../src/lib/legacyRoutes.ts';
import { ROUTE, ROUTE_STEPS } from '../src/lib/route.ts';
const read = (path: string) => readFileSync(`dist/${path ? `${path}/` : ''}index.html`, 'utf8');
const ROUTE_PATHS = ['basics/', 'orthodoxy/', 'bible/', 'religions/', 'timeline/', 'numbers/', 'geography/', 'compare/', 'worship/'];
const inOrder = (html: string, paths: string[]) => {
  let previous = -1;
  for (const path of paths) {
    const position = html.indexOf(`href="/scripture-science/${path}"`, previous + 1);
    assert.ok(position > previous, path); previous = position;
  }
};

// The route has three parts (owner, 2026-10-09: no roadmap on the iPhone,
// the comparison appeared twice).
test('the homepage, the menu and the route bar follow one three-part route', () => {
  assert.deepEqual(ROUTE.map((part) => part.title), ['Основа', 'Религии мира', 'Сравнение']);
  assert.deepEqual(ROUTE_STEPS.map((step) => step.path), ROUTE_PATHS);
  const home = read('');
  inOrder(home.split('class="route"')[1].split('</ol>')[0], ROUTE_PATHS);
  assert.doesNotMatch(home, /data-country=|data-add-compare=|data-population-summary=/);
  assert.match(home, /истинности православной веры/);
  const page = read('timeline');
  const menu = page.split('id="site-menu"')[1].split('</nav>')[0];
  inOrder(menu, [...ROUTE_PATHS, 'traditions/judaism/', 'traditions/jw/', 'reading/', 'terms/', 'sources/']);
  assert.ok(!menu.includes('differences/') && !menu.includes('prayers/'), 'each page appears once');
  const bar = page.split('aria-label="Маршрут чтения"')[1].split('</nav>')[0];
  assert.match(bar, /aria-current="step"[^>]*>(?:(?!<\/a>)[\s\S])*Религии мира/);
  assert.match(bar, /aria-current="page"[^>]*>История/);
  assert.match(read('geography'), /Далее — часть 3, «Сравнение»: Символ веры и различия →/);
  assert.match(read('compare'), /Далее: Богослужение и молитва →/);
  assert.ok(!read('worship').includes('Продолжить чтение'));
  assert.ok(!read('terms').includes('aria-label="Маршрут чтения"'));
});

test('the retired «Сходства и различия» address forwards to the comparison', () => {
  const base = '/scripture-science/';
  assert.equal(differencesDestination('https://example.test/scripture-science/differences/?t=orthodoxy,islam#god', base), '/scripture-science/compare/?t=orthodoxy,islam#topic-god');
  assert.equal(differencesDestination('https://example.test/scripture-science/differences/#connections', base), '/scripture-science/religions/#traditions');
  assert.equal(differencesDestination('https://example.test/scripture-science/differences/', base), '/scripture-science/compare/');
  assert.match(read('differences'), /id="moved" href="\/scripture-science\/compare\/"/);
  for (const topic of ['authority', 'god', 'salvation', 'organisation']) assert.ok(read('compare').includes(`id="topic-${topic}"`), topic);
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
