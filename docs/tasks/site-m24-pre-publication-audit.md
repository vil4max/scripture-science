# Task — M24: pre-publication audit and cleanup

State: implemented locally in six item commits; awaiting combined owner/Claude
review and visual acceptance. Original approval (owner, 2026-09-26: «выполнить все до публикации» / «промпт
дать чтобы все проверил все наверстал и отдал нам на вычитку»). Handed to
Codex; Claude reviews each commit as usual.
Sources: `docs/ROADMAP.md` ("Known issues"), `docs/EDITORIAL.md`,
`docs/SOURCES.md`, `docs/DECISIONS.md`, `docs/tasks/site-m19-disputes.md`,
`docs/tasks/site-m23-christian-denominations.md`.

## Goal

Clear the concrete, unscheduled backlog so what remains before publication is
owner proofreading and small edits, not open engineering work. This is a
cleanup pass, not a redesign: fix what is listed below, report what cannot be
fixed and why, and stop - do not invent new scope.

## Items (one commit each, independent - any order)

1. **The `organisation` topic across all eight traditions** (owner,
   2026-09-26: «численность отдельно, организация отдельно - и так со всеми
   религиями: кто кому подчиняется»). Population belongs in `adherents`, not
   here; this topic is specifically the structure - who answers to whom, a
   single hierarchy or a family of equal bodies, and any concrete count that
   goes with it. Known gap: Orthodoxy's summary
   (`src/data/matrix/orthodoxy.yaml`) names the family of autocephalous
   Local Churches but not how many there are or that they are equal in
   status - it was in the original migrated page and is missing now. Find a
   reference-tier source for the current count and a full or representative
   list, phrased as equal in status (not ranked). This is a live, contested
   area (recognition of the Orthodox Church of Ukraine among them): state
   only what the source says, do not take a side on a disputed recognition,
   and if sources disagree on the count, say so with both figures and their
   own sources rather than picking one silently. Then read the other seven
   traditions' `organisation` positions the same way - each is missing a
   concrete structural fact (a count, a named governing body, an explicit
   line of subordination) only fix it where the source already cited (or a
   reference-tier one you find) states it plainly; where nothing concrete is
   missing, say so in the report rather than padding the summary. Verbatim
   excerpts, ≤25 words, one verification-log row per changed tradition.
2. **Judaism, My Jewish Learning excerpt** (`src/data/matrix/judaism.yaml`):
   uses a straight apostrophe where the source likely uses a typographic
   one (or vice versa) - re-fetch the live page and correct the excerpt to
   match exactly.
3. **JW «Вавилон Великий» summary**: a Russian rendering of an English
   phrase sits in guillemets, which reads as if quoted from a Russian
   source. Re-check the actual Russian jw.org wording for that term and
   quote it verbatim, or drop the guillemets if it is a paraphrase.
4. **Three Adventist excerpts** differ from mosadvent.ru by split words.
   Re-fetch mosadvent.ru (or its Wayback copy if it now times out) and
   correct each excerpt to match exactly, or report which of the three
   could not be reached.
5. **Re-check previously unreachable sources**: sefaria.org,
   mosmechet.ru/ramadan, baptist.org.ru, live rchve.ru. Try the live page
   and, failing that, Wayback. Where a citation now resolves, verify its
   excerpt still matches and update the URL/access date if it changed;
   where it still doesn't resolve, leave it and report so in the audit
   summary (don't spend unbounded time on a source that is simply down).
6. **M23** (`docs/tasks/site-m23-christian-denominations.md`): do the source
   research and design as that brief describes. If a clean reference-tier
   breakdown exists, build it directly, one commit, and include it in this
   audit's final report instead of pausing separately - only stop and ask
   if no defensible source is found or a genuine design judgment call comes
   up (the brief's own criteria).

## Rules

Same as every recent brief here: verbatim excerpts script-checked against
fetched, tag-stripped, whitespace-normalised text (≤25 words); .ru sites
blocked in Ukraine cited through Wayback; one verification-log row per
content change; keep it light (no new tests or mechanisms); `npm run verify`
after each commit; no push.

## Out of scope

- New dispute topics: still need the owner's agreement first
  (`docs/tasks/site-m19-disputes.md`) - list candidates in the report
  instead of adding any.
- Publication itself: needs a GitHub repository, the owner's decision on
  visibility, and the orchestrator's `APPROVED` for the push - not part of
  this task.
- Anything not named above: report it, don't fix it silently.

## Report

One combined report at the end covering all six items: what changed, what
was left as-is and why, `npm run verify` result for each commit, and an
explicit list of what (if anything) still blocks publication after this
pass.

## Execution notes (2026-09-26)

- Item 1: all eight organisation positions reviewed. Orthodoxy, Catholicism,
  Islam, LDS and Adventism changed as logged. Judaism already identifies
  rabbinic authority and movement-specific ordination; JW already identifies
  elder bodies, circuits and the Governing Body; Protestantism already contrasts
  Anglican, Pentecostal, Reformed and Baptist governance. These three summaries
  remain unchanged rather than adding unsupported counts or hierarchy.
- Items 2–5: punctuation, Russian JW quotation, Adventist excerpts and reachable
  citations corrected. Six distinct Adventist excerpt mismatches were found,
  including the duplicate lineage proof. Two additional displayed quotations
  (`worship`, `rules`) retain word-split differences outside the listed excerpt
  cleanup. Baptist live/Wayback remains unresolved; RChVE live is unavailable
  but its existing archive is verified. Ramadan uses a verified capture and
  Sefaria uses verified text endpoints.

- Item 6 / M23: added a collapsible, sourced denomination list beneath the
  Christians row using Pew’s original 2010 estimates (report published 2011).
  Both year and Christian-population denominator are explicit; the 2020 pie
  is unchanged. This uses the brief’s defensible older-report option, with no
  fabricated 2020 figures.

### Validation and remaining publication work

- Items 1–5 each passed `npm run verify` with 62 tests, before and after their
  respective commits. M23 passed with 65 tests, including the updated existing
  data tests. Exact source checks are recorded in the verification log.
- Built HTML confirms the expandable row, four groups, nine proof links and
  the date/denominator note. Desktop and 375px visual checks remain **not run**:
  browser access is still denied. Responsive CSS inspection is not a visual pass.
- Additional out-of-scope findings: Adventist `worship` and `rules` displayed
  quotes contain source word-split differences; Islam’s `worship` proof from
  `mosmechet.ru/5stolpov` uses a hyphen where the fetched page has an em dash.
  These need an editorial decision or a separately authorised correction.
- Baptist source availability is unresolved; the existing constituent-church
  mirror remains. Live RChVE is unavailable but the cited archive is verified.
  The pre-existing ekzeget.ru Rev 7:4 link limitation remains.
- Publication still needs owner proofreading/review, resolution or acceptance
  of these source limitations, visual acceptance, a GitHub repository and
  visibility decision, and explicit authorised push approval. No remote is
  configured and nothing was pushed.
