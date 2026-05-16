# Final Project 規格書
**AI DevCamp 2026 · GDG London · Build with AI**

繳交對象：GDG London AI DevCamp 2026
作者：Shania Liao
專案 Repo：https://github.com/ShaniaLiao27/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform

---

## 1. 課程要求對照

根據 AI DevCamp 2026 課程大綱，Week 3（5/7）要做 Project Showcase，Week 4（5/19）在 Skyscanner 現場 Demo Day 並領證書。Final Project 必須展示這四週學到的核心能力：

| 課程主題 | Final Project 必須證明 |
| --- | --- |
| Week 1 · Agent 基礎 | 至少 2 個 agent，使用 perceive → reason → act 迴圈 |
| Week 2 · MCP & Deployment | 接一個 MCP Server 或 Tool，並部署到雲端 |
| Week 2 · Google ADK & Vertex AI | 用 Google ADK 寫 multi-agent，部署到 Vertex AI / Agent Engine 或 Cloud Run |
| Week 3 · A2A Protocol | 加分：至少兩個 agent 透過 A2A 互相溝通 |

你目前的 repo（Multi-Agent Content Creation Studio）已經符合 Week 1、Week 2 的所有要求。**Final Project 的關鍵是「個人化」與「部署成功」**，因為這個 repo 是從官方 workshop 衍生出來的，光是跑起來不夠突出，要加上自己的 twist。

---

## 2. 推薦的 Final Project 主題

在現有 Content Creation Studio 的骨架上，加入一個有具體應用場景的「主題」。以下三個都是可行方向，選一個你最有共鳴的：

### 方向 A：旅遊內容創作助理（推薦給初學者）
把 Content Creation Studio 改造成「旅遊部落格 / IG 內容自動生成器」。
- 使用者輸入：「東京 5 天 4 夜美食行程」
- Agent 自動產出：blog 文章 + IG caption + 短影音腳本 + SEO metadata
- 加分點：接 Google Maps MCP 或 Google Search，自動抓店家資訊

### 方向 B：個人品牌內容工廠
針對 LinkedIn / Medium 的個人品牌經營。
- 使用者輸入：一個主題（例：「AI agents in healthcare」）
- Agent 自動產出：LinkedIn post + Medium 長文 + Twitter thread + Newsletter
- 加分點：加一個 ToneAgent 模仿使用者的寫作風格

### 方向 C：教育內容生成器
針對老師或自學者，從一個概念自動生成完整教材。
- 使用者輸入：「Quantum Computing 入門」
- Agent 自動產出：講義（blog 格式）+ 投影片大綱 + 練習題 + 自評題庫
- 加分點：加一個 DifficultyAgent，根據程度（國中 / 高中 / 大學）自動調整

> **建議選方向 A 或 B**，因為你在 Demo Day 上要對 150+ 人解釋，旅遊或個人品牌的場景大家秒懂，技術評審也會欣賞 MCP 整合。

---

## 3. 系統架構

### 3.1 Agent 分工（最低標準，4 個 agent）

```
┌──────────────────────────────────────────────────┐
│             Master Orchestrator Agent             │
│   （已存在於你的 repo，負責路由使用者請求）         │
└────────────┬─────────────────────────────────────┘
             │
   ┌─────────┼─────────┬─────────────┐
   ▼         ▼         ▼             ▼
┌──────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
│研究  │ │草稿  │ │ 品質檢查  │ │ 你的新   │ ← 自製 agent
│Agent │ │Agent │ │   Agent  │ │ Agent    │   （加分關鍵）
└──────┘ └──────┘ └──────────┘ └──────────┘
   │
   ▼
┌──────────────────────────────┐
│ Google Search MCP / 自製 Tool │
└──────────────────────────────┘
```

