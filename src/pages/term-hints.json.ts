import type { APIRoute } from 'astro';
import { getTermHints } from '../lib/termHints';

export const GET: APIRoute = async () => new Response(JSON.stringify(await getTermHints()), {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
