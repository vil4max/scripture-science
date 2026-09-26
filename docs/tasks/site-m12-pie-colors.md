# Task — M12: distinct colours in the world composition chart

State: approved (owner, 2026-09-26, on the pie chart: «серого много, плохо
читается»)
Sources: `docs/tasks/site-m8-world-composition.md`, the dataviz skill.

## Problem

Four of the seven slices (unaffiliated, Hindus, Buddhists, other religions)
share one grey (`--t-other`), so the lower half of the pie is one grey mass and
its slices can only be told apart by their labels.

## Change

- Hindus, Buddhists and other religions each get their own colour; the
  religiously unaffiliated may stay neutral grey (no religion).
- New colours never reuse the meaning of a tradition token (`--t-*`) or of
  `--world-christians`; Muslims keep `--t-islam`, Jews `--t-judaism`.
- Validate the full set of seven with the dataviz method in both themes
  (adjacent slices distinguishable for common colour-vision deficiencies,
  contrast against the page background); record the values and results next
  to the tokens in `src/layouts/Base.astro`.
- Table swatches follow the slice colours.

## Checks

`npm run verify`; screenshots at 1440 px in light and dark and at 375 px.

## Boundaries

Owned: `src/components/WorldComposition.astro`, new `--world-*` tokens in
`src/layouts/Base.astro`. No data changes, no new dependencies.
