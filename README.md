# Job Terminator — website (V2)

A refined, international product page for the **Job Terminator** Windows app: one
design system, generous whitespace, a single accent colour, soft elevation, and a
full RTL / LTR language layer that works for **any country**.

Arabic is the default language and the primary audience; English is a full mirror
of every string. Nothing loads from a CDN: fonts, images and scripts are all
local, so the site works from a file, a local server, or any static host.

- **Live files:** this folder (`index.html` at the root)
- **Previous version:** kept untouched at `outputs/jobsbot-editorial/`
  (its own `archive/V0 baseline/` is one generation older still)

---

## 1. Run it

### Live now

- **On this PC:** `http://127.0.0.1:8099` (a preview server is already running on this folder)
- **Public (temporary):** `https://lafayette-breeds-allied-mart.trycloudflare.com` — an HTTPS tunnel to the same folder; it stays up while the tunnel process is running

This folder **is the live site**: the rebuilt version was published in place here. The
previous “printed newspaper” version is archived, untouched, in
`archive/V1 editorial (superseded)/` (and the generation before it in
`archive/V0 baseline/`), so nothing is lost and the change can be rolled back by
copying the archived files back over the root.

**Quickest — open the file**

Double-click `index.html`. Everything works from `file://` except the local
request log, which needs a browser storage origin (use `serve.bat`).

**Proper local preview (recommended)**

```bat
serve.bat
```

Serves on port **8093** on all interfaces:

- this PC — `http://localhost:8093`
- same Wi-Fi — `http://<your-lan-ip>:8093`

`serve.bat` and `serve_hidden.vbs` contain a hard-coded path to a Python
interpreter. If this folder moves, update the path in both files, and `$SiteDir`
in `host_setup.ps1`.

**Permanent hosting (auto-start on logon + firewall rule)**

```bat
host_install.bat     REM run as administrator
```

**Removing permanent hosting** (run in an elevated PowerShell, or delete the file
named below):

1. Delete the startup shortcut
   `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\JobTerminatorSite.lnk`
2. Remove the firewall rule: `netsh advfirewall firewall delete rule name="JobTerminatorSite"`
3. Stop the server: end the `python.exe` process running `http.server 8093`
   (Task Manager, or `Get-CimInstance Win32_Process -Filter "Name='python.exe'"`).

`host_remove.bat` is included but expects a `host_teardown.ps1` next to it; the
three steps above are the same thing done by hand.

---

## 2. File map

| Path | What it is |
|---|---|
| `index.html` | The whole page. One file, no build step. |
| `styles.css` | The design system: tokens, layout, components, responsive, print. |
| `lang.js` | Language dictionaries. Every visible string lives here. |
| `script.js` | Language dropdown, theme, nav, scroll spy, table filter, form, request log. |
| `assets/*.jpg` | Five photographic plates, optimised (~359 KB total). |
| `assets/og-cover.jpg` | 1200×630 social-share cover. |
| `assets/fonts/` | Self-hosted webfonts + `fonts.css`. No Google request. |
| `sitemap.xml`, `robots.txt` | SEO basics for a static host. |
| `404.html` | On-brand not-found page. |
| `.nojekyll` | Tells GitHub Pages to serve the folder as-is. |
| `serve.bat`, `host_*.bat/ps1` | Local preview and permanent hosting scripts. |

---

## 3. Where to change things

### Copy

Every headline, paragraph, button, table row, FAQ answer and caption is a key in
`lang.js`, and the matching element in `index.html` carries
`data-i18n="some.key"`. Change the value in the **`ar`** and **`en`** blocks (and
any other language you add) and it updates in place.

Attribute variants: `data-i18n-html` (value contains markup), `data-i18n-alt`
(image alt text), `data-i18n-aria` (aria-label), `data-i18n-ph` (placeholder),
`data-i18n-title` (title), `data-i18n-content` (meta content).

Machine codes, licence keys and file names are literal, not translated, so they
stay LTR inside the RTL page. **No phone numbers are ever shown as text** — every
contact point is a `wa.me` link only.

### Colours and type

Everything lives in the `:root` block at the top of `styles.css`. The light theme
is a second token set under `html[data-theme="light"]`. Change `--accent` in both
blocks to re-tint the whole page; nothing else hard-codes a colour except the
logo mark.

### Images

Replace the five `.jpg` files in `assets/` keeping the same names:
`hero-plate` is 4:5 portrait, the other four are 3:2 landscape. The stylesheets
set the crop, so a differently-sized photo will still sit correctly.

The current set is the **Automation & speed** plate series (photographic, warm
near-monochrome with a single emerald accent). Captions and alt text are the
`cap.*` keys in `lang.js`.

### Run-log table

Rows are in `index.html` under `<tbody>`; each carries
`data-state="strong|sent|skip"`, which is what the filter buttons match.

