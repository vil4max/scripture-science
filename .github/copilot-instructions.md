<!-- agent-engineering-kit:commit-policy:start -->
<!-- Generated from agent-engineering-kit/rules/conventional-commits.mdc; do not edit this block by hand. -->
# Commit messages

- Write in English only, without emojis.
- Use `<type>: <summary>` or `<type>(<scope>): <summary>`.
- Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `build`, `ci`, `perf`.
- Start the summary lowercase, use imperative mood, and omit the final period.
- Describe the resulting repository change, not agent activity or the implementation process. Do not attribute work to AI tools. AI or agents may be the subject of the change.
- Never add AI/tool/bot `Co-authored-by` trailers, including injected ones; human co-authors are allowed.
- Reject vague summaries such as `update code`, `make changes`, `fix issue`, `improvements`, or `cleanup`.
- Inspect the staged diff before choosing the type/scope: `feat` adds user-visible functionality; `fix` corrects behavior; `refactor` preserves behavior; `test` covers tests; `docs` documentation; `chore` maintenance; `build` build systems/dependencies; `ci` CI configuration; `perf` performance.
- One commit is one change that could be reverted on its own. A subject that needs "and" or a list, or a body that says "also", "two" or opens a second paragraph about a different defect, is two commits: split it. A requirement, its tests and its code are one change. Commit each slice as it lands; splitting a finished tree afterwards is slower and error-prone.
- Every authored commit requires a body after a blank line. Explain why the change is needed, all material changes, and their behavioral impact, based on the staged diff. Include affected components, decision rationale, compatibility implications, and constraints when relevant.
- In the body, record validation actually performed for these changes: commands and results. State relevant checks not run and why, plus known limitations or unresolved issues. Never invent results or infer a pass from a plan or earlier session.
- Maximize useful information, not length. Use concrete paragraphs or bullets proportional to the change; even small changes need an explanatory body. Avoid repeating the subject, exhaustive file lists, filler, empty sections, or agent narration.
- Describe breaking changes in a useful `BREAKING CHANGE:` footer; retain the subject format above.
- Preserve Git-generated merge, revert, and autosquash messages; these are exceptions to the authored-message requirements.
- Never bypass validation with `--no-verify` or the Desktop bypass control.

Example:

```text
docs: clarify release checklist

Add the publication approval step to prevent treating a local build as
a shipped release.

Validation: git diff --check passed; app tests not run (docs only).
```
<!-- agent-engineering-kit:commit-policy:end -->
