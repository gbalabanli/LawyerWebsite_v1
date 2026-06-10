# Phase 03: Internal Link Network

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-10
- Duration Target: 2–3 sessions
- Related Master Plan: [../master_plan.md](../master_plan.md)

## Objective
Blog yazıları ile practice area sayfaları arasında iki yönlü iç link ağı kurmak. Her blog yazısına "İlgili Hizmetler" kartı eklemek, blog yazıları arasında anlamlı cross-linkler oluşturmak.

## Entry Criteria
- Phase 01: 9 practice area sayfası mevcut
- Phase 02: Breadcrumb + header/footer navigasyonu tam
- Blog yazıları tag'lerle etiketlenmiş

## In Scope
- Blog yazısı detay sayfasına (`src/pages/blog/[slug].astro`) "İlgili Hizmet" kartı ekle
  - Yazının tag'ine göre eşleşen practice area'yı bul
  - Kart: title, kısa açıklama, "Detaylı Bilgi" linki
  - Hiçbir tag eşleşmezse kart gösterilmez
- Blog yazısı body'sine 2–3 iç link ekle (mevcut frontmatter veya manuel)
  - Linkler diğer blog yazılarına veya practice area sayfalarına
  - `withBase()` kullanılır
- Practice area sayfalarındaki blog linkleri genişletilir (Phase 01'de başlanan)
  - Tag bazlı otomatik blog listesi (en son 3 yazı)
  - Veya manuel seçilmiş öne çıkan yazılar
- `npm run build` geçer

## Out Of Scope
- Yeni blog yazısı üretimi
- Breadcrumb veya schema değişiklikleri
- İngilizce sayfalar

## Dependencies
- **Phase 01** — practice area sayfaları (hedef URL'ler)
- **Phase 02** — breadcrumb/navigation stabil (sayfa yapısı oturmuş)

## Deliverables
- Güncellenmiş `src/pages/blog/[slug].astro` (ilgili hizmet kartı)
- Güncellenmiş practice area sayfaları (blog listesi)
- Blog yazılarına eklenen iç linkler
- Opsiyonel: `src/components/RelatedService.astro` component

## Acceptance Criteria
- Her blog yazısında tag'e göre eşleşen practice area kartı gösterilir
- Her blog yazısında en az 2 iç link (başka blog yazısı veya practice area sayfası)
- Practice area sayfalarında en az 3 ilgili blog yazısı linki
- `npm run build` geçer

## Exit Criteria
- Blog ↔ Practice Area iç link ağı kuruldu
- "İlgili Hizmetler" tüm blog yazılarında çalışıyor
- Phase 04 (Schema) başlayabilir

## Master Plan Sync Notes
- Faz tamamlanınca master_plan'de Phase 03 → Completed, M3 kaydedilir
