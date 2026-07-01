// ─── Catégories de l'équipe ─────────────────────────────────────────────────
// Liste ordonnée des pôles. Sert au schéma de la collection `team` (enum du champ
// `department`) et au regroupement sur la page /team.
// `openRoles` = postes actuellement recherchés (cartes de recrutement).

export const departments = [
  { id: "leads", name: "Leads", icon: "ph:crown-simple", openRoles: [] },
  { id: "programming", name: "Programming", icon: "ph:code", openRoles: ["Gameplay Programmer", "Tools Programmer"] },
  { id: "2d-artists", name: "2D Artists", icon: "ph:palette", openRoles: ["Concept Artist", "Illustrator"] },
  { id: "3d-artists", name: "3D Artists", icon: "ph:cube", openRoles: ["Character Artist", "Environment Artist"] },
  { id: "visual-effects", name: "Visual Effects", icon: "ph:sparkle", openRoles: ["VFX Artist"] },
  { id: "writing", name: "Writing / Narrative", icon: "ph:pen-nib", openRoles: ["Narrative Writer"] },
  { id: "music-sound", name: "Music & Sound", icon: "ph:music-notes", openRoles: ["Composer", "Sound Designer"] },
  { id: "marketing-community", name: "Marketing & Community", icon: "ph:megaphone", openRoles: ["Community Manager"] },
  { id: "voice-actors", name: "Voice Actors", icon: "ph:microphone", openRoles: ["Voice Actor (EN)"] },
  { id: "contributors", name: "Contributors", icon: "ph:users-three", openRoles: ["Playtester", "Translator"] },
] as const

export type DepartmentId = (typeof departments)[number]["id"]

export const departmentIds = departments.map((d) => d.id) as [DepartmentId, ...DepartmentId[]]
