# Reading and evidence improvements

State: implemented and verified
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

5. Follow-up authorized by the owner on 2026-10-01: make reading comfortable
   on iPhone as well, checking narrow viewports and repairing reading, search,
   contents, evidence and comparison layouts.

Each iteration owns its code, focused checks and documentation. Later steps
depend on the previous step's local verification and commit. Publication uses
the existing main branch and GitHub Pages workflow; no workflow or host
configuration changes are authorized.

## Acceptance

- Orthodox teaching is the explicit foundation, not one interchangeable
  viewpoint. Other traditions' self-descriptions and Orthodox assessments
  remain visually and semantically distinguishable.
- Question search reaches existing cards and handles empty/no-match queries.
- Local navigation remains usable at 1280 and 1440 px in both themes and at
  375, 390 and 430 px for iPhone reading.
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
the nine pre-existing local commits. No history rewrite or force push. The later iPhone request supersedes the
earlier desktop-only boundary for these reading improvements. Source tier describes the publisher; it is not ecclesiastical
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

### Iteration 3 — evidence discovery and page entry points

The complete catalogue has one canonical disclosure per URL, with exact
passages and usage attribution. Search combines topic, analysis tradition,
role and source tier without cross-matching unrelated usages. Existing
section anchors remain; compact source links open the canonical disclosure
and clear a conflicting filter. The homepage has three task entry points and
a compact Orthodox foundation; comparison selectors remain visible in a
shorter sticky header.

Validation: Node.js 26 npm run verify passed 150 Node tests, two Python tests
and 17 pages, with no Astro diagnostics. Browser checks confirmed intersecting
filters, no results, reset, canonical disclosure and desktop overflow.
Sources HTML: 5,074,931 bytes; gzip: 489,175 bytes. Browser navigation
timing was unavailable through the provided UI inspection API; no loading-time
improvement is claimed from byte size alone. Iteration 2: 5ef9fdb, pushed.

### Iteration 4 — confessional reading context

Added a reading guide that explicitly states the Orthodox foundation,
distinguishes source authority and claim status, and routes four key terms and
three disputed questions to existing sourced material. Dispute anchors open
their discussion. All ten pending cards now have concise Russian reader notes;
original technical notes, proof records and pending statuses remain intact.
Card evidence identifies its role in the argument. No external quotations were
newly verified or promoted to verified status.

Validation: npm run verify on Node.js 26 passed 150 Node tests, two Python
tests, 18 pages and zero Astro diagnostics. Browser checks confirmed the guide
links, open dispute and Russian pending notes. Iteration 3: 35df129, pushed.
The first 390 px inspection demonstrated that the desktop local contents
compresses the article; iteration 5 addresses this measured failure.

### Iteration 5 — iPhone reading

Narrow screens use a collapsible site menu and a sticky, collapsible analysis
contents list. Question jumps close the list and keep the heading below it.
Comparison topics and facts stack in the selected order, with Orthodoxy first
and each tradition named locally. The tall comparison selector stops sticking
on phones. Search controls, source disclosures and question navigation have
larger touch areas. Reference layouts, country details, Bible guidance and
the timeline fit a narrow reading column. The population table wraps labels;
its redundant inline bar column is hidden on phones, with all counts and
shares retained alongside the world chart.

Validation: Node.js 26 npm run verify passed 150 Node tests, two Python tests,
18 pages and zero Astro errors, warnings or hints. Internal links, anchors and
duplicate IDs pass; migration preserves 1028 source nodes and 14 corrections.
Browser viewport checks at 375, 390 and 430 px cover both themes, menu,
contents jumps, question text, source filtering/disclosure, search, comparison
order and reload persistence, population table, country selection, Bible and
history. The inspected pages have no horizontal overflow. Desktop regression
checks at 1280 and 1440 px preserve the sidebar and local contents. Physical
iPhone/Safari testing was not run; the available browser provided viewport
simulation. No device or Safari-specific result is implied.

Final Sources HTML: 5,075,730 bytes (489,379 bytes gzip), compared with the
original incomplete baseline of 1,730,744 bytes and the complete iteration-1
catalogue of 5,802,055 bytes. Iteration 4: 37af71f, pushed; GitHub Pages reports
successful deployment for each of iterations 1–4. Iteration 5 uses the same
authorized commit/push and deployment workflow.
