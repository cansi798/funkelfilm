// Handgezeichnete Regie-Notizen mit rough.js (Can 01.11.2026: „Rough.js-Zeichnungen an den passenden Stellen“).
// rough.js läuft NUR beim Build (wie Bauwelt): rough.generator() braucht kein DOM und liefert fertige SVG-Pfade.
// Im Browser landet kein Skript, nur statisches SVG, das sich per CSS selbst zeichnet (Skizze.astro).
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";

const gen = rough.generator();
export type Form = "unterstrich" | "kreis" | "rahmen" | "pfeil" | "kamera" | "klappe";
export type Strich = { d: string; fuellung?: boolean };

// Ruhig statt kritzelig (Jamil 4228/4230, Standard redesign/animation.md 5: Rauheit ≤ 0,7, Einzelstrich): geringe Rauheit, kaum Bogen, EIN Strich statt Doppelstrich – handgemacht, aber elegant.
const basis = (seed: number, o: Options = {}): Options => ({
  roughness: 0.7, bowing: 0.5, strokeWidth: 2, seed, disableMultiStroke: true, preserveVertices: false, ...o,
});
const pfade = (dr: ReturnType<typeof gen.line>): Strich[] =>
  gen.toPaths(dr).map((p) => ({ d: p.d, fuellung: p.fill !== "none" && !!p.fill }));

