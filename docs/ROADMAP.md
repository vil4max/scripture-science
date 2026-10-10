# Roadmap

The one place to see what is done, what is in progress and what comes next,
so any session or agent can pick up the work. Each task's detail lives in its
brief under `docs/tasks/`. Update this file in the same commit that changes a
task's state.

## In progress

**M36 — site audit follow-ups** (`docs/tasks/site-m36-audit-followups.md`,
2026-10-10): 307 verified findings on terminology, visuals, navigation,
content, sources and accessibility; a first batch of quick fixes is committed
locally, publishing waits for the owner's word; the brief holds the plan and
the owner decisions needed.

**Three-part reading route** (`docs/DECISIONS.md`, 2026-10-09): one route —
«Основа», «Религии мира», «Сравнение» — in the menu, on the homepage and in a
route bar on each page; «Сходства и различия» forwards to the comparison.
Published on 2026-10-09 (owner: «Пуш»).

**M35 — Creed-based comparison** (`docs/tasks/site-m35-question-compare.md`,
2026-10-09): «Символ веры и различия» goes through the Creed and then the other
differences, comparing Orthodoxy with one chosen religion in three blocks, with
«Этот вопрос у всех», neutral difference lines, the Theotokos under article 3,
and a page «Богослужение и молитва» (services, the daily, weekly and yearly
rhythm, prayer at home, the Psalter, then the full prayer texts). Published on
2026-10-09 (owner: «Пуш»); the daily, weekly and yearly rhythm and two further
prayers («Царю Небесный», the Jesus Prayer) followed the same day (owner:
«Да»). Then published (owner: «Пуш»): the Liturgy as the centre of the
Orthodox answers, example prayers of each religion, «Православная Церковь» in
every difference line, and two Creed questions — the names of the Church and
the other communities (article 9) and Baptism, a like rite with a different
meaning (article 10).

**M34 — reading for a newcomer** (`docs/tasks/site-m34-newcomer-reading.md`,
2026-10-09): a readable glossary with inline hints, a «С чего начать» page,
familiar years beside Creation-era dates, explained classification labels, and
on every tradition page a «Главное» block with one-line card summaries over
folded details. Implemented and verified; the owner authorized committing
and pushing on 2026-10-09. GitHub Actions records the publication result.

## Current baseline

**Progressive reading and demographic consistency**
(`docs/tasks/site-demographic-consistency.md`, 2026-10-01): a short homepage
leads to introduction, origins/development, numbers, map, similarities and
differences, and detailed comparison. Four new pages separate these levels.
Christians are one world category; internal Christian estimates have their own
denominator and never project older shares onto newer populations. Original
dates remain in Sources, with one approximate-data note in the reading route.
Legacy fragments and selection parameters survive. Chronologies use Byzantine
creation years before AD 1 and Christian-era notation thereafter, with an
explicit calendar key and unchanged source excerpts. Node.js 26 verify passes
155 Node tests, two Python tests and 22 pages, with zero Astro diagnostics.
Desktop and iPhone viewport checks pass; physical Safari was not tested.
The owner authorized committing and pushing this iteration on 2026-10-02.

**Reading and evidence improvements** (`docs/tasks/site-reading-improvements.md`,
2026-10-01): all five owner-authorized iterations are implemented and verified.
The site explicitly keeps Orthodox teaching as its foundation, adds 207
searchable question links and persistent reading navigation, a filtered source
catalogue with exact usage attribution, a reading guide and ten readable
pending-verification notes. Desktop and iPhone layouts retain the same content,
URLs and comparison choices. Node.js 26 `npm run verify`: 150 Node tests, two
Python tests, 18 pages and zero Astro diagnostics; links and migration fidelity
pass. Browser checks cover 375, 390, 430, 1280 and 1440 px and both themes;
physical iPhone/Safari testing is not claimed. Sources HTML is 5,075,730 bytes
(489,379 gzip), retaining all evidence. All five iterations are committed, pushed and successfully deployed.

**M33 — detailed analyses and thesis comparison** (`docs/tasks/site-m33-jw-analysis.md`): committed 2026-10-01 and included in the owner-authorized push. Every compared tradition's page carries curated analysis cards (Jehovah's Witnesses 35, Catholicism 31, Protestantism 26, Judaism, Islam, Latter-day Saints and Adventists 25 each), each covering all 15 topics and every comparison proof. The comparison is theses only; disputes moved to tradition pages. Navigation: «Религии мира» (home, with the Orthodox foundation block and the religions table), «Православная вера» (`/orthodoxy/`), «Сравнение», «История», «Священное Писание».

**Repository audit and conservative cleanup** (2026-10-01): implemented and verified; delivery authorized by the owner on 2026-10-01. The source catalogue includes evidence from all seven detailed analyses, keeps passage-level claim attribution and separates further reading and analysis-card coverage. Exact duplicates merge only in presentation; inactive renderers and the unused MDX integration are removed. Node.js 26 and the existing YAML parser are declared directly. `npm run verify` passes 145 Node tests and two Python tests, builds 16 pages, reports no Astro errors, warnings or hints, and checks internal links, anchors and duplicate IDs. Migration remains reproducible: 1028 source text nodes and 14 historical corrections. Desktop checks at 1280 and 1440 px cover both themes, comparison selection and reload persistence, source disclosures and legacy redirects. Existing routes and anchors, source data, images and research records remain intact. Sources HTML grew from 1,730,744 to 5,802,055 bytes (515,149 bytes with local gzip compression); complete evidence and attribution take priority over size. Sequential commits and pushes are now authorized in `docs/tasks/site-reading-improvements.md`.

**M26 — historical delivery** (`docs/tasks/site-m26-orthodox-edition.md`): implemented and verified, with 15 foundations, 105 assessments, 13 disputed questions and 12 legacy topics recorded in the correction register. Orthodoxy is fixed first; Catholicism and Jehovah's Witnesses are the default comparison choices. The original brief records delivery authorization dated 2026-09-27; it does not authorize later changes. The delivery gate passed 114 tests; the existing GitHub Pages workflow records deployment success separately. Independent theological acceptance is not claimed.

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
  Any future commit or push requires its own current authorization.

## Backlog

- **Source catalogue loading cost.** Measure the completed catalogue's browser loading and parsing cost before choosing a separate optimization task. Any reduction in repeated HTML must preserve complete evidence, usage attribution and existing anchors.
- **Non-literal excerpts in existing data** found by the M33 writers; each
  keeps its analysis card `todo` until corrected in `src/data/matrix/` and
  `src/data/orthodox-assessments.json`: Judaism (toldot.com divine-name
  quote, Sefaria Genesis 1:2, toldot holidays page), Islam (Qur'an 17:85 and
  4:157 wording, mosmechet.ru Eid spacing), Latter-day Saints (apostasy
  quote on the wrong page, Holy Ghost wording, a stitched reference list),
  Protestantism (Exodus 3:15 e/yo spelling). Also the Jehovah's Witnesses
  «Проповедь и отчёты» card: the date of the reporting change is unsourced.
- Data doubts to check: mosmechet.ru pages belong to the Historical Mosque,
  not the Cathedral Mosque; «99 имён» in the Islam matrix has no Qur'anic
  number; the Dabru Emet signatory count in views-of-others is unchecked.

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
