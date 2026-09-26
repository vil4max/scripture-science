# Task — M10: comparison positions as rows on a desktop

State: approved (owner, 2026-09-26, after M9 fixed the tradition cards, on the
comparison: «остались вертикальные»; earlier «делаем под десктоп»)
Sources: `docs/tasks/site-m5-reading-polish.md` (W1 built the topic-first
comparison), `docs/tasks/site-m9-desktop-cards.md`.

## Problem

At 1440 px each comparison topic shows the eight positions as a 4 × 2 grid of
blocks about 250 px wide: long positions become tall narrow columns.

## Change

- One tradition per row in every topic.
- From 900 px a row has the tradition's name (with its colour chip) in a
  190 px column on the left and the position, quote and sources in one wide
  column on the right (about 660 px at 1440 px next to the topic nav).
- Below 900 px the name stays above the text.

## Checks

`npm run verify`; at 1440 px no horizontal page scroll, every block spans the
topic column, and the text column is at least 600 px wide.

## Boundaries

Owned: `src/components/Comparison.astro`. No content changes.
