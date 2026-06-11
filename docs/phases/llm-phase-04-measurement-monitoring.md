# Phase 04: Measurement & Monitoring

## Phase Metadata
- Status: Completed
- Last Updated: 2026-06-11
- Duration Target: 1 session
- Related Master Plan: [../llm-visibility-master-plan.md](../llm-visibility-master-plan.md)

## Objective
LLM görünürlüğünü ölçülebilir hale getirmek: GA4 AI trafik segmenti, manuel LLM sorgulama prosedürü, ve düzenli izleme çerçevesi.

## Entry Criteria
- Phase 01 tamamlanmış (llms.txt canlı)
- Phase 02 tamamlanmış (içerikler optimize)
- Phase 03 tamamlanmış (schema'lar zengin)
- Site Google Analytics 4 ile entegre

## In Scope

### 4.1 — GA4 AI Trafik Segmenti
- Google Analytics 4'te AI kaynaklarından gelen trafiği izlemek için:
  - Exploration raporu tanımı
  - Dimension: `Session source/medium`
  - Regex segment pattern'ı: `^.*ai|.*\.openai.*|.*copilot.*|.*chatgpt.*|.*gemini.*|.*gpt.*|.*gemini.*google.*|.*perplexity.*$`
  - Metrics: Views, Engaged sessions, Key events
- Dokümantasyon: `docs/ga4-ai-traffic-setup.md` (opsiyonel)
- Not: Bu sadece kurulum rehberi — GA4'e erişim gerekli

### 4.2 — Manuel LLM Sorgulama Prosedürü
- Düzenli (aylık) test sorguları tanımla:
  - "İstanbul'da kıdem tazminatı davası açmak istiyorum, ne yapmalıyım?"
  - "Marka tescili nasıl yapılır 2026?"
  - "Balabanlı Hukuk Bürosu hakkında bilgi ver"
  - "İcra takibi nasıl başlatılır?"
  - "Mirastan feragat nasıl yapılır?"
  - "Limited şirket kuruluşu için ne gerekli?"
- Her sorgu ChatGPT, Perplexity, Gemini'de test edilecek
- Sonuçlar kayıt altına alınacak: site alıntılandı mı? Hangi sayfa alıntılandı?
- İlk test = baseline ölçüm, sonraki aylar = karşılaştırma

### 4.3 — Server Log AI Bot Kontrolü
- Hosting (GitHub Pages) log'larında AI bot crawl frekansı kontrolü
- GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot user-agent'ları aranacak
- Not: GitHub Pages log erişimi sınırlı olabilir — alternatif: server log analizi yoksa baseline olarak note edilir

### 4.4 — llms.txt Etki Ölçümü
- llms.txt deploy sonrası erişilebilirlik kontrolü
- LLM'lerin llms.txt'yi referans alıp almadığının izlenmesi
- llms.txt'ye özel tracking parametresi ekleme (opsiyonel)

## Out Of Scope
- Ücretli LLM visibility araçları (Peec AI, Profound, Scrunch AI, Goodie AI)
- Google Search Console optimizasyonu (ayrı workstream)
- Backlink analizi
- Core Web Vitals

## Dependencies
- **Phase 01** — llms.txt yayınlanmış olmalı
- **Phase 02–03** — optimize içerik ve schema canlı olmalı ki ölçüm anlamlı olsun
- **External:** Google Analytics 4 erişimi gerekli (GA4 segmenti için)
- **External:** ChatGPT, Perplexity, Gemini hesapları (manuel test için)

## Deliverables
- GA4 AI trafik segment tanımı ve kurulum rehberi
- Manuel LLM sorgulama prosedürü (sorgu listesi + kayıt formatı)
- İlk baseline ölçüm sonuçları (ilk ay)
- İzleme şablonu (aylık tekrar için)

## Acceptance Criteria
- GA4'de AI trafik segmenti tanımlı ve veri topluyor
- 6 test sorgusu ChatGPT, Perplexity, Gemini'de en az bir kez çalıştırılmış
- Sonuçlar belgelenmiş (hangi LLM, hangi sorgu, alıntı var mı)
- İzleme prosedürü dokümante edilmiş

## Exit Criteria
- Ölçüm altyapısı kurulmuş ve ilk baseline mevcut
- Aylık izleme prosedürü tanımlı

## Risks And Blockers
- **Risk:** GitHub Pages log erişimi sınırlı → Server log analizi baseline olarak "ölçülemedi" notu ile kaydedilebilir
- **Risk:** GA4 AI referral trafiği düşük olabilir (erken aşama) → İlk 3 ay minimum, sonra değerlendirme
- **Risk:** Manuel test sonuçları tekrarlanabilir olmayabilir (LLM cevapları değişir) → Trend analizi yapılmalı, tekil sonuçlara güvenilmemeli

## Master Plan Sync Notes
- Faz tamamlanınca llm-visibility-master-plan'de Phase 04 → Completed, M4 kaydedilir
- Overall Status → Completed
