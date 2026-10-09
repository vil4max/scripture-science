# M35 — question-first comparison

State: the question-first comparison, the Creed-based revision and the page
«Богослужение и молитва» with the prayer texts are published (2026-10-09,
owner: «Пуш»); the question on the daily, weekly and yearly rhythm and two
further prayers («Царю Небесный», the Jesus Prayer) followed the same day
(owner: «Да»), then the Liturgy as the centre, example prayers, the Orthodox
Church named in difference lines, the names of the Church and Baptism
(owner: «Пуш»)

## Authorization and scope

2026-10-09: the owner asked whether the site can compare Orthodoxy with any
one other religion, found three columns hard to read and proposed two; asked
to compare the same thesis across religions (for example, how each relates to
Jesus Christ), without walls of text and with good UX, and to research how
textbook and reader sites are built. The owner chose: replace the comparison
page; keep a one-line difference visible; Jehovah's Witnesses as the default
choice. After reading the result the owner asked for the Orthodox answer to
stay in view and stand out, folding only the analysis links and sources.

## Research basis

Summary first and two layers at most (Nielsen Norman Group: inverted pyramid,
progressive disclosure); two columns for long text on phones and reader-chosen
items (NN/g comparison and mobile tables); visible buttons rather than a
dropdown for a handful of options and no tabs for comparison (NN/g); do not
fold what most readers need (GOV.UK Design System, accordion and details).
Religion comparison sites (ReligionFacts, Azbyka diagrams) publish fixed pairs
without a chooser.

## Decisions

- Selection is Orthodoxy plus one tradition (`MAX_SELECTION = 2`); choosing
  another replaces it. Old addresses with two choices keep the first; the
  former `slots` parameter is dropped.
- Each of the fifteen topics is a question (`TOPIC_QUESTIONS_RU`). Layer one:
  the Orthodox short answer (new `short` on the fifteen Orthodox positions,
  paraphrasing their sourced summaries), the chosen tradition's own summary,
  the existing assessment `difference` and the highlighted Orthodox
  `response`. Layer two («Разбор по вопросам и источники»): links to the
  analysis cards on that topic and the sources.
- «Этот вопрос у всех» shows the Orthodox answer and one `difference` line per
  tradition; choosing a line opens that tradition on the same question. The
  view is kept in the address (`?view=all`).
- The ROC 2000 principle on love for people is one line above the questions.
- The chosen side is labelled as that tradition's teaching on the question
  («Учение Свидетелей Иеговы»), not a self-description (owner).
- Each question has three separate blocks (owner): the Orthodox teaching; the
  chosen tradition's teaching; «Где расходятся — православный ответ» with the
  difference line and the Orthodox response, ending with the folded analysis
  links and sources.
- The Nicene-Constantinopolitan Creed is the key to the Orthodox side (owner):
  each question quotes its Creed articles under the Orthodox answer
  (`src/data/creed.json`, exact text from Filaret's catechism §67, checked
  against the page on 2026-10-09; practice-only topics quote none), the
  Orthodox short answers follow the Creed (God first as Creator of all things
  visible and invisible, then the Trinity). A first «Символ веры — основа
  сравнения» box above the questions was replaced by the Creed part below.
- The page becomes «Символ веры и различия» (owner): part one follows the
  Creed — God the Father and Creator (1), Jesus Christ (2–6), for our
  salvation (3–4), the Second Coming and the age to come (7, 12), the Holy
  Spirit (8), the Church (9), Baptism (10), the resurrection of the dead (11);
  each question opens with the Creed text, then «Простыми словами». Part two,
  «Другие различия», holds the topics the Creed does not address. The third
  block is «Православный взгляд на расхождение».
- The full prayer texts (owner) — the Creed, the Lord's Prayer, «Достойно
  есть», Psalm 50 and further prayers — in Church Slavonic and Russian, with
  a plain explanation and verified sources (`src/data/prayers.yaml`), close
  the page «Богослужение и молитва»; the comparisons link to them («Символ
  веры полностью», «Молитвы полностью»). They first had a page of their own,
  «Молитвы»; its address forwards (owner: «Молитвы в раздел богослужение и
  молитвы»).
- Questions outside the fifteen topics live in `src/data/extra-questions.yaml`
  with the Orthodox teaching and all seven traditions in the same three
  blocks. The Theotokos sits in the Creed part after Jesus Christ, quoting
  article 3 («и Марии Девы», owner); the Holy Spirit keeps its own section
  (article 8). The page «Богослужение и молитва» (owner) compares common
  worship, the daily, weekly and yearly rhythm (Islam's own schedule of five
  prayers and so on), prayer at home (the prayer rule, preparation for
  Communion, akathists) and the Psalter; the article 10 question is renamed
  «Что такое Крещение и Таинства?». Gaps are stated, not filled: no
  specific Jewish teaching on Mary and no official Adventist statement were
  found; the Adventist position cites a Dialogue article as an author's view.
