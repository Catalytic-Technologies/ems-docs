---
title: Tenant Management
sidebar_label: Tenant Management
sidebar_position: 2
---

# Tenant Management

<span className="role-badge role-badge--platform">Super Admin</span>

Tenants are schools on the EMS platform. Each tenant is a completely isolated instance with its own users, data, and configuration.

## Viewing Tenants

Go to **Platform → Tenants** to see all schools. The list shows:
- School name and code
- Subscription plan and status
- Number of active students
- Last activity date

## Creating a New Tenant (Onboarding a School)

1. Click **New Tenant**.
2. Fill in the school details:

| Field | Description |
|-------|-------------|
| **School Name** | Full official name |
| **School Code** | Short unique identifier (used in portal URL) |
| **Country / Region** | For localisation |
| **Subscription Plan** | Assign the billing plan |
| **Admin Email** | Email for the first School Admin account |
| **Admin Name** | Name of the initial admin user |

3. Click **Create**.

EMS creates the tenant and sends a welcome email to the admin with their login credentials.

## Editing Tenant Details

Click a tenant name to open the tenant profile. From here you can:
- Edit school details
- View and manage the school's users
- Switch into the school's admin interface

## Suspending a Tenant

If a school's subscription lapses, you can suspend their access:
1. Open the tenant profile.
2. Click **Suspend Tenant**.
3. Confirm. All users of that school are immediately logged out and cannot log in until the suspension is lifted.

## Related Pages

- [Subscriptions →](./subscriptions)
- [Audit Logs →](./audit-logs)
