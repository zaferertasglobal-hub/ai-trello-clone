# 🤖 AI-Trello Pro: Akıllı Görev Yönetim Sistemi

AI-Trello Pro, modern web teknolojileri ve Yapay Zeka (AI) entegrasyonu ile geliştirilmiş, sürükle-bırak (Drag & Drop) mantığına dayalı profesyonel bir proje yönetim aracıdır.



## 🌟 Öne Çıkan Özellikler

* **Sürükle ve Bırak (Dnd-Kit):** Kartların kolonlar arası geçişi ve sıralanması için pürüzsüz, yüksek performanslı sürükle-bırak deneyimi.
* **Google Gemini AI Entegrasyonu:** Bir görev "Bitenler" kolonuna taşındığında, AI tarafından üretilen gerçek zamanlı motivasyon ve tebrik mesajları.
* **Veri Kalıcılığı (Local Storage):** Tarayıcı kapatılsa veya sayfa yenilense bile tüm görevleriniz bilgisayarınızda güvenle saklanır.
* **Dinamik İstatistik Paneli:** Toplam görev sayısı ve tamamlanma oranını anlık olarak takip eden analiz paneli.
* **TypeScript Güvencesi:** Tüm veri modelleri TypeScript interface'leri ile tanımlanmış, hata payı minimuma indirilmiş kod yapısı.

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **React 18** | UI ve Component tabanlı mimari |
| **TypeScript** | Statik tip denetimi ve güvenli kod yazımı |
| **Tailwind CSS v4** | Modern ve hızlı stil yönetimi |
| **@dnd-kit** | Erişilebilir ve performanslı sürükle-bırak altyapısı |
| **Gemini AI API** | Üretken yapay zeka desteği |
| **Vite** | Hızlı geliştirme ve build aracı |

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:

1.  **Repoyu klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADIN/ai-trello-clone.git](https://github.com/KULLANICI_ADIN/ai-trello-clone.git)
    cd ai-trello-clone
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

3.  **Gemini API Anahtarını Ekleyin:**
    `src/App.tsx` dosyası içerisindeki `BURAYA_GEMINI_API_KEY_GELECEK` alanına kendi Google AI Studio anahtarınızı yapıştırın.

4.  **Geliştirme modunda başlatın:**
    ```bash
    npm run dev
    ```

## 🏗️ Proje Mimarisi

* `src/components/`: Atomik bileşenler (TaskCard, Column, AddTask).
* `src/types.ts`: Tüm proje için merkezi tip tanımlamaları.
* `src/App.tsx`: State yönetimi, Drag-and-Drop mantığı ve AI entegrasyonunun kalbi.

## 📈 Gelecek Planları

- [ ] Kullanıcı giriş sistemi (Firebase veya Auth.js)
- [ ] Görevlere etiket (label) ve öncelik seviyesi ekleme
- [ ] Karanlık mod (Dark Mode) desteği

---
Made with ❤️ by [Adın Soyadın]
