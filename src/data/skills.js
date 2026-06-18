// Skill proficiency is self-assessed and drives the width of each progress bar.
// accent keys map to Tailwind color tokens defined in tailwind.config.js
export const skillCategories = [
  {
    id: 'toolkits',
    label: 'Testing Toolkits',
    accent: 'cyan',
    skills: [
      { name: 'Postman / API Clients', level: 92 },
      { name: 'JIRA — Defect Lifecycle', level: 88 },
      { name: 'Browser DevTools & Network Inspection', level: 85 },
      { name: 'TestRail / Test Case Management', level: 80 },
    ],
  },
  {
    id: 'api',
    label: 'API Validation',
    accent: 'teal',
    skills: [
      { name: 'GET / POST Endpoint Testing', level: 94 },
      { name: 'Pagination & Entity Filters', level: 90 },
      { name: 'Authentication & Token Logic', level: 87 },
      { name: 'Schema & Status Code Validation', level: 89 },
    ],
  },
  {
    id: 'platforms',
    label: 'Platforms',
    accent: 'amber',
    skills: [
      { name: 'Android — OnePlus Device Validation', level: 91 },
      { name: 'iOS Functional Testing', level: 78 },
      { name: 'Responsive Web (Chrome / Firefox / Safari)', level: 88 },
      { name: 'Cross-Browser Compatibility', level: 84 },
    ],
  },
  {
    id: 'methodology',
    label: 'Methodology',
    accent: 'crimson',
    skills: [
      { name: 'Test Case Design (Positive / Negative)', level: 93 },
      { name: 'Defect Tracking & Bug Reporting', level: 90 },
      { name: 'Regression Testing', level: 86 },
      { name: 'Agile / Scrum QA Cycles', level: 82 },
    ],
  },
];