### Download link and contact routing

- Download button points at the GitHub release asset:
  `https://github.com/MohameMubark/job-terminator/releases/latest/download/JobTerminatorSetup.exe`
- WhatsApp deep links all use the number `201207516034` (Egypt), written as
  `wa.me` links only — see `WA_NUMBER` in `script.js` and the `wa.me` links in
  `index.html`. To serve another country, change `WA_NUMBER` once in `script.js`
  (all links, including the form's *Request on WhatsApp* and the floating button,
  rebuild from it).

### Canonical URL

`index.html`, `robots.txt` and `sitemap.xml` use the production GitHub Pages
domain `https://mohamemubark.github.io/job-terminator/`.

---

## 4. Adding a language (works for any country)

The header switcher is a **dropdown built automatically** from the `LANGUAGES`
registry in `script.js` — no buttons to add in HTML, no hard-coded list:

1. In `lang.js`, copy the whole `en: { ... }` block, paste it after itself, and
   rename the key to your locale code (e.g. `fr: {`). Translate the values and
   keep the keys exactly as they are.
2. In `script.js`, register it in `LANGUAGES`, e.g.
   ```js
   var LANGUAGES = {
     ar: { name: "العربية", dir: "rtl", locale: "ar-EG-u-nu-latn" },
     en: { name: "English", dir: "ltr", locale: "en-US" },
     fr: { name: "Français", dir: "ltr", locale: "fr-FR" }
   };
   ```
   `name` is shown in the dropdown, `dir` drives the page direction, and
   `locale` localises dates/numbers. That is the whole change.

The dropdown item, deep-linking (`?lang=fr`), RTL/LTR flipping, date and number
formatting all pick the new language up automatically. Right-to-left languages
(other than Arabic) may want a line in the `html[lang="..."]` section of
`styles.css` to adjust the reading font.

---

## 5. Request log (form submissions)

There is no backend. To keep every request traceable anyway, each successful
submission is:

1. **stored locally** in the browser (`localStorage`, key `jobterm-orders`) with a
   generated id, an ISO timestamp, the language, and all field values;
2. **then sent** — to WhatsApp (or email, see below) — so the team records it too;
3. **viewable and exportable** from the *Request log* button under the form (and
   in the footer): the list shows each request with its time, and **Export CSV**
   / **Export JSON** download a file. **Clear log** empties the local list.

Caveat: the local log is per-browser and per-device; it is a safety net, not a
shared database. For a shared inbox, point the form at a serverless form service
(Formspree, Netlify Forms, or a small API) — the form logic is isolated in
`initForm()` in `script.js`. `SELLER_EMAIL` in `script.js` routes requests: while
it stays `seller@example.com` the request is sent to WhatsApp; set a real address
to route by email instead.

---

## 6. Verification performed

- **HTML**: parsed, no unbalanced tags, no duplicate ids.
- **i18n**: all keys used on the page exist in every language block; key sets are
  identical across languages.
- **Assets**: every local `src`/`href` resolves on disk. All 12 resources return
  **HTTP 200** over a live server.
- **CSS**: braces balanced; **0 physical `left`/`right` declarations** remain, so
  the layout is genuinely direction-agnostic.
- **JavaScript**: `node --check` clean on both scripts.
- **Functional (jsdom/DOM, real scripts)**: ar↔en switch flips `lang`/`dir` and
  every string, dates localise, theme toggles, the table filter works, invalid
  submits are blocked, a valid submit is stored with an ISO timestamp and
  rendered in the request log, and the WhatsApp link is built from `WA_NUMBER`.
- **Performance**: five plates re-encoded from **3.45 MB to 0.36 MB** (−90%);
  fonts are subset woff2, self-hosted; primary faces are preloaded.

**Not confirmed here:** pixel-level screenshots. Headless Chrome/Edge cannot
start in this environment (it aborts with a paging-file error), so layout was
verified from the CSS, the resource map, and the DOM tests rather than by
screenshot. Open `serve.bat` and check the four breakpoints (360 / 768 / 1024 /
1440) once in a real browser.

---

## 7. Deployment

The site is static. Push the folder as-is for GitHub Pages (`.nojekyll` is
already there), or point any web root at it. No server-side code, no environment
variables. The canonical domain `https://mohamemubark.github.io/job-terminator/`
is already set in `index.html`, `robots.txt` and `sitemap.xml` — submit
`sitemap.xml` to search consoles after deploying.

Note on languages and SEO: this is a single URL with a client-side switcher, so
the languages share one address and are distinguished by `<html lang>`,
`og:locale`/`og:locale:alternate`, and the `?lang=` deep-link. That suits a
one-page site. If you later split into `/ar/` and `/en/` paths, add
`<link rel="alternate" hreflang>` tags and per-language `loc` entries in
`sitemap.xml`.