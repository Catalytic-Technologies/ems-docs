# EMS Docs Automation — Run Guide

Complete step-by-step instructions for generating screenshots and video tutorials for the EMS Help Centre.

This guide covers two automation targets:

- **Admin Web** (`http://localhost:3000`) — the school staff portal
- **Guardian PWA** (`http://localhost:3001`) — the parent-facing mobile app

---

## Prerequisites

| Tool | Check command | Install |
|---|---|---|
| Node.js ≥ 18 | `node -v` | [nodejs.org](https://nodejs.org) |
| ffmpeg | `ffmpeg -version` | `brew install ffmpeg` |
| EMS Admin Web | Visit http://localhost:3000 | `npm run dev` in `ems-admin-web/` |
| EMS Guardian PWA | Visit http://localhost:3001 | `npm run dev` in `ems-guardian-pwa/` |
| EMS server | Visit http://localhost:5000 | `npm run dev` in `ems-server/` |

---

## Step 1 — Configure environment

Edit `docs-automation/.env` with your credentials:

```bash
cd ems-docs/docs-automation
cp .env.example .env    # already done — just update the values if needed
```

Key values to check:
- `EMS_BASE_URL` — already set to `http://localhost:3000`
- `EMS_DEMO_EMAIL` / `EMS_DEMO_PASSWORD` — use an existing **School Admin** account, or run the seeder (Step 2)
- `AZURE_TTS_KEY` — paste your Azure Speech key (only needed for video narration)

---

## Step 2 — Seed demo data (recommended)

Run the seeder to populate a consistent demo school with students, invoices, and attendance records. This ensures the screenshots contain realistic, labelled data rather than an empty database.

```bash
cd ems-server
node scripts/seed-demo.js

# To reset (drop and re-seed):
node scripts/seed-demo.js --reset
```

The seeder creates:
- School: **Greenfield Academy** (code: `demo-gfa`)
- Admin: `admin@demo-school.ems` / `DemoPass123!`
- Teacher: `teacher@demo-school.ems` / `DemoPass123!`
- Bursar: `bursar@demo-school.ems` / `DemoPass123!`
- Parent: `parent@demo-school.ems` / `DemoPass123!` ← used by the Guardian PWA
- 40+ demo students across 4 classes
- Current-term fee invoices and sample payments
- Historical attendance records
- Parent account linked to a student (required for Guardian PWA login)

---

## Step 3 — Install Playwright

```bash
cd ems-docs/docs-automation
npm install
npx playwright install chromium
```

---

## Step 4 — Run screenshots

```bash
cd ems-docs/docs-automation

# Run all screenshot specs (captures ~40 images)
npx playwright test screenshots/ --project=screenshots

# Or run a specific module only:
npx playwright test screenshots/attendance.spec.js --project=screenshots
npx playwright test screenshots/finance.spec.js    --project=screenshots
npx playwright test screenshots/students.spec.js   --project=screenshots
npx playwright test screenshots/dashboard.spec.js  --project=screenshots
npx playwright test screenshots/admissions.spec.js --project=screenshots
npx playwright test screenshots/classes.spec.js    --project=screenshots
npx playwright test screenshots/communication.spec.js --project=screenshots
```

Screenshots are saved directly into `ems-docs/static/img/<module>/` — where the docs pages already reference them.

### What gets captured

| Spec | Images generated |
|---|---|
| `getting-started.spec.js` | Login screen (field callouts), dashboard overview, sidebar |
| `dashboard.spec.js` | Dashboard overview, sidebar highlight |
| `students.spec.js` | Student list, add button, student profile |
| `attendance.spec.js` | Attendance mark page, view page, class select, mark-all, save |
| `classes.spec.js` | Classes list, class detail, timetable list, calendar, assessments, marks entry, exit passes |
| `finance.spec.js` | Invoice list, generate button, payment list/form, fee items, fee templates, defaulters, scholarships, payment plans |
| `budgets.spec.js` | Budget list, active badge, budget detail, expense lines, BVA report (over/under budget) |
| `requisitions.spec.js` | Requisitions list (status badges), detail, approval workflow, new form |
| `inventory.spec.js` | Dashboard, items list, item detail, low-stock alerts, transactions, suppliers, categories, stock-in/out forms |
| `admissions.spec.js` | Pipeline (all statuses), application detail, review history, cycles list, open cycle badge |
| `report-packs.spec.js` | Packs list, status badges, builder, teacher view |
| `timetables.spec.js` | Timetables list, detail, period cells, calendar view, school overview |
| `calendar-documents.spec.js` | Calendar (events, detail), documents library, upload button |
| `settings.spec.js` | School settings, terms, subjects, staff list, grading templates, report templates |
| `communication.spec.js` | Inbox, compose, staff/parents lists |

---

## Step 5 — Generate TTS narration audio (optional)

Requires an Azure Speech key in `.env`.

```bash
cd ems-docs/docs-automation
node generate-tts.js
```

This reads the narration scripts in `scripts/` and outputs `.mp3` files to `recordings/audio/`.

### Scripts available

| File | Video it narrates |
|---|---|
| `scripts/getting-started.md` | Login and dashboard tour |
| `scripts/attendance.md` | Marking attendance |
| `scripts/invoicing.md` | Generating invoices |
| `scripts/payments.md` | Recording payments |
| `scripts/report-packs.md` | Building and publishing report packs |

---

## Step 6 — Record tutorial videos

```bash
cd ems-docs/docs-automation

# All videos
npx playwright test videos/ --project=videos

# Individual modules:
npx playwright test videos/getting-started.spec.js --project=videos
npx playwright test videos/attendance.spec.js       --project=videos
npx playwright test videos/invoicing.spec.js        --project=videos
npx playwright test videos/payments.spec.js         --project=videos
```

Videos (`.webm`) are saved to `docs-automation/recordings/<module>/`.

---

## Step 7 — Merge video + audio into final MP4

```bash
cd ems-docs/docs-automation
bash merge-video.sh
```

Final `.mp4` files are saved to `docs-automation/recordings/final/`.

Upload these to YouTube (unlisted) or Vimeo and embed in the doc pages using the `.video-wrapper` class:

```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    title="Marking Attendance"
    allowfullscreen
  />
</div>
```

---

## Troubleshooting

**"Browser context not found" / auth errors**
The `auth.setup.js` runs first and saves `auth-state.json`. If it fails, check that the app is reachable at `http://localhost:3000` and your credentials are correct in `.env`.

**Screenshots are blank or show a spinner**
The app may still be loading. Increase `pause()` durations in the spec file for that module, or add `await page.waitForSelector('.your-content-selector')` before the screenshot.

**ffmpeg not found**
Install with `brew install ffmpeg` on macOS or `sudo apt install ffmpeg` on Ubuntu.

**Azure TTS errors**
Verify your key and region in `.env`. Test with:
```bash
curl -X POST "https://<YOUR_REGION>.tts.speech.microsoft.com/cognitiveservices/v1" \
  -H "Ocp-Apim-Subscription-Key: <YOUR_KEY>" \
  -H "Content-Type: application/ssml+xml" \
  -d "<speak version='1.0' xml:lang='sw-KE'><voice name='sw-KE-AsiliiaNeural'>Test.</voice></speak>" \
  --output test.mp3
```

---

## Guardian PWA Automation (Port 3001)

The EMS Guardian PWA is a mobile-first progressive web app for parents. It runs on `http://localhost:3001` and uses a separate Playwright config with an iPhone-sized viewport.

### Prerequisites for Guardian automation

1. **Guardian PWA running** — `npm run dev` in `ems-guardian-pwa/`
2. **Demo parent account** — created by the seeder above (`parent@demo-school.ems`)
3. **Guardian credentials in `.env`** — `EMS_GUARDIAN_BASE_URL`, `EMS_GUARDIAN_EMAIL`, `EMS_GUARDIAN_PASSWORD` (already set)

### Step G1 — Guardian screenshots

```bash
cd ems-docs/docs-automation

# Login + auth setup for Guardian PWA
npx playwright test auth.setup.guardian.js \
  --config=playwright.config.guardian.js \
  --project=guardian-setup

# All guardian screenshots
npx playwright test guardian-screenshots/ \
  --config=playwright.config.guardian.js \
  --project=guardian-screenshots

# Individual screens:
npx playwright test guardian-screenshots/login.spec.js       --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/dashboard.spec.js   --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/attendance.spec.js  --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/fees.spec.js        --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/progress.spec.js    --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/messages.spec.js    --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/documents.spec.js   --config=playwright.config.guardian.js --project=guardian-screenshots
npx playwright test guardian-screenshots/profile.spec.js     --config=playwright.config.guardian.js --project=guardian-screenshots
```

Screenshots are saved to `ems-docs/static/img/guardian/`.

### What gets captured

| Spec | Images generated |
|---|---|
| `login.spec.js` | Login screen, email field, password field, OTP tab, home after login |
| `dashboard.spec.js` | Home dashboard, bottom nav, attendance card, fees card, performance card, messages widget |
| `attendance.spec.js` | Attendance page, chart, history list, present/absent badges |
| `fees.spec.js` | Fees overview, balance, invoice list, invoice detail, line items |
| `progress.spec.js` | Progress page, chart, subject list, subject detail, report card status |
| `messages.spec.js` | Messages list, unread badge, message detail, subject line |
| `documents.spec.js` | Documents library, document item, scrolled view |
| `profile.spec.js` | Profile page, guardian name, sign out button, settings |

### Step G2 — Guardian video recording

```bash
cd ems-docs/docs-automation

npx playwright test guardian-videos/guardian-app-tour.spec.js \
  --config=playwright.config.guardian.js \
  --project=guardian-videos
```

The video (`.webm`) is saved to `docs-automation/recordings/guardian/`.

### Step G3 — Convert webm to mp4

```bash
ffmpeg -i recordings/guardian/*.webm recordings/guardian/guardian-app-tour.mp4
```

### Step G4 — Generate TTS narration

```bash
node generate-tts.js \
  --input  scripts/guardian-app.md \
  --output recordings/tts/guardian-app-narration.mp3 \
  --voice  sw-KE-AsiliiaNeural
```

### Step G5 — Merge video + narration

```bash
ffmpeg \
  -i recordings/guardian/guardian-app-tour.mp4 \
  -i recordings/tts/guardian-app-narration.mp3 \
  -c:v copy -c:a aac -shortest \
  recordings/final/guardian-app-tour-final.mp4
```

### Troubleshooting Guardian automation

**Guardian login fails**
- Confirm `ems-guardian-pwa` is running on port 3001: visit `http://localhost:3001/login` in your browser.
- Confirm the seeder ran successfully and printed `Linked parent → student`.
- Check `EMS_GUARDIAN_EMAIL` / `EMS_GUARDIAN_PASSWORD` in `.env`.

**"No child selected" on home screen**
The parent account must be linked to at least one student. Re-run the seeder to fix the linkage:
```bash
node ems-server/scripts/seed-demo.js --reset
```

**Screenshots show blank/loading state**
Increase `pause()` durations in the spec file. The Guardian PWA makes several API calls on load; 1.5 seconds is usually sufficient but you can raise it to 3000 ms if the API is slow.
