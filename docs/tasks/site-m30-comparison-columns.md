# Task — M30: make comparison columns visually continuous

## Goal

Make the comparison page read as one fixed Orthodox foundation column beside
two selectable comparison columns, rather than as unrelated cards.

## Scope

- Keep Orthodoxy fixed in the left column as static text.
- Keep both comparison columns populated; legacy URLs with empty slots select a
  valid available tradition automatically.
- Align the sticky header, overview facts, topic positions and question details
  to the same three-column grid.
- Put a compact horizontal contents block before the long comparison, with
  direct links to every topic and the concluding relations section.
- Present the relations section with its own full-width heading treatment.
- Replace card gaps inside comparison grids with vertical rules.
- Give the Orthodox foundation column a consistent restrained background.
- Preserve all selection, URL and content behavior.

## Acceptance

- The left header is static text and cannot be selected or cleared.
- Neither comparison column offers an empty state.
- Every comparison row keeps Orthodoxy in column one.
- Vertical rules and the Orthodox background identify column ownership through
  overview facts, topics and expanded question details.
- The contents exposes all fifteen topics without a tall vertical list.
- `npm run verify` passes.
