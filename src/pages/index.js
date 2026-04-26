import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const modules = [
  {
    title: 'Admissions',
    description: 'Manage admission cycles, review applications, and run the public admissions portal.',
    link: '/docs/admissions/overview',
    category: 'Academic',
  },
  {
    title: 'Academic',
    description: 'Students, classes, attendance, exit passes, assessments, timetables, and promotion.',
    link: '/docs/academic/students',
    category: 'Academic',
  },
  {
    title: 'Finance',
    description: 'Fee structures, invoicing, payments, scholarships, budgets, expenses, and requisitions.',
    link: '/docs/finance/fee-setup',
    category: 'Finance',
  },
  {
    title: 'Communication',
    description: 'Unified inbox, messaging, notifications, and document management.',
    link: '/docs/communication/inbox',
    category: 'Admin',
  },
  {
    title: 'Reports & Analytics',
    description: 'Report packs, analytics centre, and role dashboards.',
    link: '/docs/reports/overview',
    category: 'Admin',
  },
  {
    title: 'Administration',
    description: 'Staff, parents, inventory, calendar, and system settings.',
    link: '/docs/administration/staff',
    category: 'Admin',
  },
  {
    title: 'Guardian App',
    description: 'Guide for parents using the guardian PWA and mobile application.',
    link: '/docs/guardian-app/overview',
    category: 'App',
  },
  {
    title: 'Platform Admin',
    description: 'Super admin tools: tenant management, subscriptions, and system health.',
    link: '/docs/platform-admin/overview',
    category: 'Platform',
  },
];

const quickLinks = [
  {
    heading: 'New to EMS?',
    body: (
      <>
        Start with the{' '}
        <Link to="/docs/getting-started/overview">system overview</Link> to
        understand key concepts and how modules connect.
      </>
    ),
  },
  {
    heading: 'Something not working?',
    body: (
      <>
        Check the{' '}
        <Link to="/docs/troubleshooting/common-issues">common issues guide</Link>{' '}
        or browse the <Link to="/docs/troubleshooting/faq">FAQ</Link>.
      </>
    ),
  },
  {
    heading: "What's new?",
    body: (
      <>
        Read the latest{' '}
        <Link to="/blog">release notes</Link> to stay up to date with new
        features and improvements.
      </>
    ),
  },
];

function ModuleCard({ title, description, link }) {
  return (
    <Link className={styles.card} to={link}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardCta}>View guide &rarr;</span>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>EMS Help Centre</div>
          <h1 className={styles.heroTitle}>School Operating System</h1>
          <p className={styles.heroSubtitle}>
            Complete user guides, step-by-step tutorials, and support resources
            for every module in the EMS platform.
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
          <p className={styles.sectionSubtitle}>
            Select a module below to find step-by-step guides and tutorials.
          </p>
          <div className={styles.moduleGrid}>
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </section>

        <section className={styles.quickLinks}>
          {quickLinks.map((ql) => (
            <div key={ql.heading} className={styles.quickLink}>
              <h3 className={styles.quickLinkHeading}>{ql.heading}</h3>
              <p className={styles.quickLinkBody}>{ql.body}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
