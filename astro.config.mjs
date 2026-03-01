import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://wanda-os-dev.github.io',
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
