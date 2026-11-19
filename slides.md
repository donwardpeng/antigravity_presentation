type: standard
title: Antigravity: Harnessing the Power
badge: GDG WINDSOR DEVFEST 2026 🚀
logo: /images/antigravity-logo.png
footer: Brought to you by GDG Windsor DevFest 2026
notes: Welcome everyone to GDG Windsor DevFest 2026! Introduce yourself (Don Ward, Customer Engineer Specialist at Google Cloud) and today's session on Antigravity — Google's Agentic Harness for developers. Explain slide navigation: Arrow keys to move, 'S' for speaker view, 'F' for fullscreen.

# ⚡ Antigravity: Harnessing the Power
## 🚀 Navigating the AI Shift, Tokenomics & Agentic Engineering

```speakers
[
  {
    "name": "Don Ward",
    "title": "Customer Engineer Specialist",
    "headshot": "/images/don-ward.jpg",
    "company": "Google Cloud",
    "topic": ""
  }
]
```

---
type: standard
title: Let's Meet You — The Audience
badge: AUDIENCE 🙋
notes: Take a quick moment to gauge the room! Ask for a show of hands across backgrounds so you can tailor examples and pacing: students, software engineers, AI/ML enthusiasts, and curious builders.

# 🙋 Let's Meet You — The Audience
### Who is in the room today?

> 👋 **Quick show of hands!** Help tailor today's talk — which group best describes you?

<div class="poll-grid">
  <div class="poll-card accent-blue">
    <span class="poll-badge">🎓</span>
    <h4>Students & Learners</h4>
    <p>Exploring modern AI tools & workflows</p>
  </div>
  <div class="poll-card accent-red">
    <span class="poll-badge">💻</span>
    <h4>Software Engineers</h4>
    <p>Shipping production code every day</p>
  </div>
  <div class="poll-card accent-yellow">
    <span class="poll-badge">🤖</span>
    <h4>AI / ML Enthusiasts</h4>
    <p>Building with LLMs, agents & MCP</p>
  </div>
  <div class="poll-card accent-green">
    <span class="poll-badge">🚀</span>
    <h4>Builders & Innovators</h4>
    <p>Turning bold ideas into reality fast</p>
  </div>
</div>

---
type: standard
title: Today's Story
badge: AGENDA 🗺️
notes: Walk quickly through our 4-act storyline: 1) The big shift in AI and why it matters (productivity, tokenomics, and the rise of the harness), 2) Why learning one harness transfers everywhere (Skills, Agents, MCP, A2A) and why we're spotlighting Antigravity here at a Google conference, 3) How to get started with Antigravity (concepts, surfaces, models, and a live demo), and 4) Wait — what about costs? Let's unpack pricing and practical options.

# 🗺️ Today's Story
### Four Chapters to Take You from AI Shift to Hands-On Impact

<div class="story-roadmap-grid">
  <div class="roadmap-card act-1">
    <div class="roadmap-num">1</div>
    <div class="roadmap-body">
      <h4>🔄 The Shift in AI & Why It Matters</h4>
      <p>Chatbots ➔ Assistants ➔ Agents — productivity multipliers, tokenomics & why the harness is king.</p>
    </div>
  </div>

  <div class="roadmap-card act-2">
    <div class="roadmap-num">2</div>
    <div class="roadmap-body">
      <h4>🔁 One Harness Transfers Everywhere</h4>
      <p>Learn Skills, Agents, MCP & A2A once — and let's explore Google Antigravity!</p>
    </div>
  </div>

  <div class="roadmap-card act-3">
    <div class="roadmap-num">3</div>
    <div class="roadmap-body">
      <h4>🚀 Getting Started with Antigravity</h4>
      <p>Core concepts, developer surfaces, multi-model freedom & a live demo.</p>
    </div>
  </div>

  <div class="roadmap-card act-4">
    <div class="roadmap-num">4</div>
    <div class="roadmap-body">
      <h4>💰 Wait... What About Costs?</h4>
      <p>Practical options from Free & Pro plans to Ultra & Enterprise Cloud.</p>
    </div>
  </div>
</div>

