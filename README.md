# GDG Cloud Modular Presentation Application

A containerized, interactive presentation web platform designed for GDG on Campus University of Windsor tech talks. Built for lightweight local development and zero-friction deployment to **Google Cloud Run**.

---

## 🌟 Key Features

- **🎨 GDG Material Design Theme**: Clean aesthetic featuring Google core colors (`#4285F4`, `#EA4335`, `#FBBC04`, `#34A853`), Google Sans typography, card-based layout, and dark/light modes.
- **📄 Markdown Slide Engine (`slides.md`)**: Slide parser separating content by `---` blocks with frontmatter support for titles, badges, speaker notes, and slide layout types (`standard`, `introduction`, `interactive-cli`, `interactive-demo`).
- **👥 Introduction & Speaker Spots Slide**: Dedicated `introduction` slide type rendering interactive speaker profile cards with avatar headshots (or fallback Google-colored initial avatars), speaker titles, company/affiliations, and topic badges.
- **⌨️ Complete Keyboard Shortcuts**:
  - `→` / `Space` / `PageDown`: Next slide
  - `←` / `Backspace` / `PageUp`: Previous slide
  - `S`: Toggle Speaker Console (Notes + Active Presentation Timer)
  - `M`: Toggle Slide Picker Drawer
  - `F`: Toggle Fullscreen View
  - `Esc`: Close Modals
- **💻 Interactive CLI Terminal Simulator**: Embedded terminal widget supporting `gcloud` and `docker` command simulation, with a one-click **"Run Demo"** button for automated live presentation walkthroughs.
- **🔐 Configurable HTTP Basic Auth Gate**: Protect live presentations by setting `AUTH_USER` and `AUTH_PASS`. Unset for dev mode bypass.
- **☁️ Cloud Run Ready**: Multi-stage Docker container listening on host `0.0.0.0` and port `process.env.PORT` (default: 8080).

---

## 🚀 Local Development Setup

### 1. Install Dependencies & Start Server
```bash
npm install
npm start
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### 2. Enable Authentication (Optional)
To test HTTP Basic Auth locally:
```bash
AUTH_USER=gdg AUTH_PASS=cloud2026 npm start
```

### 3. Adding an Introduction / Speaker Slide
Set `type: introduction` in `slides.md` and define speakers with `name`, `title`, `headshot` (URL or local path), and optional `company` and `topic`:

````markdown
---
type: introduction
title: Meet the Speakers
badge: FEATURED SPEAKERS
notes: Welcome our keynote speakers!

# Meet the Speakers
### GDG on Campus University of Windsor

```speakers
[
  {
    "name": "Don Ward",
    "title": "Lead Organizer & Cloud Developer",
    "headshot": "https://example.com/don.jpg",
    "company": "University of Windsor",
    "topic": "Google Cloud Run"
  }
]
```
````
If `headshot` is omitted or unavailable, a Google-themed avatar with the speaker's initials will render automatically.

---

## 🐳 Docker Local Container Execution

Build and run the lightweight multi-stage container locally:

```bash
# Build image
docker build -t gdg-presentation .

# Run container listening on port 8080
docker run -p 8080:8080 -e PORT=8080 -e AUTH_USER=gdg -e AUTH_PASS=cloud2026 gdg-presentation
```

---

## ☁️ Google Cloud Run Deployment Guide

### Option 1: Direct One-Command Deployment (`gcloud CLI`)
```bash
# 1. Build and push image to Google Artifact Registry / GCR
gcloud builds submit --tag gcr.io/$PROJECT_ID/gdg-presentation

# 2. Deploy to Cloud Run
gcloud run deploy gdg-presentation \
  --image gcr.io/$PROJECT_ID/gdg-presentation \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars AUTH_USER=gdg,AUTH_PASS=cloud2026
```

### Option 2: Continuous Integration via Google Cloud Build
Trigger automated build and deploy using `cloudbuild.yaml`:
```bash
gcloud builds submit --config cloudbuild.yaml .
```

---

## 📁 Project Structure

```
.
├── server.js              # Express server with Basic Auth & REST endpoints
├── lib/
│   └── parser.js          # Markdown slides parser with frontmatter metadata
├── slides.md              # Presentation content source file
├── public/
│   ├── index.html         # Main web presentation UI
│   ├── css/
│   │   └── style.css      # GDG Material Design styles & animations
│   └── js/
│       └── app.js         # Presentation engine, terminal logic, timer & drawer
├── Dockerfile             # Multi-stage container build definition
├── .dockerignore          # Container build exclusion rules
├── cloudbuild.yaml        # GCP Cloud Build deployment config
└── package.json           # Node project manifest
```
