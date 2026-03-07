import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  site: isVercel ? 'https://wandasystems-site.vercel.app' : 'https://wanda-os-dev.github.io',
  base: isVercel ? '/' : '/wandasystems-site',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