---
type: standard
title: The Shift in AI: Chatbots ➔ Assistants ➔ Agents
badge: ACT 1 • THE AI SHIFT 🔄
notes: Open Act 1 by framing the tectonic shift in AI over the last few years. Phase 1: Chatbots — "Brain in a Jar", text in / text out, humans copy-pasting code back and forth. Phase 2: Assistants — inline copilot autocomplete inside the editor, helpful, but the human still drives every keystroke and runs every command. Phase 3: Agents — autonomous builders that plan multi-step work, execute tools, observe errors, and self-correct until done.

# 🔄 The Shift in AI
### From Passive Chatbots to Autonomous Engineering Agents

<div class="evolution-stepper">
  <div class="step-card">
    <span class="step-num">Phase 1 • 💬</span>
    <h4>Chatbots</h4>
    <p class="step-tagline">"Brain in a Jar"</p>
    <ul>
      <li>📝 Text in ➔ Text out</li>
      <li>📋 Human copy-pastes everything</li>
      <li>🚫 Zero access to files or terminal</li>
    </ul>
  </div>

  <div class="step-card">
    <span class="step-num">Phase 2 • 🤝</span>
    <h4>Assistants</h4>
    <p class="step-tagline">"Smart Copilot"</p>
    <ul>
      <li>✨ Inline ghost-text suggestions</li>
      <li>📄 Context limited to open tabs</li>
      <li>🧑‍💻 Human still drives every step</li>
    </ul>
  </div>

  <div class="step-card highlight-step">
    <span class="step-num">Phase 3 • 🤖 NOW</span>
    <h4>Agents</h4>
    <p class="step-tagline">"Autonomous Builder"</p>
    <ul>
      <li>🗺️ Plans multi-step workflows</li>
      <li>🛠️ Runs shell, files & browser tools</li>
      <li>🔁 Observes output & self-corrects</li>
    </ul>
  </div>
</div>

> 🎯 **The Big Shift:** We're moving from *typing faster* to *orchestrating outcomes*.

---
type: standard
title: So What? Why This Shift Matters
badge: ACT 1 • SO WHAT? 💡
notes: Pause and ask: "Okay, we went from Chatbots to Assistants to Agents — so what?" Hit the three critical takeaways from the storyline: 1) Massive multiplier in productivity — developers orchestrate whole features instead of individual lines. 2) Costs grow fast — welcome to Tokenomics! Agentic loops call models repeatedly with big context windows. 3) Because of both productivity and cost, the harness/orchestrator around the model becomes just as important as the model itself!

# 💡 So What? Why Does This Matter?
### Three Real-World Consequences Every Developer Feels Immediately

<div class="impact-grid">
  <div class="impact-card impact-blue">
    <div class="impact-emoji">⚡</div>
    <span class="impact-pill">1 • Speed & Scale</span>
    <h4>Productivity Multiplier</h4>
    <p>One engineer can research, refactor, test, and ship full features in parallel — shifting leverage from <strong>lines typed</strong> to <strong>problems solved</strong>.</p>
  </div>

  <div class="impact-card impact-orange">
    <div class="impact-emoji">💸</div>
    <span class="impact-pill">2 • Tokenomics</span>
    <h4>Costs Grow Quickly</h4>
    <p>Multi-step reasoning, tool calls, and long context windows consume <strong>10×–100× more tokens</strong> than single-shot chatbot prompts.</p>
  </div>

  <div class="impact-card impact-yellow">
    <div class="impact-emoji">🛡️</div>
    <span class="impact-pill">3 • Architecture</span>
    <h4>The Harness Matters</h4>
    <p>Raw models are smart, but the <strong>harness / orchestrator</strong> controls context, tools, safety, model routing, and token efficiency.</p>
  </div>
</div>

> 🔥 **Bottom Line:** Great results aren't just about picking the biggest model — they depend on how well your **harness** orchestrates it!

---
type: standard
title: Tokenomics: Gemini Release Frequency & Pricing
badge: ACT 1 • TOKENOMICS 💸
notes: Zoom in on #2 ("costs grow -> tokenomics -> look at Gemini model release frequency & pricing"). Point out two realities: First, model release cadence is blistering — Google ships rapid updates across 2.5, 3.x, and 4.x generations (Pro, Flash, Flash-Lite, and frontier reasoning models) with fast deprecation cycles and intro pricing windows. Second, pricing spans a 20x–40x range per million tokens — AND reasoning/thinking tokens are billed as output! So using a frontier model for grep searches burns budget fast, whereas smart routing saves a fortune.

