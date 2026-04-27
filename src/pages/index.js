import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// CoreUI-style SVG icon paths (24x24 viewBox)
const icons = {
  admissions: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  academic: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  ),
  communication: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  ),
  administration: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  guardian: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
    </svg>
  ),
  platform: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  ),
  bookOpen: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
    </svg>
  ),
  newFeature: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
    </svg>
  ),
};

// Pre-computed icon background tints (colour at 10% opacity on white)
function iconBg(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.1)`;
}

const modules = [
  {
    icon: icons.admissions,
    color: '#1a73e8',
    title: 'Admissions',
    description: 'Manage admission cycles, review applications, and run the public admissions portal.',
    link: '/docs/admissions/overview',
  },
  {
    icon: icons.academic,
    color: '#0d9488',
    title: 'Academic',
    description: 'Students, classes, attendance, exit passes, assessments, timetables, and promotion.',
    link: '/docs/academic/students',
  },
  {
    icon: icons.finance,
    color: '#16a34a',
    title: 'Finance',
    description: 'Fee structures, invoicing, payments, scholarships, budgets, expenses, and requisitions.',
    link: '/docs/finance/fee-setup',
  },
  {
    icon: icons.communication,
    color: '#7c3aed',
    title: 'Communication',
    description: 'Unified inbox, messaging, notifications, and document management.',
    link: '/docs/communication/inbox',
  },
  {
    icon: icons.reports,
    color: '#d97706',
    title: 'Reports & Analytics',
    description: 'Report packs, analytics centre, and role dashboards.',
    link: '/docs/reports/overview',
  },
  {
    icon: icons.administration,
    color: '#0284c7',
    title: 'Administration',
    description: 'Staff, parents, inventory, calendar, and system settings.',
    link: '/docs/administration/staff',
  },
  {
    icon: icons.guardian,
    color: '#dc2626',
    title: 'Guardian App',
    description: 'Guide for parents using the guardian PWA and mobile app.',
    link: '/docs/guardian-app/overview',
  },
  {
    icon: icons.platform,
    color: '#475569',
    title: 'Platform Admin',
    description: 'Super admin tools: tenant management, subscriptions, and system health.',
    link: '/docs/platform-admin/overview',
  },
];

const quickLinks = [
  {
    icon: icons.bookOpen,
    color: '#1a73e8',
    title: 'New to EMS?',
    description: 'Start with the system overview to understand the key concepts and how modules connect.',
    link: '/docs/getting-started/overview',
    linkLabel: 'System overview',
  },
  {
    icon: icons.support,
    color: '#dc2626',
    title: 'Something not working?',
    description: 'Check the common issues guide or browse the FAQ for quick answers.',
    link: '/docs/troubleshooting/common-issues',
    linkLabel: 'Troubleshooting guide',
  },
  {
    icon: icons.newFeature,
    color: '#d97706',
    title: "What's new?",
    description: 'Read the latest release notes to stay up to date with new features and improvements.',
    link: '/blog',
    linkLabel: 'Release notes',
  },
];

function ModuleCard({ icon, color, title, description, link }) {
  return (
    <Link className={styles.card} to={link} style={{ '--module-color': color }}>
      <div className={styles.cardIconWrapper} style={{ '--module-icon-bg': iconBg(color) }}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardCta}>
        View docs {icons.arrowRight}
      </span>
    </Link>
  );
}

function QuickLinkCard({ icon, color, title, description, link, linkLabel }) {
  return (
    <div className={styles.quickLink}>
      <div className={styles.quickLinkIconWrapper} style={{ '--module-color': color, '--module-icon-bg': iconBg(color) }}>
        {icon}
      </div>
      <div>
        <h3 className={styles.quickLinkTitle}>{title}</h3>
        <p className={styles.quickLinkText}>{description}</p>
        <Link to={link} className={styles.quickLinkCta}>
          {linkLabel} {icons.arrowRight}
        </Link>
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
          <p className={styles.heroBadge}>EMS School Operating System</p>
          <h1 className={styles.heroTitle}>Help Centre</h1>
          <p className={styles.heroSubtitle}>
            Complete user guides, step-by-step tutorials, and support resources
            for every module of the EMS platform.
          </p>
          <div className={styles.heroCta}>
            <Link className="button button--primary button--lg" to="/docs/getting-started/overview">
              Get started
            </Link>
            <Link className="button button--outline button--lg" to="/docs/troubleshooting/faq">
              Browse FAQ
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.moduleSection}>
          <h2 className={styles.sectionTitle}>Browse by Module</h2>
          <p className={styles.sectionSubtitle}>
            Select a module below to access step-by-step guides, video walkthroughs, and tips.
          </p>
          <div className={styles.moduleGrid}>
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </section>

        <section className={styles.quickLinksSection}>
          <h2 className={styles.sectionTitle}>Quick Access</h2>
          <div className={styles.quickLinks}>
            {quickLinks.map((q) => (
              <QuickLinkCard key={q.title} {...q} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
