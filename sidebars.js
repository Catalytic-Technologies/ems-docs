// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/login-and-navigation',
        'getting-started/roles-and-permissions',
      ],
    },
    {
      type: 'category',
      label: '📋 Admissions',
      items: [
        'admissions/overview',
        'admissions/admission-cycles',
        'admissions/application-pipeline',
        'admissions/admissions-portal',
      ],
    },
    {
      type: 'category',
      label: '🎓 Academic',
      items: [
        'academic/students',
        'academic/classes',
        'academic/attendance',
        'academic/exit-passes',
        'academic/assessments',
        'academic/timetables',
        'academic/electives',
        'academic/progression',
      ],
    },
    {
      type: 'category',
      label: '💰 Finance',
      items: [
        'finance/fee-setup',
        'finance/invoicing',
        'finance/payments',
        'finance/payment-plans',
        'finance/scholarships',
        'finance/budgets',
        'finance/expenses',
        'finance/requisitions',
      ],
    },
    {
      type: 'category',
      label: '💬 Communication',
      items: [
        'communication/inbox',
        'communication/notifications',
        'communication/documents',
      ],
    },
    {
      type: 'category',
      label: '📊 Reports & Analytics',
      items: [
        'reports/overview',
        'reports/report-packs',
        'reports/dashboard',
      ],
    },
    {
      type: 'category',
      label: '🏫 Administration',
      items: [
        'administration/staff',
        'administration/parents',
        'administration/inventory',
        'administration/calendar',
        'administration/settings',
      ],
    },
    {
      type: 'category',
      label: '📱 Guardian App',
      items: [
        'guardian-app/overview',
        'guardian-app/pwa-guide',
        'guardian-app/mobile-app',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Platform Admin',
      items: [
        'platform-admin/overview',
        'platform-admin/tenant-management',
        'platform-admin/subscriptions',
        'platform-admin/system-health',
        'platform-admin/audit-logs',
      ],
    },
    {
      type: 'category',
      label: '🔧 Troubleshooting',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/faq',
      ],
    },
  ],
};

export default sidebars;
