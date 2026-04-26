---
title: System Overview
sidebar_label: System Overview
sidebar_position: 1
---

# EMS System Overview

Welcome to the **EMS School Operating System** — a comprehensive, cloud-based platform designed to manage every aspect of school administration from admissions to alumni.

## What is EMS?

EMS (Education Management System) is a **multi-tenant school management platform** that connects school administrators, teachers, bursars, guardians, and platform operators in a single, unified system. Every module is built to work together, so data entered in one place is instantly available across the system.

## Key Capabilities

| Area | What EMS Manages |
|------|-----------------|
| **Admissions** | Application pipeline, admission cycles, public portal |
| **Academic** | Students, classes, attendance, assessments, timetables, promotion |
| **Finance** | Fees, invoicing, payments, scholarships, budgets, expenses |
| **Communication** | Inbox, messaging, notifications, documents |
| **Reports** | Report packs, analytics, dashboards |
| **Administration** | Staff, parents, inventory, calendar, settings |
| **Guardian App** | Mobile and PWA access for parents |
| **Platform** | Multi-tenant management, billing, system health |

## How the System is Organised

EMS is organised around **schools** (called tenants). Each school has its own data, users, and settings — completely isolated from other schools on the platform.

```
Platform (Super Admin)
└── School A (Tenant)
    ├── School Admin
    ├── Bursars
    ├── Teachers
    └── Guardians / Parents
└── School B (Tenant)
    └── ...
```

## Supported User Roles

EMS has five distinct user roles, each with a tailored interface and access level:

| Role | Who | Primary Access |
|------|-----|----------------|
| **School Admin** | Head teacher, Deputy, School Manager | All school modules |
| **Bursar** | Accounts, Finance Officer | Finance module + reports |
| **Teacher** | Class teachers, subject teachers | Attendance, assessments, exit passes, timetable |
| **Guardian** | Parents, legal guardians | Guardian app only |
| **Super Admin** | EMS platform operators | Platform admin panel |

## System Requirements

EMS runs entirely in a web browser — no installation required.

| Requirement | Minimum |
|-------------|---------|
| Browser | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |
| Internet | Stable broadband connection |
| Screen | 1024 × 768 or larger recommended |
| Guardian App | Android 8+ or iOS 14+ |

## Next Steps

- [Login & Navigation →](./login-and-navigation)
- [Roles & Permissions →](./roles-and-permissions)
