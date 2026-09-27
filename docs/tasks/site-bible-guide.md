# Scriptures guide

Owner naming update (2026-09-26): use “Писания” in navigation, the homepage
reading route and the page title. The introduction covers the existing
cross-tradition scripture comparison while explicitly identifying formation
and canon sections as Bible-specific. Keep `/bible/` for link compatibility.
This rename does not assert that the Quran is a Bible translation or add a
historical derivation claim; new historical content requires its own evidence.

State: implementation complete and ready for owner review. Owner approved the scope and tradition-specific canon terminology on 2026-09-26. No push or publication.
Assignee: Codex. Parallelism: 1.

## Intent

Add a desktop-first Bible guide for a reader aged about 15. It must answer where
the Bible came from, why it is a collection rather than one authored volume,
how manuscripts, canons and translations relate, which books different
traditions recognise, and how each tradition reads and interprets Scripture.

The guide is a new primary site section. It reuses the verified `scripture` and
`authority` matrix positions instead of maintaining a second summary of each
tradition's teaching.

## Required outcomes

1. A short historical route distinguishes composition, manuscript transmission,
   canon recognition and translation.
2. A visual canon comparison names the disputed book group and attributes every
   label: Orthodox longer canon, Catholic deuterocanonical books, and
   Protestant/Jehovah's Witness terminology. No one vocabulary is presented as
   neutral for every tradition.
3. Every detailed tradition shows the same three questions: recognised
   Scripture, the Russian text or edition used on this site, and who interprets
   it authoritatively.
4. Sources are collected in the Sources tab without inline citation markers
   (owner's subsequent presentation decision). Historical claims use scholarly or institutional reference
   sources; confessional claims use each tradition's own sources.
5. The page is linked from the primary sidebar and the homepage reading route.

## Constraints and risks

- Book counts differ because some traditions combine or divide the same texts;
  concrete book groups and counting conventions matter more than headline totals.
- Orthodox local churches and editions do not all describe the longer Old
  Testament identically. The first slice states only what its named Orthodox
  source supports and avoids claiming one exhaustive universal list.
- Traditional attribution and modern historical authorship are separate layers.
  The introductory answer says there was no single human compiler; it does not
  adjudicate the authorship of every biblical book.
- Modern translations are copyrighted. Use short source excerpts and links,
  never reproduce chapters or long parallel passages.

## Acceptance

- `npm run verify` passed on 2026-09-26: 15 pages built, 87 tests passed,
  Astro reported no errors, warnings or hints, and text fidelity passed.
- Desktop browser review at `localhost:4322` confirmed readable source links,
  canon rows and tradition cards in light and dark themes.
- The rendered Bible page has 116 unique anchors, no missing local anchor
  targets and a working primary navigation link.
- Diff review found no high or medium correctness or source-attribution defect.
- Removed the inherited Catholic summary's misleading "noncanonical" label;
  the shared matrix now retains the canon counts stated in Catechism §120.
- Owner authorised committing this slice on 2026-09-26 with an explanatory
  commit body. No new runtime dependency or push.

## Owner revision: chronological reading route (2026-09-26)

Replace the conceptual cards and isolated manuscript/translation examples with
one chronological route: Torah in Jewish tradition, Septuagint, New Testament,
Sinaiticus, Quran, printing, Erasmus, and the Synodal translation. Each entry
identifies its period, location and participants and explains its significance.
The first entry labels sacred narrative rather than inventing a manuscript date.
The Quran has its own labelled, offset Islamic branch; chronology implies no
Christian affiliation or derivation. The modern endpoint compares canon choices
in wide definition rows, then groups all eight tradition references by family.
Full matrix-backed scripture, translation and authority details remain available
in native disclosures. Remove the redundant boundary and questionnaire prose.

Evidence: new institutional references were opened on 2026-09-26 (Orthodox Union,
George Mason OLLI, CSNTM, Codex Sinaiticus Project, Harvard Pluralism Project).
Their URLs, excerpts and dates are stored in bible-guide.json and collected on
Sources. Historical transmission and religious accounts are labelled separately.
The existing broad source re-fetch limitation of the project gate remains.

Validation for this revision: `npm run verify` passed (94 tests, Astro check,
static build and text fidelity); `git diff --check` passed. Desktop browser
review confirmed eight historical entries plus the modern endpoint, all eight
tradition disclosures, working expansion of Islam, no horizontal overflow, and
readable light/dark views. Diff review: no high or medium findings. Changes
remain local and uncommitted; no push or publication.

Owner follow-up (2026-09-26): remove the legal footnote from the Scriptures
reading page as distracting secondary information. Other pages are unchanged.
# Slavonic and modern translations (2026-09-26)

## Integrate tradition explanations (2026-09-26)

Replace the separate encyclopedia-like tradition section with short contextual
notes attached to the relevant timeline events. Cover all eight traditions
exactly once; identify the notes as present-day practice to avoid attributing
modern denominational positions to ancient authors. Keep detailed positions
and evidence in the existing comparison data and source catalog.

Add the Book of Mormon's first publication in 1830 with evidence from the
Church History Library and Joseph Smith chronology. Give it a separate
scripture label rather than presenting it as a Bible translation. Integrate
the Latter-day Saint canon explanation here and the Jehovah's Witness canon
and authority explanation with the New World Translation event.

Validation: `npm run verify` passed (99 tests, Astro build/check and text
fidelity); `git diff --check` passed. Added a coverage check ensuring every
tradition appears once and every note refers to an existing event. Desktop
review confirmed all eight notes, the absent standalone section and readable
Book of Mormon context. No commit or push.

Add Cyril and Methodius and their disciples to the ninth-century chronology,
before printing. Describe the Moravian mission, Gospel readings and Psalter,
and continuation in Bulgaria without presenting this as a modern Russian
translation. Evidence: Presidential Library and the Vatican's 2009 account.

Interpret the owner's modern/new-Christian translation request to cover both
community-specific and contemporary Russian editions, pending clarification.
Add the Russian New World Translation (2007, with its later edition explained)
and the Russian Bible Society's Contemporary Russian Translation (2011).
Publisher pages support the dates and translation basis. Keep these events
separate from the present-day canon comparison.

Validation: `npm run verify` passed (98 tests, Astro build/check and archived
text fidelity); `git diff --check` passed. Desktop visual review confirmed all
three new events and readable chronology. No commit or push.

## Narrative bridges — 2026-09-26

Add sourced stages for the formation of the New Testament canon, Jerome's Latin
Vulgate and Luther's translation, linking manuscript transmission to print and
modern translations. Place complete editions chronologically: the Book of Mormon
in 1830, the Synodal Bible in 1876, the English New World Translation in 1961,
and the Modern Russian Bible in 2011. Russian editions remain explained in the
relevant entry. Separate new scripture from translation and canon from wording.

Validation: `npm run verify` passed (build, Astro check, 101 tests and text
fidelity: 1028 original nodes, 14 registered corrections). `git diff --check`
passed. Desktop browser checks confirmed the three-group comparison contents,
resolved topic/source anchors, Russian excerpts, expanded source lists, profile
history before positions and chronological Scripture bridges. No horizontal
overflow was observed on the checked comparison/reference views. Original pair
arguments remain available in disclosures. Changes remain uncommitted on main;
no publication was performed.
