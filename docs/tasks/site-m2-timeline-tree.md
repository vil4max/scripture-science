# Task — M2b: the timeline with the tree of separations

State: approved (owner, 2026-09-25: build the site to its final state)
Parallelism: runs in its own worktree alongside M2a; no shared files
Sources: `docs/EDITORIAL.md` (principles 2, 5, 6, 7, 8), `docs/SOURCES.md`,
`docs/research/timeline-and-scope.md`, the per-tradition research notes, the
tradition data files `src/data/matrix/*.yaml` (their `since` and `self_view`).

## Goal

One wide, interactive picture: a neutral BCE/CE time axis on which the
monotheistic traditions grow as lanes out of their historical parents, each
separation dated and sourced; pagan and other religions shown briefly in a
muted band; and a switchable second layer that draws, dashed, how each
tradition itself sees its origin and continuity.

## Data — `src/data/lineage.json` (validated with Zod in `src/lib/timeline.ts`)

- `nodes`: `{ id, label (Russian), tradition? (one of the eight ids — sets the
  colour), parent? (node id), kind: "trunk" | "branch" | "other", start: { year,
  approx (bool), label (Russian), proof: [ { url, title, tier, excerpt,
  accessed } ] }, event? { label (Russian), proof } }`. The event is what
  separated the node from its parent (for example the Council of Chalcedon, 451).
- `unions`: dashed joins such as the Eastern Catholic unions, with year, label
  and proof.
- `others`: pagan and other non-monotheistic religions, each `{ id, label,
  from, to?, approx, proof }`, scholarly dates.
- `selfViews`: one per tradition id: `{ tradition, from: { year or node id,
  label }, gaps?: [ { from, to, label } ], summary (Russian), proof }` — for
  example a continuous line from Pentecost, or a line from the first century
  with a gap for an understood apostasy and a restoration date. Take the
  summaries and proofs from the tradition's `self_view` in
  `src/data/matrix/<id>.yaml` when present.
- Minimum content: the Israelite and Second Temple trunk; rabbinic Judaism and
  early Christianity as two branches; the Church of the East (431); the Oriental
  Orthodox churches (451); the separation of Orthodoxy and Catholicism (1054);
  the Old Believers (17th century); the Reformation (1517) with Lutheran,
  Reformed, Anglican and Anabaptist branches; the Eastern Catholic unions
  (dashed); Islam (610) and its Sunni–Shia division; the Latter-day Saints
  (1830), Seventh-day Adventists (1863), Jehovah's Witnesses (1870s); the
  Pentecostal movement (early 20th century). Where the historical parent of a
  19th-century movement is disputed, show the milieu with a note and a source,
  not a doctrinal descent.
- Every date is checked on an opened reference-tier page (research notes are
  leads only), with a verbatim excerpt of at most 25 words. Unverifiable →
  `approx` plus a `todo` field; the component marks such dates visibly.

## Component — `src/components/timeline/**`, page `src/pages/timeline.astro`

- SVG generated at build time from the data; no client framework. A small
  inline script only for the interactive parts.
- Horizontal time axis, left to right, with a piecewise-linear scale and marked
  axis breaks so the last two thousand years get most of the width; one lane
  per node in tree order (parent, then children), a connector from the parent
  lane to the child lane at the separation year, a dot and a direct text label
  (year and event) at each separation.
- Colours: `var(--t-<tradition>)` for the eight traditions; branches that are
  not one of the eight and the `others` band use `var(--t-other)`. Labels and
  text use ink tokens (`--ink`, `--muted`), never the lane colour. Every
  coloured lane carries a direct label (the palette's CVD and contrast warnings
  require it).
- Hover and keyboard focus on each separation dot or lane show a tooltip with
  the event, the date and a link to the source; hit targets larger than the
  marks.
- The self-view layer: one toggle button per tradition (`aria-pressed`), which
  draws that tradition's dashed line and gaps with its summary and source, and
  dims the rest; a "none" state is the default.
- A legend of the eight traditions (colour chip + name), and a table view
  (`<details>`) listing every node and event with its date and source.
- Wide screens first: the picture uses the full page width; on narrow screens
  the SVG keeps a minimum width inside a horizontally scrolling container.
- `aria-label` on the SVG, visible focus, `prefers-reduced-motion` respected.

## Checks

`npm run build`; `npm run check`; `node --test scripts/` with tests in
`scripts/timeline.test.ts`: the scale is monotonic across the breaks, every
`parent` and `tradition` exists, every date lies inside the axis, and no two
labels in the same lane overlap for the committed data.

## Boundaries

Owned files: `src/data/lineage.json`, `src/lib/timeline.ts`,
`src/components/timeline/**`, `src/pages/timeline.astro`,
`scripts/timeline.test.ts`. Do not edit `src/content.config.ts`,
`package.json`, other pages or data. No new dependencies. One commit per step;
no push.
