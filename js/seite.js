// Einziges Skript der Seite (CSP: nur eigene Dateien, kein Inline-JS, keine Drittanbieter).
// 1) <html class="js">, damit Animationen erst im Bild starten (ohne JS ist alles sichtbar).
// 2) Reveal + Zeitleiste: einmal starten, sobald gut ein Drittel im Bild ist.
// 3) Kopfzeile: nur Schatten + gelbe Fortschrittsleiste; „Nach oben“ nach ca. einem Bildschirm.
// 4) Sucher im Hero und Clips der Unterseiten: Video lädt erst nach dem Seitenaufbau, mit Pause-Knopf; Timecode läuft mit dem Film.
// 5) Karten: stummer Ausschnitt beim Darüberfahren/Fokus. 6) YouTube erst nach Klick (youtube-nocookie). 7) Anfrage → fertige E-Mail.
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
  // WebM (VP9) wo möglich (kleiner, auch in Chromium ohne H.264), sonst MP4 (Safari)
  var webm = document.createElement("video").canPlayType('video/webm; codecs="vp9"') !== "";
  function laden(video) { if (!video.src && video.dataset.src) { video.src = webm ? video.dataset.src.replace(/\.mp4$/, ".webm") : video.dataset.src; } }

  // Video mit Pause-Knopf, pausiert außerhalb des Bildes (spart Akku), respektiert die Wahl des Besuchers
  function steuern(box, video, klasse, beiZeit) {
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
    if (beiZeit) {
      var tick = function () { beiZeit(video.currentTime); requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
    laden(video); spielen();
  }

  function zweistellig(n) { return (n < 10 ? "0" : "") + n; }

  document.addEventListener("DOMContentLoaded", function () {
    // 0) Einstieg: endet nach 2,6 s von selbst; Überspringen-Knopf, Esc oder Klick beenden sofort (Klicks gehen trotzdem durch)
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
    var geplant = false;
    var pruefen = function () {
      geplant = false;
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (kopf) kopf.classList.toggle("gescrollt", y > 8);
      if (balken) balken.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if (oben) oben.classList.toggle("sichtbar", y > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", function () { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }, { passive: true });
    pruefen();

    // 4) Sucher (Hero)
    var sucher = document.querySelector("[data-sucher]");
    if (sucher) {
      nachIntro(function () { requestAnimationFrame(function () { requestAnimationFrame(function () { sucher.classList.add("an"); }); }); });
      var zeit = sucher.querySelector("[data-zeit]");
      var video = sucher.querySelector("video");
      if (video && !ruhig && !sparen) nachLaden(function () {
        steuern(sucher, video, "laeuft", function (t) {
          if (!zeit) return;
          var s = Math.floor(t), f = Math.floor((t - s) * 25);
          zeit.textContent = "00:" + zweistellig(Math.floor(s / 60)) + ":" + zweistellig(s % 60) + ":" + zweistellig(f);
        });
      });
    }
    // Clips im Kopf der Unterseiten
    document.querySelectorAll("[data-autoclip]").forEach(function (box) {
      var v = box.querySelector("video");
      if (v && !ruhig && !sparen) nachLaden(function () { steuern(box, v, "spielt"); });
    });

    // 5) Karten: Ausschnitt beim Darüberfahren (nur Maus) oder Tastatur-Fokus
    var maus = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.querySelectorAll("[data-vorschau]").forEach(function (bild) {
      var v = bild.querySelector("video"), karte = bild.closest("li, article") || bild;
      if (!v || ruhig || sparen) return;
      var an = function () { laden(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); bild.classList.add("spielt"); };
      var aus = function () { v.pause(); bild.classList.remove("spielt"); };
      if (maus) { karte.addEventListener("mouseenter", an); karte.addEventListener("mouseleave", aus); }
      karte.addEventListener("focusin", an); karte.addEventListener("focusout", aus);
    });

    // 6) YouTube erst nach Klick
    document.querySelectorAll("[data-film]").forEach(function (buehne) {
      var knopf = buehne.querySelector(".film-start");
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
