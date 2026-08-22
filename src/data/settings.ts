// Réglages globaux (singleton `settings`, src/content/settings/global-links.json).
// Import JSON direct : un singleton n'a pas besoin de loader/schema Zod (voir content.config.ts pour les collections).
import globalLinks from '../content/settings/global-links.json';

interface SiteSettings {
  modName?: string;
  discordUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  youtubevideoID?: string;
  kofiUrl?: string;
  joinformUrl?: string;
}


export const settings: SiteSettings = globalLinks;

// Nom du mod affiché dans le chrome (titres, header, footer) — source unique, hors prose du contenu.
// `||` (pas `??`) : un champ vidé dans l'admin vaut "", pas null.
export const modName: string = settings.modName || 'Cosmic Vessel';

// Source unique de l'ID vidéo trailer (TrailerCard, modale, prefooter).
// Fallback : un ID absent produirait une vignette YouTube grise.
// `||` (pas `??`) : un champ vidé dans l'admin vaut `""`, pas `null`.
export const trailerVideoId: string = settings.youtubevideoID || 'vEUQxe2uM-w';
