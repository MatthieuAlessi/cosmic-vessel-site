// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';

// L'admin Keystatic (/keystatic) exécute du code serveur : il lui faut un adapter,
// sinon `astro build` échoue en [NoAdapterInstalled]. L'adapter ne rend PAS le site
// dynamique : les pages restent prégénérées, seul /keystatic devient une fonction.
//
// ⚠️ @astrojs/netlify est épinglé en 7.0.12 : la v8 exige Astro 7, et 7.0.12 comme
// 7.0.13 déclarent `peer: astro ^6` tout en important `verifyOptions` depuis
// `astro/assets` — API absente de tout Astro 6 (bug de peer range amont). Sans
// `imageCDN: false`, ce service d'images entre dans le bundle et casse le build.
//
// `imageCDN: false` ne désactive PAS l'optimisation d'images : l'adapter retombe sur
// le service Sharp intégré à Astro, qui optimise au BUILD (et gère srcset/sizes via
// la prop `layout` d'<Image>) au lieu de laisser Netlify transformer à chaque requête.
// Sur un site prégénéré comme celui-ci, c'est le bon compromis.
// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  adapter: netlify({ imageCDN: false }),
  integrations: [icon(), react(), markdoc(), keystatic()],
  vite: {
    plugins: [tailwindcss()]
  }
});