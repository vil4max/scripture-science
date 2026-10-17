// @ts-expect-error - node types are not installed; matches the existing test harness.
import { test } from 'node:test';
// @ts-expect-error - node types are not installed.
import assert from 'node:assert/strict';
// @ts-expect-error - node types are not installed.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
// @ts-expect-error - js-yaml has no separately installed TypeScript declarations.
import * as yaml from 'js-yaml';
import { BOOK_PATH, BOOK_POINT_KINDS, BOOK_URL, bookLocator, bookProofTitle } from '../src/lib/book.ts';
import { catalogLabel } from '../src/lib/citations.ts';
import { collectProofs } from '../src/lib/sourceCatalog.ts';

// docs/tasks/site-m37-korytko-book.md: the book's proofs and its page.
const book = JSON.parse(readFileSync(new URL('../src/data/book-homo-religiosus.json', import.meta.url), 'utf8'));
type Proof = { url: string; title: string; tier: string; excerpt: string; accessed: string };
// Every proof in the site's data that cites the book, wherever it sits.
const dataFiles = (dir: string): string[] => readdirSync(new URL(`../${dir}/`, import.meta.url), { withFileTypes: true })
  .flatMap((entry: { name: string; isDirectory(): boolean }) => entry.isDirectory() ? dataFiles(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`])
  .filter((path: string) => /\.(json|ya?ml)$/.test(path));
const proofs: Proof[] = dataFiles('src/data').flatMap((path) => {
  const text = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  return collectProofs(path.endsWith('.json') ? JSON.parse(text) : yaml.load(text)) as Proof[];
}).filter((proof) => proof.url === BOOK_URL);

test('the book URL is the site page for the book', () => {
  const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  const site = config.match(/site: '([^']+)'/)![1];
  const base = config.match(/base: '([^']+)'/)![1];
  assert.equal(BOOK_URL, `${site}${base}/${BOOK_PATH}`);
  assert.deepEqual(bookLocator(bookProofTitle('XXIII', 695)), { chapter: 'XXIII', page: 695 });
  assert.deepEqual(bookLocator(bookProofTitle('preface', 5)), { chapter: 'preface', page: 5 });
  assert.equal(catalogLabel([{ title: bookProofTitle('preface', 5) }, { title: bookProofTitle('conclusion', 808) }]), bookProofTitle('XX', 1).replace(/, гл\. XX, с\. 1$/, ''));
});

test('every book proof names a chapter and a page inside it, as a short reference excerpt', () => {
  const chapters = new Map(book.chapters.map((chapter: { n: string; from: number; to: number }) => [chapter.n, chapter]));
  assert.ok(proofs.length > 0, 'the site cites the book');
  for (const proof of proofs) {
    assert.equal(proof.url, BOOK_URL, proof.title);
    assert.equal(proof.tier, 'reference', proof.title);
    const at = bookLocator(proof.title)!;
    assert.ok(at, `locator: ${proof.title}`);
    assert.equal(proof.title, bookProofTitle(at.chapter, at.page));
    const chapter = chapters.get(at.chapter) as { from: number; to: number } | undefined;
    assert.ok(chapter && at.page >= chapter.from && at.page <= chapter.to, `page in chapter: ${proof.title}`);
    assert.ok(proof.excerpt.trim().split(/\s+/).length <= 25, proof.excerpt);
    assert.match(proof.accessed, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('each book-points file holds one tradition\'s points, each with a theme and evidence', () => {
  const dir = new URL('../src/data/book-points/', import.meta.url);
  const linked = new Set(book.chapters.flatMap((chapter: { site?: { tradition: string }[] }) => (chapter.site ?? []).map((link) => link.tradition)));
  for (const name of readdirSync(dir) as string[]) {
    const tradition = name.replace(/\.json$/, '');
    assert.ok(linked.has(tradition), `${tradition}: a chapter links it to a page`);
    for (const point of JSON.parse(readFileSync(new URL(name, dir), 'utf8'))) {
      assert.equal(point.tradition, tradition, point.text);
      assert.ok(Object.hasOwn(BOOK_POINT_KINDS, point.kind), `${tradition}: kind ${point.kind}`);
      assert.ok(point.text && point.proof.length, point.text);
    }
  }
});

// With no page images to check against (owner, 2026-10-17: «пользуйся
// текст»), reject the commonest OCR slip: Latin and Cyrillic letters in one word.
test('no book excerpt has a word that mixes Latin and Cyrillic letters', () => {
  for (const proof of proofs) {
    for (const word of proof.excerpt.split(/[^\p{L}]+/u)) {
      assert.ok(!(/\p{Script=Latin}/u.test(word) && /\p{Script=Cyrillic}/u.test(word)), `${proof.title}: «${word}»`);
    }
  }
});

// The OCR copy stays on this machine (private/, ignored by git); where it is
// present, each excerpt must be on its page letter for letter. Hyphens and
// spacing are ignored: the OCR splits words at line ends and drops spaces
// around dashes, so «Шри-|Ланки» and «времени —смрити» still match.
const copy = new URL('../private/books/korytko-homo-religiosus-2017.txt', import.meta.url);
test('every excerpt is on its page of the local copy', { skip: !existsSync(copy) && 'no local copy of the book' }, () => {
  const pages = (readFileSync(copy, 'utf8') as string).split('\f');
  const flat = (text: string) => text.replace(/[­\s-]/g, '');
  for (const proof of proofs) {
    const at = bookLocator(proof.title)!;
    assert.ok(flat(pages[at.page - 2]).includes(flat(proof.excerpt)), `${proof.title}: «${proof.excerpt}»`);
  }
});