- In Orthodoxy the Liturgy is the centre and everything is built around it
  (owner): the Orthodox answers on worship and on the daily, weekly and
  yearly rhythm open with it (catechism §314, Acts 20:7).
- «Какими словами молятся: примеры молитв» (owner: «Как молятся остальные?»,
  «Примеры молитв можно для сравнения») quotes short exact excerpts of each
  tradition's characteristic prayers — the Shema, al-Fatiha in Krachkovsky's
  translation, «Радуйся, Мария», the Latter-day Saint sacrament prayer — next
  to the Orthodox ones; «Богородице Дево, радуйся» joins the prayer texts for
  the comparison. English source wording is paraphrased in Russian.
- How services and prayer are done is reference data (owner): any reliable
  description may establish it, not only official sites (`docs/SOURCES.md`,
  "Practice descriptions"); the worship part was re-researched on that basis.
- Difference lines are neutral (owner): they name the difference («…, а
  Православная Церковь …» or «Здесь согласие: …») without evaluative words;
  the evaluation belongs to the Orthodox response. «Церковь» alone was
  unclear beside other churches (owner), so every difference line that
  speaks of the Church names the Orthodox Church (a test checks it), and a
  question «Как себя называют: Церковь и другие общины» after article 9
  explains the word and each community's self-name.
- «Крещение: похожий обряд — разный смысл» after article 10 (owner: the
  immersion looks the same, the meaning differs): the outward form and the
  meaning of baptism in every tradition, the Orthodox Sacrament quoted from
  Filaret's catechism.
- All 105 `difference` lines were reviewed; 45 that restated the tradition's
  teaching or carried an editorial caveat were rewritten to name the
  difference («…, а Церковь …» or an explicit agreement), paraphrasing the
  record's own sourced position and Orthodox response. Caveats remain in the
  analysis cards' answers.

## Acceptance

- «Символ веры и различия»: the Creed (its twelve articles all quoted, the
  Theotokos after Jesus Christ), then «Другие различия». «Богослужение и
  молитва»: services, the daily, weekly and yearly rhythm, prayer at home and
  the Psalter, then the prayer texts. In each question, the Orthodox side
  first, seven tradition sides with only the default visible on the server,
  the difference and the Orthodox answer before the fold, seven lines in
  «Этот вопрос у всех».
- The prayer texts are in Church Slavonic and Russian, and the comparisons
  link to each of them; the old «Молитвы» address forwards to the same prayer.
- Node.js 26 `npm run verify` passes; desktop and 390 px checks of choosing,
  switching views, choosing from a line, anchors and no horizontal overflow.

## Verification evidence

2026-10-09, Node.js 26.8.2: `npm run verify` — 163 Node tests (selection,
reading context and comparison structure rewritten; the column-slot tests
removed with their module), two Python tests, 23 pages, zero Astro
diagnostics, links and text fidelity pass. Browser: desktop and 390 px; the
phone page is about 13,700 px instead of 40,900; no horizontal overflow;
choosing from «Этот вопрос у всех» switches the tradition and view.

2026-10-09, Creed-based revision, Node.js 26: `npm run verify` — 167 Node
tests (Creed articles and part order, prayers page and its links, question
order with the Theotokos after Jesus Christ and the worship part), two Python
tests, 24 pages, links and text fidelity pass. Browser: the worship part on
desktop and at 375 px, anchors land on the question, no horizontal overflow.
The worship and private-prayer excerpts were checked as exact substrings of
the fetched pages (PDFs through `pdftotext`). After the re-research from
reference descriptions, all 228 proofs of the two entries were rechecked the
same way (none missing); `npm run verify` — 168 Node tests, 24 pages.
The page «Богослужение и молитва»: 375 px without horizontal overflow; the old
«Молитвы» address opens the same prayer (checked with Psalm 50 and «Достойно
есть»).

2026-10-09, the rhythm question and two prayers: 110 + 15 excerpts checked as
exact substrings of the fetched pages, the Church Slavonic texts against the
prayer book with stress marks removed; `npm run verify` — 169 Node tests,
25 pages; 375 px without overflow. Not included for lack of a source: the
length of Great Lent, a Pentecostal weekly order, Adventist yearly feasts,
Christmas for the Latter-day Saints.
