/* Motion. Everything here is progressive enhancement: with JS off, or with
   reduced motion on, the page is already complete and this only removes work. */

(function () {
  'use strict';

  var root = document.documentElement;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── The old Flutter build installed a service worker. Evict it so
        returning visitors aren't served the stale shell. ───────────── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(function (rs) { rs.forEach(function (r) { r.unregister(); }); })
      .catch(function () {});
    if (window.caches && caches.keys) {
      caches.keys()
        .then(function (ks) { ks.forEach(function (k) { caches.delete(k); }); })
        .catch(function () {});
    }
  }

  /* No observer, no staged reveal — let the failsafe uncover the page. */
  if (!('IntersectionObserver' in window)) return;

  if (still) {
    root.classList.add('still', 'motion');
    return;
  }

  /* ── The lede resolves a word at a time. ──────────────────────────
        Split on load so the HTML stays plain prose. Spaces live outside
        the spans, so selection and copy-paste come out clean.         */
  var lede = document.querySelector('.lede');
  if (lede) {
    var words = lede.textContent.trim().split(/\s+/);
    lede.textContent = '';
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = w;
      s.style.setProperty('--i', i);
      lede.appendChild(s);
      if (i < words.length - 1) lede.appendChild(document.createTextNode(' '));
    });
  }

  /* ── The meta line settles out of noise. ──────────────────────────
        Monospace and a fixed character count, so nothing reflows while
        it runs. Non-letters are left alone — the separator and the
        comma stay put and give the eye something to hold. ──────────── */
  var meta = document.querySelector('.meta');
  if (meta) {
    var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}*#%&';
    var target = meta.textContent;
    var chars = target.split('');
    var settled = chars.map(function (c) { return /[a-z]/i.test(c) ? 0 : 1; });
    var start = null;
    var SPAN = 760;   /* whole run */
    var LEAD = 420;   /* how far the resolve front leads the tail */

    meta.textContent = chars.map(function (c, i) {
      return settled[i] ? c : GLYPHS[(i * 7) % GLYPHS.length];
    }).join('');

    requestAnimationFrame(function step(t) {
      if (start === null) start = t;
      var elapsed = t - start;
      var front = (elapsed / SPAN) * (chars.length + LEAD / SPAN * chars.length);
      var out = '';
      var done = true;
      for (var i = 0; i < chars.length; i++) {
        if (settled[i] || i < front - 3) {
          out += chars[i];
        } else if (i < front + 6) {
          out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          done = false;
        } else {
          out += GLYPHS[((i * 7 + ((elapsed / 50) | 0)) % GLYPHS.length)];
          done = false;
        }
      }
      meta.textContent = out;
      if (!done && elapsed < SPAN + 400) requestAnimationFrame(step);
      else meta.textContent = target;
    });
  }

  /* ── Blocks arrive as they come into view. ────────────────────────
        The first batch — whatever is on screen at load — is staggered.
        Everything below the fold waits for the scroll that reveals it,
        so nothing animates where the reader can't see it.            */
  var blocks = [].slice.call(document.querySelectorAll('main > *'));
  var first = true;

  var io = new IntersectionObserver(function (entries, obs) {
    var batch = entries.filter(function (e) { return e.isIntersecting; });
    batch.sort(function (a, b) { return blocks.indexOf(a.target) - blocks.indexOf(b.target); });

    batch.forEach(function (entry, n) {
      var el = entry.target;
      el.style.setProperty('--delay', (first ? n * 70 + 40 : 0) + 'ms');
      el.classList.add('in');

      /* Product names get their rule drawn under them, one after the next,
         once the paragraph itself has arrived. */
      [].forEach.call(el.querySelectorAll('b'), function (b, k) {
        b.style.setProperty('--delay', (first ? n * 70 + 40 : 0) + 320 + k * 110 + 'ms');
      });

      obs.unobserve(el);
    });

    if (batch.length) first = false;
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  blocks.forEach(function (el) { io.observe(el); });

  /* Checked in last, so anything that threw above leaves the failsafe armed
     and the page uncovers itself. */
  root.classList.add('motion');
})();
