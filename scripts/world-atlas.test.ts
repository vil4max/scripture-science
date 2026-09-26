// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { largestGroup, countryShare, WORLD_COLORS } from '../src/lib/worldAtlas.ts';
const data = JSON.parse(readFileSync(new URL('../src/data/world-countries.json', import.meta.url), 'utf8'));
const shapes = JSON.parse(readFileSync(new URL('../src/data/world-shapes.json', import.meta.url), 'utf8'));
test('all 201 source countries preserve complete 2020 population partitions', () => {
  assert.equal(data.year, 2020);
  assert.equal(data.countries.length, 201);
  const ids = new Set();
  for (const country of data.countries) {
    assert.ok(!ids.has(country.id)); ids.add(country.id);
    assert.equal(country.counts.length, 7);
    assert.ok(country.counts.every((n: number) => Number.isFinite(n) && n >= 0));
    const difference = country.counts.reduce((a: number,b: number) => a+b, 0)-country.total;
    // Pew's embedded India row differs by seven people; retain the source values.
    assert.ok(Math.abs(difference) <= 4 || (country.id === 'IND' && difference === 7), country.name);
    assert.ok(largestGroup(country.counts, data.groups));
  }
  for (const id of data.groups) assert.ok(WORLD_COLORS[id]);
});
test('country identities and source values survive map joins, including French Guiana', () => {
  const get = (id: string) => data.countries.find((c: {id: string}) => c.id === id);
  assert.equal(get('AFG').total, 39068979);
  assert.equal(get('AFG').counts[1], 39015051);
  assert.equal(get('GUF').sourceName, 'French Guiana');
  assert.equal(get('FRA').sourceName, 'France');
  assert.ok(shapes.find((s: {id: string}) => s.id === 'GUF'));
  assert.equal(largestGroup(get('IND').counts, data.groups), 'hindus');
  assert.equal(largestGroup(get('CHN').counts, data.groups), 'unaffiliated');
  assert.equal(new Set(shapes.map((s: {id: string}) => s.id)).size, shapes.length);
});
test('ties, empty populations and small shares are not presented as certain majorities', () => {
  assert.equal(largestGroup([5,5], ['a','b']), null);
  assert.equal(largestGroup([0,0], ['a','b']), null);
  assert.equal(largestGroup([1], ['a','b']), null);
  assert.equal(countryShare(1,10000), '<0,1 %');
  assert.equal(countryShare(0,10000), '0,0 %');
});
