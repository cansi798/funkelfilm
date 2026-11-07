// Einziges Skript der Seite (CSP: nur eigene Dateien, kein Inline-JS, keine Drittanbieter).
// 1) <html class="js">, damit Animationen erst im Bild starten (ohne JS ist alles sichtbar).
// 2) Reveal + Zeitleiste: einmal starten, sobald gut ein Drittel im Bild ist.
// 3) Kopfzeile: nur Schatten + gelbe Fortschrittsleiste; „Nach oben“ nach ca. einem Bildschirm.
// 4) Hero-Film und Clips der Unterseiten: Video lädt erst nach dem Seitenaufbau, mit Pause-Knopf.
// 7) Startseite: Stapel-Effekt (Abschnitte schieben sich übereinander, Jamil 4897).

document.documentElement.classList.add("js");
(function () {
  var html = document.documentElement;
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 0) Wow-Einstieg nur beim ersten Seitenaufruf der Sitzung (sofort im <head>, damit nichts aufblitzt)
  var intro = false;
  try { if (!ruhig && !sessionStorage.getItem("ff-intro")) { intro = true; sessionStorage.setItem("ff-intro", "1"); } } catch (e) { intro = false; }
  if (intro) html.classList.add("mit-intro");
  var introFertig = [];
  function nachIntro(fn) { if (!intro) fn(); else introFertig.push(fn); }
  function introEnde() {
    if (!intro) return; intro = false;
    var f = introFertig; introFertig = []; f.forEach(function (fn) { fn(); });
    setTimeout(function () { html.classList.remove("mit-intro", "intro-weg"); }, 260);
  }
  var sparen = navigator.connection && navigator.connection.saveData;

  function nachLaden(fn) {
    var los = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 300); })(fn, { timeout: 2500 }); };
    if (document.readyState === "complete") los(); else window.addEventListener("load", los, { once: true });
  }
  // WebM (VP9) wo möglich (kleiner, auch in Chromium ohne H.264), sonst MP4. Apple-Browser (iPhone/iPad/Mac-Safari) immer MP4:
  // sie melden WebM teils als abspielbar, spielen H.264 aber zuverlässig und mit Hardware (Jamil Talk 4239: „Der Film läuft nicht mehr“).
  var apple = /Apple/.test(navigator.vendor || "");
  var webm = !apple && document.createElement("video").canPlayType('video/webm; codecs="vp9"') !== "";
  function laden(video) {
    if (!video.src && video.dataset.src) {
      video.src = webm ? video.dataset.src.replace(/\.mp4$/, ".webm") : video.dataset.src;
      // Sicherheitsnetz: kann der Browser die WebM nicht abspielen (z. B. Safari), einmal auf MP4 wechseln und neu starten
      if (webm) video.addEventListener("error", function () {
        if (video.dataset.mp4) return; video.dataset.mp4 = "1";
        video.src = video.dataset.src; video.load(); var p = video.play(); if (p && p.catch) p.catch(function () {});
      }, { once: true });
      if (video.dataset.tempo) {
        var t = parseFloat(video.dataset.tempo);
        var setzen = function () { video.defaultPlaybackRate = t; video.playbackRate = t; };
        setzen(); video.addEventListener("loadedmetadata", setzen);
      }
    }
  }

  // Video mit Pause-Knopf, pausiert außerhalb des Bildes (spart Akku), respektiert die Wahl des Besuchers
  function steuern(box, video, klasse) {
    var knopf = box.querySelector("[data-pause]");
    var angehalten = false, imBild = true;
    var spielen = function () { if (!angehalten && imBild) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } };
    video.addEventListener("playing", function () { box.classList.add(klasse); box.classList.remove("pausiert"); if (knopf) knopf.hidden = false; });
    video.addEventListener("pause", function () { box.classList.add("pausiert"); });
    if (knopf) knopf.addEventListener("click", function () {
      angehalten = !angehalten; knopf.setAttribute("aria-pressed", angehalten ? "true" : "false");
      if (angehalten) video.pause(); else spielen();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { imBild = e[0].isIntersecting; if (imBild) spielen(); else video.pause(); }, { threshold: 0.15 }).observe(box);
    }
    laden(video); spielen();
  }

  document.addEventListener("DOMContentLoaded", function () {
    // 0) Einstieg (Vorspann 3–2–1, Jamil 4246): endet nach 2,45 s von selbst; Überspringen-Knopf, Esc oder Klick beenden sofort (Klicks gehen trotzdem durch)
    if (intro) {
      var timer = setTimeout(introEnde, 2450);
      var abbrechen = function () { if (!intro) return; clearTimeout(timer); html.classList.add("intro-weg"); introEnde(); };
      var skip = document.querySelector("[data-intro-skip]");
      if (skip) skip.addEventListener("click", abbrechen);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") abbrechen(); });
      document.addEventListener("pointerdown", function (e) { if (!skip || !skip.contains(e.target)) abbrechen(); }, { once: true });
      // Hero-Teile schon kurz vor dem Ende freigeben, damit die Blende direkt in die Scharfstellung übergeht
      setTimeout(function () { var f = introFertig; introFertig = []; f.forEach(function (fn) { fn(); }); }, 1650);
    }

    // 2) Reveal, Szenen und Skizzen: starten erst im Bild und laufen dann ganz durch (springen nie ans Ende)
    document.querySelectorAll('[data-skizze="nach-intro"]').forEach(function (el) {
      nachIntro(function () { setTimeout(function () { el.classList.add("an"); }, 700); });
    });
    // erst nach dem Einstieg beobachten – was unter der Blende liegt, soll man auch ablaufen sehen
    nachIntro(function () {
      var ziele = document.querySelectorAll('[data-szene], .reveal, [data-skizze="sichtbar"]');
      var starten = function (el) { el.classList.add("an"); };
      if (!("IntersectionObserver" in window)) ziele.forEach(starten);
      else {
        var io = new IntersectionObserver(function (eintraege) {
          eintraege.forEach(function (e) { if (e.isIntersecting) { starten(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.35 });
        ziele.forEach(function (el) { io.observe(el); });
      }
    });

    // 3) Kopfzeile + Nach oben
    var kopf = document.querySelector(".kopf");
    var balken = document.querySelector(".kopf-balken span");
    var oben = document.querySelector(".nach-oben");
    var leiste = document.querySelector("[data-direkt]"); // Anruf/WhatsApp-Leiste am Handy: erscheint nach dem ersten Bildschirm
    var geplant = false;
    var pruefen = function () {
      geplant = false;
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (kopf) kopf.classList.toggle("gescrollt", y > 8);
      if (balken) balken.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if (oben) oben.classList.toggle("sichtbar", y > window.innerHeight * 0.9);
      if (leiste) leiste.classList.toggle("sichtbar", y > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", function () { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }, { passive: true });
    pruefen();

    // 4) Hero-Film
    var sucher = document.querySelector("[data-sucher]");
    if (sucher) {
      var video = sucher.querySelector("video");
      if (video && !ruhig && !sparen) nachIntro(function () { nachLaden(function () { steuern(sucher, video, "laeuft"); }); });
      // Tippen/Klicken auf den Film zeigt den (ausgeblendeten) Pause-Knopf für 3 s (Can 4255, WCAG 2.2.2)
      var bild = sucher.querySelector(".hero-bild"), steuerUhr = null;
      if (bild) bild.addEventListener("click", function () {
        sucher.classList.add("steuerung"); clearTimeout(steuerUhr);
        steuerUhr = setTimeout(function () { sucher.classList.remove("steuerung"); }, 3000);
      });
    }
    // Clips im Kopf der Unterseiten
    document.querySelectorAll("[data-autoclip]").forEach(function (box) {
      var v = box.querySelector("video");
      if (!v || ruhig || sparen) return;
      if (box.hasAttribute("data-spaet") && "IntersectionObserver" in window) {
        // erst laden, wenn der Abschnitt ins Bild kommt (spart Daten und Ladezeit)
        var io2 = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io2.disconnect(); steuern(box, v, "spielt"); } }, { threshold: 0.25 });
        io2.observe(box);
      } else nachLaden(function () { steuern(box, v, "spielt"); });
    });

    // 5) Karten: Vorschau beim Darüberfahren (Maus) bzw. Tastatur-Fokus; am Handy, solange die Karte gut im Bild ist
    var maus = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.querySelectorAll("[data-vorschau]").forEach(function (bild) {
      var v = bild.querySelector("video"), karte = bild.closest("li, article") || bild;
      if (ruhig) return;
      var an = function () { if (v && !sparen) { laden(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); } bild.classList.add("spielt"); };
      var aus = function () { if (v) v.pause(); bild.classList.remove("spielt"); };
      if (maus) { karte.addEventListener("mouseenter", an); karte.addEventListener("mouseleave", aus); }
      else if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { if (e[0].intersectionRatio >= 0.7) an(); else aus(); }, { threshold: [0, 0.7] }).observe(bild);
      }
      karte.addEventListener("focusin", an); karte.addEventListener("focusout", aus);
    });

    // Leistungs-Karten: breit alle offen, schmal nur die erste (nur bei Breitenänderung neu entscheiden – iOS feuert resize beim Scrollen)
    var ziele = document.querySelectorAll(".ziel-karte");
    var breiteAlt = 0;
    var zieleSetzen = function () {
      var b = window.innerWidth; if (b === breiteAlt) return; breiteAlt = b;
      var breit = b >= 1024;
      ziele.forEach(function (d) { d.open = breit; });
    };
    if (ziele.length) { zieleSetzen(); window.addEventListener("resize", zieleSetzen); }

    // Stimmen-Laufband: Pause-Knopf
    var bandKnopf = document.querySelector("[data-band-pause]"), band = document.querySelector("[data-band]");
    if (bandKnopf && band) bandKnopf.addEventListener("click", function () {
      var halt = !band.classList.contains("halt"); band.classList.toggle("halt", halt); bandKnopf.setAttribute("aria-pressed", halt ? "true" : "false");
    });

    // Ablauf: goldene Linie folgt der Scrollposition
    var linie = document.querySelector("[data-linie]"), schritte = linie ? linie.querySelectorAll("[data-schritt]") : [];

    var parallax = document.querySelector("[data-parallax]");
    // nur breit: am Handy ist der Film eine eigene Fläche über dem Text, dort kein Versatz
    if (parallax && !(window.matchMedia && window.matchMedia("(min-width: 60rem)").matches)) parallax = null;
    function scrollSzenen() {
      var h = window.innerHeight;
      if (parallax && !ruhig) {
        var r0 = parallax.parentNode.getBoundingClientRect();
        // Versatz nur aus der Scrollstrecke: beim Laden 0 (vorher hing er von der Lage des Heros beim ersten Aufruf ab)
        if (r0.bottom > 0) parallax.style.transform = "translate3d(0," + Math.round(Math.min(window.scrollY, h) * 0.12) + "px,0)";
      }
      if (linie && !ruhig) {
        var r2 = linie.getBoundingClientRect();
        if (r2.bottom > 0 && r2.top < h) {
          var f = Math.min(1, Math.max(0, (h * 0.75 - r2.top) / (r2.height * 0.8)));
          var n = Math.max(1, schritte.length - 1), pos = f * n;
          schritte.forEach(function (sch, i) {
            sch.style.setProperty("--seg", Math.min(1, Math.max(0, pos - i)).toFixed(3));
            sch.classList.toggle("erreicht", pos >= i - 0.02);
          });
        }
      }
    }
    var szenenGeplant = false;
    window.addEventListener("scroll", function () { if (!szenenGeplant) { szenenGeplant = true; requestAnimationFrame(function () { szenenGeplant = false; scrollSzenen(); }); } }, { passive: true });
    scrollSzenen();

    // 7) Stapel-Effekt der Startseite (Jamil 4897): Abschnitte bleiben stehen, der nächste schiebt sich darüber (CSS position: sticky).
    //    Hier nur: je Abschnitt --h (Höhe, per ResizeObserver – ändert sich nur bei Größenänderung) und --deckt (0…1, wie weit der
    //    nächste Abschnitt ihn schon verdeckt). --deckt wird ohne Layout-Abfragen berechnet: aus den gespeicherten natürlichen
    //    Positionen und scrollY, einmal je Bild (rAF), Scroll-Listener passiv. Ohne ResizeObserver: normales Scrollen.
    var stapel = document.querySelector("main[data-stapel]");
    if (stapel && "ResizeObserver" in window) {
      var karten = Array.prototype.filter.call(stapel.children, function (el) { return el.tagName === "SECTION"; });
      var hoehen = karten.map(function () { return 0; }), oben0 = [], kopfH = 0, stapelGeplant = false;
      var lagen = function () {
        // natürliche Lage (ohne sticky): Oberkante von main + Summe der Höhen davor
        var y = stapel.getBoundingClientRect().top + window.scrollY;
        kopfH = kopf ? kopf.offsetHeight : 0;
        for (var i = 0; i < karten.length; i++) { oben0[i] = y; y += hoehen[i]; }
      };
      var decken = function () {
        stapelGeplant = false;
        if (ruhig) return;
        var Y = window.scrollY, vh = window.innerHeight, weg = Math.max(1, vh - kopfH);
        for (var i = 0; i < karten.length - 1; i++) {
          var p = Math.min(1, Math.max(0, (vh - (oben0[i + 1] - Y)) / weg));
          var alt = karten[i]._deckt;
          if (alt === undefined || Math.abs(alt - p) > 0.004 || (p === 0) !== (alt === 0)) { karten[i]._deckt = p; karten[i].style.setProperty("--deckt", p.toFixed(3)); }
        }
      };
      var ro = new ResizeObserver(function (eintraege) {
        eintraege.forEach(function (e) {
          var i = karten.indexOf(e.target), h = e.borderBoxSize && e.borderBoxSize[0] ? e.borderBoxSize[0].blockSize : e.target.offsetHeight;
          if (i < 0) return; hoehen[i] = h; e.target.style.setProperty("--h", Math.round(h) + "px");
        });
        lagen(); decken();
      });
      karten.forEach(function (k) { ro.observe(k); });
      html.classList.add("stapeln");
      window.addEventListener("scroll", function () { if (!stapelGeplant) { stapelGeplant = true; requestAnimationFrame(decken); } }, { passive: true });
      window.addEventListener("resize", function () { if (!stapelGeplant) { stapelGeplant = true; requestAnimationFrame(function () { lagen(); decken(); }); } }, { passive: true });
    }

    // 6) YouTube erst nach Klick
    document.querySelectorAll("[data-film]").forEach(function (buehne) {
      var knopf = buehne.querySelector(".film-start") || (buehne.parentNode && buehne.parentNode.querySelector(".film-start"));
      if (!knopf) return;
      knopf.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(buehne.dataset.film) + "?autoplay=1&rel=0&modestbranding=1";
        f.title = buehne.dataset.titel || "Film";
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.allowFullscreen = true;
        f.referrerPolicy = "strict-origin-when-cross-origin";
        buehne.textContent = "";
        buehne.appendChild(f);
        if (knopf.isConnected) knopf.hidden = true;
        f.focus();
      });
    });

    // 7) Anfrage: fertige E-Mail im E-Mail-Programm
    var form = document.querySelector("[data-kompass]");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var art = d.get("art") || "Film";
      var text = "Hallo Sheeras,\n\nich interessiere mich für: " + art + ".\n\n" +
        (d.get("worum") ? "Worum es geht:\n" + d.get("worum") + "\n\n" : "") +
        "Ich freue mich auf ein kostenloses Erstgespräch.\n\n" + (d.get("name") || "");
      window.location.href = "mailto:" + form.dataset.mail + "?subject=" + encodeURIComponent("Anfrage: " + art) + "&body=" + encodeURIComponent(text);
    });
  });
})();
