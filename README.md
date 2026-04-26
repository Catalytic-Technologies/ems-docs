# EMS Documentation Site

User documentation, training tutorials, and support guides for the **EMS School Operating System**.

Hosted at: `https://ems-docs.vercel.app` (or your custom domain)

---

## Table of Contents

- [About](#about)
- [Site Structure](#site-structure)
- [Local Development](#local-development)
- [Contributing Documentation](#contributing-documentation)
- [Tutorial Builder — Automated Screenshots & Videos](#tutorial-builder--automated-screenshots--videos)
  - [Prerequisites](#prerequisites)
  - [Step 1 — Seed the Demo Environment](#step-1--seed-the-demo-environment)
  - [Step 2 — Start the Local EMS App](#step-2--start-the-local-ems-app)
  - [Step 3 — Generate Screenshots Automatically](#step-3--generate-screenshots-automatically)
  - [Step 4 — Write the Narration Script](#step-4--write-the-narration-script)
  - [Step 5 — Generate TTS Audio (Azure Asilia Voice)](#step-5--generate-tts-audio-azure-asilia-voice)
  - [Step 6 — Record the Screen Automatically](#step-6--record-the-screen-automatically)
  - [Step 7 — Merge Video and Audio](#step-7--merge-video-and-audio)
  - [Step 8 — Upload to YouTube and Embed in Docs](#step-8--upload-to-youtube-and-embed-in-docs)
  - [Full Regeneration (One Command)](#full-regeneration-one-command)
- [AI Help Desk](#ai-help-desk)
- [Deployment](#deployment)

---

## About

This repository contains all user-facing documentation for the EMS system. It is built with [Docusaurus v3](https://docusaurus.io) and auto-deployed to Vercel on every push to `main`.

Documentation covers all EMS modules across five user roles:

| Role | Scope |
|------|-------|
| School Admin | All school-level modules |
| Bursar | Finance, fees, payments, budgets |
| Teacher | Attendance, assessments, timetables, exit passes |
| Guardian | Guardian PWA and mobile app |
| Super Admin | Platform administration, tenants, billing |

---

## Site Structure

```
docs/
├── getting-started/        # Login, navigation, roles overview
├── admissions/             # Admission cycles, pipeline, portal
├── academic/               # Students, classes, attendance, assessments, timetables, electives, progression
├── finance/                # Fees, invoicing, payments, scholarships, budgets, expenses, requisitions
├── communication/          # Inbox, messaging, notifications, documents
├── reports/                # Report packs, reports center, dashboards
├── administration/         # Staff, parents, inventory, calendar, settings
├── guardian-app/           # PWA and mobile app guides
├── platform-admin/         # Super admin: tenants, subscriptions, system health, audit
└── troubleshooting/        # Common issues and FAQ
blog/                       # Release notes and changelogs
docs-automation/            # Playwright scripts for automated screenshots and video recording
static/img/                 # Auto-generated and manually added screenshots
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start the docs dev server
npm start
# Opens http://localhost:3000
```

---

## Contributing Documentation

1. Edit or create a `.md` / `.mdx` file in the relevant `docs/<section>/` folder.
2. Follow the page template:

```mdx
---
title: Module Name
sidebar_label: Module Name
---

## Overview
Brief description of the module and which roles use it.

## Video Walkthrough
<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Module Name Walkthrough"
  frameBorder="0"
  allowFullScreen
/>

## Step-by-Step Guide

### 1. Step title
![Step description](../../static/img/module/step-1.png)

Step instructions here.

:::tip
Helpful tip for this step.
:::

### 2. Next step
...

## Common Issues

<details>
<summary>Issue title</summary>
Resolution steps.
</details>

## Related Pages
- [Related Module](../other-module/page.md)
```

3. Add screenshots to `static/img/<module>/` (either generated automatically — see below — or captured manually).
4. Push to `main` — Vercel auto-deploys within ~60 seconds.

---

## Tutorial Builder — Automated Screenshots & Videos

All screenshots and tutorial videos are generated automatically using **Playwright** against the live local EMS app, then narrated using **Azure TTS** (Asilia neural voice), and hosted on YouTube. This means documentation stays in sync with the UI — a UI change triggers a re-run, not a manual re-recording session.

### Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Node.js 18+ | Run Playwright and TTS scripts | [nodejs.org](https://nodejs.org) |
| Playwright | Browser automation, screenshots, video | Already in EMS monorepo root |
| ffmpeg | Merge video and audio | `brew install ffmpeg` (macOS) or `apt install ffmpeg` |
| Azure Cognitive Services key | TTS audio generation | Azure Portal → Create Speech resource |
| EMS local dev stack | Target app for automation | See `ems-server` and `ems-admin-web` READMEs |

Copy `.env.example` to `.env` in `docs-automation/` and fill in your values:

```bash
cp docs-automation/.env.example docs-automation/.env
```

```
# docs-automation/.env
EMS_BASE_URL=http://localhost:5173
EMS_DEMO_EMAIL=admin@demo-school.ems
EMS_DEMO_PASSWORD=DemoPass123!
AZURE_TTS_KEY=your_azure_speech_key
AZURE_TTS_REGION=eastus
AZURE_TTS_VOICE=sw-KE-AsiliiaNeural
```

---

### Step 1 — Seed the Demo Environment

Before running any automation, reset the EMS server to a clean, consistent demo state. This ensures screenshots and videos always show realistic but fictional data with no real student PII.

```bash
# From the ems-system root
cd ems-server
node scripts/seed-demo.js
```

This creates:
- 1 demo school ("Greenfield Academy")
- 4 user accounts (School Admin, Bursar, Teacher, Guardian)
- ~120 fictional students across 6 classes
- Sample fee structures, invoices, and payments
- A sample timetable and attendance records

---

### Step 2 — Start the Local EMS App

Open two terminals:

```bash
# Terminal 1 — API server
cd ems-server
npm run dev

# Terminal 2 — Admin web app
cd ems-admin-web
npm run dev
# Runs at http://localhost:5173
```

Wait until both are running before proceeding.

---

### Step 3 — Generate Screenshots Automatically

Run the Playwright screenshot specs for all modules:

```bash
# From the ems-docs root
npx playwright test docs-automation/screenshots/ --project=chromium
```

Or for a single module:

```bash
npx playwright test docs-automation/screenshots/attendance.spec.js --project=chromium
```

Screenshots are saved directly to `static/img/<module>/step-N.png`. Each spec:
- Logs in with the demo account
- Navigates to the relevant UI flow
- Injects a coloured highlight overlay on key elements before each shot
- Calls `page.screenshot()` at each step

**No manual annotation needed** — highlights are rendered by injected CSS and captured in the screenshot itself.

---

### Step 4 — Write the Narration Script

Each module has a narration script in `docs-automation/scripts/<module>.md`. Scripts are plain text (no markdown formatting) written as if speaking directly to the user.

Example — `docs-automation/scripts/attendance.md`:

```
Welcome to the Attendance module. This guide will show you how to mark
attendance for your class using the EMS system.

Start by clicking Attendance in the left sidebar. You will see a list of
your assigned classes. Click on the class you want to mark attendance for.

Select today's date from the date picker at the top of the page.
The system will load your full class list automatically.

For each student, click Present, Absent, or Late. You can also add a note
for any student by clicking the note icon next to their name.

When you have marked all students, click Save Attendance at the bottom of
the page. The record is saved immediately and visible to the school admin.
```

Keep scripts between **90 and 300 words** (roughly 1–3 minutes of audio at a natural pace).

---

### Step 5 — Generate TTS Audio (Azure Asilia Voice)

Convert all narration scripts to `.mp3` audio files using the Azure TTS REST API:

```bash
node docs-automation/generate-tts.js
```

Or for a single module:

```bash
node docs-automation/generate-tts.js --module attendance
```

Output files are saved to `docs-automation/audio/<module>.mp3`.

The script reads `AZURE_TTS_KEY`, `AZURE_TTS_REGION`, and `AZURE_TTS_VOICE` from `.env`. The Asilia (`sw-KE-AsiliiaNeural`) voice is used by default — change `AZURE_TTS_VOICE` in `.env` to switch voices.

---

### Step 6 — Record the Screen Automatically

Run the Playwright video recording specs. These use `recordVideo` on the browser context so the recording captures the exact UI interactions from the automation script — no manual screen recording required.

```bash
npx playwright test docs-automation/videos/ --project=chromium
```

Or for a single module:

```bash
npx playwright test docs-automation/videos/attendance.spec.js --project=chromium
```

Raw `.webm` recordings are saved to `docs-automation/recordings/`. The Playwright config uses:
- `slowMo: 600` — paces each click/keystroke to a natural, human-readable speed
- `viewport: { width: 1280, height: 720 }` — consistent 720p output
- An injected CSS cursor ring so mouse position is always visible on screen

---

### Step 7 — Merge Video and Audio

Merge the silent `.webm` screen recording with the `.mp3` TTS narration into a final `.mp4`:

```bash
bash docs-automation/merge-video.sh
```

Or for a single module:

```bash
bash docs-automation/merge-video.sh attendance
```

The script runs:

```bash
# Convert .webm to .mp4 first
ffmpeg -i recordings/attendance.webm -c:v libx264 -crf 18 tmp/attendance-silent.mp4

# Merge with TTS audio (audio length drives the final duration)
ffmpeg -i tmp/attendance-silent.mp4 -i audio/attendance.mp3 \
  -c:v copy -c:a aac -shortest \
  output/attendance-final.mp4
```

Final videos are saved to `docs-automation/output/`.

---

### Step 8 — Upload to YouTube and Embed in Docs

1. Upload `docs-automation/output/<module>-final.mp4` to YouTube.
2. Set visibility to **Unlisted** (accessible via link, not searchable).
3. Add the video to the appropriate **role playlist** (e.g. "EMS Teacher Guides").
4. Copy the YouTube video ID and update the `<iframe>` in the corresponding doc `.mdx` page:

```mdx
<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/VIDEO_ID_HERE"
  title="Recording Attendance"
  frameBorder="0"
  allowFullScreen
/>
```

---

### Full Regeneration (One Command)

When the EMS UI changes, regenerate all documentation assets in sequence:

```bash
# 1. Reset demo data
cd ../ems-server && node scripts/seed-demo.js && cd ../ems-docs

# 2. Regenerate screenshots
npx playwright test docs-automation/screenshots/ --project=chromium

# 3. Regenerate TTS audio from scripts
node docs-automation/generate-tts.js

# 4. Re-record all screen flows
npx playwright test docs-automation/videos/ --project=chromium

# 5. Merge all videos with audio
bash docs-automation/merge-video.sh
```

Re-upload the updated videos to YouTube (replace the existing video or upload a new version and update the `<iframe>` link in the doc page).

---

## AI Help Desk

An AI support chat widget (powered by [Chatbase](https://chatbase.co)) is embedded on every page of the docs site. It is trained on the full content of this docs site and answers user support questions in natural language.

To retrain the bot after publishing new or updated pages:
1. Log in to [chatbase.co](https://chatbase.co)
2. Open the **EMS Support Assistant** bot
3. Go to **Sources → Website** and click **Re-sync**

The bot is configured with the following persona:
> "You are the EMS Support Assistant. You help school staff, bursars, and teachers use the EMS School Operating System. Answer questions clearly and concisely based on the EMS documentation. If you don't know the answer, direct the user to contact EMS support."

---

## Deployment

The docs site is connected to **Vercel**. Every push to `main` triggers an automatic deployment.

- **Production URL**: `https://ems-docs.vercel.app`
- **Build command**: `npm run build`
- **Output directory**: `build`
- **Node version**: 18

No manual deployment steps are needed. Push your markdown changes and the site updates within ~60 seconds.
