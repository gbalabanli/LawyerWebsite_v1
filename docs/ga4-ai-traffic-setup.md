# GA4 AI Trafik Segmenti Kurulum Rehberi

## Ön Koşul

`PUBLIC_GA4_MEASUREMENT_ID` ortam değişkeni tanımlanmış ve site deploy edilmiş olmalı.
Aksi halde GA4 verisi toplanmaz.

## GA4'te AI Trafik Segmenti Oluşturma

### 1. Exploration (Explorations) Raporu

1. GA4 Console → **Explore** (soldaki menü)
2. **Blank** exploration oluşturun
3. **Segments** → **New segment** → **Session segment**

### 2. Segment Tanımı

```
Segment name: AI Referral Traffic
Condition: Sessions
Include: Session source / medium
Matches Regex (ignore case):
^.*ai|.*openai|.*copilot|.*chatgpt|.*gemini|.*gpt-|.*perplexity
```

Açıklama:
- `^.*ai` — "ai" içeren tüm kaynaklar
- `.*openai` — OpenAI/ChatGPT referansları
- `.*copilot` — GitHub Copilot, Bing Copilot
- `.*chatgpt` — Direkt chatgpt.com referansları
- `.*gemini` — Google Gemini
- `.*gpt-` — GPT-4, GPT-3.5 gibi modeller
- `.*perplexity` — Perplexity.ai

### 3. Metrics

Aşağıdaki metrikler eklenmeli:

| Metric | Açıklama |
|--------|----------|
| Views | Sayfa görüntüleme |
| Engaged sessions | Etkileşimli oturumlar |
| Average engagement time | Ortalama etkileşim süresi |
| Key events | Anahtar olaylar (varsa) |
| Sessions | Toplam oturum sayısı |

### 4. Dimensions

| Dimension | Açıklama |
|-----------|----------|
| Session source/medium | Hangi kaynaktan geliyor |
| Landing page | Hangi sayfaya iniş yapılmış |
| Device category | Mobil/desktop dağılımı |

### 5. Filter: llms.txt Özel İzleme

Ayrı bir exploration'da `Page path + query string` dimension'ı ile:

```
Page path contains /llms.txt
```

Bu segment, `llms.txt` dosyasının ne sıklıkla talep edildiğini gösterir.

## Dashboard'a Ekleme

Exploration kaydedildikten sonra **Add to dashboard** seçeneği ile
AI trafiği ana panele eklenebilir.

## Notlar

- AI trafiği genellikle düşük hacimlidir (ilk 3 ay boyunca).
- Segment periyodik olarak (ayda bir) kontrol edilmelidir.
- Yeni AI bot'lar çıktıkça regex güncellenmelidir.
- `llms.txt` için GA4 tracking parametresi eklenmesi önerilmez
  (URL'yi kirletir, bot'ları yanıltabilir).
