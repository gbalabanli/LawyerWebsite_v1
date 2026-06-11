# Phase 03: Schema & Author Signals

## Phase Metadata
- Status: Completed
- Last Updated: 2026-06-11
- Duration Target: 2 sessions
- Related Master Plan: [../llm-visibility-master-plan.md](../llm-visibility-master-plan.md)

## Objective
LLM'lerin içerik kalitesine güvenmesini sağlayan zengin schema markup ve author authority sinyalleri eklemek: HowTo schema, zenginleştirilmiş Article author (Person), blog yazılarına FAQPage schema.

## Entry Criteria
- Phase 02 tamamlanmış (blog yazılarında FAQ içerikleri mevcut)
- Blog yazıları güncel H2 başlıklara ve ters piramit ilk paragrafa sahip

## In Scope

### 3.1 — Blog Yazılarına FAQPage Schema
- Her blog yazısının sonuna 3-5 soruluk FAQ bölümü eklenecek
- FAQ içerikleri yazının konusuna göre belirlenecek
- `src/pages/blog/[slug].astro` şablonuna `FAQPage` JSON-LD eklenecek
- FAQ soruları `<details>/<summary>` HTML ile render edilecek (mevcut hizmet sayfası pattern'ine benzer)
- Frontmatter'da yeni `faq` opsiyonel alanı: `z.array(z.object({ q: z.string(), a: z.string() })).optional()`

### 3.2 — Article Schema Author Zenginleştirme
- Mevcut Article schema `author` alanı:
  ```json
  { "@type": "Person", "name": "Av. Barış C. Balabanlı" }
  ```
- Hedef:
  ```json
  {
    "@type": "Person",
    "name": "Av. Barış C. Balabanlı",
    "jobTitle": "Avukat",
    "url": "https://.../hakkimda",
    "sameAs": ["LinkedIn URL (varsa)"],
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "..." },
    "knowsAbout": ["iş hukuku", "ticari hukuk", "miras hukuku", ...]
  }
  ```
- `src/pages/blog/[slug].astro` dosyasında `articleSchema` güncellenecek
- `knowsAbout` listesi `serviceAreas`'dan türetilecek

### 3.3 — HowTo Schema (Prosedürel Yazılar)
- En az 5 prosedürel blog yazısına `HowTo` schema eklenecek:
  1. İcra Takibi Nasıl Başlatılır
  2. İhtarname Nasıl Çekilir
  3. Marka Tescili Süreci
  4. Limited Şirket Kuruluşu
  5. Kira Artış Oranı Hesaplama
- `HowTo` schema yapısı:
  ```json
  {
    "@type": "HowTo",
    "name": "...",
    "step": [
      { "@type": "HowToStep", "name": "...", "text": "..." }
    ]
  }
  ```
- Frontmatter'da yeni `howTo` opsiyonel alanı: `z.array(z.object({ name: z.string(), text: z.string() })).optional()`
- `src/pages/blog/[slug].astro` şablonunda HowTo JSON-LD render edilecek

### 3.4 — Person Schema (hakkimda) Zenginleştirme
- Mevcut `Person` schema'ya eklenecek:
  - `alumniOf`: Üniversite bilgisi
  - `sameAs`: LinkedIn, baro kayıt linki (varsa)
  - `hasOccupation`: `LegalService` ile detaylandırma
- `src/pages/hakkimda.astro` güncellenecek

## Out Of Scope
- Blog yazısı içerik değişikliği (Phase 02 kapsamında)
- Yeni sayfa oluşturma
- Hizmet sayfası schema değişikliği
- English sayfalar

## Dependencies
- **Phase 02** — FAQ içerikleri ve HowTo step içerikleri yazılmış olmalı
- `src/content.config.ts` — yeni frontmatter alanları (`faq`, `howTo`) için schema güncellemesi gerekli

## Deliverables
- Güncellenmiş `src/content.config.ts` (`faq` ve `howTo` alanları eklenecek)
- Güncellenmiş `src/pages/blog/[slug].astro` (FAQ render + HowTo + zengin author schema)
- En az 5 blog yazısında `howTo` frontmatter verisi
- Tüm 45 blog yazısında `faq` frontmatter verisi (3-5 soru)
- Güncellenmiş `src/pages/hakkimda.astro` (zengin Person schema)

## Acceptance Criteria
- Her blog yazısında FAQ bölümü görünür (details/summary)
- Her blog yazısında `FAQPage` JSON-LD mevcut
- En az 5 yazıda `HowTo` JSON-LD mevcut
- Article schema `author` alanı `jobTitle`, `url`, `knowsAbout` içeriyor
- `npm run build` sorunsuz
- JSON-LD çıktıları geçerli JSON formatında

## Exit Criteria
- Tüm schema tipleri Google Rich Results Test'te doğrulanabilir
- Build sorunsuz
- FAQ bölümleri mobilde düzgün görünür

## Risks And Blockers
- **Risk:** 45 yazıya FAQ içeriği üretmek zaman alıcı → LLM desteğiyle hızlı üretim, sonrasında elle kontrol
- **Risk:** `faq` ve `howTo` frontmatter alanları content collection schema'sını kırabilir → Önce `content.config.ts` güncellenecek, sonra veriler eklenecek
- **Open question:** Avukat'ın LinkedIn profili veya baro kayıt linki mevcut mu? (sameAs için)

## Master Plan Sync Notes
- Faz tamamlanınca llm-visibility-master-plan'de Phase 03 → Completed, M3 kaydedilir
