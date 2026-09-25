type: standard
title: Antigravity: Harnessing the Power
badge: GDG TECH TALK
logo: /images/antigravity-logo.png
footer: Brought to you by GDG on Campus University of Windsor
notes: Welcome everyone to today's GDG Tech Talk! Introducing Antigravity - Google's Agentic Harness for developers. Explain slide navigation: Arrow keys to move, 'S' for speaker view, 'F' for fullscreen.

# Antigravity: Harnessing the Power
## A hands-on approach

---
type: standard
title: Let's meet you - the audience
badge: AUDIENCE 🙋
notes: Take a quick moment to gauge the audience! Ask for a show of hands across different backgrounds and experience levels to tailor the talk: students, software developers, AI/ML enthusiasts, and curious builders.

# Let's meet you - the audience
### Who is in the room?

> **Quick show of hands!** Help us tailor today's talk — which category best describes you?

<div class="poll-grid">
  <div class="poll-card accent-blue">
    <span class="poll-badge">🎓</span>
    <h4>Students & Learners</h4>
  </div>
  <div class="poll-card accent-red">
    <span class="poll-badge">💻</span>
    <h4>Software Engineers</h4>
  </div>
  <div class="poll-card accent-yellow">
    <span class="poll-badge">🤖</span>
    <h4>AI / ML Enthusiasts</h4>
  </div>
  <div class="poll-card accent-green">
    <span class="poll-badge">🚀</span>
    <h4>Builders & Innovators</h4>
  </div>
</div>

---
type: introduction
title: Meet the Speakers
badge: FEATURED SPEAKERS
notes: Introduce tonight's speakers from GDG on Campus University of Windsor. Give a quick overview of each speaker's background and what they will be presenting today.

# Meet the Speakers
### GDG on Campus University of Windsor • Presenters

```speakers
[
  {
    "name": "Bryan Kelly",
    "title": "Forward Deployed Engineer",
    "headshot": "/images/bryankelly.png",
    "company": "Google Cloud",
    "topic": ""
  },
  {
    "name": "Don Ward",
    "title": "Customer Engineer",
    "headshot": "/images/don-ward.jpg",
    "company": "Google Cloud",
    "topic": ""
  }
]
```

---
type: standard
title: What is Antigravity?
badge: AUDIENCE QUESTION 🤔
notes: Pause here and look at the audience. Ask them: 'Before we show you the code, what do you think Google Antigravity is?' Let 2-3 people answer or guess. Highlight that almost everyone expects a chatbot or copilot autocomplete, but it's fundamentally an autonomous agentic harness.

# What is Antigravity?
### 🤔 Quick Question for the Room

> **Before we look under the hood, let's take a quick pulse:**  
> When you hear "Antigravity by Google", what comes to mind?

<div class="poll-grid">
  <div class="poll-card accent-blue">
    <span class="poll-badge">A</span>
    <h4>A Chatbot Interface</h4>
    <p>A conversational web assistant like ChatGPT or Gemini chat?</p>
  </div>
  <div class="poll-card accent-red">
    <span class="poll-badge">B</span>
    <h4>An IDE Copilot</h4>
    <p>An inline code autocomplete tool like GitHub Copilot or Tabnine?</p>
  </div>
  <div class="poll-card accent-yellow">
    <span class="poll-badge">C</span>
    <h4>A New Foundation Model</h4>
    <p>A proprietary LLM trained specifically for coding benchmarks?</p>
  </div>
  <div class="poll-card accent-green">
    <span class="poll-badge">D</span>
    <h4>An Autonomous Agent Harness</h4>
    <p>A runtime environment that gives AI hands, tools, terminals, and pair-programming autonomy?</p>
  </div>
</div>

<div class="poll-reveal-box">
  💡 <strong>Spoiler Alert</strong>: It's <strong>D</strong> — a next-generation agentic harness designed by Google DeepMind to turn models into autonomous software engineers.
</div>

---
type: standard
title: So what is a Harness?
badge: CORE QUESTION 🤔
notes: Ask the audience: 'So what is a Harness?' Give a brief pause to let attendees reflect before transitioning into the paradigm shift from chatbots to autonomous agentic harnesses.

<div class="question-container">
  <h1 class="question-title">So what is a Harness?</h1>
</div>

