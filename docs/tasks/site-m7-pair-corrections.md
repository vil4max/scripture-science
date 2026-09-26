# Task — M7: visible, sourced corrections on the pair page

State: approved (owner, 2026-09-25: build to the final state; corrections are
shown for review, not hidden)
Sources: `docs/research/VERIFICATION.md`, `docs/SOURCES.md`, `docs/EDITORIAL.md`
(principle 3), `source/orthodoxy-jw.html`.

## Goal

The pair page stays the migrated document, but facts that verification found
outdated or imprecise are corrected visibly: the corrected words are marked on
the page, a list «Исправления к исходному тексту» at the end gives the original
wording, the correction, the reason and the source, and the text check compares
against the source with exactly these corrections applied.

## Design

- `src/data/corrections-orthodoxy-jw.yaml`: `{ id, find (exact source text),
  replace, reason (Russian), proof: [ { url, title, tier, excerpt, accessed } ] }`.
  `find` must occur exactly once in the migrated data; the build fails otherwise.
- The pair page applies each correction when rendering the migrated HTML,
  wrapping the new words in `<ins class="correction" id="corr-<id>">` with a link
  to its entry in the list. The migrated data files stay unchanged (they remain
  reproducible by `scripts/migrate_source.py`).
- `scripts/check_text.py` applies the same corrections (the `replace` text) to
  the source text before comparing, and also checks the corrections list text is
  present; any other difference still fails.

## Corrections (each re-verify on the page before use)

1. Blood, comparison row: «Отказ от переливания; бескровное лечение, фракции
   крови — по совести» → «Отказ от переливания цельной крови; четыре основных
   компонента и фракции крови — по совести (с 2026 года)». Source: the Russian
   jw.org page «Как Свидетели Иеговы проявляют уважение к жизни?» (excerpt
   «Руководящий совет решил, что этот же принцип относится и к четырём основным
   компонентам крови»).
2. Blood, «Что пересматривалось» list: after «позднее допущены фракции крови по
   совести» add «; в 2026 году — и четыре основных компонента крови», same source.
3. Psalm numbering (principle 3): in the Jehovah's Witnesses column «Пс 104:5» →
   «Пс 104:5 (в Синод. — 103:5)»; prove with a Synodal text page for Пс 103:5.
4. Migne: «патрологии Миня (XIX век): 161 греческий и 217 латинских» → «патрологии
   Миня (XIX век): 161 греческий и 217 латинских тома текста, не считая четырёх
   томов указателей к латинской серии». Source: the Catholic Encyclopedia article
   on Migne (newadvent.org): "217 vols. in all, 1844-55), with four volumes of
   indexes (vols. 218-221".
5. «Азбука веры»: «25 800+» with «трудов в онлайн-библиотеке «Азбука веры»» →
   «≈ 25 000» with «материалов на портале «Азбука веры»». Source:
   https://azbyka.ru/fond/portal-azbuka-very/ («около 25 тыс. материалов»).
6. Schmemann: «Прот. Александр Шмеман (1921–1983)» → «Прот. Александр Шмеман
   (1921–1983), «Дневники», 6 апреля 1973». Source:
   https://azbyka.ru/otechnik/Aleksandr_Shmeman/dnevniki/1.

## Checks

`npm run verify` passes; a test shows the build fails when a `find` text is
missing or occurs twice.

## Boundaries

Owned: `src/data/corrections-orthodoxy-jw.yaml` (new), `src/lib/corrections.ts`
(new), `src/pages/pairs/orthodoxy-jw.astro`, `src/components/Topic*.astro`,
`src/styles/orthodoxy-jw.css`, `scripts/check_text.py`,
`scripts/corrections.test.ts`. Do not edit `source/**` or the migrated data
files. No new dependencies. One commit per step; no push.
