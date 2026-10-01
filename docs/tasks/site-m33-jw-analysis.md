# Task — M33: detailed analysis of Jehovah's Witnesses

## Goal

Give the reader one page that analyses every documented difference between
Orthodox teaching and the teaching and practice of Jehovah's Witnesses, as
short theses rather than long prose. The comparison page stays a short
overview and links into this page.

## Owner decisions (2026-10-01)

- Site structure: the comparison page keeps only theses for every
  tradition (position, difference, Orthodox answer, a link). Evidence,
  quotations, «Основание ответа» and disputed questions move to each
  tradition's profile page (`/traditions/<id>/`), which is its detailed page;
  Jehovah's Witnesses' profile shows curated analysis cards in place of the
  topic-by-topic positions. Curated cards for the other traditions are
  backlog (owner, 2026-10-01).
- The overview's Scripture row states what each tradition's Scripture shares
  with the Orthodox Bible and where it differs; the Orthodox population figure
  is shown with its counting scope instead of being hidden (owner question,
  2026-10-01).
- Scope: doctrine, practice, history and organisation, the assessment as a
  sect, and Russian legal status (kept separate from theology).
- Each difference is one card with three blocks in order: Church teaching →
  Jehovah's Witnesses' teaching → Orthodox answer in theses, then «Подробнее».
- Sources: Scripture, catechism, Dvorkin and other Azbyka authors for the
  Orthodox side; jw.org / wol.jw.org for what Jehovah's Witnesses teach.
  Translated Protestant authors (Franz, Reed, Jonsson) serve only as
  historical testimony.

## Scope

- Data file for the analysis: groups → cards, each card with
  `church`, `tradition`, `answer`, `more` and an optional comparison topic id.
- One page rendering groups, a contents list and cards; desktop only.
- «Подробный разбор →» link from each matching comparison topic.
- Source catalog: `docs/research/jw-azbyka-catalog.md`. The retired pair
  document (`src/data/topics-orthodoxy-jw.yaml`, `sections-orthodoxy-jw.yaml`)
  and its correction register are reused as argument material, re-verified.

Draft card list (about 33):

1. **God** — Trinity; the name «Иегова»; divinity of Christ (Jn 1:1);
   Christ as Michael; the God-man; prayer and worship of Christ; the Holy
   Spirit as «force».
2. **Christ and salvation** — ransom; bodily resurrection of Christ; cross
   or stake; salvation through the organisation; 144 000 and «other sheep»;
   Memorial versus the Eucharist; baptism.
3. **Man and the last things** — soul; hell; resurrection of the dead; 1914;
   Armageddon and the earthly paradise; failed dates and «new light».
4. **Scripture and authority** — Tradition; the New World Translation;
   Governing Body and «faithful and discreet slave»; the Church and «great
   apostasy»; priesthood and sacraments.
5. **Worship and life** — icons; the Theotokos and saints; holidays and
   birthdays; blood; state and military service; disfellowshipping and
   shunning; preaching and field-service reports; fasting.
6. **Organisation** — history (Russell → Rutherford → Knorr → Governing
   Body); assessment as a sect, attributed to Dvorkin and the 1999 and 2001
   conference statements; legal status in Russia since 2017.

## Legacy pair document (owner, 2026-10-01: «вынести в новый формат»)

The retired pair document's arguments now appear on the comparison page as
`PairSupplement` disclosures (24 `pair-argument` blocks) and its notes on the
Sources page. Their content moves into analysis cards: each card lists the
pair topic slugs it absorbs in `legacy`. Every pair topic and the
summary, structure and «new light» sections now have a card; `PairSupplement`
is removed and the embedded-pair tests check the cards instead. The migrated data files and `source/orthodoxy-jw.html`
stay as provenance (text-fidelity check unchanged).

## Implementation

- Data: `src/data/analyses/<tradition>.yaml`, collection `analyses` in
  `src/content.config.ts`; card: `src/components/AnalysisCard.astro`,
  rendered by `src/pages/traditions/[id].astro` when a curated file exists.
- The comparison (`Comparison.astro`) shows non-Orthodox columns in compact
  form (`compact` in `MatrixPosition` and `OrthodoxAssessment`), links each
  topic to the profile (`src/lib/analysis.ts`) and no longer renders disputes;
  profiles render them.
- Overview: `scripture.comparison` and `adherents.scopeNote` in the matrix
  files; the profile header shows the full Scripture and population facts.
- Each card keeps its proofs in a «Источники» disclosure next to the claim,
  rather than in the topic-organized Sources page; a deliberate deviation,
  revisited if the Sources page should list them.
- Site structure (owner, 2026-10-01): sidebar «Религии мира» (home) ·
  «Православная вера» · «Сравнение» · «История» · «Священное Писание», with
  «Термины и источники» below. The home page opens with a separate
  «Основание: Православная Церковь» block; Orthodoxy left the denominations
  group. Orthodoxy's page moved to `/orthodoxy/` (the old
  `/traditions/orthodoxy/` redirects); the other traditions' pages stay at
  `/traditions/<id>/` and open from the home cards and from each comparison
  column header («Страница традиции →»). The Orthodox comparison column is a
  thesis too, linking «Обоснование →» to its topic on `/orthodoxy/`. Profile
  rendering lives in `src/components/TraditionProfile.astro`.
- Old `/pairs/orthodoxy-jw/#…` links land on the absorbing card
  (`src/lib/legacyPairRoute.ts`).
- Tests: `scripts/analysis.test.ts`, updated `embedded-pair` and
  `orthodox-edition` tests.

## Constraints

- No synodal act names Jehovah's Witnesses; never present an author's or a
  conference's assessment as a Church definition (EDITORIAL.md 3, 5).
- Contemporary works are summarised in the site's own theses with short
  exact quotations and links; never reproduced at length.
- Every claim follows SOURCES.md or is marked `TODO: verify` and not shown
  as verified.
- Legal facts come from primary legal documents and stay out of the
  theological answer.

## Phases

1. Brief, data schema, page template and a pilot of five cards (Trinity,
   Michael, Holy Spirit, soul, 1914) for owner review.
2. The remaining doctrinal cards.
3. Practice, history, organisation and legal status; comparison links;
   source re-check.

## Acceptance

- Every card has an attributed JW position with a JW primary source and an
  Orthodox position with an Orthodox source; assessments by individual
  authors name the author.
- Each comparison topic with a matching card links to it; every link
  resolves.
- The page states that no synodal act names Jehovah's Witnesses.
- `npm run verify` passes.
