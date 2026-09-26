# Task — M23: denominations inside the Christian slice

State: implemented locally under M24 item 6; awaiting owner review and browser
layout acceptance. Original approval (owner, 2026-09-26, pointing at the world composition table:
«добавь внутри христиан конфессии, можно?»). Handed to Codex; Claude reviews.
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md` ("What verified means"),
`docs/tasks/site-m8-world-composition.md` (the chart this extends),
`docs/tasks/site-m12-pie-colors.md`.

## Goal

The world composition chart/table shows «Христиане 28,8 %» as one figure. Add
a breakdown of that figure into its main denominations (Catholic, Protestant,
Orthodox, and whatever further groups a reliable source reports), sourced the
same way as the top-level groups: a verbatim excerpt, at most 25 words, for
every share and count.

## Design

- Source: search for a Pew Research Center (or comparably reliable
  demographic) report that breaks down the global Christian population by
  major branch for a stated year — ideally the same "Global Religious
  Landscape" family of reports already cited in `world-composition.json`,
  or Pew's dedicated Christianity report if the Landscape report itself does
  not break Christians down further. If no reference-tier source gives a
  clean global breakdown, say so and propose the closest defensible
  alternative (e.g. a somewhat older Pew estimate, explicitly dated) rather
  than inventing shares or leaving the group unlabelled.
- Data: extend `src/data/world-composition.json`'s `christians` entry with a
  `breakdown` array, each item `{ id, label (Russian), share (%), count
  (Russian text), proof: [...] }` — same shape and same verification rule as
  the top-level groups. Shares need not sum to exactly the parent's 28.8%
  (denominational counts vary by source and overlap at the margins); if they
  don't, add a one-line note (with its own source) explaining why, rather
  than silently rounding to fit.
- Rendering: the table already selected on the page gets an expand/detail
  row for Christians (e.g. a `<details>` under that row, or an inline
  sub-list) showing the denominations with their own shares and counts and
  a proof link each. Keep the pie itself as it is (docs/tasks/site-m12
  already fixed its colours); this is a table-level addition, not a second
  ring or nested pie, unless a simple addition clearly reads better -
  propose before building if so.
- Update `scripts/world-composition.test.ts` for the new `breakdown` field
  (each entry validated the same way: excerpt ≤25 words, tier present).

## Rules

Verbatim excerpts, script-checked; one verification-log row; keep it light
(owner: personal page) - reuse the existing proof/tier rendering pattern
(`ProofLink`) rather than inventing a new one. One commit. No push.

## Order

First reply with the source you found and the plan (what the breakdown
contains, where it comes from) and wait for the owner's "ok" before writing
code - the source itself is the main open question here, not the styling.

## Acceptance

- `npm run verify` passes.
- Every new share/count is backed by a verbatim excerpt from a
  reference-tier source.
- The breakdown is visible next to the Christians row without breaking the
  chart's existing layout at desktop or 375px.

## Implementation (2026-09-26)

- Source: Pew Research Center, *Global Christianity* (2011), original estimates
  for 2010. Christian-population shares are 50.1%, 36.7%, 11.9% and 1.3%;
  rounded counts follow the companion Christian Traditions page. The Orthodox
  group includes Oriental Orthodox churches. All values have exact reference
  proofs, at most 25 words each.
- A native details row under Christians shows the four groups, their own
  proof links and an explicit historical-year/denominator note. It does not
  recalculate the 2020 parent or alter the pie. The 2025 report revised overall
  2010 estimates; these are labelled as the original 2011 report, not current
  or matching-2020 estimates.
- Existing world-composition tests now validate nested proofs, source-backed
  values, complete Christian shares and required year/denominator context.
  `npm run verify` passed with 65 tests. Static HTML/source checks passed.
- Desktop and 375px visual acceptance remains pending: browser access was
  denied earlier in this session. No workaround browser or screenshots used.
