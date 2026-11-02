// Einsatzgebiet als handgezeichnete Deutschland-Karte (Can, Talk 4242, 02.11.2026: „Landkarte ganz Deutschland mit den Städten …
// wegen SEO, damit Anfragen aus ganz Deutschland kommen“). Technik wie Kerim/Bauwelt: rough.js NUR beim Build, im Browser
// nur statisches SVG + CSS. Ruhig nach Jamil 4228/4230: Einzelstrich, geringe Rauheit, fester Seed.
// Umriss aus echten Geodaten (deutschland-umriss.ts, Natural Earth, gemeinfrei). Städte = Lage auf der Karte, KEINE Projektorte.
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";
import { DEUTSCHLAND } from "./deutschland-umriss";

const gen = rough.generator();
const ruhig = (seed: number, o: Options = {}): Options => ({
  roughness: 0.45, bowing: 0.3, strokeWidth: 2, seed, disableMultiStroke: true, preserveVertices: true, ...o,
});
const nur = (dr: ReturnType<typeof gen.line>) => gen.toPaths(dr).filter((p) => p.stroke !== "none").map((p) => p.d);

// Projektion: längentreu bei 51,2° N (1° Länge ≈ 0,627° Breite), Norden oben
const K = 62, LON0 = 5.3, LAT0 = 55.2, C = Math.cos((51.2 * Math.PI) / 180);
const P = (lon: number, lat: number): [number, number] => [+((lon - LON0) * C * K).toFixed(1), +((LAT0 - lat) * K).toFixed(1)];
export const KARTE = { breite: 420, hoehe: 500 };

export type Seite = "l" | "r" | "u" | "o" | "ur" | "ul" | "dr" | "dl";
/** bogen = [Lage des Kontrollpunkts entlang der Strecke (0,5 = Mitte), Auslenkung quer als Anteil der Strecke].
 *  Jamil 4251: Bögen von Hamburg zu ALLEN Städten. Beschriftungsseiten + Bögen per Suchskript bestimmt (scratchpad boegen4.py):
 *  kein Bogen kreuzt eine Beschriftung, einen fremden Punkt oder „Hamburg“; kurze Strecken mit kleinem Bogen. */
export type Ort = { name: string; lon: number; lat: number; seite: Seite; bogen: [number, number] };
export const HEIMAT = { name: "Hamburg", lon: 9.99, lat: 53.55 };
export const ORTE: Ort[] = [
  { name: "Kiel", lon: 10.13, lat: 54.32, seite: "r", bogen: [0.5, 0.15] },
  { name: "Bremen", lon: 8.8, lat: 53.08, seite: "u", bogen: [0.5, 0.12] },
  { name: "Hannover", lon: 9.73, lat: 52.37, seite: "l", bogen: [0.5, 0.12] },
  { name: "Berlin", lon: 13.4, lat: 52.52, seite: "ur", bogen: [0.5, 0.27] },
  { name: "Dortmund", lon: 7.47, lat: 51.51, seite: "r", bogen: [0.5, 0.51] },
  { name: "Köln", lon: 6.96, lat: 50.94, seite: "dr", bogen: [0.5, 0.48] },
  { name: "Leipzig", lon: 12.37, lat: 51.34, seite: "u", bogen: [0.5, 0.09] },
  { name: "Dresden", lon: 13.74, lat: 51.05, seite: "r", bogen: [0.5, 0.06] },
  { name: "Frankfurt", lon: 8.68, lat: 50.11, seite: "l", bogen: [0.5, -0.18] },
  { name: "Nürnberg", lon: 11.08, lat: 49.45, seite: "ur", bogen: [0.5, 0.06] },
  { name: "Stuttgart", lon: 9.18, lat: 48.78, seite: "l", bogen: [0.5, -0.12] },
  { name: "München", lon: 11.58, lat: 48.14, seite: "dr", bogen: [0.65, 0.12] },
];

const R_ORT = 3.6, R_HEIMAT = 11;

/** Alle Teile der Karte im Koordinatensystem KARTE.breite × KARTE.hoehe. */
export function deutschlandKarte() {
  const umriss = DEUTSCHLAND.flatMap((ring, i) => nur(gen.polygon(ring.map(([lo, la]) => P(lo, la)), ruhig(71 + i, i === 0 ? {} : { roughness: 0.3 }))));
  const [hx, hy] = P(HEIMAT.lon, HEIMAT.lat);
  // Reisebögen als quadratische Kurven (Mitte Hamburg → Mitte Stadt); sichtbar erst ab dem Ring um Hamburg bis kurz vor den
  // Stadtpunkt (Linien stoppen am Endpunkt, RD09). rough zeichnet durch Stützpunkte der Kurve → Form wie im Suchskript geprüft.
  const boegen = ORTE.map((o, i) => {
    const [x, y] = P(o.lon, o.lat);
    const dx = x - hx, dy = y - hy, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
    const [tt, f] = o.bogen, w = f * l;
    const cx = hx + dx * tt - uy * w, cy = hy + dy * tt + ux * w;
    const punkte: [number, number][] = [];
    for (let k = 0; k <= 400; k++) {
      const t = k / 400, px = (1 - t) ** 2 * hx + 2 * (1 - t) * t * cx + t * t * x, py = (1 - t) ** 2 * hy + 2 * (1 - t) * t * cy + t * t * y;
      if (Math.hypot(px - hx, py - hy) >= R_HEIMAT + 3 && Math.hypot(px - x, py - y) >= R_ORT + 3) punkte.push([+px.toFixed(1), +py.toFixed(1)]);
    }
    const n = Math.max(3, Math.min(9, Math.round(l / 40)));
    const stuetz = Array.from({ length: n + 1 }, (_, j) => punkte[Math.round((j * (punkte.length - 1)) / n)]);
    const d = nur(gen.curve(stuetz, ruhig(90 + i, { roughness: 0.2, bowing: 0 })));
    return { name: o.name, d: d[0], laenge: l };
  });
  const orte = ORTE.map((o) => { const [x, y] = P(o.lon, o.lat); return { ...o, x, y }; });
  // nacheinander zeichnen: kurze Strecken zuerst
  const reihenfolge = [...boegen].sort((a, b) => a.laenge - b.laenge).map((b) => b.name);
  return { umriss, boegen: boegen.map((b) => ({ ...b, nr: reihenfolge.indexOf(b.name) })), orte, heimat: { ...HEIMAT, x: hx, y: hy, r: R_HEIMAT }, rOrt: R_ORT };
}
