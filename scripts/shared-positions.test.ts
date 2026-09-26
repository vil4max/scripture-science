// @ts-expect-error - node types are not installed.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { readFileSync } from 'node:fs';
// @ts-expect-error - the project's YAML parser has no installed types.
import * as yaml from 'js-yaml';
import shared from '../src/data/shared-positions.json' with { type: 'json' };
import { TOPIC_ORDER, TRADITION_IDS } from '../src/lib/rules.ts';

test('every reciprocal comparison cites actual evidence for every member', () => {
  assert.equal(new Set(shared.map((row) => row.id)).size, shared.length);
  for (const row of shared) {
    assert.ok(TOPIC_ORDER.some((topic) => topic === row.topic));
    assert.ok(row.label && row.note);
    assert.ok(row.members.length >= 2);
    assert.equal(new Set(row.members.map((m) => m.tradition)).size, row.members.length);
    for (const member of row.members) {
      assert.ok(TRADITION_IDS.some((id) => id === member.tradition));
      const data = yaml.load(readFileSync(new URL(`../src/data/matrix/${member.tradition}.yaml`, import.meta.url), 'utf8'));
      const position = data.positions.find((p: { topic: string }) => p.topic === member.evidenceTopic);
      assert.equal(position.status, 'verified');
      assert.ok(member.excerpts.length);
      for (const excerpt of member.excerpts) assert.ok(position.proof.some((p: { excerpt: string }) => p.excerpt === excerpt), `${row.id}/${member.tradition}`);
    }
  }
});
