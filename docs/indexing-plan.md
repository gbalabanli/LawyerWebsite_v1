# Google Indexing Plan — bariscembalabanli.av.tr

**Issue:** `Discovered – currently not indexed` (82 URLs)
**Generated:** 2026-10-19
**Source:** GSC Coverage Drilldown export `Coverage-Drilldown-2026-10-19`

---

## Context (read once)

- `Discovered – currently not indexed` means Google **knows the URL but has never crawled it** (your export shows `Last crawled = 1970-01-01`).
- There is **no "Validate Fix" button** for this bucket. It clears when Google actually crawls and indexes the pages.
- The canonical bug is fixed and live (commit `cf4aa09`, deployed 2026-10-19). Every canonical now matches the served trailing-slash URL.
- A **validation started 2026-09-25**, i.e. *before* the fix went live. Expect it to fail; if it does, click **Validate Fix** again so it runs against the fixed site. Do not start a new one while it is still running.
- GSC data lags **2–3 days**. Nothing will move today or tomorrow — that is normal.

## How to use this file

1. **Day 0 (once):** GSC → *Sitemaps* → re-submit `sitemap-index.xml`.
2. **Each day:** open GSC → *URL Inspection* → paste the URL → **Test Live URL** → **Request Indexing**.
3. Tick the box. Stop for the day when the button greys out (quota ≈ 10–15/property/day).
4. Never request the same URL twice within ~7 days.

> Tip: open a batch, then use Ctrl/Cmd-click on each URL to open all 10 tabs, and work through them one by one.

---

## Progress tracker

| Day | Batch | URLs | Done |
|-----|-------|------|------|
| 0 | Sitemap resubmitted | 1 action | [ ] |
| 1 | Core + TR service pages | 10 | [ ] |
| 2 | EN services + top commercial TR posts | 10 | [ ] |
| 3 | Family · real estate · employment · enforcement | 11 | [ ] |
| 4 | Debt · notices · corporate | 11 | [ ] |
| 5 | Corporate · IP · inheritance | 11 | [ ] |
| 6 | Inheritance · esports · consumer · general | 10 | [ ] |
| 7 | EN business / corporate / escrow (1) | 9 | [ ] |
| 8 | EN escrow (2) · inheritance · client account · esports | 9 | [ ] |
| — | Skipped (noindex stub) | 1 | — |

**Total: 81 requested + 1 skipped = 82**

---

## Day 0 — Sitemap

- [ ] Re-submit `https://bariscembalabanli.av.tr/sitemap-index.xml` in GSC → *Sitemaps*
- [ ] Confirm status **Success** and **138 URLs discovered**

---

## Day 1 — Core pages + TR service pages (money pages)

- [ ] https://bariscembalabanli.av.tr/hakkimda/
- [ ] https://bariscembalabanli.av.tr/hizmetler/
- [ ] https://bariscembalabanli.av.tr/iletisim/
- [ ] https://bariscembalabanli.av.tr/hizmetler/gayrimenkul/
- [ ] https://bariscembalabanli.av.tr/hizmetler/icra-tahsilat/
- [ ] https://bariscembalabanli.av.tr/hizmetler/is-hukuku/
- [ ] https://bariscembalabanli.av.tr/hizmetler/sirketler-hukuku/
- [ ] https://bariscembalabanli.av.tr/hizmetler/miras-hukuku/
- [ ] https://bariscembalabanli.av.tr/hizmetler/fikri-mulkiyet/
- [ ] https://bariscembalabanli.av.tr/hizmetler/espor/

## Day 2 — EN services + top commercial TR posts

- [ ] https://bariscembalabanli.av.tr/en/services/turkish-citizenship-lawyer/
- [ ] https://bariscembalabanli.av.tr/en/services/gayrimenkul/
- [ ] https://bariscembalabanli.av.tr/en/services/aile-hukuku/
- [ ] https://bariscembalabanli.av.tr/en/services/fikri-mulkiyet/
- [ ] https://bariscembalabanli.av.tr/blog/kira-artis-orani-hesaplama-2026-rehber/
- [ ] https://bariscembalabanli.av.tr/blog/kidem-tazminati-hesaplama-2026-rehber/
- [ ] https://bariscembalabanli.av.tr/blog/icra-takibi-nasil-baslatilir-adim-adim/
- [ ] https://bariscembalabanli.av.tr/blog/icra-takibine-nasil-itiraz-edilir/
- [ ] https://bariscembalabanli.av.tr/blog/velayet-davasi-nasil-acilir-2026/
- [ ] https://bariscembalabanli.av.tr/blog/anlasmali-bosanma-sureci-protokol-2026/

