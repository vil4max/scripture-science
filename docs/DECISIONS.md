# Decisions

Each entry records the question, the choice and its consequences.

## 2026-09-25 — Quote Jehovah's Witnesses sources verbatim

**Question.** In Russia the Russian New World Translation is entry 4488 of the
Federal List of Extremist Materials (Vyborg City Court, 17.08.2017), jw.org
states that it has been on the same list since 2015, and administrative-code
article 20.29 penalises mass distribution of listed materials. Keep verbatim
quotes from the New World Translation and jw.org in the Jehovah's Witnesses
column, or replace them with verse references only?

**Choice.** Keep the verbatim quotes, as editorial principle 3 requires, and
accept that the site may be blocked in Russia.

**Consequences.**
- Pages that describe Jehovah's Witnesses carry, at the first mention, the note
  below; the wording is final once the decision's legal grounds are checked
  against the decision text (`docs/research/VERIFICATION.md`).
  **Superseded 2026-10-01 (owner):** the note stands only on the Jehovah's
  Witnesses page (`/traditions/jw/`); other tradition pages and the comparison
  do not repeat it. The sources page keeps its «Правовая справка» section.
- No legal advice was sought; the facts behind this entry are in
  `docs/research/prior-art-russian.md`, section 4.

Draft note:

> \* Религиозная организация «Управленческий центр Свидетелей Иеговы в России»
> и входящие в неё местные организации ликвидированы, их деятельность запрещена в
> России решением Верховного суда РФ от 20.04.2017. ЕСПЧ в решении от 07.06.2022
> («Таганрогская МРО и другие против России») признал это нарушением Конвенции о
> защите прав человека.

## 2026-09-26 — Order traditions by the start of their line

**Question.** Islam (610/622) was listed before Orthodoxy and Catholicism,
because the age order used their 1054 separation. The owner: «у тебя ислам
раньше христианства, хотя исторически новый завет продолжает ветхий».

**Choice.** A tradition's age is the start of its historical line. Orthodoxy
and Catholicism continue the undivided Church of about 33, so both come before
Islam; they tie there and are ordered by name. Cards show both steps from the data:
Pentecost first, then the 1054 separation (see the 2026-09-26 entry below).

**Consequences.** `src/lib/rules.ts` `orderByAge` takes each matrix
`since.year` as is; the 1054 ordering override from M5 is removed. The
timeline legend and toggles use the same order.

## 2026-09-26 — Orthodox chronology and a vertical chronicle

**Question.** The timeline needed hovering to read its events. The owner:
«можно сверху вниз, от сотворения мира и к нашему времени … берем
летоисчисление христианское православное». How should years be labelled, and
should rows be proportional to time?

**Choice.** Both years side by side — from the Creation of the world (the
Byzantine era, year 1 beginning 1 September 5509 BC) and from the Nativity —
and one row per event, with the lines of the traditions drawn as a narrow
graph beside the rows.

**Consequences.**
- `EDITORIAL.md` principle 8 changes from a neutral BCE/CE scale to this
  chronology; other traditions' creation epochs stay labelled as their own.
- The horizontal tree (M6) is replaced by `src/components/timeline/Chronicle.astro`
  on the home page and on `/timeline`; every event, date and source is visible
  without hovering.
- For a date known only by its year, the year from the Creation uses the
  January–August reckoning and may differ by one; the page says so.

## 2026-09-26 — Orthodoxy and Catholicism start at Pentecost on every page

**Question.** Since M5 the cards and the comparison showed Orthodoxy and
Catholicism as «как отдельная церковь — с 1054 г.», with the continuity from
Pentecost only as a second, self-view line. The owner: «православие ==
христианство, разделение только после большого раскола».

**Choice.** Show each church's own dated steps as the data already gives them,
Pentecost first, then the 1054 separation from the other; both churches are
treated alike. The display override from M5 is removed.

## 2026-09-26 — Wikipedia allowed as a source

**Question.** Some positions (Baptist and Pentecostal views on images) and
classifications have no official or scholarly page that could be opened.
The owner: «можно опираться на википедию».

**Choice.** Wikipedia may be cited as a reference source when no official or
scholarly page states the fact, named as Wikipedia, with a verbatim excerpt and
access date (`docs/SOURCES.md`).

