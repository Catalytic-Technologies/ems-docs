import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ── Outline SVG icons — 24 × 24, 1.75px stroke ────────────────────
const Icon = {
  ArrowRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
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
  Wrench: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Login: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Module: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
};

// ── 2×2 Feature cards ──────────────────────────────────────────────
const featureCards = [
  {
    title: 'Getting Started',
    description: 'Set up your account, understand the dashboard, and learn roles and permissions.',
    link: '/docs/getting-started/overview',
    CardIcon: Icon.GettingStarted,
    accentColor: '#2563eb',
    artGradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
  },
  {
    title: 'Academic',
    description: 'Students, classes, attendance, assessments, timetables, and end-of-year progression.',
    link: '/docs/academic/students',
    CardIcon: Icon.Academic,
    accentColor: '#0d9488',
    artGradient: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
  },
  {
    title: 'Finance & Billing',
    description: 'Fee structures, invoicing, payments, scholarships, budgets, and requisitions.',
    link: '/docs/finance/fee-setup',
    CardIcon: Icon.Finance,
    accentColor: '#2563eb',
    artGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  },
  {
    title: 'Admissions',
    description: 'Admission cycles, application pipeline, and the public admissions portal.',
    link: '/docs/admissions/overview',
    CardIcon: Icon.Admissions,
    accentColor: '#7c3aed',
    artGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
  },
];

// ── Quick-start stepper ────────────────────────────────────────────
const quickStartSteps = [
  {
    num: '01',
    title: 'Log in',
    description: 'Use the credentials your school administrator provided. First-time users set a new password on first login.',
    link: '/docs/getting-started/login-and-navigation',
    StepIcon: Icon.Login,
  },
  {
    num: '02',
    title: 'Explore your dashboard',
    description: 'Your dashboard surfaces module shortcuts, pending tasks, and recent activity tailored to your role.',
    link: '/docs/getting-started/overview',
    StepIcon: Icon.Dashboard,
  },
  {
    num: '03',
    title: 'Open a module',
    description: 'Navigate via the sidebar to Academic, Finance, Admissions, or any other module to begin your workflow.',
    link: '/docs/getting-started/roles-and-permissions',
    StepIcon: Icon.Module,
  },
];

// ── Topic groups ───────────────────────────────────────────────────
const topicGroups = [
  {
    title: 'Academic',
    GroupIcon: Icon.Academic,
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
    GroupIcon: Icon.Finance,
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
    GroupIcon: Icon.Communication,
    links: [
      { label: 'Inbox & Messaging', to: '/docs/communication/inbox' },
      { label: 'Notifications', to: '/docs/communication/notifications' },
      { label: 'Documents', to: '/docs/communication/documents' },
    ],
  },
  {
    title: 'Administration',
    GroupIcon: Icon.Admin,
    links: [
      { label: 'Staff', to: '/docs/administration/staff' },
      { label: 'Parents & Guardians', to: '/docs/administration/parents' },
      { label: 'Inventory', to: '/docs/administration/inventory' },
      { label: 'Calendar', to: '/docs/administration/calendar' },
      { label: 'System Settings', to: '/docs/administration/settings' },
    ],
  },
  {
    title: 'Reports & Analytics',
    GroupIcon: Icon.Reports,
    links: [
      { label: 'Reports Overview', to: '/docs/reports/overview' },
      { label: 'Report Packs', to: '/docs/reports/report-packs' },
      { label: 'Dashboards', to: '/docs/reports/dashboard' },
    ],
  },
  {
    title: 'Support & Admin',
    GroupIcon: Icon.Wrench,
    links: [
      { label: 'Guardian App', to: '/docs/guardian-app/overview' },
      { label: 'Platform Admin', to: '/docs/platform-admin/overview' },
      { label: 'Common Issues', to: '/docs/troubleshooting/common-issues' },
      { label: 'FAQ', to: '/docs/troubleshooting/faq' },
      { label: 'Release Notes', to: '/blog' },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────
function FeatureCard({ title, description, link, CardIcon, accentColor, artGradient }) {
  return (
    <Link className={styles.card} to={link} style={{ '--accent': accentColor }}>
      <div className={styles.cardBody}>
        <span className={styles.cardIcon}>
          <CardIcon />
        </span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <span className={styles.cardCta}>
          View guide <Icon.ArrowRight />
        </span>
      </div>
      <div className={styles.cardArt} style={{ background: artGradient }} aria-hidden="true">
        <span className={styles.cardArtIcon}>
          <CardIcon />
        </span>
      </div>
    </Link>
  );
}

function StepCard({ num, title, description, link, StepIcon, isLast }) {
  return (
    <div className={styles.stepItem}>
      <div className={styles.stepTrack}>
        <div className={styles.stepBadge}>{num}</div>
        {!isLast && <div className={styles.stepLine} aria-hidden="true" />}
      </div>
      <div className={styles.stepContent}>
        <div className={styles.stepIconRow}>
          <span className={styles.stepIcon}><StepIcon /></span>
          <h3 className={styles.stepTitle}>{title}</h3>
        </div>
        <p className={styles.stepDesc}>{description}</p>
        <Link to={link} className={styles.stepLink}>
          Learn more <Icon.ArrowRight />
        </Link>
      </div>
    </div>
  );
}

function TopicGroup({ title, GroupIcon, links }) {
  return (
    <div className={styles.topicGroup}>
      <div className={styles.topicHeader}>
        <span className={styles.topicIcon}><GroupIcon /></span>
        <span className={styles.topicTitle}>{title}</span>
      </div>
      <ul className={styles.topicLinks}>
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className={styles.topicLink}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Overview" description={siteConfig.tagline}>
      <main className={styles.page}>

        {/* ── Header ── */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>EMS Help Centre</h1>
          <p className={styles.pageSubtitle}>
            Complete user guides, step-by-step tutorials, and reference documentation
            for every module of the EMS School Operating System.
          </p>
          <div className={styles.headerCtas}>
            <Link to="/docs/getting-started/overview" className={styles.ctaPrimary}>
              Quick start <Icon.ArrowRight />
            </Link>
            <Link to="/docs/troubleshooting/faq" className={styles.ctaSecondary}>
              Browse FAQ
            </Link>
          </div>
        </header>

        {/* ── Feature cards 2×2 ── */}
        <section className={styles.section}>
          <div className={styles.cardGrid}>
            {featureCards.map((c) => (
              <FeatureCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <hr className={styles.rule} />

        {/* ── Quick-start stepper ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Get started in 3 steps</h2>
          <div className={styles.stepperGrid}>
            {quickStartSteps.map((s, i) => (
              <StepCard
                key={s.num}
                {...s}
                isLast={i === quickStartSteps.length - 1}
              />
            ))}
          </div>
        </section>

        <hr className={styles.rule} />

        {/* ── Topic groups ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>All modules</h2>
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
