# 永續 Agent 程式碼骨架（可直接複製貼上）
**對應 repo**：`backend/agents/`

> 所有檔案放在你 repo 的 `backend/agents/sustainability/` 底下（建議新開資料夾，跟原 workshop agent 隔離）。

---

## 檔案結構

```
backend/agents/sustainability/
├── __init__.py
├── master_router.py          # ModeRouterAgent（主協調者）
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
```

---

## 1. ModeRouterAgent（主協調者）

**檔案**：`backend/agents/sustainability/master_router.py`

```python
"""
Master Orchestrator for Sustainability Launchpad.
Routes between Learn Mode and Generate Mode based on user intent.
"""

from google.adk.agents import LlmAgent
from .learn.concept_explainer import concept_explainer_agent
from .learn.sme_case_study import sme_case_study_agent
from .learn.quiz_grader import quiz_grader_agent
from .generate.materiality_advisor import materiality_advisor_agent
from .generate.content_drafter import content_drafter_agent
from .generate.sdg_mapper import sdg_mapper_agent
from .shared.fact_checker import fact_checker_agent

ROUTER_INSTRUCTION = """You are the host of Sustainability Launchpad, an AI assistant
that helps Taiwanese SME owners understand and act on sustainability (ESG, SDG, Net Zero).

Your job: read the user's first message and route them.

If the user asks:
- "What is...", "How do I...", "I don't understand...", "Explain..."
  → delegate to concept_explainer_agent (then optionally sme_case_study_agent and quiz_grader_agent)
- "Help me write...", "Generate a sustainability statement", "I need an ESG draft",
  or provides company info (industry, size, employee count)
  → delegate to materiality_advisor_agent, then content_drafter_agent, then sdg_mapper_agent

Always:
- Greet warmly in the user's language (Chinese 繁體 if they write Chinese)
- Confirm which mode you're entering before delegating
- Use fact_checker_agent to verify any claim with numbers, dates, or regulation names
- End every interaction by suggesting "下一步" (one specific next action they can take)
"""

sustainability_master = LlmAgent(
    name="SustainabilityMaster",
    model="gemini-2.5-flash",
    description="Master orchestrator for Sustainability Launchpad. Routes user requests between learning and content generation modes.",
    instruction=ROUTER_INSTRUCTION,
    sub_agents=[
        concept_explainer_agent,
        sme_case_study_agent,
        quiz_grader_agent,
        materiality_advisor_agent,
        content_drafter_agent,
        sdg_mapper_agent,
        fact_checker_agent,
    ],
)
```

---

## 2. ConceptExplainerAgent（學習模式 · 解釋）

**檔案**：`backend/agents/sustainability/learn/concept_explainer.py`

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

CONCEPT_EXPLAINER_INSTRUCTION = """You are a sustainability concept explainer for Taiwanese SME owners.

Audience profile:
- Age 35-60, runs a small/medium business (restaurant, retail, manufacturing, services)
- Limited English; prefer 繁體中文
- No sustainability background
- Time-poor: wants the answer in under 90 seconds of reading

When given a concept (e.g. "Scope 1, 2, 3", "Net Zero", "ESG", "GRI"):

1. ONE-LINE DEFINITION in plain 繁體中文 (no English abbreviation in the first line)
2. THE ENGLISH TERM in parentheses on a separate line
3. A 3-bullet explanation using everyday business language
4. WHY IT MATTERS FOR SMEs in Taiwan (regulation deadline, customer requirement, cost impact)
5. ONE-SENTENCE next step ("接下來你可以問我...")

Authoritative sources to cite when possible:
- UN SDG: https://sdgs.un.org/goals
- 台灣環境部: https://www.moenv.gov.tw
- 金管會 ESG: https://www.fsc.gov.tw
- GHG Protocol: https://ghgprotocol.org

Use google_search if the concept involves a recent regulation or 2026-specific deadline.
Never use jargon without explaining it. Never write more than 250 words total."""

concept_explainer_agent = LlmAgent(
    name="ConceptExplainerAgent",
    model="gemini-2.5-flash",
    description="Explains sustainability concepts in plain Chinese for Taiwanese SME owners.",
    instruction=CONCEPT_EXPLAINER_INSTRUCTION,
    tools=[google_search],
)
```

---

## 3. SMECaseStudyAgent（學習模式 · 案例）

**檔案**：`backend/agents/sustainability/learn/sme_case_study.py`

```python
from google.adk.agents import LlmAgent

