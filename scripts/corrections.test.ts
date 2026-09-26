// @ts-expect-error - node:assert/strict has no types without @types/node (see scripts/test-rules.test.ts)
import assert from 'node:assert/strict';
// @ts-expect-error - node:test has no types without @types/node
import { test } from 'node:test';
import correctionsData from '../src/data/corrections-orthodoxy-jw.json' with { type: 'json' };
import { createCorrector, parseCorrections, type Correction } from '../src/lib/corrections.ts';

const proof = {
  url: 'https://example.org/page',
  title: 'Example',
  tier: 'reference',
  excerpt: 'an excerpt',
  accessed: '2026-09-26',
};

function fixture(...entries: [id: string, find: string, replace: string][]): Correction[] {
  return parseCorrections(
    entries.map(([id, find, replace]) => ({ id, find, replace, reason: 'why', proof: [proof] })),
  );
}

test('the committed corrections file validates against the schema', () => {
  assert.doesNotThrow(() => parseCorrections(correctionsData));
});

test('a find present exactly once is wrapped in its linked <ins> mark', () => {
  const corrector = createCorrector(fixture(['one', 'old words', 'new words']));
  const html = corrector.html('<p>Some old words here.</p>');
  assert.match(
    html,
    /^<p>Some <ins class="correction" id="corr-one"><a href="#correction-one" [^>]*>new words<\/a><\/ins> here\.<\/p>$/,
  );
  assert.doesNotThrow(() => corrector.assertEachAppliedOnce());
});

// docs/tasks/site-m7-pair-corrections.md: "find must occur exactly once in
// the migrated data; the build fails otherwise". The pair page calls
// assertEachAppliedOnce in its frontmatter, so these throws fail the build.
test('a missing find fails', () => {
  const corrector = createCorrector(fixture(['gone', 'absent text', 'new']));
  corrector.html('<p>Nothing to see.</p>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"gone": find occurs 0 times/);
});

test('a find occurring twice in one fragment fails', () => {
  const corrector = createCorrector(fixture(['twice', 'same', 'new']));
  corrector.html('<p>same and same</p>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"twice": find occurs 2 times/);
});

test('a find occurring once in each of two fragments fails', () => {
  const corrector = createCorrector(fixture(['split', 'same', 'new']));
  corrector.html('<p>same</p>');
  corrector.html('<li>same</li>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"split": find occurs 2 times/);
});

test('a find inside a plain-text field fails even when it also occurs once in HTML', () => {
  const corrector = createCorrector(fixture(['plain', 'thesis words', 'new']));
  corrector.html('<p>thesis words</p>');
  assert.equal(corrector.text('A thesis words title'), 'A thesis words title');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"plain": find occurs in a plain-text field/);
});

test('a find inside an attribute fails and leaves the markup intact', () => {
  const corrector = createCorrector(fixture(['attr', 'old words', 'new']));
  const html = corrector.html('<p title="old words">text</p>');
  assert.equal(html, '<p title="old words">text</p>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"attr": find occurs inside a tag or an SVG/);
});

test('a find inside an SVG label fails', () => {
  const corrector = createCorrector(fixture(['svg', 'old words', 'new']));
  corrector.html('<figure><svg viewBox="0 0 1 1"><text>old words</text></svg></figure>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"svg": find occurs inside a tag or an SVG/);
});

test('a find after a closed SVG is still marked', () => {
  const corrector = createCorrector(fixture(['after', 'old words', 'new']));
  const html = corrector.html('<svg><text>label</text></svg><p>old words</p>');
  assert.match(html, /<p><ins class="correction" id="corr-after">/);
  assert.doesNotThrow(() => corrector.assertEachAppliedOnce());
});

test('every failing correction is reported, not just the first', () => {
  const corrector = createCorrector(fixture(['a', 'alpha', 'A'], ['b', 'beta', 'B']));
  corrector.html('<p>gamma</p>');
  assert.throws(() => corrector.assertEachAppliedOnce(), /"a": .*\n.*"b": /);
});

test('a replacement that contains its own find is not matched again', () => {
  const corrector = createCorrector(fixture(['psalm', 'Пс 104:5', 'Пс 104:5 (в Синод. — 103:5)']));
  const html = corrector.html('<li>(Пс 104:5)</li>');
  assert.equal(html.split('<ins ').length - 1, 1);
  assert.doesNotThrow(() => corrector.assertEachAppliedOnce());
});

test('the schema rejects markup, duplicate ids, nested finds and long excerpts', () => {
  assert.throws(() => fixture(['tag', '<b>old</b>', 'new']), /must be plain text/);
  assert.throws(() => fixture(['amp', 'old', 'a &amp; b']), /must be plain text/);
  assert.throws(() => fixture(['dup', 'one', 'x'], ['dup', 'two', 'y']), /duplicate id \\?"dup/);
  assert.throws(
    () => fixture(['outer', 'old words', 'x'], ['inner', 'words', 'y']),
    /find of \\?"inner\\?" occurs inside find of \\?"outer/,
  );
  const longExcerpt = Array.from({ length: 26 }, (_, i) => `w${i}`).join(' ');
  assert.throws(
    () =>
      parseCorrections([
        { id: 'long', find: 'a', replace: 'b', reason: 'why', proof: [{ ...proof, excerpt: longExcerpt }] },
      ]),
    /at most 25 words/,
  );
});