**Consequences.** Claims backed only by Wikipedia stay visible as such through
the source title; a primary or scholarly source replaces it when found.

## 2026-09-26 — Naming Christ and the Cross

**Question.** How should the site name Jesus Christ and the Cross in its own
voice? The owner: «Иисус есть еще Навин, поэтому Христос всегда выделяется»,
and asked to check the treatment of Christianity's main holy things.

**Choice.** In the site's own voice Jesus is named «Иисус Христос». Where a
tradition that does not confess him as the Christ speaks, the name stays
unambiguous in its own terms: «Иисус из Назарета» for Judaism, «Иса (Иисус)»
for Islam. The Cross of Christ is capitalised («на Кресте», «Распятие»); a cross
as an object or a building symbol is not. Verbatim quotes are never changed.

## 2026-09-26 — Holy days and fasting are separate topics

**Question.** After M18 the Orthodox «Праздники» position still described Great
Lent and the other fasts, now also covered by «Пост и аскетика». The owner:
«отдельный раздел Праздники и отдельный раздел Аскетика».

**Choice.** «Праздники и священное время» describes only a tradition's feasts
and sacred time; fasts, fasting days and asceticism belong only to «Пост и
аскетика». A fast is named in «Праздники» only when a feast is defined by it
(Eid al-Fitr ends the Ramadan fast).

## 2026-09-26 — Ellen White's writings as an Adventist source

**Question.** The Adventist positions on the name of God, images and fasting
rest on Ellen White's books, because the 28 fundamental beliefs say nothing on
them and the General Conference sites refuse automated requests. Is that enough
backing? The owner: «Достаточно».

**Choice.** Ellen White's writings are an official-tier source for Adventist
positions the fundamental beliefs do not cover, because Fundamental Belief 18
calls them an authoritative source of truth. The summary names her as the
author and cites FB 18 for her standing. A General Conference or BRI statement
joins or replaces her when one can be opened.

## 2026-09-26 — Disputed points are shown with the answer

**Question.** Qur'an 57:27 judges Christian monasticism; it was left out of
Islam's fasting position as a view of another tradition (principle 9). The
owner: «если есть спорный момент, то его обязательно нужно включить, но тогда
с позицией конфессии как она объясняет»; for example monasticism (Islam and
others hold one view, Orthodoxy answers with its argument and a source) or
iconoclasm (Islam or Jehovah's Witnesses hold one view, Orthodoxy answers with
a council and its point).

**Choice.** `EDITORIAL.md` principle 10: a dispute between traditions is always
shown as a pair — the contesting view with its source, then the contested
tradition's answer in brief with where it is stated. A tradition's position on
a topic still describes only itself; disputes are a separate element, and the
work is task M19 (`docs/tasks/site-m19-disputes.md`).

**Consequences.** Qur'an 57:27 returns as the contesting side of the
monasticism dispute, not inside Islam's fasting position.

## 2026-09-26 — Every side of a dispute says whether its tradition is united

**Question.** Only Islam's part in the icons dispute said the question was
disputed within Islam, while the Protestant parts in the icons and monasticism
disputes quoted Reformed and Lutheran texts as if they spoke for the whole
family. The owner: «но ведь разночтения есть у всех конфессий?», then chose
«Пометка у всех» over a note only on divided traditions or splitting a
tradition across both sides.

**Choice.** Every part of every dispute carries a unity mark with its own
proof: «Общая позиция традиции» and the authority behind it (an ecumenical
council, the Catechism of the Catholic Church, the Adventist fundamental
beliefs, the Watch Tower Governing Body's worldwide teaching, the Qur'an), or
«Единого мнения нет» and who within the tradition holds otherwise (Lutherans
and Pentecostals on images, Anglican religious orders on monasticism, Muhammad
Abduh on the hadith about images). `EDITORIAL.md` principle 10 records it; the
build fails on a part without the mark.

## 2026-09-26 — Orthodox positions rest on conciliar decisions

**Question.** The Orthodox unity mark on monasticism cited only the Russian
Orthodox Church's 2017 Regulation, which speaks for one Local Church. The owner:
«всегда есть решения соборов — ищи на азбука ру, там все что нужно».