「你的新 agent」是 Final Project 的差異化重點，幾個建議：
- **FactCheckerAgent**：用 Google Search 驗證草稿裡的事實
- **TranslatorAgent**：把產出翻成中英日多語
- **ImageBriefAgent**：根據文章內容自動生成「請畫一張…」的繪圖 prompt
- **A2A NegotiatorAgent**：跟另一個外部 agent 透過 A2A 協定協商（直接拿 Week 3 教的內容當亮點）

### 3.2 技術選型（沿用你 repo 現有的）

| 層 | 技術 | 為什麼 |
| --- | --- | --- |
| Agents | Google ADK (Python 3.11) | 課程指定 |
| LLM | Gemini 2.5 Flash via Vertex AI | repo 已配置 |
| Backend | FastAPI + Uvicorn | repo 已配置 |
| Frontend | React 18 + Vite | repo 已配置 |
| 部署 | Cloud Run + Gemini Enterprise Agent Engine | 課程指定 |
| 觀測 | ADK Callbacks + Cloud Logging | 加分項 |

---

## 4. 從現在到 Demo Day 的時程

距離 Demo Day（5/19）還有 3 天，建議這樣分配：

**今天（5/16，週六）— 環境 + 個人化**
- 在 Antigravity 把 repo 跑起來（見「03_Antigravity_SOP.md」）
- 決定最終主題（A / B / C 三選一）
- 修改 Master Orchestrator 與所有 sub-agent 的 prompt，讓它符合你選的主題

**明天（5/17，週日）— 加自己的 Agent**
- 新增至少 1 個你自己設計的 agent（FactChecker / Translator / ImageBrief 三選一）
- 串到 Master Orchestrator
- 本機測試對話流程

**5/18（週一）— 部署 + 錄 Demo**
- 部署後端到 Cloud Run，agents 部署到 Agent Engine
- 部署前端 React 到 Cloud Run
- 錄一段 2 分鐘 demo 影片（備用）
- 寫好 README 與架構圖

**5/19（週二）— Demo Day**
- 攜帶筆電 + 充電器到 Skyscanner
- 準備 3 分鐘現場 demo 講稿
- 留聯絡方式給 mentor

---

## 5. 繳交與展示 Checklist

繳交（GitHub repo 必須有）：
- [ ] README.md 寫清楚：題目、demo 連結、架構圖、安裝步驟
- [ ] 一張系統架構圖（手畫 + 拍照也可，或用 draw.io）
- [ ] `.env.example` 列出需要的環境變數（**不要 commit 真實 API key**）
- [ ] 一段 30 秒～2 分鐘的 demo 影片或 GIF 嵌在 README
- [ ] 部署網址（Cloud Run URL）放在 README 最上面

Demo Day 現場：
- [ ] 3 分鐘故事線：問題 → 你的方案 → 即時 demo → 學到什麼
- [ ] 一張投影片（標題 + QR code 連到 GitHub）
- [ ] 備用：如果現場網路爛，準備 GIF / 影片

---

## 6. 評分自評表（給自己打分用）

| 項目 | 分數 |
| --- | --- |
| Multi-agent（≥3 個 agent，有協調者） | __/20 |
| 至少一個 Tool / MCP 整合 | __/15 |
| 部署到 Vertex AI / Cloud Run 成功 | __/20 |
| 個人化程度（不是直接 fork workshop） | __/20 |
| Demo 講得清楚 | __/15 |
| 加分：A2A protocol | __/10 |
| **總分** | **__/100** |

目標：**80 分以上**。

---

## 7. 風險與備案

| 風險 | 備案 |
| --- | --- |
| Vertex AI 部署失敗 | 改部署到純 Cloud Run，用 ADK 的 `adk web` 本機介面 demo |
| Cloud credits 用完 | 改用 Google AI Studio 的免費 Gemini API key（功能略少但能跑） |
| 現場網路爛 | 帶手機開熱點 + 預錄 demo 影片 |
| 時間不夠加自製 agent | 至少改 prompt 讓 8 個 agent 變成你的主題版本，視覺上換 logo + 配色 |
