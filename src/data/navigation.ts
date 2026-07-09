// Liens de navigation du site — source unique partagée par le Nav et le Footer
// (évite que les deux dérivent). Réordonner/renommer ici se répercute partout.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/character", label: "Character" },
  { href: "/team", label: "Team" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/blog", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const
