# Roadmap

The one place to see what is done, what is in progress and what comes next,
so any session or agent can pick up the work. Each task's detail lives in its
brief under `docs/tasks/`. Update this file in the same commit that changes a
task's state.

## In progress

- **M26 — authorized delivery** (`docs/tasks/site-m26-orthodox-edition.md`): implemented and verified, with 15 foundations, 105 assessments, 13 disputed questions and 12 legacy topics recorded in the correction register. Orthodoxy is fixed first; Catholicism and Jehovah's Witnesses are the default comparison choices. The owner authorized one consolidated commit and push on 2026-09-27. The delivery gate passed 114 tests; the existing GitHub Pages workflow records deployment success separately. Independent theological acceptance is not claimed.

- **M33 — detailed analysis of Jehovah's Witnesses and thesis comparison** (`docs/tasks/site-m33-jw-analysis.md`): implemented 2026-10-01, awaiting owner review and commit. The Jehovah's Witnesses page (`/traditions/jw/`) carries 35 curated cards covering all 15 comparison topics and every retired pair topic (one card, «Проповедь и отчёты», is `todo`). The comparison is theses only, every column linking to the tradition's page; disputes moved to those pages. Navigation: «Религии мира» (home, opening with the Orthodox foundation block), «Православная вера» (`/orthodoxy/`), «Сравнение», «История», «Священное Писание».

## Current baseline

The earlier Bible guide, comparison reading changes and M25 atlas work were
included in the site migration to this repository on 2026-09-27 (`db15715`).
Their briefs remain historical records, not separate pending implementations.
The world and country views now use charts; the former full-country table is
not the current overview. M26 builds on this baseline rather than replacing it
with the older `religion-map` checkout.

Legacy checkout reconciliation and retirement are complete. All 57 existing
files among its 58 pending changes are byte-identical to canonical `db15715`
and preserved in the recovery snapshot; the removed file is absent in both.
The 33 differences from the current working tree belong to the subsequent
Orthodox edition. The complete old checkout, including Git history and ignored
files, is preserved at `local/retired-repositories/religion-map` under the
Personal workspace. Both agents coordinated the move; the live Claude session
and the canonical preview were preserved. See the M26 brief for verification.

## Next (owner picks the order)

- **Further theological and editorial review of M26.** Review the correction
  register and source passages separately from automated checks; technical
  delivery does not establish independent ecclesiastical approval.
- **Future delivery changes.** The existing remote is
  `https://github.com/vil4max/scripture-science.git`; the site uses GitHub Pages.
  The current edition has explicit commit/push authorization. Later changes
  retain their own delivery authorization boundary.

## Backlog

- Curated analysis cards (M33 format) for Catholicism, Protestantism,
  Adventists, Latter-day Saints, Islam and Judaism; their profiles keep the
  topic-by-topic positions with evidence until then.

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

The commit identifiers below belong to the original unsquashed development
history, preserved with the legacy repository and its recovery bundle.

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
