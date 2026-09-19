/* Job Terminator V2 — i18n engine, interactions, form storage and request log.
   Works in any country: the language dropdown is built automatically from the
   LANGUAGES registry below, so adding a new language for another country is a
   single entry here plus its "xx" block in lang.js. RTL handling, locale and
   number/date formatting all follow the language, not a hard-coded pair.
   To add a language:
     1. copy the "en" block in lang.js and translate the values (keep the keys);
     2. add its code and native name + dir to LANGUAGES below.
   No other code changes are needed. */
"use strict";

var SELLER_EMAIL = "seller@example.com"; /* real address routes by email; example.com keeps WhatsApp */
var WA_NUMBER = "201207516034";
var DEFAULT_LANG = "ar";
var LANGUAGES = {
  ar: { name: "العربية", dir: "rtl", locale: "ar-EG-u-nu-latn" },
  en: { name: "English", dir: "ltr", locale: "en-US" }
};
var STORE_KEY = "jobterm-orders";
var LANG_KEY = "jobterm-lang";
var THEME_KEY = "jobterm-theme";

/* ---------- i18n ---------- */
var LANG = DEFAULT_LANG;

function dict(lang) {
  return (typeof I18N !== "undefined" && (I18N[lang] || I18N[DEFAULT_LANG])) || {};
}
function t(key) {
  var d = dict(LANG);
  return d[key] !== undefined ? d[key] : key;
}
function locale() {
  var l = LANGUAGES[LANG];
  /* Follow a country-specific locale when present, else a safe generic one,
     so numbers and dates render natively in any new language that is added. */
  return (l && l.locale) || (LANG + (LANG.length === 2 ? "-" + LANG.toUpperCase() : ""));
}
function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat(locale(), { dateStyle: "long", timeStyle: "short" })
      .format(new Date(iso));
  } catch (e) {
    return iso;
  }
}
function formatNumber(n) {
  try {
    return new Intl.NumberFormat(locale(), { maximumFractionDigits: 2 }).format(n);
  } catch (e) {
    return String(n);
  }
}

function readInitialLang() {
  var q = null;
  try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
  if (q && LANGUAGES[q]) return q;
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  return LANGUAGES[saved] ? saved : DEFAULT_LANG;
}

function applyLang(lang) {
  if (!LANGUAGES[lang]) lang = DEFAULT_LANG;
  LANG = lang;
  var d = dict(lang);
  var root = document.documentElement;
  root.lang = lang;
  root.dir = LANGUAGES[lang].dir === "rtl" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (d[k] !== undefined) el.textContent = d[k];
  });
  var bind = function (attr, apply) {
    document.querySelectorAll("[data-i18n-" + attr + "]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-" + attr);
      if (d[k] !== undefined) apply(el, d[k]);
    });
  };
  bind("html", function (el, v) { el.innerHTML = v; });
  bind("ph", function (el, v) { el.setAttribute("placeholder", v); });
  bind("title", function (el, v) { el.setAttribute("title", v); });
  bind("content", function (el, v) { el.setAttribute("content", v); });
  bind("aria", function (el, v) { el.setAttribute("aria-label", v); });
  bind("alt", function (el, v) { el.setAttribute("alt", v); });

  /* localized dates and numbers */
  document.querySelectorAll("[data-intl-date]").forEach(function (el) {
    var iso = el.getAttribute("datetime") || el.getAttribute("data-intl-date");
    if (iso) el.textContent = formatDate(iso);
  });
  document.querySelectorAll("[data-intl-num]").forEach(function (el) {
    var n = Number(el.getAttribute("data-intl-num"));
    if (!isNaN(n)) el.textContent = formatNumber(n);
  });

  /* WhatsApp deep links carry the localized opening line */
  var order = document.querySelector(".js-wa-order");
  if (order) order.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t("wa.orderMsg"));
  var fl = document.querySelector(".js-wa-float");
  if (fl) fl.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t("wa.floatMsg"));

  /* the active language in the dropdown */
  var cur = document.getElementById("langCurrent");
  if (cur) cur.textContent = LANGUAGES[lang].name;
  document.querySelectorAll("#langMenu button").forEach(function (b) {
    b.setAttribute("aria-selected", b.getAttribute("data-lang") === lang ? "true" : "false");
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  });

  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  try {
    var url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  } catch (e) {}

  syncThemeAria();
  var st = document.getElementById("formStatus");
  if (st) st.textContent = "";
}

