# Orthodox View of World Religions

A Russian-language static site presenting Orthodox teaching, attributed accounts
of other traditions, comparisons, history and supporting sources.

## Development

Use **Node.js 26**, npm and Python 3. The GitHub Pages workflow uses Node.js 26
and Python 3.14. The test-discovery command requires Node.js 26.

```sh
npm ci
npm run dev
```

Open the local server's `/scripture-science/` path. Astro builds static output
for GitHub Pages under that same base path.

```sh
npm run build     # Generate dist/
npm run check     # Check Astro templates and TypeScript
npm run verify    # Build, type checks, tests, local links and source fidelity
```

## Content

- `src/pages/`, `src/components/` and `src/lib/`: routes, presentation and shared logic.
- `src/data/matrix/`: comparison positions; `src/data/analyses/`: detailed analyses.
- Other `src/data/` files: history, demographics, classifications and evidence.
- `source/`: preserved original document; migration data stays reproducible.
- `docs/research/`: verification records; `docs/ROADMAP.md`: current status.

Site text is Russian; code and technical documentation are English. Reading
layouts support desktop and narrow iPhone viewports, with a collapsible menu
and contents list and vertically stacked comparisons on small screens.

## Sources

Follow [editorial principles](docs/EDITORIAL.md) and the
[source policy](docs/SOURCES.md). Every new assertion needs a checked source,
exact excerpt, access date and tier, or an explicit verification TODO.

The Sources page includes comparison evidence and detailed analyses. Exact
evidence duplicates merge in presentation while passages, dates and claim
attribution remain distinct. Further reading and analysis-card verification
coverage are identified separately. Automated checks establish structural
integrity; they do not establish theological correctness or recheck live sources.

## Reading route

The homepage introduces a progressive route: `/religions/`, `/timeline/`,
`/numbers/`, `/geography/`, `/differences/`, then `/compare/` and the existing
tradition analyses. Old homepage fragments redirect to the moved sections
without losing comparison parameters.

The world overview and religion map share Pew categories; Christianity is
counted once. Christian map mode uses its original within-Christian estimates,
never multiplied by newer population totals. Precise dates and the separate
WCD estimates stay in Sources; reading pages use one approximate-data note.
