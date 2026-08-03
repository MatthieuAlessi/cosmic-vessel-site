import type { ImageMetadata } from "astro";

// Toutes les images ÉDITABLES AU CMS vivent dans src/assets/images/** (≠ public/,
// qui n'est jamais optimisé par Astro). import.meta.glob (eager, résolu au build)
// construit une table { "/src/assets/images/...": module } que l'on interroge avec
// la string stockée par Keystatic. Les images DÉCO restent dans public/ et n'utilisent
// PAS ce helper (elles gardent leur <img>/background-image).
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