## Day 3 — Family · real estate · employment · enforcement

- [ ] https://bariscembalabanli.av.tr/blog/cekismeli-bosanma-davasi-surec-deliller-2026/
- [ ] https://bariscembalabanli.av.tr/blog/mal-rejimi-tasfiyesi-davasi-nasil-acilir/
- [ ] https://bariscembalabanli.av.tr/blog/kira-tespit-davasi-nasil-acilir-2026/
- [ ] https://bariscembalabanli.av.tr/blog/tahliye-davasi-sebepler-surec/
- [ ] https://bariscembalabanli.av.tr/blog/kiraci-dosyasinda-bulunmasi-gereken-belgeler/
- [ ] https://bariscembalabanli.av.tr/blog/ortakligin-giderilmesi-davasi-izale-i-suyu/
- [ ] https://bariscembalabanli.av.tr/blog/arac-deger-kaybi-davasi-surec-tazminat/
- [ ] https://bariscembalabanli.av.tr/blog/haksiz-isten-cikarilma-dava-sureci/
- [ ] https://bariscembalabanli.av.tr/blog/haciz-islemleri-ve-itiraz-yollari/
- [ ] https://bariscembalabanli.av.tr/blog/itirazin-iptali-davasi-hazirlik/
- [ ] https://bariscembalabanli.av.tr/blog/ihtarname-nasil-cekilir-adim-adim-rehber/

## Day 4 — Debt · notices · corporate

- [ ] https://bariscembalabanli.av.tr/blog/menfi-tespit-davasi-gerekli-belgeler/
- [ ] https://bariscembalabanli.av.tr/blog/odenmemis-fatura-tahsilati-yasal-yollar/
- [ ] https://bariscembalabanli.av.tr/blog/muhtira-ve-protesto-nedir-farklari/
- [ ] https://bariscembalabanli.av.tr/blog/tasarrufun-iptali-davasi-nedir/
- [ ] https://bariscembalabanli.av.tr/blog/sigorta-tahkim-komisyonu-basvurusu/
- [ ] https://bariscembalabanli.av.tr/blog/anonim-sirket-kurulusu-rehber-2026/
- [ ] https://bariscembalabanli.av.tr/blog/limited-sirket-kurulusu-adim-adim-rehber/
- [ ] https://bariscembalabanli.av.tr/blog/limited-sirket-mudur-degisikligi/
- [ ] https://bariscembalabanli.av.tr/blog/limited-sirket-ortaklik-sozlesmesi-maddeler/
- [ ] https://bariscembalabanli.av.tr/blog/sirket-sozlesmesi-degisikligi-prosedur/
- [ ] https://bariscembalabanli.av.tr/blog/sirket-yonetim-kurulu-sorumlulugu/

## Day 5 — Corporate · IP · inheritance

- [ ] https://bariscembalabanli.av.tr/blog/ortaklik-anlasmazliginda-hukuki-cozum-yollari/
- [ ] https://bariscembalabanli.av.tr/blog/fikri-mulkiyet-ayni-sermaye-sirket/
- [ ] https://bariscembalabanli.av.tr/blog/marka-hakki-ihlali-dava-sureci-tazminat/
- [ ] https://bariscembalabanli.av.tr/blog/marka-hukumsuzluk-davasi-iptal-sartlari/
- [ ] https://bariscembalabanli.av.tr/blog/marka-ve-patent-vekilligi-kimler-yapabilir/
- [ ] https://bariscembalabanli.av.tr/blog/e-ticarette-marka-ihlali-korunma-yollari/
- [ ] https://bariscembalabanli.av.tr/blog/uluslararasi-marka-basvurusu-madrid-protokolu/
- [ ] https://bariscembalabanli.av.tr/blog/ticari-sir-koruma-kanun-taslagi-2026/
- [ ] https://bariscembalabanli.av.tr/blog/muris-muvazaasi-davasi-nedir/
- [ ] https://bariscembalabanli.av.tr/blog/tenkis-davasi-nedir-sakli-pay/
- [ ] https://bariscembalabanli.av.tr/blog/vasiyetname-turleri-gecerlilik-sartlari/

