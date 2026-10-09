// Where an old /differences/ link lands: its four questions are the same
// questions on the comparison page, its connections section is on the
// religions page (owner, 2026-10-09: the comparison appeared twice).
const QUESTIONS = ['authority', 'god', 'salvation', 'organisation'];

export function differencesDestination(href: string, base: string): string {
  const old = new URL(href);
  const hash = decodeURIComponent(old.hash.slice(1));
  const connections = hash === 'connections';
  const url = new URL(`${base}${connections ? 'religions/' : 'compare/'}`, old.origin);
  url.search = old.search;
  url.hash = connections ? 'traditions' : QUESTIONS.includes(hash) ? `topic-${hash}` : '';
  return `${url.pathname}${url.search}${url.hash}`;
}

// An old /prayers/ link lands on the same prayer on «Богослужение и молитва»
// (owner, 2026-10-09: the prayers belong to that section).
export function prayersDestination(href: string, base: string): string {
  const old = new URL(href);
  const url = new URL(`${base}worship/`, old.origin);
  url.search = old.search;
  url.hash = old.hash.slice(1) || 'prayers';
  return `${url.pathname}${url.search}${url.hash}`;
}
