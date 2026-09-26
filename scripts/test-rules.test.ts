// @types/node is not installed (no new npm dependencies - see AGENTS.md /
// docs/tasks/site-m1-migration.md), so `astro check` cannot resolve these
// two Node built-ins' types; Node itself resolves them fine at run time.
// @ts-expect-error - node:assert/strict has no types without @types/node
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import {
  checkTopic,
  orderByAge,
  sinceLines,
  positionSummaryText,
} from '../src/lib/rules.ts';

test('orderByAge sorts older traditions first', () => {
  const traditions = [
    { id: 'jw', since: { year: 1870 } },
    { id: 'orthodoxy', since: { year: 33 } },
  ];
  assert.deepEqual(
    orderByAge(traditions).map((t) => t.id),
    ['orthodoxy', 'jw'],
  );
});

test('orderByAge is a stable sort for equal years', () => {
  const traditions = [
    { id: 'a', since: { year: 1000 } },
    { id: 'b', since: { year: 1000 } },
    { id: 'c', since: { year: 500 } },
  ];
  assert.deepEqual(
    orderByAge(traditions).map((t) => t.id),
    ['c', 'a', 'b'],
  );
});

test('orderByAge does not mutate its input', () => {
  const traditions = [{ id: 'jw', since: { year: 1870 } }, { id: 'orthodoxy', since: { year: 33 } }];
  const original = traditions.map((t) => t.id);
  orderByAge(traditions);
  assert.deepEqual(traditions.map((t) => t.id), original);
});

test('checkTopic passes when every required tradition has a position', () => {
  const topic = {
    title: 'Бог: Троица или одна Личность',
    positions: { orthodoxy: {}, jw: {} },
  };
  assert.doesNotThrow(() => checkTopic(topic, ['orthodoxy', 'jw']));
});

test('checkTopic rejects a topic missing the jw side', () => {
  const topic = {
    title: 'Бог: Троица или одна Личность',
    positions: { orthodoxy: {} },
  };
  assert.throws(() => checkTopic(topic, ['orthodoxy', 'jw']), /jw/);
});

test('checkTopic rejects a topic that names an unknown tradition', () => {
  const topic = {
    title: 'Бог: Троица или одна Личность',
    positions: { orthodoxy: {}, jw: {}, catholicism: {} },
  };
  assert.throws(() => checkTopic(topic, ['orthodoxy', 'jw']), /catholicism/);
});

// Orthodoxy and Catholicism tie at 33, split from each other (not one from
// the other) at 1054; the Eastern side comes first on that tie (owner,
// 2026-09-26: «восточная перед западной»), not the Russian name, which would
// put Catholicism first purely alphabetically (src/lib/rules.ts
// EAST_BEFORE_WEST_TIE).
test('the two churches of the undivided Church come before Islam, tied at their shared start, Orthodoxy first', () => {
  // The committed matrix since.year values (src/data/matrix/*.yaml).
  const traditions = [
    { id: 'islam', since: { year: 622 }, name: 'Ислам' },
    { id: 'orthodoxy', since: { year: 33 }, name: 'Православие' },
    { id: 'judaism', since: { year: -1312 }, name: 'Иудаизм' },
    { id: 'protestantism', since: { year: 1530 }, name: 'Протестантизм' },
    { id: 'catholicism', since: { year: 33 }, name: 'Католичество' },
  ];
  assert.deepEqual(
    orderByAge(traditions).map((t) => t.id),
    ['judaism', 'orthodoxy', 'catholicism', 'islam', 'protestantism'],
  );
});

test('positionSummaryText hides a todo position\'s internal research note', () => {
  assert.equal(
    positionSummaryText({ status: 'todo', summary: 'Требует проверки: см. поле todo.' }),
    null,
  );
});

test('positionSummaryText returns a verified position\'s summary unchanged', () => {
  assert.equal(
    positionSummaryText({ status: 'verified', summary: 'Бог — Троица.' }),
    'Бог — Троица.',
  );
});

test('sinceLines shows each dated step on its own line, Pentecost first for the two churches', () => {
  assert.deepEqual(sinceLines('ок. 33 г. · Пятидесятница; 1054 г. · разделение с Западной (Католической) Церковью'), [
    'ок. 33 г. · Пятидесятница',
    '1054 г. · разделение с Западной (Католической) Церковью',
  ]);
  assert.deepEqual(sinceLines('622 г. н.э. · Хиджра'), ['622 г. н.э. · Хиджра']);
});
