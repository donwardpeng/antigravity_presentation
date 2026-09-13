type: standard
title: Cloud Native Apps with Google Cloud Run
badge: GDG TECH TALK
notes: Welcome everyone to today's GDG Tech Talk! Introduce Google Cloud Run and how serverless containers simplify modern app deployment. Explain slide navigation: Arrow keys to move, 'S' for speaker view, 'F' for fullscreen.

# Cloud Native Apps with Google Cloud Run
### Building Modular, Scalable Microservices for the Modern Web

- **Presenter**: GDG on Campus University of Windsor
- **Target Platform**: Google Cloud Run & Cloud Build
- **Tech Stack**: Node.js, Containerization, Modern Web APIs

---

> 💡 **Quick Navigation Tip**: Press **`→`** or **`Space`** to advance. Press **`S`** for Speaker Notes with Live Timer, **`M`** for Slide Drawer, and **`F`** for Fullscreen.

```json
{
  "event": "GDG Cloud Meetup 2026",
  "status": "LIVE PRESENTATION",
  "features": ["Zero-Infrastructure Ops", "Auto-scaling to Zero", "Custom Domains", "HTTP Basic Auth"]
}
```

---
type: interactive-demo
title: Cloud Run Architecture & Scaling Matrix
badge: INTERACTIVE ARCHITECTURE
notes: Walk through the key architectural benefits of Cloud Run. Highlight scale-to-zero, request-based autoscaling, concurrency tuning, and container portability.

# Google Cloud Run Architecture

Google Cloud Run is a managed compute platform that enables running stateless containers invoked via web requests or Pub/Sub events.

### Core Architectural Pillars
- ⚡ **Scale to Zero**: Pay only when your application receives traffic.
- 🔒 **Built-in HTTPS & TLS**: Automated SSL cert provisioning and endpoint security.
- 🚀 **Concurrency & Micro-bursting**: Up to 1,000 requests per container instance.
- 📦 **Open Standards**: Fully Knative compliant – run any Docker container image.

---

### Cloud Run vs. Traditional VM Deployments

| Metric | Compute Engine (VM) | GKE (Kubernetes) | Google Cloud Run |
| :--- | :--- | :--- | :--- |
| **Setup Overhead** | High (OS/Patching) | Medium/High (Cluster Ops) | **Zero (Container-native)** |
| **Scaling Speed** | Minutes (Auto-scaler) | Tens of seconds | **Sub-second cold start** |
| **Pricing Model** | Always-on hourly rate | Nodes + Management Fee | **Per-second request billing** |
| **Portability** | Low | High (K8s API) | **100% OCI Container** |

---
type: interactive-cli
title: Live Cloud Run CLI Playground
badge: LIVE CLI DEMO
notes: Click 'Run Demo' to auto-simulate running gcloud commands in real-time. Explain gcloud run deploy parameters: image tag, region, platform, and auth flags. Show attendees how live CLI outputs appear.

# Interactive `gcloud` Terminal Simulator

Try running live commands below or click **"Run Demo"** to watch automated step-by-step container deployment to Google Cloud Run!

### Command Sandbox Commands to try:
- `help` - List supported interactive commands
- `gcloud projects list` - View active GCP projects
- `docker build -t gdg-app .` - Test local container image build
- `gcloud run deploy` - Deploy presentation app live to Cloud Run
- `clear` - Reset terminal screen

---
type: standard
title: Production Ready Setup & Summary
badge: DEPLOYMENT GUIDE
notes: Wrap up the session. Point attendees to the GitHub repository, Dockerfile multi-stage setup, and cloudbuild.yaml. Take QA questions from the audience.

# Summary & Next Steps

Deploying this modular presentation to Google Cloud Run takes 3 simple steps:

```bash
# 1. Build & Push Image with Cloud Build
gcloud builds submit --tag gcr.io/$PROJECT_ID/gdg-presentation

# 2. Deploy to Cloud Run with Environment Configuration
gcloud run deploy gdg-presentation \
  --image gcr.io/$PROJECT_ID/gdg-presentation \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars AUTH_USER=gdg,AUTH_PASS=cloud2026

# 3. Access your secure, auto-scaling live presentation URL!
```

---

### Resources & Links
- 📘 [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- 🐙 [GDG Presentation GitHub Scaffolding](https://github.com/)
- 🎨 [Google Material Design Color & Typography Guidelines](https://m3.material.io/)

> **Thank you for joining GDG Cloud!** Q&A Time 💬
