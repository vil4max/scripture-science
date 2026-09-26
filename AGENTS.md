# religion-map — agent notes

Repository visibility: **PUBLIC** (owner, 2026-09-27: published to GitHub Pages).

Project facts only. Behavior and skills live in the Agent Brain, not here.

## Configure this machine first

If this host is not wired, inspect the Brain publication first:

    ${AGENTS_KIT_ROOT:-${AGENT_TOOLS_ROOT:-${DEV_ROOT:-$HOME/Developer/Personal}/agent-tools}/agent-engineering-kit}/features/hosts/configure-agent.sh status

For a supported host, follow the report and use `--host <name>` only when
configuration is incomplete. Whole-machine `--all` requires explicit owner
direction. Then return to this repository.

## Project

- Name: religion-map
- kind: personal
- Skill profile: core
- Marker: `.agents/project-context.yaml` (local)
- Runtime: none; Node.js with npm
- Device scope: desktop only (owner, 2026-09-26, `docs/DECISIONS.md`
  "Desktop-only scope"). No 375px check and no separate mobile layout in a
  task's acceptance criteria going forward.
- Product: a Russian-language static site — one picture of the religious world
  (a timeline with the tree of separations between traditions, and comparisons
  in which every tradition speaks for itself), with a verified source for every
  claim. Built with Astro (static output), MDX and content collections; served
  by GitHub Pages under the `/religion-map` base path.
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

    npm install
    npm run dev       # local server
    npm run build     # static site in dist/
    npm run check     # astro check (types and templates)
    npm run verify    # build + check + node --test scripts/ + text-fidelity check
