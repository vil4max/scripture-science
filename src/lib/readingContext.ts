import { comparisonSlots } from './comparisonSlots.ts';
import { hrefWithSelection } from './selection.ts';

export function hrefWithReadingContext(href: string, ids: string[], currentHref: string): string {
  const current = new URL(currentHref);
  const destination = new URL(hrefWithSelection(href, ids, current.origin), current.origin);
  const raw = current.searchParams.get('slots');
  if (raw !== null) destination.searchParams.set('slots', comparisonSlots(ids, raw).join(','));
  else destination.searchParams.delete('slots');
  return `${destination.pathname}${destination.search}${destination.hash}`;
}
