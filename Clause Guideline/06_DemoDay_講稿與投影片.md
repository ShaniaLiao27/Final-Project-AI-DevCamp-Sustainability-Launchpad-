# Demo Day 講稿與投影片
**5/19（週二）· Skyscanner HQ, London · 6:00 PM**

---

## 1. 投影片（單張，就一張）

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   🌱  SUSTAINABILITY LAUNCHPAD                              │
│                                                              │
│   給中小企業老闆與永續新人的 AI 夥伴                          │
│   From "What is ESG?" to a published sustainability report   │
│   in 20 minutes.                                             │
│                                                              │
│                                                              │
│   ┌──────────────┐         ┌──────────────┐                │
│   │  🎓 LEARN    │         │  ✍️ GENERATE │                │
│   │  Mode        │         │  Mode        │                │
│   └──────────────┘         └──────────────┘                │
│                                                              │
│                                                              │
│   7 ADK Agents · Gemini 2.5 Flash · Cloud Run               │
│                                                              │
│                                                              │
│   ┌─────────┐                          Shania Liao          │
│   │ QR Code │   github.com/ShaniaLiao27/...                 │
│   │         │   demo: launchpad-xxx.run.app                 │
│   └─────────┘                          GDG London 2026      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**設計重點**：
- 一張 = 一個 message。不要塞 10 張投影片，現場時間根本不夠
- QR code 用 [qr-code-generator.com](https://www.qr-code-generator.com/) 免費生成，指向你的 GitHub repo
- 配色：白底 + 綠色 (#2E7D32) 主色，跟永續主題一致
- 用 Google Slides 做，存 PDF 備用

---

## 2. 3 分鐘 Demo 講稿

### ⏱ 0:00–0:20 · 鉤子（Hook）

> "Hi everyone, I'm Shania.
>
> Quick question — by 2026, Taiwan requires all listed companies to disclose sustainability under IFRS S1. But what about the 1.6 million small and medium businesses?
>
> My uncle runs three bubble tea shops. His banker just told him: 'No ESG score, no loan renewal.'
>
> He doesn't know what ESG means."

**動作**：站定、看評審、不要看投影片。

---

### ⏱ 0:20–0:40 · 問題與方案

> "There are two problems here:
>
> One — he doesn't understand sustainability vocabulary.
> Two — even if he understood, he can't afford a 50,000 NTD consultant to write a report.
>
> So I built Sustainability Launchpad — a multi-agent AI that helps SME owners do both: **learn**, and then **generate** their first sustainability statement."

**動作**：投影片在這時亮起來。

---

### ⏱ 0:40–1:50 · 現場 Demo（70 秒，最關鍵）

> "Let me show you. I'll play the role of my uncle."

切到瀏覽器（Cloud Run URL 已預先打開）。

**Demo Step 1 — Learn Mode（30 秒）**

打字：「什麼是 Scope 1, 2, 3？我開手搖飲店」

> "Watch the master orchestrator — it routes this to learn mode, calls the explainer agent, then automatically pulls in a bubble-tea-shop case study, and offers a quiz."

等回應出現，**用滑鼠 highlight** SME 案例那一段。

> "Notice the example is in Chinese, uses my uncle's industry, and ends with a quiz. He'd actually read this."

**Demo Step 2 — Generate Mode（40 秒）**

點「我想寫」按鈕，輸入：
「公司名：明珍茶飲。產業：手搖飲連鎖。員工 25 人。三家門市。」

> "Now generate mode. The materiality agent picks the top 5 issues for bubble tea shops — energy, packaging waste, labor practices. The drafter writes a one-page statement in both Chinese and English. The SDG mapper tags it to SDGs 7, 8, 12."

當 output 跑出來，**用滑鼠拉到 SDG 對應那段**。

> "And here — every claim with a number gets verified by the fact-checker agent against Taiwan EPA and FSC sources."

---

### ⏱ 1:50–2:30 · 技術重點

切回投影片。

> "Under the hood: 7 agents built with Google ADK and Gemini 2.5 Flash, orchestrated by a master router using delegation pattern.
>
> The interesting design decision was **separating learn and generate into parallel agent trees** — they share a fact-checker, but otherwise operate independently. This means I can swap out one mode without touching the other.
>
> Deployed on Cloud Run plus Gemini Enterprise Agent Engine. Cold start was painful at first — I set min-instances to 1 to fix it."

---

### ⏱ 2:30–3:00 · 收尾 + Call to Action

> "Three things I learned this DevCamp:
>
> One — multi-agent isn't just about more agents. It's about clear delegation.
> Two — Gemini 2.5 Flash is fast enough for real-time conversations.
> Three — ESG is the domain where AI can do the most good, fastest.
>
> If you know an SME owner who needs this, the QR code is on screen.
> Thank you."

**動作**：站定、微笑、不要 say sorry、等掌聲。

---

## 3. 備案 · 如果網路斷了

切到備用模式：

> "Real-life demo gods — let me show you the pre-recorded version."

播放 2 分鐘預錄影片（事先存在桌面）。

錄影工具推薦：
- Mac：QuickTime → 螢幕錄影 → 加旁白
- 全平台：[Loom](https://www.loom.com/)（免費版夠用）

錄影時要：
- 1080p 以上
- 滑鼠移動慢一點
- 旁白用中文錄（國際場合可加英文字幕）

---

## 4. 講稿練習表（5/18 晚上練）

| 練習次數 | 目標 | 自我檢查 |
| --- | --- | --- |
| 第 1 次 | 對著鏡子說，計時 | 有沒有超過 3 分 30 秒？ |
| 第 2 次 | 對著手機錄影 | 看回放：有沒有「呃」「然後」太多次？ |
| 第 3 次 | 給家人或朋友聽 | 他們有聽懂「為什麼這個 app 重要」嗎？ |
| 第 4 次 | 完整 dry run（含 demo） | Cloud Run 還活著嗎？預設輸入要打多久？ |
| 第 5 次 | 出門前最後一次 | 信心建立 |

---

## 5. Demo Day 攜帶清單

- [ ] 筆電（充飽）+ 充電器
- [ ] 手機（充飽）+ 充電線
- [ ] HDMI / USB-C 轉接頭（兩種都帶）
- [ ] 手機開熱點（備用網路）
- [ ] 預錄 demo 影片（存桌面 + 雲端）
- [ ] 投影片 PDF（存桌面 + USB）
- [ ] 印 5 張 QR code 名片大小卡（給 mentor / 評審）
- [ ] LinkedIn QR code（社交用）
- [ ] 一瓶水（嘴乾講不出話會悲劇）
- [ ] 講稿手寫小卡（不要照念，只在卡關時瞄一眼）

---

## 6. 給評審的問答準備

預期會被問的 5 個問題與答案：

**Q1: "What stops someone from just using ChatGPT?"**
> "Three things. First, my agents are tuned for Taiwanese SME context — they cite local regulations and use local case studies. Second, the fact-checker grounds answers in authoritative sources, not just LLM training data. Third, it's a workflow, not a chat — learn mode and generate mode handhold the user through a real process."

**Q2: "How do you handle hallucinations on regulatory facts?"**
> "Every numeric or regulatory claim goes through the FactCheckerAgent, which runs google_search against a whitelisted set of authoritative sources — Taiwan EPA, FSC, IFRS, GRI. If it can't verify within 2 attempts, it explicitly flags 「無法驗證」 instead of making something up."

**Q3: "Is this just a wrapper around Gemini?"**
> "The multi-agent orchestration is the value. A single prompt asking Gemini to do all this would hit context limits and produce inconsistent output. By splitting into 7 specialized agents with clear contracts, each agent stays focused and the orchestrator handles routing. It's also easier to swap individual agents — for example, I could replace the drafter with a fine-tuned model later."

**Q4: "What's next?"**
> "Three things on the roadmap. First, a Notion MCP integration so SMEs can save reports directly to their workspace. Second, a real RAG layer with GRI and Taiwan FSC PDFs in Vertex AI Search. Third, an A2A integration with a carbon-accounting agent so the report can include real emission numbers, not estimates."

**Q5: "How much did it cost to run during development?"**
> "Honestly under £5 in Gemini API calls. The free credits from this DevCamp covered everything. The most expensive part was learning to use ADK well — and that's exactly what these four weeks were for."

---

## 7. Demo 後 30 分鐘 — 別忘了

1. **找 mentor 留聯絡方式**（Renuka、Saoussen 是最該 connect 的）
2. **問評審一個問題**：「If I were to keep building this, what's the one feature you'd want?」—— 真誠請教，超加分
3. **拍照**：跟 banner、跟其他學員、跟講者 —— 寫 LinkedIn 用
4. **當晚發 LinkedIn 文**：模板給你

```
🌱 Just demoed Sustainability Launchpad at AI DevCamp 2026 London
   — a multi-agent AI built with Google ADK that helps SME owners
   go from "What is ESG?" to a published sustainability statement.

   7 agents · Gemini 2.5 Flash · Cloud Run · Vertex AI

   Huge thanks to @Saoussen Chaabnia, @Renuka Kelkar, and the
   @GDG London team for the most hands-on AI program I've done.

   GitHub: [link]
   Live demo: [link]

   #AIDevCamp #BuildWithAI #GoogleADK #ESG #Sustainability
```

---

## 8. 一句話心理建設

> 「我不是這個房間裡最厲害的工程師，但這個專案有我自己的故事和真實的人會用它 —— 那就夠了。」

3 分鐘很快會過去。盡力說好故事，剩下的就是慶祝你完成了一個月的學習。
