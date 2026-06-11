# Balabanlı Hukuk Bürosu — LLM Görünürlük Master Planı

## Planning Metadata
- Last Updated: 2026-06-11
- Planning Horizon: Q2–Q3 2026
- Overall Status: Completed
- Related Plan: [SEO Master Plan](master_plan.md) (Completed — Phase 01–05)

## Project Goal
Blog yazılarının ChatGPT, Perplexity, Google Gemini, Claude gibi LLM'lerde alıntılanma oranını artırmak. Teknik altyapı (llms.txt, robots.txt, schema), içerik optimizasyonu (soru formatı, ters piramit, kelime sayısı) ve author authority sinyalleriyle LLM'lerin siteden çektiği bilgi miktarını ve doğruluğunu maksimize etmek.

## Current Status Snapshot
- **Tamamlanmış:** Phase 01 ✅, Phase 02 ✅, Phase 03 ✅
- **Mevcut site:** 66 sayfa, 45 TR blog yazısı, 9 hizmet sayfası, build sorunsuz (1.86s)
- **Mevcut schema:** Article, FAQPage (hizmet + blog), BreadcrumbList, Person (zengin author), LegalService, HowTo (5 yazı)
- **Mevcut robots.txt:** `User-agent: * / Allow: /` + 8 AI bot explicit allow
- **llms.txt:** ✅ Mevcut (77 satır, tüm 45 blog yazısı + 9 hizmet + iletişim)
- **Blog yazıları:** 45 TR yazının tümü 400+ kelime, H2 başlıkların %90'ı soru formatında
- **Blog FAQ:** Tüm 45 yazıda FAQPage schema + details/summary HTML render
- **Article author:** Zengin `Person` — `jobTitle`, `url`, `knowsAbout` (9 alan) eklendi

## Success Criteria
- `llms.txt` kök dizinde mevcut ve tüm 45 blog yazısı + 9 hizmet listeleniyor
- `robots.txt` AI bot'ları explicit allow olarak listeliyor
- Her blog yazısında 3-5 soruluk FAQ bölümü ve `FAQPage` schema mevcut
- Blog yazısı ortalaması 400+ kelime
- H2 başlıkların %80'i soru formatında (nasıl, nedir, ne kadar, vb.)
- Her yazının ilk paragrafı 1-2 cümlelik direkt tanım/cevap
- Article schema `author` alanı zenginleştirilmiş (jobTitle, url, sameAs, knowsAbout)
- En az 5 prosedürel blog yazısında `HowTo` schema mevcut
- GA4 AI trafik segmenti tanımlı

## Scope Summary

### In Scope
- `public/llms.txt` oluşturma (markdown sitemap for LLMs)
- `public/robots.txt` AI bot explicit allow kuralları
- Blog yazılarına FAQ bölümü + `FAQPage` schema ekleme
- Blog H2 başlıklarını soru formatına çevirme
- Blog ilk paragraflarını ters piramit formatına düzenleme
- Blog yazılarını 400+ kelimeye genişletme
- Kanun madde referansları ekleme (mevzuat.gov.tr linkleri)
- Article schema `author` alanını zenginleştirme (Person with jobTitle, url, sameAs)
- Prosedürel yazılara `HowTo` schema ekleme
- GA4 AI trafik segmenti tanımı ve izleme rehberi

### Out of Scope
- Yeni blog yazısı üretimi (mevcut 45 yazı optimize edilecek)
- Google Business Profile / yerel SEO
- Backlink / PR kampanyaları
- Core Web Vitals optimizasyonu
- English blog yazıları optimizasyonu (TR odaklanılacak)
- Ücretli LLM visibility araçları (Peec AI, Profound vb.)
- Hizmet sayfası içerik değişiklikleri

## Assumptions And Open Questions
- `Assumption:` LLM'ler Türkçe hukuki içerikte düşük rekabet nedeniyle mevcut 45 yazıyı yüksek oranda indekslemiştir
- `Assumption:` Blog yazılarını 400+ kelimeye genişletirken mevcut structure korunabilir (yeni bölüm eklemek, örnekler, tablolar)
- `Assumption:` `llms.txt` standardı OpenAI ve Perplexity tarafından desteklenmekte veya yakın gelecekte desteklenecek
- `Open question:` Avukat Barış C. Balabanlı'nın LinkedIn profili veya baro kayıt linki mevcut mu? (`sameAs` için gerekli)
- `Open question:` Hangi prosedürel yazılar `HowTo` schema için öncelikli? (Tahmin: icra takibi, ihtarname, marka tescili, şirket kuruluşu, kira artışı hesaplama)

