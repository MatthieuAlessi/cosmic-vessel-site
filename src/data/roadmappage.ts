// Contenu textuel de la page /roadmap édité via Keystatic
// (singleton `roadmappage`, src/content/pages/roadmap.json).
// ⚠️ À ne pas confondre avec src/data/roadmap.ts, qui expose les FEATURES
// (collection `roadmapCategories`) : ici, uniquement les textes de la page.
import roadmappage from '../content/pages/roadmap.json';

export interface RoadmapPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
  };
}

export const roadmapPageData: RoadmapPage = roadmappage;
