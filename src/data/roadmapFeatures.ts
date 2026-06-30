// ─── Données du feature board roadmap ──────────────────────────────────────
// Source : page roadmap de l'ancien site (45 features, 5 catégories métier).
// Chaque feature a un statut (fait / en cours / à faire) — pas d'axe temporel
// (la roadmap n'est pas chronologique). Le board et le sommaire groupent par métier.
// Données d'exploration — pas encore une collection Astro. À formaliser en
// collection content (`features`) le moment venu.

export type FeatureStatus = "completed" | "in-progress" | "planned"

export interface RoadmapFeature {
  title: string
  description: string
  /** Nom d'icône Phosphor (préfixe `ph:`). */
  icon: string
  status: FeatureStatus
}

export interface RoadmapCategory {
  name: string
  icon: string
  features: RoadmapFeature[]
}

export const roadmapCategories: RoadmapCategory[] = [
  {
    name: "Gameplay & Class",
    icon: "ph:sword",
    features: [
      { title: "Cosmic Vessel Class Design", description: "Playable custom class with four subclasses.", icon: "ph:sparkle", status: "completed" },
      { title: "Unique Subclass Design", description: "Time, Stars, Knowledge, Life.", icon: "ph:tree-structure", status: "completed" },
      { title: "New Origin Character", description: "Experience an entirely new playable Origin story.", icon: "ph:user-focus", status: "completed" },
      { title: "Transformation Systems", description: "Unlock powerful transformation forms and new abilities.", icon: "ph:butterfly", status: "completed" },
      { title: "Spell Implementation", description: "Over 100 spells, abilities and custom mechanics.", icon: "ph:magic-wand", status: "in-progress" },
      { title: "Feats & Passives", description: "Custom progression options and character-defining traits.", icon: "ph:medal", status: "in-progress" },
      { title: "Custom Weapons", description: "Unique weapon designs and themes.", icon: "ph:sword", status: "in-progress" },
      { title: "Custom Armour Sets", description: "An experimental approach to armour design.", icon: "ph:shield", status: "in-progress" },
      { title: "Custom Accessories", description: "New rings, amulets, capes and magical equipment.", icon: "ph:diamond", status: "in-progress" },
    ],
  },
  {
    name: "Narrative & Writing",
    icon: "ph:book-open",
    features: [
      { title: "Narrative Design", description: "Research and develop a new story to fit within BG3 and D&D.", icon: "ph:book-open", status: "completed" },
      { title: "Character Design", description: "Memorable characters with distinct personalities.", icon: "ph:users", status: "in-progress" },
      { title: "Unique Interactions", description: "Unique conversations, reactions and narrative roles.", icon: "ph:chats-circle", status: "in-progress" },
      { title: "Dialogue & Choice System", description: "Varied-outcome conversations that shape the adventure.", icon: "ph:arrows-split", status: "in-progress" },
      { title: "Narrative Questlines", description: "Original stories woven into the world of BG3.", icon: "ph:scroll", status: "in-progress" },
      { title: "Subclass Reactivity", description: "New interactions based on your subclass selection.", icon: "ph:git-branch", status: "planned" },
      { title: "Fully Voiced Characters", description: "All new characters to be fully voiced.", icon: "ph:microphone", status: "planned" },
      { title: "Cinematic Storytelling", description: "Story moments brought to life through custom cinematics.", icon: "ph:film-slate", status: "planned" },
      { title: "Unique Inspiration", description: "A new thematic way to gain Inspiration.", icon: "ph:lightbulb", status: "planned" },
    ],
  },
  {
    name: "World & Content",
    icon: "ph:globe-hemisphere-west",
    features: [
      { title: "New NPCs", description: "Meet original characters throughout the world.", icon: "ph:user-plus", status: "in-progress" },
      { title: "Lore & Worldbuilding", description: "Expand the mythology of the Cosmic Vessel story.", icon: "ph:globe-hemisphere-west", status: "in-progress" },
      { title: "Exploration Content", description: "Discover hidden secrets and rewards.", icon: "ph:compass", status: "in-progress" },
      { title: "Environmental Storytelling", description: "Combine existing locations and lore with new experiences.", icon: "ph:tree", status: "in-progress" },
      { title: "New Explorable Locations", description: "New locations tied strongly to the narrative.", icon: "ph:map-trifold", status: "planned" },
      { title: "New Dynamic Encounters", description: "Develop alongside your subclass selection.", icon: "ph:lightning", status: "planned" },
      { title: "New Boss Encounters", description: "Exciting and challenging boss and mini-boss encounters.", icon: "ph:skull", status: "planned" },
      { title: "Collectibles & Artefacts", description: "Unique artefacts to enhance immersion and storytelling.", icon: "ph:crown-simple", status: "planned" },
      { title: "Companion Interactability", description: "Dialogue between the Cosmic Vessel and existing Origins.", icon: "ph:handshake", status: "planned" },
    ],
  },
  {
    name: "Art & Audio",
    icon: "ph:palette",
    features: [
      { title: "Visual Effects", description: "Custom spells, transformations and environment effects.", icon: "ph:sparkle", status: "in-progress" },
      { title: "Spell Icons", description: "Handcrafted icons for spells and abilities.", icon: "ph:palette", status: "in-progress" },
      { title: "Original Soundtrack", description: "Custom soundtrack to accompany the project.", icon: "ph:music-notes", status: "in-progress" },
      { title: "Concept Art", description: "Original artwork to bring design to life.", icon: "ph:pen-nib", status: "in-progress" },
      { title: "Character Illustration", description: "Artwork depicting key characters in the narrative.", icon: "ph:paint-brush", status: "in-progress" },
      { title: "Sound Production", description: "New SFX and sound designed specifically for the project.", icon: "ph:speaker-high", status: "planned" },
      { title: "Equipment Icons", description: "Custom icons for weapons, armour and items.", icon: "ph:squares-four", status: "planned" },
      { title: "Environmental Assets", description: "Unique props, scenery and world assets.", icon: "ph:mountains", status: "planned" },
      { title: "Custom UI Elements", description: "New interface elements designed for the project.", icon: "ph:layout", status: "planned" },
    ],
  },
  {
    name: "Production & Community",
    icon: "ph:wrench",
    features: [
      { title: "Project Website", description: "A hub to act as the home for the community.", icon: "ph:globe", status: "completed" },
      { title: "Dedicated Discord Server", description: "A space for community interaction and livestreams.", icon: "ph:discord-logo", status: "completed" },
      { title: "Ongoing Recruitment", description: "Help shape the future of the Cosmic Vessel Project.", icon: "ph:user-plus", status: "in-progress" },
      { title: "3D Item & Weapon Models", description: "Bringing the concept art into game-ready assets.", icon: "ph:cube", status: "in-progress" },
      { title: "3D Character Models", description: "Bringing the character design concepts to life.", icon: "ph:person", status: "planned" },
      { title: "Environment Art", description: "Crafting unique and thematic environments to fit the narrative.", icon: "ph:mountains", status: "planned" },
      { title: "Technical Art", description: "Shaders, materials and implementation of game assets.", icon: "ph:gear", status: "planned" },
      { title: "Gameplay Mechanics", description: "Engaging mechanics that push the limits of BG3.", icon: "ph:game-controller", status: "planned" },
      { title: "Animation & Rigging", description: "Bringing characters and creatures to life.", icon: "ph:film-reel", status: "planned" },
    ],
  },
]

// ─── Dérivés ────────────────────────────────────────────────────────────────
export const allFeatures: RoadmapFeature[] = roadmapCategories.flatMap((c) => c.features)

/** Slug d'ancre pour une catégorie (sommaire + sections du board). */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

function countBy(features: RoadmapFeature[]) {
  return {
    completed: features.filter((f) => f.status === "completed").length,
    "in-progress": features.filter((f) => f.status === "in-progress").length,
    planned: features.filter((f) => f.status === "planned").length,
    total: features.length,
  }
}

/** Avancement pondéré (completed = 1, in-progress = 0.5, planned = 0), en %. */
export function progressOf(features: RoadmapFeature[]) {
  if (features.length === 0) return 0
  const c = countBy(features)
  return Math.round(((c.completed + c["in-progress"] * 0.5) / c.total) * 100)
}

export const roadmapCounts = countBy(allFeatures)
export const roadmapProgress = progressOf(allFeatures)
