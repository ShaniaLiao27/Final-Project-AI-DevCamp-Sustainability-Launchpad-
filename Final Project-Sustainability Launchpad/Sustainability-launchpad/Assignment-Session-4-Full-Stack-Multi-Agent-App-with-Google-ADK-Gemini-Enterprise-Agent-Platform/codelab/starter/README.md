# 🌱 Sustainability Launchpad

> From "What is ESG?" to your first sustainability report — in 20 minutes.
> **GDG London AI DevCamp 2026 - Final Project Submission**

Sustainability Launchpad is a bilingual, multi-agent AI platform built to help SME (Small and Medium Enterprise) owners worldwide understand global sustainability standards and draft their own ESG statements. 

## 🏆 Key Technologies Used

This project was built strictly adhering to the Workshop requirements, fully adopting the following technologies:
1. **Full-Stack Multi-Agent App**: React UI + FastAPI Backend + Google ADK Agent orchestration.
2. **Google ADK & Gemini Agent Platform**: Deployed to Vertex AI Agent Engine using the `google-adk` framework.
3. **Sub-agent Architecture**: Utilizing a hierarchical structure where a `MasterRouter` orchestrates 7 specialized sub-agents.
4. **MCP (Model Context Protocol)**: Integrated a custom Python MCP Server (`mcp_server.py`) to provide real-time global ESG frameworks and Carbon Footprint estimations, connected via ADK's `McpToolset`.

---

## 🏗️ Architecture

The platform consists of a single **Master Orchestrator Agent** and 7 specialized **Sub-Agents**, categorized into modes:

*   **`master_router.py`**: The Orchestrator. Analyzes the user's intent and routes them to the appropriate sub-agent seamlessly.
*   **🎓 Learn Mode Agents**:
    *   `ConceptExplainer`: Explains ESG/SDG terms without jargon.
    *   `SMECaseStudy`: Provides real-world examples of SMEs implementing sustainability.
    *   `QuizGrader`: Interactive learning via short quizzes.
*   **✍️ Generate Mode Agents**:
    *   `MaterialityAdvisor`: Helps identify which ESG topics are most relevant to the user's industry.
    *   `SDGMapper`: Aligns business goals with the UN Sustainable Development Goals.
    *   `ContentDrafter`: Drafts a professional, actionable sustainability statement.
*   **🛡️ Shared Agents**:
    *   `FactChecker`: Powered by **MCP**, it verifies claims against global standards (IFRS, GRI, SEC) and estimates carbon footprints.

---

## 🚀 Live Demo

- **Frontend/Backend Cloud Run URL:** `[YOUR_CLOUD_RUN_URL_HERE]`

---

## 🛠️ Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google Cloud CLI configured with Vertex AI access

### 1. Backend Setup
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd backend
uvicorn api_server:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. MCP Server (Optional standalone run)
```bash
cd backend/agents/sustainability_agent
python mcp_server.py
```

## 🔒 Security
- API Keys and `AGENT_RESOURCE_NAME` are securely stored in `.env`.
- `.env` is explicitly ignored via `.gitignore` to prevent secret leakage.

---
*Built with ❤️ for GDG London AI DevCamp 2026*
