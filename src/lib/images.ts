import type { ImageMetadata } from "astro";

// Images éditables CMS vivent dans src/assets/images/** (public/ n'est jamais optimisé
// par Astro). import.meta.glob (eager) construit une table chemin → module, interrogée
// avec la string stockée par Keystatic. Images déco : restent en public/, n'utilisent pas ce helper.
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

/**
 * Chemin string stocké par un champ image Keystatic → module image optimisable
 * par <Image>. Renvoie `undefined` si le champ est vide ou le fichier introuvable
 * (au rendu : `{img && <Image .../>}` ou un fallback local).
 */
export function cmsImage(path?: string): ImageMetadata | undefined {
  return path ? images[path]?.default : undefined;
}
