# Narration Script — EMS Guardian App Walkthrough

**Voice**: Asilia (sw-KE-AsiliiaNeural)  
**Target duration**: ~4–5 minutes  
**Video file**: `recordings/guardian/guardian-app-tour.webm` → `guardian-app-tour.mp4`

---

## Segment 1 — Introduction & Login (00:00–00:40)

Welcome to the EMS Guardian App — your window into your child's school life, right from your phone.

To get started, open the app on your device. You will see the sign-in screen.

Enter your email address or phone number, then type your password.

Tap Sign In.

If you prefer, you can use the Phone Code option to receive a one-time code by SMS — no password needed.

---

## Segment 2 — Home Dashboard (00:40–01:30)

After signing in, you arrive at the Home screen.

At a glance you can see the most important updates for your child's day.

At the top is an Attendance card showing whether your child is present, absent, or late today, along with a chart of the last two weeks.

Below that is the Fees Overview, showing how much has been billed, how much has been paid, and the current balance.

Scroll down to see the Performance section — a chart of your child's subject scores from recent assessments.

Finally, the Latest Message card shows the most recent communication from the school.

If there is anything that needs your immediate attention, an Action Required banner will appear at the very top.

---

## Segment 3 — Attendance (01:30–02:10)

Tap Attendance in the bottom navigation to open the full attendance history.

Here you can see a day-by-day record for the entire term — each day is marked as Present, Absent, Late, or Not Yet Marked.

The summary chart at the top makes it easy to spot patterns at a glance.

---

## Segment 4 — Fees & Invoices (02:10–02:55)

Tap Fees to open the fees screen.

The overview shows the total amount invoiced, total paid, and any remaining balance.

Tap on any invoice to see the full breakdown — line items, payment history, and the outstanding amount.

You can use this information to plan your payments and stay up to date with the school's fee schedule.

---

## Segment 5 — Academic Progress (02:55–03:40)

Tap Progress to review your child's academic performance.

You will see a chart showing the average score for each subject.

Tap any subject to drill down into individual assessment results — tests, assignments, and exams are listed separately so you can track improvement over time.

When a report card is ready, a badge will appear here. Tap View to see the full end-of-term report.

---

## Segment 6 — Messages (03:40–04:10)

Tap Messages to view all communications from the school.

New or unread messages are marked clearly. Tap any message to read the full content.

School announcements, notices, and direct messages from teachers all appear here in one place.

---

## Segment 7 — Documents & Profile (04:10–04:45)

Tap Documents to access files published by the school — handbooks, circulars, permission slips, and more.

Tap any document to download it directly to your device.

Finally, tap Profile to review your account details. You can also sign out from this screen.

---

## Segment 8 — Closing (04:45–05:00)

The EMS Guardian App keeps you connected to your child's school, wherever you are.

For more help, visit the EMS Help Centre or contact your school's administrator.

---

## TTS Generation Command

```bash
node generate-tts.js \
  --input  scripts/guardian-app.md \
  --output recordings/tts/guardian-app-narration.mp3 \
  --voice  sw-KE-AsiliiaNeural
```

## Video Merge Command

```bash
ffmpeg -i recordings/guardian/guardian-app-tour.mp4 \
       -i recordings/tts/guardian-app-narration.mp3 \
       -c:v copy -c:a aac -shortest \
       recordings/final/guardian-app-tour-final.mp4
```
