/* Job Terminator site: i18n engine (ar RTL default / en LTR) + interactions. */
const SELLER_EMAIL = "";
const WA_NUMBER = "201207516034";
const DEFAULT_LANG = "ar";

/* ---------- i18n engine ---------- */
let LANG = DEFAULT_LANG;
function t(key) {
  const d = (typeof I18N !== "undefined" && (I18N[LANG] || I18N[DEFAULT_LANG])) || {};
  return d[key] !== undefined ? d[key] : key;
}

function applyLang(lang) {
  if (typeof I18N === "undefined" || !I18N[lang]) lang = DEFAULT_LANG;
  LANG = lang;
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (dict[k] !== undefined) el.textContent = dict[k];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const k = el.getAttribute("data-i18n-html");
    if (dict[k] !== undefined) el.innerHTML = dict[k];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const k = el.getAttribute("data-i18n-ph");
    if (dict[k] !== undefined) el.setAttribute("placeholder", dict[k]);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const k = el.getAttribute("data-i18n-title");
    if (dict[k] !== undefined) el.setAttribute("title", dict[k]);
  });
  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const k = el.getAttribute("data-i18n-content");
    if (dict[k] !== undefined) el.setAttribute("content", dict[k]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const k = el.getAttribute("data-i18n-aria");
    if (dict[k] !== undefined) el.setAttribute("aria-label", dict[k]);
  });

  // Per-language WhatsApp prefilled texts.
  const order = document.querySelector(".js-wa-order");
  if (order) order.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t("wa.orderMsg"));
  const fl = document.querySelector(".js-wa-float");
  if (fl) fl.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t("wa.floatMsg"));

  const crumbs = document.querySelectorAll(".footer-desc, .footer-contact");
  document.documentElement.setAttribute("data-lang-set", lang);

  document.querySelectorAll(".lang-switch button").forEach((b) =>
    b.classList.toggle("active", b.getAttribute("data-lang") === lang)
  );
  try { localStorage.setItem("JobTerminator-lang", lang); } catch (e) {}
  if (typeof syncThemeAria === "function") syncThemeAria();
}

function initLang() {
  let saved = DEFAULT_LANG;
  try { saved = localStorage.getItem("JobTerminator-lang") || DEFAULT_LANG; } catch (e) {}
  applyLang(saved);
  document.querySelectorAll(".lang-switch button").forEach((b) =>
    b.addEventListener("click", () => applyLang(b.getAttribute("data-lang")))
  );
}

/* ---------- theme (dark default / light) ---------- */
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light" : "dark";
}
function syncThemeAria() {
  const b = document.getElementById("themeToggle");
  if (!b) return;
  b.setAttribute("aria-label",
    currentTheme() === "dark" ? t("theme.toLight") : t("theme.toDark"));
  const m = document.getElementById("themeColor");
  if (m) m.setAttribute("content",
    currentTheme() === "dark" ? "#060709" : "#f7f9fc");
}
function setTheme(th) {
  document.documentElement.setAttribute("data-theme", th);
  try { localStorage.setItem("JobTerminator-theme", th); } catch (e) {}
  syncThemeAria();
}
(function theme() {
  const b = document.getElementById("themeToggle");
  syncThemeAria();
  if (!b) return;
  b.addEventListener("click", () =>
    setTheme(currentTheme() === "dark" ? "light" : "dark"));
})();

/* ---------- active nav link ---------- */
(function spy() {
  const links = Array.prototype.slice.call(
    document.querySelectorAll(".main-nav a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  const map = {};
  links.forEach((a) => { map[a.getAttribute("href").slice(1)] = a; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.remove("active"));
        const a = map[e.target.id];
        if (a) a.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  Object.keys(map).forEach((id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
})();

/* ---------- header nav (mobile) ---------- */
(function nav() {
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    })
  );
  const onKey = (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  };
  document.addEventListener("keydown", onKey);
})();

/* ---------- reveal on scroll ---------- */
(function reveal() {
  const els = document.querySelectorAll(
    ".feature, .plan, .license-card, .dl-card, .app-window"
  );
  if (!("IntersectionObserver" in window)) return;
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---------- animated counters in the dashboard mockup ---------- */
(function counters() {
  const els = document.querySelectorAll("[data-counter]");
  const aw = document.querySelector(".app-window");
  if (!els.length && !aw) return;
  if (aw) setTimeout(() => aw.classList.add("ready"), 350);
  if (document.documentElement.getAttribute("data-theme") === "light") {
    els.forEach(run);
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
  let started = false;
  document.addEventListener("DOMContentLoaded", () => {
    if (!started) { els.forEach(run); started = true; }
  });
  function run(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseInt(el.getAttribute("data-counter"), 10);
    if (isNaN(target)) { el.textContent = "0"; return; }
    const reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || ep()) { el.textContent = target; return; }
    const dur = 900;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    function ep() {
      const wrap = el.closest(".stat");
      return !wrap || wrap.offsetHeight === 0 && !("IntersectionObserver" in window);
    }
  }
})();

/* ---------- footer year ---------- */
(function year() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- license form -> WhatsApp (primary) or email ---------- */
(function form() {
  const f = document.getElementById("licenseForm");
  if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(f);
    const text =
      t("form.fName") + ": " + (d.get("name") || "") +
      "\n" + t("form.fEmail") + ": " + (d.get("email") || "") +
      "\n" + t("form.fMid") + ": " + (d.get("mid") || "") +
      "\n" + t("form.fNotes") + ": " + (d.get("notes") || "-");
    if (SELLER_EMAIL && SELLER_EMAIL.indexOf("example.com") === -1) {
      const subject = encodeURIComponent(t("form.mailSubject") + (d.get("mid") || ""));
      location.href = "mailto:" + SELLER_EMAIL + "?subject=" + subject +
        "&body=" + encodeURIComponent(text + "\n");
    } else {
      location.href = "https://wa.me/" + WA_NUMBER + "?text=" +
        encodeURIComponent(t("form.waIntro") + text);
    }
  });
})();

initLang();