/* ---------- language dropdown (any country) ---------- */
function buildLangMenu() {
  var trigger = document.getElementById("langTrigger");
  var menu = document.getElementById("langMenu");
  if (!trigger || !menu) return;
  Object.keys(LANGUAGES).forEach(function (code) {
    var li = document.createElement("li");
    li.setAttribute("role", "option");
    li.id = "langopt-" + code;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-lang", code);
    btn.setAttribute("aria-selected", code === readInitialLang() ? "true" : "false");
    btn.className = "lang-menu__item";
    var name = document.createElement("span");
    name.textContent = LANGUAGES[code].name;
    var ok = document.createElement("span");
    ok.innerHTML = '<svg class="lang-ok" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
    ok.setAttribute("aria-hidden", "true");
    btn.appendChild(name);
    btn.appendChild(ok);
    li.appendChild(btn);
    menu.appendChild(li);
  });
  trigger.addEventListener("click", function () {
    var open = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", open ? "false" : "true");
  });
  menu.addEventListener("click", function (e) {
    var item = e.target.closest("#langMenu button[data-lang]");
    if (!item) return;
    var code = item.getAttribute("data-lang");
    if (code !== LANG) applyLang(code);
    trigger.setAttribute("aria-expanded", "false");
  });
  function close() { trigger.setAttribute("aria-expanded", "false"); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(); trigger.focus(); }
    else if (e.key === "ArrowDown") {
      var opts = Array.prototype.slice.call(menu.querySelectorAll("#langMenu button"));
      var idx = opts.indexOf(document.activeElement);
      if (idx >= 0 && idx < opts.length - 1) opts[idx + 1].focus();
    } else if (e.key === "ArrowUp") {
      var optsU = Array.prototype.slice.call(menu.querySelectorAll("#langMenu button"));
      var idxU = optsU.indexOf(document.activeElement);
      if (idxU > 0) optsU[idxU - 1].focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".lang-switch")) close();
  });
}

function initLang() {
  applyLang(readInitialLang());
  buildLangMenu();
}

/* ---------- theme ---------- */
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}
function syncThemeAria() {
  var b = document.getElementById("themeToggle");
  if (b) b.setAttribute("aria-label", currentTheme() === "dark" ? t("theme.toLight") : t("theme.toDark"));
  var m = document.getElementById("themeColor");
  if (m) m.setAttribute("content", currentTheme() === "dark" ? "#0B0D0C" : "#F7F6F2");
}
function setTheme(th) {
  document.documentElement.setAttribute("data-theme", th);
  try { localStorage.setItem(THEME_KEY, th); } catch (e) {}
  syncThemeAria();
}
function initTheme() {
  syncThemeAria();
  var b = document.getElementById("themeToggle");
  if (b) b.addEventListener("click", function () { setTheme(currentTheme() === "dark" ? "light" : "dark"); });
}

/* ---------- masthead nav ---------- */
function initNav() {
  var btn = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!btn || !nav) return;
  var setOpen = function (open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };
  btn.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("is-open")) return;
    if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
}

/* ---------- active section ---------- */
function initSpy() {
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      if (map[e.target.id]) map[e.target.id].setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(map).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) io.observe(s);
  });
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
  els.forEach(function (el) { io.observe(el); });
}

/* ---------- run-log filters ---------- */
function initLedger() {
  var table = document.querySelector(".ledger table");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".filters .chip"));
  var empty = document.querySelector(".ledger__empty");
  if (!table || !chips.length) return;
  var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
  var apply = function (state) {
    var shown = 0;
    rows.forEach(function (r) {
      var match = state === "all" || r.getAttribute("data-state") === state;
      r.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  };
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); });
      apply(c.getAttribute("data-filter"));
    });
  });
  apply("all");
}

