# Related positions and three comparison slots

State: implementation complete; reviewed here (see reviews below) with no
blocking findings. Owner's own read-through still pending. Owner approved
both changes on 2026-09-26.
Assignee: Codex. Parallelism: 1. One commit per outcome; no push.

## Approved outcomes

1. Show who shares a specific position while reading a profile or comparison.
   Explain the exact common point, preserve disagreement marks, cite both sides,
   and link to a comparison already filtered to the relevant topic. Connections
   are reciprocal, editorially curated and explicitly non-exhaustive. Do not
   infer whole-religion similarity, scores or matches from wording alone.
2. Replace comparison-page chip selection with three dropdown slots aligned to
   three stable content columns. Options are alphabetically sorted in Russian.
   Preserve empty slots, prevent duplicate selections, allow replacement/clear,
   retain existing one/two/three-tradition dispute rules and shareable URLs.
   Other pages keep their existing selection bar. No dependencies or mobile gate.

## Slice 1: implemented

Nine sourced common-point groups cover seven topics and all eight traditions:
God (three separate aspects), Jesus, Scripture, salvation, resurrection, sacred
images and prescribed fasting. Each member pins exact excerpts already in the
verified matrix; the renderer fails if an evidence reference disappears. Both
sides' citations are rendered and source tiers/access dates remain unchanged.
Evidence can come from another topic when its specific excerpt supports the
claim (LDS resurrection uses the Jesus position). Similarities are not claimed
where the existing excerpts are insufficient; no missing match means difference.

Validation: `npm run verify` passes 82 tests, Astro build/check and the legacy
pair fidelity check. A regression test checks unique members, valid topics,
verified status and every pinned excerpt. Final diff review: No findings.
Browser visual/interaction acceptance remains unavailable in this session due
to the previously recorded localhost denial; no screenshot claimed.

## Slice 2: implemented

Three native dropdowns replace the comparison-page chips. Options use Russian
alphabetical order; chosen traditions occupy their assigned columns in facts,
topics and multi-tradition views/disputes. Clearing a slot preserves other
columns, and options already chosen elsewhere are disabled. A single tradition
still exposes all sides of its disputes and its grouped mutual views.

The shared selection client retains `t` as the compatible selected list.
`slots` records exactly three entries, including empty gaps, for reload/share.
Legacy links fill slots from the left; invalid or stale slot parameters fall
back to `t`. An explicitly empty comparison does not inherit another reader's
saved choice. Other pages retain their existing selection controls. The short
selection hint stays outside the sticky header. Existing narrow-screen
non-sticky behavior is retained; desktop remains the acceptance target.

Validation: `npm run verify` passes 86 tests, Astro build/check (zero errors or
warnings), and legacy pair fidelity. Four regression tests cover gaps,
replacement/duplicates, legacy/stale URLs and reading-link round trips.
Generated HTML confirms three dropdowns, each with the same eight Russian
alphabetical options, and no old comparison selection bar. Final diff review:
No findings.

Desktop browser acceptance is still pending due to saved localhost permission.
Check selection/replacement in each slot, clearing the middle slot, selecting
only slot three, duplicate prevention, reload/share, brief/detail filters,
source return links and scrolling to a dispute under the sticky header.
No screenshot or visual pass is claimed.

## Claude's desktop review of Slice 1 (2026-09-26)

Data and test: `shared-positions.json`'s nine groups each pin excerpts that
already exist verbatim in the cited tradition's verified matrix proof array
(spot-checked several, including the Trinity group, whose Adventist excerpt
correctly reproduces the source's own word-split artifact rather than a
cleaned-up retype); the regression test asserts this for every member, so a
later matrix edit that removes a pinned excerpt fails the build rather than
silently going stale. Every group carries an explicit `note` caveat where the
underlying dispute isn't fully resolved (e.g. Trinity: "различия об исхождении
Святого Духа остаются").

Browser: confirmed on the Orthodoxy profile - "Сходная позиция" renders under
the Trinity position with both sides' citation numbers, the caveat, and a
general "список не исчерпывающий" disclaimer; the comparison link is correctly
pre-filtered (`?t=orthodoxy,catholicism&mode=brief&topic=god#topic-god`). Did
not click through to `/compare/` itself, since slice 2 is actively being
edited there uncommitted at review time; will verify the destination once
slice 2 lands. No blocking findings on slice 1.
