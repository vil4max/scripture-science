# M37 — the book «Homo religiosus» as a source and a page

State: done on 2026-10-17 and published (owner: «Коммить и пушь»). The
project resumed from the freeze for this task only and is frozen again.

## Authorization and scope

2026-10-17, owner, after an Instagram post recommended the book: «книгу
сохранить и выделить отдельный таб под нее, также взять инфо из нее для
дополнения разделов». The owner supplied the full text (OCR, `.txt`) and
offered a PDF.

## The source

Прот. Олег Корытко. Homo religiosus: на путях поиска истины. Авторский курс
лекций по «Истории нехристианских религий». М.: Изд-во Сретенского
монастыря, 2017. 832 с. ISBN 978-5-7533-1360-7. Рекомендовано к публикации
Издательским советом РПЦ, ИС Р17-711-0395. Based on the author's lectures at
the Sretensky Theological Seminary.

- Covers non-Christian religions only; the preface leaves Christianity out
  on purpose. Chapters on the site's traditions: Islam XXIII (pp. 653–752),
  Judaism XXIV (753–807), Vedic religion, Brahmanism and Hinduism XIX–XXI
  (503–598), Buddhism XXII (599–652), Daoism VIII (157–190), Shinto IX
  (191–218). Not covered: Sikhism and every Christian tradition.
- The author presents it as religious studies, not polemics; the Orthodox
  frame is in the preface and the conclusion.
- Local copy: `private/books/korytko-homo-religiosus-2017.txt`, ignored by
  git. The book is under copyright and the repository and the site are
  public: the text and any PDF are never committed, uploaded or linked.
- Page numbers: page = the number of form feeds before a line + 2 (checked
  on pp. 6, 7, 695 and 827 against the running headers).
- OCR noise: soft hyphens, letter-spaced headings and character errors
  (`апь` for `аль`, `978-S`). Excerpts drop soft hyphens and line-break
  hyphenation and rejoin letter spacing; a passage with any other doubtful
  character is not quoted until checked against the PDF.

## Decisions

- **Role.** `reference`: a named Orthodox author's description of history,
  texts and practice (SOURCES.md "Practice descriptions"). It never
  replaces a tradition's own statement of its doctrine; the text says «по
  изложению прот. Олега Корытко» where a point is one author's account. Its
  Orthodox frame is an individual author's explanation, not Church
  teaching. Its statistics (2017 or older) are not used.
- **Printed-source proof.** `url` is the book page on this site
  (`https://vil4max.github.io/scripture-science/books/homo-religiosus/`),
  which carries the full bibliographic record; the link checker verifies
  it. `title` is «Прот. Олег Корытко. Homo religiosus: на путях поиска
  истины (2017), гл. <N>, с. <page>»; the source catalogue groups by the
  title before the locator. `excerpt` is exact from that page.
- **The page («таб»).** `books/homo-religiosus/` in the menu's «Справка»
  block: the record, what the book is and how the site uses it, the
  contents with page ranges and links to the site's sections, and every
  claim the site takes from it (collected from the proofs).

## Outcomes

All in `src/data/book-homo-religiosus.json` (record, contents, «О книге»,
the lead and the points) unless named otherwise; rendered by
`src/pages/books/homo-religiosus.astro` and `src/components/BookPoints.astro`.

1. Local copy kept and ignored. Done.
2. Book page in the menu («Справка») and the sitemap: record, «О книге»,
   how the site uses it, the contents with page ranges and links, and every
   excerpt with the place it is used (collected from the source catalogue).
   Done.
3. «Другие религии»: a lead with the author's Orthodox frame, and a fold
   «Подробнее по книге прот. Олега Корытко» under Hinduism (6 points),
   Buddhism (6), Daoism (5) and Shinto (6). Done.
4. Islam (8 points) and Judaism (7) pages: the same fold in «Источники и
   отношения с другими». Chosen for what the site lacked: pre-Islamic
   Mecca, the first written Qur'an, the hadith collections, zakat, ihram,
   the Sufi path and Sufism in Russia, Shia shrines; the Mishnah, the
   Gemara, the Shulchan Arukh, circumcision, Hasidism, the Reform and
   Conservative movements, Kabbalah. Done.
5. The glossary gains «Религия»: the course's working definition and the
   word's history, labelled as one author's account
   (`src/data/terms.yaml`). Done.
6. SOURCES.md records the printed-source rule; `catalogLabel` groups the
   book's chapter and page locators. Done.

Left out on purpose: the book's statistics; evaluative passages (they
would need an author label and a tone check); points where the book
disagrees with the site's sources (the Buddha's years, the date of the
«Дао дэ цзин», the twelfth imam, the Ashura fast, the shrine count);
spellings follow the site, not the book.

Out of scope: publishing the text; new sections for Confucianism or the
ancient religions (a later proposal).

## Validation (2026-10-17)

- `scripts/book.test.ts`: every proof citing the book, in any data file,
  has the book URL, tier `reference`, a chapter and a page inside it, at
  most 25 words, and — where the local copy exists — is on that page
  letter for letter (hyphens and spacing aside).
- `npm run verify` under Node 26 (`/opt/homebrew/opt/node@26/bin`; the
  shell's default `node` is 24, whose `node --test scripts/` fails to
  start): 180 tests pass, 0 Astro diagnostics, links and anchors OK on 28
  pages, text fidelity OK.
- Browser (dev server): the menu entry, the folds on religions/, islam/
  and judaism/, the glossary entry and the catalogue entry render; no
  horizontal scroll at 375 px. Physical iPhone not tested.

## Acceptance

- The book page opens from the menu, lists the contents and every claim
  sourced from the book; each such claim appears on its section.
- No book passage longer than a short excerpt exists in the repository;
  `git check-ignore private/books/korytko-homo-religiosus-2017.txt` passes.
- `npm run verify` passes; desktop 1280 px and iPhone 390 px views of the
  book page and the changed sections render in both themes.

- No PDF cross-check: the PDF is no longer available, and the owner chose
  the text («пдф уже не отдает - пользуйся текст», 2026-10-17). Excerpts
  rest on the OCR copy; passages with a doubtful character were left out,
  and the test rejects any word that mixes Latin and Cyrillic letters. A
  misread letter that forms a valid Cyrillic word would still pass.

## Pending

Nothing. A later proposal: sections for Confucianism and the ancient
religions, which the book covers and the site does not.
