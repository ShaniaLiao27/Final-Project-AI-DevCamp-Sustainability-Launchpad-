# 🌱 MASTER PLAYBOOK — Sustainability Launchpad
**Final Project · AI DevCamp 2026 · GDG London**

> 一份從零到繳交的完整執行手冊。照著這份做，3 天內可完成。

---

## 📌 專案最終樣貌

**Sustainability Launchpad** — 一個全球可用的多語 AI 平台，協助任何國家的中小企業老闆與永續新人，從「不懂 ESG」到「能寫出第一份永續聲明」。

- 🌍 **全球定位**：英文預設介面，使用者輸入任何語言（中、英、日、西、法...），agent 自動以同語言回應
- 🎓 **兩種模式**：Learn Mode（學習）+ Generate Mode（生成）
- 🤖 **7 個 Agent**：Google ADK + Gemini 2.5 Flash
- ☁️ **部署**：Cloud Run + Gemini Enterprise Agent Engine

---

## 📦 三件必交（GDG London 評核項目）

| 項目 | 規格 | 怎麼產出 |
| --- | --- | --- |
| **1. GitHub Repository** | Public repo，含完整 README、架構圖、`.env.example`、部署網址 | Phase 1-4 + Phase 6 |
| **2. Screenshots** | 至少 5 張，展示 UI、agent 互動、SDG 對應、架構圖 | Phase 5 |
| **3. Video Demo** | 2-3 分鐘英文影片，展示 Learn + Generate 兩種模式 | Phase 5 |

---

## 🗺 全程地圖（3 天）

```
DAY 1（今天 5/16 晚 + 5/17）        DAY 2（5/18）              DAY 3（5/19 = Demo Day）
─────────────────────────         ─────────────────         ─────────────────────
Phase 0: Prep (30 min)            Phase 4: Deploy (2h)      Phase 6: Submit (1h)
Phase 1: Clone & Run (1h)         Phase 5a: Screenshots(1h) Demo Day @ Skyscanner
Phase 2: Build Agents (3h)        Phase 5b: Video (2h)
Phase 3: Frontend (2h)            
```

---

# Phase 0 · 環境準備（30 分鐘）

**目標**：確認電腦上所有東西都裝好。

### 0.1 必裝清單

```bash
# 檢查每一個是否裝好
python3.11 --version   # 應顯示 3.11.x
node --version         # 應顯示 v18 以上
gcloud --version       # 應顯示 Google Cloud SDK
git --version          # 應顯示 git version
```

缺哪個就裝哪個：
- **Python 3.11**：https://www.python.org/downloads/
- **Node.js 18+**：https://nodejs.org/
- **gcloud CLI**：https://cloud.google.com/sdk/docs/install
- **Git**：通常 macOS / Linux 已內建

### 0.2 下載 Antigravity

到 https://antigravity.google/ 下載對應作業系統版本 → 安裝 → 用 `brianhsieh850410@gmail.com` 登入。

### 0.3 確認 Google Cloud Project 與 Credits

```bash
# 登入
gcloud auth login

# 列出你的 project
gcloud projects list

# 設定預設 project（用你 Week 1 拿 credit 的那個）
gcloud config set project YOUR_PROJECT_ID

# 啟用必要 API（一次性，可能要 2-3 分鐘）
gcloud services enable \
  aiplatform.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com

# 設定 application default credentials（ADK 必須）
gcloud auth application-default login
```

✅ **Phase 0 完成檢查**：上面所有指令都跑通 → 進 Phase 1。

---

# Phase 1 · Clone 你的 Repo 並跑通原版（1 小時）

**目標**：先確認原版 Content Creator Studio 能跑起來，再開始改。

### 1.1 在 Antigravity Clone Repo

打開 Antigravity → `Cmd/Ctrl + Shift + P` → 輸入 `Git: Clone` → 貼網址：

```
https://github.com/ShaniaLiao27/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform.git
```

存到 `~/Documents/aidevcamp/sustainability-launchpad`（取個短一點的資料夾名）。

### 1.2 建分支，保護 main

```bash
cd ~/Documents/aidevcamp/sustainability-launchpad
git checkout -b final-project
```

> 從現在開始所有改動都在 `final-project` 分支，main 保持原版。

### 1.3 裝相依套件