---
type: standard
title: The Paradigm Shift: Chatbots vs. Agents
badge: EVOLUTION OF AI
notes: Walk through the 3 phases of AI evolution: Chatbots (passive text) -> Copilots (assistive inline) -> Autonomous Agents (active execution). Explain the fundamental missing piece: LLMs have reasoning brains, but they lack hands and safety guardrails. That's why an agentic harness like Antigravity is required.

# The Paradigm Shift: Chatbots vs. Agents
### From Passive Text Generators to Autonomous Software Engineers

<div class="evolution-stepper">
  <div class="step-card">
    <span class="step-num">Phase 1</span>
    <h4>Chatbots (2022–2023)</h4>
    <p class="step-tagline">"Brain in a Jar"</p>
    <ul>
      <li>Text in ➔ Text out</li>
      <li>Passive conversational assistant</li>
      <li>Zero environment interaction</li>
      <li>Human copy-pastes everything</li>
    </ul>
  </div>

  <div class="step-card">
    <span class="step-num">Phase 2</span>
    <h4>Copilots (2023–2024)</h4>
    <p class="step-tagline">"Smart Autocomplete"</p>
    <ul>
      <li>Ghost-text code suggestions</li>
      <li>Context limited to open files</li>
      <li>Human must drive every keystroke</li>
      <li>No ability to run or debug code</li>
    </ul>
  </div>

  <div class="step-card highlight-step">
    <span class="step-num">Phase 3</span>
    <h4>AI Agents (2025–2026)</h4>
    <p class="step-tagline">"Autonomous Pair Programmer"</p>
    <ul>
      <li>Goal-oriented task execution</li>
      <li>Plans multi-step workflows</li>
      <li>Observes feedback & self-corrects</li>
      <li>Operates shell, files & browser</li>
    </ul>
  </div>
</div>

---
type: standard
title: Where Does Antigravity Fit In?
badge: AGENTIC HARNESS
notes: This is the pivotal slide. Explain that raw LLMs are isolated brains. Antigravity provides the missing 'nervous system and hands'—safe tool execution, persistent context, subagent orchestration, and developer guardrails.

# Where Does Antigravity Fit In?
### Connecting Foundation Models to the Real-World Toolchain

<div class="fundamental-gap-showcase">
  <div class="gap-card-highlight">
    <div class="gap-card-title">💡 The Fundamental Gap</div>
    <div class="gap-card-desc">An LLM has powerful reasoning capabilities, but cannot touch your terminal, filesystem, browser, or compiler on its own.</div>
  </div>
  <div class="solution-card-highlight">
    <div class="gap-card-title">🚀 The Antigravity Solution</div>
    <div class="gap-card-desc"><strong>Antigravity is the Agentic Harness</strong> that equips models with safe, autonomous pair-programming superpowers.</div>
  </div>
</div>

---
type: standard
title: The Triad: LLMs, Agents & Harnesses
badge: CORE ARCHITECTURE ⚡
notes: Keep this slide crisp. Highlight the 3 roles: LLM is the engine (intelligence), Agent is the driver (strategy & loop), and Antigravity is the vehicle/chassis (tools, execution, and guardrails). Mention that an LLM alone cannot run or test code.

# The Triad: LLMs, Agents & Harnesses
### Three Essential Pillars of Autonomous Software Engineering

<div class="triad-grid">
  <div class="triad-card card-llm">
    <div class="triad-header">
      <div class="triad-icon-box">🧠</div>
      <div>
        <span class="triad-role-badge">The Cognitive Engine</span>
        <h3 class="triad-title">Foundation Model</h3>
      </div>
    </div>
    <div class="triad-analogy">🏎️ <em>The Engine (Raw Power)</em></div>
    <div class="triad-gap-box">
      <strong>Limitation:</strong> "Brain in a jar" — no terminal, no filesystem access.
    </div>
  </div>

  <div class="triad-card card-agent">
    <div class="triad-header">
      <div class="triad-icon-box">🤖</div>
      <div>
        <span class="triad-role-badge">The Reasoning Loop</span>
        <h3 class="triad-title">Autonomous Agent</h3>
      </div>
    </div>
    <div class="triad-analogy">🧭 <em>The Driver (Navigation & Will)</em></div>
    <div class="triad-gap-box">
      <strong>Limitation:</strong> Pure logic — requires an OS environment to touch code.
    </div>
  </div>

  <div class="triad-card card-harness">
    <div class="triad-header">
      <div class="triad-icon-box">⚡</div>
      <div>
        <span class="triad-role-badge">The Execution Body</span>
        <h3 class="triad-title">Antigravity (Harness)</h3>
      </div>
    </div>
    <div class="triad-analogy">🛡️ <em>The Car, Controls & Hands</em></div>
    <div class="triad-gap-box">
      <strong>The Bridge:</strong> Connects AI intelligence directly to your real codebase.
    </div>
  </div>
