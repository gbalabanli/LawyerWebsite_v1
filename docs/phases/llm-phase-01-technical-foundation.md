# Phase 01: Technical Foundation (llms.txt + robots.txt)

## Phase Metadata
- Status: Completed
- Last Updated: 2026-06-11
- Duration Target: 1 session (completed)
- Related Master Plan: [../llm-visibility-master-plan.md](../llm-visibility-master-plan.md)

## Objective
LLM'lerin siteyi keşfetmesini ve içeriği anlamasını sağlayan teknik altyapıyı kurmak: `llms.txt` dosyası ile markdown sitemap, `robots.txt` ile explicit AI bot izinleri.

## Entry Criteria
- Site build sorunsuz çalışıyor (66 sayfa)
- `public/robots.txt` mevcut

## In Scope
- **`public/llms.txt` oluşturma:**
  - Markdown formatında, kök dizinde erişilebilir
  - Firmanın kısa tanımı (brand.aboutShort)
  - 45 TR blog yazısının listesi: başlık + kısa açıklama + tam URL
  - 9 hizmet sayfasının listesi: başlık + açıklama + tam URL
  - İletişim bilgileri (WhatsApp, email, adres)
  - Site URL'leri `siteConfig.seo.siteUrl` baz alınarak oluşturulacak
- **`public/robots.txt` güncelleme:**
  - Mevcut `User-agent: * / Allow: /` korunacak
  - Explicit AI bot allow blokları eklenecek:
    - `GPTBot` (OpenAI training)
    - `OAI-SearchBot` (ChatGPT search results — en kritik)
    - `ChatGPT-User` (ChatGPT real-time fetch)
    - `ClaudeBot` (Anthropic/Claude)
    - `PerplexityBot` (Perplexity answers)
    - `Google-Extended` (Gemini AI training)
    - `Bytespider` (ByteDance)
    - `Applebot-Extended` (Apple AI)
  - Sitemap referansı korunacak

## Out Of Scope
- Blog yazısı içerik değişikliği
- Schema değişikliği
- İçerik optimizasyonu
- EN sayfaların llms.txt'ye eklenmesi (TR odak)

## Dependencies
- None — bağımsız uygulanabilir

## Deliverables
- `public/llms.txt` — 45 blog yazısı + 9 hizmet + iletişim bilgileri
- `public/robots.txt` — AI bot explicit allow kuralları eklanmış

## Acceptance Criteria
- `public/llms.txt` mevcut ve geçerli markdown formatında
- llms.txt tüm 45 TR blog yazısını listeliyor (başlık + açıklama + URL)
- llms.txt 9 hizmet sayfasını listeliyor
- llms.txt iletişim bilgileri içeriyor
- `public/robots.txt` 8 AI bot'u explicit allow olarak listeliyor
- `npm run build` sorunsuz çalışıyor
- llms.txt build çıktısında (`dist/llms.txt`) mevcut

## Exit Criteria
- Her iki dosya `public/` dizininde mevcut
- Build sorunsuz geçiyor
- llms.txt içeriği elle doğrulanmış (tüm URL'ler erişilebilir)

## Progress Snapshot
### Delivered So Far
- ✅ `public/llms.txt` (77 satır): 45 TR blog yazısı (başlık + açıklama + URL), 9 hizmet sayfası (başlık + URL), iletişim bilgileri (e-posta, WhatsApp, adres), hakkımızda linkleri
- ✅ `public/robots.txt` güncellendi: mevcut `User-agent: *` korundu, 8 AI bot explicit allow eklendi (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Applebot-Extended)
- ✅ Build başarılı: 66 sayfa, 0 hata, 0 warning
- ✅ Build çıktısında her iki dosya mevcut (`dist/llms.txt` 16KB, `dist/robots.txt` 437B)
- ✅ Türkçe karakterler düzgün (UTF-8 ile yazıldı, PowerShell encoding tuzağından kaçınıldı)

### Known Gaps / Deferred Items
- Yok — tüm scope teslim edildi

## Master Plan Sync Notes
- Phase 01 → Completed, M1 — Technical Ready ✅
- Master plan güncellendi: Overall Status → In Progress (Phase 01 Done), Phase Index → Completed, Status Snapshot güncellendi
