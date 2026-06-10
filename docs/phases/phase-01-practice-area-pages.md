# Phase 01: Practice Area Detail Pages

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-10
- Duration Target: 2–3 sessions
- Related Master Plan: [../master_plan.md](../master_plan.md)

## Objective
9 adet hizmet alanı detay sayfası oluştur (`/hizmetler/{slug}`). Her sayfa en az 800 kelime benzersiz içerik, h2/h3 alt başlıkları, FAQ bölümü ve blog yazılarına link içerir.

## Entry Criteria
- `npm run build` mevcut haliyle geçiyor
- Service area listesi ve tag'leri `src/pages/index.astro` içinde tanımlı
- Blog yazıları tag'lerle etiketlenmiş

## In Scope
- `src/pages/hizmetler/` dizini ve 9 `.astro` sayfa:
  - `aile-hukuku.astro`
  - `miras-hukuku.astro`
  - `sirketler-hukuku.astro`
  - `fikri-mulkiyet.astro`
  - `is-hukuku.astro`
  - `gayrimenkul.astro`
  - `ticaret-hukuku.astro`
  - `icra-tahsilat.astro`
  - `espor.astro`
- Her sayfada: Hero (başlık + açıklama), detay bölümü (h2/h3), avantajlar, FAQ, CTA (WhatsApp help desk)
- Her sayfadan ilgili blog tag'ine link (`/blog?tag={tag}`)
- Tüm sayfalar `BaseLayout` kullanır, benzersiz title/description
- `npm run build` geçer

## Out Of Scope
- Breadcrumb (Phase 02)
- Header/footer güncellemeleri (Phase 02)
- Blog içi cross-link güncellemeleri (Phase 03)
- FAQPage schema (Phase 04)
- İngilizce versiyonları (ayrı plan)

## Dependencies
- Hiçbiri (bağımsız faz)

## Deliverables
- 9 yeni `.astro` sayfa dosyası
- Her sayfa için unique `<title>` ve `<meta name="description">`
- Her sayfada h2/h3 yapısı, FAQ, CTA, blog linki

## Acceptance Criteria
- `npm run build` 65+ page ile geçer
- `/hizmetler/aile-hukuku` gibi URL'ler 200 döner
- Her sayfa ≥ 800 kelime (HTML çıktıda)
- Her sayfada en az 1 FAQ sorusu ve 1 blog linki bulunur
- Schema `LegalService` base layout'tan tüm sayfalarda çalışır

## Exit Criteria
- Phase 01 tamamlandı bildirimi → master_plan güncellenir
- Phase 02 (Navigation) başlayabilir

## Master Plan Sync Notes
- Faz tamamlanınca `master_plan.md`'de Phase 01 Status → Completed
- Milestone M1 kaydedilir
