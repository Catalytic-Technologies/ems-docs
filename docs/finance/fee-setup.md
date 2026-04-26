---
title: Fee Setup
sidebar_label: Fee Setup
sidebar_position: 1
---

# Fee Setup

<span className="role-badge role-badge--admin">School Admin</span> <span className="role-badge role-badge--bursar">Bursar</span>

Fee setup is the foundation of the Finance module. Before you can invoice students, you must configure fee items, templates, and structures. This is typically done once per academic year.

## The Fee Setup Hierarchy

```
Fee Items        → individual charges (e.g. "Tuition Fee", "Activity Levy")
    ↓
Fee Templates    → bundles of fee items for a class level
    ↓
Fee Structures   → assign a template to a specific class + term
    ↓
Invoices         → generated per student from the structure
```

## Step 1: Create Fee Items

Fee items are the individual billable charges.

1. Go to **Finance → Fee Items**.
2. Click **New Fee Item**.
3. Enter:
   - **Name** — e.g. "Tuition Fee", "Transport Levy"
   - **Amount** — the charge amount
   - **Category** — Tuition / Boarding / Levies / Other
   - **Compulsory** — whether all students must pay this item

4. Click **Save**.

Repeat for every charge your school applies.

## Step 2: Create Fee Templates

A fee template bundles multiple fee items together for a class level.

1. Go to **Finance → Fee Templates**.
2. Click **New Template**.
3. Name the template (e.g. "Grade 4 – Day Scholar").
4. Add fee items from your list.
5. Adjust per-item amounts if needed for this template.
6. Click **Save**.

:::tip
Create separate templates for different student categories — e.g. "Day Scholar" and "Boarder" — if the fee structures differ.
:::

## Step 3: Create Fee Structures

A fee structure assigns a template to a specific class and term.

1. Go to **Finance → Fee Structures**.
2. Click **New Structure**.
3. Select:
   - **Term** — the billing term
   - **Class** (or class level) — who this applies to
   - **Template** — the fee template to use
4. Click **Save**.

## Generating Invoices

Once fee structures are in place, go to [Invoicing →](./invoicing) to generate invoices for all students.

## Related Pages

- [Invoicing →](./invoicing)
- [Payments →](./payments)
- [Scholarships →](./scholarships)