```bash
# Python 後端
python3.11 -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -U google-adk          # 確保用最新版 ADK

# 前端（如果有 frontend/ 資料夾）
cd frontend
npm install
cd ..
```

### 1.4 設定環境變數

```bash
cp .env.example .env
```

打開 `.env`，填入：
```env
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=True
```

### 1.5 跑通原版 ADK Web UI

```bash
adk web
```

打開瀏覽器 → http://localhost:8000 → 左上 dropdown 應該看到原本的 Master Orchestrator → 隨便輸入 "write a blog post about coffee" 測試 → 確認有回應。

✅ **Phase 1 完成檢查**：原版能跑、會回應 → 進 Phase 2。
❌ **如果跑不起來**：跳到本文件最後的「Troubleshooting」。

---

# Phase 2 · 用 Antigravity Agent 自動建好永續 Agents（3 小時）

**目標**：在 `backend/agents/sustainability/` 底下產生 7 個新 agent，**完全用 Antigravity 的 Agent Chat 幫你做**，你只需要複製貼 prompt 給它。

### 2.1 給 Antigravity 一份「專案說明書」

在專案根目錄新增檔案 `AGENTS.md`（如果沒有的話）：

```markdown
# Project Context for Antigravity Agents

## What I'm building
Sustainability Launchpad — a global multi-agent AI platform built on Google ADK + Gemini.
Helps SME owners worldwide learn sustainability concepts (Learn Mode) and generate
their first sustainability statement (Generate Mode).

## Target users
- SME owners aged 35-60 in any country
- Sustainability newcomers (students, career switchers)
- No technical background, no ESG background
- Multilingual: respond in whatever language the user types

## Stack
- Backend: Python 3.11, google-adk, FastAPI, Uvicorn
- Frontend: React 18, Vite
- LLM: Gemini 2.5 Flash via Vertex AI
- Deploy: Cloud Run + Gemini Enterprise Agent Engine

## Architecture (target)
- New folder: backend/agents/sustainability/
  - master_router.py (ModeRouterAgent)
  - learn/ (concept_explainer, sme_case_study, quiz_grader)
  - generate/ (materiality_advisor, content_drafter, sdg_mapper)
  - shared/ (fact_checker)

## Coding conventions
- Default language for all agent outputs: English
- Auto-detect user input language and respond in same language
- Always cite sources for facts (UN SDG, GRI, IFRS, GHG Protocol)
- No greenwashing — claims must be achievable and verifiable

## Working rules
- All changes on branch `final-project`
- Don't modify deploy.py infrastructure logic
- After each agent file, run `python -c "from backend.agents.sustainability import root_agent; print(root_agent)"` to verify imports
```

存檔。Antigravity 會自動讀。

### 2.2 第一個 Antigravity Agent Prompt — 建立目錄結構

按 `Cmd/Ctrl + L` 打開 Antigravity Agent Chat，貼這段：

```
Create the directory structure for the sustainability agents:

backend/agents/sustainability/
├── __init__.py
├── master_router.py
├── learn/
│   ├── __init__.py
│   ├── concept_explainer.py
│   ├── sme_case_study.py
│   └── quiz_grader.py
├── generate/
│   ├── __init__.py
│   ├── materiality_advisor.py
│   ├── content_drafter.py
│   └── sdg_mapper.py
└── shared/
    ├── __init__.py
    └── fact_checker.py

Create all __init__.py files as empty for now. Create the .py files with just a
module docstring placeholder. After creation, list the files you created.
```

等 Antigravity 跑完 → review 它建立的檔案 → commit：
```bash
git add backend/agents/sustainability/
git commit -m "scaffold: sustainability agents folder structure"
```

### 2.3 第二步：填入 7 個 agent 的程式碼

打開 `07_Agent_Code_v2_Global.md`（下一份檔案，英文優先雙語版），把每個 agent 的程式碼**分別**貼給 Antigravity Agent Chat：

```
Please put this code into backend/agents/sustainability/master_router.py:

[貼上 master_router.py 的完整程式碼]

After saving, verify the import works by running:
python -c "from backend.agents.sustainability.master_router import sustainability_master; print(sustainability_master.name)"
```

7 個 agent 全部都這樣做（master_router 最後做，因為它要 import 其他 6 個）。

