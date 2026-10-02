/* Motion and project previews. All of it is progressive enhancement: with JS
   off, or with reduced motion on, the page is already complete and this only
   removes work. */

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

  /* ══ Project previews ═════════════════════════════════════════════
     Hovering a product name opens a small card about it. Keyboard gets
     the same thing on focus; touch toggles it on tap. Runs whatever the
     motion preference — reduced motion means a gentler transition, not
     a missing feature. ─────────────────────────────────────────────── */

  var PROJECTS = {
    journey: {
      title: 'Journey Studio',
      kind: 'Developer tool',
      desc: 'Chain HTTP calls on a canvas so the ids and tokens each step ' +
            'returns feed the next. Save one and it runs in CI as a regression test.',
      stack: 'React Flow · Express · Zustand',
      shot: 'img/journey.webp',
      link: 'github.com/onuohasilver/journey-studio',
      mark: '<circle cx="8" cy="11" r="3.6"/><circle cx="31" cy="8" r="3.6"/>' +
            '<circle cx="25" cy="30" r="3.6"/><path d="M11.5 10.4 27.5 8.4"/>' +
            '<path d="M30.2 11.5 26 26.5"/>'
    },
    crow: {
      title: 'Crow',
      kind: 'Marketplace',
      desc: 'Describe a job in Telegram, in English or Pidgin, typed or spoken. ' +
            'It goes out to approved providers and the first to accept takes it.',
      stack: 'Fastify · Postgres · Paystack',
      shot: 'img/crow.webp',
      mark: '<circle cx="9" cy="20" r="3.4"/><path d="M15 20h7"/>' +
            '<path d="M14.6 17.6 22 10.5"/><path d="M14.6 22.4 22 29.5"/>' +
            '<circle cx="26" cy="20" r="2.2"/><circle cx="25" cy="8.5" r="2.2"/>' +
            '<circle cx="25" cy="31.5" r="2.2"/>'
    },
    creatormarkt: {
      title: 'CreatorMarkt',
      kind: 'Marketplace',
      desc: 'Brands hire creators for video and photo work. The budget waits in ' +
            'escrow until the brand approves, then the post is tracked across four platforms.',
      stack: 'Next.js · Drizzle · Paystack',
      shot: 'img/creatormarkt.webp',
      mark: '<circle cx="7.5" cy="20" r="3.6"/><circle cx="32.5" cy="20" r="3.6"/>' +
            '<rect x="15" y="14.5" width="10" height="11" rx="2"/>' +
            '<path d="M11.2 20h3.6M25.2 20h3.6"/><path d="M20 18.2v3.4"/>'
    },
    betprophet: {
      title: 'BetProphet',
      kind: 'Modelling',
      desc: 'Prices football markets from its own models, flags the ones the ' +
            'bookmaker has wrong, and sizes the stake so a cold week survives.',
      stack: 'FastAPI · APScheduler · Twilio',
      shot: 'img/betprophet.webp',
      mark: '<path d="M4 30c8 0 7-18 16-18s8 18 16 18"/><path d="M28 30.5V19.5"/>' +
            '<circle cx="28" cy="17" r="2.2"/>'
    }
  };

  var triggers = [].slice.call(document.querySelectorAll('[data-proj]'));

  if (triggers.length && window.matchMedia) {
    var card = document.createElement('div');
    card.className = 'peek';
    card.id = 'peek';
    card.setAttribute('role', 'tooltip');
    document.body.appendChild(card);

    var open = null;      /* the trigger the card currently belongs to */
    var showTimer, hideTimer;

    function fill(key) {
      var p = PROJECTS[key];
      card.innerHTML =
        (p.shot
          ? '<img class="peek-shot" src="' + p.shot + '" alt="" width="640" height="360" decoding="async">'
          : '') +
        '<div class="peek-body">' +
          '<div class="peek-head">' +
            '<svg class="peek-mark" viewBox="0 0 40 40" aria-hidden="true">' + p.mark + '</svg>' +
            '<span class="peek-id"><span class="peek-title">' + p.title + '</span>' +
            '<span class="peek-kind">' + p.kind + '</span></span>' +
          '</div>' +
          '<p class="peek-desc">' + p.desc + '</p>' +
          '<p class="peek-stack">' + p.stack +
            (p.link ? '<span class="peek-link">' + p.link + ' \u2197</span>' : '') +
          '</p>' +
        '</div>';
    }

    function place(trigger) {
      var r = trigger.getBoundingClientRect();
      var w = card.offsetWidth;
      var h = card.offsetHeight;
      var gutter = 12;
      var gap = 10;

      var left = r.left + r.width / 2 - w / 2;
      left = Math.max(gutter, Math.min(left, window.innerWidth - w - gutter));

      /* Above by default; below when there isn't room, so it never
         covers the line you're reading on a short viewport. */
      var below = r.top - h - gap < gutter;
      var top = below ? r.bottom + gap : r.top - h - gap;

      card.classList.toggle('below', below);
      card.style.left = Math.round(left) + 'px';
      card.style.top = Math.round(top) + 'px';

      /* Point the arrow and the scale origin at the name itself. */
      var anchor = Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14));
      card.style.setProperty('--anchor', Math.round(anchor) + 'px');
    }

    function show(trigger) {
      clearTimeout(hideTimer);
      if (open === trigger) return;
      open = trigger;
      fill(trigger.dataset.proj);
      card.classList.add('measuring');
      place(trigger);
      card.classList.remove('measuring');
      card.classList.add('on');
      trigger.setAttribute('aria-describedby', 'peek');
      if (trigger.tagName !== 'A') trigger.setAttribute('aria-expanded', 'true');
    }

    function hide() {
      clearTimeout(showTimer);
      if (!open) return;
      open.removeAttribute('aria-describedby');
      if (open.tagName !== 'A') open.setAttribute('aria-expanded', 'false');
      open = null;
      card.classList.remove('on');
    }

    var fine = matchMedia('(hover: hover) and (pointer: fine)');

    triggers.forEach(function (t) {
      var isLink = t.tagName === 'A';
      if (!isLink) {
        t.setAttribute('tabindex', '0');
        t.setAttribute('role', 'button');
        t.setAttribute('aria-expanded', 'false');
      }

      t.addEventListener('mouseenter', function () {
        if (!fine.matches) return;
        clearTimeout(hideTimer);
        /* A little intent delay, or the card flickers at every name the
           pointer crosses on its way down the page. */
        showTimer = setTimeout(function () { show(t); }, 130);
      });

      t.addEventListener('mouseleave', function () {
        if (!fine.matches) return;
        clearTimeout(showTimer);
        hideTimer = setTimeout(hide, 110);
      });

      t.addEventListener('focus', function () { show(t); });
      t.addEventListener('blur', hide);

      /* A link must still navigate, so only the plain names toggle. */
      if (!isLink) {
        t.addEventListener('click', function (e) {
          e.stopPropagation();
          if (open === t) hide(); else show(t);
        });

        t.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (open === t) hide(); else show(t);
          }
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide();
    });
    document.addEventListener('click', function () { hide(); });

    /* Keep it pinned to its name while the page moves under it. */
    var queued = false;
    window.addEventListener('scroll', function () {
      if (!open || queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; if (open) place(open); });
    }, { passive: true });
    window.addEventListener('resize', function () { if (open) place(open); });

    /* Warm the screenshots once the page has settled, so the first hover
       doesn't wait on a network round trip. */
    var warm = function () {
      Object.keys(PROJECTS).forEach(function (k) {
        if (PROJECTS[k].shot) { var i = new Image(); i.src = PROJECTS[k].shot; }
      });
    };
    if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 3000 });
    else setTimeout(warm, 1800);
  }

  /* ══ Arrival ══════════════════════════════════════════════════════ */

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
    var SPAN = 760;
    var LEAD = 420;

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

      [].forEach.call(el.querySelectorAll('[data-proj]'), function (b, k) {
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
