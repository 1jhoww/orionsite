import { readFile, writeFile } from "node:fs/promises";

const siteConfig = JSON.parse(await readFile(new URL("../site.config.json", import.meta.url), "utf8"));

const routes = [
  "/",
  "/sobre",
  "/portfolio",
  "/terceirizacao",
  "/faq",
  "/contato",
  "/politica-de-privacidade",
  "/politica-de-cookies",
];

const configuredSiteUrl = process.env.VITE_SITE_URL?.trim();
const vercelProductionHost = process.env.VITE_VERCEL_PROJECT_PRODUCTION_URL?.trim();
// The official domain is the default so the built sitemap and robots always carry
// absolute URLs; an env var only overrides it for preview deployments.
const candidate = configuredSiteUrl || vercelProductionHost || siteConfig.siteUrl;

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
