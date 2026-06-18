import LiveConsole from './LiveConsole.jsx';
import Reveal from './Reveal.jsx';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center">
        <Reveal>
          <p className="font-mono text-xs sm:text-sm text-teal mb-5 tracking-wide">
            [ STATUS: AVAILABLE_FOR_HIRE ]
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-50 leading-[1.1] tracking-tight">
            Prathmesh
            <br />
            Marwalikar
          </h1>
          <p className="mt-4 font-mono text-cyan text-sm sm:text-base">
            Software QA Engineer / R&amp;D Specialist
          </p>
          <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Breaking code to make it unbreakable. Specialized in API
            validation, mobile ecosystems, and bulletproof user experiences —
            so what ships is reliable, not just finished.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#timeline"
              className="px-6 py-3 rounded-lg bg-cyan text-void font-semibold text-sm tracking-wide hover:bg-cyan-soft hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] transition-all duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-line text-slate-200 font-semibold text-sm tracking-wide hover:border-cyan/60 hover:text-cyan transition-all duration-200"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 flex gap-8 font-mono text-xs text-slate-500">
            <div>
              <span className="text-2xl text-slate-100 font-bold block">52+</span>
              test scenarios authored
            </div>
            <div>
              <span className="text-2xl text-slate-100 font-bold block">0</span>
              tolerance for ambiguity
            </div>
            <div>
              <span className="text-2xl text-slate-100 font-bold block">2</span>
              platforms validated daily
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <LiveConsole />
        </Reveal>
      </div>
    </section>
  );
}
