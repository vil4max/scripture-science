# Orthodox editorial edition

Status: implementation verified; the owner authorized one consolidated commit and push to canonical main on 2026-09-27. This later delivery instruction supersedes the implementation-only publication boundary. Independent theological acceptance is not claimed.
Assignee: Codex. Parallelism: 1. Publish only the reviewed Scripture Science edition through the existing GitHub Pages workflow.

## Goal and decisions

Revise the entire Russian-language site as «Православный взгляд на религии мира» for adult readers. Orthodoxy is the doctrinal reference. Preserve accurate attributed accounts of other beliefs, original source provenance and existing routes. Use exact sourced definitions with faithful explanatory prose. Distinguish Church doctrine, local Russian Orthodox practice and individual theological opinion.

Comparison always starts with Orthodoxy. New readers see Catholicism and Jehovah's Witnesses beside it; those two choices remain editable and clearable. Existing choices retain up to two non-Orthodox traditions. Keep the desktop scope, three topic groups, world/country charts and source reference page.

## Outcomes and verification

1. Editorial contract and correction register; all 15 Orthodox foundations and 105 assessments are sourced and reviewed.
2. All 13 questions and the legacy pair arguments receive a documented disposition. Specific questions never substitute generic topic answers for missing participants.
3. Homepage, history, Scripture, profiles and reference material share the new perspective.
4. Selection tests cover defaults, migration, duplicates, empty slots, storage failure and shared links. Browser checks cover reloads, disclosures, anchors and continuous chronology.
5. Run npm run verify and review the final diff. Automated validation proves structure and behavior, not theological authority or the truth of an interpretation.

## Constraints

No new dependencies or stack changes. The owner's latest instruction authorizes commit and push of this edition; retain the existing deployment configuration. Preserve the original pair document for provenance and fidelity validation; revise its public presentation. A claim without accessible supporting evidence cannot become a verified doctrinal assertion.

## Evidence

- [Correction register](../research/orthodox-edition-register.json): 15 foundations, 105 assessments, 13 disputed questions and 12 legacy topics, with before/after text, classification and evidence.
- [Source passage checks](../research/orthodox-edition-source-check.json): 79 matched excerpts and quotations in the Orthodox foundation, with source locations and retrieval hashes.
- [Implementation and review record](../research/orthodox-edition-review.md): verification, desktop observations and the remaining manual acceptance boundary.

## Checkout reconciliation

The owner's follow-up authorizes finishing local reconciliation and retirement
of the obsolete `religion-map` checkout. Codex remains the sole assignee;
parallelism stays at 1. That retirement authorization itself did not include
commit or publication; the later delivery authorization is recorded above.

Comparison against canonical `main` at `db15715` found 185 identical files,
two intentional project/configuration differences (`AGENTS.md` and
`astro.config.mjs`), and the same removed `CompareControls.astro` file. There
is no missing legacy code to copy into the active repository.

Recovery bundles preserve every ref from both repositories. Working-file
snapshots, binary patches and indexes were also saved outside the active
repositories. Restoration into temporary clones reproduced the exact file
hashes and all 58 legacy and 61 canonical status entries. Dependencies,
generated output and other ignored files remain in the original checkouts;
retirement must preserve those directories intact as well.

Retirement is complete following agent coordination. The owner's instruction
to preserve the live Claude session superseded the earlier closure plan.
CodexORK relayed that condition, and ClaudeORK returned the site session's
confirmed position in `fbc50975`: no owned unfinished edits or legacy-scoped
tools, and continued work can use canonical absolute paths.

The additional per-file check confirmed that all 57 existing files among the
58 legacy status entries are byte-identical to canonical committed `db15715`
and to the verified recovery snapshot. Exactly 33 differ from the current
canonical working tree because it contains the subsequent Orthodox edition.
The remaining entry is the same deletion in both repositories. The recovery
directory contains `legacy-file-dispositions.json` with each file's hashes.

The complete directory was renamed into the Personal workspace's
`local/retired-repositories/religion-map`. Verification confirmed the same
directory inode, Git refs, HEAD, index, config, 58 status entries and captured
file hashes; `.git`, dependencies, generated output and ignored local files
remained intact. The live Claude process retained a valid cwd resolving to
the archive, and the existing canonical preview on port 4324 retained its
process. No session was terminated, restarted or archived; no symlink was
created. `retirement-result.json` records these checks beside the recovery
copies. Claude continues site work through canonical absolute paths.

At retirement completion, the edition was still uncommitted on canonical
`main`; no remote change or publication had been performed. Retirement changed only location and project
navigation documentation. `git diff --check` passed; the application gate was
not rerun for this move because application source and behavior did not change.

## Authorized delivery

The owner subsequently requested push with a compact commit history. A fresh
fetch confirmed canonical HEAD and origin/main both at `db15715`, with no
unpublished commits to combine. The current working-tree edition therefore
forms one new commit; published history and the preserved archive ref remain
unchanged. The delivery gate passed all 114 tests, the production build,
Astro checks (zero errors, warnings and hints), and provenance validation.
The actual diff review found no introduced correctness defects (No findings).
Independent theological review is separate from these technical checks.