</div>

<div class="triad-formula-banner">
  <div class="formula-flow">
    <span class="pill-llm">🧠 LLM (Intelligence)</span>
    <span>+</span>
    <span class="pill-agent">🤖 Agent (Planning Loop)</span>
    <span>+</span>
    <span class="pill-harness">⚡ Antigravity (Harness & Hands)</span>
    <span>=</span>
    <span class="pill-result">🚀 Autonomous Pair Programmer</span>
  </div>
  <div class="formula-subtext">
    An LLM thinks. An Agent decides. <strong>Antigravity executes and verifies.</strong>
  </div>
</div>

---
type: standard
title: Deep Dive: The Autonomous ReAct Loop
badge: AGENT REASONING 🤖
notes: Explain the ReAct framework (Reasoning + Acting, originally published by Yao et al.). Walk through the 4 steps: 1) Thought (analyzing the problem and planning), 2) Action (choosing and invoking a tool), 3) Observation (ground truth feedback from Antigravity), and 4) Reflection (evaluating if the test passed or if debugging is needed). Emphasize that traditional LLMs are single-shot and hallucinate, while ReAct agents are self-correcting.

# Deep Dive: The Autonomous ReAct Loop
### How Agents Think, Act, Observe, and Self-Correct in Real Time

> 🔄 **What is ReAct?** Rather than guessing in a single shot, an **Agent** couples **Reasoning** with **Action** in a continuous feedback loop until the goal is achieved:

<div class="react-cycle-grid">
  <div class="react-card step-thought">
    <span class="react-step-indicator">Step 1 • Cognition</span>
    <h4 class="react-title">💭 Thought (Reason)</h4>
    <div class="react-example-box">
      <em>"Test suite failed on AuthToken. I need to grep for the token refresh logic."</em>
    </div>
  </div>

  <div class="react-card step-action">
    <span class="react-step-indicator">Step 2 • Execution</span>
    <h4 class="react-title">🛠️ Action (Tool Call)</h4>
    <div class="react-example-box">
      <code>grep_search("refreshToken", "./src/auth")</code>
    </div>
  </div>

  <div class="react-card step-observation">
    <span class="react-step-indicator">Step 3 • Ground Truth</span>
    <h4 class="react-title">👁️ Observation (Sense)</h4>
    <div class="react-example-box">
      <code>Found 2 matches in authService.ts:42 and tokenManager.ts:18</code>
    </div>
  </div>

  <div class="react-card step-reflection">
    <span class="react-step-indicator">Step 4 • Adaptation</span>
    <h4 class="react-title">🔄 Reflection (Critique)</h4>
    <div class="react-example-box">
      <em>"Line 42 has a typo in expiry math. Let me apply a targeted diff and re-run tests."</em>
    </div>
  </div>
</div>

> 💡 **Why This Changes Everything:** A raw LLM hallucinates and stops. A **ReAct Agent inside Antigravity** keeps running tests until your code actually builds and passes!

---
type: standard
title: Antigravity Surfaces & Ecosystem
badge: PRODUCT SURFACES 🌐
notes: Introduce the detour into Antigravity surfaces. Explain that Antigravity is not just a single interface; it adapts to how developers work. 1) Antigravity 2.0 (the standalone desktop app for multi-project orchestration), 2) Antigravity IDE (the dedicated AI-first VS Code-based editor), 3) Editor Extensions (for VS Code and JetBrains), and 4) Antigravity CLI 'agy' (for terminal ninjas and headless CI/CD).

# Antigravity Surfaces & Flavors
### Flexible Developer Ergonomics: Work Wherever You Are Most Productive

