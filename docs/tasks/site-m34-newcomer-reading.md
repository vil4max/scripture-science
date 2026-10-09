# M34 — reading for a newcomer without religious education

State: implemented and verified; the owner authorized committing and pushing on 2026-10-09

## Authorization and scope

2026-10-09: after a newcomer-readability review, the owner asked to carry out
all six recommendations, look at the whole site again through a newcomer's
eyes and propose what else a newcomer would want to read. Priority: a
detailed Orthodox view of Jehovah's Witnesses; also a more detailed Orthodox
view of every tradition. Pages must not become long walls of text: short
theses and paragraphs, every difference highlighted and explained in plain
language rather than maximal detail. Local edits and checks are authorized;
commits and pushes need the owner's word.

## Outcomes

1. **Content defect.** The «Монашество» dispute shows the fasting foundation;
   «Почитание святых» shows the icon foundation. Each gets its own sourced
   foundation.
2. **Glossary.** `/terms/` becomes a readable glossary: basic concepts first
   (Trinity, Sacrament, Eucharist, Tradition, Creed, dogma, Pentecost, canon,
   Old and New Testament, Filioque, Sola Scriptura, dating abbreviations …),
   then the existing classification terms. Each entry: a plain one-line
   explanation, the fuller definition and verified sources. The old
   `sources/#terms` anchor keeps working.
3. **Inline explanations.** The first mention of a glossary term in a page's
   reading area becomes a tappable hint with the plain explanation and a link
   to the glossary. Works by keyboard and on iPhone; text and anchors in the
   HTML stay unchanged.
4. **Step zero.** A short page «С чего начать: христианство коротко» explains
   Christ, the Bible, the Church, the Trinity, the Sacraments and why
   Christians divided, each section sourced, linked from the home page and
   the navigation.
5. **Dates and Latin.** Creation-era years show an approximate year before
   the Nativity next to them; the Jewish-era Torah date shows its sourced
   conventional year; Latin terms get a Russian gloss.
6. **Labels explained.** Each confessional label on a religion card carries
   one line on what the word means and that it judges teaching, not people.
7. **Short theses on tradition pages.** Every analysis card gets a one-line
   plain summary («Коротко»); every tradition page opens with «Главное» —
   six to ten key differences linking to their cards. Card details fold
   under the summary, with an «expand all» control; links to a card open it.

## Decisions

- No new doctrinal claim without a verified source (docs/SOURCES.md). Card
  summaries and key points paraphrase the card's already sourced content
  and carry no quotation marks; glossary and step-zero texts carry their
  own proof entries.
- Plain language: short sentences, no undefined terms inside an explanation,
  Orthodox voice per docs/EDITORIAL.md; classification terms judge
  teachings, not people (ROC 2000 principles, §7.1).
- Inline hints are progressive enhancement: without JavaScript the page reads
  as before. Folded card details are searchable and open from an anchor.

## Acceptance

- Every analysis card has `short`; every analysis file has 6–10 `keyPoints`
  pointing to existing cards (build-time check).
- Every new glossary entry has slug, plain explanation and at least one
  verified proof; all glossary anchors resolve.
- Node.js 26 `npm run verify` passes; desktop and 390 px iPhone viewport
  checks of the home page, glossary, step zero, a tradition page (folded and
  expanded, anchor opening) and inline hints in both themes.

## Verification evidence

2026-10-09, Node.js 26.8.2 (`/opt/homebrew/bin`; the shell default is 24):
`npm run verify` — 167 Node tests (12 new in `scripts/newcomer-reading.test.ts`),
two Python tests, 23 pages, zero Astro diagnostics; links, anchors and
migration fidelity pass.

Content: 39 glossary terms (27 basic, 12 classification, one new:
«псевдохристианские движения»), each with a verified exact excerpt; seven
«С чего начать» sections with 73 verified excerpts; 192 card summaries and
64 key points across seven traditions, paraphrasing existing card content.
Delegated writers checked every new excerpt against the fetched page; eleven
Azbyka pages encode text as HTML entities and match after decoding.

Browser (desktop and 390 px, dark and light): key points, folded cards,
«Раскрыть все», anchor opening on load and on in-page links, inline hint
pop-up placement within the viewport, glossary order and index, step zero,
classification notes, no horizontal overflow. The hint pass over the largest
analysis page takes about 50 ms at idle; the Sources page is excluded.

Found on the way and fixed: replacing the address with the selection
parameter during load cancelled the browser's jump to a fragment on every
page (also on the published site); the jump is now restored once on load.
A non-literal excerpt in `family-overview.json` (Sola Scriptura) now matches
the source. Physical iPhone/Safari not tested.
