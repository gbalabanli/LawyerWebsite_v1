# Balabanlı Hukuk Bürosu — SEO İyileştirme Master Planı

## Planning Metadata
- Last Updated: 2026-06-10
- Planning Horizon: Q2–Q3 2026
- Overall Status: Phase 01 Complete, Phase 02 Ready

## Project Goal
Sitenin iç link yapısını ve SEO altyapısını güçlendirerek Google'da hizmet alanı bazlı long-tail anahtar kelimelerde görünürlüğü artırmak. Mevcut 4 sayfalık rota seti, practice area detay sayfalarıyla genişletilecek, breadcrumb navigasyonu ve iki yönlü iç link ağı kurulacak, schema markup çeşitlendirilecek.

## Current Status Snapshot
- **Tamamlanmış:** Phase 01 (9 practice area detay sayfası + /hizmetler index), 4 ana sayfa + blog sistemi (40+ yazı), 9 service area kartı (homepage), Icon.astro, BaseLayout schema (LegalService), Article schema (blog post), hreflang, canonical, sitemap
- **Eksik:** breadcrumb, FAQPage/Person/BreadcrumbList schema, blog ↔ practice area çapraz linkleri, header/footer'daki hizmet navigasyonu

## Success Criteria
- `npm run build` sorunsuz çalışır (56+ page)
- Her practice area'nın kendi URL'si, 800+ kelimelik içeriği ve blog cross-link'i vardır
- Breadcrumb tüm sayfalarda görünür ve `BreadcrumbList` schema ile işaretlenmiştir
- FAQ bölümleri `FAQPage` schema ile işaretlenmiştir
- Blog yazılarında en az 2 iç link (diğer blog yazısı veya practice area sayfası) bulunur
- Google Search Console'da yeni sayfalar indexlenir, crawl hata oranı %0'dır

## Scope Summary

### In Scope
- 9 adet practice area detay sayfası (`src/pages/hizmetler/*.astro`)
- Breadcrumb komponenti (`src/components/Breadcrumb.astro`) + schema
- Header'a hizmet dropdown menüsü, footer'a hizmet link sütunu
- Blog yazılarına içerik içi linkler ve "İlgili Hizmetler" kartı
- FAQPage schema (homepage FAQ + blog post FAQ)
- Person schema (hakkimda sayfası)
- Sitemap/metadata audit

### Out of Scope
- Yeni blog yazısı üretimi (mevcut içerik stratejisi devam eder)
- Görsel/içerik yenileme (mevcut görseller kullanılır, yeni OG image tasarımı)
- Google Business Profile / yerel SEO çalışmaları
- Backlink / PR çalışmaları
- Performans optimizasyonu (Core Web Vitals)

## Assumptions And Open Questions
- `Assumption:` Tüm practice area sayfaları için yeterli içerik mevcut blog yazılarından ve hukuki bilgiden türetilebilir
- `Assumption:` Breadcrumb base path-aware çalışır (GitHub Pages altında sorunsuz)
- `Open question:` Header dropdown menü mobilde nasıl davranacak? (accordion vs hamburger altı)

## Delivery Strategy
- **Phase 01 (Foundation):** Practice area sayfaları — diğer tüm fazların bağımlı olduğu temel içerik sayfaları
- **Phase 02 (Navigation):** Breadcrumb + header/footer linkleri — Phase 01 sayfalarına erişim sağlar
- **Phase 03 (Links):** Blog ↔ Practice Area çapraz link ağı — iç link gücünü kurar
- **Phase 04 (Schema):** FAQPage, Person, BreadcrumbList schema — SERP zenginleştirme
- **Phase 05 (Polish):** Doğrulama ve ince ayarlar — kalite kapısı

## Phase Index

| Phase | Status | Goal | Depends On | Document |
| --- | --- | --- | --- | --- |
| Phase 01 | Completed | 9 practice area detay sayfası oluştur | None | [phase-01-practice-area-pages.md](phases/phase-01-practice-area-pages.md) |
| Phase 02 | Planned | Breadcrumb + header/footer navigasyon | Phase 01 | [phase-02-navigation-breadcrumbs.md](phases/phase-02-navigation-breadcrumbs.md) |
| Phase 03 | Planned | Blog ↔ Practice Area cross-link ağı | Phase 01, Phase 02 | [phase-03-internal-link-network.md](phases/phase-03-internal-link-network.md) |
| Phase 04 | Planned | FAQPage, Person, BreadcrumbList schema | Phase 02 | [phase-04-schema-structured-data.md](phases/phase-04-schema-structured-data.md) |
| Phase 05 | Planned | Audit, doğrulama, meta iyileştirmeleri | Phase 01–04 | [phase-05-verification-polish.md](phases/phase-05-verification-polish.md) |

## Cross-Phase Dependencies
- Phase 02 (Breadcrumb/nav) → Phase 01 (practice area route'larının var olması gerekir)
- Phase 03 (Internal links) → Phase 01 (hedef sayfaların var olması gerekir) + Phase 02 (breadcrumb'un stabil olması)
- Phase 04 (Schema) → Phase 02 (breadcrumb component'inin var olması gerekir for BreadcrumbList)
- Phase 05 (Polish) → tüm önceki fazların tamamlanması gerekir

## Major Milestones
- **M1 — Foundation Complete:** Phase 01 teslimi. 9 yeni sayfa canlı, build geçer.
- **M2 — Navigation Complete:** Phase 02 teslimi. Breadcrumb, header dropdown, footer linkleri canlı.
- **M3 — Mesh Complete:** Phase 03 teslimi. Blog ↔ Practice Area çapraz link ağı kuruldu.
- **M4 — Rich Snippets Complete:** Phase 04 teslimi. Schema markup çeşitlendirildi.
- **M5 — Launch:** Phase 05 teslimi. Tüm sayfalar build geçer, Google Search Console'da hata yok.

## Global Risks And Decisions
- **Risk:** Phase 01 sayfaları içerik kalitesi düşük olursa SEO faydası azalır → Her sayfa en az 800 kelime ve benzersiz içerik
- **Risk:** Breadcrumb GitHub Pages altında base path ile çalışmaz → `withBase()` utility kullanılacak
- **Risk:** Mobil dropdown menü kullanılamaz olursa kullanıcı deneyimi düşer → CSS-only dropdown veya minimal JS ile çözüm
- **Decision:** Practice area slug'ları Türkçe (ör. `/hizmetler/aile-hukuku`) — SEO ve okunabilirlik için
- **Decision:** Breadcrumb ayrı bir `.astro` component olarak yazılacak — BaseLayout'a eklenebilir

## Change Log
- 2026-06-10: İlk sürüm oluşturuldu. 5 fazlı plan.
