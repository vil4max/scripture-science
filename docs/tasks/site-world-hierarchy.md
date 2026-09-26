# World composition with Christian subdivisions

State: latest single-diagram approximation implemented and reviewed on desktop.
Earlier desktop review below applies only to the superseded 2010 diagram.
Owner approved the two-level diagram and a consistently dated historical
fallback on 2026-09-26. Assignee: Codex. Parallelism: 1. No push.

## Scope and decisions

Show religions in the inner ring and Christian traditions as subdivisions of
the same angular sector in the outer ring. Keep all names and world shares
visible; pointer and keyboard activation reveal the within-Christian share.
Use the existing colour tokens, with a distinct folk-religion colour. Keep the
2020 map and overview intact, placing the historical diagram across the full
content width below them so the labels have room on desktop.

The checked 2025 Pew report does not provide this global denominational split.
Use the original 2012 Global Religious Landscape edition throughout the new
chart: world shares from its 2010 World table and 50/37/12/1 percent within
Christianity from its Christian chapter. Do not reuse the slightly different
2011 split, revised 2010 estimates from 2025, or 2020 parent shares. Derived
world shares are parent share times child share and carry an approximation
mark; the caption states this calculation and the edition. Orthodox includes
Oriental Orthodox churches; these are broad statistical categories, not a list
of every church. The chart is historical, not a 2026 population estimate.

## Sources

- World table, printed page 50, PDF page 6:
  https://www.pewresearch.org/religion/wp-content/uploads/sites/7/2012/12/globalReligion-tables.pdf
  World row: 31.5, 23.2, 16.3, 15.0, 7.1, 5.9, 0.8, 0.2 percent.
- Same report, Christian chapter:
  https://www.pewresearch.org/religion/2012/12/18/global-religious-landscape-christians/
  Catholic 50%, Protestant 37%, Orthodox 12%, other Christians 1%.
- Orthodox category caveat reuses the existing verified Christian Traditions
  (2011) source without importing its different numerical split.

Opened both primary 2012 sources on 2026-09-26; stored short exact excerpts,
source titles, dates and tiers in world-hierarchy-2010.json. The source catalogue
and page bibliography include the new dataset. No new dependency or media asset.

## Acceptance and remaining review

- Tests check a single edition, complete totals, unique categories, bounded
  excerpts, source percentages, child arc adjacency and conservation of the
  parent arc/world share. Floating-point geometry uses a 1e-10 tolerance.
- Desktop browser checks are not run in this follow-up: this session's saved
  localhost browser permission remains denied. Do not infer rendered acceptance
  from static geometry or another agent's earlier M25 review.
- Next reviewer: at 1280/1440px and enlarged text, inspect permanent labels and
  leader lines, the tiny Jewish/other-Christian sectors, selected strokes and
  live description; activate labels and arcs with pointer, Enter and Space.
  Confirm the historical date is obvious beside the preserved 2020 overview.
- Preserve concurrent changes to the M25 brief; this follow-up has its own record.

## Validation result

`npm run verify` passed: 81 tests, Astro build/check, and the 1,028-node pair
text-fidelity check. Static homepage audit found no duplicate IDs or broken
fragment links and confirmed 30 labelled, keyboard-focusable chart controls.
Final defect-first code/data diff review: No findings. The first geometry test
used exact floating-point equality; its corrected tolerance accepts numerical
round-off without changing any source share. Rendered desktop acceptance is
still pending; no screenshot is claimed.

## Follow-up: labels inside sectors

The owner clarified the visual requirement with a reference image: place names
and percentages on the coloured areas, not only around the diagram. The 2020
pie now labels its four large sectors internally; its three small sectors use
short external labels. The historical chart uses wider rings and puts all
leaves at or above 3% of the world inside their sectors, including Catholic,
Protestant and Orthodox labels. Smaller leaves retain leader lines. Contrast
comes from outlined text, and labels do not block pointer activation. No 3D
perspective or source-share changes.

Validation: `npm run verify` passed (81 tests, Astro build/check, pair fidelity).
Final diff review: No findings. Rendered visual acceptance remains pending under
this session's previously recorded browser restriction.

## Claude's desktop review (2026-09-26)

Data: a subagent independently fetched both primary sources (the 2012 PDF
table via `pdftotext -layout`, the Christian-chapter page directly) and
compared every one of the 12 stored shares (8 world groups, 4 Christian
subdivisions) against them - all matched exactly, both proof URLs contain
`2012/12`, and the parent x child math (e.g. 31.5 x 50 / 100 = 15.75 for
Catholics) checked out against the test's own assertion.

Code: `hierarchySlices` subdivides the Christian parent's exact angular span
by child share, so children always tile the parent arc by construction; the
`≈`/`около` labelling only appears on the four derived Christian world-shares,
never on the eight source-stated group shares.

Browser: verified in the built preview at 1280px and 1440px, light and dark
themes. Pointer click and Enter both toggle `aria-pressed` on exactly one
control and update the live-region text to the full description (world share,
plus "N % христиан" only for a Christian subdivision). The two smallest
sectors (Jews 0.2%, other religions 0.8%) get external leader-line labels
that stay clear of their neighbours at both widths. White outlined labels on
the coloured sectors stay legible in both themes. No blocking findings.

## Follow-up: one approximate current diagram (2026-09-26)

Owner superseded the historical fallback: one diagram, approximate numbers,
and the latest available dates, with methodology kept out of the main reading
flow. The 2020 Pew pie and its obsolete selection/breakdown UI are removed;
the seven-row 2020 table remains beside the existing map. The only circular
chart now uses the 2026 World Christian Database report, opened together with
both PDF pages in this session:

https://www.worldchristiandatabase.org/static/downloads/Status-of-Global-Christianity-2026.2b54be19fc0c.pdf

All source counts are stored with short verbatim excerpts and access date.
World shares derive from the 2026 population. Chinese folk-religionists and
ethnoreligionists form the folk group; other religions are the residual.
The five Christian category counts sum above the report's Christian total.
Their weights are therefore explicitly normalized to fill the Christian arc,
not presented as exact disjoint population counts. An expandable caption
explains this approximation and the difference from the Pew map categories.
Do not interpret the excess as proven overlap: the report does not explain it.
Independent churches and unaffiliated Christians have separate labels.
The old 2010 dataset is removed from the active chart and source catalogue.

Validation: `npm run verify` passed (86 tests, Astro build/check with zero
errors or warnings, legacy 1,028-node fidelity). Static homepage checks confirm
exactly one population diagram, the 2026 label, retained 2020 table/map and
unique IDs. `git diff --check` passed.

Desktop review on `localhost:4322` passed at 1280 and 1440 px in dark and light
themes. All labels stay inside the SVG, no label boxes overlap, the small Jewish,
other-religion and unaffiliated-Christian sectors keep readable leader lines,
and the 2020 map/table remain visibly separate from the single 2026 diagram.
Pointer activation, label activation, Enter and Space update the live summary;
the console has no errors or warnings. Review found and fixed one accessibility
defect: repeated outer segments and labels were additional tab stops for the
same datum. The chart now exposes exactly 13 unique keyboard controls while all
visible sectors and labels remain clickable. `npm run verify` passed again with
86 tests after the repair. Implementation commit: `f08307c`; these review notes
remain local and uncommitted. No push.
