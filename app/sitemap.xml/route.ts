export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const routes = [
    { path: "/", priority: "1.0" },
    { path: "/sobre", priority: "0.8" },
    { path: "/portfolio", priority: "0.9" },
    { path: "/portfolio/atual-pet", priority: "0.8" },
    { path: "/portfolio/quality-pet", priority: "0.8" },
    { path: "/portfolio/mais-dog", priority: "0.8" },
    { path: "/portfolio/dez-pet", priority: "0.8" },
    { path: "/terceirizacao", priority: "0.9" },
    { path: "/faq", priority: "0.7" },
  ];
  const urls = routes
    .map(({ path, priority }) => `  <url><loc>${origin}${path}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
