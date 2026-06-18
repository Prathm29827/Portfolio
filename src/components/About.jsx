import Reveal from './Reveal.jsx';

const COMPETENCIES = [
  {
    tag: 'P1',
    accent: 'cyan',
    title: 'Functional Testing & API Validation',
    detail:
      'End-to-end verification of GET/POST endpoints, pagination, filters, and authentication logic.',
  },
  {
    tag: 'P2',
    accent: 'teal',
    title: 'UI/UX Analysis & Responsive Design Testing',
    detail:
      'Cross-breakpoint layout audits, visual hierarchy checks, and interaction-state verification.',
  },
  {
    tag: 'P0',
    accent: 'crimson',
    title: 'Defect Tracking & Bug Reporting',
    detail:
      'Reproducible reports with clear severity, steps, and expected-vs-actual behavior.',
  },
  {
    tag: 'P3',
    accent: 'amber',
    title: 'Mobile Application Testing (Android / iOS)',
    detail:
      'Hands-on validation on physical devices — including OnePlus hardware — under real conditions.',
  },
];

const ACCENT_CLASSES = {
  cyan: 'border-cyan/30 text-cyan bg-cyan/10',
  teal: 'border-teal/30 text-teal bg-teal/10',
  crimson: 'border-crimson/30 text-crimson bg-crimson/10',
  amber: 'border-amber/30 text-amber bg-amber/10',
};

export default function About() {
  return (
    <section id="about" className="relative px-5 sm:px-8 py-24 max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs text-teal mb-3 tracking-wide">[ABOUT]</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-6">
          Precision is the job, not a bonus feature.
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed mb-14">
          I'm a Software QA Engineer and R&amp;D Specialist who treats every
          feature like an unverified claim until proven otherwise. My
          background spans aerospace-adjacent R&amp;D, high-volume API
          validation, and physical-device mobile testing — work that rewards
          patience, structured thinking, and an instinct for where systems
          quietly fail. I don't just file bugs; I document them so clearly
          that fixing them is the easy part.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {COMPETENCIES.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <div className="glass-card rounded-xl p-6 h-full">
              <span
                className={`inline-flex items-center justify-center font-mono text-[11px] font-bold px-2 py-1 rounded border ${ACCENT_CLASSES[item.accent]}`}
              >
                {item.tag}
              </span>
              <h3 className="mt-4 text-slate-100 font-semibold text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
