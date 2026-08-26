import { writeFile } from "node:fs/promises";

const routes = [
  "/",
  "/sobre",
  "/portfolio",
  "/terceirizacao",
  "/faq",
];

const configuredSiteUrl = process.env.VITE_SITE_URL?.trim();
const vercelProductionHost = process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL?.trim();
const candidate = configuredSiteUrl || vercelProductionHost;

if (!candidate) {
  console.log("Discovery files kept with relative paths because no production domain is configured.");
  process.exit(0);
}

const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
const parsedOrigin = new URL(withProtocol);
if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
  throw new Error("VITE_SITE_URL must use http or https.");
}
const origin = parsedOrigin.origin;
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${new URL(route, `${origin}/`).href}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

await Promise.all([
  writeFile("dist/sitemap.xml", sitemap, "utf8"),
  writeFile("dist/robots.txt", robots, "utf8"),
]);

console.log(`Discovery files finalized for ${origin}.`);
