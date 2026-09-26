// Links to sources that readers cannot open (a .ru site blocked in Ukraine,
// docs/DECISIONS.md) are pointed at the archived copy recorded in
// src/data/sources.yaml `archive`, at render time, so the migrated data keeps
// the source document's own URL.

export interface ArchivedSource {
  url: string;
  archive?: string;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns a function that rewrites every `href="<url>"` whose URL has an
 * archived copy to that copy. Only exact href values match, so a page on the
 * same site without its own archive entry keeps its link.
 */
export function createArchiveLinker(sources: ArchivedSource[]): (html: string) => string {
  const archiveOf = new Map(
    sources.filter((s) => s.archive).map((s) => [s.url, s.archive!] as const),
  );
  if (archiveOf.size === 0) return (html) => html;
  const pattern = new RegExp(
    `href="(${[...archiveOf.keys()].map(escapeRegExp).join('|')})"`,
    'g',
  );
  return (html) => html.replace(pattern, (_match, url: string) => `href="${archiveOf.get(url)}"`);
}
