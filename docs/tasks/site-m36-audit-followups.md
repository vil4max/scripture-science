# M36 — site audit follow-ups (handoff)

State: done and frozen on 2026-10-14. All 307 audit findings are closed —
fixed, partly fixed or declined with a reason — in
`docs/research/site-audit-2026-10-10-closure.md`. The live site matches
`main`; nothing is in flight.

## Authorization and scope

2026-10-10, owner: «анализ сайта + пересмотр визуального сопровождения,
полный аудит на соответствие терминов + предложения по улучшению»; then
«продолжи и закончи»; this session is the main hobby session for the site
and keeps its own handoff. 2026-10-14: «заканчивай все — запиши отчет для
истории — пуш — и проект на фриз», then «закончи все правки что есть —
проект должен быть стабильным перед заморозкой и беклог чистым» and
«продолжай и доделай всё, потом пуш». Owner decisions of 2026-10-14 are in
`docs/DECISIONS.md` ("Audit decisions").

## Evidence

- Workflow run `wf_a588de0e-d19` (all agents on Opus): 12 dimension auditors
  (terminology T1–T5, visuals V1–V3, site S1–S4), one skeptic per dimension,
  a completeness critic and four gap auditors (G1 statistics, G2
  confessional classification, G3 Orthodox practice, G4 claim–excerpt
  support), then a synthesis.
- 307 verified findings (208 confirmed, 99 partly): high 9, medium 117,
  low 181. Full list: `docs/research/site-audit-2026-10-10-findings.json`.
- The owner-facing Russian report and raw results stay outside the
  repository (`~/Developer/dev-bank/2026-10-10/scripture-science-site-audit/outputs/`).

## What changed (summary)

- Claims rest on their own excerpts (G4); terminology follows one table and
  the owner's naming decisions, with tests for the Orthodox Church naming,
  the Filaret catechism titles (one title, a § for every excerpt), one tier
  per source URL and excerpted classification badges.
- Navigation: tradition pages in the route with a next step, the analysis
  before a folded chronology, contents on orthodoxy/, a homepage that leads
  into each religion, cross-links between related questions, search over
  the comparison and worship questions.
- Sources: the filterable catalogue moved to `sources/catalog/` (sources/
  from 4.1 MB to 1.5 MB), now complete with the extra questions, prayers and
  basics; readable labels, Russian dates, `lang="en"` on English excerpts,
  readable Qur'an links.
- Visuals and phones: contrast, tap targets, no flash of open menus, a
  timeline that narrows instead of squashing, a Creed map, the parts of the
  Liturgy, the seven Sacraments, canon bars, a lineage tree, a week strip and
  a baptism table, all from sourced data; phone-size image copies.
- Statistics name their years and methods; classification badges cite the
  2000 Council document (§6.3 criterion), the 1994 Council or a labelled
  encyclopedia.

## Resume

Start from the closure file for what was deliberately left (the icon's
source, the retired pair diagrams, new photos, a year-cycle visual, two
code refactors). Each change: edit, `npm run verify` with Node 26
(`PATH=/opt/homebrew/bin:$PATH`), a browser check at 375 px, an English
Conventional Commit; publish only on the owner's word.
