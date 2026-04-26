---
title: Requisitions
sidebar_label: Requisitions
sidebar_position: 8
---

# Requisitions

<span className="role-badge role-badge--admin">School Admin</span> <span className="role-badge role-badge--bursar">Bursar</span>

The Requisitions module manages purchase requests. Staff submit requisitions for approval before expenditure is incurred, creating a controlled spending workflow.

## Submitting a Requisition

1. Go to **Finance → Requisitions**.
2. Click **New Requisition**.
3. Fill in:

| Field | Description |
|-------|-------------|
| **Title** | Brief description of what is being requested |
| **Items** | List of items with estimated unit cost and quantity |
| **Justification** | Reason for the purchase |
| **Budget Line** | Which budget this should come from |
| **Urgency** | Normal / Urgent |

4. Click **Submit for Approval**.

## Approving a Requisition

School Admins review and approve or reject submitted requisitions:

1. Go to **Finance → Requisitions**.
2. Open a requisition with **Pending** status.
3. Review the details.
4. Click **Approve** or **Reject** (with a reason for rejection).

## Requisition Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Saved but not yet submitted |
| **Pending** | Awaiting approval |
| **Approved** | Cleared for purchase |
| **Rejected** | Declined with reason |
| **Fulfilled** | Purchase completed, expense recorded |

## Converting to an Expense

Once a requisition is approved and the purchase is made:
1. Open the approved requisition.
2. Click **Mark as Fulfilled**.
3. Enter the actual amount spent.
4. EMS creates an expense record automatically.

## Related Pages

- [Expenses →](./expenses)
- [Budgets →](./budgets)
