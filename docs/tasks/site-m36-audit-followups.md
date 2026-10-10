# M36 — site audit follow-ups (handoff)

State: audit done and verified (2026-10-10); a first batch of quick fixes is
committed locally, not published; the rest is the plan below. Publishing
waits for the owner's word.

## Authorization and scope

2026-10-10, owner: «анализ сайта + пересмотр визуального сопровождения,
полный аудит на соответствие терминов + предложения по улучшению»; then
«продолжи и закончи»; this session is the main hobby session for the site and
keeps its own handoff, builds an improvement plan and applies the cheap fixes
(«Можешь план доработок себе построить. И если будет не дорого то и
применить»). Also: «про Духа Святого надо проверить… чтобы не продублировался
в разборе символа веры».

## Evidence

- Workflow run `wf_a588de0e-d19` (all agents on Opus): 12 dimension auditors
  (terminology T1–T5, visuals V1–V3, site S1–S4), one skeptic per dimension,
  a completeness critic and four gap auditors (G1 statistics, G2 confessional
  classification, G3 Orthodox practice local vs general, G4 claim–excerpt
  support), then a synthesis.
- 307 findings survived verification (208 confirmed, 99 partly): high 9,
  medium 117, low 181; effort S 233, M 70, L 4. Full list:
  `docs/research/site-audit-2026-10-10-findings.json` (id, dimension,
  severity, effort, evidence, proposal, verifier note).
- The owner-facing Russian report and raw results stay outside the repository
  (`~/Developer/dev-bank/2026-10-10/scripture-science-site-audit/outputs/`).
- Own measurements at 375 px: compare/ about 27,100 px (33 screens),
  worship/ 29, traditions/jw 31; paragraphs up to about 1,570 characters on
  compare/ and worship/; no visual on compare/, worship/, basics/, bible/;
  dist/sources 5.3 MB, compare 0.9 MB, search 0.9 MB; no horizontal overflow.

## Applied (local commit, unpublished)

- Holy Spirit not duplicated in the Creed part: the article 1 (God) lines and
  responses point to the article 8 question instead of repeating the
  Filioque, «Дух — сила» (JW) and divine bodies (LDS).
- Glossary hints skip hidden pairs, captions, form controls, the chosen
  tradition's teaching block and the self-description aside, so the Orthodox
  definition of «Церковь» no longer lands on another church's name
  (T1-2, T5-1, S2-3, T1-7, S3-1).
- iPhone picker scrolls the chosen religion into view (V3-1).
- Four difference lines with a bare «Церковь» fixed; the test also rejects
  the ambiguous subject positions (T1-3, T2-3, S2-2).
- Facts: the Liturgy has three parts in the glossary too (G3-2); Wednesday
  fast for the betrayal, Friday for the Passion, catechism §542 (G3-3); the
  baptism answer quotes article 10 exactly (G3-11); «прп. Иоанн Дамаскин»
  (T3-4).

## Plan (next, by effort)

Quick (S), in this order:
1. Classification badges show their authority; rewrite the JW badge as an
   assessment with its real basis; LDS basis from the 1994 Bishops' Council
   act; glossary shorts «псевдохристианские», «секта» (G2-1, G2-2, G2-6, G2-7).
2. Remove the empty «Церковное устройство и практика» section on six tradition
   pages (V1-1, V2-1, S1-20).
3. Attribute Russian Church practice as such: fast before Communion per the
   ROC 2016 document with its exceptions, reception rites, «в приходах Русской
   Церкви», «обычно» instead of «минимум» (G3-1, G3-4, G3-7, G3-12), and the
   remaining G3 fact fixes (G3-5, G3-6, G3-8, G3-9, G3-17, G3-18).
4. Claims beyond their excerpts (G4-2…G4-24): narrow the wording or add the
   excerpt.
5. Names and capitalization per the terminology table in the report
   (T1-4 «Таинство» in the Orthodox voice, T1-6/T4-2 Литургия, T1-10, T1-11,
   T1-8, T2-1, T2-4, T2-6, T2-8, T2-9, T2-14, T3-5, T3-6, T3-10…T3-13, T4-12),
   typos (T4-1, T4-6…T4-20), numbers with year and method (G1-3, G1-5, G1-6).
6. Navigation: one «Далее» on basics/, an end-of-route block on worship/ and
   reading/, contents for orthodoxy/ (S1-3, S1-4, S1-6); 404, skip link,
   meta descriptions (S3-8, S3-10, S3-11).
7. Split long Orthodox details on compare/ and worship/ into paragraphs
   (S2-8, S2-9).

Medium (M):
- Sources catalogue: add extra-questions, prayers and basics evidence, «Все
  источники по теме» for the extra questions, clean link labels, canonical
  work titles by URL prefix (S4-1, S4-2, T3-2, S4-15).
- Group sources on compare/ and worship/ by URL and by side (S4-3, S4-4, S3-3).
- Search covers the compare/ and worship/ questions, prayers and glossary
  (S1-1, S2-12, S3-5).
- Tradition pages get the route bar and an end block (S1-2, S1-5).
- A head flag (`html.js`) so menus and contents do not flash open (V3-2,
  S1-12, S3-15); timeline readable on a phone without `scaleX` (V1-7, V2-4).
- First visuals: a Creed map (12 articles → questions), the Orthodox daily
  cycle around the Liturgy, Islam's five prayers vs morning and evening
  prayers on one clock, a baptism comparison table (V2 proposals).
- `lang="en"` on English excerpts (S3-13, S4-11); § numbers for about 390
  Filaret proofs (T3-3, S4-8); images with srcset and WebP (V1-16, S3-14).

Large (L):
- Split sources/ (5.3 MB) into catalogue pages by tradition and topic,
  keeping anchors (S3-2, S4-6).
- Extend the «Православная Церковь» rule to analysis keyPoints and card
  shorts (about 220 lines) once the owner decides (T1-1, T2-5, T4-7, S2-4).

## Owner decisions needed

- Extend EDITORIAL §8 («Православная Церковь») to the analysis pages?
- Capitalization of the Liturgy's parts and of other traditions' rites
  (T1-6, T4-2, T1-9).
- Third block label: «Православный ответ» or «Православный взгляд на
  расхождение» (S2-6).
- Adventist self-name (T2-7) and the short «Свидетели» (T2-16).
- Renaming the topics images and baptism (S2-10, S1-16); the 260 million
  figure on orthodoxy/ (G1-2); the Rublev «Saviour» image (V1-9); a stronger
  JW colour (V1-4).

## Resume

Start from this file and `docs/research/site-audit-2026-10-10-findings.json`
(filter by id). Each fix: edit, `npm run verify` with Node 26
(`PATH=/opt/homebrew/bin:$PATH`), browser check at 375 px, English
Conventional Commit; publish only on the owner's word.
