// Réglages globaux (Discord/Ko-fi/X/YouTube/trailer) édités via Keystatic
// (singleton `settings`, src/content/settings/global-links.json).
// Import JSON direct (pas une content collection) : un singleton n'est pas
// une liste d'entrées, il n'a pas besoin de loader/schema Zod — voir
// content.config.ts pour les vraies collections.
import globalLinks from '../content/settings/global-links.json';

interface SiteSettings {
  discordUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  youtubevideoID?: string;
  kofiUrl?: string;
  joinformUrl?: string;
}


export const settings: SiteSettings = globalLinks;

// Source unique de l'ID vidéo du trailer (vignette TrailerCard, modale globale,
// carte trailer du prefooter). Fallback sur le trailer actuel : Keystatic omet
// les champs vides, et un ID absent produirait une vignette YouTube grise.
// `||` (pas `??`) : un champ vidé dans l'admin est écrit `""`, pas `null`.
export const trailerVideoId: string = settings.youtubevideoID || 'vEUQxe2uM-w';
