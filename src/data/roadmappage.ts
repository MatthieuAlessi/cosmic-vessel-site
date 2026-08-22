// Contenu textuel de la page /roadmap (singleton `roadmappage`, src/content/pages/roadmap.json).
// ⚠️ À ne pas confondre avec roadmap.ts, qui expose les features (collection `roadmapCategories`).
import roadmappage from '../content/pages/roadmap.json';

export interface RoadmapPage {
  hero?: {
    label?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

export const roadmapPageData: RoadmapPage = roadmappage;
