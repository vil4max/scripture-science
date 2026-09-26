# Task — M21: three more disputes

State: done locally (2026-09-26). The owner accepted the Filioque pilot
and authorized the remaining two disputes. One commit per dispute; no push.
All three entries have sourced unity marks and verbatim excerpts recorded in
`docs/research/VERIFICATION.md`. The gate passed for each dispute.
Sources: `docs/EDITORIAL.md` (principle 10), `docs/SOURCES.md` ("What verified
means"), `docs/DECISIONS.md`, `docs/tasks/site-m19-disputes.md`,
`docs/tasks/site-m20-unity-marks.md`.

## Goal

Add three entries to `src/data/disputes.yaml` in the same model as the six
already there (use `trinity` as the template): contesting traditions in
`challenges`, the contested ones' `answers`, every part with a Russian
`summary` in the tradition's own words, a `unity` mark and verbatim `proof`.

| id | topic | challenges | answers |
|---|---|---|---|
| `filioque` | `spirit` | orthodoxy | catholicism |
| `papal-primacy` | `organisation` | orthodoxy, protestantism | catholicism |
| `saints` | `worship` | protestantism, jw | orthodoxy, catholicism |

## Where to look

- Orthodoxy: Filaret's catechism on azbyka.ru
  (`azbyka.ru/otechnik/Filaret_Moskovskij/prostrannyj-pravoslavnyj-katekhizis/2_12`
  and neighbouring parts); conciliar canons on azbyka.ru «Церковное право»
  (`azbyka.ru/otechnik/pravo/...`, e.g. Second Council canon 3, Chalcedon
  canon 28, Ephesus canon 7); the 1848 Encyclical of the Eastern Patriarchs;
  the Seventh Council definition on veneration. Unity marks for Orthodoxy
  rest on conciliar decisions (DECISIONS «Orthodox positions rest on
  conciliar decisions»).
- Catholicism: the Catechism via the Wayback copy
  `http://web.archive.org/web/20260422005102/https://ccconline.ru/`, titled
  «Катехизис Католической Церкви (ccconline.ru, архивная копия), §NNN» —
  §246–248 (Filioque), §880–882 and §891 (primacy, infallibility), §956–957
  (intercession of saints). Reuse the §11 unity proof from `trinity`.
- Protestantism: the ELCR Augsburg Confession and Lutheranism pages the site
  already cites via Wayback (art. 21 on saints); a Russian Smalcald Articles
  text (part II, art. 4) for the papacy. Protestantism is a family: mark
  `divided` and name who differs when the sources do not cover all of it.
- Jehovah's Witnesses: jw.org Russian pages (prayer only to Jehovah through
  Jesus); reuse the beliefs FAQ unity proof from `trinity`.

## Order: pilot first

Do `filioque` first (one side against one) and stop: report the entry, its
excerpts and the verify result, and wait for the owner's check before the
other two (owner, 2026-09-26: a delegated batch starts with one pilot item,
checked by the owner, before the rest).

## Rules

- Every `excerpt` is verbatim from the fetched page (tags stripped,
  whitespace collapsed), at most 25 words. Check each one against the page
  text with a script; never from memory or search snippets.
- .ru sites blocked in Ukraine (ccconline.ru, patriarchia.ru, pravenc.ru,
  elkras.ru, ekzeget.ru) are cited through Wayback copies; azbyka.ru and
  jw.org are cited directly (fetch azbyka with `curl -sL --compressed`).
- Add one row per dispute to `docs/research/VERIFICATION.md` (what was
  fetched, what was found verbatim).
- Keep it light (owner: personal page): no new tests or mechanisms; the gate
  is `npm run verify`.

## Acceptance

- `npm run verify` passes (build, astro check, node tests, check_text).
- The three disputes show on the compare page for their topics, with every
  part's unity mark.
- One commit per dispute, message per the kit's commit rules; no push.
