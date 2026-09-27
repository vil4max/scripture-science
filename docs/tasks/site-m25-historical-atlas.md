# M25 — historical atlas ready for proofreading

State: implementation complete; reviewed here (see "Claude's desktop review" below) with no blocking findings. Owner's own read-through still pending. Owner approved the complete scope on 2026-09-26.
Assignee: Codex. Parallelism: 1. No push or publication.

## Intent and acceptance

Build a Russian desktop-only historical guide for adults and teenagers aged
15: origins and development of religions, their present distribution, and
comparison of Abrahamic traditions. Orthodoxy/JW is a useful preset, not the
site's organising polemic. Preserve the eight detailed traditions and thirteen
existing disputes. Other religions receive sourced introductory coverage.

Ready for proofreading means populated pages, working navigation, sources and
media credits, reviewed factual limits, a passing `npm run verify`, and visual
acceptance on laptop/large desktop at normal and enlarged text. No phone gate.
If browser access is denied, record visual acceptance as blocked, never passed.

## Delivery slices

1. Compact page citations: reuse ProofLink and existing proof data; numbered
   references, deduplicated page bibliography with all excerpts and return links.
   Preserve short quote attribution and paragraph identifiers. Keep the migrated
   full pair document's original text/links under its existing fidelity contract.
2. Global atlas: local country shapes and sourced composition data, map beside
   the world chart, consistent colours, largest-affiliation colouring, country
   selection and full composition panel. Keyboard/list access, explicit no-data
   state and ties, no population inference from land area. Statistics retain
   their observation year (2020), distinct from publication/update in 2026.
3. Historical reading route and overview: evidence, interpretation and faith
   narratives distinguished; ancient contexts, major traditions, later divisions
   and contemporary change. No invented first religion/date or universal family
   tree. Reuse the existing detailed chronology and dual date convention.
4. Visual profiles: sourced overview cards and classification; photographs with
   verified authors/licences and local assets; labelled governance diagrams for
   Orthodoxy/JW. No fabricated religious imagery or generic symbol assignment.
5. Guided comparison: brief/detailed modes, topic navigation/filter, shareable
   question links and Orthodoxy/JW preset; reuse existing summaries/proofs and
   preserve internal-disagreement marks. Label editorial comparisons accurately;
   do not imply a historical document explicitly answered a later movement.
6. Consolidated editorial and desktop acceptance: inspect M20 marks, source/media
   coverage, interactions, generated links and citations; bounded source repairs,
   full gate, defect-first diff review and final report for the next reviewer.

One independently reviewable commit per completed slice. Update this brief and
ROADMAP in each commit; record source checks in research/VERIFICATION.md. Existing
unavailable-source limitations remain explicit unless verified replacements exist.

## Implementation constraints

Keep Astro/static hosting and existing loaders, selection URL, colours and
ProofLink semantics. No new runtime dependencies, accounts or external services.
Use local SVG/geographic assets and build-time data. Do not change credentials,
browser permissions or tooling to get around a denied capability.

Academic/reference sources support history and demography; official sources
support each tradition's own teaching. New excerpts must match fetched text,
normalised only for markup/whitespace, and contain at most 25 words. Country
statistics are checked against the source table, not generated estimates.

Temporary downloads/scripts belong in /tmp/religion-map-m25, not the repository.
Only shipped assets, provenance, relevant tests and specifications are retained.
Do not remove other tasks' files or pre-existing artifacts.

## Progress and handoff

- Baseline: clean main; M22–M24/M23 accepted by the prior reviewer. Existing
  source-host limitations and the intentional soft hyphen handling are in ROADMAP.
- Slice 1: implemented. Page-local source registry, compact numbers, merged
  paragraph labels, full excerpts and return links; existing pair fidelity kept.
  Gate: 69 tests, Astro build/check and 1,028-node fidelity check passed.
  Generated citation/return anchors resolve without duplicates across all pages.
  Browser visual acceptance remains blocked by saved localhost permission.
- Slice 2: implemented; 201 country/territory rows from Pew's public table,
  177 local Natural Earth shapes (including split French Guiana), country details
  and full table. Tests preserve the source's seven-person India row discrepancy
  rather than correcting source data. All other row sums differ by at most four.
  SVG is schematic/equirectangular, no-data units hatched, small islands selectable.
- Slice 3: implemented. A sourced introductory history route now precedes the
  detailed chronology; the homepage links world/history/comparison. Archaeology,
  historical interpretation and self-understanding are explicitly distinguished.
  Narrowed Lion Man to the museum's dated artefact, not a claimed first religion;
  Buddhist dates remain a source-attributed period, JW origin a late-19th-century
  organisation rather than an unsupported precise year in the new overview.
- Slice 4: implemented. Ten locally shipped, visually inspected Commons photos
  have captions, author/source/licence links and metadata (no image edits).
  Every detailed profile and homepage card has a specific image; broad coverage
  adds Hinduism, Buddhism, Sikhism, Shinto and historical Daoism, with an explicit
  explanation of Pew's aggregate other-religions category. Overview geography
  reuses the country dataset. Governance diagrams reuse existing verified
  Orthodoxy/JW positions; the family diagram is explicitly a site index, not a
  universal genealogy. No universal religious symbols were assigned.
- Slice 5: implemented. Brief mode retains summaries, source numbers and unity
  labels; detailed mode reveals quotations and unity explanations. Topic filters,
  topic/question permalinks and the Orthodoxy/JW preset preserve the existing
  selection rules. URL tests cover invalid input, stale filters and base paths.
  Dispute answers are labelled as the other side's position, not a historical
  reply to a later movement. Browser interaction acceptance is still blocked.
