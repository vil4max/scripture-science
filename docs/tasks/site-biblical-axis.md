# Biblical comparison axis

Owner: Codex. Owner request: four timeline browser comments, 2026-09-26.

## Scope and decision

Remove the redundant transition callout above the detailed chronology. Center
elapsed-time labels across their rows and identify them as intervals between
events, not durations of a religion.

The owner's latest request supersedes the earlier separation-only presentation:
show a biblical comparison line within the dated chronology. Use one named
Orthodox Septuagint reconstruction (Azbyka's table), visibly distinguished with
a dashed line and labeled rows. This is a religious chronology, not a universal
archaeological dating claim. Add Creation, Flood, Abraham, Exodus, the first
and second Temples, and the Nativity. Keep the existing civil era boundary.
Other creation epochs remain in the existing introductory section.

Explain the Oriental Orthodox branch with concrete church examples, the
Christological dispute and why the division precedes 1054. Do not imply that
these churches deny Christ's humanity or divinity.

## Evidence and acceptance

Opened Azbyka's Septuagint table and both World Council of Churches references.
Keep excerpts and access dates in data, discoverable through Sources. Existing
branch topology must survive interleaved biblical rows, with chronological
ordering and no invented year zero. Inspect desktop alignment, source labeling
and the 451 explanation; finish with `npm run verify` and diff review.

Validation: `npm run verify` passed with 93 tests, Astro check and text fidelity.
The minimum-font check initially caught a 12px label; it was corrected to 13px.
Desktop inspection confirmed the dashed biblical axis, centered interval labels,
no horizontal overflow and readable 451 context. No findings in the final diff
review. Remote checking was limited to the added source pages.

## Unified chronology follow-up

Owner requested one timeline instead of an overview above a detailed timeline.
Remove HistoricalGuide and place its relevant explanations directly beside
existing chronological rows. Keep the earliest archaeological evidence as the
first row, retain the biblical axis and branch graph, and move the alternate
creation-epoch introduction into Sources. Preserve all historical overview
anchors, including `history-nativity`, on their corresponding merged rows.
The named religious reconstruction remains visibly distinguished.

Validation: desktop inspection confirmed one chronology, no duplicate guide,
no horizontal overflow and the retained Nativity anchor. The integration test
checks every migrated anchor occurs exactly once and each mapped row exists.
Final follow-up gate: `npm run verify` passed (93 tests, Astro check and text
fidelity); `git diff --check` passed. Diff review: No findings. Existing source
claims were reused; remote source re-fetch was not run for this presentation change.

## Timeline readability follow-up

Remove the sticky date heading and bottom explanatory/legal blocks. Keep only
an unobtrusive present-day branch endpoint; remove its demographic paragraph.
Move the archaeological object discussion to Sources so artifact dating does
not read as an established origin of religion. The earlier instruction to keep
that item as the first timeline row is superseded by this owner feedback.
Place elapsed intervals in the date column with italic accent text, and give
other religious traditions serif titles distinct from biblical event labels.
Explain the Union of Brest as a partial union preserving the Byzantine rite,
using the reopened UGCC history page; preserve its existing graph connector.

Validation: `npm run verify` passed (93 tests, Astro check, text fidelity).
Desktop browser inspection confirmed date-column intervals, readable union
context, no sticky heading, a compact endpoint, no legal note and no horizontal
overflow. `git diff --check` passed. Diff review: No findings.

## Event explanations follow-up

Owner requested short explanations of unfamiliar event names, using the Union
of Brest as the model. Expand six terse entries: Anglican, Lutheran, Reformed,
Anabaptist, Old Believer and Pentecostal milestones. Explain what happened and
its significance in two or three sentences, retaining dates and branch layout.
Reopened EBSCO, Encyclopedia.com and OCA evidence; added opened LSTC and MWC
sources. The original Encyclopedia.com Anabaptist URL could not be reopened;
new explanatory claims use MWC instead. Existing dating evidence is preserved.

Validation: `npm run verify` passed (93 tests, Astro check, text fidelity).
Desktop inspection confirmed readable explanations and no horizontal overflow.
`git diff --check` passed. Diff review: No findings. New source pages were
opened individually; a sitewide remote-source re-fetch was not run.

## Creation as the narrative starting point

Owner reaffirmed Creation as the beginning of the comparison timeline and
Abraham as the key to understanding Abrahamic traditions. Make this reading
explicit in the page introduction and first milestone, explain Abraham's shared
role, and connect the Exodus to the Sinai covenant. Clarify that the historical
Israel marker is not a single founding date for Judaism. Remove Second Temple
from that early marker's label; its dated biblical milestone remains separate.
Keep the named religious reconstruction and historical dating distinguished;
no new absolute dates or graph ancestry claims are introduced.

Opened the Pluralism Project Abraham entry and Mechon Mamre Exodus 19; attach
proofs to the new biblical context. `npm run verify` passed (93 tests, Astro
check and text fidelity). The existing timeline test confirms Creation is first
and branch connections survive biblical rows. Browser inspection confirmed the
Abraham explanation. `git diff --check` passed. Diff review: No findings.

## Jain and Zoroastrian context

Owner requested brief explanations of Jainism and Zoroastrianism. Add two
sentences under each existing timeline title using the established overview
mapping. Identify the geographic background, named teacher and central ethical
ideas. Retain existing approximate dates and graph structure.

Opened the Pluralism Project Mahavira and Zoroastrianism entries and FEZANA's
introductory leaflet. Jain teaching is described through Mahavira's historical
activity; JAINA pages returned HTTP 403, so no inaccessible evidence was added.
Sources remain available in the central Sources section.

Validation: `npm run verify` passed (93 tests, Astro check and text fidelity).
Desktop browser inspection confirmed both descriptions render as readable
paragraphs. `git diff --check` passed. Diff review: No findings. A sitewide
remote-source re-fetch was not run.

## Testament colors

Owner approved replacing the dashed biblical axis with a solid line in two
colors. Use ochre for Old Testament milestones and blue for the New Testament
narrative beginning with the Nativity. Extend the blue segment to the existing
Pentecost milestone. Add explicit testament labels and a compact legend so
color is not the only distinction. This groups biblical narrative, without
introducing a claim about when the New Covenant was instituted. Preserve the
selected chronology disclosure, dates and all historical branch connections.

Validation: `npm run verify` passed (93 tests, Astro check and text fidelity).
The existing timeline test now checks the testament assignments at Creation,
Nativity and Pentecost. Desktop browser inspection confirmed the solid axis,
color transition, legend and labels in light and dark themes; restored light
theme afterwards. `git diff --check` passed. Diff review: No findings.

## Context for every comparison tradition

Owner rejected title-only tradition rows, pointing to Roman religion. Add short
historical introductions to all nine remaining comparison traditions: Egyptian,
Greek, Roman, Celtic, Germanic/Norse, Slavic, Confucian, Daoist and Shinto. Reuse
the existing context mapping and central Sources collection, preserving dates,
layout and branch relationships. Explain people or places and characteristic
practices rather than padding the row with visual spacing.

Opened evidence from The Met, OpenStax, the National Museum of Denmark, the
Pluralism Project, International Shinto Foundation, Encyclopedia of Religion
and World History Encyclopedia. Unavailable Britannica pages were not used as
new evidence. No sitewide remote-source re-fetch was run.

Validation: `npm run verify` passed (93 tests, Astro check and text fidelity).
Desktop browser inspection confirmed readable Roman, Daoist, Shinto and Norse
context; DOM inspection found no comparison tradition without a context
paragraph and no horizontal overflow. `git diff --check` passed.
Diff review: No findings.

## Compact elapsed-time separators

Owner requested elapsed intervals inside a dashed horizontal divider instead
of a tall date-column row. Render each interval as one centered italic caption
on a 24px separator, with a dashed rule on either side. Keep vertical graph
segments in their original column and spanning the full separator height.
Calendar-era and present-day rows retain their previous layout.

Validation: `npm run verify` passed (93 tests, Astro check and text fidelity).
Desktop inspection confirmed every gap is 24px tall and no caption overlaps a
vertical branch. `git diff --check` passed. Diff review: No findings.

Owner refinement (2026-09-26): interval captions now contain only the elapsed
years, aligned in the date column between adjacent dates. Keep the compact
dashed separator and distinct italic styling.
