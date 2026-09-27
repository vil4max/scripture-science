// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { checkDisputeSides, disputeView } from '../src/lib/disputes.ts';

const monasticism = { challengers: ['islam', 'protestantism'], answerers: ['orthodoxy', 'catholicism'] };

test('checkDisputeSides accepts distinct contesting and answering traditions', () => {
  assert.doesNotThrow(() => checkDisputeSides(monasticism));
});

test('checkDisputeSides rejects an empty side and a tradition named twice', () => {
  assert.throws(() => checkDisputeSides({ challengers: [], answerers: ['orthodoxy'] }), /contesting/);
  assert.throws(() => checkDisputeSides({ challengers: ['islam'], answerers: [] }), /answering/);
  assert.throws(() => checkDisputeSides({ challengers: ['islam'], answerers: ['islam'] }), /"islam"/);
  assert.throws(() => checkDisputeSides({ challengers: ['jw', 'jw'], answerers: ['orthodoxy'] }), /"jw"/);
});

test('disputeView shows every dispute in full when nothing is chosen', () => {
  assert.deepEqual(disputeView(monasticism, []), {
    visible: true,
    shown: ['islam', 'protestantism', 'orthodoxy', 'catholicism'],
  });
});

test('disputeView shows a dispute in full to one chosen tradition that takes part in it, and hides it otherwise', () => {
  assert.deepEqual(disputeView(monasticism, ['islam']).shown, ['islam', 'protestantism', 'orthodoxy', 'catholicism']);
  assert.deepEqual(disputeView(monasticism, ['jw']), { visible: false, shown: [] });
});

test('disputeView needs a chosen contesting and a chosen answering tradition among two or three', () => {
  assert.deepEqual(disputeView(monasticism, ['orthodoxy', 'islam']), { visible: true, shown: ['islam', 'orthodoxy'] });
  assert.deepEqual(disputeView(monasticism, ['orthodoxy', 'catholicism']), { visible: false, shown: [] });
  assert.deepEqual(disputeView(monasticism, ['islam', 'protestantism', 'jw']), { visible: false, shown: [] });
  assert.deepEqual(disputeView(monasticism, ['jw', 'catholicism', 'protestantism']), {
    visible: true,
    shown: ['protestantism', 'catholicism'],
  });
});


test('comparison includes selected topic positions without inventing dispute roles', async () => {
  const { comparisonQuestionView } = await import('../src/lib/disputes.ts');
  const sides = { challengers: ['jw'], answerers: ['orthodoxy', 'catholicism'] };
  assert.deepEqual(comparisonQuestionView(sides, ['adventism', 'jw']), { visible: true, shown: ['adventism', 'jw'] });
  assert.deepEqual(comparisonQuestionView(sides, ['islam', 'judaism']), { visible: false, shown: [] });
  assert.deepEqual(comparisonQuestionView(sides, ['jw']), disputeView(sides, ['jw']));
});
