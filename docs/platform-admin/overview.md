---
title: Platform Admin Overview
sidebar_label: Overview
sidebar_position: 1
---

# Platform Administration

<span className="role-badge role-badge--platform">Super Admin</span>

The Platform Admin panel is exclusively for EMS platform operators (Super Admins). It provides tools to manage all schools on the platform, monitor system health, and handle billing.

:::warning[Restricted Access]
This section is only relevant for EMS platform operators. School-level users do not have access to Platform Admin.
:::

## Platform Panel Sections

| Section | Purpose |
|---------|---------|
| **Platform Dashboard** | Overview of all schools, active users, and platform health |
| **Tenant Management** | Create, configure, and manage school accounts |
| **Subscriptions** | Billing plans, subscription status, platform invoices |
| **Usage** | Per-school usage metrics (storage, API calls, active users) |
| **System Health** | Server status, job queues, error rates |
| **Audit Logs** | Full audit trail of all actions across the platform |
| **Support Tools** | Admin utilities for school support cases |

## Accessing the Platform Panel

Log in with a Super Admin account. The platform panel is shown automatically — you will not see a school-level interface until you switch into a tenant (school).

## Switching into a School (Tenant Mode)

To view or manage a specific school's data as if you were their School Admin:
1. Go to **Tenants** and find the school.
2. Click **Switch to Tenant**.
3. You are now in tenant mode for that school — a banner at the top of the screen shows the school name and a **"Super Admin Tools"** section appears in the sidebar.
4. To exit tenant mode, click **Exit Tenant** in the banner.

## Next Steps

- [Tenant Management →](./tenant-management)
- [Subscriptions →](./subscriptions)
- [System Health →](./system-health)
