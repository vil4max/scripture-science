// @ts-expect-error - node types are not installed; follows the existing harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
import guide from '../src/data/bible-guide.json' with { type: 'json' };

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
