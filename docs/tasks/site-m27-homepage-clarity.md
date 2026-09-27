# M27 — Homepage clarity and Orthodox framing

## Goal

Resolve the owner's 25 homepage review comments without changing the site's routes or comparison model.

## Scope

- Label classification explicitly as an Orthodox assessment and expose its evidence through a direct details link.
- Remove statements that attribute a personal confession to the site.
- Present each tradition's scripture by canon, authority, origin, and relationship to other texts instead of Russian translation trivia.
- Explain the recurring restoration claim across later Christian movements while distinguishing Christian divisions from Islam.
- Add familiar parenthetical names where they aid recognition.
- Expand the short introductions and current geography for Hinduism, Sikhism, Shinto, Daoism, and the aggregate other-religions category.
- Explain that the 2025 Pew release provides the latest globally comparable estimates for 2020.

## Sources and constraints

Claims use the existing project source hierarchy. Orthodox classification uses Azbyka and official Church documents; descriptions of other traditions use their official sources where available; demographic scope uses Pew Research Center. The public text must distinguish an attributed self-description from the Orthodox assessment.

No dependencies, routes, or data model contracts may change. Publication is outside this task.

## Acceptance

- All 25 browser comments receive a concrete editorial disposition.
- The homepage no longer contains the phrases `исходное исповедание этого сайта` or `исходное исповедание сайта`.
- Scripture cards use the same canon and authority distinctions as the Scripture page.
- Classification evidence is a direct link rather than a disclosure.
- Geography prose omits a misleading visible year while the data note retains the 2020 measurement year and 2025 publication context.
- `npm run verify` passes.
- Desktop review confirms the revised cards and sections remain readable.

## Ownership

Owner: current Codex session. Parallelism: 1. The owner directly authorized implementation through browser comments.
