# Task — M9: tradition cards as full-width rows on a desktop

State: approved (owner, 2026-09-26, on the three-across cards at desktop width:
«почему вертикальные нечитабельные колонки? делаем под десктоп»)
Sources: `docs/tasks/site-m5-reading-polish.md` (W2 stacked the fields).

## Problem

At 1440 px the cards sit three across; each is a tall column about 430 px
wide, so a reader goes down one long column, back up, and down the next.

## Change

- `.cards` holds one card per row at every width.
- From 900 px a card's fields form two columns (about 530 px each at 1440 px),
  short facts paired with short ones and long with long: «С» with
  «Численность», «Писание» with «Сама о себе», then «Классификация».
- Below 900 px the fields stay one stacked column (M5 W2).

## Checks

`npm run verify`; at 1440 px the page has no horizontal scroll, each card spans
the content width, and paired fields start at the same height.

## Boundaries

Owned: `src/components/TraditionCard.astro`, the `.cards` rule in
`src/pages/index.astro`. No content changes.
