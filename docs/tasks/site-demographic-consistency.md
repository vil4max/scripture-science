# Consistent world and Christian demographic views

State: implemented and verified

## Authorization and scope

2026-10-01: the owner requested one Christian group in world comparisons,
accurate internal Christian geography, and charts that neither contradict nor
needlessly duplicate one another. Local implementation and checks were authorized on 2026-10-01. On 2026-10-02,
the owner requested completion, verification that all work is on the remote,
and a report; this authorizes committing and pushing this finished iteration.

## Goal and decisions

- Compare peer religious groups: Christian branches never compete with whole
  religions for the largest-group label.
- Give the map separate religion (Pew 2020) and Christian tradition (Pew 2010)
  modes. Never multiply 2010 branch proportions by 2020 population counts.
- A Christian-mode colour identifies the largest group among local Christians,
  not among all residents. Keep the selected country when changing modes.
- Name the combined Orthodox/Oriental Orthodox statistical category explicitly;
  demographic grouping does not establish ecclesial communion.
- Keep original data, source records and public anchors. The 2026 WCD estimates
  remain available, without interpreting their branch-count excess as proven
  overlap or normalizing it into a population partition.

## Reading route and owner choices

The owner also requested a short homepage and a progressive Orthodox teaching
voice: introduction, origins and development, present-day scale and geography,
similarities and reasons for differences, then detailed arguments. Existing
sourced shared references and beliefs introduce the distinctions. No fictitious
professor or new claim of ecclesial authority is introduced.

The owner chose introduction first, with numbers and maps on separate pages.
Repeated data years are removed from reading headings. One note describes an
approximate compilation from open sources available in 2026; original years
and methods remain explicit in the reference material. The Pew world groups
are the shared basis for overview and country map. The Christian historical
breakdown stays a separate study with its own Christian denominator.

New routes: /religions/, /numbers/, /geography/, /differences/. The homepage
keeps legacy fragments as fallback links and redirects them while preserving
query parameters. Religion cards disclose their details on demand. The owner subsequently requested
Christian date wording: the timeline and profile chronologies show Byzantine
creation years before AD 1 and years from the Nativity thereafter. Date keys
explain the convention; original source excerpts and stored years are preserved.

## Acceptance

- World religions contain exactly one Christian row and no branch rows.
- Christian rows use their own year and Christian denominator. Missing data,
  zero populations and ties are not presented as certain leading groups.
- No fabricated 2020 confessional counts or unsupported territorial proxy.
- One world summary; country detail and Christian mode add distinct information.
- Verify arithmetic, modes, colours, labels and preserved anchors with tests;
  run Node.js 26 npm run verify and inspect desktop and iPhone widths in both
  themes, country selection, mode changes and keyboard controls.

## Verification evidence

Node.js 26 npm run verify passed 155 Node tests and two Python tests, built
22 pages with zero Astro diagnostics, and preserved internal links, fragment
targets, unique IDs, 1028 migration text nodes and 14 historical corrections.
The final date-notation change passed the same gate. Boundary tests cover the
Byzantine/Christian transition and reject year zero; 375/390 px date labels and
1440 px dark-theme chronology show no horizontal overflow.

Browser checks confirmed 375/390/430 px reading, country selection, independent
Christian mode, the Curaçao no-data fallback, keyboard activation, 1280/1440 px
layouts, light/dark themes, legacy homepage redirects with t/slots intact, and
comparison selection after reload. Physical iPhone/Safari testing is not claimed.

The Pew overview and Christian category definition were opened live on
2026-10-01. The WCD report was inspected to distinguish stated numbers from
unsupported overlap explanations. The retained country-level 2010 PDF could
not be reopened by the web fetcher; no fresh row-by-row source verification is
claimed. Original raw counts and their existing provenance remain unchanged.