# 💸 Tokenomics: Cadence & Pricing
### Look at Gemini Model Release Frequency & Token Economics

<div class="cadence-banner">
  <div class="cadence-item">
    <span class="cadence-chip">🚄 Cadence</span>
    <span>Rapid drops: <strong>2.5 ➔ 3.x ➔ 4.x</strong> (quarterly & monthly iterations + fast deprecations)</span>
  </div>
  <div class="cadence-item">
    <span class="cadence-chip">🧠 Watch Out</span>
    <span>Internal <strong>thinking tokens</strong> count as billable output!</span>
  </div>
</div>

| 🎯 Tier | 🤖 Example Gemini Models | 📥 Input / 1M | 📤 Output / 1M | ⚡ Sweet Spot |
| :--- | :--- | :--- | :--- | :--- |
| **🪶 Flash-Lite** | Gemini 2.5 / 3.1 / 3.5 Flash-Lite | ~$0.10 – $0.30 | ~$0.40 – $2.50 | High-volume triage & classification |
| **⚡ Flash** | Gemini 3.6 / 3.7 / 3.8 Flash | ~$0.75 – $1.50 | ~$3.75 – $7.50 | Fast edits, searches & subagents |
| **🧠 Pro / Everyday** | Gemini 3.1 Pro / 4 Hydrogen | ~$1.50 – $2.00 | ~$7.50 – $12.00 | Everyday full-stack engineering |
| **🔥 Frontier** | Gemini 4 Neon / Carbon / Argon | ~$2.00 – $4.00 | ~$10.00 – $20.00 | Deep architecture & tough debugging |

> 💡 **Tokenomics Takeaway:** Prices vary **20×–40×** across tiers — a smart harness routes routine steps to fast models and saves frontier reasoning for hard problems!

---
type: standard
title: Why the Harness / Orchestrator Matters
badge: ACT 1 • THE HARNESS 🛡️
notes: Wrap up Act 1 with #3 ("The harness/orchestrator becomes important"). Use the crisp car analogy: 1) The Foundation Model (LLM) is the engine — raw cognitive horsepower, but a brain in a jar. 2) The Autonomous Agent is the driver — deciding what to do next in a loop. 3) The Harness / Orchestrator is the car, controls, and hands — giving safe terminal, filesystem, browser, context management, and guardrails.

# 🛡️ Why the Harness Becomes Important
### Models Are the Engine — The Harness Is the Car, Controls & Hands

<div class="triad-grid">
  <div class="triad-card card-llm">
    <div class="triad-header">
      <div class="triad-icon-box">🧠</div>
      <div>
        <span class="triad-role-badge">Cognitive Engine</span>
        <h3 class="triad-title">Foundation Model</h3>
      </div>
    </div>
    <div class="triad-analogy">🏎️ <em>Raw horsepower — brains without hands</em></div>
  </div>

  <div class="triad-card card-agent">
    <div class="triad-header">
      <div class="triad-icon-box">🤖</div>
      <div>
        <span class="triad-role-badge">Reasoning Loop</span>
        <h3 class="triad-title">Autonomous Agent</h3>
      </div>
    </div>
    <div class="triad-analogy">🧭 <em>The driver — planning, intent & iteration</em></div>
  </div>

  <div class="triad-card card-harness">
    <div class="triad-header">
      <div class="triad-icon-box">⚡</div>
      <div>
        <span class="triad-role-badge">Execution Body</span>
        <h3 class="triad-title">The Harness</h3>
      </div>
    </div>
    <div class="triad-analogy">🛡️ <em>Tools, sandboxes, context & guardrails</em></div>
  </div>
</div>

<div class="triad-formula-banner">
  <div class="formula-flow">
    <span class="pill-llm">🧠 LLM</span>
    <span>+</span>
    <span class="pill-agent">🤖 Agent</span>
    <span>+</span>
    <span class="pill-harness">⚡ Harness</span>
    <span>=</span>
    <span class="pill-result">🚀 Autonomous Pair Programmer</span>
  </div>
</div>

