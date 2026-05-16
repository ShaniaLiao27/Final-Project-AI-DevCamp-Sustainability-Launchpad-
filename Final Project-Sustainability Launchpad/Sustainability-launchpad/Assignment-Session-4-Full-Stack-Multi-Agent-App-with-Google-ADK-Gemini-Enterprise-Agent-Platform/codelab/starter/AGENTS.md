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
