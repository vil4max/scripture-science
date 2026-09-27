import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
// js-yaml is not a declared dependency of this project, but it is the
// parser astro/loaders' own `file()` loader uses internally for .yaml/.yml
// (node_modules/astro/dist/content/loaders/file.js) - reusing it here to
// reshape an array-of-objects YAML file into the id-keyed object `file()`
// expects is not a new dependency, just the same one Astro already needs to
// have installed for every YAML-backed collection in this file to load.
// @ts-expect-error - js-yaml has no types without @types/js-yaml (no new
// dependency added for this - see the comment above); Node resolves the
// module fine at both build and check time regardless.
import * as yaml from 'js-yaml';
import { checkDisputeSides } from './lib/disputes';
import { TOPIC_ORDER, TRADITION_IDS, checkMatrixTopicOrder } from './lib/rules';

// YAML parses unquoted dates (2026-09-25) as Date objects; normalise them back
// to ISO date strings so data files may quote dates or not.
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

// A tradition's own source for a claim it makes about itself or others.
// Seeded in bulk from a document's own "Откуда информация" list (docs/SOURCES.md);
// `accessed` absent means listed but not yet re-checked against the live page.
const sources = defineCollection({
  loader: file('src/data/sources.yaml'),
  schema: z.object({
    title: z.string(),
    publisher: z.string(),
    url: z.url(),
    tier: z.enum(['official', 'reference', 'news']),
    accessed: isoDate.optional(),
    archive: z.url().optional(),
  }),
});

// A Bible translation a tradition quotes from, in its own voice (EDITORIAL.md
// principle 3). `home` has no source-backed value yet for any seeded entry
// (source/orthodoxy-jw.html links a per-verse NWT page, not a translation
// home; it gives none for the Synodal or Church Slavonic text) - kept
// optional rather than guessed. See docs/tasks/site-m1-migration.md Conflicts.
const translations = defineCollection({
  loader: file('src/data/translations.yaml'),
  schema: z.object({
    name: z.string(),
    short: z.string(),
    year: z.number().int().optional(),
    home: z.url().optional(),
  }),
});

// Presentation-only per tradition (docs/tasks/site-m2-main-page.md W1): a
// tradition's identity and content (name, family, since, positions, ...)
// live in its `matrix` entry below, once that entry exists. `translation` is
// optional because it is only populated where a source already backed it
// before this slice (orthodoxy, jw); no value is invented for the other six.
const traditions = defineCollection({
  loader: file('src/data/traditions.yaml'),
  schema: z.object({
    // CSS custom property name carrying this tradition's accent colour, e.g.
    // "--t-orthodoxy" (tokens defined in src/layouts/Base.astro).
    color: z.string(),
    translation: reference('translations').optional(),
  }),
});

// One `{ url, title, tier, excerpt, accessed }` proof backing a single claim
// (docs/SOURCES.md "What verified means"). Every field is required: a proof
// entry missing a field fails the build, per docs/tasks/site-m2-main-page.md W1.
const proof = z.object({
  url: z.url(),
  title: z.string(),
  tier: z.enum(['official', 'reference', 'news']),
  excerpt: z.string(),
  accessed: isoDate,
});

// A verbatim quote from a tradition's own document (not scripture).
const sourcedQuote = z.object({
  text: z.string(),
  text_ru: z.string().optional(),
  translation: z.string().optional(),
  source: z.string(),
  url: z.url(),
});

// A verbatim scripture verse in the tradition's own translation.
const scriptureQuote = z.object({
  text_ru: z.string().optional(),
  translation: z.string().optional(),
  ref: z.string(),
  text: z.string(),
  url: z.url(),
});

// Whether the whole tradition holds a position, and on what authority, or who
// within it differs (EDITORIAL.md principle 10; docs/tasks/site-m20-unity-marks.md).
const unityMark = z.object({
  kind: z.enum(['shared', 'divided']),
  note: z.string(),
  proof: z.array(proof).min(1),
});

// One tradition's position on one of the comparison topics
// (docs/tasks/site-m3-matrix-content.md "File format").
const matrixPosition = z.object({
  topic: z.enum(TOPIC_ORDER),
  summary: z.string(),
  doctrine: z.object({ authority: z.string(), sections: z.array(z.object({ title: z.string(), text: z.string() })) }).optional(),
  quote: sourcedQuote.optional(),
  scripture: scriptureQuote.optional(),
  proof: z.array(proof),
  unity: unityMark,
  status: z.enum(['verified', 'todo']),
  todo: z.string().optional(),
});

// One tradition's identity and its position on all comparison topics
// (docs/tasks/site-m3-matrix-content.md). Loaded from src/data/matrix/*.yaml,
// one file per tradition; content writers own these files (see this
// project's docs/tasks/site-m2-main-page.md "Boundaries") - this schema only
// describes and validates their agreed format.
const matrix = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/data/matrix' }),
  schema: z.object({
    id: z.enum(TRADITION_IDS),
    name: z.string(),
    full_name: z.string(),
    family: z.enum(['judaism', 'christianity', 'islam']),
    since: z.object({
      year: z.number().int(),
      label: z.string(),
      note: z.string().optional(),
      proof: z.array(proof),
    }),
    scripture: z.object({
      name: z.string(),
      overview: z.object({
        title: z.string(),
        text: z.string(),
      }).optional(),
      url: z.url(),
      proof: z.array(proof),
    }),
    adherents: z.object({
      display: z.boolean().optional(),
      value: z.string(),
      year: z.number().int(),
      method: z.string(),
      proof: z.array(proof),
    }),
    self_view: z.object({
      summary: z.string(),
      proof: z.array(proof),
    }),
    positions: z.array(matrixPosition).superRefine((positions, ctx) => {
      try {
        checkMatrixTopicOrder(positions.map((p) => p.topic));
      } catch (error) {
        ctx.addIssue({ code: 'custom', message: (error as Error).message });
      }
    }),
  }),
});