## Day 6 — Inheritance · esports · consumer · general

- [ ] https://bariscembalabanli.av.tr/blog/espor-ikramiye-dagitimi-hukuki-haklar/
- [ ] https://bariscembalabanli.av.tr/blog/espor-iscilik-hizmet-sozlesmesi-farki/
- [ ] https://bariscembalabanli.av.tr/blog/espor-sponsorluk-sozlesmesi-nasil-olmali/
- [ ] https://bariscembalabanli.av.tr/blog/espor-sporcu-sozlesmesi-maddeleri/
- [ ] https://bariscembalabanli.av.tr/blog/espor-transfer-sozlesmesi-hukuki-surec/
- [ ] https://bariscembalabanli.av.tr/blog/tuketici-sikayeti-nasil-yapilir-hakem-heyeti/
- [ ] https://bariscembalabanli.av.tr/blog/dava-oncesi-strateji/
- [ ] https://bariscembalabanli.av.tr/blog/borclar-hukuku-nedir-temel-kavramlar/
- [ ] https://bariscembalabanli.av.tr/blog/hukuki-risk-kontrol-listesi/
- [ ] https://bariscembalabanli.av.tr/blog/arabuluculuk-sureci-nedir-nasil-isler/

## Day 7 — EN business / corporate / escrow (part 1)

- [ ] https://bariscembalabanli.av.tr/en/blog/company-formation-cost-required-documents-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/company-formation-lawyer-in-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/company-types-in-turkey-limited-vs-joint-stock/
- [ ] https://bariscembalabanli.av.tr/en/blog/how-foreigners-can-open-company-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-in-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-agreement-turkish-law/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-agent-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-account-turkish-commercial-law/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-real-estate-turkey/

## Day 8 — EN escrow (part 2) · inheritance · client account · esports

- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-off-plan-property-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-m-a-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-costs-tax/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-enforceability/
- [ ] https://bariscembalabanli.av.tr/en/blog/escrow-vs-earnest-money/
- [ ] https://bariscembalabanli.av.tr/en/blog/secure-payment-system-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/inheritance-barrister-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/lawyer-client-account-turkey/
- [ ] https://bariscembalabanli.av.tr/en/blog/lawyer-for-esports-player-rights-contracts/

## Skipped — do not request

- [ ] **SKIP** — `https://bariscembalabanli.av.tr/en/services/espor/` is a `noindex, follow` meta-refresh stub that redirects to `/en/services/esport/`. Requesting indexing here is pointless; the target is already crawlable.

---

## Signal boost (do alongside the batches)

- [ ] Publish a LinkedIn post linking 2–3 Day 1–2 URLs (external discovery signal)
- [ ] Add the site URL to your İstanbul Barosu / legal directory profile
- [ ] Ask one existing client or partner page to link to a service page
- [ ] Refresh 2–3 older posts: add `updated: 2026-10-19` to frontmatter, rebuild, then request those URLs

## Re-check schedule

- [ ] **Day 3–7:** re-Inspect Day 1–2 URLs → look for **"URL is on Google"**
- [ ] **Day 7:** GSC → *Page Indexing* → note the new `Discovered` count
- [ ] **Day 14:** compare against the baseline; check the Sep-25 validation result
- [ ] **Day 28:** `Discovered` should be materially lower; long tail continues
- [ ] **Day 60:** review anything still stuck in `Crawled – currently not indexed` (that's a content/authority signal, not a crawl bug)

## What not to do

- Do **not** re-request the same URL more than once every ~7 days.
- Do **not** start a second validation while the Sep-25 one is still running.
- Do **not** change published slugs — it creates new 404s and redirect chains.
- Do **not** publish thin pages to compensate; it makes `Discovered – not indexed` worse.
- Do **not** judge progress within 24–48 hours; GSC data is 2–3 days behind.

## Done when

- GSC *Page Indexing* → `Discovered – currently not indexed` is at or near **0** for these URLs.
- The priority URLs show **"URL is on Google"** in URL Inspection.
- `site:bariscembalabanli.av.tr` returns the blog and service pages.
