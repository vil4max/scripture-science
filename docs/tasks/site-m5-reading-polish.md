# Task — M5: reading layout and content fixes on the home page

State: approved (owner, 2026-09-25: build to the final state; review on desktop
found the page hard to read)
Parallelism: 1 writer (M2b timeline runs separately and owns `src/components/timeline/**`)
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md`, the data in `src/data/**`.

## Problems seen at 1440 px

1. The comparison is a wall of eight narrow columns (8–10 words per line),
   with horizontal scrolling.
2. Tradition cards put labels («С», «Численность») in a side column that
   squeezes the values; long source lists inflate the cards.
3. Internal text leaks onto the page: «(EDITORIAL.md, принцип 2)» and the
   writers' `todo` notes («Требует проверки: … (см. поле todo)»).
4. The Orthodoxy colour chip is empty (it uses `--o`, not `--t-orthodoxy`).
5. Dates mix history and self-understanding: Orthodoxy and Catholicism both
   show «ок. 33 г.», while historically there was one Christianity from about
   33 that separated into the two in 1054.

## Writer steps

**W1 — Comparison for reading.** Topic-first layout: a sticky side navigation
of the fourteen topics on wide screens; for each topic a section whose
traditions appear as a grid of readable blocks (at most four per row at
≥1200 px, two at ≥720 px, one below), each block: colour chip + tradition name
(as text), the summary at a comfortable measure, the quote and the verse in a
collapsible block, sources as small numbered links. A control above the
comparison lets the reader choose which traditions to show (all by default;
choice kept in `localStorage` inside `try/catch`; works without JavaScript by
showing all). Keep a table view (`<details>`) for readers who want it.

**W2 — Cards and typography.** Card fields stacked (label above value); proofs
collapsed into numbered source links with a «Источники» disclosure; body text
18 px, line-height about 1.6, measure at most 70ch for running text; clear
vertical rhythm between sections.

**W3 — Content fixes without new claims.**
- Remove every reference to repository files from the page text.
- A `todo` position shows only «Источник уточняется» (no internal notes); the
  notes stay in the data and on `/sources/` coverage only as counts.
- Colours: every tradition uses its `--t-*` token on the home page (Orthodoxy
  and Jehovah's Witnesses included); the pair page keeps its own palette.
- Dates: each card shows the historical date the tradition became a distinct
  body and, on a separate line, its self-understood origin — using only what the
  data already contains (`since.note`, `self_view`). For Orthodoxy and
  Catholicism the historical line is «как отдельная церковь — с 1054 г.»
  (already in `since.note` with proof) and the self-understood line «по своему
  пониманию — непрерывно от Пятидесятницы». Age order follows the historical
  date: introduce a field or rule in code (not in the content files) that picks
  the historical year from `since.note`'s proof-backed 1054 for these two, and
  document it in `src/lib/rules.ts`.
- Family line on each card for the three nineteenth-century movements and
  Protestantism: add `src/data/families.yaml` with `{ tradition, family
  (Russian), proof }` where `family` is the classification used by a
  reference-tier source (for example «протестантская деноминация» for
  Seventh-day Adventists, «реставрационизм» for Latter-day Saints and Jehovah's
  Witnesses); open each page and copy a verbatim excerpt of at most 25 words.
  No proof → no family line.
- On the pair page, a banner under the header: «Это подробное сравнение двух
  традиций. Вся картина — на главной →»; on the home page a block «Подробные
  сравнения» listing the pair pages.

## Checks

`npm run verify` passes; at 1440 px no horizontal page scroll and running text
lines stay under about 75 characters; the page works in both themes.

## Boundaries

Owned: `src/pages/index.astro`, `src/pages/sources.astro`,
`src/pages/pairs/orthodoxy-jw.astro` (banner only), `src/components/**` except
`src/components/timeline/**`, `src/lib/**` except `src/lib/timeline.ts`,
`src/layouts/**`, `src/styles/**`, `src/data/traditions.yaml`,
`src/data/families.yaml` (new), tests in `scripts/`. Do not edit
`src/data/matrix/**`, `views-of-others.yaml`, `terms.yaml`. No new
dependencies. One commit per step; no push.