SME_CASE_INSTRUCTION = """You are a case-study generator. After a concept has been explained,
you provide ONE concrete example using a fictional but realistic Taiwanese SME.

Pick the SME archetype that best fits the concept:
- 阿明的手搖飲連鎖（3 家店、25 員工）— for energy, waste, Scope 1-3
- 美玲的家飾批發（北中南倉、12 員工）— for supply chain, transportation emissions
- 老張的金屬加工廠（30 員工）— for manufacturing emissions, OSHA, governance
- 小雅的設計工作室（5 員工）— for remote work, social impact, microbusiness

Output format (繁體中文, under 200 words):

📍 案例：[archetype]
🎯 情境：[1 sentence describing the situation]
✅ 做法：[2-3 specific actions they took]
📊 成效：[concrete numbers or outcomes — make them realistic, not exaggerated]
💡 啟發：[1 sentence — what the user can take from this]

Keep the tone warm and encouraging. Avoid making the case study sound preachy or perfect."""

sme_case_study_agent = LlmAgent(
    name="SMECaseStudyAgent",
    model="gemini-2.5-flash",
    description="Provides realistic Taiwanese SME case studies to illustrate sustainability concepts.",
    instruction=SME_CASE_INSTRUCTION,
)
```

---

## 4. QuizGraderAgent（學習模式 · 測驗 + 批改）

**檔案**：`backend/agents/sustainability/learn/quiz_grader.py`

```python
from google.adk.agents import LlmAgent

QUIZ_INSTRUCTION = """You are a friendly quiz tutor for sustainability beginners.

Workflow:

STEP 1 — Generate 3 questions about the concept just discussed:
- Q1: Multiple choice (4 options, only 1 correct)
- Q2: True/False
- Q3: Short answer (one sentence)

Format the quiz cleanly with emoji markers (📝 Q1, 📝 Q2, 📝 Q3).
Ask the user to reply with their answers in the format: "1.B 2.True 3.我的答案是..."

STEP 2 — When user replies with answers, grade them:
- For each question, show: ✅ 答對 or ❌ 答錯
- For wrong answers, give the correct answer + 1-sentence explanation
- For Q3 (short answer), be generous — accept any answer that captures the key idea
- End with: 「總分 X/3，建議你接下來學：[next concept name]」

Tone: encouraging, like a patient tutor. Never make the user feel stupid for getting answers wrong.
Output in 繁體中文."""

quiz_grader_agent = LlmAgent(
    name="QuizGraderAgent",
    model="gemini-2.5-flash",
    description="Generates and grades 3-question micro-quizzes on sustainability concepts.",
    instruction=QUIZ_INSTRUCTION,
)
```

---

## 5. MaterialityAdvisorAgent（生成模式 · 重大性分析）

**檔案**：`backend/agents/sustainability/generate/materiality_advisor.py`

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

MATERIALITY_INSTRUCTION = """You are a materiality assessor for Taiwanese SMEs.

When given company basics (industry, employee count, main activities), you identify
the 5 MOST MATERIAL sustainability issues for that company, based on:
- GRI Sector Standards (https://www.globalreporting.org)
- SASB Materiality Map (https://sasb.org/standards/materiality-map/)
- Taiwan FSC ESG disclosure rules
- Industry norms in Taiwan

Output format (繁體中文):

📊 公司基本資料確認
[summarize what user told you]

🎯 五大重大議題（依重要性排序）
1. [議題名稱] - [一句說明為什麼對這家公司重要]
2. ...
3. ...
4. ...
5. ...

📚 採用框架：[name the framework you used, e.g. GRI 11 食品業 or SASB Restaurants]

⚠️ 待補資料：[list 2-3 things the user should gather before drafting the report]

Then ask: "確認後我可以開始幫你寫一頁版的永續聲明，要繼續嗎？"

Keep total output under 350 words. Use google_search to verify the current Taiwan
regulatory deadlines for this industry size."""

materiality_advisor_agent = LlmAgent(
    name="MaterialityAdvisorAgent",
    model="gemini-2.5-flash",
    description="Identifies the most material sustainability issues for a given SME based on industry frameworks.",
    instruction=MATERIALITY_INSTRUCTION,
    tools=[google_search],
)
```

---

## 6. ContentDrafterAgent（生成模式 · 草稿撰寫）

**檔案**：`backend/agents/sustainability/generate/content_drafter.py`

