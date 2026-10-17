// A sitemap of the reading pages for search engines; retired forwarding
// addresses are left out (site audit 2026-10-10, S3-9).
import type { APIRoute } from 'astro';
import { getOrderedMatrix } from '../lib/content';
import { withBase } from '../lib/paths';
import { ROUTE } from '../lib/route';

export const GET: APIRoute = async ({ site }) => {
  const traditions = (await getOrderedMatrix()).filter((entry) => entry.id !== 'orthodoxy');
  const paths = [
    '', ...ROUTE.flatMap((part) => part.steps.map((step) => step.path)),
    ...traditions.map((entry) => `traditions/${entry.id}/`),
    'terms/', 'search/', 'reading/', 'sources/', 'sources/catalog/', 'books/homo-religiosus/',
  ];
  const urls = [...new Set(paths)].map((path) => `  <url><loc>${new URL(withBase(path), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
