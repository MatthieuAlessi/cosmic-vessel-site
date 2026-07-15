// ─── Données du feature board roadmap (source : collection Keystatic) ───────
// Lit la collection `roadmapCategories` (src/content/roadmap-categories/*.json,
// éditée via l'admin) et la reshape vers la forme historique attendue par les
// composants (name / features[{ title, description, icon, status }]) + dérivés
// (comptes, progression, slugify). Remplace l'ancien module en dur
// `roadmapFeatures.ts`. Les composants n'ont eu qu'à changer le chemin d'import.
import { getCollection } from 'astro:content';

export type FeatureStatus = "completed" | "in-progress" | "planned";

export interface RoadmapFeature {
  title: string;
  description: string;
  /** Nom d'icône Phosphor (préfixe `ph:`). */
  icon: string;
  status: FeatureStatus;
}

export interface RoadmapCategory {
  name: string;
  features: RoadmapFeature[];
}

// Ordre d'affichage voulu (la collection n'a pas d'ordre garanti). Les
// catégories inconnues (ajoutées via le CMS) passent après, dans l'ordre reçu.
const ORDER = [
  "Gameplay & Class",
  "Narrative & Writing",
  "World & Content",
  "Art & Audio",
  "Production & Community",
];
const rank = (name: string) => {
  const i = ORDER.indexOf(name);
  return i === -1 ? ORDER.length : i;
};

const entries = await getCollection("roadmapCategories");

export const roadmapCategories: RoadmapCategory[] = entries
  .map((e) => ({
    name: e.data.categorie,
    features: (e.data.features ?? []).map((f) => ({
      title: f.name,
      description: f.description ?? "",
      icon: f.icon,
      status: f.status as FeatureStatus,
    })),
  }))
  .sort((a, b) => rank(a.name) - rank(b.name));

// ─── Dérivés ────────────────────────────────────────────────────────────────
export const allFeatures: RoadmapFeature[] = roadmapCategories.flatMap((c) => c.features);

/** Slug d'ancre pour une catégorie (sommaire + sections du board). */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function countBy(features: RoadmapFeature[]) {
  return {
    completed: features.filter((f) => f.status === "completed").length,
    "in-progress": features.filter((f) => f.status === "in-progress").length,
    planned: features.filter((f) => f.status === "planned").length,
    total: features.length,
  };
}

/** Avancement pondéré (completed = 1, in-progress = 0.5, planned = 0), en %. */
export function progressOf(features: RoadmapFeature[]) {
  if (features.length === 0) return 0;
  const c = countBy(features);
  return Math.round(((c.completed + c["in-progress"] * 0.5) / c.total) * 100);
}

export const roadmapCounts = countBy(allFeatures);
export const roadmapProgress = progressOf(allFeatures);
