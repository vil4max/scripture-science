# M35 — question-first comparison

State: implemented and verified; the owner authorized committing and pushing on 2026-10-09

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
- All 105 `difference` lines were reviewed; 45 that restated the tradition's
  teaching or carried an editorial caveat were rewritten to name the
  difference («…, а Церковь …» or an explicit agreement), paraphrasing the
  record's own sourced position and Orthodox response. Caveats remain in the
  analysis cards' answers.

## Acceptance

- Fifteen questions in topic order; in each, the Orthodox side first, seven
  tradition sides with only the default visible on the server, the difference
  and the Orthodox answer before the fold, seven lines in «Этот вопрос у всех».
- Node.js 26 `npm run verify` passes; desktop and 390 px checks of choosing,
  switching views, choosing from a line, anchors and no horizontal overflow.

## Verification evidence

2026-10-09, Node.js 26.8.2: `npm run verify` — 163 Node tests (selection,
reading context and comparison structure rewritten; the column-slot tests
removed with their module), two Python tests, 23 pages, zero Astro
diagnostics, links and text fidelity pass. Browser: desktop and 390 px; the
phone page is about 13,700 px instead of 40,900; no horizontal overflow;
choosing from «Этот вопрос у всех» switches the tradition and view.
