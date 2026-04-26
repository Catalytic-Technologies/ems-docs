---
title: Exit Passes
sidebar_label: Exit Passes
sidebar_position: 4
---

# Exit Passes

<span className="role-badge role-badge--admin">School Admin</span> <span className="role-badge role-badge--teacher">Teacher</span>

Exit Passes allow the school to manage and record students leaving the school premises during school hours. Each pass generates a scannable verification code that security can check at the gate.

## Creating an Exit Pass

1. Go to **Academic → Exit Passes**.
2. Click **New Exit Pass**.
3. Fill in the details:

| Field | Description |
|-------|-------------|
| **Student** | Search and select the student |
| **Reason** | Purpose of leaving (medical, family, etc.) |
| **Authorised By** | Staff member authorising the exit |
| **Collector** | Person collecting the student |
| **Collector ID** | ID number of the collector |
| **Expected Return** | Time or date the student will return (if applicable) |

4. Click **Issue Pass**.

The pass is displayed with a **QR code** that security can scan to verify.

## Verifying an Exit Pass

At the gate, security or admin staff can:

1. Go to **Academic → Exit Passes → Verify**.
2. Scan or enter the pass code.
3. The system shows the pass details and confirms it is valid.

## Exit Pass List

The exit pass list shows all passes issued today and their status:
- **Active** — student has not yet returned
- **Returned** — student has returned to school
- **Expired** — pass time has passed without return recorded

## Recording a Return

When a student returns, open their exit pass and click **Mark Returned** to close the record.

## Related Pages

- [Attendance →](./attendance)
- [Students →](./students)
