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

## Owner simplification (2026-09-26)

Use one full reading view with quotations and unity explanations always visible.
Remove the brief/detail switch and its explanatory copy; preserve the topic
filter and selection behavior. Legacy mode parameters are ignored and removed
when normalizing links, preserving traditions, empty slots, topic and anchors.
The introduction is a single short instruction. Remove the dispute-selection
hint. Rename the facts section to Core facts and render its rows as distinct
bordered blocks with larger, high-contrast headings on tinted backgrounds.
No claim data or dispute-selection rules change.

Validation: `npm run verify` passed (95 tests, build, Astro check and text
fidelity). `git diff --check` passed. Desktop browser review confirmed old
brief URLs normalize, all selected quotes remain visible, topic filtering
works, and clearing the middle slot preserves columns one and three. Reviewed
block headings in light and dark themes; no horizontal overflow. Diff review:
no high or medium findings. Changes remain local and uncommitted; no push.

## General-to-specific reading order (2026-09-26)

Move classification to the first facts block and render each tradition's
broad-to-specific path as an ordered vertical list. Reuse the existing
Abrahamic-family and classification evidence; preserve prose classifications
for other pages. Restorationist movements retain their distinct classification
rather than being placed under Protestantism. Follow with origins, population,
scripture and self-description, then topic-level comparisons. Remove the
editorial introduction before the topics, as requested by the owner.

Validation: `npm run verify` passed (95 tests, Astro build/check and text
fidelity) after correcting the shared citation type. `git diff --check` passed.
Desktop browser review confirmed classification is first, the three selected
hierarchies occupy their correct columns, the topics introduction is absent,
and the page has no horizontal overflow. Changes remain uncommitted.

## Topic heading cleanup (2026-09-26)

Remove visible topic permalink controls. Preserve section IDs and topic-filter
URLs so existing deep links continue to work. Shorten the shared Russian topic
labels to Icons and Holidays across headings, filters and the comparison table.
The topic identifiers and position content remain unchanged.

Validation: `npm run verify` passed (95 tests, Astro build/check and text
fidelity); `git diff --check` passed. Browser inspection confirmed zero links
inside topic headings, both shorter labels, and the existing images deep link
still selecting and revealing its topic. Changes remain local and uncommitted.

## Single comparison flow (2026-09-26)

Remove the duplicate all-traditions table and the separate pair-document link
section. Integrate the corrected Orthodox/Jehovah's Witnesses material into the
existing topics, with historical context before them and references afterward.
Show these additions only when both traditions are selected. Preserve selected
column positions for the additional biblical arguments, namespace embedded
anchors, and keep corrections and citations reachable within the page. Reuse
the archive's correction pipeline so its preserved version remains verifiable.
Remove the comparison page's legal footnote and its markers at owner request.

