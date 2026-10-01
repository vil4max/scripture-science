// Where an old /pairs/orthodoxy-jw/ link lands. `cards` maps a retired pair
// topic slug or section id to the analysis card that absorbed it
// (the cards' `legacy` field; docs/tasks/site-m33-jw-analysis.md).
export function legacyPairDestination(href: string, base: string, cards: Record<string, string>): string {
  const old = new URL(href);
  const hash = decodeURIComponent(old.hash.slice(1));
  const card = cards[hash];
  const reference = !card && (['refs', 'sources', 'literature', 'structure', 'dynamics', 'glossary', 'corrections'].includes(hash) || /^(corr|correction)-/.test(hash));
  const url = new URL(`${base}${reference ? 'sources/' : hash === 'history' ? 'timeline/' : 'traditions/jw/'}`, old.origin);
  url.search = old.search;
  url.hash = card ?? (reference ? /^(corr|correction)-/.test(hash) ? `pair-correction-${hash.replace(/^(corr|correction)-/, '')}` : 'pair-reference'
    : hash === 'history' ? 'detailed-chronology' : '');
  return `${url.pathname}${url.search}${url.hash}`;
}