**Choice.** Where the site says what Orthodoxy as a whole holds, it cites a
conciliar decision first: an ecumenical council, a local council whose canons
the Council in Trullo (canon 2) confirmed for the whole Church, or a
conciliar statement of the Eastern Patriarchs, found in azbyka.ru «Церковное
право» and its library. Russian Church documents and the Filaret catechism
stay as sources for how the Russian Church states or applies it.

## 2026-09-26 — Sources readers in Ukraine can open

**Question.** Several .ru sources (baptist.org.ru, rchve.ru, ccconline.ru and
others) are blocked in Ukraine. The owner: «ру домены заблочены в укр — ищи
мировые и переводи на ру».

**Choice.** A source on a blocked domain is replaced by an international one
(or, where the same document is archived, by its web.archive.org copy); a
foreign-language source is rendered in Russian in the site's own words, with the
verbatim original kept as the proof excerpt. Russian-only bodies (the Russian
Baptist and Pentecostal unions) give way to world bodies of the same family
where their blocked pages were the only proof.

## 2026-09-26 — Paragraph references on shared source links

Keep one ProofLink per URL, merging the § references from its proof titles
into that link's title (for example, §880, 882). Preserve first-seen order,
remove duplicate references, and keep excerpts out of the visible label.
Existing excluded URLs and numbered inline links retain their behavior.
This preserves precise references without repeating the same source link.

## 2026-09-26 — Explain dispute filtering beside the selection

On the comparison page, show one short hint immediately below the tradition
selection bar: one selected tradition shows all sides of its disputes, while
two or three show only selected sides. Keep the hint outside the sticky bar
so it does not increase the persistent header height. Filtering is unchanged.

## 2026-09-26 — Phone comparison header

At viewport widths up to 600px, display selected traditions as separate rows
in a non-sticky header. Allow names to wrap while reserving a separate grid
cell for each remove button. Three full names previously overlapped at 375px,
and the sticky header obscured dispute titles while scrolling. Keep the
existing sticky column layout above 600px and leave selection behavior intact.

## 2026-09-26 — Desktop-only scope

**Question.** Should the site keep testing and fixing a separate mobile
layout (375px acceptance checks, phone-width fixes), given the desktop
comparison and chronology views are the site's real use?

**Choice.** The owner (relayed by ORK from the ORK chat): «сайт проектируем
только для desktop. Проверку 375px и отдельную мобильную компоновку убираем
из объёма и критериев готовности.» Design and acceptance target desktop
only from here on; a 375px check and any separate mobile layout are out of
scope. Existing mobile-specific fixes already landed (e.g. the phone
comparison header, 2026-09-26 above) are not reverted - this only stops
further mobile-specific work and checks.

## Compact page citations (2026-09-26)

Owner approved numbered references in the reading text with full source titles,
excerpts and access dates in a per-page bibliography. Short quote attribution
remains visible. This supersedes the open source-name line decision for new
components; the migrated pair document retains its text-fidelity contract.
Sources behind hidden comparison content remain in the bibliography, explicitly
labelled; return links to filtered-out content are hidden.

## Comparison dropdown ordering (2026-09-26)

The owner requested three fixed selection slots with alphabetically sorted
religion names. Dropdown options therefore use Russian alphabetical order,
while selected content follows its assigned slot, including empty gaps.
Historical/editorial order elsewhere stays unchanged. Native selects reuse
the existing selection client without adding a popup dependency. The `t`
parameter stays compatible; `slots` adds shareable placement information.

## Sources tab instead of inline citations (2026-09-26)

The owner replaced the compact-citation decision above: reading pages should
show the content without repeated numbered references or page bibliographies.
The Sources tab owns evidence links, quotations, access dates and demographic
counting methods. Tradition cards and comparison cells show only the rounded
population value; the associated year and method remain available in Sources.
Quote attribution remains plain text so the speaker or passage stays clear.
Proof data is preserved, including the Bible guide and quote/translation URLs
that do not have separate proof metadata. Existing navigation and image licence
attribution are not citation markers. The migrated pair document retains its
text-fidelity contract.

Acceptance: no generated numbered citation links or page bibliographies;
Bible evidence and demographic context present in Sources; comparison selection
unchanged; `npm run verify` passes. No new dependencies or source claims.

