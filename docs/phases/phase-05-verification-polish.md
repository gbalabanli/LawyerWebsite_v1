# Phase 05: Verification & Polish

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-10
- Duration Target: 1 session
- Related Master Plan: [../master_plan.md](../master_plan.md)

## Objective
Tüm fazların çıktılarını doğrulamak, kalan meta/SEO iyileştirmelerini yapmak, Google Search Console'a hazır hale getirmek.

## Entry Criteria
- Phase 01–04 tamamlanmış
- Tüm sayfalar build geçiyor

## In Scope
- **Sitemap doğrulama**: Tüm yeni sayfalar (`/hizmetler/*`, `/blog/*` dahil) sitemap'te var
- **robots.txt kontrolü**: Yeni route'lar engellenmemiş
- **Meta audit**:
  - Her sayfada unique `<title>` var mı?
  - Her sayfada unique `<meta name="description">` var mı? (140–170 karakter)
  - Eksik/boş meta varsa düzelt
- **Open Graph audit**:
  - `og:title`, `og:description`, `og:url`, `og:type` her sayfada var
  - Practice area sayfalarına `og:type="website"` (default)
- **Hreflang audit**: Tüm sayfalarda `alternate` linki mevcut
- **Canonical audit**: Her sayfada self-referencing canonical var
- **İç link audit**: Kırık link var mı? (örn. `withBase()` unutulmuş mu?)
- **Console log / build warning kontrolü**: Temiz build
- **Schema validation** (Google Rich Results Test ile manuel veya offline)

## Out Of Scope
- Yeni özellik ekleme
- İçerik yazma
- Tasarım değişikliği

## Dependencies
- **Phase 01–04** — tüm çıktıların tamamlanmış olması gerekir

## Deliverables
- Audit raporu (maddeler halinde)
- Düzeltilmiş meta/OG eksiklikleri
- Güncellenmiş sitemap (Astro otomatik üretir)
- `npm run build` — hata/warning-free

## Acceptance Criteria
- `npm run build` 0 hata, 0 warning
- Her sayfada: unique title, unique description, canonical, hreflang, OG meta
- Schema tipleri doğrulanmış (legal-service, article, faqpage, breadcrumblist, person)
- Sitemap'te tüm yeni sayfalar mevcut
- robots.txt tüm sayfalara izin veriyor

## Exit Criteria
- Tüm maddeler yeşil
- GitHub'a push edilmeye hazır
- Google Search Console'a yeni sitemap gönderilebilir

## Master Plan Sync Notes
- Faz tamamlanınca master_plan'de Phase 05 → Completed, M5 kaydedilir
- Overall Status → Completed
