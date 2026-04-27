import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ── SVG icons (CoreUI-style, 24×24) ───────────────────────────────
const Icon = {
  GettingStarted: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 8 16 12 12 16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  Academic: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Finance: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Admissions: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  Communication: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Admin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Mobile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
};

// ── Feature cards (top 2×2 grid, GitBook-style) ───────────────────
const featureCards = [
  {
    title: 'Getting Started',
    description: 'Set up your account, learn the dashboard, and understand roles and permissions across the platform.',
    link: '/docs/getting-started/overview',
    Icon: Icon.GettingStarted,
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%)',
    iconColor: '#1d4ed8',
  },
  {
    title: 'Academic Management',
    description: 'Manage students, classes, attendance, assessments, timetables, and end-of-year progression.',
    link: '/docs/academic/students',
    Icon: Icon.Academic,
    gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    iconColor: '#065f46',
  },
  {
    title: 'Finance & Billing',
    description: 'Configure fee structures, generate invoices, record payments, and manage budgets and expenses.',
    link: '/docs/finance/fee-setup',
    Icon: Icon.Finance,
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    iconColor: '#92400e',
  },
  {
    title: 'Admissions Portal',
    description: 'Run admission cycles, manage applications through the pipeline, and operate the public portal.',
    link: '/docs/admissions/overview',
    Icon: Icon.Admissions,
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    iconColor: '#5b21b6',
  },
];

// ── Topic groups (3-column link lists, GitBook-style) ─────────────
const topicGroups = [
  {
    title: 'Academic',
    Icon: Icon.Academic,
    links: [
      { label: 'Students', to: '/docs/academic/students' },
      { label: 'Classes & Timetables', to: '/docs/academic/classes' },
      { label: 'Attendance', to: '/docs/academic/attendance' },
      { label: 'Assessments', to: '/docs/academic/assessments' },
      { label: 'Progression', to: '/docs/academic/progression' },
    ],
  },
  {
    title: 'Finance',
    Icon: Icon.Finance,
    links: [
      { label: 'Fee Setup', to: '/docs/finance/fee-setup' },
      { label: 'Invoicing', to: '/docs/finance/invoicing' },
      { label: 'Payments & Plans', to: '/docs/finance/payments' },
      { label: 'Scholarships', to: '/docs/finance/scholarships' },
      { label: 'Budgets & Expenses', to: '/docs/finance/budgets' },
    ],
  },
  {
    title: 'Communication',
    Icon: Icon.Communication,
    links: [
      { label: 'Inbox & Messaging', to: '/docs/communication/inbox' },
      { label: 'Notifications', to: '/docs/communication/notifications' },
      { label: 'Documents', to: '/docs/communication/documents' },
    ],
  },
  {
    title: 'Administration',
    Icon: Icon.Admin,
    links: [
      { label: 'Staff Management', to: '/docs/administration/staff' },
      { label: 'Parents & Guardians', to: '/docs/administration/parents' },
      { label: 'Inventory', to: '/docs/administration/inventory' },
      { label: 'Calendar', to: '/docs/administration/calendar' },
      { label: 'System Settings', to: '/docs/administration/settings' },
    ],
  },
  {
    title: 'Reports & Analytics',
    Icon: Icon.Reports,
    links: [
      { label: 'Reports Overview', to: '/docs/reports/overview' },
      { label: 'Report Packs', to: '/docs/reports/report-packs' },
      { label: 'Dashboards', to: '/docs/reports/dashboard' },
    ],
  },
  {
    title: 'Support',
    Icon: Icon.Wrench,
    links: [
      { label: 'Guardian App', to: '/docs/guardian-app/overview' },
      { label: 'Platform Admin', to: '/docs/platform-admin/overview' },
      { label: 'Common Issues', to: '/docs/troubleshooting/common-issues' },
      { label: 'FAQ', to: '/docs/troubleshooting/faq' },
      { label: 'Release Notes', to: '/blog' },
    ],
  },
];

function FeatureCard({ title, description, link, Icon: CardIcon, gradient, iconColor }) {
  return (
    <Link className={styles.featureCard} to={link}>
      <div className={styles.featureCardBody}>
        <span className={styles.featureCardIcon} style={{ color: iconColor }}>
          <CardIcon />
        </span>
        <h3 className={styles.featureCardTitle}>{title}</h3>
        <p className={styles.featureCardDesc}>{description}</p>
        <span className={styles.featureCardCta}>
          View guide <Icon.ArrowRight />
        </span>
      </div>
      <div className={styles.featureCardArt} style={{ background: gradient }} aria-hidden="true" />
    </Link>
  );
}

function TopicGroup({ title, Icon: GroupIcon, links }) {
  return (
    <div className={styles.topicGroup}>
      <div className={styles.topicGroupHeader}>
        <span className={styles.topicGroupIcon}><GroupIcon /></span>
        <h3 className={styles.topicGroupTitle}>{title}</h3>
      </div>
      <ul className={styles.topicGroupLinks}>
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className={styles.topicLink}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Overview" description={siteConfig.tagline}>
      <main className={styles.page}>

        {/* Page header — no full-bleed hero, just clean heading */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>EMS Help Centre</h1>
          <p className={styles.pageSubtitle}>
            User guides, step-by-step tutorials, and support documentation for
            the EMS School Operating System. Select a topic below to get started.
          </p>
          <div className={styles.headerLinks}>
            <Link to="/docs/getting-started/overview" className={styles.primaryLink}>
              Quick start <Icon.ArrowRight />
            </Link>
            <Link to="/docs/troubleshooting/faq" className={styles.secondaryLink}>
              FAQ
            </Link>
          </div>
        </div>

        {/* Feature cards — 2×2 grid */}
        <section className={styles.section}>
          <div className={styles.featureGrid}>
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Topic groups — 3-column link lists */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>All modules</h2>
          <div className={styles.topicGrid}>
            {topicGroups.map((g) => (
              <TopicGroup key={g.title} {...g} />
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
}
