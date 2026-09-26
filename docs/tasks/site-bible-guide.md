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
