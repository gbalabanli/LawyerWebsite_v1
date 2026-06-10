# Phase 04: Schema & Structured Data

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-10
- Duration Target: 1 session
- Related Master Plan: [../master_plan.md](../master_plan.md)

## Objective
Sitedeki schema markup'ı çeşitlendirmek: FAQPage (homepage + blog post FAQ), BreadcrumbList (tüm sayfalar), Person (hakkimda sayfası). Mevcut LegalService ve Article schema korunur.

## Entry Criteria
- Phase 02: Breadcrumb component'i mevcut (BreadcrumbList schema eklenebilir)
- Phase 01: Practice area sayfaları mevcut (her biri FAQ içeriyor)
- BaseLayout'ta LegalService schema mevcut

## In Scope
- **FAQPage schema**: Ana sayfadaki FAQ listesine `FAQPage` JSON-LD ekle
- **FAQPage schema**: Blog yazılarındaki FAQ bölümlerine `FAQPage` JSON-LD ekle (varsa)
- **BreadcrumbList schema**: Breadcrumb.astro component'ine `BreadcrumbList` JSON-LD ekle
- **Person schema**: `hakkimda.astro` sayfasına Av. Barış C. Balabanlı için `Person` JSON-LD ekle
  - `name`, `givenName`, `familyName`, `jobTitle` (Avukat / Attorney)
  - `knowsAbout`: practice area listesi
  - `url`, `email`, `telephone`
- Mevcut `LegalService` ve `Article` schema'larını koru
- `npm run build` geçer

## Out Of Scope
- Yeni sayfa oluşturma
- İç link değişiklikleri
- İngilizce sayfa schema'ları (mevcut Article schema benzeri yaklaşım kullanılır)

## Dependencies
- **Phase 02** — breadcrumb component'i (BreadcrumbList schema için)
- Phase 01'deki FAQ içerikleri kullanılır (yeni içerik yazılmaz)

## Deliverables
- Güncellenmiş `src/pages/index.astro` (FAQPage schema frontmatter'da)
- Güncellenmiş `src/components/Breadcrumb.astro` (BreadcrumbList schema)
- Güncellenmiş `src/pages/hakkimda.astro` (Person schema)
- Opsiyonel: `src/pages/blog/[slug].astro` FAQPage güncellemesi
- Tüm schema'lar `<script type="application/ld+json">` ile HTML'e enjekte edilir

## Acceptance Criteria
- Google Rich Results Test'te FAQ, Breadcrumb, Person, LegalService schema'ları geçer
- Mevcut LegalService ve Article schema bozulmamış
- `npm run build` geçer

## Exit Criteria
- Tüm schema tipleri doğrulanmış
- Google Search Console'da schema hata uyarısı yok
- Phase 05 (Polish) başlayabilir

## Master Plan Sync Notes
- Faz tamamlanınca master_plan'de Phase 04 → Completed, M4 kaydedilir
