# Requirements Manifest — Editorial 2026 theme port

Goal: apply `prototypes/editorial-2026` visual language to the Astro site as a new
template, with **zero changes to text content** (no page copy, i18n, or Markdown edits).

Status: **COMPLETE** — 2026-11-25. Mode: full CSS-only look, self-hosted fonts, light
theme only, H1 fix + OG/favicon refresh included.

## Requirements

- [x] REQ-01 — `TemplateName` extended with `'editorial-2026'`.
  Note: `src/types/site.ts`, single-line union change; no other consumer required edits.
- [x] REQ-02 — `BaseLayout.astro` editorial import branch (`fonts.css` static, `tokens.css` + `layout.css` conditional).
  Note: `fonts.css` is a **static** import because Astro/Vite drops `url()` font assets from dynamically imported CSS (root cause of the initial 404s). Classic/modern branches unchanged.
- [x] REQ-03 — `src/templates/editorial-2026/tokens.css` (47 vars, light only).
  Contrast: ink/paper 14.80, muted 5.48, olive 5.44, cream/olive 5.83, border 3.01; card border 3.23; input border 3.53.
- [x] REQ-04 — Self-hosted fonts: Inter Tight variable (latin + latin-ext) + IBM Plex Mono 400/500 (4 files); 6 files, 190,980 B.
  Note: Inter Tight 400/600 gstatic files were byte-identical; collapsed to `font-weight: 400 600`, saving 131.5 KB. `fvar` axis verified.
- [x] REQ-05 — `layout.css` core (1,821 lines): 1440 container, unboxed hero, two-column section headings, flat hairline cards, mono nav, olive CTA, light footer, breadcrumb/lang/help desk/404, focus, reduced motion, print.
- [x] REQ-06 — Page-specific CSS: numbered blog rows (CSS counters), sticky TOC + drop cap + h2 hairlines, numbered service cards, editorial FAQ/HowTo, contact; card slot icons moved to top (`order:-1`), article block centered (`max-width:64rem`).
- [x] REQ-07 — Responsive 320/390/768/1024/1440: `scrollWidth - clientWidth = 0` on all audited routes; TOC static on mobile; nav scrolls; lang switcher beside brand at ≤719px.
- [x] REQ-08 — H1 fix: `Section.astro` `headingLevel` prop + conditional empty-heading suppression; `h1` on blog/services indexes (TR+EN). Blog/service card titles moved `h3 → h2`, `base.css` selectors broadened to `:is(h1,h2)` / `:is(h2,h3)` to keep rollback parity.
- [x] REQ-09 — Assets: `og-editorial.jpg` 1200×630 (89 KB), favicon.svg/.ico/apple-touch-icon recolored; `siteConfig.seo.ogImage` updated.
- [x] REQ-10 — `siteConfig.template = 'editorial-2026'`; classic-legal and modern-minimal kept for rollback.
- [x] REQ-11 — Content guard: `git diff -- src/content src/i18n public/llms.txt` is **empty**. Only the 4 index pages changed (one prop line each), plus element-name/CSS changes.
- [x] REQ-12 — QA gate passed (see log below).

## Verification log

Build
- `npm run build` → 140 pages, exit 0, no warnings.
- `npm run verify:seo` → **SEO verification passed** (0 bad canonical/og/hreflang/links, 0 broken links, 0 canonical missing from sitemap).
- `BASE_PATH=/LawyerWebsite_v1 npm run build` → all six font URLs prefixed `/LawyerWebsite_v1/_astro/...`; `url(/_astro/` absolute leaks = 0.
- Structural audit of 140 built HTML files:
  - heading-level jumps: **0**
  - duplicate IDs: **0**
  - images missing `alt`: **0**
  - empty headings: **0**
  - `h1` per page: 1 on all real pages; only exception is `dist/en/services/espor/index.html`, a `noindex` meta-refresh redirect stub excluded from the sitemap (pre-existing).