<div class="surfaces-grid">
  <div class="surface-card">
    <div class="surface-icon">🖥️</div>
    <h4 class="surface-title">Standalone App</h4>
    <span class="surface-tagline">Antigravity 2.0</span>
  </div>

  <div class="surface-card">
    <div class="surface-icon">💻</div>
    <h4 class="surface-title">Antigravity IDE</h4>
    <span class="surface-tagline">AI-First Editor (VS Code Fork)</span>
  </div>

  <div class="surface-card">
    <div class="surface-icon">🔌</div>
    <h4 class="surface-title">Editor Extensions</h4>
    <span class="surface-tagline">VS Code & JetBrains</span>
  </div>

  <div class="surface-card">
    <div class="surface-icon">⌨️</div>
    <h4 class="surface-title">Antigravity CLI</h4>
    <span class="surface-tagline">`agy` Terminal & Headless</span>
  </div>
</div>

> ⚡ **Unified Engine Under the Hood:** All 4 surfaces share the exact same agentic core, skills, security sandboxes, and customization system.

---
type: standard
title: Live Demo: Standalone App
badge: DEMO BREAK 🎬
notes: Announce the demo break! Switch over to the running Antigravity 2.0 desktop application and perform the two demonstration actions. Show how Projects keep workspaces isolated, and show how Preview mode renders the web UI side-by-side as the agent writes code.

# Live Demo: Standalone App
### Hands-On Tour of Antigravity 2.0

### 🎯 Actions to Perform During Demo:

1. **Projects Management**
   - Switch between active workspaces and repositories.
   - Show how each project isolates context, custom instructions, and `.agents/rules/`.
   - Demonstrate per-project permission and terminal sandbox controls.

2. **Live Preview Mode**
   - Prompt the agent to make a UI or style modification.
   - Watch the live preview pane render and test the web application side-by-side with code diffs.
   - Show real-time browser inspection and feedback.

> 🎬 **Demo Time:** Let's switch over to the live Antigravity desktop app!

---
type: standard
title: Antigravity Terminology: Core Concepts
badge: KEY CONCEPTS 💡
notes: Walk the audience through the 3 essential Antigravity terms. 1) Skills: Modular packages of instructions and scripts loaded on demand (like cheatsheets). 2) Build with Google Bundles: Official pre-configured plugin bundles (Firebase, Android CLI, Chrome DevTools, Science). 3) Browser in the Loop: Autonomous CDP browser subagent that clicks, tests, and visualizes web apps.

# Antigravity Terminology: Core Concepts
### The Three Essential Building Blocks of Modern Agentic Workflows

<div class="terminology-grid">
  <div class="terminology-card term-skills">
    <span class="term-badge">Modular Knowledge</span>
    <h3 class="term-title">🎯 Skills (`SKILL.md`)</h3>
    <p class="term-desc">
      Specialized folders containing procedural workflows, scripts, and references. Instead of cramming entire library manuals into model prompts, Antigravity loads skills <strong>dynamically on demand</strong> when triggered by user intent.
    </p>
    <ul class="triad-list">
      <li>Token-efficient: only loaded when relevant</li>
      <li>Supports project-level (<code>.agents/skills/</code>) and global scopes</li>
      <li>Equips agents with domain mastery (e.g. Firebase, Docker, React)</li>
    </ul>
  </div>

  <div class="terminology-card term-bundles">
    <span class="term-badge">Turnkey Toolchains</span>
    <h3 class="term-title">📦 Build with Google Bundles</h3>
    <p class="term-desc">
      Official, pre-packaged plugin suites maintained by Google engineering teams. They bundle ready-to-use skills, specialized subagents, and MCP (Model Context Protocol) configurations into turnkey packages.
    </p>
    <ul class="triad-list">
      <li><strong>Firebase Bundle:</strong> Firestore, Auth, App Hosting & Cloud Functions</li>
      <li><strong>Chrome DevTools:</strong> Lighthouse audits, memory leaks & a11y</li>
      <li><strong>Android CLI & Science:</strong> SDK orchestration & research tools</li>
    </ul>
  </div>

  <div class="terminology-card term-browser">
    <span class="term-badge">Visual Agency</span>
    <h3 class="term-title">🌐 Browser in the Loop</h3>
    <p class="term-desc">
      An autonomous browser subagent integrated via Chrome DevTools Protocol (CDP). Gives the agent visual eyes and mouse/keyboard hands to interact directly with web interfaces.
    </p>
    <ul class="triad-list">
      <li>Navigates web pages, clicks buttons, and fills test forms</li>
      <li>Extracts DOM trees, inspects network requests & captures console logs</li>
      <li>Takes visual screenshots and records WebP session replays</li>
    </ul>
  </div>
