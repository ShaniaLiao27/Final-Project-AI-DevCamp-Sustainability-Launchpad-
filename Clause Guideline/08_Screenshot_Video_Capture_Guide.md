# 📸 Screenshot + 🎬 Video Capture Guide
**For GDG London AI DevCamp 2026 Final Project Submission**

> Three deliverables required: GitHub repo, screenshots, video demo.
> This guide covers the screenshot + video pieces in detail.

---

## 🎯 The Big Picture

| Deliverable | Quantity | Purpose |
| --- | --- | --- |
| Screenshots | **5 required, 7 recommended** | Embed in README + submission portal |
| Video | **1 video, 2:30–3:00 min** | Show working demo on YouTube/Loom |

Both should look **professional but not over-produced**. Reviewers want to see your work, not a Hollywood movie.

---

# Part 1 · Screenshots (1 hour)

## 1.1 Setup Before Capturing

**Browser prep**:
- Use **Chrome** (cleanest UI for screenshots)
- Open an **Incognito window** (no extensions, no bookmarks bar)
- Set zoom to **100%** (Cmd/Ctrl + 0)
- Window size: **1440 × 900** (standard demo size)
- Hide tabs you don't need

**Pre-load 2 conversations** so screenshots look authentic:
- One Learn Mode conversation about Scope 1, 2, 3
- One Generate Mode conversation for "Sunny Bakery, London"

