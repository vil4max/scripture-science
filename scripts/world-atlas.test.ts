// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
import { largestGroup, formatShare, WORLD_COLORS, atlasView, atlasLegend, worldRows } from '../src/lib/worldAtlas.ts';
import data from '../src/data/world-countries.json' with { type: 'json' };
import christian from '../src/data/world-christian-traditions.json' with { type: 'json' };
import composition from '../src/data/world-composition.json' with { type: 'json' };
const shapes = JSON.parse(readFileSync(new URL('../src/data/world-shapes.json', import.meta.url), 'utf8'));
test('all 201 source countries preserve complete 2020 population partitions', () => {
  assert.equal(data.year, 2020);
  assert.equal(data.countries.length, 201);
  const ids = new Set();
  for (const country of data.countries) {
    assert.ok(!ids.has(country.id)); ids.add(country.id);
    assert.equal(country.counts.length, 7);
    assert.ok(country.counts.every((n) => Number.isFinite(n) && n >= 0));
    const difference = country.counts.reduce((a,b) => a+b, 0)-country.total;
    assert.ok(Math.abs(difference) <= 4 || (country.id === 'IND' && difference === 7), country.name);
    assert.ok(largestGroup(country.counts, data.groups));
  }
  for (const id of data.groups) assert.ok(WORLD_COLORS[id]);
});
test('country identities and source values survive map joins, including French Guiana', () => {
  const get = (id: string) => data.countries.find((c) => c.id === id)!;
  assert.equal(get('AFG').total, 39068979);
  assert.equal(get('AFG').counts[1], 39015051);
  assert.equal(get('GUF').sourceName, 'French Guiana');
  assert.equal(get('FRA').sourceName, 'France');
  assert.ok(shapes.find((s: {id: string}) => s.id === 'GUF'));
  assert.equal(atlasView('religions', 'IND').largest, 'hindus');
  assert.equal(atlasView('religions', 'CHN').largest, 'unaffiliated');
  assert.equal(new Set(shapes.map((s: {id: string}) => s.id)).size, shapes.length);
});
test('ties, missing data, empty populations and small shares are not false majorities', () => {
  assert.equal(largestGroup([5,5], ['a','b']), null);
  assert.equal(largestGroup([0,0], ['a','b']), null);
  assert.equal(largestGroup([1], ['a','b']), null);
  assert.equal(formatShare(0.01), '<0,1 %');
  assert.equal(formatShare(0), '0,0 %');
  assert.equal(formatShare(NaN), '—');
  assert.equal(atlasView('christian', 'missing').largest, null);
  assert.equal(atlasView('christian', 'CUW').rows.length, 0);
  assert.equal(atlasView('religions', 'CUW').rows.length, 7);
});
test('world and country religion views count Christianity once without branch duplication', () => {
  assert.equal(worldRows.length, 7);
  assert.deepEqual(worldRows, composition.map(({ id, label, share }) => ({ id, label, share })));
  assert.equal(atlasView('religions').largest, 'christians');
  assert.equal(atlasView('religions').rows.find((row) => row.id === 'christians')!.share, 28.8);
  for (const country of data.countries) {
    const view = atlasView('religions', country.id);
    assert.equal(view.year, 2020); assert.equal(view.denominator, 'population');
    assert.equal(view.rows.length, 7);
    assert.equal(view.rows.filter((row) => row.id === 'christians').length, 1);
    for (const row of view.rows) {
      assert.equal(row.share, country.counts[data.groups.indexOf(row.id)] / country.total * 100);
      assert.ok(atlasLegend('religions').some((entry) => entry.id === row.id));
    }
  }
});
test('Christian views use original 2010 Christian denominators, independently of 2020 counts', () => {
  for (const country of data.countries.filter((entry) => entry.id !== 'CUW')) {
    const view = atlasView('christian', country.id);
    const original = (christian.countries as Record<string, number[]>)[country.id];
    const total = original.reduce((sum, n) => sum + n, 0);
    assert.equal(view.year, 2010); assert.equal(view.denominator, 'christians');
    assert.equal(view.rows.length, 4);
    assert.ok(Math.abs(view.rows.reduce((sum, row) => sum + row.share, 0) - 100) < 1e-10);
    for (const row of view.rows) assert.equal(row.share, original[christian.traditions.indexOf(row.id)] / total * 100);
  }
  assert.equal(atlasView('christian', 'RUS').largest, 'orthodox');
  assert.equal(atlasView('christian', 'BRA').largest, 'catholics');
  assert.equal(atlasView('christian', 'USA').largest, 'protestants');
  assert.equal(atlasView('religions', 'SAU').largest, 'muslims');
  assert.notEqual(atlasView('christian', 'SAU').largest, 'muslims');
  assert.match(atlasView('christian', 'ARM').rows.find((row) => row.id === 'orthodox')!.label, /древневосточные/);
  for (const row of atlasView('christian').rows) assert.equal(row.share, composition[0].breakdown!.find((entry) => entry.id === row.id)!.share);
});
