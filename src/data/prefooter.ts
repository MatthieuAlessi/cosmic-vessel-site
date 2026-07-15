// Contenu de la section pré-footer ("Join the Journey") édité via Keystatic
// (singleton `prefooter`, src/content/sections/prefooter.json).
// Import JSON direct (pas une content collection) : un singleton n'est pas
// une liste d'entrées — même pattern que src/data/settings.ts.
import prefooterData from '../content/sections/prefooter.json';

export interface PrefooterCard {
  icon: string;
  title: string;
  description: string;
  cta: string;
  /** Lien du bouton (externe). Ignoré si `isTrailer` est vrai. */
  link?: string | null;
  /** Bouton plein (primaire) plutôt qu'outline. */
  primary?: boolean;
  /** Le bouton ouvre la modale trailer globale au lieu de suivre `link`. */
  isTrailer?: boolean;
}

export interface Prefooter {
  label: string;
  title: string;
  cards: PrefooterCard[];
}

export const prefooter: Prefooter = prefooterData;