// Reshapes a YAML file holding a top-level array (no `id`/`slug` field on
// each item, as docs/tasks/site-m4-views-terms.md specifies) into the
// id-keyed object astro/loaders' `file()` needs, keyed by `idField`.
function keyedArrayParser(idField: string) {
  return (text: string) => {
    const parsed = yaml.load(text);
    if (!Array.isArray(parsed)) return parsed;
    const byId: Record<string, unknown> = {};
    for (const item of parsed) {
      const key = (item as Record<string, unknown>)[idField];
      if (typeof key === 'string') byId[key] = item;
    }
    return byId;
  };
}

// How one tradition's own official documents describe the others
// (EDITORIAL.md principle 9), one entry per tradition id
// (docs/tasks/site-m4-views-terms.md). Content writers own this file; not
// yet written (docs/tasks/site-m2-main-page.md "Data availability") - the
// collection is simply empty until it lands, so the section it backs
// renders nothing rather than failing the build.
const viewsDocument = z.object({
  title: z.string(),
  title_ru: z.string(),
  body: z.string(),
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string(),
  ),
  // Whether the document states its tradition's official position, and why
  // (docs/tasks/site-m20-unity-marks.md): a conciliar act or an official
  // publication, or a statement by part of the tradition.
  unity: z.object({
    kind: z.enum(['official', 'partial']),
    note: z.string(),
    proof: z.array(proof).min(1),
  }),
  about: z.array(z.enum(TRADITION_IDS)),
  summary: z.string(),
  quote: z.object({ text: z.string(), text_ru: z.string().optional(), translation: z.string().optional(), url: z.url() }),
  proof: z.array(proof),
  status_check: z.enum(['verified', 'todo']),
});

const views = defineCollection({
  loader: file('src/data/views-of-others.yaml', { parser: keyedArrayParser('tradition') }),
  schema: z.object({
    tradition: z.enum(TRADITION_IDS),
    documents: z.array(viewsDocument),
  }),
});

// One tradition's part in a dispute (EDITORIAL.md principle 10): its view or
// its answer in brief, from its own sources. `unity` says whether the whole
// tradition holds that view, and on what authority, or who within it
// disagrees (owner, 2026-09-26: a mark on every part).
const disputePart = z.object({
  tradition: z.enum(TRADITION_IDS),
  summary: z.string(),
  unity: unityMark,
  quote: sourcedQuote.optional(),
  scripture: scriptureQuote.optional(),
  proof: z.array(proof).min(1),
});

// A dispute attached to a comparison topic: the contesting traditions, then
// the contested ones' answers (docs/tasks/site-m19-disputes.md).
const disputes = defineCollection({
  loader: file('src/data/disputes.yaml', { parser: keyedArrayParser('id') }),
  schema: z
    .object({
      id: z.string(),
      topic: z.enum(TOPIC_ORDER),
      title: z.string(),
      orthodoxFoundation: z.string(),
      authority: z.string(),
      challenges: z.array(disputePart),
      answers: z.array(disputePart),
      status: z.enum(['verified', 'todo']),
    })
    .superRefine((dispute, ctx) => {
      try {
        checkDisputeSides({
          challengers: dispute.challenges.map((part) => part.tradition),
          answerers: dispute.answers.map((part) => part.tradition),
        });
      } catch (error) {
        ctx.addIssue({ code: 'custom', message: `${dispute.id}: ${(error as Error).message}` });
      }
    }),
});

// The terms box (EDITORIAL.md principle 5): each term the site uses or
// deliberately avoids, defined from a reference-tier source
// (docs/tasks/site-m4-views-terms.md). Content writers own this file; not
// yet written - see `views` above for the same "renders nothing" contract.
const terms = defineCollection({
  loader: file('src/data/terms.yaml', { parser: keyedArrayParser('term') }),
  schema: z.object({
    term: z.string(),
    use_on_site: z.boolean(),
    definition: z.string(),
    notes: z.string(),
    proof: z.array(proof),
  }),
});

// One comparison topic's per-tradition position: a labelled thesis backed by
// scripture points. `positions` is keyed by tradition id so a topic works for
// any number of traditions, not just a hard-coded pair.
const topicPosition = z.object({
  label: z.string(),
  thesis: z.string(),
  points: z.array(
    z.object({
      ref: z.string().optional(),
      html: z.string(),
    }),
  ),
});

const topics = defineCollection({
  loader: file('src/data/topics-orthodoxy-jw.yaml'),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    slug: z.string(),
    positions: z.record(z.string(), topicPosition),
    // Verbatim HTML for whatever in the topic's body isn't a regular
    // position (figures, extra textdiff blocks, closing crux paragraphs).
    extras: z.string(),
  }),
});

// A verbatim HTML fragment for a page region not yet broken into structured
// data (M1 decision: "verbatim first, structure second" in
// docs/tasks/site-m1-migration.md). Rendered with set:html by the page that
// owns it.
const sections = defineCollection({
  loader: file('src/data/sections-orthodoxy-jw.yaml'),
  schema: z.object({
    html: z.string(),
  }),
});

export const collections = {
  sources,
  translations,
  traditions,
  matrix,
  views,
  disputes,
  terms,
  topics,
  sections,
};
