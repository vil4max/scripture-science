# Reading and evidence improvements

State: in progress
Parallelism: none

## Authorized scope

2026-10-01: the owner requested all proposed iterations in sequence, with a
commit and push for each. The Orthodox account remains the site's foundation;
other religions' own statements are attributed separately and compared with
Orthodox teaching. This authorization supersedes the earlier local-only
delivery boundary for the cleanup and these improvements.

## Goal

Let a reader find a question, understand the Orthodox teaching and the other
tradition's own position, inspect the supporting passage, and return to the
same comparison without losing the selected columns.

## Scope and order

1. Finish and deliver the verified repository cleanup and complete catalogue.
2. Add question search, persistent local contents, previous/next navigation,
   and comparison context preservation.
3. Add source search and precise filters; simplify source disclosures, the
   homepage entry points and the sticky comparison header.
4. Explain reading terms, the context of disputes and source authority using
   existing sourced content; expose pending-verification reasons and name the
   scope of represented branches. Preserve unresolved evidence as pending.

Each iteration owns its code, focused checks and documentation. Later steps
depend on the previous step's local verification and commit. Publication uses
the existing main branch and GitHub Pages workflow; no workflow or host
configuration changes are authorized.

## Acceptance

- Orthodox teaching is the explicit foundation, not one interchangeable
  viewpoint. Other traditions' self-descriptions and Orthodox assessments
  remain visually and semantically distinguishable.
- Question search reaches existing cards and handles empty/no-match queries.
- Local navigation remains usable at 1280 and 1440 px in both themes.
- Comparison choices and slot order survive reading, reload and return.
- Source filters apply to the same proof usage: a topic, tradition and role
  cannot accidentally match unrelated usages of the same URL.
- Existing routes, anchors, exact excerpts and pending statuses survive.
- No new theological claim is presented as verified without evidence.
- Run npm run verify with Node.js 26 and review introduced defects before
  each commit; inspect the push result separately from deployment status.

## Constraints

Keep original HTML, migration inputs, research, used images and unique content.
Use existing Astro and browser primitives without new dependencies. Preserve
the nine pre-existing local commits. No history rewrite, force push or mobile
redesign. Source tier describes the publisher; it is not ecclesiastical
approval. External quotation problems remain marked until actually resolved.

## Evidence

The initial cleanup passed 145 Node tests and two Python tests, with 16 built
pages and no Astro diagnostics. Migration fidelity remains 1028 source text
nodes and 14 historical corrections. The completed Sources baseline is
5,802,055 HTML bytes (515,149 bytes with local gzip compression).

### Iteration 2 — question navigation

Implemented a static search page with 207 question links, topic/tradition
filters, Russian word normalization and an explicit no-match state. Detailed
analyses have a sticky local contents list, active question and previous/next
links. Reading links carry both selection and slot placement.

Validation: npm run verify under Node.js 26 passed 148 Node tests, two Python
tests and 17 pages, with no Astro diagnostics. Browser checks at 1280 px
(light) and 1440 px (dark) confirmed search, source disclosure, active contents
and selection preservation through question navigation, return and reload.
Iteration 1 was committed as 83121ab and pushed successfully.