Validation: `npm run verify` passed (97 tests, Astro build/check, and the
archive's 1,028-node text fidelity check with 14 corrections). Added integration
checks for all twelve embedded arguments, unique IDs, correction destinations
and SVG marker references. `git diff --check` passed. Desktop review confirmed
selection-dependent visibility, reversed three-column positioning, working
anchors, no duplicate table/legal note, and readable light/dark themes. The
old pair URL remains available as a preserved archive. No high or medium
findings in the final diff review. No commit or push.

## Unified reference page (2026-09-26)

Merge the glossary into `/sources/#terms` and use one tertiary navigation
entry, Terms and sources. Add local jumps to terms, data notes and sources.
Keep the old `/terms/` URL as a redirect preserving the query parameters;
provide a normal destination link when JavaScript is unavailable. Existing
source anchors and the source catalog remain unchanged.

Validation: `npm run verify` passed (97 tests, Astro build/check and text
fidelity); `git diff --check` passed. Browser verification confirmed all seven
terms and the source catalog on the merged page, one reference navigation
entry, and the legacy URL redirect retaining selected traditions. No commit
or push.

## Continuous topic reading (2026-09-26)

Remove the topic selector and filtering behavior. All fifteen topics remain in
the reading flow. Legacy topic query parameters become scroll anchors when
no anchor exists; existing topic, question and embedded pair anchors retain
priority. Normalize away mode/topic parameters while preserving selection and
slots. Shared links use anchors only.

Validation: `npm run verify` passed (98 tests, Astro build/check and text
fidelity); `git diff --check` passed. Browser verification confirmed the selector
is absent, all fifteen topic sections remain visible, and a legacy topic-only
URL scrolls to its heading while preserving traditions and slots. No commit
or push.

## Quran overview (2026-09-26)

Replace the comparison's translation details with the scripture name and a
short origin summary. Distinguish Muhammad's reception of revelation in Islamic
tradition (610–632) from codification under Uthman (around 650), citing the
University of Birmingham. An optional scripture overview leaves the edition
metadata available to the scripture guide and other existing consumers.

Validation: `npm run verify` passed (98 tests, Astro build/check and text
fidelity); `git diff --check` passed. Desktop browser review confirmed the
Quran title and origin paragraph in the selected Islamic column. No commit
or push.

## Tanakh overview (2026-09-26)

Use the existing scripture overview for Judaism: Tanakh, its three divisions
and 24 books, approximate composition period, and attributed authorship in
Jewish tradition. Yale's introductory lecture supports the historical range;
Toldot and Chabad support the structure and traditional attribution. Keep the
translation metadata for existing scripture-guide consumers.

Validation: `npm run verify` passed (98 tests, Astro build/check and text
fidelity); `git diff --check` passed. Desktop review confirmed the overview in
the Judaism column alongside the Quran overview. No commit or push.

## Topic section heading (2026-09-26)

Rename the comparison topic section to Faith and practice. The concise heading
describes its content without counting topics or repeating the page purpose.

Validation: `npm run verify` passed (98 tests, Astro build/check and text
fidelity); `git diff --check` passed. Desktop browser review confirmed the new
heading above the topic cards. No commit or push.

## Readable interfaith views (2026-09-26)

Lead document cards with their position summary and a short authority label.
Keep document metadata, authority explanation and quotation in a native Details
disclosure. Remove route chips; multi-selection already identifies the speaker
by its column and the subject by the pair heading. Other selection modes retain
plain-text speaker and subject attribution. Empty pairs read No data without
implying that a documented opinion exists.

Show all quotations in Russian. Preserve English excerpts in data and label
editorial translations explicitly. Quran quotations use Kuliev's Russian text,
retrieved directly from Quran.com's translation 45 API for 3:64 and 3:78 on
2026-09-26; their quotation URLs now point to that translation. Original
supporting evidence stays available in the source catalog.

Validation: `npm run verify` passed (98 tests, Astro build/check and text
fidelity); `git diff --check` passed. Desktop review confirmed no route chips,
compact empty states, initially collapsed details, Russian quotations and the
working Quran disclosure. No commit or push.

## Narrative revision — 2026-09-26

Owner annotations authorize local editorial changes across comparison, Scripture,
profiles and the reference page. Keep origin dates as successive milestones;
withdraw the earlier Catholic translation diagnosis. Make the Christian editorial
perspective explicit while retaining each tradition's own source attribution.

Group the fifteen topics into revelation, salvation and religious life, with
anchor navigation and no topic filter. Shorten long position summaries, remove
repeated shared-authority notices and preserve explicit disagreements. Translate
foreign excerpts with a visible editorial-translation label and original text
retained in data. Pair-specific evidence is consolidated by topic and side;
repeated general theses are omitted while all biblical arguments remain available.
Supplementary history and reference material uses disclosures. The original pair
document and its text-fidelity gate remain intact.

Show author and date before document disclosures, qualify missing evidence as
absence from this selection, move profile history before beliefs and practices,
and organize source lookup by tradition and topic without deleting the catalog.
Acceptance: topic and source anchors resolve, selected columns remain aligned,
foreign matrix excerpts render in Russian, and author/date remain visible.

Validation: `npm run verify` passed (build, Astro check, 101 tests and text
fidelity: 1028 original nodes, 14 registered corrections). `git diff --check`
passed. Desktop browser checks confirmed the three-group comparison contents,
resolved topic/source anchors, Russian excerpts, expanded source lists, profile
history before positions and chronological Scripture bridges. No horizontal
overflow was observed on the checked comparison/reference views. Original pair
arguments remain available in disclosures. Changes remain uncommitted on main;
no publication was performed.

### Unified comparison reading (2026-09-27)

Owner feedback authorizes a page-level reading redesign: retain useful detailed
arguments, apply the same presentation to all eight traditions, eliminate the
separate legacy design and duplicate history scales, and make document lists
readable. Scope: comparison components, supporting history context and regression
checks. No dependencies or original-source changes. Each topic starts with its
position and exposes evidence on demand. Disputes compare the selected traditions
on one aligned row; missing dispute-specific evidence is labelled rather than
invented. Relationship documents appear once per author with selected recipients.
Preserve existing selection, order, empty-slot and deep-link behavior. Verify with
`npm run verify` and desktop browser checks of three traditions, reordered slots,
missing evidence, disclosures and direct question links. No commit/push authorized.

Validation for unified comparison reading: `npm run verify` passed (build,
Astro check, 105 tests, and original-text fidelity: 1028 nodes / 14 corrections).
Browser checks covered the three-column Trinity discussion, topic-position
fallback for Adventists, an empty selection slot, reordered continuity columns,
and deduplicated relationship documents with per-target missing-data notices.
No horizontal overflow was observed at the desktop viewport. Historical
milestones and preserved archive anchor destinations are covered by generated
HTML tests. Equal research depth for every tradition is not claimed: missing
question-specific research is explicitly distinguished from sourced topic
positions. No commit or push was made.

### Reading approaches follow-up (2026-09-27)

Retain the useful “Two approaches to one Book” synthesis under interpretation,
using the same disclosure and selected-column layout as continuity. Preserve
the existing corrected wording; link the additional voices to the complete
source document instead of duplicating that anthology on the comparison page.
Acceptance: the synthesis appears only with both relevant traditions selected,
aligns to their slots, and its complete-document anchor resolves.

Validation: `npm run verify` passed with 106 tests and the unchanged original-text
fidelity check. Browser inspection confirmed the deep link opens the disclosure,
with the two positions aligned beneath their selected tradition columns.
`git diff --check` passed. No commit or push.

### Reference catalog follow-up (2026-09-27)

The comparison bibliography and correction catalog belong on Sources. The
comparison already omits both legacy blocks; expose them directly in two
closed disclosures on Sources, add a contents link, and deduplicate correction
proof URLs. Preserve the full corrected document and its return anchors.
Acceptance: no legacy bibliography/correction catalog on Compare; all 14
corrections and the existing bibliography available on Sources.
