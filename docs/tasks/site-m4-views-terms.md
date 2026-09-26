# Task — M4: content for "views of others" and the terms box

State: approved (owner, 2026-09-25: build the site to its final state)
Parallelism: 1 content writer
Sources: `docs/EDITORIAL.md` (principles 5 and 9), `docs/SOURCES.md`,
`docs/research/views-of-others.md`, `docs/research/orthodox-view-of-separated-groups.md`.

## Goal

Two data files the site renders as sections: how each tradition officially
views the others (principle 9, symmetric), and a box explaining the terms the
site uses and avoids (principle 5).

## `src/data/views-of-others.yaml`

A list, one entry per tradition id (`judaism`, `orthodoxy`, `catholicism`,
`islam`, `protestantism`, `lds`, `adventism`, `jw`), each with `documents`:

```yaml
- tradition: catholicism
  documents:
    - title: "…"             # original title
      title_ru: "…"          # Russian title if an official one exists, else a faithful rendering
      body: "…"              # issuing body, Russian
      date: "1965-10-28"
      status: "…"            # Russian, e.g. «соборная декларация», «заявление группы учёных (не обязательно)»
      about: [judaism, islam] # traditions the document speaks about
      summary: "…"           # 1–3 Russian sentences, the document's own terms, no evaluation
      quote: { text: "…", url: "…" }   # verbatim, original language; Russian official text when it exists
      proof: [ { url, title, tier, excerpt, accessed } ]
      status_check: verified  # verified | todo
```

Orthodoxy uses St Basil's Canon 1 (full canon text is public domain, quote it in
full from https://azbyka.ru/pravo/vasiliya-velikogo-1/) and the 2000 document on
the non-Orthodox. The 1906 draft anathemas are a draft of a pre-conciliar
department: include them only with `status: «проект отдела Предсоборного
Присутствия, не соборное определение»`. The 1864 state criteria are state
policy, not a tradition's view: leave them out of this file.

## `src/data/terms.yaml`

```yaml
- term: "секта"
  use_on_site: false          # the site's own voice does not use it (principle 5)
  definition: "…"             # Russian, from a reference-tier source
  notes: "…"                  # etymology, confessional use, church–sect typology, the dispute over the word
  proof: [ … ]
- term: "деноминация"
  use_on_site: true
  …
```

Terms: секта, конфессия, деноминация, новое религиозное движение (НРД),
реставрационизм, адвентизм, религиозные меньшинства. Definitions from
reference-tier sources (encyclopedias, academic works, Inform); confessional
sources only for the confessional usage, attributed. Close the `TODO: verify` of
`docs/EDITORIAL.md` where a reference source is found.

## Rules

Same as `docs/tasks/site-m3-matrix-content.md`: open every page you cite and
copy the excerpt from it (at most 25 words, verbatim); research notes are leads
only; no evaluative words in the site's own voice; nothing beyond the sources;
`status_check: todo` with a `todo:` line when unverified. Write only these two
files; do not commit; do not use the in-app browser tools.

## Check

Both files parse as YAML with the `yaml` package in `node_modules`; every
document and term has a complete `proof`.