/** Liefert die Striche einer Form im Koordinatensystem breite × hoehe. Fester Seed = jede Linie bleibt bei jedem Build gleich. */
export function skizze(form: Form, b: number, h: number, seed = 3): Strich[] {
  const m = 4; // Rand, damit nichts abgeschnitten wird
  switch (form) {
    case "unterstrich":
      return pfade(gen.curve([[m, h * 0.62], [b * 0.3, h * 0.42], [b * 0.62, h * 0.55], [b - m, h * 0.35]], basis(seed, { roughness: 0.6, bowing: 0.8 })));
    case "kreis":
      return pfade(gen.ellipse(b / 2, h / 2, b - 2 * m, h - 2 * m, basis(seed, { roughness: 0.6, curveStepCount: 18, curveFitting: 0.98 })));
    case "rahmen":
      return pfade(gen.rectangle(m, m, b - 2 * m, h - 2 * m, basis(seed, { roughness: 0.55, bowing: 0.4 })));
    case "pfeil": {
      // geschwungener Pfeil von links nach rechts
      // sanfter Bogen, saubere symmetrische Spitze entlang der Endrichtung
      const kurve = pfade(gen.curve([[m, h * 0.65], [b * 0.4, h * 0.3], [b * 0.72, h * 0.32], [b - m - 2, h * 0.5]], basis(seed, { roughness: 0.5, bowing: 0.3 })));
      const sx = b - m - 2, sy = h * 0.5;
      const spitze = pfade(gen.linearPath([[sx - 11, sy - 8], [sx, sy], [sx - 12, sy + 6]], basis(seed + 1, { roughness: 0.25, bowing: 0 })));
      return [...kurve, ...spitze];
    }
    case "kamera": {
      // Filmkamera: Gehäuse, zwei Filmrollen, Objektiv, Stativ
      const o = (s: number) => basis(seed + s, { roughness: 0.6 });
      return [
        ...pfade(gen.rectangle(b * 0.18, h * 0.42, b * 0.5, h * 0.28, o(0))),
        ...pfade(gen.circle(b * 0.3, h * 0.27, h * 0.26, o(1))),
        ...pfade(gen.circle(b * 0.56, h * 0.27, h * 0.26, o(2))),
        ...pfade(gen.polygon([[b * 0.68, h * 0.5], [b * 0.88, h * 0.42], [b * 0.88, h * 0.7], [b * 0.68, h * 0.62]], o(3))),
        ...pfade(gen.line(b * 0.43, h * 0.7, b * 0.25, h - m, o(4))),
        ...pfade(gen.line(b * 0.43, h * 0.7, b * 0.43, h - m, o(5))),
        ...pfade(gen.line(b * 0.43, h * 0.7, b * 0.61, h - m, o(6))),
      ];
    }
    case "klappe": {
      // Filmklappe: Tafel + schräg geöffnete Klappe mit Streifen
      const o = (s: number) => basis(seed + s, { roughness: 0.6 });
      const striche: Strich[] = [
        ...pfade(gen.rectangle(b * 0.12, h * 0.42, b * 0.76, h * 0.5, o(0))),
        ...pfade(gen.line(b * 0.12, h * 0.6, b * 0.88, h * 0.6, o(1))),
        ...pfade(gen.polygon([[b * 0.1, h * 0.38], [b * 0.84, h * 0.12], [b * 0.88, h * 0.24], [b * 0.14, h * 0.5]], o(2))),
      ];
      for (let i = 1; i <= 3; i++) {
        const t = i / 4;
        striche.push(...pfade(gen.line(b * (0.1 + 0.74 * t), h * (0.38 - 0.26 * t), b * (0.14 + 0.74 * t + 0.06), h * (0.5 - 0.26 * t), o(3 + i))));
      }
      return striche;
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Hero-Regieskizze (Can 02.11.2026: „Hero mit Rough.js wow … hier entstehen Filme“): Storyboard-Rahmen mit
// Kadrier-Marken um den laufenden Film + kleine Filmklappe, die zuklappt („Take 1“). Ruhig: Einzelstrich, Rauheit ≤ 0,55.
type Teil = { d: string };
const ruhig = (seed: number, o: Options = {}): Options => basis(seed, { roughness: 0.5, bowing: 0.35, ...o });
const nur = (dr: ReturnType<typeof gen.line>): Teil[] => gen.toPaths(dr).filter((p) => p.stroke !== "none").map((p) => ({ d: p.d }));

/** Bildrahmen b × h (viewBox) mit Drittel-Marken an den Kanten und Mittelkreuz. */
export function storyboard(b: number, h: number, seed = 41) {
  const m = 3;
  const rahmen = nur(gen.rectangle(m, m, b - 2 * m, h - 2 * m, ruhig(seed, { roughness: 0.45, bowing: 0.25 })));
  const t = Math.min(b, h) * 0.06; // Länge der Marken
  const marken: Teil[] = [];
  const linie = (x1: number, y1: number, x2: number, y2: number, s: number) => marken.push(...nur(gen.line(x1, y1, x2, y2, ruhig(seed + s, { roughness: 0.3, bowing: 0 }))));
  [1 / 3, 2 / 3].forEach((f, i) => {
    linie(b * f, m, b * f, m + t, 10 + i);          // oben
    linie(b * f, h - m, b * f, h - m - t, 20 + i);  // unten
    linie(m, h * f, m + t, h * f, 30 + i);          // links
    linie(b - m, h * f, b - m - t, h * f, 40 + i);  // rechts
  });
  const k = t * 0.55;
  const kreuz = [
    ...nur(gen.line(b / 2 - k, h / 2, b / 2 + k, h / 2, ruhig(seed + 50, { roughness: 0.25, bowing: 0 }))),
    ...nur(gen.line(b / 2, h / 2 - k, b / 2, h / 2 + k, ruhig(seed + 51, { roughness: 0.25, bowing: 0 }))),
  ];
  return { rahmen, marken, kreuz };
}

/** Filmklappe im Feld 120 × 104: Tafel (mit Trennlinie), fester Balken und Klappe (dreht um das linke Gelenk). */
export function filmklappe(seed = 61) {
  const tafel = [
    ...nur(gen.rectangle(6, 40, 108, 60, ruhig(seed, { roughness: 0.4 }))),
    ...nur(gen.line(6, 58, 114, 58, ruhig(seed + 1, { roughness: 0.3, bowing: 0 }))),
  ];
  // Fester Balken direkt über der Tafel mit zwei Schrägstreifen
  const balken = [
    ...nur(gen.rectangle(6, 28, 108, 12, ruhig(seed + 2, { roughness: 0.35 }))),
    ...[30, 62, 94].flatMap((x, i) => nur(gen.line(x, 40, x + 12, 28, ruhig(seed + 3 + i, { roughness: 0.25, bowing: 0 })))),
  ];
  // Klappe: liegt im geschlossenen Zustand genau auf dem Balken (y 16–28); CSS dreht sie auf und lässt sie zuschnappen
  const klappe = [
    ...nur(gen.rectangle(6, 16, 108, 12, ruhig(seed + 7, { roughness: 0.35 }))),
    ...[18, 50, 82].flatMap((x, i) => nur(gen.line(x, 28, x + 12, 16, ruhig(seed + 8 + i, { roughness: 0.25, bowing: 0 })))),
  ];
  return { tafel, balken, klappe };
}
