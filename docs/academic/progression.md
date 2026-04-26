---
title: Progression & Promotion
sidebar_label: Progression
sidebar_position: 8
---

# Progression & Promotion

<span className="role-badge role-badge--admin">School Admin</span>

The Progression module handles end-of-year student promotion — moving students from one class to the next, holding students back, or graduating them out of the school.

## How Progression Works

At the end of a term or academic year, the School Admin runs the **Promotion Wizard** to:
1. Define promotion rules per class level.
2. Preview which students meet the criteria.
3. Approve or override individual student outcomes.
4. Execute the promotion — students are moved to their new classes.

## Setting Up Progression Rules

Before running the wizard, define promotion rules:

1. Go to **Academic → Progression → Rules**.
2. Click **New Rule**.
3. Set the criteria:

| Criterion | Options |
|-----------|---------|
| **Minimum average score** | e.g. must achieve 40%+ overall |
| **Attendance threshold** | e.g. must have attended 80%+ of days |
| **Manual override** | Allow admin to override the rule result |

4. Assign the rule to a class level.

## Running the Promotion Wizard

1. Go to **Academic → Progression**.
2. Click **New Promotion**.
3. Select the **Term** being closed and the **target term** students move into.
4. Review the promotion summary — students are categorised as:
   - **Promote** — meets all criteria
   - **Hold** — does not meet criteria (will repeat the class)
   - **Graduate** — completing the final class level
   - **Override needed** — requires manual review

![Promotion Wizard](../../static/img/academic/progression-wizard.png)

5. Click individual students to override their outcome if needed.
6. When satisfied, click **Execute Promotion**.

:::danger Irreversible action
Executing a promotion moves all students to their new classes. This action cannot be automatically undone. Ensure you have reviewed all overrides before confirming.
:::

## Post-Promotion

After promotion:
- Students appear in their new classes for the next term.
- Graduated students are marked as **Alumni** and removed from active class lists.
- A promotion report is generated showing the outcomes of the entire cohort.

## Related Pages

- [Students →](./students)
- [Classes →](./classes)
- [Settings → Terms →](../administration/settings)
