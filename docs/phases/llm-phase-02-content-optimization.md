# Phase 02: Content Optimization

## Phase Metadata
- Status: Planned
- Last Updated: 2026-06-11
- Duration Target: 3-5 sessions (batch'lerle çalışılacak)
- Related Master Plan: [../llm-visibility-master-plan.md](../llm-visibility-master-plan.md)

## Objective
45 TR blog yazısını LLM-friendly formata çevirmek: soru formatında başlıklar, ters piramit ilk paragraflar, 400+ kelime hedefi, kanun madde referansları. Bu faz en yüksek etki ve en büyük iş yükünü içerir.

## Entry Criteria
- 45 TR blog yazısı `src/content/posts/tr/` dizininde mevcut
- Her yazı geçerli frontmatter'a sahip (title, description, date, author, tags)

## In Scope

### 2.1 — H2 Başlıkları Soru Formatına Çevirme
- Mevcut H2 başlıkları soru formatına dönüştürülecek:
  - "Hesaplama formülü" → "Kıdem tazminatı nasıl hesaplanır?"
  - "İlamsız icra takibi" → "İlamsız icra takibi nedir ve nasıl başlatılır?"
  - "Noter ihtarname ücreti 2026" → "Noter ihtarname ücreti 2026 ne kadar?"
- Amaç: LLM sorguları ile başlık eşleşmesi sağlamak
- Hedef: H2 başlıkların %80'i soru formatında

### 2.2 — İlk Paragraf Ters Piramit Formatı
- Her yazının ilk paragrafı 1-2 cümlelik direkt tanım/cevap olacak:
  - Yanlış: "Bu yazıda kıdem tazminatı konusunu ele alacağız..."
  - Doğru: "Kıdem tazminatı, işçinin en az bir yıl çalıştıktan sonra iş sözleşmesinin belirli koşullarda sona ermesi halinde hak kazandığı tazminattır."
- LLM'ler ilk declarative statement'ı çeker → ilk cümle kritik

### 2.3 — Blog Yazılarını 400+ Kelimeye Genişletme
- Mevcut ortalama: 182 kelime → Hedef: 400+ kelime
- Genişletme stratejileri:
  - **Örnek senaryolar:** "Örnek: 5 yıl çalışan bir işçinin kıdem tazminatı hesabı..."
  - **Adım adım süreçler:** Numaralı liste ile prosedür açıklama
  - **Tablolar:** Karşılaştırma tabloları (örn. ihbar vs kıdem tazminatı)
  - **Kanun referansları:** İlgili kanun maddesi ve açıklaması
  - **Dikkat edilmesi gerekenler:** "Dikkat: ..." uyarı kutuları
  - **Sonuç/özet paragrafı:** Yazının sonunda kısa özet
- Her genişletme orijinal yapıyı koruyacak
- Batch'ler halinde çalışılacak (5-10 yazı/batch)

### 2.4 — Kanun Madde Referansları Ekleme
- İlgili yazılara spesifik kanun ve madde numaraları eklenecek:
  - "İş Kanunu md. 147"
  - "TBK md. 226"
  - "TTK md. 376"
  - "TMK md. 506"
  - "İİK md. 58"
- Mümkünse mevzuat.gov.tr veya kanunlar.com linkleri ile
- E-E-A-T sinyali olarak LLM'ler için değerli

## Out Of Scope
- EN blog yazıları (3 yazı)
- Hizmet sayfası içerikleri
- Schema değişiklikleri (Phase 03)
- Yeni blog yazısı üretimi
- Görsel/medya ekleme

## Dependencies
- None — bağımsız uygulanabilir (Phase 01 ile paralel)

## Deliverables
- 45 güncellenmiş TR blog yazısı
- Her yazı 400+ kelime
- H2 başlıklar %80 soru formatında
- İlk paragraflar ters piramit formatında
- İlgili yazılarda kanun madde referansları

## Acceptance Criteria
- Tüm 45 TR yazı 400+ kelime (frontmatter hariç)
- H2 başlıkların %80'i (?, nasıl, nedir, ne kadar, kim, ne zaman içeriyor)
- Her yazının ilk paragrafı 1-2 cümlelik direkt tanım
- En az 20 yazıda kanun madde referansı mevcut
- `npm run build` sorunsuz
- Tüm yazılar geçerli frontmatter'a sahip
- `description` alanı 170 karakteri aşmıyor

## Exit Criteria
- Build sorunsuz geçiyor
- Blog index sayfası tüm yazıları listeliyor
- İç linkler bozulmamış

## Risks And Blockers
- **Risk:** 45 yazıyı aynı anda değiştirmek büyük diff → 5-10 yazılık batch'lerle çalışılacak
- **Risk:** Kelime sayısını artırırken kalite düşebilir → Her genişletme anlamlı içerik ekleyecek, boş doldurma yapılmayacak
- **Risk:** Frontmatter description 170 char limiti aşılabilir → Uzun yazılarda description kısaltılacak

## Batch Plan
1. **Batch 1 (10 yazı):** En yüksek trafik potansiyelli yazılar (is-hukuku, icra-tahsilat, miras)
2. **Batch 2 (10 yazı):** Ticari hukuk ve şirket yazıları
3. **Batch 3 (10 yazı):** Fikri mülkiyet ve marka yazıları
4. **Batch 4 (10 yazı):** Kalan yazılar (sözleşme, tüketici, spor/espor)
5. **Batch 5 (5 yazı):** Son kontroller ve düzeltmeler

## Master Plan Sync Notes
- Faz tamamlanınca llm-visibility-master-plan'de Phase 02 → Completed, M2 kaydedilir
