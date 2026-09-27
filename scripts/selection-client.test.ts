// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import { comparisonSlots } from '../src/lib/comparisonSlots.ts';
let instance = 0;

test('browser state migrates legacy storage, survives reload and supports blocked storage', async () => {
  const globals = globalThis as any;
  const keys = ['location', 'history', 'document', 'localStorage'];
  const original = keys.map(key => Object.getOwnPropertyDescriptor(globalThis, key));
  let stored: string | null = 'jw,catholicism,jw,islam';
  let url = new URL('https://example.test/scripture-science/compare/?extra=keep#topic-god');
  const links = [{ href: '', getAttribute: () => '/scripture-science/bible/#canon-title' }];
  const doc = { documentElement: { dataset: {} }, querySelectorAll: () => links };
  const load = async () => {
    globals.location = { get href() { return url.href; }, get search() { return url.search; }, get origin() { return url.origin; } };
    globals.history = { state: null, replaceState: (_state: unknown, _title: string, next: string) => { url = new URL(next); } };
    globals.document = doc;
    return import(`../src/lib/selection-client.ts?case=${++instance}`);
  };
  try {
    globals.localStorage = { getItem: () => stored, setItem: (_key: string, value: string) => { stored = value; } };
    let client = await load();
    assert.deepEqual(client.getSelection(), ['orthodoxy', 'jw', 'catholicism']);
    assert.equal(stored, 'orthodoxy,jw,catholicism');
    assert.equal(url.hash, '#topic-god'); assert.equal(url.searchParams.get('extra'), 'keep');
    assert.ok(links[0].href.includes('t=orthodoxy%2Cjw%2Ccatholicism'));
    url.searchParams.set('slots', 'orthodoxy,,jw');
    client.setSelection(['orthodoxy', 'jw']);
    client = await load();
    assert.deepEqual(comparisonSlots(client.getSelection(), url.searchParams.get('slots')), ['orthodoxy', 'catholicism', 'jw']);
    url = new URL('https://example.test/scripture-science/compare/?t=judaism,islam#question-trinity');
    client = await load();
    assert.deepEqual(client.getSelection(), ['orthodoxy', 'judaism', 'islam']);
    assert.equal(url.hash, '#question-trinity');
    globals.localStorage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
    url = new URL('https://example.test/scripture-science/compare/');
    client = await load();
    assert.deepEqual(client.getSelection(), ['orthodoxy', 'catholicism', 'jw']);
    client.setSelection([]); assert.equal(url.searchParams.get('t'), 'orthodoxy');
    url = new URL('https://example.test/scripture-science/compare/?t=&slots=orthodoxy,,');
    client = await load(); assert.deepEqual(client.getSelection(), ['orthodoxy']);
    url = new URL('https://example.test/scripture-science/compare/?slots=orthodoxy,,islam');
    client = await load(); assert.deepEqual(client.getSelection(), ['orthodoxy', 'islam']);
  } finally {
    keys.forEach((key, index) => original[index] ? Object.defineProperty(globalThis, key, original[index]!) : delete globals[key]);
  }
});
