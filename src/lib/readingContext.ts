import { hrefWithSelection } from './selection.ts';

// The former three-column comparison kept column placement in `slots`; with
// one chosen tradition the selection alone is the context, and an old
// `slots` parameter is dropped.
export function hrefWithReadingContext(href: string, ids: string[], currentHref: string): string {
  const current = new URL(currentHref);
  const destination = new URL(hrefWithSelection(href, ids, current.origin), current.origin);
  destination.searchParams.delete('slots');
  return `${destination.pathname}${destination.search}${destination.hash}`;
}
