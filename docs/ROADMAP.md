# Roadmap

The one place to see what is done, what is in progress and what comes next,
so any session or agent can pick up the work. Each task's detail lives in its
brief under `docs/tasks/`. Update this file in the same commit that changes a
task's state.

## In progress

- **Bible guide** (`docs/tasks/site-bible-guide.md`): the new primary section explains composition, manuscripts, canon terminology, Russian translations and each tradition's use of Scripture. Implementation complete; ready for owner review. Local commit authorised; no push.

- **Related positions and comparison slots** (`docs/tasks/site-related-comparison.md`): both outcomes implemented (86 tests): sourced related-position hints and three stable alphabetically ordered dropdown slots. Desktop visual acceptance remains pending. Codex, no push.

- **World diagram subdivisions** (`docs/tasks/site-world-hierarchy.md`): one approximate current diagram uses 2026 WCD estimates with explicit normalization of Christian category weights; 2020 Pew statistics remain a table beside the map. Local verification and desktop review at 1280/1440 px passed (86 tests); one duplicate-tab-stop defect was repaired in `f08307c`. Review notes remain uncommitted; no push.

- **M25 — historical atlas ready for proofreading** (`docs/tasks/site-m25-historical-atlas.md`): all six implementation slices complete, 79 tests and static link/source checks pass. Desktop visual and interaction acceptance remains pending. Codex, no push. The brief records source limits, the repaired YAML-loader defect and the remaining desktop review matrix. Follow-up: the world overview now has one 2026 diagram; the 2020 map and table remain alongside it.

## Next (owner picks the order)

- **Further disputes.** Topics are agreed with the owner first
  (`docs/tasks/site-m19-disputes.md`); thirteen exist across the topics
  listed there.
- **Owner review of the M20 unity marks** across the site.
- **Publication on GitHub Pages.** Needs a GitHub repository (private
  first), the owner switching it to public, and the orchestrator's
  `APPROVED` for the push. The repository has no remote yet.

## Known issues (not scheduled)

- Baptist live confession still times out and its Wayback attempt 404s
  (archive lookup also rate-limited); the existing constituent-church mirror
  stays cited instead. Live rchve.ru still times out; its cited archive is
  verified.
- Adventist `worship`-topic quote still has one source word-split difference
  (checked, `rules` was the same pattern and is now fixed): invisible in
  normal reading (a soft hyphen, U+00AD, not a literal space), so left as is
  rather than adding a non-printing character to the data.
- The pair page's Rev 7:4 source link stays on ekzeget.ru (blocked in
  Ukraine): its Wayback copies carry no commentaries.

## Done

| Task | Brief | Last commit |
|---|---|---|
| M1 — migrate the Orthodoxy ↔ JW document | `site-m1-migration.md` | 8c61ceb |
| M2a — main page, comparison, site frame | `site-m2-main-page.md` | e68aca8 |
| M2b — timeline with the tree of separations | `site-m2-timeline-tree.md` | e68aca8 |
| M3 — comparison content across traditions | `site-m3-matrix-content.md` | 1c94f7f |
| M4 — views of others and the terms box | `site-m4-views-terms.md` | e68aca8 |
| M5 — reading layout on the home page | `site-m5-reading-polish.md` | 28b889d |
| M6 — readable, complete timeline tree | `site-m6-timeline-reading.md` | c0f653a |
| M7 — visible, sourced corrections on the pair page | `site-m7-pair-corrections.md` | 13ce26d |
| M8 — world composition pie chart | `site-m8-world-composition.md` | 3cbe112 |
| M9 — tradition cards as desktop rows | `site-m9-desktop-cards.md` | 665a7e4 |
| M10 — comparison positions as desktop rows | `site-m10-desktop-rows.md` | e12995e |
| M11 — vertical chronicle | `site-m11-vertical-timeline.md` | e781a37 |
| M12 — distinct pie colours | `site-m12-pie-colors.md` | 3cbe112 |
| M13 — sections as pages with a sidebar | `site-m13-sidebar-sections.md` | fefc809 |
| M14 — read one tradition or compare up to three | `site-m14-selection.md` | 4efd3c7 |
| M18 — «Пост и аскетика» as its own topic | `site-m18-fasting.md` | 5d6b9ae |
| M19 — disputes with each side's answer | `site-m19-disputes.md` | ce1a542 |
| M20 — unity marks across the site | `site-m20-unity-marks.md` | dafafcb |
| M21 — Filioque, papal primacy, saints | `site-m21-more-disputes.md` | 996afb5 |
| M22 — justification, Scripture/Tradition, divine name, end times | `site-m22-more-disputes.md` | 4d65a46 |
| M23/M24 — Christian denominations, organisation audit, source fixes | `site-m23-christian-denominations.md`, `site-m24-pre-publication-audit.md` | ed22498 |
| M16 — tradition profiles | `site-m16-tradition-profiles.md` | eacccd5 |

M15 and M17 were never used as task numbers.

Landed without a brief (2026-09-26): corrected patristic quotes on the pair
page (5950963); blocked source links pointed at archived copies (6bcd710);
sections renamed «Обзор» and «Хронология» (4203028); after M21, merged §
labels on shared source links (c16208c), a hint on dispute filtering
(c146d96) and a phone fix for the comparison header (2baaa3b). M16 was built
by Codex from its brief, reviewed here each phase (gate, diff, desktop and
375px screenshots). After M22: shortened the sidebar brand and separated
reference links (a29854a), made the population-figure aside read as
secondary (e964e5e), and broke the Orthodoxy/Catholicism ordering tie by
East before West instead of alphabetically (d36ebbf); after M24, matched
two more source word/character mismatches it flagged but left out of
scope (738227e, 7d6cba5).
