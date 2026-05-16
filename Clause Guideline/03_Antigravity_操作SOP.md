# Antigravity 操作 SOP
**目標**：在 Google Antigravity 裡 clone 你的 repo → 本機跑起來 → 改功能 → 部署到 Vertex AI / Cloud Run。

> Antigravity 是 Google 在 2026 推出的「agentic IDE」。Google 官方文件明確支援用 Antigravity 開發 ADK agent（跟 Gemini CLI、Cursor、Claude Code 並列）。

---

## Step 0：前置準備（10 分鐘）

需要先有：
1. **Google Cloud 帳號** + 一個 GCP Project（你應該在 Week 1 拿 cloud credits 時已經建好）
2. **gcloud CLI** 安裝好：https://cloud.google.com/sdk/docs/install
3. **Python 3.11**（你 repo 的 `.python-version` 指定）
4. **Node.js 18+**（前端需要）
5. **Antigravity 下載安裝**：https://antigravity.google/ → 下載對應作業系統版本

第一次打開 Antigravity 時，用 Google 帳號登入（用你拿 cloud credit 的同一個帳號 `brianhsieh850410@gmail.com`）。

---

## Step 1：在 Antigravity 開啟你的 Repo（5 分鐘）

### 方法 A：直接 Clone（推薦）

1. 打開 Antigravity
2. 左上選單 → `File` → `Clone Repository`（或按 `Cmd/Ctrl + Shift + P` → 輸入 `Git: Clone`）
3. 貼上：
   ```
   https://github.com/ShaniaLiao27/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform.git
   ```
4. 選一個本機資料夾（建議 `~/Documents/aidevcamp/`）
5. Clone 完成 → 點「Open Folder」

### 方法 B：先用 terminal clone

```bash
cd ~/Documents
mkdir aidevcamp && cd aidevcamp
git clone https://github.com/ShaniaLiao27/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform.git assignment-session-4
```

然後在 Antigravity 裡 `File → Open Folder` → 選 `assignment-session-4`。

---

## Step 2：讓 Antigravity 認識你的專案（3 分鐘）

這是 Antigravity 跟一般 IDE 最大的差別 —— 它有 agent 在幫你寫 code，所以要先給它「專案說明書」。

在專案根目錄建一個 `AGENTS.md`（如果沒有的話），內容如下：

```markdown
# Project Context for Antigravity Agents

## What this project does
A full-stack multi-agent content creation studio built with Google ADK and Gemini.
Master Orchestrator routes user requests to specialized sub-agents:
- TopicResearchAgent (uses google_search)
- ContentDrafter
- QualityChecker
- ContentImprover (LoopAgent)
- Publisher agents: BlogPostWriter, SocialMediaCreator, EmailNewsletterWriter
- SEOMetadataAgent
- ContentAnalyzerAgent

## Stack
- Backend: Python 3.11, ADK, FastAPI, Uvicorn
- Frontend: React 18, Vite
- Deploy: Cloud Run + Gemini Enterprise Agent Engine

## How to run locally
1. cp .env.example .env  (fill in GOOGLE_CLOUD_PROJECT and credentials)
2. pip install -r requirements.txt
3. cd frontend && npm install && npm run dev   (port 5173)
4. uvicorn api_server:app --reload --port 8000

## When making changes
- Always run on the `final-project` branch
- Run `pytest` before commit if tests exist
- Don't modify deploy.py infrastructure logic — only PROJECT_ID
```

存檔。之後跟 Antigravity 對話時，它就會自動讀這份說明。

---

## Step 3：安裝相依套件（10 分鐘）

打開 Antigravity 底下的 Terminal（`View → Terminal` 或 `Ctrl + ` ` `）：

```bash
# 1. 切到 final-project 分支（保護 main）
git checkout -b final-project

# 2. 建 Python 虛擬環境
python3.11 -m venv .venv
source .venv/bin/activate   # Windows 用：.venv\Scripts\activate

# 3. 安裝後端套件
pip install -r requirements.txt

# 4. 安裝前端套件
cd frontend
npm install
cd ..
```

如果 `pip install` 失敗，最常見原因是 Python 版本不對。檢查：
```bash
python --version  # 必須是 3.11.x
```

---

## Step 4：設定 Google Cloud 認證（10 分鐘）

```bash
# 1. 登入 gcloud（會開瀏覽器）
gcloud auth login

# 2. 設定 application default credentials（ADK 需要）
gcloud auth application-default login

# 3. 設定預設 project（換成你的 project ID）
gcloud config set project YOUR_PROJECT_ID

# 4. 啟用必要的 API（一次性，可能要 1-2 分鐘）
gcloud services enable aiplatform.googleapis.com \
                       run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com
```

然後複製 `.env.example` → `.env`，填入：
```
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GENAI_USE_VERTEXAI=True
```

---

## Step 5：本機跑起來（5 分鐘）

### 用 ADK 內建的 web UI（最快測試）

```bash
adk web
```

打開 http://localhost:8000，選 `master_orchestrator`，就能直接跟 agent 對話。

### 用完整 full-stack（後端 + 前端）

開兩個 terminal：

