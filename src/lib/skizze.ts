// Handgezeichnete Regie-Notizen mit rough.js (Can 01.11.2026: „Rough.js-Zeichnungen an den passenden Stellen“).
// rough.js läuft NUR beim Build (wie Bauwelt): rough.generator() braucht kein DOM und liefert fertige SVG-Pfade.
// Im Browser landet kein Skript, nur statisches SVG, das sich per CSS selbst zeichnet (Skizze.astro).
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";

const gen = rough.generator();
export type Form = "unterstrich" | "kreis" | "rahmen" | "pfeil" | "kamera" | "klappe";
export type Strich = { d: string; fuellung?: boolean };

const basis = (seed: number, o: Options = {}): Options => ({
  roughness: 1.4, bowing: 1.6, strokeWidth: 2, seed, disableMultiStroke: false, preserveVertices: false, ...o,
});
const pfade = (dr: ReturnType<typeof gen.line>): Strich[] =>
  gen.toPaths(dr).map((p) => ({ d: p.d, fuellung: p.fill !== "none" && !!p.fill }));

/** Liefert die Striche einer Form im Koordinatensystem breite × hoehe. Fester Seed = jede Linie bleibt bei jedem Build gleich. */
export function skizze(form: Form, b: number, h: number, seed = 3): Strich[] {
  const m = 4; // Rand, damit nichts abgeschnitten wird
  switch (form) {
    case "unterstrich":
      return pfade(gen.curve([[m, h * 0.62], [b * 0.3, h * 0.42], [b * 0.62, h * 0.55], [b - m, h * 0.35]], basis(seed, { roughness: 1.1, bowing: 2 })));
    case "kreis":
      return pfade(gen.ellipse(b / 2, h / 2, b - 2 * m, h - 2 * m, basis(seed, { roughness: 1.6, curveStepCount: 11 })));
    case "rahmen":
      return pfade(gen.rectangle(m, m, b - 2 * m, h - 2 * m, basis(seed, { roughness: 1.2, bowing: 1 })));
    case "pfeil": {
      // geschwungener Pfeil von links nach rechts
      const kurve = pfade(gen.curve([[m, h * 0.7], [b * 0.35, h * 0.2], [b * 0.7, h * 0.25], [b - m - 2, h * 0.55]], basis(seed, { roughness: 1 })));
      const sx = b - m - 2, sy = h * 0.55;
      const spitze = pfade(gen.linearPath([[sx - 13, sy - 9], [sx, sy], [sx - 15, sy + 5]], basis(seed + 1, { roughness: 0.8 })));
      return [...kurve, ...spitze];
    }
    case "kamera": {
      // Filmkamera: Gehäuse, zwei Filmrollen, Objektiv, Stativ
      const o = (s: number) => basis(seed + s, { roughness: 1.2 });
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
      const o = (s: number) => basis(seed + s, { roughness: 1.1 });
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
