# Task — M13: sections as pages with a sidebar

State: approved (owner, 2026-09-26: «можем сделать сайт вкладками, а не одной
простыней?», then «с боковой панелью»)

## Problem

The home page stacked every section into one long page.

## Change

- Each section is its own page: «Картина» (`/`: the world composition and
  the eight traditions), «Летопись» (`/timeline/`), «Сравнение»
  (`/compare/`, with the detailed pair pages), «Как традиции видят друг
  друга» (`/views/`), «Термины» (`/terms/`), «Источники» (`/sources/`).
- A sidebar lists them with the current one highlighted, plus the detailed
  pair pages and the theme switch. Below 1000 px it becomes a top bar whose
  sections fold under «Разделы».
- `src/layouts/SectionPage.astro` gives every section page its title, lead
  and the Jehovah's Witnesses footnote where the page describes them.
- The sidebar is not a `<nav>` element (scripts/check_text.py reads the pair
  page's first `<nav>`).

## Checks

`npm run verify`; every page answers 200 with its own sidebar item current;
no horizontal page scroll at 1440 and 375 px.

## Reference navigation hierarchy follow-up

Owner requested tertiary emphasis for Terms and Sources. Use 13px muted text
in both navigation layouts; indicate the current reference page with an
underline instead of a bold filled item. Keep link padding and keyboard focus.
Validation: `npm run verify` passed (93 tests, Astro check, text fidelity),
`git diff --check` passed, and desktop browser inspection confirmed the smaller
reference links on Compare. Diff review: No findings.
