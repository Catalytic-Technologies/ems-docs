// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EMS Help Centre',
  tagline: 'User guides, tutorials, and support for the EMS School Operating System',
  favicon: 'img/favicon.ico',

  url: 'https://ems-docs.vercel.app',
  baseUrl: '/',

  organizationName: 'ems-system',
  projectName: 'ems-docs',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/ems-system/ems-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Release Notes',
          blogDescription: 'EMS product updates, new features, and announcements',
          postsPerPage: 10,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: 'keywords', content: 'ems, school management, student information system, tutorials, help' },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'EMS Help Centre',
        logo: {
          alt: 'EMS Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/blog',
            label: 'Release Notes',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/ems-system/ems-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Getting Started',
            items: [
              { label: 'System Overview', to: '/docs/getting-started/overview' },
              { label: 'Login & Navigation', to: '/docs/getting-started/login-and-navigation' },
              { label: 'Roles & Permissions', to: '/docs/getting-started/roles-and-permissions' },
            ],
          },
          {
            title: 'Modules',
            items: [
              { label: 'Academic', to: '/docs/academic/students' },
              { label: 'Finance', to: '/docs/finance/fee-setup' },
              { label: 'Admissions', to: '/docs/admissions/overview' },
              { label: 'Reports', to: '/docs/reports/overview' },
            ],
          },
          {
            title: 'Support',
            items: [
              { label: 'Troubleshooting', to: '/docs/troubleshooting/common-issues' },
              { label: 'FAQ', to: '/docs/troubleshooting/faq' },
              { label: 'Release Notes', to: '/blog' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} EMS School Operating System. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
      announcementBar: {
        id: 'welcome',
        content: 'Welcome to the EMS Help Centre — your complete guide to the EMS School Operating System.',
        backgroundColor: '#1565C0',
        textColor: '#ffffff',
        isCloseable: true,
      },
    }),
};

export default config;
