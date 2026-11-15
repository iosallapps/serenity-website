/* Serenity site: mobile menu and a solid header once the page scrolls. */
(function () {
  'use strict';
  function menu() {
    var btn = document.querySelector('.mobile-menu-btn');
    var nav = document.querySelector('.nav-links');
    if (!btn || !nav) return;
    function close() { nav.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('active');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !nav.contains(e.target)) close();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }
  function header() {
    var h = document.querySelector('header');
    if (!h) return;
    var on = function () { h.classList.toggle('is-scrolled', window.scrollY > 8); };
    on(); window.addEventListener('scroll', on, { passive: true });
  }
  try { menu(); } catch (e) {}
  try { header(); } catch (e) {}
})();

/* overscroll:start  status bar color + rubber-band stretch (same as vistoapps.com) */
(function () {
    var meta = document.querySelector('meta[name="theme-color"]');
    var root = document.documentElement;
    var top = meta ? meta.getAttribute("content") : "";
    var scrolled = meta ? meta.getAttribute("data-scrolled") || top : "";
    var last = top, pending = false, stretched = false;
    var apply = function () {
        pending = false;
        var y = window.scrollY;
        var theme = y > 8 ? scrolled : top;
        if (meta && theme !== last) { meta.setAttribute("content", theme); last = theme; }
        if (y < 0) { root.style.setProperty("--osy", String(-y)); stretched = true; }
        else if (stretched) { root.style.removeProperty("--osy"); stretched = false; }
    };
    window.addEventListener("scroll", function () {
        if (!pending) { pending = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
})();
/* overscroll:end */