---
type: standard
title: Learn One Harness, Transfer Everywhere
badge: ACT 2 • TRANSFERABILITY 🔁
notes: Transition into Act 2! A common worry developers have is: "Tools change every 3 months — what if I bet on the wrong one?" Reassure them: learning ONE agentic harness deeply transfers directly to others! Point #1 under So What: the core building blocks — Skills, Agents, MCP, and A2A — are becoming shared open concepts across the whole ecosystem, with even more standards on the way.

# 🔁 Learn One Harness, Transfer Everywhere
### So What? Core Agentic Primitives Are Becoming Universal

<div class="transfer-grid">
  <div class="transfer-card t-blue">
    <div class="transfer-icon">🎯</div>
    <h4>Skills</h4>
    <p>Portable markdown playbooks (<code>SKILL.md</code>) teaching repeatable workflows on demand.</p>
  </div>

  <div class="transfer-card t-orange">
    <div class="transfer-icon">🤖</div>
    <h4>Agents</h4>
    <p>Specialized reasoning loops & subagents delegating research, coding, and verification.</p>
  </div>

  <div class="transfer-card t-yellow">
    <div class="transfer-icon">🔌</div>
    <h4>MCP</h4>
    <p><strong>Model Context Protocol</strong> — the universal USB-C connector for tools, APIs & data.</p>
  </div>

  <div class="transfer-card t-mint">
    <div class="transfer-icon">🤝</div>
    <h4>A2A</h4>
    <p><strong>Agent-to-Agent</strong> — open protocol for agents discovering & collaborating across platforms.</p>
  </div>
</div>

<div class="transfer-more-banner">
  <span>✨ <strong>…and more standards to come!</strong> Invest in the mental model once — carry it across every modern AI dev tool.</span>
  <span class="cadence-chip">No Lock-In</span>
</div>

---
type: standard
title: Since We're at a Google Conference...
badge: ACT 2 • WHY ANTIGRAVITY 🎪
notes: Hit Point #2 under Act 2's "So what?": Since we are at a Google conference (GDG Windsor DevFest 2026!), let's talk about Google Antigravity! Emphasize that everything you learn today in Antigravity uses those exact transferable primitives — Skills, Agents, MCP, A2A — while giving you a powerhouse Google-built developer harness.

<div class="question-container">
  <h1 class="question-title">🎪 Since we're at a Google conference…<br/>let's talk <span style="color:var(--vibrant-blue);">Antigravity</span>! 🚀</h1>
  <div class="demo-pills">
    <span class="demo-pill">🎯 Open Primitives (Skills • MCP • A2A)</span>
    <span class="demo-pill">🛠️ Built by Google DeepMind</span>
    <span class="demo-pill">⚡ Multi-Model & Multi-Surface</span>
  </div>
</div>

---
type: standard
title: Getting Started with Antigravity: Core Concepts
badge: ACT 3 • CORE CONCEPTS 🧩
notes: Kick off Act 3 ("So Antigravity -> how did I get started?"). Start with #1: A few core concepts you need to know on Day 1: 1) Skills (SKILL.md) — modular workflows loaded only when needed so you don't bloat context or burn tokens. 2) Agents — autonomous ReAct workers + specialized subagents (including Browser-in-the-Loop via Chrome DevTools). 3) MCP Servers — plug-and-play tool integrations, supercharged by turnkey Build with Google bundles (Firebase, Chrome DevTools, Android, Science, Cloud).

# 🧩 So Antigravity… How Do You Get Started?
### Step 1: Master Three Foundational Concepts

