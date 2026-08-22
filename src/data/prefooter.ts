// Contenu du prefooter ("Join the Journey", singleton `prefooter`, src/content/sections/prefooter.json).
// Import JSON direct — même pattern que settings.ts.
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
