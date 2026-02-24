import type { APIRoute } from "astro";
import { site } from "../data/site";
import { services } from "../data/services";

const staticPages = [
  "/",
  "/servizi",
  "/chi-siamo",
  "/casi-studio",
  "/certificazioni",
  "/customer-care",
  "/contatti",
  "/privacy",
  "/cookie",
];

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toUrl(path: string): string {
  const base = site.baseUrl.replace(/\/$/, "");
  return `${base}${path}`;
}

export const GET: APIRoute = () => {
  const now = new Date().toISOString();

  const urls = [
    ...staticPages.map((path) => ({ loc: toUrl(path), changefreq: "weekly", priority: path === "/" ? "1.0" : "0.7" })),
    ...services.map((s) => ({
      loc: toUrl(`/servizi/${s.slug}`),
      changefreq: "weekly",
      priority: "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};