<div class="terminology-grid">
  <div class="terminology-card term-skills">
    <span class="term-badge">🎯 Modular Playbooks</span>
    <h3 class="term-title">Skills (<code>SKILL.md</code>)</h3>
    <p class="term-desc">On-demand procedural guides loaded <strong>only when triggered</strong> — keeping your prompt lean and token-smart.</p>
    <ul class="triad-list">
      <li>📂 Lives right in <code>.agents/skills/</code></li>
      <li>🔁 Reusable across teams & harnesses</li>
    </ul>
  </div>

  <div class="terminology-card term-bundles">
    <span class="term-badge">🤖 Autonomous Execution</span>
    <h3 class="term-title">Agents & Subagents</h3>
    <p class="term-desc">Self-correcting workers with terminal, file, and <strong>🌐 Browser-in-the-Loop</strong> eyes & hands.</p>
    <ul class="triad-list">
      <li>⚡ Parallel subagents & swarms</li>
      <li>🔒 Sandboxed workspace isolation</li>
    </ul>
  </div>

  <div class="terminology-card term-browser">
    <span class="term-badge">🔌 Live Toolchains</span>
    <h3 class="term-title">MCP Servers & Bundles</h3>
    <p class="term-desc">Connect external APIs, databases & cloud services via <strong>MCP</strong> and <em>Build with Google</em> plugins.</p>
    <ul class="triad-list">
      <li>🔥 Firebase, Chrome DevTools, Android</li>
      <li>🧩 One-click marketplace extensibility</li>
    </ul>
  </div>
</div>

---
type: standard
title: How Agents Work: The Autonomous ReAct Loop
badge: ACT 3 • UNDER THE HOOD 🔄
notes: Briefly show HOW an Antigravity agent actually operates under the hood using the ReAct (Reasoning + Acting) loop: 1) Thought (plans the fix), 2) Action (invokes a tool like grep or terminal), 3) Observation (reads ground-truth output from Antigravity), and 4) Reflection (verifies or iterates). Contrast with chatbots that guess once and hallucinate.

# 🔄 Under the Hood: The ReAct Loop
### How Agents Think, Act, Observe & Self-Correct in Real Time

<div class="react-cycle-grid">
  <div class="react-card step-thought">
    <span class="react-step-indicator">1 • Cognition</span>
    <h4 class="react-title">💭 Thought</h4>
    <div class="react-example-box">
      <em>"Auth tests failed. Let's search for the token refresh logic."</em>
    </div>
  </div>

  <div class="react-card step-action">
    <span class="react-step-indicator">2 • Execution</span>
    <h4 class="react-title">🛠️ Action</h4>
    <div class="react-example-box">
      <code>grep_search("refreshToken", "./src/auth")</code>
    </div>
  </div>

  <div class="react-card step-observation">
    <span class="react-step-indicator">3 • Ground Truth</span>
    <h4 class="react-title">👁️ Observation</h4>
    <div class="react-example-box">
      <code>Match found: authService.ts:42 (off-by-one expiry)</code>
    </div>
  </div>

  <div class="react-card step-reflection">
    <span class="react-step-indicator">4 • Adaptation</span>
    <h4 class="react-title">✅ Reflection</h4>
    <div class="react-example-box">
      <em>"Apply targeted diff, re-run suite ➔ all 48 tests pass!"</em>
    </div>
  </div>
</div>

> ⚡ **Why This Changes Everything:** A raw LLM guesses once and stops. An **Agent in Antigravity** keeps testing until your code actually builds and passes!

---
type: standard
title: Antigravity Surfaces: Work Your Way
badge: ACT 3 • SURFACES 🌐
notes: Move to #2 under Getting Started: Antigravity's surfaces! Show how Antigravity meets you wherever you prefer to code: 1) Desktop App (Antigravity 2.0 standalone workspace & multi-project command center), 2) Antigravity IDE (dedicated AI-first editor), 3) Editor Extensions (bring it into VS Code or JetBrains), and 4) CLI & etc. (agy terminal CLI, headless CI/CD pipelines, and the Antigravity Python SDK). All backed by one unified engine.

# 🌐 Step 2: Antigravity Surfaces
### Same Agentic Engine — Meet It Wherever You Code

