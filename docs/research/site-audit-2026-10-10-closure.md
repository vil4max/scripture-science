# Site audit 2026-10-10 — closure

Every one of the 307 verified findings in
`site-audit-2026-10-10-findings.json` is closed. The owner asked on
2026-10-14 to finish all the fixes before the freeze («закончи все правки
что есть — проект должен быть стабильным перед заморозкой и беклог
чистым», then «продолжай и доделай всё, потом пуш»). Owner decisions taken
the same day are recorded in `docs/DECISIONS.md` ("Audit decisions").

## Fixed

All findings not listed under the two sections below are fixed. They landed
in these commits, which all pass `npm run verify`:

- Before the freeze (2026-10-10 to 2026-10-14): b153f7a, 2839971, ed4ff24,
  676ec83, 539fe6f, 0ad993c, a93b50b, 86c04d0, fe8e51f and the commits
  around them (see `docs/research/site-history-2026-10.md`).
- c870a55: claims G4-5 to G4-25 rest on their own excerpts.
- 605106a: terminology T1–T3 and the owner's naming decisions.
- 18d898f: typography, glossary and hints (T4, T5).
- 1af61ef: navigation and comparison (S1, S2).
- 3b6e030: visual and accessibility fixes (V1, V3) and the first visuals.
- 4152fd1: the split and completed source catalogue (S3-2, S4).
- c0f24f5: search, address, canonical and sitemap, hint and font
  performance, accessibility (S1-1, S1-18, S2-12, S3).
- 33612c9: statistics years and classification sources (G1, G2, G3,
  G4-1).
- d8f69b4: the remaining sourced visuals and phone image copies (V2,
  S1-17, S3-14).
- 2b58005: the last non-literal excerpts; the ten pending analysis cards
  verified (roadmap backlog).

## Partly fixed

- **S3-3** (compare/ ships every tradition's pair): the Orthodox sources of
  the extra questions are listed once and each pair lists its sources once,
  grouped by side. All seven pairs stay in the page, because the picker and
  «Этот вопрос у всех» must work without a second request.
- **T5-17** (hints on proper names and titles): tradition names no longer
  get hints; the one patristic title in a list («Против ересей») can still
  get the «ересь» hint, which is the word's real meaning there.

## Not done, with the reason

- **V1-2** — the source of the All Saints icon on orthodoxy/: the image was
  provided by the owner; identifying the original needs the owner.
- **V1-8** — the three SVG diagrams of the retired Orthodoxy–JW page: they
  belong to the preserved migration (text-fidelity contract, DECISIONS
  2026-09-27) and would need restyling and re-verification; the JW analysis
  covers the same points in text.
- **V1-11, V1-13** — new photos for the other religions and a common image
  subject: they need newly licensed images.
- **V2-6** — a daily strip: service times vary by place; the week strip
  (V2-5) and the Liturgy parts (V2-7) cover the rhythm with sources.
- **V2-8** — an agreement grid: the audit itself found it cannot be built
  from the assessments without new data.
- **V2-10, V2-11** — continuity bars and ancestry paths on tradition pages:
  the self-view and the folded chronology already state both; the new
  lineage tree on basics/ shows the ancestry.
- **V2-14** — a self-name strip on religions/: each card shows the full
  self-name, and the comparison has the question «Как себя называют».
- **V2-24** — a year-cycle visual: the audit allows it only with sourced
  placement of every feast; not added.
- **V3-11, V3-12** — shared style utilities and one reading-contents
  component: refactors without a reader-visible change, left for a future
  code pass.
- **T5-12** — sub-headings in the basic glossary group: the alphabetical
  index already serves lookup.

## No change needed

- **V2-17** — the audit advises against religious-symbol icons; none added.
- **V2-23** — applies only if tradition sizes are charted on numbers/,
  which they are not.
- **T5-16** — glossary terms with no hinted occurrence keep their patterns;
  they hint as soon as such text appears.
