import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import texture2Png from "../assets/images/decor/texture2.png";

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

// Illustrations line-art (SVG vectorisé) des voies/classes — inlinées pour que
// la coloration/le glow soient pilotables en CSS (voir .class-card__lineart,
// global.css). eager + raw : le markup brut est déjà en mémoire au build.
// ⚠️ texture*.svg exclus explicitement : sans ça, ce glob `?raw` inlinait aussi
// leur contenu texte complet (texture.svg 292 Ko + texture2.svg 1,6 Mo) dans le
// bundle, alors qu'aucun appelant ne les lit via lineArt() — ce sont des textures
// de fond (cardTextureUrl/cardTexture2Url plus bas), pas des illustrations.
const lineArtSvgs = import.meta.glob<string>(
  ["/src/assets/images/decor/*.svg", "!/src/assets/images/decor/texture*.svg"],
  { eager: true, query: "?raw", import: "default" },
);

/**
 * Chemin d'un SVG line-art → markup inline nettoyé (prolog XML retiré, `id`
 * racine retiré pour éviter les doublons quand plusieurs cartes s'affichent
 * sur la même page). `undefined` si le chemin est vide ou introuvable.
 */
export function lineArt(path?: string): string | undefined {
  const raw = path ? lineArtSvgs[path] : undefined;
  return raw?.replace(/^<\?xml[^>]*\?>\s*/, "").replace(/\sid="[^"]*"/, "");
}

// Mapping nom de classe → chemin du SVG line-art. Une seule source à tenir à
// jour : ajouter une entrée ici quand un nouveau fichier arrive (4 voies au total).
const lineArtByClass: Record<string, string> = {
  "Astral Archivist": "/src/assets/images/decor/astral.svg",
  "Essence": "/src/assets/images/decor/essence.svg",
  "Starcaller": "/src/assets/images/decor/wanderer.svg",
};

export function classLineArt(name: string): string | undefined {
  return lineArtByClass[name];
}

// Couleur de la gemme (.class-card__gem, global.css) insérée dans le "trou"
// circulaire commun aux illustrations (~49%/14.5% du cadre, mesuré sur les 3
// SVG existants via getBBox() — même position pour toutes, gabarit partagé).
const gemByClass: Record<string, string> = {
  "Astral Archivist": "#a855f7",
  "Chronographer": "#3b82f6",
  "Essence": "#ef4444",
  "Starcaller": "#f97316",
};

export function classGem(name: string): string | undefined {
  return gemByClass[name];
}

// Texture de grain (overlay sur .class-card, global.css) — récupérée en URL de
// build (pas en `?raw` comme lineArt : ~3400 paths, inliner ça dans le DOM de
// chaque carte serait bien trop lourd pour un simple calque statique). Utilisée
// en `background-image`, donc rasterisée une fois par le navigateur, pas répétée
// en milliers de nœuds SVG par instance de carte.
// Pattern ciblé sur ce seul fichier (pas `*.svg`) : un glob large aurait aussi
// dupliqué astral/essence/wanderer.svg en copies `?url` inutilisées (déjà
// couverts par lineArtSvgs ci-dessus, en `?raw`).
const textureUrlGlob = import.meta.glob<string>("/src/assets/images/decor/texture.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const cardTextureUrl = textureUrlGlob["/src/assets/images/decor/texture.svg"];

// Second calque de grain (motif plus dense, superposé au premier — pas en
// remplacement, .class-card__texture2, global.css). Vient d'un PNG, pas d'un SVG
// comme texture.svg : la version vectorielle faisait ~16.5k paths (1.6 Mo, tout
// ce poids pour du bruit rasterisé de toute façon en background-image — aucun
// gain à rester en vecteur).
//
// ⚠️ getImage() appelé ICI (top-level await, au chargement du module) plutôt que
// dans ClassCard.astro donnait un build cassé : vérifié en inspectant le build
// réel (.netlify/build/.prerender/_astro/texture2.*.png) — malgré `format:
// "webp"`, le fichier émis restait un PNG brut (magic bytes 89 50 4E 47), pas
// converti. Le service d'image d'Astro n'est apparemment pas garanti disponible
// au moment où un module partagé s'évalue hors du rendu d'un composant. D'où une
// fonction async, appelée depuis le frontmatter de ClassCard.astro (contexte de
// rendu normal, garanti). getImage() dédoublonne en interne les appels à mêmes
// src+options, donc 12 appels (12 cartes/page) ne réencodent pas 12 fois.
// ⚠️ `layout: 'none'` obligatoire : le défaut global du projet (astro.config.mjs,
// `image: { layout: 'constrained' }`) s'applique aussi à getImage() sans lui —
// vérifié sur un vrai build, ça générait ~8 variantes du même fichier (srcset
// responsive automatique), jusqu'à 1,68 Mo l'une, au lieu d'un seul asset fixe.
// ⚠️ `quality` seule ne suffisait pas : testé directement en Sharp (hors Astro)
// pour isoler la cause — le canal alpha (transparence entre les taches de
// grain) coûte cher à encoder en WebP indépendamment de `quality`, qui ne
// contrôle QUE le plan couleur. width 800 + quality 75 → 620 Ko, toujours plus
// lourd que le PNG source (428 Ko). En resserrant la résolution ET la qualité
// (le grain est un calque d'ambiance à faible opacité, pas un visuel net) :
// width 600 + quality 65 ≈ 240 Ko, ~45% sous le PNG d'origine.
export async function cardTexture2Url(): Promise<string> {
  const optimized = await getImage({
    src: texture2Png,
    format: "webp",
    width: 600,
    quality: 65,
    layout: "none",
  });
  return optimized.src;
}
