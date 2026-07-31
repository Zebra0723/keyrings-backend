/* ============================================================
   FINDING JOY — site behaviour
   Progressive enhancement only: the site is fully readable
   with JS disabled. This adds the mobile menu, scroll reveal,
   reading progress, the newsletter placeholder, and renders
   the data-driven retailer / endorsement / news lists.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Sticky nav condense on scroll ------------ */
  var nav = document.querySelector("[data-nav]");
  if (nav) {
    var onScrollNav = function () {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ---------- 2. Mobile full-screen menu ------------------ */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  var closeBtn = document.querySelector("[data-menu-close]");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (toggle) toggle.focus();
  }
  if (toggle) toggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu && menu.classList.contains("is-open")) closeMenu();
  });

  /* ---------- 3. Desktop dropdown keyboard support -------- */
  document.querySelectorAll("[data-dropdown-trigger]").forEach(function (trigger) {
    var item = trigger.closest(".nav__item--has-menu");
    var sub = item ? item.querySelector(".nav__menu") : null;
    if (!sub) return;
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var open = sub.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) {
        sub.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- 4. Scroll reveal ---------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && !reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 5. Reading progress hairline ---------------- */
  var progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    var onScrollProgress = function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    window.addEventListener("resize", onScrollProgress);
    onScrollProgress();
  }

  /* ---------- 6. Newsletter placeholder ------------------- */
  /* TODO: wire this form to your mailing-list provider.
     Nothing is submitted anywhere yet — see the comment in
     the form markup for exactly where to connect it. */
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    var note = form.parentNode.querySelector("[data-newsletter-note]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (note) note.textContent = "Sign-ups open soon.";
    });
  });

  /* ---------- 7. Retailer purchase buttons ---------------- */
  /* Resolves a retailer's url (string, or per-book object) for
     the given book slug. Returns a string or null. */
  function resolveUrl(url, slug) {
    if (!url) return null;
    if (typeof url === "string") return url.trim() ? url : null;
    if (typeof url === "object" && slug && url[slug]) return url[slug];
    return null;
  }
  document.querySelectorAll("[data-retailers]").forEach(function (container) {
    if (!window.RETAILERS) return;
    var slug = container.getAttribute("data-book") || "";
    var frag = document.createDocumentFragment();
    window.RETAILERS.forEach(function (r) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      var href = resolveUrl(r.url, slug);
      if (href) {
        a.className = "btn";
        a.href = href;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = r.name;
        a.setAttribute("aria-label", r.name + " — buy " + (container.getAttribute("data-title") || "this book"));
      } else {
        a.className = "btn btn--inert";
        a.href = "#";
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("tabindex", "-1");
        a.addEventListener("click", function (e) { e.preventDefault(); });
        a.innerHTML = r.name + ' <span aria-hidden="true">·</span> <span class="visually-hidden">status: </span>Coming Soon';
      }
      li.appendChild(a);
      frag.appendChild(li);
    });
    container.innerHTML = "";
    container.appendChild(frag);
  });

  /* ---------- 8. Endorsements ----------------------------- */
  document.querySelectorAll("[data-endorsements]").forEach(function (container) {
    if (!window.ENDORSEMENTS) return;
    var limit = parseInt(container.getAttribute("data-limit"), 10) || window.ENDORSEMENTS.length;
    var list = window.ENDORSEMENTS.slice(0, limit);
    var frag = document.createDocumentFragment();
    list.forEach(function (e) {
      var card = document.createElement("figure");
      card.className = "endorse-card" + (e.featured ? " endorse-card--featured" : "");

      var quote = document.createElement("blockquote");
      quote.className = "endorse-card__quote";
      quote.textContent = e.quote;

      var attr = document.createElement("figcaption");
      attr.className = "endorse-card__attr";
      var name = document.createElement("div");
      name.className = "endorse-card__name";
      var cred = document.createElement("div");
      cred.className = "endorse-card__credential";

      if (e.source_url) {
        var link = document.createElement("a");
        link.href = e.source_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = e.name;
        name.appendChild(link);
      } else {
        name.textContent = e.name;
      }
      cred.textContent = e.credential;

      attr.appendChild(name);
      attr.appendChild(cred);
      card.appendChild(quote);
      card.appendChild(attr);
      frag.appendChild(card);
    });
    container.innerHTML = "";
    container.appendChild(frag);
  });

  /* ---------- 9. News ------------------------------------- */
  document.querySelectorAll("[data-news]").forEach(function (container) {
    if (!window.NEWS) return;
    var frag = document.createDocumentFragment();
    window.NEWS.forEach(function (n) {
      var li = document.createElement("li");
      li.className = "news-item";

      var date = document.createElement("div");
      date.className = "news-item__date";
      var dt = document.createElement("time");
      dt.setAttribute("datetime", n.date);
      dt.textContent = formatDate(n.date);
      date.appendChild(dt);

      var title = document.createElement("h2");
      title.className = "news-item__title";
      title.textContent = n.title;

      var body = document.createElement("p");
      body.className = "news-item__body";
      body.textContent = n.body;

      li.appendChild(date);
      li.appendChild(title);
      li.appendChild(body);
      frag.appendChild(li);
    });
    container.innerHTML = "";
    container.appendChild(frag);
  });

  function formatDate(iso) {
    var parts = String(iso).split("-");
    if (parts.length !== 3) return iso;
    var months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
    var y = parts[0], m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
    if (!months[m - 1]) return iso;
    return months[m - 1] + " " + d + ", " + y;
  }
})();
