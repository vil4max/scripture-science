# scripture-science — agent notes

Repository history: this site was built under the name "religion-map" and
squash-published here on 2026-09-27, replacing this repository's prior,
unrelated content (owner decision). The unsquashed development history
is preserved in the complete retired checkout at
`../../local/retired-repositories/religion-map`, with verified recovery copies
beside it. This repository is the active site; do not resume edits in the
retired checkout.

Repository visibility: **PUBLIC** (owner, 2026-09-27: published to GitHub Pages).

Project facts only. Behavior and skills live in the Agent Brain, not here.

## Configure this machine first

If this host is not wired, inspect the Brain publication first:

    ${AGENTS_KIT_ROOT:-${AGENT_TOOLS_ROOT:-${DEV_ROOT:-$HOME/Developer/Personal}/agent-tools}/agent-engineering-kit}/features/hosts/configure-agent.sh status

For a supported host, follow the report and use `--host <name>` only when
configuration is incomplete. Whole-machine `--all` requires explicit owner
direction. Then return to this repository.

## Project

- Repository: scripture-science. Public title: Orthodox View of World Religions. Historical briefs retain the former religion-map name.
- kind: personal
- Skill profile: core
- Marker: `.agents/project-context.yaml` (local)
- Runtime: none; Node.js 26 with npm
- Device scope: desktop only (owner, 2026-09-26, `docs/DECISIONS.md`
  "Desktop-only scope"). No 375px check and no separate mobile layout in a
  task's acceptance criteria going forward.
- Product: a Russian-language static site — one picture of the religious world
  (a continuous Orthodox Church timeline and comparisons grounded in Orthodox
  teaching, with separately attributed statements from other traditions), with
  supporting evidence for each claim. Built with Astro (static output) and content collections; served
  by GitHub Pages under the `/scripture-science` base path.
- Rules for content: `docs/EDITORIAL.md` (editorial principles) and
  `docs/SOURCES.md` (source tiers and what "verified" means). Research notes and
  the verification log live in `docs/research/`.
- Site text is Russian; code, file names, comments and docs are English.
- What is done, in progress and next: `docs/ROADMAP.md` (start here when
  picking up work); each task's brief is under `docs/tasks/`.

## Definition of Done

    npm run verify

Content changes also follow `docs/SOURCES.md`: every new claim carries its
source, excerpt, access date and tier, or is marked `TODO: verify`.

## Commands

    npm ci
    npm run dev       # local server
    npm run build     # static site in dist/
    npm run check     # astro check (types and templates)
    npm run verify    # build + check + node --test scripts/ + internal-link and text-fidelity checks
