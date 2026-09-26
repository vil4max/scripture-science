# Task — M8: the world's religious composition as a pie chart

State: approved (owner, 2026-09-26, pointing at the hero figures: «можно это
сделать пай чарт?»)
Parallelism: 1 writer; M6 owns `src/components/timeline/**` and the timeline
data, M7 owns the pair page.
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md`, the Pew Research Center 2025
report already cited in the hero.

## Goal

The hero's three figures (Christians, Muslims, Jews) become a pie chart of the
whole world population by religion in 2020, from the same Pew report: every
group the report counts (Christians, Muslims, religiously unaffiliated, Hindus,
Buddhists, Jews, other religions), so the slices form a real whole. The three
traditions the site covers stay easy to find.

## Design

- Data: `src/data/world-composition.json` — `{ id, label (Russian), share (%),
  count (Russian text, e.g. «2,3 млрд»), proof: [ { url, title, tier, excerpt,
  accessed } ] }` per group. Each share and count re-checked on the live Pew
  page (verbatim excerpt of at most 25 words); a figure the page does not state
  is left out, never computed or guessed. Shares sum to 100 % within rounding;
  a note under the chart says the shares are rounded.
- Component: `src/components/WorldComposition.astro`, an SVG built at build
  time (no client framework, no new dependency). Slices ordered by size,
  direct labels (name, share and count) instead of a colour-only legend; the
  0.2 % slice gets a leader line. Colour: `--t-islam` and `--t-judaism` keep
  their tradition meaning; the other groups use colours that do not reuse a
  tradition token for another meaning (follow the dataviz skill; validate
  contrast in both themes).
- Accessibility: the SVG has `role="img"` and an `aria-label`; the same numbers
  stay available as text (a list or table next to the chart).
- Placement: `src/pages/index.astro` hero, replacing the `.figures` list; the
  existing «Источники» proof link stays under the chart.

## Checks

`npm run verify`; `scripts/world-composition.test.ts`: the data validates, every
group has a proof, shares sum to 100 ± 0.5. Screenshots at 1440 px in the light
and dark theme, and at 375 px.

## Boundaries

Owned: `src/data/world-composition.json` (new), `src/components/WorldComposition.astro`
(new), `scripts/world-composition.test.ts` (new), the hero part of
`src/pages/index.astro`, an appended entry in `docs/research/VERIFICATION.md`.
No new dependencies. One commit per step; no push.