</div>

---
type: standard
title: Live Demo: Skills, Bundles & Browser
badge: DEMO BREAK 🎬
notes: Break out into the live demo! Show the 3 capabilities in action: 1) Trigger a skill by asking a domain question or workflow, 2) Show a Build with Google bundle in the plugins list, and 3) Run a browser subagent task and watch it navigate and inspect a web page live.

# Live Demo: Skills, Bundles & Browser
### Hands-On Demonstration of Advanced Capabilities

### 🎯 Actions to Perform During Demo:

1. **Triggering an On-Demand Skill**
   - Prompt the agent with a domain-specific task (e.g. Firebase rule auditing, accessibility audit, or Docker setup).
   - Show how the matching `SKILL.md` loads dynamically on demand without polluting prompt context.

2. **Build with Google Bundles**
   - Inspect the active plugins and bundles list in the environment.
   - Highlight curated Google toolchains (Chrome DevTools, Firebase, Android CLI) providing pre-wired MCP servers and subagents.

3. **Browser in the Loop Live Action**
   - Instruct the agent to visually inspect or test a frontend flow in Chrome.
   - Watch the agent navigate the DOM, click elements, fill test inputs, and capture visual artifacts.

> 🎬 **Demo Time:** Let's switch to the live environment to watch Skills & Browser automation in action!

---
type: standard
title: Models Supported
badge: MULTI-MODEL ECOSYSTEM 🧠
notes: Highlight Antigravity's actual model catalog. Explain that Antigravity natively supports Google Gemini with granular reasoning effort levels (High, Medium, Low), as well as Anthropic Claude with Thinking models, plus open-weight models like GPT-OSS 120B. Note that proprietary OpenAI models, Meta Llama, and Gemma are not in the native catalog.

# Models Supported
### Native Model Catalog in Google Antigravity

### 🔵 Google Gemini Models (Configurable Reasoning Effort)
- **Gemini 3.1 Pro** (`High` / `Low`) — Whole-codebase architecture, planning & deep logic
- **Gemini 3.8 Flash** (`High` / `Medium` / `Low`) — Latest frontier speed & reasoning balance
- **Gemini 3.7 Flash** (`High` / `Medium` / `Low`) — Rapid code edits, subagent tasks & fast iterations
- **Gemini 3.6 Flash** (`High` / `Medium` / `Low`) — High-throughput search, log scanning & testing

### 🔴 Non-Google Frontier Models
- **Claude Sonnet 4.6 (Thinking)** — Premier coding benchmark performance with extended thinking
- **Claude Opus 4.6 (Thinking)** — Deep architectural synthesis & complex refactoring

### 🟢 Open-Weight Models
- **GPT-OSS 120B (Medium)** — 120B parameter open-weight model for transparent execution

> 🔍 **Catalog Verification:** Proprietary OpenAI models (GPT-4o/o1), Meta Llama models, and Gemma are **not** natively available in Antigravity. Supported models focus on Google Gemini, Anthropic Claude (Thinking), and GPT-OSS.

---
type: standard
title: Slash Commands: Planning & Autonomy
badge: AGENT WORKFLOWS ⚡
notes: Introduce slash commands for planning and deep autonomous execution. 1) /plan prepares a structured design before any code edits, 2) /goal runs an end-to-end mission that persists until completion, and 3) /grill-me acts as an architectural interview.

# Slash Commands: Planning & Autonomy
### High-Leverage Commands for Deep Engineering Workflows

- **`/plan`** — **Architectural Planning Mode**  
  Prompts the agent to research your codebase, design a step-by-step implementation strategy, and pause for your review before touching any code.

- **`/goal`** — **Autonomous Mission Mode**  
  Instructs the agent to work thoroughly and persistently without stopping until a complex objective is 100% completed, self-correcting through roadblocks.

- **`/grill-me`** — **Requirements Discovery Interview**  
  The agent conducts an interactive interview with you, asking targeted clarifying questions to eliminate ambiguity and nail down design decisions.

> 💡 **Best Practice:** Start complex refactors with **`/plan`** or **`/grill-me`**, then execute with **`/goal`**.

