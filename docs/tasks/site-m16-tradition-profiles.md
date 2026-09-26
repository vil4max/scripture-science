# Task — M16: tradition profiles

State: phases 1–2 approved; phases 3–5 implemented, awaiting one final owner
review (owner authorized separate commits without intermediate stops).
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md`, `docs/DECISIONS.md`,
`docs/tasks/site-m13-sidebar-sections.md`, `docs/tasks/site-m14-selection.md`,
`docs/tasks/site-m19-disputes.md`, `docs/tasks/site-m20-unity-marks.md`.

## Goal

One page per tradition, `/traditions/<id>/`, for all eight traditions in
`src/lib/rules.ts` `TRADITION_IDS`: everything the site already says about
that tradition, in one place, read top to bottom. The site today shows a
tradition only next to others (compare, disputes, timeline); a profile lets a
reader study one.

## Scope

Assembly only. Every word and proof comes from data that already exists and
is already verified: `src/data/matrix/<id>.yaml`, `src/data/disputes.yaml`,
`src/data/views-of-others.yaml`, the timeline data (`src/lib/timeline.ts`,
`src/data/lineage.json`), `src/data/sources.yaml`. No new claims, no new
research, no edits to content files. Reuse existing components
(`TopicPosition`, `Dispute`, `ViewTile`, `ProofLink`, `TraditionCard`) and
`src/lib/content.ts` loaders before writing new ones.

## Phases (one commit each)

1. **Page and header — pilot.** `src/pages/traditions/[id].astro` with
   `getStaticPaths` over the eight ids; header: name, full name, family,
   `since` with its proof, the tradition's colour. Link each card on «Обзор»
   (`TraditionCard`) to its profile. Stop after this phase and report; the
   owner checks one profile before phases 2–5 (pilot-first rule).
2. **Positions.** The tradition's positions on the fifteen topics in
   `TOPIC_ORDER`, each with its quote/scripture, proof and unity mark, as on
   «Сравнение» but one column.
3. **Disputes and views.** Disputes the tradition takes part in (all sides
   shown, as `disputeView` does for one chosen tradition); what it says about
   others and what others say about it (`views-of-others.yaml`).
4. **Chronology.** Its dated entries from the timeline data, oldest first,
   with a link to «Хронология» with this tradition selected (`?t=<id>`).
5. **Sources.** Every source URL the profile cites, once each, with tier,
   as a closing list.

## Rules

- Desktop first; at phone width (375px) nothing may overlap or scroll
  sideways.
- Text is Russian, as the rest of the site; code comments English.
- Internal links go through `src/lib/paths.ts` (`withBase`); never glue to
  `BASE_URL` (`scripts/links.test.ts`).
- Keep it light (owner: personal page): no new test files or mechanisms
  unless a phase cannot be checked otherwise.
- Do not add a sidebar item; how profiles are reached beyond the cards is
  the owner's later decision.

## Review loop

Phase 1 is approved by the owner with no findings. All eight profile headers
reuse the matrix data, sourced family classifications, date formatter and
proof links; overview card names link to the profiles. `npm run verify`
passed (61 tests, no Astro errors or warnings), and generated HTML was checked
against the existing header data, proof URLs and overview links for all eight
traditions. Desktop and 375px visual review is not run: browser access is
blocked by the saved browser permission.

Phase 2 is approved by the owner. Profiles show all fifteen
topics in `TOPIC_ORDER` using `MatrixPosition`, extracted from `Comparison`
with its existing styles, quote/scripture rendering, proof exclusions and
unity marks. The legacy `TopicPosition` has a different data shape and is
unchanged. `npm run verify` passed (61 tests, no Astro errors or warnings).
Generated HTML checks confirmed all 120 comparison position bodies retain
their structure, text and links, and each profile matches its fifteen
comparison positions in order. Visual review remains blocked by the saved
browser permission. The owner authorized phases 3–5 as separate commits with one final review.

Phase 4 association rule, confirmed by the owner: include entries
explicitly tagged with the tradition, shared ancestors reached through its
parent chain, and unions whose endpoints include one of its explicitly tagged
nodes, with shared ancestry and unions labelled as such.

After each commit, report: the commit hash, what changed, `npm run verify`
result, and anything narrowed or skipped. Claude reviews each commit (diff,
gate, screenshots at desktop and 375px) and the owner relays findings;
a finding marked blocking is fixed before the next phase.

## Acceptance

- `npm run verify` passes after every phase.
- `/traditions/<id>/` builds for all eight ids and every card on «Обзор»
  links to it.
- Each profile's text and proofs match what the same data shows elsewhere
  on the site.
- Five commits, one per phase; no push.

## Final implementation review

Phase 3: profiles reuse `Dispute` and `ViewTile` for all relevant disputes
(with every side), outgoing documents and incoming documents. Empty sections
explicitly describe the current site coverage. The JW note follows all
rendered participants. Profile view chips wrap on phones. `npm run verify`
passed (61 tests); generated HTML checks passed for all eight profiles,
including exact dispute/document counts and all rendered summaries.
Visual review remains unavailable because browser permission is blocked.

Phase 4: profiles reuse parsed and validated lineage, `buildChronicleRows`,
and both date formatters. The confirmed association rule selects explicitly
attributed rows, parent-chain ancestors and unions touching explicitly tagged
nodes. Shared history, unions and tradition-specific epochs are labelled;
rows stay oldest first and link to the selected timeline. Existing row proof
and unverified markers are preserved. `npm run verify` passed (61 tests);
independent generated HTML checks confirmed membership, order, ancestor/union
labels and selected links for all eight profiles. No self-view events or
unattributed epochs were inferred beyond the confirmed row association rule.

Phase 5: the closing source list deduplicates every rendered citation URL,
including incoming views, all dispute sides, unity proofs and chronology.
Exact-URL metadata comes from existing proofs and the source registry; uncited
catalog entries are not added. `npm run verify` passed (61 tests). Generated
HTML checks confirmed exact equality between cited URLs and unique closing
list URLs for all eight profiles (27–79 entries). Temporary aggregation checks
covered duplicate URLs, catalog lookup, missing tiers and uncited exclusion.

Narrowed: two quote URLs have no exact-URL tier in the existing metadata:
`https://api.quran.com/api/v4/quran/translations/20?verse_key=3:64` and
`https://gc.adventist.org/documents/ecumenical-movement/`. They remain listed
with an explicit unspecified-tier label. No tier, proof or content was
invented; resolving those metadata gaps requires a separate content change.
No new claims, content-file edits, dependencies or permanent tests were added.
Desktop and 375px screenshots remain unavailable because browser access is
blocked. All three phase diffs received defect review with no findings;
final owner review is still pending. No push.
