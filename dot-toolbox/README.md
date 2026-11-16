# Dot's Toolbox｜豆特的網頁工具箱

🔗 網站：https://dot0427.github.io/dot-toolbox/

把我收藏的網頁、動畫、影片、簡報與 AI 工具整理成卡片式知識庫。
每個工具一頁筆記：**它是什麼 → 什麼時候用 → 怎麼開始 → 我的筆記 → 相關連結**。

## 這個專案的重點：`AGENTS.md`

這個 repo 附有一份給 AI 看的 [`AGENTS.md`](./AGENTS.md)（`CLAUDE.md` 會指向它），定義了：

- 專案目的與技術限制（純 HTML/CSS/JS、GitHub Pages、相對路徑）
- 檔案結構與命名規則（slug）
- `data/resources.json` 的欄位格式
- 固定的分類清單
- 詳細頁的五段式格式與模板
- 視覺風格與 AI 工作流程、完成前檢查清單

之後只要對 AI 說：

> 「照 AGENTS.md，把 https://xxx 加進工具箱」

AI 就會新增一筆 JSON ＋ 一頁 `resources/<slug>.html`，格式與風格跟現有頁面一致。

## 本地預覽

```bash
python3 -m http.server 8000
```

---
宜蘭大學資工系 陳玟諺 Dot
