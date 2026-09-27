export function legacyPairDestination(href: string, base: string): string {
  const old = new URL(href);
  const hash = decodeURIComponent(old.hash.slice(1));
  const reference = ['refs', 'sources', 'literature', 'structure', 'dynamics', 'glossary', 'corrections'].includes(hash) || /^(corr|correction)-/.test(hash);
  const url = new URL(`${base}${reference ? 'sources/' : hash === 'history' ? 'timeline/' : 'compare/'}`, old.origin);
  url.search = old.search;
  if (!reference && hash !== 'history' && !url.searchParams.has('t') && !url.searchParams.has('slots')) {
    url.searchParams.set('t', 'orthodoxy,jw');
    url.searchParams.set('slots', 'orthodoxy,jw,');
  }
  url.hash = reference ? /^(corr|correction)-/.test(hash) ? `pair-correction-${hash.replace(/^(corr|correction)-/, '')}` : 'pair-reference'
    : hash === 'history' ? 'detailed-chronology' : !hash || hash === 'theology' ? 'topics' : hash === 'summary' ? 'pair-summary' : hash === 'common' ? 'chosen' : `pair-${hash}`;
  return `${url.pathname}${url.search}${url.hash}`;
}
