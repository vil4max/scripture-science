# Task — M11: a vertical chronicle from the Creation to the present

State: approved (owner, 2026-09-26: years «Оба года рядом», layout «Строка на
событие»; the tradition switch stays)
Sources: `docs/DECISIONS.md` ("Orthodox chronology and a vertical chronicle"),
`docs/EDITORIAL.md` principles 7 and 8, `src/data/lineage.json`.

## Goal

The timeline reads top to bottom, from the Creation of the world to the
present, with every event, date and source visible without hovering.

## Design

- One row per dated item (separations, the union, creation epochs, other
  religions), oldest first; ties keep a parent before its child.
- Two year columns with headers once: from the Creation (bold) and from the
  Nativity (muted), tabular figures, «ок.» for approximate dates.
- A git-log-style graph: each line of the tree gets a column; a child's row
  draws the connector from its parent's column; the last child of a
  structural node continues its parent's column; living lines run to the
  «Наши дни» row. Colours are the tradition tokens, grey for other lines.
- A gap marker «⋮ N лет» between rows 300 or more years apart, and a divider
  for the start of the years from the Nativity.
- The tradition switch stays: it highlights a tradition's line with its
  ancestors, dims the rest and shows that tradition's own view of its history
  with its source.
- Below 760 px the graph is hidden and the two years stack.

## Checks

`npm run verify`; tests cover the year conversion, row order, parent-before-
child ties, branch columns (no overlap, minimal count) and the 13 px minimum.
In the browser at 1440 px in both themes and at 375 px: no horizontal page
scroll, the graph lines meet their dots, the switch highlights and resets.

## Boundaries

Owned: `src/lib/timeline.ts`, `src/components/timeline/**`,
`src/pages/timeline.astro`, the timeline section of `src/pages/index.astro`,
`scripts/timeline.test.ts`, `docs/EDITORIAL.md` principle 8,
`docs/DECISIONS.md`. The data in `src/data/lineage.json` is unchanged.