<div class="surfaces-grid">
  <div class="surface-card">
    <div class="surface-icon">🖥️</div>
    <h4 class="surface-title">Desktop App</h4>
    <span class="surface-tagline">Antigravity 2.0</span>
    <ul class="surface-bullets" style="margin-top:12px;">
      <li>Multi-project hub</li>
      <li>Side-by-side previews</li>
    </ul>
  </div>

  <div class="surface-card">
    <div class="surface-icon">💻</div>
    <h4 class="surface-title">Antigravity IDE</h4>
    <span class="surface-tagline">AI-First Editor</span>
    <ul class="surface-bullets" style="margin-top:12px;">
      <li>Deep agent diffs</li>
      <li>Familiar VS Code base</li>
    </ul>
  </div>

  <div class="surface-card">
    <div class="surface-icon">🔌</div>
    <h4 class="surface-title">Extensions</h4>
    <span class="surface-tagline">VS Code & JetBrains</span>
    <ul class="surface-bullets" style="margin-top:12px;">
      <li>Keep your keybindings</li>
      <li>Zero workflow disruption</li>
    </ul>
  </div>

  <div class="surface-card">
    <div class="surface-icon">⌨️</div>
    <h4 class="surface-title">CLI & Beyond</h4>
    <span class="surface-tagline"><code>agy</code> • CI/CD • SDK</span>
    <ul class="surface-bullets" style="margin-top:12px;">
      <li>Headless automation</li>
      <li>Custom agent pipelines</li>
    </ul>
  </div>
</div>

> ✨ **One Unified Core:** Your skills, rules, MCP servers, and security sandboxes follow you across every surface!

---
type: standard
title: Models Supported: Multi-Model Freedom
badge: ACT 3 • MODELS 🧠
notes: Move to #3 under Getting Started: Models supported! Emphasize that Antigravity is NOT locked to a single model — you can pick the right model and reasoning effort for the job: Google Gemini (including Gemini 4 series & 3.x Pro/Flash with tunable effort levels), Frontier partner models (Claude Sonnet 4.6 & Opus 4.6 Thinking), and Open-Weight models (GPT-OSS 120B). Connect this right back to Act 1's Tokenomics!

# 🧠 Step 3: Models Supported
### Multi-Model Freedom — Pick the Right Brain for Every Task

<div class="models-grid">
  <div class="model-card family-google">
    <h3 class="model-family-title">🔵 Google Gemini</h3>
    <span class="model-family-subtitle">Tunable Reasoning Effort</span>
    <div class="model-item">
      <span class="model-name">🔥 Gemini 4 Series (Neon / Carbon / Hydrogen)</span>
      <span class="model-tag">Frontier reasoning, deep planning & speed</span>
    </div>
    <div class="model-item">
      <span class="model-name">🧠 Gemini 3.1 Pro (High / Low)</span>
      <span class="model-tag">Whole-codebase architecture & logic</span>
    </div>
    <div class="model-item">
      <span class="model-name">⚡ Gemini 3.8 / 3.7 Flash</span>
      <span class="model-tag">Fast edits, subagents & high-throughput loops</span>
    </div>
  </div>

  <div class="model-card family-frontier">
    <h3 class="model-family-title">🟠 Frontier Partners</h3>
    <span class="model-family-subtitle">Extended Thinking Models</span>
    <div class="model-item">
      <span class="model-name">✨ Claude Sonnet 4.6 (Thinking)</span>
      <span class="model-tag">Top-tier day-to-day coding & debugging</span>
    </div>
    <div class="model-item">
      <span class="model-name">🏗️ Claude Opus 4.6 (Thinking)</span>
      <span class="model-tag">Complex synthesis & heavy refactoring</span>
    </div>
  </div>

  <div class="model-card family-open">
    <h3 class="model-family-title">🟡 Open-Weight</h3>
    <span class="model-family-subtitle">Transparent & Flexible</span>
    <div class="model-item">
      <span class="model-name">🔓 GPT-OSS 120B (Medium)</span>
      <span class="model-tag">120B open-weight model right in the harness</span>
    </div>
  </div>
</div>

> 💡 **Tokenomics Pro Tip:** Run **Flash** for quick searches & subagents, then switch to **Pro / Frontier** for tricky architecture decisions!

---
type: standard
title: High-Leverage Slash Commands
badge: ACT 3 • POWER WORKFLOWS ⚡
notes: Give the audience a quick cheat-sheet of the everyday slash commands you actually use in Antigravity before jumping into the live demo: /plan to map architecture first, /grill-me to sharpen requirements, /goal for autonomous execution, /learn to turn your corrections into permanent repo rules, /compact to keep token usage lean, and /schedule for recurring automations.

# ⚡ Power-Up: Favorite Slash Commands
### Six Shortcuts That Supercharge Daily Agentic Workflows

