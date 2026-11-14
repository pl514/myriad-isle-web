(function () {
  'use strict';

  /* ---------- 滚动时导航栏变实 ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- 滚动进场 ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.dataset.delay || 0;
        setTimeout(function () { el.classList.add('in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      // 同一屏的元素错开一点，避免一起弹出
      el.dataset.delay = String((i % 3) * 70);
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ：一次只展开一个 ---------- */
  var details = Array.prototype.slice.call(document.querySelectorAll('.faq details'));
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      details.forEach(function (other) {
        if (other !== d && other.open) other.open = false;
      });
    });
  });

  /* ---------- 顶部胶囊轻微视差 ---------- */
  var capsule = document.querySelector('.hero-capsule');
  if (capsule && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY, 420);
      capsule.style.transform = 'translateY(' + (y * 0.12) + 'px)';
    }, { passive: true });
  }

  /* ---------- 锚点平滑滚动（弥补旧浏览器） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- 小岛头像：内联 SVG，任意尺寸都清晰 ---------- */
  var HEAD_SVG = '<svg viewBox="0 0 88 88" aria-hidden="true">'
    + '<defs>'
    + '<linearGradient id="hBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e9f2fb"/><stop offset="1" stop-color="#c9d8e8"/></linearGradient>'
    + '<linearGradient id="hVisor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16304a"/><stop offset="1" stop-color="#08131f"/></linearGradient>'
    + '<linearGradient id="hEye" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6fbff"/><stop offset="1" stop-color="#2fbdf2"/></linearGradient>'
    + '</defs>'
    + '<rect x="10" y="12" width="68" height="66" rx="34" fill="url(#hBody)"/>'
    + '<rect x="20" y="24" width="48" height="40" rx="20" fill="url(#hVisor)"/>'
    + '<rect class="h-eye" x="30" y="33" width="8" height="21" rx="4" fill="url(#hEye)"/>'
    + '<rect class="h-eye" x="50" y="33" width="8" height="21" rx="4" fill="url(#hEye)"/>'
    + '</svg>';
  document.querySelectorAll('[data-mascot-head]').forEach(function (el) { el.innerHTML = HEAD_SVG; });
})();
