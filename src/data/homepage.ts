// Contenu textuel de la home (singleton `homepage`, src/content/pages/home.json).
// Import JSON direct (pas de content collection pour un singleton) — même pattern que settings.ts/prefooter.ts.
// Champs optionnels : le CMS peut les laisser vides → prévoir fallback au rendu.
import homepage from '../content/pages/home.json';

export interface Homepage {
  hero?: {
    label?: string;
    title?: string;
    text?: string;
    image?: string;
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
    text2?: string;
  };

  news?: {
    label?: string;
    title?: string;
  };
}

export const homepageData: Homepage = homepage;
