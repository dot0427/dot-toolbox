# AGENTS.md — Dot's Toolbox 豆特的網頁工具箱

> 這份文件是給 AI（Claude、Codex、Cursor 等）看的專案說明書。
> 開始修改前請**完整讀完**，並嚴格照這裡的規則做事。
> `CLAUDE.md` 只是指向這份檔案的入口，所有規則以本檔為準。

---

## 1. 專案目的

這是豆特（Dot，宜蘭大學資工系）的**個人網頁／影片製作資源知識庫**。

平常在 Threads、GitHub、課堂上看到好用的工具（動畫函式庫、圖示、Loading、簡報工具、AI Skills⋯）很容易收藏完就忘記。這個網站把它們整理成：

- **首頁**：所有資源的卡片牆，可以用分類篩選、用關鍵字搜尋。
- **資源詳細頁**：每個資源一頁，固定回答「它是什麼、適合什麼時候用、怎麼開始、我的筆記」。

**核心目標：之後只要丟一個連結給 AI，AI 就能照本文件的規則，在 5 分鐘內新增一張卡片＋一頁詳細頁，風格和格式跟既有頁面完全一致。**

---

## 2. 技術限制（不可違反）

- **純 HTML + CSS + 原生 JavaScript**，不使用任何框架（React、Vue、Tailwind 都不要），不需要 build。
- 網站直接部署在 **GitHub Pages**（`main` 分支根目錄），所以所有路徑都要用**相對路徑**。
  - ✅ `../assets/style.css`、`resources/gsap.html`
  - ❌ `/assets/style.css`（在 GitHub Pages 子路徑底下會壞掉）
- 唯一允許的外部資源：Google Fonts（已在模板中引入）。詳細頁若要放「現場示範」，可以引入該資源自己的官方 CDN。
- 不要新增 npm 套件、`package.json` 或任何建置工具。

---

## 3. 檔案結構

```
dot-toolbox/
├── AGENTS.md              ← 本文件（AI 規則，唯一真相來源）
├── CLAUDE.md              ← 只寫一行，指向 AGENTS.md
├── README.md              ← 給人看的專案簡介
├── index.html             ← 首頁（卡片牆），內容由 JS 讀 data/resources.json 產生
├── .nojekyll              ← 讓 GitHub Pages 不要跑 Jekyll
├── data/
│   └── resources.json     ← ★ 所有資源的清單（首頁的資料來源）
├── resources/
│   └── <slug>.html        ← ★ 每個資源一頁詳細頁
├── templates/
│   └── resource.html      ← ★ 新增詳細頁時「複製」這個模板
└── assets/
    ├── style.css          ← 全站唯一的樣式檔
    └── main.js            ← 首頁的渲染、篩選、搜尋邏輯
```

**新增一個資源，永遠只會動到兩個地方：**
1. `data/resources.json` 加一筆資料
2. `resources/<slug>.html` 新增一頁（從 `templates/resource.html` 複製）

除非使用者明確要求，**不要修改** `index.html`、`assets/main.js`、`assets/style.css`。

---

## 4. 命名規則

### slug（資源代號）
- 全小寫英文、數字、連字號 `-`，例如 `gsap`、`react-bits`、`remotion-skills`。
- 使用資源的**官方名稱**轉換，不要自己取綽號。
- slug 必須**同時**用在：
  - JSON 的 `"slug"` 欄位
  - 詳細頁檔名 `resources/<slug>.html`
- 新增前先檢查 `data/resources.json`，**slug 不可重複**。

### 其他檔案
- 圖片（若需要）放 `assets/img/<slug>-<描述>.png`，例如 `assets/img/gsap-demo.png`。
- 不要建立其他新資料夾。

---

## 5. 資料格式：`data/resources.json`

檔案是一個陣列，每個資源一個物件。**欄位名稱、順序、型別都要照下面：**

```json
{
  "slug": "gsap",
  "name": "GSAP",
  "category": "animation",
  "summary": "最老牌也最強的 JS 動畫引擎，時間軸、捲動觸發、文字拆字都能做。",
  "tags": ["JavaScript", "動畫", "ScrollTrigger"],
  "url": "https://gsap.com/",
  "repo": "https://github.com/greensock/GSAP",
  "status": "want",
  "added": "2026-11-16"
}
```

| 欄位 | 型別 | 規則 |
|---|---|---|
| `slug` | string | 見第 4 節 |
| `name` | string | 官方名稱，保留原本大小寫 |
| `category` | string | **只能**從第 6 節的分類清單中選一個 |
| `summary` | string | 繁體中文一句話，**40 字以內**，講「它能幫我做到什麼」，不要寫「這是一個⋯」 |
| `tags` | string[] | 2～4 個，可中英混用，第一個放主要技術（如 JavaScript / CSS / React / CLI） |
| `url` | string | 官網；沒有官網就放 GitHub |
| `repo` | string \| null | GitHub repo 網址，沒有就填 `null` |
| `status` | string | `want`（想試試）／`tried`（用過）／`love`（愛用）。**不確定一律填 `want`**，不要替豆特假裝用過 |
| `added` | string | 新增日期，格式 `YYYY-MM-DD` |

- 新資源**加在陣列最後面**。
- 修改後確認 JSON 合法（逗號、引號），可用 `python3 -m json.tool data/resources.json` 檢查。

