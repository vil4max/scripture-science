// Site-internal links under the GitHub Pages base path (astro.config.mjs
// `base`). import.meta.env.BASE_URL carries no trailing slash here, so
// gluing a path straight onto it produced "/religion-mapsources/"; every
// internal link goes through this join instead (scripts/links.test.ts).
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