<div class="slash-grid">
  <div class="slash-card">
    <div class="slash-cmd">🗺️ /plan</div>
    <div class="slash-desc">Researches the codebase and writes a clear step-by-step blueprint before editing a single file.</div>
  </div>

  <div class="slash-card">
    <div class="slash-cmd">🎙️ /grill-me</div>
    <div class="slash-desc">Runs an interactive Q&A interview to surface edge cases and lock in design choices fast.</div>
  </div>

  <div class="slash-card">
    <div class="slash-cmd">🎯 /goal</div>
    <div class="slash-desc">Pursues complex objectives end-to-end with persistent testing and self-correction.</div>
  </div>

  <div class="slash-card">
    <div class="slash-cmd">🧠 /learn</div>
    <div class="slash-desc">Turns your feedback into permanent repository rules so the agent never repeats a mistake.</div>
  </div>

  <div class="slash-card">
    <div class="slash-cmd">🗜️ /compact</div>
    <div class="slash-desc">Summarizes long sessions to reclaim context window space and stretch your token budget.</div>
  </div>

  <div class="slash-card">
    <div class="slash-cmd">⏰ /schedule</div>
    <div class="slash-desc">Sets up recurring background automations, health checks, or one-shot timers.</div>
  </div>
</div>

> ⌨️ **Quick Tip:** Type **`@`** anytime to attach files, Drive docs, symbols, or past conversations directly into your prompt!

---
type: standard
title: Live Demo Time!
badge: ACT 3 • LIVE DEMO 🎬
notes: Step 4 of Getting Started — Demo Time! Switch over to the live Antigravity Desktop App (Antigravity 2.0) and walk through: 1) Projects & workspace isolation, 2) Triggering an on-demand Skill and showing active MCP / Build with Google bundles, 3) Live Preview / Browser-in-the-Loop watching a real UI change, and 4) Switching models on the fly.

<div class="question-container">
  <h1 class="question-title">🎬 Live Demo: Antigravity in Action!</h1>
  <div class="demo-pills">
    <span class="demo-pill">🗂️ Projects & Workspaces</span>
    <span class="demo-pill">🎯 Skills & MCP Bundles</span>
    <span class="demo-pill">🌐 Live Preview & Browser</span>
    <span class="demo-pill">🧠 Model Switching</span>
  </div>
</div>

---
type: standard
title: Wait… What About Costs?
badge: ACT 4 • PRICING & OPTIONS 💰
notes: Transition into Act 4 ("Wait -> what about costs?"). Now that everyone has seen the demo and is excited to try it, answer the #1 practical question: How much does this actually cost? Walk through the options cleanly: 1) Free Tier ($0/mo) — best way to kick the tires tonight with weekly limits. 2) Google AI Pro (~$19.99/mo) — the sweet spot for solo devs and regular builders, unlocking top models and 5-hour rolling refreshes. 3) Google AI Ultra ($99.99–$199.99/mo) — 5x–20x Pro capacity for heavy multi-agent power users. 4) Enterprise & Cloud — Gemini Enterprise seats (~$30/seat) or direct Google Cloud / Vertex AI pay-as-you-go billing for teams.

# 💰 Wait… What About Costs?
### Flexible Options — Start Free, Scale Only When You Need To

<div class="pricing-grid">
  <div class="pricing-card">
    <span class="pricing-ribbon subtle">🆓 Try Tonight</span>
    <h4>Free Tier</h4>
    <div class="pricing-price">$0 / mo</div>
    <ul>
      <li>✅ Full core harness features</li>
      <li>⚡ Unlimited Tab completions</li>
      <li>📅 Weekly metered agent quota</li>
      <li>🎯 Perfect for learning & labs</li>
    </ul>
  </div>

  <div class="pricing-card featured">
    <span class="pricing-ribbon">⭐ Sweet Spot</span>
    <h4>Google AI Pro</h4>
    <div class="pricing-price">~$19.99 / mo</div>
    <ul>
      <li>🚀 Best for daily solo builders</li>
      <li>🧠 Unlocks top reasoning models</li>
      <li>🔄 <strong>5-hour rolling</strong> quota refresh</li>
      <li>➕ Optional Plus tier at ~$4.99/mo</li>
    </ul>
  </div>

  <div class="pricing-card tier-ultra">
    <span class="pricing-ribbon subtle">🔥 Power Users</span>
    <h4>Google AI Ultra</h4>
    <div class="pricing-price">$99 – $199 / mo</div>
    <ul>
      <li>⚡ <strong>5× to 20×</strong> Pro rate limits</li>
      <li>🐝 Built for heavy multi-agent swarms</li>
      <li>🔄 5-hour rolling refresh + overages</li>
      <li>🎁 Extra Google ecosystem perks</li>
    </ul>
  </div>

  <div class="pricing-card">
    <span class="pricing-ribbon subtle">🏢 Teams</span>
    <h4>Enterprise & Cloud</h4>
    <div class="pricing-price">Seat / Pay-Go</div>
    <ul>
      <li>💼 Gemini Enterprise (~$30/seat/mo)</li>
      <li>☁️ Direct Vertex AI / Cloud billing</li>
      <li>🔒 Enterprise privacy & IAM controls</li>
      <li>📊 Centralized spend governance</li>
    </ul>
  </div>
