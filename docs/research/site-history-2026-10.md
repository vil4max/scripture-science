# Site history, 2026-10-09 to 2026-10-14

A record of what changed in this stretch, before the owner froze the project
on 2026-10-14. Decisions are in `docs/DECISIONS.md`; open work is in
`docs/tasks/site-m36-audit-followups.md`.

## Comparison grounded in the Creed (M35)

- «Символ веры и различия» goes through the twelve Creed articles: each
  question quotes its article, explains it plainly, then the chosen religion's
  teaching and «Православный взгляд на расхождение»; the other differences
  follow. Difference lines are neutral and name «Православная Церковь».
- Questions added under the Creed: the Theotokos (article 3), how each
  community names itself (article 9), Baptism — a like rite with a different
  meaning (article 10). The Holy Spirit is discussed once, under article 8.
- «Богослужение и молитва» compares common worship (the Liturgy as the
  centre), the daily, weekly and yearly rhythm, prayer at home, example
  prayers of each religion and the Psalter, and ends with seven Orthodox
  prayers in Church Slavonic and Russian.
- Practice descriptions may rest on reference sources (`docs/SOURCES.md`);
  doctrine still comes from each tradition's own texts.

## Navigation

- One reading route in three parts — «Основа», «Религии мира», «Сравнение» —
  drives the menu, the homepage and a route bar on each page; the duplicated
  «Сходства и различия» and the separate «Молитвы» page forward to their new
  places; the last step ends the route with ways to go on.
- On phones the menu is a drawer with a floating button; a 404 page and a
  skip link were added.

## Audit (M36)

- 2026-10-10: a multi-agent audit (Opus) of terminology, visuals, navigation,
  content, sources, accessibility, statistics, classification, practice
  attribution and claim support: 307 verified findings, saved in
  `docs/research/site-audit-2026-10-10-findings.json`.
- Fixed and published: glossary hints no longer land on other churches'
  names or hidden blocks; the iPhone picker shows the chosen religion;
  classification badges state their basis (the JW badge as an encyclopedia
  assessment, the LDS badge on the 1994 Bishops' Council act); Russian Church
  practice is attributed as such, with the preparation for Communion per the
  2016 document; small factual fixes (the Liturgy's three parts, the
  Wednesday fast, the Creed quotation, St John of Damascus); an empty section
  removed; long explanations split into paragraphs; terms normalised; three
  summaries narrowed to their excerpts; the number of Orthodox Christians
  (about 293 million, World Christian Database 2026) shown on the numbers page.
- Search was checked on the live site and at 375 px and works; the
  recommendation is to keep it and extend it to the comparison questions.

## Finishing the audit (2026-10-14)

- The owner asked to finish every fix before the freeze and answered the
  open questions (`docs/DECISIONS.md`, "Audit decisions"): «Православная
  Церковь» on the tradition pages too, the label «Православный взгляд на
  расхождение», the capitalisation of the Liturgy and the Sacraments, and
  the remaining naming points by the audit's proposals.
- Claims G4-5 to G4-25 rest on their own excerpts; the terminology table is
  applied with tests (Church naming, one catechism title with a § for every
  excerpt, one tier per URL, excerpted classification badges).
- Navigation, search over the comparison questions, a lighter sources page
  with a separate catalogue, canonical links and a sitemap, data years on
  the statistics, sourced classification badges, contrast and phone fixes,
  and new visuals from sourced data (Creed map, Liturgy parts, seven
  Sacraments, canon bars, lineage tree, week strip, baptism table).
- The ten analysis cards left «уточняется» since M33 are corrected and
  verified; the roadmap backlog is empty.
- Closure of all 307 findings: `docs/research/site-audit-2026-10-10-closure.md`.

## State at the freeze

- Live site and `main` match; `npm run verify` passes (177 Node tests,
  27 pages, zero Astro errors, links and text fidelity).
- Left on purpose (see the closure file): the source of the All Saints
  icon, the retired pair page's diagrams, new photos, a year-cycle visual
  and two code refactors.