- Slice 6: implementation/editorial audit completed; desktop visual acceptance
  BLOCKED by the saved localhost browser permission. No browser workaround used,
  no site screenshots captured, and no claim of completed visual acceptance.
  The source catalogue now includes nested unity evidence, families, chronology,
  history, world data and media credits; shared URLs retain all proof excerpts.
  The coverage caption uses the actual topic count. Empty excerpt controls are
  omitted for citation-only references.
  A pre-existing unquoted colon in views-of-others.yaml caused Astro's file
  loader to log an error while exiting successfully. Corrected the YAML without
  changing its text; a direct parse test for every YAML data file prevents a
  cached build from hiding this failure. Earlier slice gates returned success
  but carried this loader error; final validation supersedes those results.

## Final verification and remaining review

- Final gate: `npm run verify` passes 79 tests, Astro build/check (zero errors
  and warnings, no content-loader errors), and 1,028-node pair text fidelity.
- Generated HTML audit: 14 pages and 4,978 local links/image references; no
  missing files, unresolved anchors or duplicate IDs. This checks static output,
  not browser interactions or rendered layout.
- M20 inventory: all 120 positions have sourced unity marks (20 divided);
  all 48 parts of 13 disputes have sourced unity marks; all 17 documents across
  eight traditions have sourced marks (nine partial). Existing classifications
  were preserved. The owner's theological/editorial review remains their own.
- Source limits: observation year 2020 remains visible; the Christian breakdown
  retains its separate 2010 year. Lion Man is an artefact, not a first religion;
  Buddhism's period is attributed; the new JW overview uses late nineteenth
  century; Pew's other-religions aggregate is not a single faith. Pre-existing
  inaccessible source hosts remain documented in ROADMAP.
- Photos were inspected individually, not in rendered pages. Credits and local
  assets are checked automatically. Task-owned temporary downloads and scripts
  are removed after recording this evidence; shipped media/provenance remain.
- Next reviewer: after the owner enables localhost in Codex browser permissions,
  inspect 1280px and 1440px desktop widths, normal and 125% text/zoom, light/dark
  themes. Check map versus chart readability, map mouse/keyboard/list selection,
  photograph captions, historical route, source/return links, and comparison
  brief/detail/filter/permalinks with zero, one, two and three traditions.
  Include Orthodoxy/Catholicism, Protestantism/Catholicism, JW/Orthodoxy and
  Orthodoxy/Protestantism/Catholicism. Check sticky headings during scroll.
  Capture screenshots and fix only reproducible defects; no phone acceptance.
- Defect-first final diff review: No findings after the repairs above, within
  the static/code checks available. Browser-dependent acceptance is unresolved.
- No push or publication. Do not mark M25 accepted until desktop review passes.

## Follow-up: pie interaction

Owner reported that the pie could not be activated. Sectors now support click,
touch, Enter and Space, with an equivalent labelled button in every table row
for very small sectors. Selection highlights the row and announces the group's
2020 figures; selecting Christians opens the existing, separately dated 2010
breakdown. No new demographic claims or automatic navigation. Browser acceptance
remains blocked by the previously recorded localhost permission.

Validation: `npm run verify` passed (79 tests, Astro build/check and pair text
fidelity); diff review: No findings. Browser activation is not verified because
the saved localhost denial is unchanged.

## Homepage structure and country chart follow-up

Owner requested a coherent overview and removal of map-related explanatory
noise. Order the page as global proportions, geography, Abrahamic profiles and
other traditions. Replace the introductory cross-page cards with compact local
section links. Remove the duplicate world totals below the map; show a country
bar chart only after selection, ordered by population share. Every track uses
the same 100-percent scale, with exact labels retained for tiny shares. Keep
the all-country table as a non-script fallback. Move publication/methodology
and boundary notes to Sources; retain the distinct 2026 and 2020 years beside
the chart and map titles. Existing demographic data is unchanged.

Validation: `npm run verify` passed (93 tests, Astro check, text fidelity).
Desktop browser checks covered country selection, reset and Enter activation
on the map. The final chart has seven equal-width tracks and no horizontal
overflow. Browser access is now available for this follow-up, superseding the
older access blocker above. `git diff --check` passed. Final diff review: No
findings. No new external claims; a remote-source refresh was not run.

## Unified country selector (2026-09-26)

The selector now defaults to “Весь мир” and displays the complete 201-country
and territory table directly. Selecting a country, either in the selector or
on the map, replaces the table with its existing share chart. Returning to the
world restores the table and clears the map selection. Remove the separate
table disclosure to keep a single selection flow; the table remains available
without JavaScript. Demographic data is unchanged.

Validation: `npm run verify` passed (99 tests, Astro check, text fidelity).
Browser checks passed for the default world view, Australia selection, return
to all 201 rows, cleared map selection, and Canada selection on the map.
`git diff --check` passed. No commit or push.

## World chart correction (2026-09-26)

The owner clarified that “Весь мир” means worldwide religious shares in the
same bar chart as individual countries, not the country table. Replace the
table with the existing sourced 2020 world-composition dataset. Render the
world chart by default, including without JavaScript; country and map choices
replace its bars, and returning to the world clears the selected map shape.
This supersedes the table behavior in the preceding review note.

Validation: `npm run verify` passed (99 tests, Astro check, text fidelity).
Desktop browser checks confirmed seven world bars by default, Australia shares,
return to world shares, cleared map selection, no table and no page overflow.
`git diff --check` passed. No commit or push.
