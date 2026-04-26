---
title: Roles & Permissions
sidebar_label: Roles & Permissions
sidebar_position: 3
---

# Roles & Permissions

EMS uses **role-based access control (RBAC)**. Each user is assigned a role that determines which modules they can see and what actions they can perform.

## Role Overview

### School Admin
<span className="role-badge role-badge--admin">School Admin</span>

The School Admin has full access to all school-level modules. This role is typically assigned to:
- Head teachers / Principals
- Deputy head teachers
- School managers / Directors

**Full access to:** Admissions, Students, Classes, Attendance, Exit Passes, Assessments, Timetables, Electives, Progression, Finance (all), Communication, Reports, Staff, Parents, Inventory, Calendar, Settings.

---

### Bursar
<span className="role-badge role-badge--bursar">Bursar</span>

The Bursar has focused access to financial modules. This role is typically assigned to:
- Accounts officers
- Finance managers
- Bursars and cashiers

**Full access to:** Invoices, Payments, Fee Structures, Expenses, Cashbook, Payment Plans, Scholarships, Budgets, Requisitions, Financial Reports.

**Read-only access to:** Student list, Class list.

---

### Teacher
<span className="role-badge role-badge--teacher">Teacher</span>

Teachers see only the modules relevant to their classroom duties. This role is assigned to:
- Class teachers
- Subject teachers

**Full access to:** Attendance (own classes), Assessments (own classes), Exit Passes, Timetable (own view), Dashboard.

**Read-only access to:** Student profiles (own classes), Class list.

---

### Guardian
<span className="role-badge role-badge--guardian">Guardian</span>

Guardians access the system through the **Guardian App** (PWA or mobile). They cannot log into the admin web interface.

**Access to:** Child's profile, fee statements, payment history, attendance summary, report cards, notifications.

---

### Super Admin (Platform)
<span className="role-badge role-badge--platform">Super Admin</span>

Super Admins manage the EMS platform itself. They can access all schools in read/admin mode.

**Access to:** All schools (tenant management), subscriptions, billing, usage metrics, system health, audit logs, support tools.

---

## Permissions Matrix

| Action | School Admin | Bursar | Teacher | Guardian |
|--------|:---:|:---:|:---:|:---:|
| View student list | ✅ | ✅ | ✅ (own class) | ✅ (own child) |
| Edit student profile | ✅ | ❌ | ❌ | ❌ |
| Mark attendance | ✅ | ❌ | ✅ (own class) | ❌ |
| Create invoice | ✅ | ✅ | ❌ | ❌ |
| Record payment | ✅ | ✅ | ❌ | ❌ |
| Enter assessment marks | ✅ | ❌ | ✅ (own class) | ❌ |
| Build timetable | ✅ | ❌ | ❌ | ❌ |
| Manage staff | ✅ | ❌ | ❌ | ❌ |
| View reports | ✅ | ✅ (finance) | ✅ (own class) | ✅ (own child) |
| Change system settings | ✅ | ❌ | ❌ | ❌ |

## Managing Users

School Admins can create, edit, and deactivate user accounts from the **Staff** module.

1. Go to **Administration → Staff**.
2. Click **Add Staff Member**.
3. Fill in the user's details and select their **Role**.
4. Click **Save** — the user receives a welcome email with their temporary password.

To change a user's role, find the staff member and click **Edit**, then change the role dropdown.

:::warning Role changes take effect immediately
Changing a user's role updates their access the next time they load the page or log in.
:::
