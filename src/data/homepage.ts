// Contenu textuel de la home édité via Keystatic
// (singleton `homepage`, src/content/pages/home.json).
// Import JSON direct (pas une content collection) : un singleton n'est pas
// une liste d'entrées — même pattern que src/data/settings.ts / prefooter.ts.
// Tous les champs sont optionnels : le CMS peut laisser un champ vide,
// donc on prévoit des fallbacks au rendu ({x && ...} ou ?? "…").
import homepage from '../content/pages/home.json';

export interface Homepage {
  hero?: {
    label?: string;
    title?: string;
    text?: string;
  };

  section1?: {
    label?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    numbers?: {
      label?: string;
      icon?: string;
      number?: string;
      text?: string;
    }[];
  };

  section2?: {
    label?: string;
    subtitle?: string;
    block1?: {
      title?: string;
      text?: string;
      image?: string;
    };
    block2?: {
      label?: string;
      title?: string;
      text?: string;
      image?: string;
    };
  };

  sectioncharacter?: {
    label?: string;
    title?: string;
    text?: string;
    image?: string;
  };

  sectionclass?: {
    label?: string;
    title?: string;
    text?: string;
  };

 
  gallery?: {
    label?: string;
    title?: string;
  };

  roadmap?: {
    label?: string;
    title?: string;
    text?: string;
  };

  team?: {
    label?: string;
    title?: string;
    text?: string;
  };

  news?: {
    label?: string;
    title?: string;
  };
}

export const homepageData: Homepage = homepage;
