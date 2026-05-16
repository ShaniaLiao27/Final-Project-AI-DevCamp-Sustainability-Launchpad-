# GitHub Repo 修改建議
**Repo**：[Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform](https://github.com/ShaniaLiao27/lassignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform)

---

## 0. 重要前提

你目前的 repo 是從 Saoussen Chaabnia 在 Week 2 教的 workshop 衍生出來的，**架構非常完整**（11 個 notebook、orchestrator、sub-agent、deployment script 都有）。但這代表：

> 如果評審看到 5 個學生 repo 長得一模一樣，分不出來誰是誰。

所以下面所有的修改建議，重點都不在「加多少功能」，而在「讓這個 repo 看起來明顯是你的」。

---

## 1. 必改：個人化（最少改動，最大效果）

### 1.1 換掉所有 agent 的 system prompt

打開 `backend/agents/` 底下每一個 agent 檔，把 system prompt 改成你選的主題版本。

例如原本可能是：
```python
TOPIC_RESEARCH_PROMPT = """You are a research agent. Search for information on the given topic..."""
```

改成（以「旅遊內容」主題為例）：
```python
TOPIC_RESEARCH_PROMPT = """You are a travel research specialist for Asian destinations.
When given a destination, you research:
- Local food specialties (especially street food)
- Hidden gems that tourists usually miss
- Practical info: best season, transport, average cost
Always cite the source URL for every fact."""
```

8 個 agent 全部都這樣改，工作量小但 demo 出來的效果完全不一樣。

### 1.2 改 Master Orchestrator 的開場白

找 `backend/agents/master_orchestrator.py`（或類似的檔），把它的歡迎訊息與 instruction 改成你的主題：
```python
WELCOME = "Hi! I'm your AI travel content assistant. Tell me a destination and I'll create a complete content package for you."
```

### 1.3 改前端 UI 文案 + 配色

`frontend/src/` 底下：
- 改 `App.tsx`（或 `App.jsx`）的標題
- 換掉 `index.html` 的 `<title>` 和 favicon
- 改 Tailwind 或 CSS 主色（找 `theme` 或 `primary` 關鍵字）

> 預算只給 10 分鐘的話，就只改標題 + favicon + 主色，視覺上就會完全不像原版。

---

## 2. 建議加：一個你自己設計的 Agent（差異化關鍵）

在 `backend/agents/` 新增一個檔，例如 `fact_checker_agent.py`：

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

fact_checker_agent = LlmAgent(
    name="FactCheckerAgent",
    model="gemini-2.5-flash",
    description="Verifies factual claims in drafted content using web search.",
    instruction="""You receive a draft article. Your job:
1. Extract every factual claim (dates, numbers, names, prices).
2. Use google_search to verify each one.
3. Return a JSON list: [{claim, verified: true/false, source_url, correction?}]
4. Flag any claim you cannot verify within 2 search attempts.""",
    tools=[google_search],
)
```

然後在 Master Orchestrator 裡把它加進 sub-agent 清單，讓使用者可以說「幫我 fact check 這篇文章」就會 route 到它。

這一個 agent 就能讓你的專案在 demo 時有個獨特賣點：「我的 multi-agent 系統會自動驗證自己寫的內容」。

---

## 3. 建議加：MCP Server 整合（再加分）

Week 2 第一堂 Renuka 講了 MCP，但 Content Creation Studio 原版只用了 `google_search` tool。建議至少接一個真的 MCP server：

**最簡單**：用官方的 [Filesystem MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)，讓 agent 可以把產出的文章直接存到 `outputs/` 資料夾。

**更亮眼**：接 [Notion MCP](https://github.com/makenotion/notion-mcp-server) 或 Google Drive MCP，讓 agent 把生成的內容直接寫進你的 Notion / Drive。

在 `backend/main.py` 或 agent 設定處加：
```python
from google.adk.tools.mcp_tool import MCPToolset, StdioServerParameters

notion_mcp = MCPToolset(
    connection_params=StdioServerParameters(
        command="npx",
        args=["-y", "@notionhq/notion-mcp-server"],
        env={"NOTION_API_KEY": os.environ["NOTION_API_KEY"]},
    ),
)
```

---

## 4. 必加：README 大改寫

目前 README 看起來像 workshop 講義。改成「我的專案」的口吻。建議結構：

```markdown
# [你的專案名稱]
> 一句話描述：例如「給旅遊部落客的 AI 內容生成工廠」

## 🎬 Demo
[嵌一張 GIF 或 Loom 影片連結]
👉 **線上 demo**：https://your-cloud-run-url.run.app

## ✨ 特色
- 4 個專職 agent 協作（Research / Drafter / FactChecker / Publisher）
- 接 Google Search + Notion MCP
- 部署在 Cloud Run + Gemini Enterprise Agent Engine

## 🏗 架構
[放架構圖]

## 🚀 本機跑起來
\`\`\`bash
git clone https://github.com/ShaniaLiao27/...
cd ...
cp .env.example .env  # 填入你的 GOOGLE_API_KEY
pip install -r requirements.txt
uvicorn api_server:app --reload
\`\`\`

## 🧑‍💻 我學到什麼
- ADK 的 SequentialAgent vs ParallelAgent 取捨
- MCP 在 multi-agent 系統的角色
- Cloud Run 冷啟動對 agent 反應速度的影響

## 致謝
基於 GDG London AI DevCamp 2026 的 Session 4 教材（Saoussen Chaabnia）。
```

最後一段「致謝」很重要 —— 誠實標註基於 workshop，但 README 通篇是你的觀點，評審就會看到你的成長。

---

## 5. 必加：架構圖

用 [draw.io](https://app.diagrams.net/) 或 [Excalidraw](https://excalidraw.com/) 畫一張，輸出成 PNG 放到 `docs/architecture.png`，README 裡引用。

最簡單的架構圖只需要 3 層：
```
[User · React Frontend]
        ↓
[FastAPI Backend on Cloud Run]
        ↓
[Master Orchestrator (ADK)]
   ↓        ↓        ↓
[Research][Drafter][FactChecker] ←→ [MCP / Google Search]
```

---

## 6. 該動 vs 不該動

| 項目 | 動作 |
| --- | --- |
| `backend/agents/*.py` 的 prompt | ✅ 改 |
| `frontend/src/App.*` 文案與配色 | ✅ 改 |
| README.md | ✅ 大改 |
| 新增 1 個你自己的 agent | ✅ 加 |
| 接 1 個 MCP | ✅ 加（如果有時間） |
| `requirements.txt` 鎖定的版本 | ❌ 不要動，會踩雷 |
| Dockerfile | ❌ 不要動，除非要加新套件 |
| `deploy.py` / `deploy-combined.sh` | ❌ 不要動結構，只改裡面的 `PROJECT_ID` |

---

## 7. Git 操作建議

```bash
# 建一個 final-project 分支再動，main 保持乾淨
git checkout -b final-project

# 提交時用有意義的訊息
git commit -m "feat: add FactCheckerAgent with google_search verification"
git commit -m "refactor: rebrand agents for travel content domain"
git commit -m "docs: rewrite README with demo link and architecture"

# Demo Day 前一天 merge 回 main
git checkout main
git merge final-project
git tag v1.0-demo-day
git push origin main --tags
```

這樣 commit history 也是你 demo 的素材：mentor 看你的 commit 就知道你真的有動腦改。
