// Contenu textuel de la page /gallery édité via Keystatic
// (singleton `gallerypage`, src/content/pages/gallery.json).
// Import JSON direct — même pattern que src/data/homepage.ts / character.ts.
// Tous les champs optionnels : le CMS peut laisser vide → fallbacks au rendu.
import gallerypage from '../content/pages/gallery.json';

export interface GalleryPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
  };
}

export const galleryData: GalleryPage = gallerypage;
