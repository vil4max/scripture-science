# M38 — check the site against «Homo religiosus» and enrich it

State: done on 2026-10-17 and published (owner: «Коммить и пушь»). The
project stays unfrozen (owner, 2026-10-17).

## Authorization and scope

2026-10-17, owner, after M37 was published: «не замораживай пока не
дополнишь материалами из книги мой сайт, нужно сверить каждый текст и
дополнить интересными фактами из книги, книга должна быть интересно
написана и можно улучшить сайт».

The source rules of M37 apply unchanged (`docs/tasks/site-m37-korytko-book.md`,
`docs/SOURCES.md`): the book is `reference`; doctrine of a tradition still
comes from its own texts; excerpts are exact from one page of the OCR copy
(the owner chose the text, no PDF); the text stays in `private/`.

## Work

1. **Check every text** on the site about what the book covers — Islam,
   Judaism, Hinduism, Buddhism, Daoism, Shinto, Confucianism and the
   ancient religions — against the book: matrix and analysis files, the
   comparison and worship questions, prayers, other traditions, the history
   chapters, the chronology and the glossary. Each checked claim is
   confirmed, refined or contradicted by a page of the book.
2. **Contradictions**: where the book shows a site text to be wrong in a
   historical or descriptive fact, correct it with the book's excerpt;
   where the book is the doubtful side (it disagrees with the tradition's
   own source or the scholarly consensus the site cites), keep the site and
   record the case here.
3. **Interesting facts**: more points under each religion, and a fold
   «Подробнее по книге» on the history rows the book covers (Mesopotamia,
   Egypt, Greece, Rome, Confucianism and others), reusing `BookPoints`.
4. **Glossary**: book-sourced entries for the non-Christian terms the site
   uses without explanation, with inline hints.

## Done

- **Check list**: `docs/research/korytko-check-2026-10.md` — 231 claims with
  a verdict (185 confirmed, 42 refined, 4 contradicted) and how each
  refinement and contradiction was resolved. One site error corrected: the
  Mesopotamian line on the chronicle ended about 3100 до Р. Х.; it now ends
  in 651, by the site's own source and the book (p. 254). One spelling
  aligned: «Рош ха-Шана».
- **Points**: one file per religion or history row in
  `src/data/book-points/` (191 points, 746 excerpts), loaded by
  `src/lib/bookPoints.ts`; a fold with more than six points is grouped by
  theme (`BOOK_POINT_KINDS` in `src/lib/book.ts`, including «Связи с Библией
  и христианской историей»). Under the religions: Islam 29, Judaism 26,
  Hinduism 19, Buddhism 18, Daoism 16, Shinto 16, other small religions
  (shamanism) 2. On the chronicle rows (`Chronicle.astro`): Confucianism and
  ancient China 19, Egypt 12, Mesopotamia with the Hittites and Canaan 10,
  Greece 10, Rome 10, Jainism 2, Slavic paganism 2. `BookPoints` takes
  `where` so a fold shows only on its own page.
- **Glossary**: a group «Понятия других религий» with 18 book-sourced
  entries and inline hints (Коран, сунниты, шииты, имам, намаз, Рамадан,
  хадис, суфизм, Тора, Танах, Талмуд, галаха, раввин, синагога, Шаббат,
  кашрут, Песах, Йом Кипур).
- **Left out on purpose**: the Palaeolithic, Neolithic and megalithic
  chapters (the chronicle starts at Creation and the site keeps those
  dates in Sources only); statistics; evaluative passages; passages the
  OCR interleaves with sidebars; the book's errors listed by the agents
  (the Buddha's years, the «Дао дэ цзин» date, Zen as Vajrayana, the
  twelfth imam, the Ashura fast and others).
- **Open**: inline hints skip the other tradition's own column on the
  comparison pages (`TermHints.astro`, `.side.tradition`), so the new
  descriptive terms do not show there; relaxing that is the owner's call.

## Acceptance

- A written check list: every claim checked, with its verdict and page
  (`docs/research/korytko-check-2026-10.md`).
- Every new or corrected claim rests on its own exact excerpt; the M37
  tests pass for all of them.
- `npm run verify` passes under Node 26; the changed pages render at
  desktop width and 375 px.
