import { skillCategories } from '../data/skills.js';
import Reveal from './Reveal.jsx';

// Static class lookup (not template strings) so Tailwind's content scanner
// can find every class literally — dynamic `bg-${accent}` strings would be
// invisible to the JIT compiler and get purged from the production build.
const ACCENT = {
  cyan: {
    text: 'text-cyan',
    bar: 'bg-cyan',
    cardHover: 'hover:border-cyan/50',
    dot: 'bg-cyan',
  },
  teal: {
    text: 'text-teal',
    bar: 'bg-teal',
    cardHover: 'hover:border-teal/50',
    dot: 'bg-teal',
  },
  amber: {
    text: 'text-amber',
    bar: 'bg-amber',
    cardHover: 'hover:border-amber/50',
    dot: 'bg-amber',
  },
  crimson: {
    text: 'text-crimson',
    bar: 'bg-crimson',
    cardHover: 'hover:border-crimson/50',
    dot: 'bg-crimson',
  },
};

export default function SkillsMatrix() {
  return (
    <section id="skills" className="relative px-5 sm:px-8 py-24 max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs text-teal mb-3 tracking-wide">[SKILLS_MATRIX]</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
          Coverage report
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed mb-12">
          Grouped the way a real test plan would be — by toolkit, validation
          layer, platform, and methodology. Hover a card to inspect it.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, ci) => {
          const accent = ACCENT[category.accent];
          return (
            <Reveal key={category.id} delay={ci * 100}>
              <div
                className={`glass-card rounded-xl p-6 h-full transition-colors duration-300 ${accent.cardHover}`}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                  <h3 className="font-mono text-sm text-slate-200 tracking-wide">
                    {category.label}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="group">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm text-slate-300">{skill.name}</span>
                        <span className={`font-mono text-xs ${accent.text}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
                        <div
                          className={`h-full rounded-full ${accent.bar} transition-all duration-700 ease-out group-hover:brightness-125`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
