// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [icon(), react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwindcss()]
  }
});