// categories used by the filter bar: 'api' | 'mobile' | 'ui'
// badge follows a QA ticket vocabulary: PASS | STABLE | VALIDATING

export const filters = [
  { id: 'all', label: 'All Systems' },
  { id: 'api', label: 'API & Backend' },
  { id: 'mobile', label: 'Mobile QA' },
  { id: 'ui', label: 'UI/UX Architecture' },
];

export const timeline = [
  {
    id: 'prym',
    type: 'role',
    badge: 'STABLE',
    period: '2023 — Present',
    title: 'R&D Software Engineer / Intern',
    org: 'PRYM Aerospace',
    categories: ['api', 'mobile', 'ui'],
    summary:
      'Embedded in an aerospace R&D environment where precision is non-negotiable — applied structured test engineering discipline to drone management software, translating strict operational requirements into verifiable test logic.',
    bullets: [
      'Partnered with engineering to define acceptance criteria for flight-adjacent software systems.',
      'Built repeatable validation frameworks for entity data, filters, and authentication boundaries.',
      'Documented findings in a format traceable back to original requirements — zero ambiguity.',
    ],
  },
  {
    id: 'drone-api',
    type: 'project',
    badge: 'PASS',
    period: '2023',
    title: 'Comprehensive API Validation Suite',
    org: 'Drone Master Management System',
    categories: ['api'],
    summary:
      'Authored 50+ structured test scenarios covering the full surface area of a drone master-management API — from entity filters to operator name validation to strict authentication rules.',
    bullets: [
      '52 positive/negative test cases across GET & POST endpoints.',
      'Entity filter validation: operator name, drone ID, status, and pagination boundaries.',
      'Authentication rule testing: expired tokens, malformed headers, and role-based access checks.',
      'Schema and status-code assertions documented for repeatable regression runs.',
    ],
  },
  {
    id: 'salam-kisan',
    type: 'project',
    badge: 'PASS',
    period: '2023',
    title: 'Mobile Application QA',
    org: 'Salam Kisan — Android App',
    categories: ['mobile'],
    summary:
      'Hands-on functional and UI/UX testing performed directly on physical OnePlus devices, surfacing real-world defects that emulators routinely miss.',
    bullets: [
      'Captured and triaged critical UI/UX defects across device sizes and Android versions.',
      'Wrote reproducible bug reports with steps, expected vs. actual behavior, and severity tags.',
      'Validated core user flows under real network conditions on physical hardware.',
    ],
  },
  {
    id: 'web-portfolio',
    type: 'project',
    badge: 'STABLE',
    period: '2024',
    title: 'Responsive Web Portfolio & UI Components',
    org: 'Independent Build',
    categories: ['ui'],
    summary:
      'Designed and validated a component library with strict visual hierarchy — testing layout integrity, contrast, and interaction states across breakpoints.',
    bullets: [
      'Zebra-striped data tables and interactive tooltips built for clarity at a glance.',
      'Responsive layout validation across mobile, tablet, and desktop breakpoints.',
      'Typography and spacing system audited for consistency before sign-off.',
    ],
  },
];
