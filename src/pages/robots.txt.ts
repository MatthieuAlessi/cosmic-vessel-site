import type { APIRoute } from "astro";

// Genere depuis `site` (astro.config.mjs) : l'URL du sitemap suit le domaine sans edition manuelle.
// /keystatic est l'admin (fonction serverless), pas du contenu a indexer.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site);
  const body = `User-agent: *
Allow: /
Disallow: /keystatic

Sitemap: ${sitemap.href}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
