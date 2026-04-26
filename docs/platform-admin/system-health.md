---
title: System Health
sidebar_label: System Health
sidebar_position: 4
---

# System Health

<span className="role-badge role-badge--platform">Super Admin</span>

The System Health panel provides real-time visibility into the EMS platform infrastructure.

## Health Dashboard

Go to **Platform → System Health** to see:

| Metric | Description |
|--------|-------------|
| **API Status** | Whether the API server is responding normally |
| **Database** | MongoDB connection status and query latency |
| **Queue Workers** | BullMQ job queue status (active, waiting, failed jobs) |
| **Email Service** | Resend email delivery status |
| **Storage** | Cloudinary media storage usage |
| **Background Jobs** | Status of scheduled cron jobs |

## Background Jobs

EMS runs automated background jobs for:
- Fee overdue reminders (daily)
- Attendance reminders to teachers (daily)
- Assessment deadline reminders
- Data archival (end of term)

The health panel shows the last run time and status of each job.

## Failed Jobs

If a background job fails, it appears in the **Failed Jobs** list. From here you can:
- Inspect the error log
- Retry the job manually
- Discard it if the failure was expected

## Related Pages

- [Audit Logs →](./audit-logs)
