// Contenu textuel de la page /gallery (singleton `gallerypage`, src/content/pages/gallery.json).
// Import JSON direct — même pattern que homepage.ts/character.ts. Champs optionnels → fallbacks au rendu.
import gallerypage from '../content/pages/gallery.json';

export interface GalleryPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

export const galleryData: GalleryPage = gallerypage;
