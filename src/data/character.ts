// Contenu textuel de la page /character (singleton `characterpage`, src/content/pages/character.json).
// Import JSON direct — même pattern que homepage.ts. Champs optionnels → fallbacks au rendu.
import characterpage from '../content/pages/character.json';

export interface CharacterPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
    image?: string;
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
    word1?: string;
    word2?: string;
    word3?: string;
    word4?: string;
    text1?: string;
    text2?: string;
    text3?: string;
  };
}

export const characterData: CharacterPage = characterpage;
