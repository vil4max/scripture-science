// Pure rules for disputes between traditions (EDITORIAL.md principle 10;
// docs/tasks/site-m19-disputes.md). No astro:* imports, so they run under
// Node's stripped-types execution (scripts/disputes.test.ts), inside the
// Astro build and in the browser.

export interface DisputeSides {
  challengers: readonly string[];
  answerers: readonly string[];
}

/**
 * A dispute needs at least one contesting and one answering tradition, each
 * named once; a tradition cannot contest and answer the same dispute.
 * Throwing here is what fails `npm run build` on a malformed entry.
 */
export function checkDisputeSides(sides: DisputeSides): void {
  if (sides.challengers.length === 0) throw new Error('A dispute needs at least one contesting tradition');
  if (sides.answerers.length === 0) throw new Error('A dispute needs at least one answering tradition');
  const all = [...sides.challengers, ...sides.answerers];
  const repeated = all.find((id, index) => all.indexOf(id) !== index);
  if (repeated) throw new Error(`Tradition "${repeated}" appears more than once in a dispute`);
}

export interface DisputeView {
  visible: boolean;
  // Traditions whose part of the dispute is shown.
  shown: string[];
}

/**
 * Which part of a dispute the reader's choice shows, the same way as «Что
 * думают друг о друге»: nothing chosen shows every dispute in full; one
 * chosen shows the disputes it takes part in, in full; two or three chosen
 * show a dispute only when a chosen tradition contests and another chosen
 * one answers, and then only the chosen traditions' parts.
 */
export function disputeView(sides: DisputeSides, ids: readonly string[]): DisputeView {
  const everyone = [...sides.challengers, ...sides.answerers];
  if (ids.length === 0) return { visible: true, shown: everyone };
  if (ids.length === 1) {
    const visible = everyone.includes(ids[0]);
    return { visible, shown: visible ? everyone : [] };
  }
  const shown = everyone.filter((id) => ids.includes(id));
  const visible = sides.challengers.some((id) => ids.includes(id)) && sides.answerers.some((id) => ids.includes(id));
  return { visible, shown: visible ? shown : [] };
}
