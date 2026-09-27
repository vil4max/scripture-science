// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import guide from '../src/data/bible-guide.json' with { type: 'json' };
import { TRADITION_IDS } from '../src/lib/rules.ts';

test('each tradition has one explanation attached to an existing Scripture event', () => {
  const events = new Set(guide.timeline.map((event) => event.id));
  const traditions = guide.traditionNotes.map((note) => note.tradition);
  assert.deepEqual([...traditions].sort(), [...TRADITION_IDS].sort());
  for (const note of guide.traditionNotes) {
    assert.ok(events.has(note.event), `${note.tradition}: missing event ${note.event}`);
    assert.ok(note.text.trim());
  }
});

test('Bible guide evidence stays complete and within the excerpt limit', () => {
  for (const [group, proofs] of Object.entries(guide.proofs)) {
    assert.ok(proofs.length > 0, `${group} has evidence`);
    for (const proof of proofs) {
      assert.match(proof.url, /^https:\/\//);
      assert.match(proof.accessed, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(['official', 'reference', 'news'].includes(proof.tier));
      assert.ok(proof.excerpt.trim().split(/\s+/).length <= 25, `${group}: excerpt is at most 25 words`);
    }
  }
});

test('Scripture chronology has unique anchors and resolves every evidence reference', () => {
  const ids = guide.timeline.map((event) => event.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const event of guide.timeline) {
    assert.ok(event.proofKeys.length > 0, `${event.id} has evidence`);
    for (const key of event.proofKeys) {
      assert.ok(key in guide.proofs, `${event.id}: missing evidence group ${key}`);
    }
  }
});


test('Scripture narrative links canon, Latin transmission and Reformation before modern editions', () => {
  const ids = guide.timeline.map((event) => event.id);
  const sequence = ['new-testament', 'sinaiticus', 'canon', 'vulgate', 'printing', 'erasmus', 'reformation-translations', 'book-of-mormon', 'synodal', 'new-world', 'modern-russian'];
  for (let i = 1; i < sequence.length; i++) assert.ok(ids.indexOf(sequence[i - 1]) < ids.indexOf(sequence[i]));
});
