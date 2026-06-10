# Phase 02: Navigation & Breadcrumbs

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-10
- Duration Target: 1–2 sessions
- Related Master Plan: [../master_plan.md](../master_plan.md)

## Objective
Site genelinde breadcrumb navigasyonu eklemek, header'a hizmet alanları dropdown menüsü koymak, footer'a hizmet linkleri sütunu eklemek.

## Entry Criteria
- Phase 01 tamamlanmış: 9 practice area sayfası mevcut
- `src/pages/hizmetler/` dizini ve sayfaları var

## In Scope
- `src/components/Breadcrumb.astro` component'i oluştur
  - `Ana Sayfa > Hizmetler > Aile Hukuku` formatı
  - Base path-aware (`withBase` kullanılır)
  - `aria-label="breadcrumb"`, `aria-current="page"`
- Breadcrumb'ı `BaseLayout.astro`'ya ekle (tüm sayfalarda görünür)
- Header'da "Hizmetler" dropdown menüsü (CSS-only, 9 hizmet linki)
- Footer'da "Hizmet Alanları" sütunu (9 link)
- Mevcut header/footer yapısı bozulmaz, yeni elemanlar eklenir
- `npm run build` geçer

## Out Of Scope
- Blog içi cross-link (Phase 03)
- Schema eklemeleri (Phase 04)
- Mobil dropdown davranış iyileştirmeleri (varsa Phase 05'te)

## Dependencies
- **Phase 01** — breadcrumb ve dropdown linkleri practice area route'larına gider

## Deliverables
- `src/components/Breadcrumb.astro`
- Güncellenmiş `src/layouts/BaseLayout.astro` (breadcrumb + footer sütunu)
- Güncellenmiş header navigasyonu (dropdown menü)
- CSS eklemeleri (dropdown stilleri, breadcrumb stilleri)

## Acceptance Criteria
- Her sayfada breadcrumb görünür, son eleman `aria-current="page"` içerir
- Header'da "Hizmetler" hover/click ile 9 linki gösterir
- Footer'da 9 hizmet link sıralanır
- Breadcrumb base path ile çalışır (GitHub Pages)
- `npm run build` geçer

## Exit Criteria
- Tüm sayfalarda breadcrumb navigasyonu çalışıyor
- Header ve footer hizmet linkleri tam
- Phase 03 (Internal links) başlayabilir

## Master Plan Sync Notes
- Faz tamamlanınca master_plan'de Phase 02 → Completed, M2 kaydedilir