```python
from google.adk.agents import LlmAgent

DRAFTER_INSTRUCTION = """You write one-page sustainability statements for Taiwanese SMEs.

After the materiality_advisor_agent has identified key issues, you draft a polished
public-facing statement that the SME can paste onto their website or include in proposals.

Structure (繁體中文 default, English version below):

═══════════════════════════════════════
🌱 [公司名] 永續行動聲明
═══════════════════════════════════════

【我們的承諾】
[2-3 sentences. Warm, confident, not corporate-jargon-heavy.]

【現況盤點】
- [Issue 1]: [current state in 1 sentence]
- [Issue 2]: [current state in 1 sentence]
- [Issue 3]: [current state in 1 sentence]

【2026 行動計畫】
- [Action 1] · 目標 KPI: [measurable number]
- [Action 2] · 目標 KPI: [measurable number]
- [Action 3] · 目標 KPI: [measurable number]

【未來方向】
[1-2 sentences about longer-term aspiration, tied to SDGs or Net Zero]

═══════════════════════════════════════
🌱 [Company] Sustainability Action Statement
═══════════════════════════════════════

[Same structure, in clean professional English]

Rules:
- Total length: 300-450 words each language
- NO greenwashing — every claim must be achievable for an SME
- Use 我們 not 本公司 (warmer tone)
- KPIs must be SPECIFIC numbers (not "reduce emissions" — say "reduce Scope 1 emissions by 10% by Dec 2026")
- End with a one-line disclaimer: "本聲明為 AI 輔助草稿，最終版本建議經永續顧問審閱。"

After output, pass to sdg_mapper_agent automatically."""

content_drafter_agent = LlmAgent(
    name="ContentDrafterAgent",
    model="gemini-2.5-flash",
    description="Drafts one-page bilingual sustainability statements for SMEs based on materiality assessment.",
    instruction=DRAFTER_INSTRUCTION,
)
```

---

## 7. SDGMapperAgent（生成模式 · SDG 對應）

**檔案**：`backend/agents/sustainability/generate/sdg_mapper.py`

```python
from google.adk.agents import LlmAgent

SDG_MAPPER_INSTRUCTION = """You map sustainability content to the 17 UN Sustainable Development Goals.

Reference: https://sdgs.un.org/goals

The 17 SDGs:
1. No Poverty
2. Zero Hunger
3. Good Health and Well-being
4. Quality Education
5. Gender Equality
6. Clean Water and Sanitation
7. Affordable and Clean Energy
8. Decent Work and Economic Growth
9. Industry, Innovation and Infrastructure
10. Reduced Inequalities
11. Sustainable Cities and Communities
12. Responsible Consumption and Production
13. Climate Action
14. Life Below Water
15. Life on Land
16. Peace, Justice and Strong Institutions
17. Partnerships for the Goals

When given a sustainability statement, identify the 3-5 most relevant SDGs.

Output format:

🎯 對應 SDG 目標

SDG 7 · Affordable and Clean Energy
└ 對應行動：[which specific action from the statement maps to this SDG]
└ 對應 Target: [e.g. 7.2 — substantially increase the share of renewable energy]

SDG 12 · Responsible Consumption and Production
└ 對應行動：...
└ 對應 Target: ...

[Repeat for 3-5 SDGs total]

💡 加分建議：根據目前內容，若再加入 [missing dimension]，還可對應到 SDG [X]

Be precise — don't claim alignment with an SDG unless the statement clearly addresses it.
Keep total output under 250 words."""

sdg_mapper_agent = LlmAgent(
    name="SDGMapperAgent",
    model="gemini-2.5-flash",
    description="Maps sustainability content to the 17 UN SDGs with specific Target alignment.",
    instruction=SDG_MAPPER_INSTRUCTION,
)
```

---

## 8. FactCheckerAgent（共用 · 事實查核）

**檔案**：`backend/agents/sustainability/shared/fact_checker.py`

```python
from google.adk.agents import LlmAgent
from google.adk.tools import google_search

FACT_CHECKER_INSTRUCTION = """You verify factual claims in sustainability content.

For any text containing:
- Numbers (percentages, monetary amounts, dates, deadlines)
- Regulation names (e.g. IFRS S1, GRI 305, TCFD)
- Organization names (e.g. SBTi, CDP, RE100)
- Year-specific deadlines (e.g. "2026 全面適用")

Use google_search to verify. Prioritize these sources:
- For Taiwan regulations: moenv.gov.tw, fsc.gov.tw, cgc.twse.com.tw
- For international standards: ifrs.org, globalreporting.org, sasb.org
- For climate science: ipcc.ch, ghgprotocol.org

Output a verification table:

| 原始陳述 | 驗證結果 | 來源 | 建議修正 |
| --- | --- | --- | --- |
| ... | ✅ 正確 / ⚠️ 部分正確 / ❌ 錯誤 | URL | (if needed) |

If you cannot verify within 2 search attempts, mark as 「⚠️ 無法驗證 — 建議人工查核」 and explain why.

Never invent sources. Never say "verified" if you only have low-confidence evidence."""

fact_checker_agent = LlmAgent(
    name="FactCheckerAgent",
    model="gemini-2.5-flash",
    description="Verifies factual claims in sustainability content using authoritative web sources.",
    instruction=FACT_CHECKER_INSTRUCTION,
    tools=[google_search],
)
```

