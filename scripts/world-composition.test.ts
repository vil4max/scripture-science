// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import { z } from 'astro/zod';
import worldComposition from '../src/data/world-composition.json' with { type: 'json' };

// docs/tasks/site-m8-world-composition.md "Design": one entry per Pew group,
// each share and count backed by a verbatim excerpt of at most 25 words
// (docs/SOURCES.md "What verified means").
const proofSchema = z.object({
  url: z.url(),
  title: z.string().min(1),
  tier: z.literal('reference'),
  excerpt: z
    .string()
    .min(1)
    .refine((text) => text.trim().split(/\s+/).length <= 25, 'excerpt is longer than 25 words'),
  accessed: z.iso.date(),
});

const entrySchema = z.object({
  id: z.string().regex(/^[a-z]+(-[a-z]+)*$/),
  label: z.string().min(1),
  share: z.number().gt(0).lt(100),
  count: z.string().regex(/^\d+(,\d)? (млн|млрд)$/),
  proof: z.array(proofSchema).min(1),
});

const groupSchema = entrySchema.extend({
  breakdown: z.array(entrySchema).min(2).optional(),
  breakdownYear: z.number().int().min(1900).optional(),
  breakdownShareBasis: z.literal('christians').optional(),
  breakdownNote: z.object({
    text: z.string().min(1),
    proof: z.array(proofSchema).min(1),
  }).optional(),
}).superRefine((group, context) => {
  if (group.breakdown && (!group.breakdownYear || !group.breakdownShareBasis || !group.breakdownNote)) {
    context.addIssue({ code: 'custom', message: 'breakdown requires a year, denominator and sourced note' });
  }
});

const dataSchema = z.array(groupSchema).min(2);

const groups = dataSchema.parse(worldComposition);
const entries = groups.flatMap((group) => [group, ...(group.breakdown ?? [])]);

// Pew writes "2.3 billion" and "28.8%"; the site writes «2,3 млрд» and 28.8.
// Translating back lets the test demand that every published number appears
// in one of its own excerpts, so the data cannot drift from the quoted page.
function pewCount(count: string): string {
  const [number, unit] = count.split(' ');
  return `${number.replace(',', '.')} ${unit === 'млрд' ? 'billion' : 'million'}`;
}

test('the committed world-composition.json validates against the schema', () => {
  assert.doesNotThrow(() => dataSchema.parse(worldComposition));
});

test('group ids are unique', () => {
  const ids = groups.map((group) => group.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const group of groups) {
    const branchIds = group.breakdown?.map((branch) => branch.id) ?? [];
    assert.equal(new Set(branchIds).size, branchIds.length, `${group.id}: duplicate branch ids`);
  }
});

test('every group has at least one proof', () => {
  for (const group of entries) {
    assert.ok(group.proof.length > 0, `${group.id} has no proof`);
  }
});

test('the shares sum to 100 within rounding (± 0.5)', () => {
  const total = groups.reduce((sum, group) => sum + group.share, 0);
  assert.ok(Math.abs(total - 100) <= 0.5, `shares sum to ${total}`);
});

test("every share appears verbatim in one of the group's excerpts", () => {
  for (const group of groups) {
    const needle = `${group.share.toFixed(1)}%`;
    assert.ok(
      group.proof.some((proof) => proof.excerpt.includes(needle)),
      `${group.id}: no excerpt contains "${needle}"`,
    );
  }
});

test("every count appears verbatim in one of the group's excerpts", () => {
  for (const group of entries) {
    const needle = pewCount(group.count);
    assert.ok(
      group.proof.some((proof) => proof.excerpt.includes(needle)),
      `${group.id}: no excerpt contains "${needle}"`,
    );
  }
});

test('proofs that share a URL share a title', () => {
  // The hero's «Источники» list shows each page once, under one title.
  const titleByUrl = new Map<string, string>();
  const proofs = [...entries.flatMap((group) => group.proof), ...groups.flatMap((group) => group.breakdownNote?.proof ?? [])];
  for (const proof of proofs) {
    const known = titleByUrl.get(proof.url);
    if (known === undefined) titleByUrl.set(proof.url, proof.title);
    else assert.equal(proof.title, known, `${proof.url} has two titles`);
  }
});

test('the historical Christian breakdown has its own year, denominator and complete shares', () => {
  const christians = groups.find((group) => group.id === 'christians')!;
  assert.equal(christians.breakdownYear, 2010);
  assert.equal(christians.breakdownShareBasis, 'christians');
  assert.deepEqual(christians.breakdown?.map((branch) => branch.id), [
    'catholics', 'protestants', 'orthodox', 'other-christians',
  ]);
  const total = christians.breakdown!.reduce((sum, branch) => sum + branch.share, 0);
  assert.ok(Math.abs(total - 100) <= 0.5, `Christian shares sum to ${total}`);
  assert.ok(christians.breakdownNote!.proof.some((proof) => proof.excerpt.includes('2010 CHRISTIAN POPULATION')));
});

test('each denomination share occurs in its own Pew table excerpt', () => {
  for (const group of groups) {
    for (const branch of group.breakdown ?? []) {
      // The Christian share is the final column; only the first row prints %.
      const value = branch.share.toFixed(1).replace('.', '\\.');
      const pattern = new RegExp(`\\s${value}%?$`);
      assert.ok(branch.proof.some((proof) => pattern.test(proof.excerpt)), `${branch.id}: share missing from proof`);
    }
  }
});

test('a breakdown without context or with an invalid proof is rejected', () => {
  const christians = worldComposition.find((group) => group.id === 'christians')!;
  assert.equal(groupSchema.safeParse({ ...christians, breakdownYear: undefined }).success, false);
  assert.equal(groupSchema.safeParse({ ...christians, breakdownShareBasis: undefined }).success, false);
  assert.equal(groupSchema.safeParse({ ...christians, breakdownNote: undefined }).success, false);
  for (const invalid of [{ tier: undefined }, { excerpt: 'word '.repeat(26) }]) {
    const broken = structuredClone(christians);
    Object.assign(broken.breakdown![0].proof[0], invalid);
    assert.equal(groupSchema.safeParse(broken).success, false);
  }
});

test('the three groups the site covers are present', () => {
  const ids = new Set(groups.map((group) => group.id));
  for (const id of ['christians', 'muslims', 'jews']) {
    assert.ok(ids.has(id), `missing group "${id}"`);
  }
});
