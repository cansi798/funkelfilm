import type { APIRoute } from "astro";
import { VORSCHAU } from "../daten";
// Vorschau: alles gesperrt (zusätzlich noindex im HTML, denn unter /funkelfilm/ wirkt eine robots.txt nicht).
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/sitemap.xml`, site).href;
  const text = VORSCHAU ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
