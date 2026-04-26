import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const modules = [
  {
    icon: '📋',
    title: 'Admissions',
    description: 'Manage admission cycles, review applications, and run the public admissions portal.',
    link: '/docs/admissions/overview',
  },
  {
    icon: '🎓',
    title: 'Academic',
    description: 'Students, classes, attendance, exit passes, assessments, timetables, and promotion.',
    link: '/docs/academic/students',
  },
  {
    icon: '💰',
    title: 'Finance',
    description: 'Fee structures, invoicing, payments, scholarships, budgets, expenses, and requisitions.',
    link: '/docs/finance/fee-setup',
  },
  {
    icon: '💬',
    title: 'Communication',
    description: 'Unified inbox, messaging, notifications, and document management.',
    link: '/docs/communication/inbox',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Report packs, analytics centre, and role dashboards.',
    link: '/docs/reports/overview',
  },
  {
    icon: '🏫',
    title: 'Administration',
    description: 'Staff, parents, inventory, calendar, and system settings.',
    link: '/docs/administration/staff',
  },
  {
    icon: '📱',
    title: 'Guardian App',
    description: 'Guide for parents using the guardian PWA and mobile app.',
    link: '/docs/guardian-app/overview',
  },
  {
    icon: '⚙️',
    title: 'Platform Admin',
    description: 'Super admin tools: tenant management, subscriptions, and system health.',
    link: '/docs/platform-admin/overview',
  },
];

function ModuleCard({ icon, title, description, link }) {
  return (
    <Link className={styles.card} to={link}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>EMS Help Centre</h1>
          <p className={styles.heroSubtitle}>
            Complete user guides, step-by-step tutorials, and support resources for the
            EMS School Operating System.
          </p>
          <div className={styles.heroCta}>
            <Link className="button button--primary button--lg" to="/docs/getting-started/overview">
              Get Started
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/troubleshooting/faq">
              Troubleshooting
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.moduleSection}>
          <h2 className={styles.sectionTitle}>Browse by Module</h2>
          <div className={styles.moduleGrid}>
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </section>

        <section className={styles.quickLinks}>
          <div className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>🚀</span>
            <div>
              <h3>New to EMS?</h3>
              <p>Start with the <Link to="/docs/getting-started/overview">system overview</Link> to understand the key concepts and how modules connect.</p>
            </div>
          </div>
          <div className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>🔧</span>
            <div>
              <h3>Something not working?</h3>
              <p>Check the <Link to="/docs/troubleshooting/common-issues">common issues guide</Link> or browse the <Link to="/docs/troubleshooting/faq">FAQ</Link>.</p>
            </div>
          </div>
          <div className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>📢</span>
            <div>
              <h3>What's new?</h3>
              <p>Read the latest <Link to="/blog">release notes</Link> to stay up to date with new features and improvements.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