順序：
1. `shared/fact_checker.py`
2. `learn/concept_explainer.py`
3. `learn/sme_case_study.py`
4. `learn/quiz_grader.py`
5. `generate/materiality_advisor.py`
6. `generate/content_drafter.py`
7. `generate/sdg_mapper.py`
8. `master_router.py`（最後，把上面 7 個都 import 進來）
9. `sustainability/__init__.py`（最後一行加 `from .master_router import sustainability_master as root_agent`）

每加完一個 agent，commit 一次：
```bash
git add backend/agents/sustainability/
git commit -m "feat: add ConceptExplainerAgent"
```

### 2.4 第三步：本機測試

```bash
adk web
```

打開 http://localhost:8000，左上 dropdown 選 `sustainability`（或 `SustainabilityMaster`）。

**測試對話 1（英文）**：
```
What is Scope 1, 2, 3? I run a small coffee shop.
```
✅ 應該看到 ConceptExplainerAgent 用英文回應、舉咖啡店例子。

**測試對話 2（中文）**：
```
什麼是 ESG？我開三家手搖飲店
```
✅ 應該自動切換成繁體中文回應、舉手搖飲例子。

**測試對話 3（生成模式）**：
```
Help me draft a sustainability statement. My company: "Sunny Bakery", a 15-employee bakery in London.
```
✅ 應該看到 MaterialityAdvisor → ContentDrafter → SDGMapper 依序回應，最後輸出英文版聲明 + SDG 對應。

如果任何 agent 回應不如預期，把問題貼給 Antigravity：
```
The QuizGraderAgent didn't ask 3 questions, it only asked 1.
Please review backend/agents/sustainability/learn/quiz_grader.py and fix the instruction
so it always generates exactly 3 questions (1 multiple choice + 1 true/false + 1 short answer).
```

✅ **Phase 2 完成檢查**：三個測試對話都正確 → 進 Phase 3。

---

# Phase 3 · 前端改造（2 小時）

**目標**：把 React 前端改成有「Learn / Generate」兩個按鈕的全球版 UI，加語言選單。

### 3.1 找到前端入口

```bash
cd frontend
ls src/
```
找到 `App.tsx` 或 `App.jsx`（主元件）。

### 3.2 用 Antigravity 改造首頁

按 `Cmd/Ctrl + L`，貼這段給 Agent：

```
Redesign frontend/src/App.tsx (or .jsx) to be the Sustainability Launchpad homepage.

Requirements:
1. Title: "🌱 Sustainability Launchpad"
2. Tagline: "From 'What is ESG?' to your first sustainability report — in 20 minutes."
3. Two big buttons centered on the page:
   - "🎓 Learn Mode" (green primary button) - routes to /learn
   - "✍️ Generate Mode" (green outline button) - routes to /generate
4. Top-right corner: a language selector dropdown (EN / 中文 / 日本語 / Español)
   - Selecting a language just changes the UI text; agent auto-detects from user input
5. Color scheme: white background, green primary #2E7D32, accent gold #FFC107
6. Footer: "Built with Google ADK · GDG London AI DevCamp 2026"
7. Mobile responsive

Use existing Tailwind classes (don't add new dependencies). Reuse the existing chat
component for /learn and /generate routes — only the homepage needs to be new.

After implementing, run `npm run dev` and verify the homepage loads at
http://localhost:5173 with the two buttons visible.
```

### 3.3 改 title 與 favicon

打開 `frontend/index.html`，找 `<title>` 改成 `Sustainability Launchpad`，favicon 換成 🌱 emoji（可以用 https://favicon.io/emoji-favicons/seedling 免費生成）。

### 3.4 測試完整流程（後端 + 前端）

開兩個 terminal：

**Terminal 1（後端）**：
```bash
source .venv/bin/activate
uvicorn api_server:app --reload --port 8000
```

**Terminal 2（前端）**：
```bash
cd frontend && npm run dev
```

打開 http://localhost:5173 → 應該看到新首頁 → 點 Learn Mode → 對話測試 → 點 Generate Mode → 對話測試。

✅ **Phase 3 完成檢查**：前端兩個按鈕都能進對話、agent 回應正常 → 進 Phase 4。

Commit：
```bash
git add frontend/
git commit -m "feat: bilingual homepage with Learn/Generate mode buttons"
```

---

# Phase 4 · 部署到 Google Cloud（2 小時）

