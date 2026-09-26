# Task — M6: make the timeline tree readable and complete

State: approved (owner, 2026-09-25: build to the final state; desktop reading)
Parallelism: runs alongside M5; owns only the timeline files
Sources: `docs/tasks/site-m2-timeline-tree.md`, `docs/EDITORIAL.md`,
`docs/SOURCES.md`, `docs/research/timeline-and-scope.md` (leads only).

## Problems seen at 1440 px

1. The SVG (viewBox 2190 × 888) is scaled down to the page width, so labels
   render below 7 px and the tree cannot be read.
2. The "other religions" band has four entries; the owner asked for pagan and
   other non-monotheistic religions briefly on the timeline (Hinduism, Buddhism,
   Jainism, Confucianism, Taoism, Shinto, Greek, Germanic/Norse, Slavic, Celtic
   and similar), each with a scholarly date range.

## Steps

**W1 — Readable at real size.** Never scale the SVG below 1:1: text at least
13 px, lane height at least 28 px; a fixed label column on the left (tradition
and branch names, ink colour, next to a colour chip) that stays visible while
the plot scrolls horizontally; the plot fits the page width on a 1440 px screen
for the last 2000 years, with the compressed early millennia to the left of it
(the initial scroll position shows the common era). Event labels (year + event)
never overlap other labels or lanes; long labels move into tooltips with a short
visible form.

**W2 — Other religions.** Extend the `others` band with the religions listed
above that have a verifiable scholarly date range; each entry opened on a
reference-tier page with a verbatim excerpt of at most 25 words. No proof → leave
it out.

**W3 — Home page slot ready.** Export the tree as a component the home page can
place in `<section id="timeline">` (the integrator adds the import); keep the
`/timeline` page as the full-size view.

## Checks

`npm run verify`; tests still cover the scale, parents, axis bounds and label
overlap, plus a test that computed font sizes and lane height meet W1 minimums.

## Boundaries

Owned: `src/data/lineage.json`, `src/lib/timeline.ts`,
`src/components/timeline/**`, `src/pages/timeline.astro`,
`scripts/timeline.test.ts`. No new dependencies. One commit per step; no push.
