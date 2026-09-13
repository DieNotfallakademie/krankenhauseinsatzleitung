document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }
});

/* ══════════════════════════════════════════════════════════════════════
   Elemente beim Scrollen einblenden
   ══════════════════════════════════════════════════════════════════════
   Ein IntersectionObserver statt eines Scroll-Handlers: der Browser meldet
   von sich aus, wenn ein Element in Sicht kommt, statt bei jedem Scroll-
   Ereignis Positionen nachzurechnen.

   Zwei Dinge sind Absicht:

   1. Beobachtung endet nach dem ersten Einblenden (unobserve). Elemente
      sollen nicht wieder verschwinden, wenn man zurückscrollt — das wirkt
      nervös und kostet Rechenzeit auf jeder Bewegung.

   2. Ohne IntersectionObserver (sehr alte Browser) wird alles sofort
      sichtbar gesetzt. Eine Seite, auf der wegen einer fehlenden
      Animationstechnik der halbe Inhalt unsichtbar bleibt, wäre schlimmer
      als eine ohne jede Animation. Dasselbe gilt bei abgeschalteter
      Bewegung: dort greift die CSS-Regel (prefers-reduced-motion). */
document.addEventListener("DOMContentLoaded", function () {
  var elemente = document.querySelectorAll(".auf");
  if (!elemente.length) return;

  if (!("IntersectionObserver" in window)) {
    elemente.forEach(function (el) { el.classList.add("sichtbar"); });
    return;
  }

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("sichtbar");
      beobachter.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });

  elemente.forEach(function (el) { beobachter.observe(el); });
});