Browser (Playwright MCP, Chromium, local static server 127.0.0.1:8791)
- Routes: `/`, `/blog/`, one blog post, `/hizmetler/`, `/hizmetler/gayrimenkul/`, `/hakkimda/`, `/iletisim/`, `/en/`, `/en/blog/`, `/404.html`.
- Console errors after final navigation: **0**.
- Fonts: 6 requests, all 200/304, correct latin/latin-ext subsets.
- Blog filter: `kira` → 5 of 59 rows visible.
- Help desk: opens 420px panel, input border 3.53:1, close opacity 0.75.
- Sticky TOC: `position: sticky`, top 100px below 77px header.
- Article block: 1024px wide, centered (200.5 → 1224.5 in 1425 viewport).
- No horizontal overflow at 320, 390, 768, 1440.

Screenshots (proof): `.screenshots/editorial/` — `final-*` and `check-*` files.

## Known notes / follow-ups (not blockers)

- `astro.config.mjs` was already modified before this work (legacy sitemap redirect filter); untouched here.
- `build.inlineStylesheets: 'always'` inlines ~38 KB of template CSS into every page. Switching to `'auto'` would externalize and cache it; left as-is because it is a site-wide pre-existing config decision.
- `favicon.ico` is a single 32px PNG-in-ICO; adequate for modern browsers.
- `.screenshots/` is untracked proof output and can be deleted or gitignored.
- `en/services/espor` legacy stub has no H1 by design (noindex redirect).

---

# Round 2 — Landing corrections (approved 2026-11-25)

Status: **COMPLETE** — all six requirements verified.

Trigger: user reviewed `localhost:4321` and reported changed homepage copy, missing
sticky WhatsApp, missing TR/EN switch, oversized practice-area cards. Root cause of
the "changed copy" report: a leftover `python -m http.server 4321` process was serving
`prototypes/editorial-2026/`, not the Astro app. The release copy was never modified.
The four UX requests below are confirmed and remain in scope.

## Requirements

- [x] REQ-13 — Test environment: stale Python prototype server stopped; dev server bound to `127.0.0.1:4321` and verified serving the Astro app (H1 = release copy).
- [x] REQ-14 — Landing parity verified: classic-legal build vs editorial build, `<main>` text (5693 chars), 12 links and 16 headings byte-identical. Only deviation is the deliberate `order:-1` slot-icon placement on trust cards.
- [x] REQ-15 — Sticky WhatsApp FAB: fixed bottom-right, 56px target, direct `wa.me` with prefilled TR/EN intro, WhatsApp green + ink (9.38:1), print/reduced-motion safe; help-desk launcher hidden, panel still opens from hero/CTA/footer triggers and stacks above the FAB (z-index 50).
- [x] REQ-16 — TR/EN segmented control: bordered 88×42 control (40×36 cells), olive/cream active state (5.83:1), mobile beside brand, no markup change. TR↔EN navigation verified both ways.
- [x] REQ-17 — Practice cards compacted: 302px → 244px (−19%), section 1091px → 892px; 3 cols ≥1100, 2 cols 720–1099, 1 col <720; no truncation (210px proved content-bound at 4-line descriptions).
- [x] REQ-18 — QA gate passed: build 140 pages exit 0, verify:seo PASS, structural audit clean, 1440/1024/768/390/320 zero overflow, zero console errors.

## DAG

| Worker | Requirements | Owned files |
|---|---|---|
| F | REQ-15 (markup) | `src/layouts/BaseLayout.astro`, `src/components/Icon.astro` |
| G | REQ-15 (visual), REQ-16, REQ-17 | `src/templates/editorial-2026/layout.css` |
| Foreman | REQ-13 (done), REQ-14, REQ-18 | verification only |

F and G are file-disjoint and run in parallel. Foreman verifies after both report.

## Verification log (round 2)

Build / SEO
- `npm run build` → 140 pages, exit 0, no warnings, 6 woff2 emitted.
- `npm run verify:seo` → **passed** (0 bad canonical/og/hreflang/links, sitemap clean).
- Structural audit over 140 HTML files: 0 heading-level jumps, 0 duplicate IDs, 0 images without alt, 0 empty headings. Only `en/services/espor` (noindex redirect stub) has no H1, pre-existing.

