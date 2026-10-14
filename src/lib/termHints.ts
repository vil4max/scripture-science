// The glossary hints as data: served once as term-hints.json and cached by
// the browser instead of inlined in every page (site audit S3-7).
import { getTerms } from './content';
import { withBase } from './paths';

export async function getTermHints() {
  return (await getTerms())
    .filter((entry) => entry.data.match.length > 0)
    .map((entry) => ({
      term: entry.data.term,
      short: entry.data.short,
      href: withBase(`terms/#${entry.data.slug}`),
      match: entry.data.match,
    }));
}
