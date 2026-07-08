// ─── Catégories de l'équipe ─────────────────────────────────────────────────
// Liste ordonnée des pôles. Sert au schéma de la collection `team` (enum du champ
// `department`) et au regroupement sur la page /team.
// - `openRoles`   = postes actuellement recherchés (cartes de recrutement).
// - `sampleRoles` = intitulés de poste attribués aux cartes placeholder (variés,
//   éditables ici) tant que les vrais membres ne sont pas renseignés.

export const departments = [
  { id: "leads", name: "Leads", icon: "ph:crown-simple", openRoles: [], sampleRoles: ["Project Lead", "Creative Director", "Art Director"] },
  { id: "programming", name: "Programming", icon: "ph:code", openRoles: ["Gameplay Programmer", "Tools Programmer"], sampleRoles: ["Gameplay Programmer", "Tools Programmer", "Systems Programmer", "UI Programmer"] },
  { id: "2d-artists", name: "2D Artists", icon: "ph:palette", openRoles: ["Concept Artist", "Illustrator"], sampleRoles: ["Concept Artist", "Illustrator", "UI Artist", "Character Designer"] },
  { id: "3d-artists", name: "3D Artists", icon: "ph:cube", openRoles: ["Character Artist", "Environment Artist"], sampleRoles: ["Character Artist", "Environment Artist", "Prop Artist", "Technical Artist"] },
  { id: "visual-effects", name: "Visual Effects", icon: "ph:sparkle", openRoles: ["VFX Artist"], sampleRoles: ["VFX Artist", "Technical VFX Artist"] },
  { id: "writing", name: "Writing / Narrative", icon: "ph:pen-nib", openRoles: ["Narrative Writer"], sampleRoles: ["Narrative Writer", "Dialogue Writer", "Lore Writer"] },
  { id: "music-sound", name: "Music & Sound", icon: "ph:music-notes", openRoles: ["Composer", "Sound Designer"], sampleRoles: ["Composer", "Sound Designer", "Audio Engineer"] },
  { id: "marketing-community", name: "Marketing & Community", icon: "ph:megaphone", openRoles: ["Community Manager"], sampleRoles: ["Community Manager", "Social Media Manager", "Content Creator"] },
  { id: "voice-actors", name: "Voice Actors", icon: "ph:microphone", openRoles: ["Voice Actor (EN)"], sampleRoles: ["Voice Actor", "Voice Director"] },
  { id: "contributors", name: "Contributors", icon: "ph:users-three", openRoles: ["Playtester", "Translator"], sampleRoles: ["Playtester", "Translator", "Beta Tester"] },
] as const

export type DepartmentId = (typeof departments)[number]["id"]

export const departmentIds = departments.map((d) => d.id) as [DepartmentId, ...DepartmentId[]]
