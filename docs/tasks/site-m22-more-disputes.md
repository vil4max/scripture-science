# Task — M22: four more disputes

State: implemented locally (2026-09-26), awaiting combined owner/Claude
review of all four commits. No push.
Sources: `docs/EDITORIAL.md` (principle 10), `docs/SOURCES.md` ("What verified
means"), `docs/DECISIONS.md`, `docs/tasks/site-m19-disputes.md`,
`docs/tasks/site-m20-unity-marks.md`, `docs/tasks/site-m21-more-disputes.md`
(same model, already exercised for three disputes with no findings).

## Goal

Add four entries to `src/data/disputes.yaml` in the same model as the nine
already there (use `trinity` or `filioque` as the template): contesting
traditions in `challenges`, the contested ones' `answers`, every part with a
Russian `summary` in the tradition's own words, a `unity` mark and verbatim
`proof`.

| id | topic | challenges | answers |
|---|---|---|---|
| `justification` | `salvation` | protestantism | orthodoxy, catholicism |
| `scripture-and-tradition` | `authority` | protestantism | orthodoxy, catholicism |
| `name-of-god` | `name-of-god` | jw | orthodoxy, catholicism |
| `end-times-1914` | `end-times` | jw | orthodoxy, catholicism |

## Where to look

- Orthodoxy: Filaret's catechism on azbyka.ru
  (`azbyka.ru/otechnik/Filaret_Moskovskij/prostrannyj-pravoslavnyj-katekhizis/`);
  conciliar canons via azbyka.ru «Церковное право» where a claim needs a
  conciliar basis for its unity mark (DECISIONS: Orthodox positions rest on
  conciliar decisions).
- Catholicism: the Catechism via the Wayback copy
  `http://web.archive.org/web/20260422005102/https://ccconline.ru/`, titled
  «Катехизис Католической Церкви (ccconline.ru, архивная копия), §NNN» —
  candidates: §1987–2005 (justification), §80–82 and §95 (Scripture and
  Tradition), §203–213 (the divine name), §668–682 (Christ's return, "the
  last day"). Reuse the §11 unity proof already used in `trinity`.
- Protestantism: the ELCR Augsburg Confession/Lutheranism pages and the
  Baptist confessions already cited via Wayback (article 4, justification by
  faith; article 5 or the Reformation formula "sola scriptura"/"sola fide").
  Protestantism is a family: mark `divided` and name who differs when the
  sources do not cover all of it, as `papal-primacy` already does.
- Jehovah's Witnesses: jw.org Russian pages — the divine name «Иегова» (jw.org
  has a dedicated page on why they use it) and 1914/the last days teaching
  (jw.org beliefs pages). Reuse the beliefs FAQ unity proof already used in
  `trinity`.

## Rules

Identical to `site-m21-more-disputes.md`: verbatim excerpts (≤25 words,
script-checked against stripped, whitespace-normalised text), .ru sites
blocked in Ukraine cited through Wayback, azbyka.ru and jw.org fetched
directly, one verification-log row per dispute, keep it light (no new tests
or mechanisms), one commit per dispute, no push.

## Order

No pilot this time: M21 already validated the pattern with three disputes
and no findings, and the owner asked to let Codex run without per-item
pauses. Do all four, one commit each, then report together for one combined
review (as M16 phases 3–5 ended).

## Acceptance

- `npm run verify` passes after every commit.
- The four disputes show on `/compare/` for their topics, with every part's
  unity mark, and (once `/traditions/<id>/` exists from M16) on the
  participating traditions' profiles.
- Four commits; no push.

## Implementation report

All four entries use the existing dispute model, with three sourced sides
and unity marks each. No UI changes, dependencies or permanent test
mechanisms were added. One verification-log row records each dispute.

All 46 stored proof excerpts and 12 displayed quotes were checked against
freshly fetched, tag-stripped, whitespace-normalised page text; each excerpt
is at most 25 words. Stored YAML matches the checked data. `npm run verify`
passed for every slice (61 tests, Astro and text-fidelity checks). Generated
HTML checks confirmed the four disputes and every side's summary/unity note
on compare and exactly the participating profiles; the site now has 13
disputes. Defect review: No findings. Visual review was not run because
browser access remains blocked.

Narrowed statements and source choices:
- Justification states the Lutheran formulation rather than speaking for
  every Protestant church; its unity note names a documented Lutheran/Reformed
  difference concerning Baptism and salvation. No additional Baptist claim
  was needed. The Orthodox statement is taken directly from the Eastern
  Patriarchs' 1723 letter, including the priority of divine grace.
- Scripture and Tradition distinguishes the cited interpretive approaches
  without claiming that Anglicans reject biblical authority or that Lutherans
  reject all tradition. The 1723 letter supplies Orthodox conciliar evidence.
- The divine-name answers describe the conciliar Creed's names and Catholic
  Catechism's explanation of the revealed name and Israel's reading practice;
  they do not invent an Orthodox ban on Jehovah or a denial of the divine name.
- The end-times entry attributes 1914 to JW teaching. The Orthodox/Catholic
  answers describe their own teaching on the future return and its timing;
  they are not presented as texts explicitly refuting 1914.