/* ---------- request store (local, timestamped, exportable) ---------- */
function loadOrders() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}
function saveOrders(arr) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(arr)); } catch (e) {}
  renderOrders();
}
function renderOrders() {
  var list = document.getElementById("ordersList");
  if (!list) return;
  var arr = loadOrders();
  var empty = document.getElementById("ordersEmpty");
  var note = document.getElementById("ordersNote");
  list.textContent = "";
  if (!arr.length) {
    if (empty) empty.hidden = false;
    if (note) note.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  if (note) note.hidden = false;
  arr.slice().reverse().forEach(function (o) {
    var li = document.createElement("li");
    li.className = "orders__item";
    var dl = document.createElement("dl");
    var add = function (labelKey, value) {
      var dt = document.createElement("dt"); dt.textContent = t(labelKey);
      var dd = document.createElement("dd"); dd.textContent = value;
      dl.appendChild(dt); dl.appendChild(dd);
    };
    add("orders.field.time", formatDate(o.ts));
    add("orders.field.name", o.name || "-");
    add("orders.field.email", o.email || "-");
    add("orders.field.mid", o.mid || "-");
    if (o.notes) add("orders.field.notes", o.notes);
    add("orders.field.lang", o.lang || "-");
    li.appendChild(dl);
    list.appendChild(li);
  });
}
function download(filename, text, mime) {
  var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}
function ordersToCsv(arr) {
  var heads = ["id", "timestamp", "language", "name", "email", "machine_code", "notes"];
  var esc = function (v) { return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; };
  var lines = [heads.join(",")];
  arr.forEach(function (o) {
    lines.push([o.id, o.ts, o.lang, o.name, o.email, o.mid, o.notes].map(esc).join(","));
  });
  return "\ufeff" + lines.join("\r\n");
}

/* ---------- orders panel ---------- */
function initOrders() {
  var panel = document.getElementById("orders");
  if (!panel) return;
  var openers = [document.getElementById("ordersOpen"), document.getElementById("ordersOpenFooter")].filter(Boolean);
  var closeBtn = document.getElementById("ordersClose");
  var lastFocus = null;
  var open = function () {
    lastFocus = document.activeElement;
    renderOrders();
    panel.hidden = false;
    panel.classList.add("is-open");
    if (closeBtn) closeBtn.focus();
  };
  var close = function () {
    panel.classList.remove("is-open");
    panel.hidden = true;
    if (lastFocus) lastFocus.focus();
  };
  openers.forEach(function (b) { b.addEventListener("click", open); });
  if (closeBtn) closeBtn.addEventListener("click", close);
  panel.addEventListener("click", function (e) { if (e.target === panel) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });

  var csv = document.getElementById("ordersCsv");
  if (csv) csv.addEventListener("click", function () {
    var arr = loadOrders();
    if (!arr.length) return;
    download("job-terminator-license-requests.csv", ordersToCsv(arr), "text/csv;charset=utf-8");
  });
  var json = document.getElementById("ordersJson");
  if (json) json.addEventListener("click", function () {
    var arr = loadOrders();
    if (!arr.length) return;
    download("job-terminator-license-requests.json", JSON.stringify(arr, null, 2), "application/json");
  });
  var clear = document.getElementById("ordersClear");
  if (clear) clear.addEventListener("click", function () {
    if (!loadOrders().length) return;
    if (window.confirm(t("orders.confirmClear"))) saveOrders([]);
  });
}

/* ---------- license request form ---------- */
function initForm() {
  var f = document.getElementById("licenseForm");
  if (!f) return;
  var status = document.getElementById("formStatus");
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var MID = /^[0-9A-Fa-f ]{8,32}$/;
  var rules = {
    name: function (v) { return v.trim().length >= 2; },
    email: function (v) { return EMAIL.test(v.trim()); },
    mid: function (v) { return MID.test(v.trim()); }
  };
  var fieldOf = function (input) { return input.closest(".field"); };
  var setState = function (input, ok) {
    var box = fieldOf(input);
    if (box) box.classList.toggle("has-error", !ok);
    input.setAttribute("aria-invalid", ok ? "false" : "true");
  };
  Object.keys(rules).forEach(function (n) {
    var input = f.elements[n];
    if (!input) return;
    input.addEventListener("blur", function () { setState(input, rules[n](input.value)); });
    input.addEventListener("input", function () {
      var box = fieldOf(input);
      if (box && box.classList.contains("has-error") && rules[n](input.value)) setState(input, true);
    });
  });

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(rules).forEach(function (n) {
      var input = f.elements[n];
      if (!input) return;
      var ok = rules[n](input.value);
      setState(input, ok);
      if (!ok && !firstBad) firstBad = input;
    });
    if (firstBad) {
      if (status) { status.textContent = t("form.err.fix"); status.classList.add("is-error"); }
      firstBad.focus();
      return;
    }
    if (status) { status.textContent = ""; status.classList.remove("is-error"); }

    var d = new FormData(f);
    var rec = {
      id: "req-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
      ts: new Date().toISOString(),
      lang: LANG,
      name: String(d.get("name") || "").trim(),
      email: String(d.get("email") || "").trim(),
      mid: String(d.get("mid") || "").trim().toUpperCase(),
      notes: String(d.get("notes") || "").trim(),
      ua: (navigator.userAgent || "").slice(0, 180)
    };
    var arr = loadOrders();
    arr.push(rec);
    saveOrders(arr);

    var text =
      t("form.fName") + ": " + rec.name +
      "\n" + t("form.fEmail") + ": " + rec.email +
      "\n" + t("form.fMid") + ": " + rec.mid +
      "\n" + t("form.fNotes") + ": " + (rec.notes || "-");

    if (status) status.textContent = t("form.stored");

    if (SELLER_EMAIL && SELLER_EMAIL.indexOf("example.com") === -1) {
      var subject = encodeURIComponent(t("form.mailSubject") + rec.mid);
      window.location.href = "mailto:" + SELLER_EMAIL + "?subject=" + subject + "&body=" + encodeURIComponent(text + "\n");
    } else {
      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t("form.waIntro") + text), "_blank", "noopener");
    }
  });
}

/* ---------- footer year ---------- */
function initYear() {
  var y = document.getElementById("year");
  if (y) y.textContent = formatNumber(new Date().getFullYear());
}

initLang();
initTheme();
initNav();
initSpy();
initReveal();
initLedger();
initForm();
initOrders();
initYear();
