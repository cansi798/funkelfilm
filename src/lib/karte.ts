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

export type Ort = { name: string; lon: number; lat: number; seite: "l" | "r" | "u"; bogen?: number };
/** Heimatbasis + große Städte, gleichmäßig über Deutschland verteilt (Lage, keine Projektbehauptung).
 *  seite = Lage der Beschriftung (links, rechts, unten); bogen = Wölbung des Reisebogens ab Hamburg (Anteil der Strecke).
 *  Seiten und Wölbungen sind so gewählt, dass kein Bogen eine Beschriftung oder einen fremden Punkt kreuzt (rechnerisch geprüft). */
export const HEIMAT: Ort = { name: "Hamburg", lon: 9.99, lat: 53.55, seite: "r" };
export const ORTE: Ort[] = [
  { name: "Kiel", lon: 10.13, lat: 54.32, seite: "r" },
  { name: "Bremen", lon: 8.8, lat: 53.08, seite: "l" },
  { name: "Hannover", lon: 9.73, lat: 52.37, seite: "l" },
  { name: "Berlin", lon: 13.4, lat: 52.52, seite: "r", bogen: 0.2 },
  { name: "Dortmund", lon: 7.47, lat: 51.51, seite: "l" },
  { name: "Köln", lon: 6.96, lat: 50.94, seite: "l" },
  { name: "Leipzig", lon: 12.37, lat: 51.34, seite: "r", bogen: 0.08 },
  { name: "Dresden", lon: 13.74, lat: 51.05, seite: "u" },
  { name: "Frankfurt", lon: 8.68, lat: 50.11, seite: "l", bogen: -0.2 },
  { name: "Nürnberg", lon: 11.08, lat: 49.45, seite: "r" },
  { name: "Stuttgart", lon: 9.18, lat: 48.78, seite: "l", bogen: -0.12 },
  { name: "München", lon: 11.58, lat: 48.14, seite: "r", bogen: 0.12 },
];

const R_ORT = 3.6, R_HEIMAT = 11;

/** Alle Teile der Karte im Koordinatensystem KARTE.breite × KARTE.hoehe. */
export function deutschlandKarte() {
  const umriss = DEUTSCHLAND.flatMap((ring, i) => nur(gen.polygon(ring.map(([lo, la]) => P(lo, la)), ruhig(71 + i, i === 0 ? {} : { roughness: 0.3 }))));
  const [hx, hy] = P(HEIMAT.lon, HEIMAT.lat);
  // Reisebögen: starten am Ring um Hamburg und enden genau am Rand des Stadtpunkts (Linien stoppen am Endpunkt, RD09)
  const boegen = ORTE.filter((o) => o.bogen !== undefined).map((o, i) => {
    const [x, y] = P(o.lon, o.lat);
    const dx = x - hx, dy = y - hy, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
    const a: [number, number] = [hx + ux * (R_HEIMAT + 3), hy + uy * (R_HEIMAT + 3)];
    const b: [number, number] = [x - ux * (R_ORT + 3), y - uy * (R_ORT + 3)];
    // gen.curve läuft DURCH den Mittelpunkt → halbe Auslenkung = gleiche Form wie eine quadratische Kurve mit Kontrollpunkt w (so geprüft)
    const w = ((o.bogen ?? 0) * l) / 2;
    const m: [number, number] = [(a[0] + b[0]) / 2 - uy * w, (a[1] + b[1]) / 2 + ux * w];
    const d = nur(gen.curve([a, m, b], ruhig(90 + i, { roughness: 0.25, bowing: 0 })));
    return { name: o.name, d: d[0] };
  });
  const orte = ORTE.map((o) => { const [x, y] = P(o.lon, o.lat); return { ...o, x, y }; });
  return { umriss, boegen, orte, heimat: { ...HEIMAT, x: hx, y: hy, r: R_HEIMAT }, rOrt: R_ORT };
}
