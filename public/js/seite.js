// Einziges Skript der Seite (CSP: nur eigene Dateien, kein Inline-JS, keine Drittanbieter).
// 1) <html class="js">, damit Animationen erst im Bild starten (ohne JS ist alles sichtbar).
// 2) Reveal + Zeitleiste: einmal starten, sobald gut ein Drittel im Bild ist.
// 3) Kopfzeile: nur Schatten + gelbe Fortschrittsleiste; „Nach oben“ nach ca. einem Bildschirm.
// 4) Hero-Film und Clips der Unterseiten: Video lädt erst nach dem Seitenaufbau, mit Pause-Knopf.
// 5) Hero-Regieskizze (rough.js, beim Build erzeugt): zeichnet sich direkt nach dem Einstieg bzw. sofort, wenn es keinen gibt.

document.documentElement.classList.add("js");
(function () {
  var html = document.documentElement;
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 0) Wow-Einstieg nur beim ersten Seitenaufruf der Sitzung (sofort im <head>, damit nichts aufblitzt)
  var intro = false;
  try { if (!ruhig && !sessionStorage.getItem("ff-intro")) { intro = true; sessionStorage.setItem("ff-intro", "1"); } } catch (e) { intro = false; }
  if (intro) html.classList.add("mit-intro");
  var introFertig = [], introVorbei = [];
  function nachIntro(fn) { if (!intro) fn(); else introFertig.push(fn); }
  // erst, wenn der Einstieg wirklich weg ist (Ende oder Überspringen) – nicht schon beim vorgezogenen Freigeben der Hero-Teile
  function nachEinstieg(fn) { if (!intro) fn(); else introVorbei.push(fn); }
  function introEnde() {
    if (!intro) return; intro = false;
    var f = introFertig.concat(introVorbei); introFertig = []; introVorbei = []; f.forEach(function (fn) { fn(); });
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
    // 0) Einstieg (Vorspann 3–2–1, Jamil 4246): endet nach 2,65 s von selbst; Überspringen-Knopf, Esc oder Klick beenden sofort (Klicks gehen trotzdem durch)
    if (intro) {
      var timer = setTimeout(introEnde, 2650);
      var abbrechen = function () { if (!intro) return; clearTimeout(timer); html.classList.add("intro-weg"); introEnde(); };
      var skip = document.querySelector("[data-intro-skip]");
      if (skip) skip.addEventListener("click", abbrechen);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") abbrechen(); });
      document.addEventListener("pointerdown", function (e) { if (!skip || !skip.contains(e.target)) abbrechen(); }, { once: true });
      // Hero-Teile schon kurz vor dem Ende freigeben, damit die Blende direkt in die Scharfstellung übergeht
      setTimeout(function () { var f = introFertig; introFertig = []; f.forEach(function (fn) { fn(); }); }, 1900);
    }

    // 5) Hero-Regieskizze: ohne Einstieg kurz nach dem ersten Bild, mit Einstieg genau an dessen Ende
    var regie = document.querySelector('[data-skizze="hero"]');
    if (regie) { var mitEinstieg = intro; nachEinstieg(function () { setTimeout(function () { regie.classList.add("an"); }, mitEinstieg ? 80 : 250); }); }

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