**目標**：把專案部署到公開網址，這個網址會出現在 README 與 demo video 裡。

### 4.1 部署 agents 到 Gemini Enterprise Agent Engine

```bash
python deployment/deploy.py
```

成功後會印出類似：
```
✅ Agent deployed: projects/your-proj/locations/us-central1/reasoningEngines/xxxxx
```
**記下這個 resource name**，會用到。

### 4.2 部署後端 + 前端到 Cloud Run

```bash
bash deployment/deploy-combined.sh
```

第一次部署 15-20 分鐘，會印出：
```
✅ Service URL: https://sustainability-launchpad-xxxxx-uc.a.run.app
```
**記下這個 URL**，這是你 demo 用的網址。

### 4.3 驗證部署

```bash
# Health check
curl https://YOUR-URL/health

# 瀏覽器打開
open https://YOUR-URL    # macOS
# Windows: 直接複製貼到瀏覽器
```

✅ 應該看到你的新首頁，能對話。

### 4.4 設定 min-instances（避免 cold start）

```bash
gcloud run services update sustainability-launchpad \
  --min-instances=1 \
  --region=us-central1
```

> 這會稍微多花一點 credit，但 demo 時不會卡 10 秒等冷啟動。

✅ **Phase 4 完成檢查**：公開 URL 能對話、回應夠快 → 進 Phase 5。

---

# Phase 5 · Screenshots + Video Demo（3 小時）

**完整教學在 `08_Screenshot_Video_Capture_Guide.md`**，這裡是快速版。

### 5a · Screenshots（1 小時）

**必拍 5 張**：

1. **Homepage**（首頁）—— 兩個大按鈕、語言選單清楚可見
2. **Learn Mode Conversation**（學習對話）—— ConceptExplainer 用英文解釋 Scope 1, 2, 3，畫面要看得到 agent 名稱
3. **Quiz interaction**（測驗互動）—— QuizGrader 出 3 題後使用者作答，看到批改結果
4. **Generate Mode Output**（生成輸出）—— 完整的 sustainability statement + SDG 對應，含 SDG 圖示
5. **Architecture Diagram**（架構圖）—— 用 draw.io 或 Excalidraw 畫，輸出 PNG

