import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Served by GitHub Pages as a project site, hence the repository-name base path.
export default defineConfig({
  site: 'https://vil4max.github.io',
  base: '/scripture-science',
  integrations: [mdx()],
});
