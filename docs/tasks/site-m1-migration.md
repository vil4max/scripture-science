# Task — M1: migrate «Православие и Свидетели Иеговы» into the site

State: approved (owner, 2026-09-25: start building the main content)
Parallelism: 1 writer
Sources: `source/orthodoxy-jw.html` (content, verbatim), `docs/EDITORIAL.md`,
`docs/SOURCES.md`, `AGENTS.md`.

## Goal

The existing document becomes the first page of the site — the pair page
Православие ↔ Свидетели Иеговы — on a data model that already works for any
number of traditions, with the wording unchanged and a check that proves it.

## Decisions

- Astro 7 APIs: `defineCollection`, `reference` from `astro:content`; `z` from
  `astro/zod` (Zod 4: `z.url()`, `z.iso.date()`); `file`, `glob` from
  `astro/loaders`; collections in `src/content.config.ts`.
- No new npm dependencies. Helper scripts use the Python 3 standard library
  (`html.parser`) or Node built-ins. Node 26 strips TypeScript types natively,
  so pure rule functions live in `src/lib/rules.ts` (no `astro:*` imports) and
  are tested with `node --test`.
- Verbatim first, structure second: irregular blocks are kept as the source's
  own HTML fragments (rendered with `set:html`); only regular structures are
  extracted into data in M1. Later slices convert fragments into components,
  with the text check guarding every step.
- Tradition order (principle 2) is computed from `since.year`, never hard-coded
  in a component.

## Writer steps

**W1 — Content model.** Files: `src/content.config.ts`, `src/data/translations.yaml`,
`src/data/traditions.yaml`, `src/data/sources.yaml`, `src/lib/rules.ts`,
`src/lib/content.ts`, `scripts/test-rules.test.ts`.
- `sources`: `title`, `publisher`, `url` (url), `tier` (`official` | `reference`
  | `news`), `accessed` (ISO date, optional: absent means listed but not yet
  re-checked), `archive` (url, optional). Seed one entry per link in the
  source's «Откуда информация» list (`section#refs`): title and URL verbatim
  from the link text and `href`, tier by `docs/SOURCES.md`, no `accessed`.
- `translations`: `name`, `short`, `year` (optional), `home` (url). Seed `syno`
  («Синодальный перевод», «Синод.», 1876), `csl` («Церковнославянский текст»,
  «ЦС»), `nwt` («Перевод нового мира», «ПНМ», 2021), wording as in the source's
  abbreviations note where it exists.
- `traditions`: `name`, `short`, `family` (`judaism` | `christianity` | `islam` |
  `other`), `since` { `year` (int), `label`, `proof` (optional: `source`
  reference, `excerpt`, `locator`?) }, `translation` (reference), `color` (CSS
  custom property name, e.g. `--o`). Seed `orthodoxy` (since 33, label
  «ок. 33 г. · Пятидесятница», `syno`, `--o`) and `jw` (since 1870, label
  «1870-е · имя с 1931 г.», `nwt`, `--j`); labels verbatim from the source's timeline.
- `topics`: loaded from `src/data/topics-orthodoxy-jw.yaml` (filled in W2):
  `order` (int), `title`, `slug`, `positions` (record of tradition id →
  { `label` (the column heading as in the source), `thesis`, `points`: [{ `ref`
  (optional), `html` }] }), `extras` (HTML string).
- `src/lib/rules.ts`: `orderByAge(traditions)` (stable sort by `since.year`);
  `checkTopic(topic, traditionIds)` throws when a topic lacks a position for a
  required tradition or names an unknown one. `src/lib/content.ts` loads the
  collections and applies the rules, so a violation fails `npm run build`.
- Check: `npm run build`; `npm run check`; `node --test scripts/` passes, with
  tests for `orderByAge` and for `checkTopic` rejecting a topic without the
  `jw` side.

**W2 — Migration script and generated data.** Files: `scripts/migrate_source.py`,
`src/data/topics-orthodoxy-jw.yaml`, `src/data/sections-orthodoxy-jw.yaml`.
- Reads `source/orthodoxy-jw.html`; writes the two YAML files; deterministic
  (a second run changes nothing).
- Topics: the twelve `section#theology details.topic` blocks. `order` and
  `title` from the `h3` («1. Бог: Троица или одна Личность» → 1 and
  «Бог: Троица или одна Личность»); `positions` from the first `div.duo` of
  the topic (left column → `orthodoxy`, right → `jw`): `label` = the `.who`
  text, `thesis` = `.thesis` text, `points` = each `li` (`ref` = its
  `span.ref` text if present, `html` = the rest of the `li` inner HTML,
  verbatim); `extras` = the inner HTML of the topic body after that first duo,
  verbatim.
- Sections: every other part of `<main>` in source order — the header, the
  `nav` chips, and each `section` (history, sources, common, the theology
  section's eyebrow/heading/intro, literature, structure, dynamics, summary,
  glossary, refs) — as `{ id, html }` with the section's inner HTML verbatim.
- Check: run the script twice, `git diff --exit-code` after the second run;
  `npm run build` passes.

**W3 — Pair page.** Files: `src/pages/pairs/orthodoxy-jw.astro`,
`src/styles/orthodoxy-jw.css`, `src/components/**`, `src/pages/index.astro`
(add a link to the pair page only).
- Renders, in source order: header, nav, sections, and the theology section
  whose topics are rebuilt from data — `details.topic[open]` > `summary` >
  `h3` «{order}. {title}», then the position columns ordered by `orderByAge`,
  then `extras`.
- Styles: the source's `<style>` rules ported into `orthodoxy-jw.css`,
  scoped to the pair page; nav anchors keep working under the `/religion-map`
  base path.
- Check: `npm run build`; `npm run check`.

**W4 — Text check.** Files: `scripts/check_text.py`, `package.json` (scripts
only), `AGENTS.md` (Definition of Done and Commands only).
- Extracts the visible text of `<main>` (and the `nav`) from
  `source/orthodoxy-jw.html` and from `dist/pairs/orthodoxy-jw/index.html`
  (text nodes only, SVG `<text>` included, whitespace collapsed), prints a
  unified diff and exits 1 on any difference.
- `npm run verify` = build + check + `node --test scripts/` + the text check;
  AGENTS.md Definition of Done becomes `npm run verify`.
- Check: `npm run verify` passes with zero text differences.

## Acceptance

`npm run verify` passes; the pair page shows every part of the source in the
same order with the same text; a topic missing a side fails the build (shown
by the test); no tradition order is hard-coded in components.

## Boundaries and stop conditions

- Owned files: those listed in the steps, plus `src/components/**`. Do not edit
  `source/**`, `docs/**`, `package-lock.json` or dependencies.
- Never change wording. If the text check still fails after three repair
  iterations, stop and report the remaining diff.
- No network access is needed; no push; one commit per step.