Landing parity (REQ-14)
- Built the same source with `template: 'classic-legal'` into `dist-classic`, compared `<main>` against the editorial `dist`:
  - text 5693 / 5693 chars → identical
  - 12/12 links identical, 16/16 headings identical
  - same counts: 3 sections, 9 service cards, 9 FAQ items, 1 h1, 4 h2, 11 h3, 3 buttons
- `dist-classic` deleted after the check; `siteConfig.template` restored to `editorial-2026`.

Cards (REQ-17)
- 1440px: card 302 → **244px**, services section 1091 → **892px**, grid gap 12px, 3×3.
- 1024/768: 2 per row (5 rows), heights 217 / 260.
- 390/320: 1 per row, heights 238–260, no clipped text.

WhatsApp FAB (REQ-15)
- 1440: 131×56 pill at (1278, 828), `position: fixed`, 16px inset, label `WHATSAPP`.
- ≤600px: 56×56 circle, label hidden; 320px inset 16px, no overflow.
- href verified TR `...text=Merhaba%2C%20bir%20hukuki%20sorum%20var.` and EN `...text=Hello%2C%20I%20have%20a%20legal%20question.`; `target=_blank`, `rel=noopener noreferrer`, localized aria-label.
- Contrast: ink `#0b141a` on `#25d366` = **9.38:1** (hover #1ebe5a = 7.59:1).
- Help-desk panel opens over the FAB (`.help-desk` z-index 50 > FAB 40); Escape closes; old launcher `display:none` on every route.
- `@media print` hides the FAB; `prefers-reduced-motion` removes its transform/transition.

Language switch (REQ-16)
- 88×42 segmented control, 40×36 cells, active olive/cream (5.83:1), inactive 5.48:1, border 3.01:1.
- TR → EN (`/` → `/en/`) and EN → TR verified; active state follows the page language.

Responsive / console (REQ-18)
- 1440: overflow 0; 1024/768/320/390: overflow 0.
- Mobile audit of `/`, `/blog/`, blog post, `/hizmetler/`, `/hakkimda/`, `/iletisim/`, `/en/`, `/404.html`: FAB 56×56 fixed, launcher hidden, overflow 0.
- Console errors: **0**.
- Content guard: `git diff -- src/content src/i18n public/llms.txt` empty.

Screenshots: `.screenshots/editorial/r2-*.png` (home 1440/390, services grid, header 1440/390, help desk open).

Note: the stale prototype Python server was stopped; `localhost:4321` now serves the Astro app. A browser that still shows the prototype needs a hard refresh (Ctrl+Shift+R) because it cached the old response.

---

# Round 3 — Header: prototype wordmark + mobile hamburger (approved 2026-11-25)

User request: restore the prototype's two-line logo lockup and the mobile hamburger menu.
No WhatsApp CTA inside the menu. When the hamburger appears (≤719px), the TR/EN switch
moves out of the header and into the menu list.

## Requirements

- [x] REQ-19 — Brand lockup shipped: `Balabanlı` / `HUKUK BÜROSU` (EN `Balabanli` / `LAW FIRM`), 16px/600 + 10px mono sub, anchor aria-label keeps the full name.
- [x] REQ-20 — Mobile hamburger shipped at ≤719px: 40×40 hairline button → X, full-screen paper panel, 5 numbered links, TR/EN segmented control as the last row, scroll lock, Escape, focus first link / return to button, `inert` + `aria-expanded`, resize close, print/reduced-motion. Fixed: opening needed `visibility` to flip immediately (transition override) and focus moved into `requestAnimationFrame`, otherwise the first link could not be focused.
- [x] REQ-21 — QA passed: build 140 pages, `verify:seo` PASS, audit clean, 1440/768/390/320 zero overflow, console 0 errors, desktop header unchanged, FAB unaffected.

## Verification log (round 3)

- Build/SEO: 140 pages, exit 0; `verify:seo` passed; structural audit 0 heading jumps / 0 duplicate IDs / 0 missing alt.
- Brand: desktop `Balabanlı | HUKUK BÜROSU` (16px + 10px mono), EN `Balabanli | LAW FIRM`.
- Breakpoints: 1440/768 → menu button `none`, nav `flex`, header TR/EN visible; 390/320 → menu `flex`, nav `none`, header TR/EN `none`, menu row carries TR/EN.
- Menu: opens with `aria-expanded=true`, panel inert removed, body overflow hidden, focus lands on “Ana Sayfa 01”; Escape closes, focus returns to `.menu-btn`; EN menu shows `Home/About Me/Practice Areas/Contact Me/Blog` and `TR` link `/`.
- Routes audited at 1440/390/320 (`/`, `/blog/`, post, `/hizmetler/`, `/hakkimda/`, `/iletisim/`, `/en/`, `/404.html`): overflow 0, exactly one H1, console 0 errors.

---

# Round 4 — Brand-exact WhatsApp button (approved 2026-11-25)

- [x] REQ-22 — WhatsApp FAB uses the official WhatsApp glyph (Simple Icons path, filled) and the brand wordmark `WhatsApp` in Inter Tight 600, both **white on #25d366** (hover #1da851), border ink, 56px pill / 56px circle mobile.
  Note: white on #25d366 is ~1.9:1 (brand-mandated); the previous ink-on-green AA variant is a two-line revert if AA becomes mandatory.
- [x] REQ-23 — Final QA: build + `verify:seo` + audit + AI/LLM signal suite (JSON-LD, canonical, OG, hreflang, sitemap, robots AI agents, llms.txt links) all pass; version bumped to 0.1.5.

## Verification log (round 4)

- Icon: official glyph path, `svg.getBBox()` 24×24, fill `currentColor` → white.
- FAB computed: color `#fff`, background `#25d366`, font `Inter Tight` 13px/600, no uppercase transform, label `WhatsApp`, 133×56 desktop, 56×56 ≤600px.
- AI/SEO signals: 140 pages, 546 JSON-LD blocks, 0 parse/required-field errors; LegalService 139, Article 103, FAQPage 126, HowTo 37 (4 empty howTo frontmatter arrays now correctly omit the node), BreadcrumbList 135.
- Canonical 140/140 with trailing slash; og:image 139/140 (the one exception is the noindex redirect stub); x-default 139; sitemap 137 URLs without 404/stub; robots.txt lists GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Applebot-Extended + sitemap; llms.txt 129 links, 0 missing from build.
- Content guard: `git diff -- src/content src/i18n public/llms.txt` empty.

---

# Round 6 — TOC containment + mobile language row (approved 2026-11-25)

- [x] REQ-24 — Sticky TOC is confined to the article body: `<aside class="toc">` is wrapped in `.toc-rail`, which is the grid item in column 1 and stretches to the content row. The sticky aside now stops at the end of the body instead of overlapping the full-width links/FAQ/HowTo sections.
  - Desktop 1440: rail height 2183 = content height; at scroll 2400 the TOC is already moving out (top -30), no intersection with `.post-links`, `.post-faq`, `.post-howto`, `.cta-box`.
  - ≤900: rail + TOC become full-width static above the content (335px wide at 390), no overflow.
- [x] REQ-25 — Mobile menu TR/EN row: the inactive cell was baseline-aligned by the nav-row rule, so its label sat 16px higher than the active cell. Both cells now use `inline-flex` + `align-items:center` + identical mono/uppercase metrics; text tops are equal (425/425 at 390px).
- [x] REQ-26 — QA: build 140 pages, `verify:seo` PASS, structural audit clean, screenshots `r6-toc-stop-1440.png`, `r6-toc-sticky-1440.png`, `r6-menu-lang-390.png`.

---

# Round 7 — Gayrimenkul içerik kümesi (approved 2026-11-25)

Goal: 5 comprehensive Turkish blog posts (1.300–1.700 words each) on real-estate law,
with FAQ/HowTo frontmatter, internal links and `gayrimenkul` tagging, then llms.txt + QA.

## Requirements

- [x] REQ-27 — `kentsel-donusum-kira-yardimi-2026.md` — 1.676 kelime, 12 H2, 5 SSS, 4 adımlı HowTo, 2026 tutar tablosu, 3 link.
- [x] REQ-28 — `kentsel-donusum-kat-malikleri-karari-pay-satisi.md` — 1.459 kelime, 11 H2, 5 SSS, 4 adımlı HowTo, nisap tablosu, 3 link.
- [x] REQ-29 — `kat-karsiligi-insaat-sozlesmesi-10-madde.md` — 1.493 kelime, 11 H2, 5 SSS, 5 adımlı HowTo, 10 maddelik liste + ödeme/tapu tablosu, 3 link.
- [x] REQ-30 — `muteahhit-gecikme-tazminati-fesih.md` — 1.463 kelime, 9 H2, 5 SSS, 5 adımlı HowTo, 3 link.
- [x] REQ-31 — `guvenli-odeme-sistemi-tapu-2026.md` — 1.719 kelime, 15 H2, 5 SSS, 5 adımlı HowTo, “kim ne yapar” tablosu, 2 link.
- [x] REQ-32 — `public/llms.txt`: 5 yeni satır alfabetik olarak eklendi; mevcut satırlar değişmedi (`git diff` 5 insertions).
- [x] REQ-33 — QA tamam (aşağıdaki kayıt).

## Verification log (round 7)

Coverage (`.logs/coverage.cjs`)
- 5/5 files: 1.459–1.719 kelime, description 143–155, 5 SSS, 3/3/3/3/2 frontmatter link, `gayrimenkul` tag’i, CTA + bilgilendirme cümlesi, `\uXXXX` yok. **0 hata.**
- HowTo adları gövdede H2 olarak birebir; “Nama Ifa” yazımı “Nama İfa” olarak düzeltildi.

Build / SEO
- `npm run build` → 145 sayfa, exit 0.
- `npm run verify:seo` → PASS (sitemap 142 URL, yeni 5 yazı dahil; canonical/hreflang/link temiz).
- Structural audit: 0 başlık atlaması, 0 duplicate ID, 0 eksik alt (tek istisna noindex `en/services/espor` stub).

AI / schema signals
- 571 JSON-LD bloğu, 0 hata: Article 108 (+5), FAQPage 131 (+5), HowTo 42 (+5), LegalService 144, BreadcrumbList 140.
- Her yeni sayfada Article + FAQPage + HowTo, 1 H1, trailing-slash canonical, description 143–155; kırık iç link 0.
- `llms.txt`: 134 yol, 0 eksik (129 → 134).

Rendering
- Yeni yazıda TOC rail + sticky, 5 SSS, 4 HowTo adımı, tablo; 1440 ve 390’da yatay taşma 0, konsol 0 hata.
- Tablo başlıkları için `th { white-space: normal }` yapıldı (layout.css): masaüstünde tablo 704/704 px sığıyor, mobilde 369/335 px kendi içinde kayıyor; sayfa taşmıyor. 4 tablolu yazının tamamı doğrulandı.

Screenshots: `.screenshots/editorial/r7-post-top-1440.png`, `r7-post-table-fixed-1440.png`, `r7-post-full-390.png`.

**Yayın (v0.1.6):** onay sonrası yayınlandı.

- Commit: `c1737dd` — "feat(content): add 5 gayrimenkul law guides and fix table headers" (9 dosya, 903 ekleme).
- Tag: `v0.1.6` (annotated). `v0.1.5` taşınmadı; geçmiş sürüm korunuyor.
- Push: `main` 6d803b1..c1737dd + yeni tag.
- Deploy: run [45674610404](https://github.com/gbalabanli/LawyerWebsite_v1/actions/runs/45674610404) — success; gh-pages head `fc59638`, Pages build `built`.
- Canlı doğrulama (https://bariscembalabanli.av.tr): 5/5 URL 200; her sayfada 1 H1, 5 SSS, HowTo adımları, Article + FAQPage + HowTo + LegalService + BreadcrumbList; trailing-slash canonical; description 143–155; sitemap ve llms.txt içinde 5/5.
- Footer sürümü `v0.1.6`; WhatsApp linki mevcut.
- Playwright canlı kontrol (1440/390): TOC rail, SSS, HowTo, tablo; yatay taşma 0, konsol 0 hata.
- İlk dakikadaki 404'ler CDN önbellek yayılımıydı; tekrar denemede 200.

**Not:** 2026 kira yardımı tutarları ve %90 inşaat seviyesi uygulaması için metinlerde teyit uyarısı var; yayın sonrası resmî kaynak kontrolü önerilir.