## One historical date column (2026-09-26)

Overview follow-up: remove the global selection bar from the homepage as well.
The overview keeps all eight profile cards visible regardless of comparison
state. Comparison retains its own selectors; navigation and the reading-route
link remain the entry points to that page.

Subsequent owner approval: the History page has no tradition selection bar or
selection-dependent dimming. All branches remain readable regardless of saved
comparison state or a legacy `t` query parameter. Comparison selection is
unchanged; profile links now open the general chronology without promising a
selected branch. This supersedes the highlighting requirement below.

The owner approved replacing the parallel Byzantine/Christian date columns on
the timeline with one sequential BCE/CE chronology. Religious creation epochs
move to a clearly attributed introduction outside the historical event list;
tradition self-views move to their respective profiles. This supersedes the
two-column timeline presentation, not the underlying evidence or profile data.
Branch ancestry and selection highlighting must remain intact. Verify epoch
separation, event ordering, profile self-views and the existing project gate.

## 2026-10-01 — Confessional reading and iPhone scope

The owner reaffirmed that the site is an Orthodox account, proceeds from the
truth of Orthodox faith, and should present other religions through their own
statements alongside the Orthodox assessment. Search and reading aids retain
that hierarchy.

The owner subsequently requested comfortable reading on iPhone. This
supersedes the desktop-only acceptance boundary for the current reading
improvements: narrow viewport reading and navigation are now in scope.


## 2026-10-01 — Progressive reading and demographic grouping

The owner requested a narrative in the voice of an Orthodox teacher: first
introduce religions, then their origins and development, contemporary numbers
and maps, shared features and reasons for differences, and finally deeper
comparisons. The owner corrected “history of divisions” to a history of origins.
Orthodox teaching remains the foundation; other traditions retain their own
attributed descriptions.

The owner chose introduction first with separate numbers and map pages, and
requested one approximate-data note referring to open sources available in
2026 instead of repeated years. Original observation dates remain in sources.
Christians form one category in world comparisons; internal Christian groups
are shown separately. The implementation must not mix dates to manufacture
confessional populations or equate a statistical category with ecclesial unity.


## 2026-10-01 — Christian and Byzantine date notation

The owner requested “от Рождества Христова” / “от Р. Х.” for Christian-era
dates and “от Сотворения мира” for earlier chronology. The timeline and profile
chronologies therefore use Byzantine creation years before AD 1 and Christian
years from AD 1 onward, in one column. This supersedes the BCE/CE display in
“One historical date column”; stored event years and their ordering stay intact.
The date key identifies the Byzantine era and its existing January–August
conversion for dates without months. Historical estimates of the Nativity and
other traditions' creation epochs remain attributed; source excerpts and
migration originals are unchanged. Author-written reference dates use
“до Р. Х.” where a common calendar is needed for source comparison.


## 2026-10-09 — Reading for a newcomer

The owner asked that a reader without religious education understand every
difference without wading through long pages: short theses, plain language,
not maximal detail. Each analysis card therefore opens with a one-sentence
summary in the reading flow and folds its three positions, further reading and
sources under it; every tradition page opens with «Главное», six to ten key
differences linking to their cards. Summaries paraphrase the card's sourced
content and introduce no claim. Glossary terms get inline hints on their first
mention as progressive enhancement; the HTML text is unchanged. Creation-era
years carry the same year before the Nativity beside them, extending the date
notation above without replacing it. The glossary stays in the reference group
of the navigation (owner, 2026-09-26); «С чего начать» joins the reading
sections as their first step.


## 2026-10-09 — Question-first comparison of Orthodoxy and one religion

The owner found three columns hard to read and asked to compare Orthodoxy with
one chosen religion, question by question, and to see one question across all
religions. The comparison page is replaced (owner's choice): each topic is a
question in three separate blocks: the Orthodox teaching, the chosen
tradition's teaching, then where they part together with the highlighted
Orthodox answer; only the analysis links and sources fold (owner, after
reading the first versions). «Этот вопрос у всех» lists one difference line
per tradition. Jehovah's Witnesses is the default choice. This supersedes the
two selectable columns of EDITORIAL.md principle 8 and the column slots of
site-m14-selection.md.
