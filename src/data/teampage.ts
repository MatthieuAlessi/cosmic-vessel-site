// Contenu textuel de la page /team (singleton `teampage`, src/content/pages/team.json).
// ⚠️ À ne pas confondre avec la collection `team` (les membres) : ici, uniquement les textes de la page.
import teampage from '../content/pages/team.json';

export interface TeamPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

export const teamPageData: TeamPage = teampage;
