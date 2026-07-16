// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// L'admin Keystatic est une route rendue à la demande : l'inclure au build de prod
// exige un adapter, sinon `astro build` échoue en [NoAdapterInstalled]. En
// `storage: local` il écrit les JSON sur le disque, donc il n'est de toute façon
// utilisable qu'en dev — on l'exclut du build pour rester 100% statique.
// ⚠️ TRANSITOIRE : au passage en `storage: github` (édition depuis le site déployé
// par l'équipe), il faudra réintégrer keystatic() ici + installer @astrojs/netlify.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [icon(), react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()]
  }
});