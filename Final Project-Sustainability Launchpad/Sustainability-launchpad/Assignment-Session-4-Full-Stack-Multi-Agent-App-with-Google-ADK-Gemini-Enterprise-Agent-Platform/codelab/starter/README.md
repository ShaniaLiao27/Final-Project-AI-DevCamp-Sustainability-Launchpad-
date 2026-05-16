# 🌱 Sustainability Launchpad

> From "What is ESG?" to your first sustainability report — in 20 minutes.
> A global multi-agent AI platform for SME owners and sustainability newcomers.

🎥 **[Download Demo Video: Learn Mode](https://github.com/user-attachments/files/27863360/1-Sustainability.Launchpad.Demo-Learn.Mode.zip)**

👉 **Live Demo**: [https://content-studio-25xwmvjuzq-uc.a.run.app/](https://content-studio-25xwmvjuzq-uc.a.run.app/)

---

## 🎯 What it does

Two modes, one mission:

- **🎓 Learn Mode** — Plain-language explanations of ESG, SDG, Net Zero, Scope 1-3, with SME case studies and 3-question quizzes
- **✍️ Generate Mode** — Drafts a one-page bilingual sustainability statement for your company, mapped to UN SDGs

Works in **English, 繁體中文, 日本語, Español** — agents auto-detect your input language.

---

## 🏗 Architecture

![Architecture](docs/screenshots/05-architecture.png)

**7 ADK Agents** orchestrated by a master router:

- **Learn**: ConceptExplainer · SMECaseStudy · QuizGrader
- **Generate**: MaterialityAdvisor · ContentDrafter · SDGMapper
- **Shared**: FactChecker (grounds claims in UN, GRI, IFRS, GHG Protocol via MCP Tools)

---

## 🛠 Tech Stack

| Layer | Tech |
| --- | --- |
| **Agents** | Google ADK + Gemini 2.5 Flash |
| **Backend** | FastAPI + Uvicorn (Python 3.11) |
| **Frontend** | React 18 + Vite |
| **Deploy** | Cloud Run + Gemini Enterprise Agent Engine |
| **Tools** | Model Context Protocol (MCP) + Google Search Grounding |

---

## 🚀 Run Locally

```bash
git clone https://github.com/ShaniaLiao27/Final-Project-AI-DevCamp-Sustainability-Launchpad-.git
cd "Final-Project-AI-DevCamp-Sustainability-Launchpad-/Final Project-Sustainability Launchpad/Sustainability-launchpad/Assignment-Session-4-Full-Stack-Multi-Agent-App-with-Google-ADK-Gemini-Enterprise-Agent-Platform/codelab/starter"

# Backend
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # fill in GOOGLE_CLOUD_PROJECT

# Frontend
cd frontend && npm install && cd ..

# Run full-stack
uvicorn backend.api_server:app --reload --port 8000   # terminal 1
cd frontend && npm run dev                            # terminal 2
```

---

## 📚 Data Sources

All factual claims are grounded in authoritative public sources via the FactChecker Agent:
- **UN Sustainable Development Goals** — https://sdgs.un.org/goals
- **GRI Standards** — https://www.globalreporting.org
- **IFRS S1/S2 Sustainability Standards** — https://www.ifrs.org
- **GHG Protocol (Scope 1/2/3)** — https://ghgprotocol.org
- **TCFD Recommendations** — https://www.fsb-tcfd.org

---

## 💡 What I Learned

- Multi-agent isn't about more agents — it's about clear delegation contracts.
- Gemini 2.5 Flash is fast enough for conversational multi-agent flows.
- Cloud Run cold-start is the silent demo killer (fix: `min-instances=1`).
- Grounding LLM outputs in authoritative sources (via MCP) is essential for ESG accuracy to prevent Greenwashing.

---

## 🙏 Acknowledgements

Built on the Multi-Agent Content Creation workshop by **Saoussen Chaabnia** at
[GDG London AI DevCamp 2026](https://aidevcamp.gdg.london).
Personalized into the sustainability domain as my Final Project.

---

## 📄 License

MIT — fork, modify, build your own sustainability tool for your country.

---

## 🖼 Screenshots

### ADK Web Debugging Interface
<details>
<summary>Click to view backend ADK logs and agent interactions</summary>

<img width="100%" alt="adk sample" src="https://github.com/user-attachments/assets/ca2e1e01-f2b5-4a09-975e-d78156bd4ab9" />
<img width="100%" alt="adk web sample 2" src="https://github.com/user-attachments/assets/4daf563d-2b34-415d-b59b-b33b8a55bcb4" />
<img width="100%" alt="adk web sample 3" src="https://github.com/user-attachments/assets/7d150c10-b15a-4415-89fe-b1a337e2fa4b" />
<img width="100%" alt="adk web sample 3-1" src="https://github.com/user-attachments/assets/a5bf0d21-c58e-4001-87d7-8526794ef0c9" />
<img width="100%" alt="adk web sample 4" src="https://github.com/user-attachments/assets/878b3e0e-8bc2-49cf-acd0-6107a1cdb83e" />
<img width="100%" alt="adk web sample 4-1" src="https://github.com/user-attachments/assets/a0a98bc3-98cf-4f32-8fb0-393df3b73c2c" />

</details>

### Production Web Application

#### 🏠 Homepage
<img width="100%" alt="web sample 0" src="https://github.com/user-attachments/assets/399135df-c167-48d4-bec9-ca40bb9d0480" />
<img width="100%" alt="web sample 0-1" src="https://github.com/user-attachments/assets/aaf46cd4-49db-4681-bcf4-225e6e05c442" />
<img width="100%" alt="web sample 1" src="https://github.com/user-attachments/assets/671d1c86-681a-4731-b679-7503a0cfa27f" />

#### 🎓 Learn Mode
<img width="100%" alt="web sample 1-1" src="https://github.com/user-attachments/assets/0e081d72-72f2-42f8-96be-48b1779ce050" />
<img width="100%" alt="web sample 1-2" src="https://github.com/user-attachments/assets/f4078d9a-9c65-4ad7-af24-220b8d7ef26f" />

#### ✍️ Generate Mode
<img width="100%" alt="web sample 2" src="https://github.com/user-attachments/assets/79d82b6c-767a-496c-ba5b-0a76a927fcb2" />
<img width="100%" alt="web sample 2-1" src="https://github.com/user-attachments/assets/bacb597c-9d6f-4d67-9de5-e437e417f463" />
<img width="100%" alt="web sample 3" src="https://github.com/user-attachments/assets/cc21a392-1334-4656-87a7-9ab4ca74b197" />
<img width="100%" alt="web sample 3-1" src="https://github.com/user-attachments/assets/8ed57406-a6ec-472f-b008-b275b91fc2b9" />
<img width="100%" alt="web sample 3-2" src="https://github.com/user-attachments/assets/976626a0-61cb-49f7-bf66-65f548cc3e1a" />
