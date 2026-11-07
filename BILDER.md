# Bilder und Filme – Herkunft

Alle Dateien stammen von funkelfilm.com (Abruf 01.11.2026) und sind **nur zur Vorschau** eingebunden. Rechte und Freigaben: siehe OFFENE-INFOS.md, Punkt 1.

| Datei (public/medien/…) | Quelle auf funkelfilm.com | Bearbeitung |
|---|---|---|
| logo-weiss-480/960.png | Logo im Kopf der Seite (PNG) | verkleinert |
| favicon-32.png, apple-touch-icon.png | Favicon (FF-Zeichen) | verkleinert; Grund seit 07.11.2026 Anthrazit #2B2D31 statt Schwarz |
| og.png | Teilen-Vorschau: Logo + Unterzeile „Echte Geschichten.“ + H1 „Authentische Filme. Eindrucksvoll erzählt.“ (Gelb #FFCC00: „Filme“) + „Für Unternehmen, Marken und Menschen.“ auf Anthrazit #2B2D31 mit gelbem Band, Barlow Condensed (Jamil 4892/4894, 07.11.2026) | neu gesetzt |
| bilder/sheeras-rund-112/168, sheeras-kreis-400/680 | Hero (Mini-Porträt) und „Hinter jedem Film steht ein Mensch“ | quadratischer Ausschnitt aus dem Originalfoto (1280 × 2274), Gesicht mittig und größer (Jamil 4253), Graustufen |
| bilder/sheeras-pullover-* | Über uns, Porträt | Zuschnitt 4:5 |
| bilder/gimbal-* | Startseite „Lass uns deine Vision …“ | Zuschnitt 16:10 |
| bilder/sucher-set-* | Services, Kopfbild | Zuschnitt 16:10 |
| bilder/reise-2015/2017/2024-* | Über uns, „Meine Reise“ | quadratisch; 2024 = Einzelbild aus Animation |
| bilder/film-nexus-kids-* | Vorschaubild des YouTube-Films (Über uns) | Zuschnitt 16:9 |
| bilder/film-goldmalerin-* | Einzelbild aus dem Imagefilm-Ausschnitt (Services) | 16:9 |
| clips/reel.* | Zusammenschnitt aus den Animationen „Imagefilme“, „Kundengeschichten“, „Eventvideos“, „Unternehmensfilme“, „2024 – Über 100 Projekte“ | 10 → 25 fps (Bildmischung), MP4 + WebM, ohne Ton |
| clips/unternehmen.*, kundenstimmen.*, recruiting.*, event.* | Animationen der Leistungskarten (Startseite/Services) | MP4 + WebM, Standbild als WebP |

Karte „Einsatzgebiet“ (Startseite): Umriss Deutschlands aus Natural Earth 1:50m „Admin 0 – Countries“ (gemeinfrei, naturalearthdata.com), beim Bauen vereinfacht (`src/lib/deutschland-umriss.ts`); Zeichnung mit rough.js beim Build.

Farbabgleich 02.11.2026: Hero-Film `clips/reel.*` neu kodiert (gleiche Datenrate), Blaustich raus – Blau/Cyan entsättigt, Mitten/Lichter leicht warm (ffmpeg `huesaturation=colors=c+b:saturation=-0.8` + `colorbalance`); Hauttöne und Schwarz unverändert. Die übrigen Ausschnitte bleiben original: Sie haben keinen Blaustich, und der Filter hätte die Farben gezeigter Kunstwerke verändert.

Nicht übernommen: die vier „Warum …“-Bilder der Unterseiten (Herkunft unklar, wirken wie Archiv-/KI-Bilder) und das Fernseher-Mockup „Die Projekte sprechen für sich“.
