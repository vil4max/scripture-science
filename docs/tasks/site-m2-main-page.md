# Task — M2a: the main page, the comparison and the site frame

State: approved (owner, 2026-09-25: build the site to its final state)
Parallelism: runs in its own worktree alongside M2b; no shared files
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md`, `docs/DECISIONS.md`, the data
files `src/data/matrix/*.yaml` (format: `docs/tasks/site-m3-matrix-content.md`),
`src/data/views-of-others.yaml` and `src/data/terms.yaml` (format:
`docs/tasks/site-m4-views-terms.md`), and the M1 model in `src/content.config.ts`.

## Goal

The home page becomes "one picture of the religious world": the eight
traditions side by side, ordered by age, each in its own words with proof, how
they view each other, and the terms the site uses — inside a site frame with
navigation, a theme switch and a sources page.

## Writer steps

**W1 — Model.** Add collections `matrix` (glob over `src/data/matrix/*.yaml`),
`views` and `terms` with Zod schemas matching the formats above. Single source
of truth: a tradition's identity and content live in its matrix file;
`src/data/traditions.yaml` keeps presentation keys only (`id`, colour token,
translation reference). `orderByAge` reads `since.year` from the matrix entry;
ties break by Russian name (`localeCompare('ru')`). Rules that fail the build:
unknown tradition ids, a matrix file without all fourteen topics in the
brief's order, a `proof` entry missing a field. The M1 pair page keeps working
and its text check stays green. Tests in `scripts/matrix.test.ts`.

**W2 — Site frame.** A header with the site title and navigation (Картина,
Сравнение, Как традиции видят друг друга, Термины, Источники, Пары), a footer,
and a theme switch (system / light / dark) that stores the choice in
`localStorage` inside `try/catch` and sets `data-theme` on `<html>`. The pair
page uses the same frame.

**W3 — Home page.** In this order: a hero (title, one-line description, world
figures from Pew 2025 with their proofs, taken from
`docs/research/timeline-and-scope.md` and re-checked on the Pew page); an empty
`<section id="timeline">` placeholder with its heading (the tree is added by
M2b); the traditions as cards ordered by age (colour chip with the name as text,
«с …» label, scripture translation, adherents with year and method, self-view,
each with a source link); the comparison — fourteen topics × eight traditions
as a wide table with a sticky header row of tradition names, each cell showing
the summary, then the quote and the scripture verse in a collapsible block, then
source links; cells with `status: todo` are visibly marked «источник уточняется»;
"how traditions view each other" grouped by tradition, each document with body,
date, status, summary, quote and source; the terms box. Where Jehovah's
Witnesses are first named on a page, add the note from `docs/DECISIONS.md` as a
footnote.

**W4 — Sources page.** `/sources/`: every proof used by the site, de-duplicated
by URL, grouped by tier and by tradition, with access dates, and a coverage
summary (verified vs todo per tradition and per section).

## Rules

- Colours only through the `--t-*` tokens; text always in ink tokens next to a
  coloured mark (the palette's warnings require direct labels).
- No wording invented: every sentence on these pages comes from the data files
  or is the site's own navigation and headings.
- Wide screens first; narrow screens must stay usable (the comparison table
  scrolls horizontally with a sticky first column).

## Checks

`npm run verify` passes (build, astro check, `node --test scripts/`, M1 text
check).

## Boundaries

Owned files: `src/content.config.ts`, `src/lib/**` except `src/lib/timeline.ts`,
`src/data/traditions.yaml`, `src/pages/index.astro`, `src/pages/sources.astro`,
`src/pages/pairs/**` (frame only), `src/layouts/**`, `src/components/**` except
`src/components/timeline/**`, `src/styles/**`, `scripts/matrix.test.ts`. Do not
edit the data files written by content writers (`src/data/matrix/**`,
`views-of-others.yaml`, `terms.yaml`); report problems in them instead. No new
dependencies. One commit per step; no push.
