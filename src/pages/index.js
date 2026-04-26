import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  Admissions: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Academic: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Finance: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  ),
  Communication: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Reports: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  Administration: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    </svg>
  ),
  Guardian: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="12" x="8" y="2" rx="2"/><path d="M6 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
    </svg>
  ),
  Platform: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  BookOpen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Wrench: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
};

const modules = [
  {
    Icon: Icons.Admissions,
    title: 'Admissions',
    description: 'Manage admission cycles, review applications, and run the public admissions portal.',
    link: '/docs/admissions/overview',
    color: 'var(--ifm-color-primary)',
    bg: 'rgba(30, 136, 229, 0.08)',
  },
  {
    Icon: Icons.Academic,
    title: 'Academic',
    description: 'Students, classes, attendance, assessments, timetables, and class promotion.',
    link: '/docs/academic/students',
    color: '#2E7D32',
    bg: '#E8F5E9',
  },
  {
    Icon: Icons.Finance,
    title: 'Finance',
    description: 'Fee structures, invoicing, payments, scholarships, budgets, expenses, and requisitions.',
    link: '/docs/finance/fee-setup',
    color: '#E65100',
    bg: '#FFF3E0',
  },
  {
    Icon: Icons.Communication,
    title: 'Communication',
    description: 'Unified inbox, messaging, notifications, and document management.',
    link: '/docs/communication/inbox',
    color: '#6A1B9A',
    bg: '#F3E5F5',
  },
  {
    Icon: Icons.Reports,
    title: 'Reports & Analytics',
    description: 'Report packs, analytics centre, and role dashboards.',
    link: '/docs/reports/overview',
    color: '#00695C',
    bg: '#E0F2F1',
  },
  {
    Icon: Icons.Administration,
    title: 'Administration',
    description: 'Staff, parents, inventory, calendar, and system settings.',
    link: '/docs/administration/staff',
    color: '#AD1457',
    bg: '#FCE4EC',
  },
  {
    Icon: Icons.Guardian,
    title: 'Guardian App',
    description: 'Guide for parents using the guardian PWA and mobile application.',
    link: '/docs/guardian-app/overview',
    color: '#1565C0',
    bg: '#E3F2FD',
  },
  {
    Icon: Icons.Platform,
    title: 'Platform Admin',
    description: 'Super admin tools: tenant management, subscriptions, and system health.',
    link: '/docs/platform-admin/overview',
    color: '#4E342E',
    bg: '#EFEBE9',
  },
];

function ModuleCard({ Icon, title, description, link, color, bg }) {
  return (
    <Link className={styles.card} to={link}>
      <div className={styles.cardIconWrap} style={{ background: bg, color }}>
        <Icon />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <span className={styles.cardArrow} style={{ color }}>
        <Icons.ArrowRight />
      </span>
    </Link>
  );
}

function QuickLink({ Icon, title, children }) {
  return (
    <div className={styles.quickLink}>
      <div className={styles.quickLinkIcon}>
        <Icon />
      </div>
      <div>
        <h3 className={styles.quickLinkTitle}>{title}</h3>
        <p className={styles.quickLinkText}>{children}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Help Centre</div>
          <h1 className={styles.heroTitle}>EMS School Operating System</h1>
          <p className={styles.heroSubtitle}>
            Step-by-step guides, video tutorials, and reference documentation
            for every module of the EMS platform.
          </p>
          <div className={styles.heroCta}>
            <Link className={styles.btnPrimary} to="/docs/getting-started/overview">
              Get Started
            </Link>
            <Link className={styles.btnOutline} to="/docs/troubleshooting/faq">
              Troubleshooting
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.moduleSection}>
          <h2 className={styles.sectionTitle}>Browse by Module</h2>
          <p className={styles.sectionSubtitle}>
            Select a module to see step-by-step guides, screenshots, and video walkthroughs.
          </p>
          <div className={styles.moduleGrid}>
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </section>

        <section className={styles.quickLinks}>
          <QuickLink Icon={Icons.BookOpen} title="New to EMS?">
            Start with the <Link to="/docs/getting-started/overview">system overview</Link> to understand
            how modules connect, then follow the <Link to="/docs/getting-started/login-and-navigation">login
            and navigation guide</Link>.
          </QuickLink>
          <QuickLink Icon={Icons.Wrench} title="Something not working?">
            Check <Link to="/docs/troubleshooting/common-issues">common issues</Link> or browse the{' '}
            <Link to="/docs/troubleshooting/faq">FAQ</Link>. You can also use the chat assistant
            (bottom right) to ask a question instantly.
          </QuickLink>
          <QuickLink Icon={Icons.Bell} title="What is new?">
            Read the latest <Link to="/blog">release notes</Link> to stay up to date with
            new features and improvements.
          </QuickLink>
        </section>
      </main>
    </Layout>
  );
}
