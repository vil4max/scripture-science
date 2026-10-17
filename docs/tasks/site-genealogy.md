# The genealogy of Jesus Christ on bible/

State: done on 2026-10-17 and published (owner: «Пуш»).

## Authorization and scope

2026-10-17: the owner shared a reel with a genealogy of Christ drawn as one
tree from Adam («Там родословие Христа на схеме»), approved the proposed
plan and said «Сделай». Changes: `src/data/genealogy.json`,
`src/components/ChristGenealogy.astro` on `bible/#genealogy`, a link from the
Nativity row of the chronicle, the proofs in Sources
(`src/lib/siteSources.ts`), `scripts/genealogy.test.ts`.

## Decisions

- **Content.** The main line from Adam to Christ by Genesis 5 and 11 and
  Luke 3:23–38; Matthew 1:1–17 from Abraham; after David the two lines run
  side by side — Matthew through Solomon, Luke through Nathan — and meet at
  Salathiel and Zerubbabel and at Joseph. Brothers and other sons stand
  beside the line (Cain and Abel, Ham and Japheth, Ishmael, Esau, the twelve
  sons of Jacob). Lifespans only where Scripture states the total.
- **Text.** The Synodal text on azbyka.ru, numbers as printed, including the
  Septuagint numbers and words it gives in square brackets (Lamech 777
  [753]; Cainan in Gen 11:12, also in Luke). Luke's names, genitive in the
  Gospel, appear in the nominative; the note says so.
- **Why the lines differ.** St John of Damascus, «Точное изложение
  православной веры», IV, 14 (87): levirate law, Jacob and Heli brothers by
  one mother, Joseph the son of Jacob by nature and of Heli by law; the
  Theotokos of David's line through Joachim, of Nathan.
- **Evidence.** Each verse excerpt was checked against the azbyka page text
  (Synodal) and the Damascene chapter; shown in Sources, not inline.