---

## 6. 分類清單（固定，不可自創）

| `category` 值 | 顯示名稱 | 放什麼 |
|---|---|---|
| `animation` | 動畫 | 動畫引擎、捲動效果、文字動畫 |
| `ui` | 介面元件 | 現成元件、Loading、按鈕效果 |
| `icon` | 圖示 | Icon 套件 |
| `inspiration` | 靈感 | 收集範例、效果參考的網站 |
| `video` | 影片 | 程式做影片、剪輯相關工具 |
| `slides` | 簡報 | 用程式/AI 做簡報的工具 |
| `ai-tool` | AI 工具 | Agent Skills、給 AI 用的 CLI |

如果真的放不進任何分類，**先問使用者**，不要自己新增。
（新增分類需要同時改 `assets/main.js` 的 `CATEGORIES` 和 `assets/style.css` 的分類顏色，以及本表。）

---

## 7. 詳細頁格式：`resources/<slug>.html`

1. **複製** `templates/resource.html` → `resources/<slug>.html`
2. 把所有 `{{ }}` 佔位符換掉（見模板內註解），**不能留下任何雙大括號佔位符**。
3. 內容區塊**固定五段，順序不可調換、標題文字不可改**：

| 區塊 | 標題 | 寫什麼 |
|---|---|---|
| 1 | 一句話認識它 | 跟 JSON 的 `summary` 同義，可稍微展開成 2～3 句 |
| 2 | 什麼時候用得到 | 3～5 個條列，盡量連結到豆特會做的東西（活動網頁、作品集、應援網頁、課堂作業） |
| 3 | 怎麼開始 | 安裝方式＋最小可執行範例（`<pre><code>`）。**只寫你確定正確的官方用法**，不確定就寫「請參考官方文件」並附連結 |
| 4 | 豆特筆記 | 用過的心得、注意事項。還沒用過就寫「還沒實際用過，先收藏。」不要捏造使用經驗 |
| 5 | 相關連結 | 官網、GitHub、文件 |

4. 頁首的分類標籤要用正確的 class：`tag tag--<category>`。
5. `<title>` 格式：`資源名稱｜Dot's Toolbox`

---

## 8. 視覺風格（改樣式前必讀）

整體感覺：**像一本有手感的工具筆記本**——米白紙張底、黑色墨線框、一點點亮橘色點綴，輕微的「硬陰影」卡片（neo-brutalism，但很收斂）。

- 色票（定義在 `assets/style.css` 的 `:root`，**一律使用變數，不要寫死色碼**）：
  - `--paper` `#F6F2EA` 背景／`--ink` `#1B1B1B` 文字與框線／`--accent` `#FF5B2E` 重點
  - 每個分類有自己的淡色 `--c-<category>`
- 字體：標題 `Space Grotesk`＋`Noto Sans TC`；程式碼與小標籤 `JetBrains Mono`。
- 框線一律 `1.5px solid var(--ink)`，圓角 `var(--radius)`。
- 卡片 hover：往左上移 2px＋出現黑色硬陰影。
- 語氣：繁體中文、口語、像在跟自己/朋友講話，**不要寫成廣告文案**。
- 不要加 emoji 當標題裝飾（狀態徽章除外）。
- 必須在手機（寬 375px）上正常閱讀。

---

## 9. AI 工作流程

### 情境 A：「幫我把這個加進工具箱：<連結>」
1. 閱讀連結（官網／GitHub README），確認它是什麼。
2. 決定 `slug`、`category`（第 4、6 節），檢查 slug 不重複。
3. 在 `data/resources.json` 最後新增一筆。
4. 複製模板建立 `resources/<slug>.html`，填好五個區塊。
5. 跑下面的檢查清單。
6. 回報：新增了哪兩個檔案、選了哪個分類以及原因、哪些內容是「不確定、需要豆特補」的。

### 情境 B：「更新某個資源」（例如：我用過 GSAP 了）
- 改 JSON 的 `status`，並在詳細頁的「豆特筆記」補上她提供的心得。只改被要求的部分。

### 情境 C：「改網站樣式／功能」
- 先說明打算改哪些檔案，再動手。樣式只改 `assets/style.css`，並同步更新本文件第 8 節。

### 完成前檢查清單
- [ ] `python3 -m json.tool data/resources.json` 沒有錯誤
- [ ] `resources/<slug>.html` 存在，檔名＝JSON 的 slug
- [ ] 詳細頁裡搜尋不到雙大括號佔位符
- [ ] 分類是第 6 節清單之一
- [ ] 所有路徑都是相對路徑
- [ ] 首頁能看到新卡片，點進去能開詳細頁，「← 回工具箱」能回首頁
- [ ] `status` 沒有替豆特假裝用過

---

## 10. 不要做的事

- ❌ 不要改動或刪除使用者沒提到的資源。
- ❌ 不要引入框架、建置工具、追蹤碼。
- ❌ 不要捏造套件的 API、安裝指令或使用心得。
- ❌ 不要把詳細頁內容直接寫進 `index.html`（首頁只靠 JSON 產生）。
- ❌ 不要用絕對路徑 `/...`。

---

## 11. 本地預覽

```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```
（直接雙擊 `index.html` 會因為 `fetch` 讀不到 JSON 而顯示空白，請用本地伺服器。）