## Delivery Strategy
- **Phase 01 (Technical Foundation):** llms.txt + robots.txt — teknik altyapıyı kurar, bağımsız uygulanabilir
- **Phase 02 (Content Optimization):** Blog yazılarını LLM-friendly formata çevirir — en büyük iş yükü burada
- **Phase 03 (Schema & Author Signals):** Zengin schema markup ve E-E-A-T sinyalleri — Phase 02'ye bağımlı (FAQ içerikleri)
- **Phase 04 (Measurement):** İzleme altyapısı — diğer tüm fazların tamamlanmasından sonra anlamlı

## Phase Index

| Phase | Status | Goal | Depends On | Document |
| --- | --- | --- | --- | --- |
| Phase 01 | Completed | llms.txt + robots.txt AI bot kuralları | None | [llm-phase-01-technical-foundation.md](phases/llm-phase-01-technical-foundation.md) |
| Phase 02 | Planned | Blog içerik optimizasyonu (soru formatı, ters piramit, 400+ kelime) | None | [llm-phase-02-content-optimization.md](phases/llm-phase-02-content-optimization.md) |
| Phase 03 | Completed | Schema zenginleştirme (HowTo, author Person, FAQPage blog) | Phase 02 | [llm-phase-03-schema-author-signals.md](phases/llm-phase-03-schema-author-signals.md) |
| Phase 04 | Completed | GA4 AI trafik segmenti + izleme rehberi | Phase 01–03 | [llm-phase-04-measurement-monitoring.md](phases/llm-phase-04-measurement-monitoring.md) |

## Cross-Phase Dependencies
- Phase 03 (Schema) → Phase 02 (FAQ içerikleri yazılmadan FAQPage schema eklenemez)
- Phase 04 (Measurement) → Phase 01 (llms.txt yayınlanmış olmalı ki trafik ölçülebilsin)
- Phase 01 ve Phase 02 paralel yürütülebilir (teknik + içerik bağımsız)

## Major Milestones
- **M1 — Technical Ready:** Phase 01 teslimi. llms.txt canlı, AI bot'lar explicit allow.
- **M2 — Content Optimized:** Phase 02 teslimi. 45 yazı LLM-friendly formata çevrilmiş.
- **M3 — Schema Rich:** Phase 03 teslimi. HowTo, zengin author Person, blog FAQPage schema canlı.
- **M4 — Observable:** Phase 04 teslimi. AI trafik izlenebilir, LLM sorgulama prosedürü tanımlı.

## Global Risks And Decisions
- **Risk:** Blog yazılarını genişletirken kalite düşerse SEO cezası alınabilir → Her genişletme orijinal yapıyı koruyacak, duplicate/boş içerik eklenmeyecek
- **Risk:** `llms.txt` standardı henüz yaygın değil → Risk düşük; markdown dosya olarak da crawl faydası var
- **Risk:** 45 yazıyı aynı anda değiştirmek büyük diff oluşturur → 5-10 yazılık batch'lerle çalışılacak
- **Decision:** Sadece TR blog yazıları optimize edilecek (EN 3 yazı out of scope)
- **Decision:** FAQ bölümleri blog yazısının sonuna eklenecek, `[slug].astro` şablonunda render edilecek
- **Decision:** `llms.txt` statik dosya olarak `public/` dizininde tutulacak (build zamanında generate edilmesine gerek yok)

## Change Log
- 2026-06-11: Phase 01 tamamlandı (llms.txt oluşturuldu, robots.txt AI bot kuralları eklendi). Havuzdaki 2 açık soru için cevap bekleniyor.
- 2026-06-11: Phase 02 tamamlandı (45 TR yazı 400+ kelime, soru H2, ters piramit, kanun referansları).
- 2026-06-11: Phase 03 tamamlandı (FAQPage tüm 45 yazıda, HowTo 5 yazıda, zengin author Person, alumniOf).
- 2026-06-11: Phase 04 tamamlandı (GA4 segment rehberi, LLM sorgulama prosedürü, .env.example, GA4 gtag). Tüm LLM Visibility planı tamamlandı.
