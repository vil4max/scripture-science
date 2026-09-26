# Task — M3: content of the comparison across traditions

State: approved (owner, 2026-09-25: build the site to its final state)
Parallelism: up to 4 content writers, one file per tradition, no shared files
Sources: `docs/EDITORIAL.md`, `docs/SOURCES.md`, the research notes in
`docs/research/`, and the traditions' own official pages.

## Goal

For each of eight traditions, one data file with its identity and its position
on fourteen common topics — in Russian, in the tradition's own terms, every
statement backed by a page that was opened and quoted.

## Traditions and files

| id | Name on the site | File | Research notes |
|---|---|---|---|
| judaism | Иудаизм | `src/data/matrix/judaism.yaml` | `docs/research/judaism.md` |
| orthodoxy | Православие | `src/data/matrix/orthodoxy.yaml` | `docs/research/orthodoxy-catholicism.md` |
| catholicism | Католичество | `src/data/matrix/catholicism.yaml` | `docs/research/orthodoxy-catholicism.md` |
| islam | Ислам | `src/data/matrix/islam.yaml` | `docs/research/islam.md` |
| protestantism | Протестантизм | `src/data/matrix/protestantism.yaml` | `docs/research/protestantism.md` |
| lds | Святые последних дней | `src/data/matrix/lds.yaml` | `docs/research/restorationist-adventist-lds-jw.md` |
| adventism | Адвентисты седьмого дня | `src/data/matrix/adventism.yaml` | same |
| jw | Свидетели Иеговы | `src/data/matrix/jw.yaml` | same |

For the Church of Jesus Christ of Latter-day Saints, follow the church's own
naming guidance on churchofjesuschrist.org (it asks not to call the church
"Mormon"); record the page you used.

## Topics (ids and Russian titles)

god «Бог» · name-of-god «Имя Бога» · jesus «Иисус, пророки, Мессия» ·
spirit «Святой Дух (дух Божий)» · scripture «Писание и канон» ·
authority «Предание и толкование» · salvation «Спасение» ·
afterlife «Душа, смерть и посмертие» · end-times «Конец времён» ·
worship «Богослужение и обряды» · images «Изображения» ·
holy-days «Праздники и священное время» · organisation «Устройство и духовенство» ·
rules «Особые правила (пища, кровь, армия, государство)»

## File format (YAML, UTF-8)

```yaml
id: catholicism
name: Католичество
full_name: Католическая церковь
family: christianity            # judaism | christianity | islam
since:
  year: 33                      # integer; negative for BCE
  label: "…"                    # Russian, e.g. «ок. 33 г. · Пятидесятница»
  note: "…"                     # optional: historical vs self-understood dating
  proof: [ … ]                  # see "proof" below
scripture:
  name: "…"                     # the Russian translation the tradition uses
  url: "…"                      # where its verse texts can be read
  proof: [ … ]
adherents:
  value: "…"                    # Russian, e.g. «≈ 1,4 млрд»
  year: 2024
  method: "…"                   # e.g. «крещёные», «возвещатели»
  proof: [ … ]
self_view:                      # how the tradition itself sees its origin and continuity
  summary: "…"                  # 1–2 Russian sentences
  proof: [ … ]
positions:
  - topic: god
    summary: "…"                # 1–2 Russian sentences, the tradition's own terms
    quote:                      # optional; verbatim from the tradition's own source
      text: "…"                 # Russian when a Russian official text exists
      source: "…"               # document or page title
      url: "…"
    scripture:                  # optional; a verse the tradition itself cites for this
      ref: "…"                  # e.g. «Ин 1:1»
      text: "…"                 # verbatim, in the tradition's own translation
      url: "…"
    proof: [ … ]
    status: verified            # verified | todo
```

`proof` is a list of `{ url, title, tier, excerpt, accessed }`: `tier` is
`official`, `reference` or `news`; `excerpt` is verbatim from the page, at most
25 words, in the page's language; `accessed` is the date you opened it
(`2026-09-25` or later). A statement with no opened source gets `status: todo`
and a `todo:` line saying what is missing. All fourteen topics appear in every
file, in the order above; a topic that does not apply to a tradition says so in
`summary` with a source.

## Rules

- Open every page you cite in this task and copy the excerpt from it; the
  research notes are leads, not proof. Wikipedia and aggregators are for
  discovery only.
- Describe each tradition as it describes itself, from its own sources; no
  evaluative words (principle 5). Where a tradition's families or streams
  differ (Protestant families; Orthodox, Conservative and Reform Judaism; Sunni
  and Shia Islam), say so in the summary.
- Scripture quotes come from the tradition's own translation, verbatim, with a
  per-verse URL where one exists.
- Nothing beyond the sources: no interpretation of your own, no comparison with
  other traditions in the text.
- Write only your own files. Do not edit anything else; do not commit; do not use
  the in-app browser tools.

## Check

Each file parses as YAML (`python3 -c "import yaml"` is not available; use
`node -e` with the `yaml` package present in `node_modules`, e.g.
`node -e "require('yaml').parse(require('fs').readFileSync(process.argv[1],'utf8'))" <file>`),
has all fourteen topics, and every `proof` entry has all five fields.
