# Task — M20: unity marks across the site

State: done (approved by the owner, 2026-09-26, on applying the dispute pattern
to the rest of the site: «Всё, по этапам»; all five phases landed the same day)
Parallelism: 1
Sources: `docs/EDITORIAL.md` principle 10, `docs/SOURCES.md`, `docs/DECISIONS.md`
(«Every side of a dispute says whether its tradition is united», «Orthodox
positions rest on conciliar decisions»).

## Goal

Wherever the site states a tradition's position, the reader sees whether the
whole tradition holds it and on what authority, or whether the tradition has no
single position and who within it differs.

## Meaning of the mark

- «Общая позиция традиции»: the position binds the whole tradition through its
  authority (an ecumenical council or a canon confirmed for the whole Church,
  the Catechism of the Catholic Church, an official statement of beliefs, the
  Qur'an). Individual dissent inside a centralised church does not make it
  divided.
- For a family of churches or streams without a common authority
  (Protestantism, Judaism, Islam), «Общая позиция традиции» means the examined
  streams' own texts agree, and the note names them.
- «Единого мнения нет»: the tradition is a family of churches or streams with
  no common authority on the point; the note names who differs.
- Where the principle is common but member churches keep different disciplines
  (the Latin and Eastern Catholic codes on fasting, calendars), the mark stays
  «Общая позиция традиции» and its note says whose discipline the position
  describes.
- In «Что думают друг о друге» the same mark reads «Официальная позиция
  традиции» or «Не официальная позиция традиции», about the document's
  standing (a statement by part of the tradition, one Local Church, a draft or
  an unvoted explanatory document).

Every mark carries its own proof, verbatim and at most 25 words.

## Phases (one commit per phase or tradition)

1. «Что думают друг о друге»: 17 documents; the free-text status becomes the
   mark's note.
2. Comparison positions of the centralised traditions: Catholicism, Jehovah's
   Witnesses, Seventh-day Adventists, Latter-day Saints (60 positions), with the
   model and rendering in the cards and the full table.
3. Orthodoxy (15 positions) from conciliar decisions on azbyka.ru.
4. Protestantism, Judaism, Islam (45 positions), naming who differs per topic.
5. The mark becomes required for positions and view documents.

## Acceptance

- Every mark's excerpts found verbatim in the fetched page, logged in
  `VERIFICATION.md`.
- `npm run verify` passes after each commit; the marks render on /compare/ in
  the cards, and the full table does not break on a phone.
