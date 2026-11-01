// Prüft alle internen Links, Anker und Quellen in dist/ (keine 404 innerhalb der Seite, kein fehlender Base-Präfix).
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
const BASE = (process.env.BASE || "/funkelfilm").replace(/\/$/, "") + "/";
const dateien = [];
const lauf = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? lauf(p) : p.endsWith(".html") && dateien.push(p); });
lauf("dist");
let fehler = 0;
for (const f of dateien) {
  const html = readFileSync(f, "utf8");
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) { console.log("Nicht genau eine H1", f); fehler++; }
  if (/\son[a-z]+="/i.test(html)) { console.log("Inline-Eventhandler", f); fehler++; }
  if (/style="/.test(html)) { console.log("Inline-style (CSP)", f); fehler++; }
  if (/<script(?![^>]*application\/ld\+json)(?![^>]*\ssrc=)[^>]*>/.test(html)) { console.log("Inline-Skript (CSP)", f); fehler++; }
  if (/undefined|NaN/.test(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, ""))) { console.log("Template-Fehler (undefined/NaN)", f); fehler++; }
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = url.trim();
    if (!u || /^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    if (u.startsWith("#")) { if (u.length > 1 && !ids.has(u.slice(1))) { console.log("Anker fehlt", f, u); fehler++; } continue; }
    if (!u.startsWith(BASE) && u + "/" !== BASE) { console.log("Ohne base", f, u); fehler++; continue; }
    let [pfad, anker] = u.slice(BASE.length).split("#");
    pfad = decodeURIComponent((pfad || "").split("?")[0]);
    let ziel = join("dist", pfad);
    if (pfad === "" || pfad.endsWith("/")) ziel = join(ziel, "index.html");
    if (!existsSync(ziel)) { console.log("404", f, u); fehler++; continue; }
    if (anker && ziel.endsWith(".html") && !readFileSync(ziel, "utf8").includes(`id="${anker}"`)) { console.log("Anker fehlt", f, u); fehler++; }
  }
}
console.log(`${dateien.length} Seiten geprüft, ${fehler} Fehler.`);
process.exit(fehler ? 1 : 0);
