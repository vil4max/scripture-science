# Task — M19: disputed points with each side's answer

State: approved (owner, 2026-09-26, asked what comes next: «M19 споры»; the
rule is the owner's, `docs/DECISIONS.md` «Disputed points are shown with the
answer»)
Sources: `docs/EDITORIAL.md` principles 4, 9 and 10, `docs/SOURCES.md`.

## Goal

Where one tradition contests another's teaching or practice, the reader sees
the dispute and both sides' reasons, each from that side's own sources.

## Scope

- A dispute element attached to a comparison topic: the contesting view (who,
  what, source) and the contested tradition's answer (its argument in brief,
  where it is stated, link). A dispute can name several contesting traditions.
- Each part carries a unity mark (owner, 2026-09-26: «Пометка у всех»):
  «Общая позиция традиции» with its authority, or «Единого мнения нет» with who
  disagrees, backed by its own proof.
- Shown under its topic in «Сравнение», following the reader's choice like
  «Что думают друг о друге»: nothing chosen shows every dispute in full; one
  chosen shows the disputes it takes part in, in full; two or three chosen
  show a dispute only when a chosen tradition contests and another chosen one
  answers, and then only the chosen traditions' parts.
- First disputes, one slice each:
  - monasticism (fasting topic): Qur'an 57:27 and the Reformation's rejection
    of monastic vows, and the Orthodox and Catholic answers;
  - images (images topic): the Islamic, Reformed and Jehovah's Witnesses'
    rejection of images, and the answer of the Seventh Ecumenical Council
    (Nicaea, 787). No official Islamic text against icons was found, so Islam
    is cited from reference sources and its part says the question is
    disputed within Islam (owner, 2026-09-26: «Справочный источник»).
- Next disputes, chosen by the owner on 2026-09-26: the Trinity, the divinity
  of Jesus Christ, the Sabbath or Sunday, the immortality of the soul and
  eternal punishment.
- Further disputes are proposed to the owner from the existing positions before
  research, not added on the session's own choice.

## Acceptance

- Every excerpt verbatim and at most 25 words, logged in `VERIFICATION.md`.
- Each side is quoted from its own sources (principle 9); no judgement of
  another tradition appears in a position text.
- `npm run verify` passes; the pair page and the comparison render the
  disputes on desktop and do not break on a phone.