**Terminal 1（後端）：**
```bash
source .venv/bin/activate
uvicorn api_server:app --reload --port 8000
```

**Terminal 2（前端）：**
```bash
cd frontend
npm run dev
```

打開 http://localhost:5173 看你的 React UI。

---

## Step 6：用 Antigravity 的 Agent 幫你改功能（核心）

這是 Antigravity 的殺手鐧 —— 不是你自己改 code，是叫 agent 幫你改。

按 `Cmd/Ctrl + L` 打開右側的 Agent Chat，試試這些 prompt：

### 範例 1：加一個新的 agent
```
請在 backend/agents/ 底下新增一個 FactCheckerAgent。
它要使用 google_search tool，
輸入是一篇文章草稿，
輸出是 JSON 格式的 fact check 結果（每個 claim 標記 verified true/false 和 source URL）。
寫好之後把它註冊到 Master Orchestrator 的 sub-agent 清單，
最後跑一次本機測試確認 import 沒壞。
```

### 範例 2：把所有 agent 換成旅遊主題
```
請把 backend/agents/ 底下所有 agent 的 system prompt 改寫成「亞洲旅遊內容創作」的主題。
保留原本的 agent 結構與名稱，只改 instruction 內的描述與範例。
改完列出你修改了哪些檔案。
```

### 範例 3：改前端配色
```
請把 frontend/ 的主題色從預設的藍色改成珊瑚橘 (#FF6F61)，
順便把 index.html 的 title 改成「Travel Content Studio」，
favicon 用 🌴 的 emoji 替代。
```

Antigravity 會「**plan → execute → verify**」三步驟跑完，你看著它做就好。改完一定要 review 才 commit。

---

## Step 7：部署到 Google Cloud（30 分鐘）

你的 repo 已經有 `deploy.py` 和 `deploy-combined.sh`，幾乎不用自己寫。

### 7.1 部署 agents 到 Gemini Enterprise Agent Engine（前 Vertex AI Agent Engine）

```bash
python deployment/deploy.py
```

成功的話會回傳一個 Agent Engine 的 resource name，記下來。

### 7.2 部署後端 + 前端到 Cloud Run

```bash
bash deployment/deploy-combined.sh
```

這個 script 會：
1. 用 Cloud Build 打包 Docker image
2. 推到 Artifact Registry
3. 部署到 Cloud Run
4. 印出公開 URL

**第一次部署可能 15-20 分鐘，耐心等。**

### 7.3 驗證部署成功

```bash
# 用 curl 打 health check
curl https://YOUR-CLOUD-RUN-URL/health

# 或直接瀏覽器打開
open https://YOUR-CLOUD-RUN-URL
```

如果 502/503，到 GCP Console → Cloud Run → 點你的 service → Logs 看錯誤訊息。最常見問題是 `.env` 變數沒帶到 Cloud Run，用：
```bash
gcloud run services update YOUR_SERVICE \
  --set-env-vars GOOGLE_CLOUD_PROJECT=your-project,GOOGLE_GENAI_USE_VERTEXAI=True
```

---

## Step 8：Demo Day 前的最後檢查

```bash
# 1. 跑一次完整流程
curl -X POST https://YOUR-URL/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "東京 5 天美食行程"}'

# 2. 把部署網址寫到 README 最上方
# 3. 確認 GitHub repo 是 public（讓評審能看）
# 4. 拍 30 秒影片或 GIF 嵌到 README
```

---

## 常見錯誤排雷

| 錯誤訊息 | 解法 |
| --- | --- |
| `google.auth.exceptions.DefaultCredentialsError` | 重跑 `gcloud auth application-default login` |
| `ModuleNotFoundError: google.adk` | 沒裝 ADK 或沒進 venv，跑 `pip install google-adk` |
| 前端跑起來但打不到後端 | 檢查 `frontend/.env` 的 `VITE_API_BASE_URL` 有沒有指到 `http://localhost:8000` |
| Cloud Run 部署成功但 cold start 慢 | 在 Cloud Run console 設 min-instances=1（會多花一點錢） |
| Agent 回答很慢 | 切換模型 `gemini-2.5-flash` → `gemini-2.0-flash`（更快但稍弱） |
| Antigravity 改 code 改得太激進 | 一律先 `git diff` review，可以叫它「reverse the last change」 |

---

## 學習資源（深度查找）

| 主題 | 連結 |
| --- | --- |
| ADK 官方文件 | https://google.github.io/adk-docs/ |
| ADK Coding with AI（含 Antigravity） | https://google.github.io/adk-docs/tutorials/coding-with-ai/ |
| Antigravity + Spec-kit codelab | https://codelabs.developers.google.com/sdd-adk-antigravity |
| Multi-agent 範例 codelab | https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk |
| 你正在上的課程頁面 | https://aidevcamp.gdg.london |

---

## 一句話總結

**Clone → 開 venv 裝套件 → `gcloud` 認證 → `adk web` 本機測 → 跟 Antigravity 講話改功能 → 跑 `deploy.py` 上雲。**

卡住任何一步都可以回來找我，我可以針對錯誤訊息 debug。
