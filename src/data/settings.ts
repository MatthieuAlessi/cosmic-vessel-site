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