**截圖工具**：
- Mac：`Cmd + Shift + 4`（框選）
- Windows：`Win + Shift + S`
- 全平台：[Lightshot](https://app.prntscr.com/)

**存到**：`docs/screenshots/` 資料夾，檔名 `01-homepage.png` `02-learn-mode.png` ...

### 5b · Video Demo（2 小時）

**規格**：
- 長度：2:30 ~ 3:00
- 解析度：1080p 以上
- 旁白：英文（GDG London 是英文社群）
- 字幕：可加可不加，加分項

**講稿 6 大段**：

| 時間 | 段落 | 內容 |
| --- | --- | --- |
| 0:00–0:20 | Hook | "By 2026, even small businesses face ESG pressure. My uncle's bubble tea shop got told 'no ESG score, no loan'. He doesn't know what ESG is." |
| 0:20–0:40 | Problem & Solution | "Two problems: he doesn't understand the vocabulary, and he can't afford a consultant. I built Sustainability Launchpad to help him do both." |
| 0:40–1:30 | Learn Mode Demo | 切到瀏覽器 → 輸入 "What is Scope 1, 2, 3? I run a bubble tea shop" → 看 agent 解釋 + 案例 + quiz |
| 1:30–2:20 | Generate Mode Demo | 點 Generate → 輸入公司資料 → 看 materiality + draft + SDG mapping 跑出來 |
| 2:20–2:45 | Tech Highlights | "7 ADK agents, Gemini 2.5 Flash, fact-checker grounds claims in UN/GRI/IFRS sources, deployed on Cloud Run" |
| 2:45–3:00 | Close | "Try it at [URL]. Built with GDG London AI DevCamp 2026. Thanks." |

**錄影工具**：
- **Mac**：QuickTime → File → New Screen Recording → 開麥克風
- **Windows**：[OBS Studio](https://obsproject.com/)（免費）
- **全平台超簡單**：[Loom](https://www.loom.com/)（免費版 5 分鐘內，足夠）

**後製**：
- 不需要剪輯。一次錄成。
- 如果說錯就重來
- 錄完上傳 YouTube（unlisted）或 Loom，把連結放到 README

✅ **Phase 5 完成檢查**：5 張 PNG + 1 個影片連結 → 進 Phase 6。

---

# Phase 6 · README + 提交（1 小時）

### 6.1 把這份 README 貼進 repo

打開 `README.md`，**全部刪掉**，貼這段：

```markdown
# 🌱 Sustainability Launchpad

> From "What is ESG?" to your first sustainability report — in 20 minutes.
> A global multi-agent AI platform for SME owners and sustainability newcomers.

[![Demo Video](docs/screenshots/01-homepage.png)](YOUR_YOUTUBE_OR_LOOM_LINK)

👉 **Live Demo**: https://sustainability-launchpad-xxxxx-uc.a.run.app

---

## 🎯 What it does

Two modes, one mission:

- **🎓 Learn Mode** — Plain-language explanations of ESG, SDG, Net Zero, Scope 1-3, with SME case studies and 3-question quizzes
- **✍️ Generate Mode** — Drafts a one-page bilingual sustainability statement for your company, mapped to UN SDGs

Works in **English, 繁體中文, 日本語, Español** — agents auto-detect your input language.

---

## 🖼 Screenshots

| Homepage | Learn Mode | Generate Mode |
| --- | --- | --- |
| ![](docs/screenshots/01-homepage.png) | ![](docs/screenshots/02-learn-mode.png) | ![](docs/screenshots/04-generate-mode.png) |

---

## 🏗 Architecture

![Architecture](docs/screenshots/05-architecture.png)

**7 ADK Agents** orchestrated by a master router:

- **Learn**: ConceptExplainer · SMECaseStudy · QuizGrader
- **Generate**: MaterialityAdvisor · ContentDrafter · SDGMapper
- **Shared**: FactChecker (grounds claims in UN, GRI, IFRS, GHG Protocol)

---

## 🛠 Tech Stack

| Layer | Tech |
| --- | --- |
| Agents | Google ADK + Gemini 2.5 Flash |
| Backend | FastAPI + Uvicorn (Python 3.11) |
| Frontend | React 18 + Vite |
| Deploy | Cloud Run + Gemini Enterprise Agent Engine |
| Tools | google_search (web grounding) |

---

## 🚀 Run Locally

```bash
git clone https://github.com/ShaniaLiao27/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform.git
cd Assignment-Session-4-...

# Backend
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # fill in GOOGLE_CLOUD_PROJECT

# Frontend
cd frontend && npm install && cd ..

# Run with ADK web UI
adk web

# Or run full-stack
uvicorn api_server:app --reload --port 8000   # terminal 1
cd frontend && npm run dev                    # terminal 2
```

---

## 📚 Data Sources

All factual claims are grounded in authoritative public sources:
- UN Sustainable Development Goals — https://sdgs.un.org/goals
- GRI Standards — https://www.globalreporting.org
- IFRS S1/S2 Sustainability Standards — https://www.ifrs.org
- GHG Protocol (Scope 1/2/3) — https://ghgprotocol.org
- TCFD Recommendations — https://www.fsb-tcfd.org

---

## 💡 What I Learned

- Multi-agent isn't about more agents — it's about clear delegation contracts
- Gemini 2.5 Flash is fast enough for conversational multi-agent flows
- Cloud Run cold-start is the silent demo killer (fix: min-instances=1)
- Grounding LLM outputs in authoritative sources is essential for ESG accuracy

---

## 🙏 Acknowledgements

Built on the Multi-Agent Content Creation workshop by **Saoussen Chaabnia** at
[GDG London AI DevCamp 2026](https://aidevcamp.gdg.london).
Personalized into the sustainability domain as my Final Project.

---

## 📄 License

MIT — fork, modify, build your own sustainability tool for your country.
```

把所有 `YOUR_...` 換成你的真實連結。

### 6.2 加 `.env.example`（如果沒有）

```env
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=True
```

⚠️ **絕對不要 commit 真的 `.env`**。檢查 `.gitignore` 有沒有 `.env`，沒有就加。

### 6.3 確認 screenshots 上傳到 repo

```bash
git add docs/screenshots/
git add README.md
git add .env.example
git commit -m "docs: add README, screenshots, env example for submission"
```

### 6.4 Merge 回 main + tag

```bash
git checkout main
git merge final-project
git tag v1.0-demo-day
git push origin main --tags
```

### 6.5 確認 GitHub repo 是 Public

打開 https://github.com/ShaniaLiao27/Assignment-Session-4-... → Settings → 滑到最下面 → 確認是 Public。

### 6.6 提交到 GDG 平台

打開 https://aidevcamp.gdg.london/submit（你最初給我的網址）→ 登入 → 填表：

| 欄位 | 內容 |
| --- | --- |
| Project Name | Sustainability Launchpad |
| GitHub URL | https://github.com/ShaniaLiao27/Assignment-Session-4-... |
| Live Demo URL | https://sustainability-launchpad-xxxxx-uc.a.run.app |
| Video Demo URL | YouTube / Loom 連結 |
| Description | 從 README 第一段複製貼上 |

按送出。

✅ **Phase 6 完成**：你的 Final Project 已提交！

---

# 🆘 Troubleshooting（最常見 8 個問題）

| 問題 | 解法 |
| --- | --- |
| `ImportError: cannot import name 'LlmAgent'` | `pip install -U google-adk` 升級到最新版 |
| `adk web` 沒看到 sustainability agent | 確認 `backend/agents/sustainability/__init__.py` 有 `from .master_router import sustainability_master as root_agent`，且從 repo root 跑 `adk web` |
| sub_agent 不會自動 chain | 在 master_router instruction 裡寫 "After concept_explainer responds, automatically delegate to sme_case_study_agent" |
| 前端跑起來但打不到後端 | 檢查 `frontend/.env` 或 `vite.config.js` 的 proxy 是否指到 `http://localhost:8000` |
| Cloud Run 502/503 | GCP Console → Cloud Run → 點 service → Logs，看 stack trace。最常見：環境變數沒帶到。修：`gcloud run services update SVC --set-env-vars GOOGLE_CLOUD_PROJECT=xxx` |
| Agent 回應太慢 | 已設 min-instances=1？切換到 `gemini-2.0-flash` 更快 |
| `deploy.py` 失敗 with permission error | `gcloud projects add-iam-policy-binding YOUR_PROJECT --member="user:brianhsieh850410@gmail.com" --role="roles/aiplatform.user"` |
| 不知道為什麼 agent 回中文不回英文 | Prompt 裡明確寫 "Default to English unless user writes in another language. Detect language from the user's most recent message." |

---

# 📁 你的檔案總覽

| 檔案 | 用途 | 什麼時候看 |
| --- | --- | --- |
| **`00_MASTER_PLAYBOOK.md`** | 主執行手冊（這份） | **每天都看** |
| `01_Final_Project_規格書.md` | 早期的規格書 | 已被 00 取代，可參考 |
| `02_GitHub_Repo_修改建議.md` | 早期修改建議 | 已整合進 00 |
| `03_Antigravity_操作SOP.md` | Antigravity 操作細節 | Phase 0-1 卡關時看 |
| `04_永續專案_完整策略書.md` | 永續策略思考過程 | 想理解「為什麼這樣設計」時看 |
| `05_永續Agent程式碼骨架.md` | 第一版中文偏重 agent code | 已被 07 取代 |
| `06_DemoDay_講稿與投影片.md` | 現場 demo 講稿（中英混合） | Demo Day 前一晚看 |
| **`07_Agent_Code_v2_Global.md`** | **英文優先雙語 agent code** | **Phase 2 用，每個 agent 從這裡複製** |
| **`08_Screenshot_Video_Capture_Guide.md`** | **拍攝完整指南** | **Phase 5 用** |

---

# ✅ 最終 Checklist（出發前）

- [ ] GitHub repo 是 public 且 main 分支有最新 code
- [ ] README.md 含 demo URL + video link + 5 張 screenshot
- [ ] `.env.example` 有，`.env` 沒被 commit
- [ ] 線上 demo URL 能用、能對話、回應正常
- [ ] Video demo 上傳完成（YouTube unlisted 或 Loom）
- [ ] GDG 平台已提交
- [ ] 一張投影片做好（PDF 備份在 USB）
- [ ] Demo Day 攜帶清單準備好（筆電、充電器、轉接頭、熱點）

完成所有勾選 = 你已經完成 AI DevCamp 2026 Final Project 🎉
