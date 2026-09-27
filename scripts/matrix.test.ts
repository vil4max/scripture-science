// @types/node is not installed (no new npm dependencies - see AGENTS.md /
// docs/tasks/site-m1-migration.md), so `astro check` cannot resolve these
// two Node built-ins' types; Node itself resolves them fine at run time.
// @ts-expect-error - node:assert/strict has no types without @types/node
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { TOPIC_ORDER, TOPIC_GROUPS, TRADITION_IDS, checkMatrixTopicOrder, orderByAge } from '../src/lib/rules.ts';

test('TRADITION_IDS lists all eight traditions', () => {
  assert.equal(TRADITION_IDS.length, 8);
  assert.deepEqual(
    [...TRADITION_IDS].sort(),
    [
      'adventism',
      'catholicism',
      'islam',
      'judaism',
      'jw',
      'lds',
      'orthodoxy',
      'protestantism',
    ].sort(),
  );
});

test('TOPIC_ORDER lists all fifteen topics', () => {
  assert.equal(TOPIC_ORDER.length, 15);
});

test('checkMatrixTopicOrder accepts the fifteen topics in order', () => {
  assert.doesNotThrow(() => checkMatrixTopicOrder([...TOPIC_ORDER]));
});

test('checkMatrixTopicOrder rejects a missing topic', () => {
  const missingLast = TOPIC_ORDER.slice(0, 14);
  assert.throws(() => checkMatrixTopicOrder(missingLast), /has 14 topics, expected all 15/);
});

test('checkMatrixTopicOrder rejects a reordered topic', () => {
  const swapped = [...TOPIC_ORDER];
  [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  assert.throws(() => checkMatrixTopicOrder(swapped), /name-of-god.*expected "god"/);
});

test('checkMatrixTopicOrder rejects a duplicated topic in place of a missing one', () => {
  const duplicated = [...TOPIC_ORDER.slice(0, 13), TOPIC_ORDER[0]];
  assert.throws(() => checkMatrixTopicOrder(duplicated));
});

// docs/tasks/site-m2-main-page.md W1: "orderByAge reads since.year from the
// matrix entry; ties break by Russian name (localeCompare('ru'))." This
// fixture stands in for all eight matrix entries once they exist, including
// a same-year tie between two of them.
test('orderByAge orders all eight traditions by age, breaking a tie by Russian name', () => {
  const traditions = [
    { id: 'jw', since: { year: 1870 }, name: 'Свидетели Иеговы' },
    { id: 'protestantism', since: { year: 1517 }, name: 'Протестантизм' },
    { id: 'lds', since: { year: 1830 }, name: 'Святые последних дней' },
    // Deliberate tie: both founded/organised in 1863, to exercise the
    // Russian-name tie-break rather than only the year comparison.
    { id: 'adventism', since: { year: 1863 }, name: 'Адвентисты седьмого дня' },
    { id: 'other-1863', since: { year: 1863 }, name: 'Ассоциация года 1863' },
    { id: 'islam', since: { year: 610 }, name: 'Ислам' },
    { id: 'catholicism', since: { year: 1054 }, name: 'Католичество' },
    { id: 'orthodoxy', since: { year: 33 }, name: 'Православие' },
    { id: 'judaism', since: { year: -1300 }, name: 'Иудаизм' },
  ];

  const ordered = orderByAge(traditions).map((t) => t.id);

  assert.deepEqual(ordered, [
    'judaism',
    'orthodoxy',
    'islam',
    'catholicism',
    'protestantism',
    'lds',
    // 'Адвентисты...' sorts before 'Ассоциация...' under localeCompare('ru')
    // (д precedes с in the Russian alphabet), despite the identical year.
    'adventism',
    'other-1863',
    'jw',
  ]);
});

// The real matrix data ties Orthodoxy and Catholicism at 33 (docs/DECISIONS.md
// "Order traditions by the start of their line"); the Russian-name tie-break
// alone would put Catholicism first purely alphabetically, reading as a
// seniority claim the data does not support. Orthodoxy comes first instead
// (owner, 2026-09-26: «восточная перед западной»).
test('orderByAge puts Orthodoxy before Catholicism on their real tie at 33', () => {
  const traditions = [
    { id: 'catholicism', since: { year: 33 }, name: 'Католичество' },
    { id: 'orthodoxy', since: { year: 33 }, name: 'Православие' },
  ];

  assert.deepEqual(
    orderByAge(traditions).map((t) => t.id),
    ['orthodoxy', 'catholicism'],
  );
});

test('orderByAge does not mutate its input', () => {
  const traditions = [
    { id: 'jw', since: { year: 1870 }, name: 'Свидетели Иеговы' },
    { id: 'orthodoxy', since: { year: 33 }, name: 'Православие' },
  ];
  const original = traditions.map((t) => t.id);
  orderByAge(traditions);
  assert.deepEqual(traditions.map((t) => t.id), original);
});


test('reading groups cover every comparison topic once in canonical order', () => {
  assert.deepEqual(TOPIC_GROUPS.flatMap((group) => group.topics), [...TOPIC_ORDER]);
  assert.equal(new Set(TOPIC_GROUPS.map((group) => group.id)).size, 3);
});
