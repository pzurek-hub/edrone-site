// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roi.edrone.me',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [sitemap()],
  server: {
    port: 3002,
  },
  compressHTML: true,
});