**Tools**:
- **Mac**: `Cmd + Shift + 4` (drag to select), `Cmd + Shift + 5` (full screen with options)
- **Windows**: `Win + Shift + S` (Snipping Tool)
- **Cross-platform**: [Lightshot](https://app.prntscr.com/) or [CleanShot X](https://cleanshot.com/) (Mac)

---

## 1.2 The 5 Required Screenshots

### 📸 Screenshot 1 — Homepage
**File**: `docs/screenshots/01-homepage.png`

**What to capture**:
- Full browser viewport showing the homepage
- The 🌱 Sustainability Launchpad logo/title
- Both "🎓 Learn Mode" and "✍️ Generate Mode" buttons clearly visible
- The language selector in top-right
- The tagline visible

**Composition tips**:
- Browser address bar should show your **Cloud Run URL** (this proves it's deployed)
- No browser dev tools open
- Hide bookmarks bar

---

### 📸 Screenshot 2 — Learn Mode Conversation
**File**: `docs/screenshots/02-learn-mode.png`

**Setup the conversation first**:
1. Click "Learn Mode"
2. Type: `What is Scope 1, 2, 3? I run a small coffee shop in Portland.`
3. Wait for full response (concept + case study)

**What to capture**:
- The user's question at the top
- The full agent response showing:
  - One-line definition
  - 3-bullet explanation
  - "Why it matters" section
- **Agent name visible** ("ConceptExplainerAgent" or similar label) — this proves multi-agent
- Scroll to show the most informative section

**Bonus**: capture the SMECaseStudyAgent response below if visible.

---

### 📸 Screenshot 3 — Quiz Interaction
**File**: `docs/screenshots/03-quiz.png`

**Setup**:
1. Continue from Screenshot 2
2. Type: `Yes, give me a quiz`
3. Wait for 3 questions to appear
4. Type your answers: `1.B 2.True 3.Carbon emitted from operations the company controls`
5. Wait for grading

**What to capture**:
- The 3 quiz questions
- Your answers
- The grading result showing ✅ / ❌ marks
- The final "Score: X/3" + next concept suggestion

> If the conversation is too long, split into two screenshots (3a-quiz-questions.png, 3b-quiz-grading.png).

---

### 📸 Screenshot 4 — Generate Mode Output
**File**: `docs/screenshots/04-generate-mode.png`

**Setup**:
1. Go to homepage → click "Generate Mode"
2. Type: `Help me draft a sustainability statement. Company: Sunny Bakery, 15 employees, London UK. We bake bread and pastries, deliver to local cafés.`
3. Wait for materiality → drafter → SDG mapper to all complete

**What to capture**:
- The drafted sustainability statement (English version)
- The SDG alignment table showing 3-5 SDG cards
- Scroll if needed to fit the most impressive part in viewport

> This is the **money shot** — make sure the SDG icons + KPI numbers are clearly visible.

---

### 📸 Screenshot 5 — Architecture Diagram
**File**: `docs/screenshots/05-architecture.png`

**Not a screenshot of the app** — a diagram you make.

**Tools**:
- [Excalidraw](https://excalidraw.com/) (free, hand-drawn style — recommended)
- [draw.io](https://app.diagrams.net/) (free, professional style)
- [Figma](https://www.figma.com/) (if you know it)

**Minimum elements**:

```
┌────────────────────────────────┐
│   User (any language)          │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────┐
│   React Frontend (Cloud Run)   │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────┐
│   FastAPI Backend (Cloud Run)  │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────┐
│   SustainabilityMaster          │
│   (ADK Orchestrator)            │
└──────┬──────────────┬───────────┘
       ↓              ↓
  [Learn Mode]   [Generate Mode]
       ↓              ↓
 ┌─────────────┐ ┌─────────────┐
 │ Concept     │ │ Materiality │
 │ Explainer   │ │ Advisor     │
 │ + SME Case  │ │ + Drafter   │
 │ + Quiz      │ │ + SDG Map   │
 └─────────────┘ └─────────────┘
       ↓              ↓
   ┌──────────────────────┐
   │  FactChecker (shared) │
   │  + google_search      │
   └──────────────────────┘
               ↓
   ┌──────────────────────┐
   │  Gemini 2.5 Flash    │
   │  via Vertex AI       │
   └──────────────────────┘
```

**Export as PNG** at 1920×1080 minimum.

---

## 1.3 Bonus Screenshots (Recommended)

### 📸 Screenshot 6 — Multilingual Demo
**File**: `docs/screenshots/06-multilingual.png`

Show the app responding in **two different languages** (e.g. English + Chinese, or English + Spanish) side by side. Use browser split view or stitch in [Canva](https://www.canva.com/).

This proves your "global" claim.

---

### 📸 Screenshot 7 — Agent Logs / Trace
**File**: `docs/screenshots/07-agent-trace.png`

If `adk web` has a debug/trace view showing agent-to-agent delegation, capture it. This shows reviewers you understand multi-agent flow.

Alternatively: open Cloud Logging in GCP Console, filter to your Cloud Run service, screenshot a trace showing multiple agents being called.

---

## 1.4 Screenshot Quality Checklist

For every screenshot:
- [ ] Resolution at least 1440 × 900
- [ ] PNG format (not JPG)
- [ ] File size under 1 MB (compress with [TinyPNG](https://tinypng.com/) if larger)
- [ ] No personal info visible (real email, real API keys, etc.)
- [ ] Browser URL shows the deployed Cloud Run URL (proves it's live)
- [ ] No dev tools / inspector visible
- [ ] Cropped to remove unnecessary whitespace

---

# Part 2 · Video Demo (2 hours)

## 2.1 Video Specs

| Spec | Value |
| --- | --- |
| Length | **2:30 – 3:00** (don't go over 3:00) |
| Resolution | 1080p minimum (1920×1080) |
| Frame rate | 30 fps OK |
| Audio | Clear English narration (your voice) |
| Subtitles | Optional but adds polish |
| Format | MP4 (h.264) |
| Hosting | YouTube (unlisted) OR Loom (free tier) |

---

## 2.2 Choose Your Recording Tool

### Option A: QuickTime (Mac, free, simplest) ⭐ Recommended for beginners
1. Open QuickTime Player
2. File → New Screen Recording
3. Click the dropdown arrow → enable your microphone
4. Click Record → select the area or full screen
5. Stop with the menu bar icon
6. Export → 1080p

### Option B: Loom (cross-platform, free, easiest sharing)
1. Sign up at https://www.loom.com (use Google account)
2. Install desktop app or Chrome extension
3. Record → "Screen + Cam" or "Screen Only"
4. Auto-uploads to Loom, get a shareable link
5. Free tier limits videos to 5 min — plenty for 3 min

### Option C: OBS Studio (full control, free, Windows/Mac/Linux)
- For pros. Skip unless you already know OBS.

---

## 2.3 The Script (memorize the flow, not the words)

### Setup Before Recording

1. **Close all apps** except Chrome and your recording tool
2. **Open Chrome incognito** with the Cloud Run URL pre-loaded
3. **Pre-type** your first message into a notes file to copy-paste (avoids typos on camera)
4. **Test microphone** with a 5-second recording first
5. **Put phone on silent**
6. **Tell housemates** not to interrupt for 10 min

### The 3-Minute Script

```
═══════════════════════════════════════
[0:00 – 0:15] HOOK
═══════════════════════════════════════

[Screen: your homepage already loaded]

"Hi, I'm Shania. By 2026, even small businesses face ESG pressure —
banks, customers, regulators are asking for sustainability info.
But most small business owners have no idea where to start."

═══════════════════════════════════════
[0:15 – 0:35] PROBLEM & SOLUTION
═══════════════════════════════════════

[Screen: still on homepage, mouse hovers between two buttons]

"So I built Sustainability Launchpad — a multi-agent AI platform
that helps SME owners around the world do two things: learn
sustainability vocabulary, and generate their first sustainability
statement. Let me show you."

═══════════════════════════════════════
[0:35 – 1:25] LEARN MODE DEMO
═══════════════════════════════════════

[Click "Learn Mode"]

"First, learn mode."

[Paste: "What is Scope 1, 2, 3? I run a small coffee shop in Portland"]

"Watch what happens — the master orchestrator routes this to the
Concept Explainer agent."

[Wait for response, mouse highlights the explanation]

"It explains in plain English, then automatically calls another agent
to give a coffee-shop-specific case study."

[Scroll down to show SME case study]

"And it offers a quiz to check understanding."

[Brief: don't actually do the full quiz, just point at it]

═══════════════════════════════════════
[1:25 – 2:20] GENERATE MODE DEMO
═══════════════════════════════════════

[Go back to homepage, click "Generate Mode"]

"Now, generate mode."

[Paste: "Sunny Bakery, 15 employees, London UK. We bake bread,
deliver to local cafés. Help me draft a sustainability statement"]

"This triggers a 3-agent pipeline."

[Wait for materiality response, point at the 5 issues]

"First — the Materiality Advisor identifies the top 5 issues
for a UK bakery based on GRI and UK SECR rules."

[Scroll to drafter output]

"Then the Drafter writes a one-page sustainability statement
with measurable KPIs — not generic greenwashing, real numbers."

[Scroll to SDG mapping]

"And the SDG Mapper aligns it to UN Sustainable Development Goals
with specific Targets."

═══════════════════════════════════════
[2:20 – 2:45] TECH HIGHLIGHTS
═══════════════════════════════════════

[Switch to a slide or just keep on the SDG output]

"Under the hood — 7 ADK agents, Gemini 2.5 Flash, deployed on
Cloud Run plus Gemini Enterprise Agent Engine. Every factual
claim is grounded by a shared FactChecker agent using google_search
against UN, GRI, IFRS, and IPCC sources."

═══════════════════════════════════════
[2:45 – 3:00] CLOSE
═══════════════════════════════════════

"Try it yourself — link in the description. Built during GDG
London AI DevCamp 2026. Thanks for watching."

[End on the homepage with the URL visible in the address bar]
```

### Speaking Tips

- **Pace**: slightly slower than normal conversation
- **Pause** at section breaks (gives editor easy cut points if you re-record)
- **Smile while talking** — comes through in your voice
- **Don't apologize** if you mess up — just restart from the last section
- **Three takes** is normal. Pick the best one.

---

## 2.4 Recording Workflow

```
PASS 1 — Test (5 min)
└ Record 30 seconds, watch it back
└ Fix: mic levels, screen recording area, internet speed (Cloud Run latency)

PASS 2 — Rehearse (10 min)
└ Run through the script aloud 2x without recording
└ Time yourself — aim for 2:30–2:45 (gives 15-30 sec buffer)

PASS 3 — Real recording (30 min, allow for 3 takes)
└ Take 1: get familiar with the flow
└ Take 2: usually the best — natural but practiced
└ Take 3: backup in case Take 2 has an unexpected glitch

PASS 4 — Pick + Upload (30 min)
└ Watch all takes, pick the best
└ Light trim only (cut dead space at start/end)
└ Upload to YouTube (Unlisted) or Loom
└ Add description with GitHub link and live demo URL
└ Copy share link
```

---

## 2.5 Where to Upload

### YouTube (recommended)
1. Go to https://studio.youtube.com
2. Upload → Select file
3. Visibility: **Unlisted** (not Public, not Private)
4. Title: `Sustainability Launchpad — Final Project · GDG London AI DevCamp 2026`
5. Description (paste this):
```
🌱 Sustainability Launchpad — A multi-agent AI platform helping SME owners learn sustainability and generate their first sustainability statement.

Built with Google Agent Development Kit (ADK), Gemini 2.5 Flash, deployed on Cloud Run + Gemini Enterprise Agent Engine.

🔗 GitHub: https://github.com/ShaniaLiao27/Assignment-Session-4-...
🌐 Live demo: https://sustainability-launchpad-xxxxx-uc.a.run.app

Built during GDG London AI DevCamp 2026 (https://aidevcamp.gdg.london)
```

### Loom (alternative, very easy)
- Record directly in browser
- Auto-uploads
- Get shareable link instantly
- Free tier: max 25 videos, 5 min each — fine for this

### ❌ Don't use Google Drive
Sharing settings are confusing and reviewers may get permission errors.

---

## 2.6 Embed Video in README

In your README.md, replace the demo section with:

```markdown
## 🎬 Demo

[![Watch the demo](docs/screenshots/01-homepage.png)](https://youtu.be/YOUR_VIDEO_ID)

👉 **Live demo**: https://sustainability-launchpad-xxxxx-uc.a.run.app
```

This makes the homepage screenshot a clickable thumbnail that plays the video.

---

# Part 3 · Final Submission Package

Before submitting to https://aidevcamp.gdg.london/submit, verify:

## ✅ Submission Checklist

**GitHub Repo**:
- [ ] Public visibility
- [ ] README.md with: tagline, demo video thumbnail, live URL, screenshots, architecture, tech stack, run-locally instructions, data sources, acknowledgements
- [ ] `docs/screenshots/` folder with 5+ PNG files
- [ ] `.env.example` exists, real `.env` is gitignored
- [ ] All commits pushed to `main` branch
- [ ] `v1.0-demo-day` tag created

**Screenshots** (embedded in README + ready to upload separately if asked):
- [ ] 01-homepage.png
- [ ] 02-learn-mode.png
- [ ] 03-quiz.png
- [ ] 04-generate-mode.png
- [ ] 05-architecture.png
- [ ] (bonus) 06-multilingual.png
- [ ] (bonus) 07-agent-trace.png

**Video**:
- [ ] 2:30–3:00 length
- [ ] 1080p
- [ ] Clear English narration
- [ ] Uploaded to YouTube (unlisted) or Loom
- [ ] Shareable URL works in incognito (no permission errors)
- [ ] Linked from README

**Cloud Deployment**:
- [ ] Cloud Run URL is alive and responsive
- [ ] No expired credentials
- [ ] `min-instances=1` set (no cold start)
- [ ] Test from incognito browser one final time

---

# Part 4 · Common Mistakes (Avoid These)

| Mistake | Fix |
| --- | --- |
| Video shows you fumbling with the app | Pre-load conversations before recording |
| Screenshots have your real email visible | Use a test email or blur it before exporting |
| README has "TODO" or placeholder text | Search README for "TODO", "xxx", "your-" before submit |
| GitHub repo private | Settings → bottom → Change visibility → Public |
| Video over 3 minutes | Re-record. Reviewers stop watching at 3 min. |
| Cloud Run URL returns 500 | Check Cloud Run logs, redeploy, verify URL works incognito |
| Video uploaded as "Private" not "Unlisted" | YouTube Studio → video → Edit → change to Unlisted |
| Architecture diagram has typos | Have someone else proofread before exporting |
| All screenshots in same language | Re-take one in a different language to prove "global" claim |

---

# 🎯 Time Budget

| Activity | Time |
| --- | --- |
| Pre-load conversations | 15 min |
| Capture 5 screenshots | 30 min |
| Make architecture diagram | 30 min |
| Compress + organize screenshots | 15 min |
| Practice video script (3 passes) | 30 min |
| Record video (3 takes) | 30 min |
| Pick + upload video | 30 min |
| Update README + push | 15 min |
| **TOTAL** | **~3 hours** |

Block out 3 continuous hours on Day 2 evening or Day 3 morning.