---
type: standard
title: Slash Commands: Workflow & Memory
badge: AGENT WORKFLOWS ⚡
notes: Cover workflow automation and persistent memory. 1) /schedule manages background timers and cron monitoring, 2) /learn converts developer corrections into permanent repository rules, and 3) /review audits git diffs before merging.

# Slash Commands: Workflow & Memory
### Continuous Monitoring, Rule Persistence & Code Review

- **`/schedule`** — **Background Schedulers & Timers**  
  Schedules a recurring cron job (e.g. periodic health checks, build monitoring) or sets a delayed reminder timer that runs in the background.

- **`/learn`** — **Persistent Repository Knowledge**  
  Captures a developer correction, architectural pattern, or team convention and persists it as a permanent rule in `.agents/rules/`.

- **`/review`** — **Automated Code Review & Security Audit**  
  Thoroughly audits all uncommitted git changes for regression risks, security vulnerabilities, edge cases, and code style compliance.

> 💡 **Best Practice:** Whenever you correct the agent's behavior, run **`/learn`** so it never makes the same mistake again!

---
type: standard
title: Slash Commands: Quality & Context
badge: AGENT WORKFLOWS ⚡
notes: Cover test validation, context management, and discovery. 1) /test automatically runs test suites, 2) /compact summarizes conversation history to reclaim context window tokens, and 3) /help shows the command catalog.

# Slash Commands: Quality & Context
### Test Execution, Token Optimization & Command Hub

- **`/test`** — **Automated Validation Matrix**  
  Discovers and executes local unit and integration tests, reporting pass/fail breakdowns and feeding compiler failures into the self-correction loop.

- **`/compact`** — **Context Window Optimizer**  
  Summarizes conversation history to reclaim token budget during long pairing sessions while preserving critical task context and decisions.

- **`/help`** — **Command & Skill Directory**  
  Lists all available built-in slash commands, active skills, subagents, and environment configuration options.

> ⌨️ **Quick Tip:** Type **`@`** at any prompt to attach files, symbols, past conversations, or rules directly into any slash command!

---
type: standard
title: Resources & Wrap-Up
badge: WRAP-UP
notes: Wrap up the presentation. Direct attendees to the official Antigravity documentation and open the floor for Q&A.

# Resources & Community Links
### Google Antigravity & GDG on Campus University of Windsor

- 📘 [Official Google Antigravity Documentation](https://antigravity.google/docs)
- 🌐 [Antigravity by Google](https://antigravity.google)
- 🐙 [GDG Presentation GitHub Repository](https://github.com/donwardpeng/antigravity_presentation)
- 🎨 [Google Material Design Guidelines](https://m3.material.io/)

> **Thank you for joining GDG on Campus University of Windsor!** Q&A Time 💬

---
type: standard
title: Thank You!
badge: GDG TECH TALK 💙
notes: Conclude the tech talk! Thank the audience for their time and GDG on Campus University of Windsor for hosting. Open the floor for questions, discussions, and networking.

# Thank You!
### GDG on Campus University of Windsor • Tech Talk

> 🎉 **Thank you for joining us for "Antigravity: Harnessing the Power"!**  
> We hope this inspired you to build and experiment with autonomous agentic workflows.

### 👥 Connect with Today's Speakers:
- **Bryan Kelly** — Forward Deployed Engineer, Google Cloud
- **Don Ward** — Customer Engineer, Google Cloud

---
type: standard
title: Appendix: Presentation Cheatsheet
badge: APPENDIX 📑
notes: Appendix reference containing presentation platform keyboard shortcuts and navigation tips.

# Appendix: Presentation Cheatsheet
### Presenter Controls & Platform Shortcuts

> 💡 **Navigation Shortcuts:** Press **`→`** or **`Space`** to advance. Press **`S`** for Speaker Notes with Live Timer, **`M`** for Slide Drawer, and **`F`** for Fullscreen.

```json
{
  "event": "GDG on Campus University of Windsor 2026",
  "topic": "Antigravity: Harnessing the Power",
  "appendix_reference": {
    "next_slide": "Right Arrow / Space / PageDown",
    "prev_slide": "Left Arrow / Backspace / PageUp",
    "speaker_notes": "S (Notes + Live Stopwatch)",
    "slide_drawer": "M (Visual Slide Grid)",
    "fullscreen": "F (Toggle Fullscreen Mode)",
    "dark_light_mode": "Header Sun/Moon Icon"
  }
}
```