</div>

> 💡 **Stretch Every Dollar:** Combine **`/compact`** + **Flash models** for routine steps + **Pro/Frontier** for hard problems!

---
type: standard
title: Next Steps
badge: NEXT STEPS 🚀
notes: Give the audience two concrete next steps before wrapping up: 1) Grab this presentation's full GitHub repository to inspect the code and customize it with Antigravity yourself, and 2) Jump into hands-on Google Cloud & AI labs on Qwiklabs.

# 🚀 Next Steps
### Keep Building After Today's Session

<div class="next-steps-container">
  <div class="next-step-card card-repo">
    <div class="next-step-badge">1</div>
    <div class="next-step-content">
      <h3 class="next-step-title">📦 This Presentation's GitHub Repo</h3>
      <a href="https://github.com/donwardpeng/antigravity_presentation" target="_blank" class="next-step-link">
        <span class="next-step-url">https://github.com/donwardpeng/antigravity_presentation</span>
        <span class="next-step-arrow">↗</span>
      </a>
    </div>
  </div>

  <div class="next-step-card card-lab">
    <div class="next-step-badge">2</div>
    <div class="next-step-content">
      <h3 class="next-step-title">🧪 Hands-On Labs</h3>
      <a href="https://explore.qwiklabs.com" target="_blank" class="next-step-link">
        <span class="next-step-url">https://explore.qwiklabs.com</span>
        <span class="next-step-arrow">↗</span>
      </a>
    </div>
  </div>
</div>

---
type: standard
title: Thank You!
badge: GDG WINDSOR DEVFEST 2026 🎉
notes: Thank everyone for coming out to GDG Windsor DevFest 2026! Open the floor for Q&A, demos, and hallway-track conversations.

# 🎉 Thank You!
### GDG Windsor DevFest 2026 • Windsor, ON 🇨🇦

> 🚀 **Thanks for joining "Antigravity: Harnessing the Power"!**  
> Learn one harness deeply, master the primitives (**Skills • Agents • MCP • A2A**), and go build something awesome! ✨

### 🎙️ Connect with Today's Speaker
- **Don Ward** — Customer Engineer Specialist, Google Cloud ☁️
- 💬 **Questions? Let's chat!**

---
type: standard
title: Appendix: Presentation Cheatsheet
badge: APPENDIX 📑
notes: Quick appendix reference for presenter keyboard shortcuts and slide controls.

# 📑 Appendix: Presentation Cheatsheet
### Presenter Controls & Platform Shortcuts

> ⌨️ **Navigation Shortcuts:** Press **`→`** or **`Space`** to advance. Press **`S`** for Speaker Notes with Live Timer, **`M`** for Slide Drawer, and **`F`** for Fullscreen.

```json
{
  "event": "GDG Windsor DevFest 2026",
  "topic": "Antigravity: Harnessing the Power",
  "controls": {
    "next_slide": "Right Arrow / Space / PageDown",
    "prev_slide": "Left Arrow / Backspace / PageUp",
    "speaker_notes": "S (Notes + Live Stopwatch)",
    "slide_drawer": "M (Visual Slide Grid)",
    "fullscreen": "F (Toggle Fullscreen Mode)",
    "dark_light_mode": "Header Sun/Moon Icon"
  }
}
```
