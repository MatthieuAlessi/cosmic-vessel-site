// Contenu textuel de la page /character édité via Keystatic
// (singleton `characterpage`, src/content/pages/character.json).
// Import JSON direct — même pattern que src/data/homepage.ts.
// Tous les champs optionnels : le CMS peut laisser vide → fallbacks au rendu.
import characterpage from '../content/pages/character.json';

export interface CharacterPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
  };

  section1?: {
    block1?: {
      label?: string;
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

  section2?: {
    label?: string;
    title?: string;
    blocks?: { title?: string; text?: string }[];
  };

  sectionclass?: {
    label?: string;
    title?: string;
    text?: string;
  };

  section3?: {
    label?: string;
    title1?: string;
    text1?: string;
    text2?: string;
    title2?: string;
    text3?: string;
  };
}

export const characterData: CharacterPage = characterpage;
