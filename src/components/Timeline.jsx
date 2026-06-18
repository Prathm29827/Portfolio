import { useMemo, useState } from 'react';
import { timeline, filters } from '../data/timeline.js';
import Reveal from './Reveal.jsx';

const BADGE_STYLES = {
  PASS: 'text-teal border-teal/40 bg-teal/10',
  STABLE: 'text-cyan border-cyan/40 bg-cyan/10',
  VALIDATING: 'text-amber border-amber/40 bg-amber/10',
};

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visible = useMemo(() => {
    if (activeFilter === 'all') return timeline;
    return timeline.filter((entry) => entry.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="timeline" className="relative px-5 sm:px-8 py-24 max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs text-teal mb-3 tracking-wide">[EXPERIENCE_LOG]</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
          Roles &amp; projects
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed mb-8">
          Filter by what you care about most — every entry keeps its status
          badge and full detail either way.
        </p>
      </Reveal>

      {/* Filter bar */}
      <Reveal>
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeFilter === f.id
                  ? 'border-cyan text-cyan bg-cyan/10'
                  : 'border-line text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Timeline list */}
      <div className="relative pl-8 sm:pl-10 border-l border-line space-y-8">
        {visible.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 80}>
            <div className="relative">
              <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-void border-2 border-cyan" />
              <div className="glass-card rounded-xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-1 rounded border ${BADGE_STYLES[entry.badge]}`}
                  >
                    [{entry.badge}]
                  </span>
                  <span className="font-mono text-xs text-slate-500">{entry.period}</span>
                  {entry.type === 'role' && (
                    <span className="font-mono text-[11px] px-2 py-1 rounded border border-line text-slate-400">
                      role
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-slate-100">
                  {entry.title}
                </h3>
                <p className="text-sm text-teal font-mono mt-0.5">{entry.org}</p>

                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {entry.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm text-slate-400 leading-relaxed"
                    >
                      <span className="text-cyan mt-1 flex-shrink-0">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        {visible.length === 0 && (
          <p className="font-mono text-sm text-slate-500">
            No entries match this filter yet.
          </p>
        )}
      </div>
    </section>
  );
}
