// ==========================================================
// Dot's Toolbox — 首頁渲染邏輯
// 資料來源：data/resources.json（新增資源不需要改這個檔案）
// ==========================================================

// 分類清單：要跟 AGENTS.md 第 6 節保持一致
const CATEGORIES = {
  animation: "動畫",
  ui: "介面元件",
  icon: "圖示",
  inspiration: "靈感",
  video: "影片",
  slides: "簡報",
  "ai-tool": "AI 工具",
};

const STATUS = {
  want: "👀 想試試",
  tried: "✋ 用過",
  love: "💛 愛用",
};

const grid = document.getElementById("grid");
const chips = document.getElementById("chips");
const search = document.getElementById("search");
const totalEl = document.getElementById("total");

let resources = [];
let activeCategory = "all";

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function renderChips() {
  const counts = resources.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  const items = [["all", "全部", resources.length]].concat(
    Object.entries(CATEGORIES)
      .filter(([key]) => counts[key])
      .map(([key, label]) => [key, label, counts[key]])
  );

  chips.innerHTML = items
    .map(([key, label, n]) => `
      <button class="chip ${key === activeCategory ? "is-active" : ""}" data-cat="${key}">
        ${label}<span class="count">${n}</span>
      </button>`)
    .join("");
}

function renderCards() {
  const q = search.value.trim().toLowerCase();

  const list = resources.filter((r) => {
    const inCat = activeCategory === "all" || r.category === activeCategory;
    const text = [r.name, r.summary, ...r.tags].join(" ").toLowerCase();
    return inCat && (!q || text.includes(q));
  });

  if (!list.length) {
    grid.innerHTML = `<p class="empty">找不到符合的工具，換個關鍵字試試？</p>`;
    return;
  }

  grid.innerHTML = list
    .map((r) => `
      <a class="card" href="resources/${encodeURIComponent(r.slug)}.html">
        <div class="card-top">
          <span class="tag tag--${r.category}">${CATEGORIES[r.category] || r.category}</span>
          <span class="status">${STATUS[r.status] || ""}</span>
        </div>
        <h2>${escapeHTML(r.name)}</h2>
        <p>${escapeHTML(r.summary)}</p>
        <div class="card-tags">${r.tags.map((t) => `<span>${escapeHTML(t)}</span>`).join("")}</div>
        <span class="card-more">看筆記 →</span>
      </a>`)
    .join("");
}

chips.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeCategory = btn.dataset.cat;
  renderChips();
  renderCards();
});

search.addEventListener("input", renderCards);

fetch("data/resources.json")
  .then((res) => res.json())
  .then((data) => {
    resources = data;
    totalEl.textContent = data.length;
    renderChips();
    renderCards();
  })
  .catch(() => {
    grid.innerHTML = `<p class="empty">資料載入失敗。若是直接開檔案，請改用 <code>python3 -m http.server</code> 預覽。</p>`;
  });
