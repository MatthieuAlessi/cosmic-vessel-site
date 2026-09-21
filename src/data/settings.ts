// Réglages globaux (singleton `settings`, src/content/settings/global-links.json).
// Import JSON direct : un singleton n'a pas besoin de loader/schema Zod (voir content.config.ts pour les collections).
import globalLinks from '../content/settings/global-links.json';

interface SiteSettings {
  modName?: string;
  discordUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  redditUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
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

// Réseaux affichés dans le Footer et sur /contact : dérivés des réglages, dans l'ordre
// d'affichage. Un lien vide dans l'admin est omis (plutôt qu'un bouton mort ou un lien
// placeholder). Source unique : ne plus recopier ces URLs en dur dans les composants.
export const socialLinks = [
  { icon: 'ph:linkedin-logo', href: settings.linkedinUrl, label: 'LinkedIn' },
  { icon: 'ph:youtube-logo', href: settings.youtubeUrl, label: 'YouTube' },
  { icon: 'ph:reddit-logo', href: settings.redditUrl, label: 'Reddit' },
  { icon: 'ph:tiktok-logo', href: settings.tiktokUrl, label: 'TikTok' },
  { icon: 'ph:instagram-logo', href: settings.instagramUrl, label: 'Instagram' },
  { icon: 'ph:x-logo', href: settings.twitterUrl, label: 'X' },
  { icon: 'ph:discord-logo', href: settings.discordUrl, label: 'Discord' },
  { icon: 'ph:coffee', href: settings.kofiUrl, label: 'Ko-fi' },
].filter((s): s is { icon: string; href: string; label: string } => Boolean(s.href));
