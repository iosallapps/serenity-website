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
