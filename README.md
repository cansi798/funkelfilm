# Funkelfilm – Website (Redesign)

Neue Website für Funkelfilm (Videoproduktion, Hamburg). Vorschau: https://cansi798.github.io/funkelfilm/ (noindex).

- **Technik:** Astro 7, rein statisch, keine Tracker, keine externen Schriften/CDNs. Schriften (Barlow Condensed für Überschriften und Logo-Unterzeile, Archivo für Text) selbst gehostet, Filmausschnitte selbst gehostet (MP4 + WebM), YouTube nur nach Klick (youtube-nocookie). Strenge CSP als Meta-Tag.
- **Branches:** `quelle` = Quellcode, `main` = gebaute Seite für GitHub Pages.
- **Inhalte:** eine Quelle der Wahrheit in `src/daten.ts`. Alles stammt von der bisherigen Seite funkelfilm.com; Fehlendes steht in `OFFENE-INFOS.md` und ist in der Vorschau rot gestrichelt markiert.
- **Bilder/Filme:** Herkunft in `BILDER.md`. Hero-Film am 02.11.2026 farblich angeglichen (Blaustich raus, leicht warm).
- **rough.js-Zeichnungen** (Problem-Karten, Vertrauenszeile, Einsatzgebiet-Karte) entstehen nur beim Build (`src/lib/skizze.ts`, `src/lib/karte.ts`); im Browser nur SVG + CSS. Im Hero bewusst keine Zeichnung (Jamil Talk 4250).

## Telefon und WhatsApp

Rufnummer ändern = eine Zeile in `src/daten.ts`: `export const TELEFON = '+49 …';` (derzeit die Impressums-Nummer) (WhatsApp nutzt automatisch dieselbe Nummer, sonst `WHATSAPP` setzen). Danach bauen und veröffentlichen. Leer = Vorschau zeigt „Nummer folgt“, live ausgeblendet.

## Bauen und veröffentlichen

```bash
bash scripts/bauen.sh             # Build in Docker (node:22) + Linkprüfung
bash scripts/veroeffentlichen.sh  # dist/ + LICENSE + .nojekyll als normaler Commit auf main (kein Force-Push)
```

Livegang auf eigener Domain: `SITE=https://funkelfilm.com BASE=/ VORSCHAU=false bash scripts/bauen.sh` (schaltet noindex, Vorschau-Banner und Platzhalter ab; robots.txt und Sitemap werden freigegeben).

## Lizenz

Alle Rechte vorbehalten, siehe `LICENSE`. Inhalte, Fotos, Filme und Logo von Funkelfilm gehören Funkelfilm.