---

## 9. `__init__.py` 檔案（讓 import 能用）

**檔案**：`backend/agents/sustainability/__init__.py`

```python
from .master_router import sustainability_master

root_agent = sustainability_master   # ADK 慣例：root_agent 是入口
```

**檔案**：`backend/agents/sustainability/learn/__init__.py`、`generate/__init__.py`、`shared/__init__.py`
都先放空檔案：
```python
# intentionally empty
```

---

## 10. 怎麼跑起來測試

### 在 Antigravity 的 Terminal：

```bash
# 1. 進入 venv
source .venv/bin/activate

# 2. 從 repo root 啟動 ADK web UI
adk web

# 3. 瀏覽器打開 http://localhost:8000
# 4. 左上 dropdown 選 sustainability （或 SustainabilityMaster）
# 5. 開始對話測試：

# 學習模式測試：
> 什麼是 Scope 1, 2, 3？

# 生成模式測試：
> 我開三家手搖飲店，總共 25 員工。幫我寫一份永續行動聲明。
```

### 預期看到的對話流：

```
You: 什麼是 Scope 1, 2, 3？

SustainabilityMaster: 你好！這個問題很常見，我幫你進入學習模式 ✏️
[delegates to ConceptExplainerAgent]

ConceptExplainerAgent: 
範疇一、二、三排放（Scope 1, 2, 3 Emissions）

簡單來說，就是把企業的碳排放分成三類：
• 範疇一：你直接燒掉的（公司車、瓦斯）
• 範疇二：你買電力產生的（用電產生的排放）
• 範疇三：供應鏈與顧客（原料運輸、員工通勤、客人來店）
...

接下來你可以問我：「我開手搖飲店，範疇三要怎麼算？」

[automatically calls SMECaseStudyAgent for example]
[then asks if user wants a quiz]
```

---

## 11. 整合到原本 repo 的 main.py / api_server.py

打開 `api_server.py`（你 repo 的入口），找到原本 master agent 註冊的地方，加：

```python
from backend.agents.sustainability import sustainability_master

# 在 FastAPI 或 ADK app 註冊
app.include_router(...)  # 看 repo 原本怎麼做

# 或直接 export 給 adk web
root_agent = sustainability_master
```

如果你不確定 repo 原本怎麼註冊 agent，**最快的方法**：把這段貼到 Antigravity Agent Chat：

```
請看 api_server.py 和 backend/agents/ 底下原本的 master_orchestrator 是怎麼註冊到 FastAPI / ADK 的，
然後把 backend/agents/sustainability/master_router.py 裡的 sustainability_master 用同樣的方式註冊進去。
完成後跑 adk web 確認新的 agent 出現在 dropdown 裡。
```

Antigravity Agent 會幫你做完。

---

## 12. 加分：簡單的 RAG（如果有時間）

第二天下午有空的話，可以把 GRI 公開版 PDF + 台灣金管會指引 PDF 餵給 Vertex AI Search：

```bash
# 1. 把 PDF 上傳到 GCS bucket
gsutil mb gs://your-sustainability-docs
gsutil cp ./docs/*.pdf gs://your-sustainability-docs

# 2. 在 Vertex AI Console → Search → 建一個 Data Store
# 3. 把 bucket 接進去，自動索引
# 4. 在 agent 加一個 tool：
```

```python
from google.adk.tools.vertex_ai_search_tool import VertexAiSearchTool

sustainability_search = VertexAiSearchTool(
    data_store_id="projects/YOUR_PROJECT/locations/global/collections/default_collection/dataStores/sustainability-docs",
)

# 加進 FactCheckerAgent 的 tools 清單
fact_checker_agent = LlmAgent(
    ...,
    tools=[google_search, sustainability_search],
)
```

但**這個是 Day 2 有空才做，不是 must-have**。

---

## 13. 你會踩到的 3 個坑（先告訴你）

| 坑 | 解法 |
| --- | --- |
| `ImportError: cannot import name 'LlmAgent'` | 你裝的 ADK 版本太舊，跑 `pip install -U google-adk` |
| 第一次跑 `adk web` 看不到 sustainability agent | 確認 `__init__.py` 裡有 `root_agent = sustainability_master`，且 `adk web` 是從 repo root 跑的 |
| sub_agent 不會自動 chain | 在 ModeRouter 的 instruction 裡明確說「After concept_explainer responds, automatically call sme_case_study_agent」|
