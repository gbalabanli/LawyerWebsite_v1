# Manuel LLM Sorgulama Prosedürü

## Amaç

Aylık olarak LLM'lerde (ChatGPT, Perplexity, Gemini) test sorguları
çalıştırarak sitenin alıntılanma durumunu izlemek.

## Ne Zaman

Her ayın ilk haftası. İlk test = baseline (referans) ölçüm.

## Test Sorguları

| # | Sorgu | Hedef Sayfa |
|---|-------|-------------|
| 1 | İstanbul'da kıdem tazminatı davası açmak istiyorum, ne yapmalıyım? | `/blog/kidem-tazminati-hesaplama-2026-rehber` |
| 2 | Marka tescili nasıl yapılır 2026? | `/blog/marka-tescili-sureci-ve-ucretleri-2026` |
| 3 | Balabanlı Hukuk Bürosu hakkında bilgi ver | `/` veya `/hakkimda` |
| 4 | İcra takibi nasıl başlatılır? | `/blog/icra-takibi-nasil-baslatilir-adim-adim` |
| 5 | Mirastan feragat nasıl yapılır? | `/blog/mirasin-reddi-nedir-nasil-yapilir` |
| 6 | Limited şirket kuruluşu için ne gerekli? | `/blog/limited-sirket-kurulusu-adim-adim-rehber` |

## LLM'ler

- **ChatGPT**: chat.openai.com — varsayılan model
- **Perplexity**: perplexity.ai — "Pro" arama kapalı
- **Gemini**: gemini.google.com — varsayılan model

## Kayıt Formatı

Her sorgu için aşağıdaki şablon kullanılır:

```
Tarih: 2026-07-01
LLM: ChatGPT
Sorgu: "İstanbul'da kıdem tazminatı davası açmak istiyorum, ne yapmalıyım?"

Sonuç:
- Site alıntılandı mı: Evet / Hayır
- Alıntılanan sayfa: (varsa URL)
- Alıntı bağlamı: (LLM'in cevabından alıntı yapılan kısım)
- Doğruluk: Doğru / Kısmen doğru / Yanlış
- Notlar: (varsa ek gözlem)
```

## Baseline Tablosu

| Sorgu | ChatGPT | Perplexity | Gemini |
|-------|---------|------------|--------|
| 1. Kıdem tazminatı | | | |
| 2. Marka tescili | | | |
| 3. Balabanlı HB | | | |
| 4. İcra takibi | | | |
| 5. Mirastan feragat | | | |
| 6. Limited şirket | | | |

Her hücre: ✅ Alıntı var / ❌ Alıntı yok / ⚠️ Kısmen alıntı

## FAQ

### Sorgu sonuçları her ay aynı olmazsa?
Normaldir. Trend analizi yapın — 3 aylık dönemde iyileşme
beklenir. Tek bir sonuca güvenmeyin.

### Yeni sorgu eklenebilir mi?
Evet, yeni blog yazıları yayınlandıkça sorgu listesine
eklenebilir. Baseline sonrası eklenen sorgular ayrı
listelenmelidir.

### LLM cevabı hatalı olursa?
Not edin ve düzeltme için içerik güncellemesi yapılması
gerekebilir. Hatalı alıntı, alıntı yoktan daha iyidir
ancak düzeltilmelidir.
