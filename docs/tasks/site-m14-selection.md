# Task — M14: read one tradition or compare up to three

State: approved (owner, 2026-09-26: «нужно весь сайт настроить как
сравнительный список, максимум 3 … можно про одно течение прочитать а можно
сравнить до 3»; «выбор можно прибить вверху чтобы был как хедер который
всегда видно, а сбоку содержание»; views «Плитка + фильтр»; desktop first,
phones only must not break)

## Goal

A reader picks one tradition to read about, or up to three to compare, and
every section follows that choice; with nothing picked, a section shows its
overview of all eight.

## Design

- **W1 — The choice.** A sticky bar at the top of the content (always
  visible, beside the sidebar of sections) with the eight traditions in age
  order as toggle chips; a fourth pick is refused with a short message;
  «Сбросить» clears. The choice lives in the address (`?t=a,b,c`, so it can
  be shared), is carried by the sidebar links and remembered in
  localStorage. `src/lib/selection.ts` parses and formats it; the bar
  announces changes with a `traditions:change` event (`detail.ids`).
- **W2 — Сравнение.** With a choice, each topic shows only the chosen
  traditions' positions side by side (one column each, the reader's order);
  without one, all eight as rows. The old per-page filter goes.
- **W3 — Картина.** With a choice, a field-aligned comparison: one column
  per chosen tradition, each field («С», «Численность», «Писание», «Сама о
  себе», «Классификация») on one row across the columns; without one, the
  world composition and all eight cards.
- **W4 — Как видят друг друга.** Documents as tiles in two columns, each with
  author → subject chips, title and year, status on a small line, the
  summary in full, quote and sources folded. With a choice, only documents
  by the chosen traditions, one column per author tradition.
- **W5 — Летопись.** The choice highlights the chosen traditions' lines with
  their ancestors and shows each chosen tradition's own view of its history;
  the chronicle's own toggle bar goes.

## Checks

`npm run verify`; `scripts/selection.test.ts` for parsing (unknown ids,
duplicates, more than three). In the browser at 1440 px: choosing 1, 2 and 3
traditions on each page, reload keeps the choice, a copied link restores it,
the sidebar links carry it.

## Boundaries

No content changes. No new dependencies.
