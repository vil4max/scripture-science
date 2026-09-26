// Visible, sourced corrections to a migrated document
// (docs/tasks/site-m7-pair-corrections.md). No astro:* imports, so this runs
// directly under Node's stripped-types execution (scripts/corrections.test.ts)
// as well as inside the Astro build - the same split as src/lib/timeline.ts.
// scripts/check_text.py applies the same data file with the same matching
// rule (one left-to-right pass over the original text, finds tried in file
// order); keep the two in step.
import { z } from 'astro/zod';

// docs/SOURCES.md "What verified means": a verbatim excerpt of at most 25 words.
const MAX_EXCERPT_WORDS = 25;

const proofSchema = z.object({
  url: z.url(),
  title: z.string().min(1),
  tier: z.enum(['official', 'reference', 'news']),
  excerpt: z
    .string()
    .min(1)
    .refine((s) => s.trim().split(/\s+/).length <= MAX_EXCERPT_WORDS, {
      message: `an excerpt has at most ${MAX_EXCERPT_WORDS} words`,
    }),
  accessed: z.iso.date(),
});

// `find` must sit inside a single text node of the migrated HTML (so wrapping
// it keeps the markup valid, and the text check can apply the same edit to
// the source), and `replace` is inserted into HTML unescaped - hence neither
// may carry markup or character references.
const plainText = z
  .string()
  .min(1)
  .refine((s) => !/[<>&]/.test(s), { message: 'must be plain text: no <, > or &' });

const correctionSchema = z
  .object({
    // Used in element ids (corr-<id>, correction-<id>).
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    find: plainText,
    replace: plainText,
    reason: z.string().min(1),
    proof: z.array(proofSchema).min(1),
  })
  .refine((c) => c.find !== c.replace, { message: 'replace must differ from find' });

const correctionsSchema = z.array(correctionSchema).superRefine((list, ctx) => {
  const ids = new Set<string>();
  for (const c of list) {
    if (ids.has(c.id)) ctx.addIssue({ code: 'custom', message: `duplicate id "${c.id}"` });
    ids.add(c.id);
  }
  // A find nested in another is shadowed or double-counted in a single-pass
  // match, so the "exactly once" rule would no longer mean what it says.
  for (const a of list) {
    for (const b of list) {
      if (a !== b && a.find.includes(b.find)) {
        ctx.addIssue({
          code: 'custom',
          message: `find of "${b.id}" occurs inside find of "${a.id}"`,
        });
      }
    }
  }
});

export type Correction = z.infer<typeof correctionSchema>;

export function parseCorrections(data: unknown): Correction[] {
  return correctionsSchema.parse(data);
}

/**
 * The in-text mark for one applied correction: the new words, linked to the
 * correction's entry in the page's list. The original wording rides along as
 * a tooltip only - the list is where it is shown to every reader.
 */
export function correctionMarkup(correction: Correction): string {
  const original = correction.find.replaceAll('"', '&quot;');
  return (
    `<ins class="correction" id="corr-${correction.id}">` +
    `<a href="#correction-${correction.id}" title="Исправлено. В исходном тексте: ${original}">` +
    `${correction.replace}</a></ins>`
  );
}

export interface Corrector {
  /** Applies every correction to one migrated HTML fragment. */
  html(fragment: string): string;
  /**
   * Records a migrated plain-text field (rendered escaped, so it cannot carry
   * the <ins> mark) and returns it unchanged; a find inside one fails
   * `assertEachAppliedOnce`.
   */
  text(value: string): string;
  /**
   * Throws unless every correction was applied exactly once, and never inside
   * plain text, a tag or an SVG.
   */
  assertEachAppliedOnce(): void;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Inside a tag (an attribute value) an <ins> mark breaks the markup; inside
// an SVG it is not HTML and its text does not render. The text check cannot
// see either, since it compares text nodes only.
function isOutsideText(html: string, offset: number): boolean {
  const inTag = html.lastIndexOf('<', offset) > html.lastIndexOf('>', offset);
  const inSvg = html.lastIndexOf('<svg', offset) > html.lastIndexOf('</svg>', offset);
  return inTag || inSvg;
}

/**
 * Applies `corrections` across all fragments of one migrated document and
 * counts what was actually replaced, so a find that is missing, repeated, or
 * shadowed by another is reported rather than silently rendered wrong.
 */
export function createCorrector(corrections: Correction[]): Corrector {
  const byFind = new Map(corrections.map((c) => [c.find, c]));
  const applied = new Map(corrections.map((c) => [c.id, 0]));
  const inPlainText = new Set<string>();
  const outsideText = new Set<string>();
  // One pass over the original text: inserted markup is never re-scanned.
  const pattern =
    corrections.length > 0
      ? new RegExp(corrections.map((c) => escapeRegExp(c.find)).join('|'), 'g')
      : null;

  return {
    html(fragment) {
      if (!pattern) return fragment;
      return fragment.replace(pattern, (match: string, offset: number) => {
        const correction = byFind.get(match)!;
        if (isOutsideText(fragment, offset)) {
          outsideText.add(correction.id);
          return match;
        }
        applied.set(correction.id, applied.get(correction.id)! + 1);
        return correctionMarkup(correction);
      });
    },
    text(value) {
      if (pattern) {
        for (const match of value.matchAll(pattern)) inPlainText.add(byFind.get(match[0])!.id);
      }
      return value;
    },
    assertEachAppliedOnce() {
      const problems: string[] = [];
      for (const c of corrections) {
        const count = applied.get(c.id)!;
        if (inPlainText.has(c.id)) {
          problems.push(`correction "${c.id}": find occurs in a plain-text field, which cannot be marked: «${c.find}»`);
        } else if (outsideText.has(c.id)) {
          problems.push(
            `correction "${c.id}": find occurs inside a tag or an SVG, which cannot be marked: «${c.find}»`,
          );
        } else if (count !== 1) {
          problems.push(
            `correction "${c.id}": find occurs ${count} times in the migrated data, expected exactly once: «${c.find}»`,
          );
        }
      }
      if (problems.length > 0) throw new Error(problems.join('\n'));
    },
  };
}
