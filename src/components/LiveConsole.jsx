import { useEffect, useRef, useState } from 'react';

// Each line is typed out character-by-character. `tone` controls the color
// of the line once fully typed (status colors mirror real CI/test output).
const SCRIPT = [
  { text: '$ node run test_suite.js', tone: 'slate' },
  { text: '> Initializing test suite...', tone: 'slate' },
  { text: '> Connecting to API endpoint... [200 OK]', tone: 'teal' },
  { text: '> Validating authentication tokens... PASSED', tone: 'teal' },
  { text: '> Running 52 test scenarios... 52/52 PASSED', tone: 'cyan' },
  { text: '> Scanning UI render tree... 0 critical defects', tone: 'cyan' },
  { text: '> Mobile sync — OnePlus device... STABLE', tone: 'teal' },
  { text: '> Suite completed in 1.42s', tone: 'slate' },
  { text: '> STATUS: ALL SYSTEMS NOMINAL ✓', tone: 'cyan-bold' },
];

const TONE_CLASS = {
  slate: 'text-slate-400',
  teal: 'text-teal',
  cyan: 'text-cyan',
  'cyan-bold': 'text-cyan font-semibold',
};

const TYPE_SPEED_MS = 28;
const LINE_PAUSE_MS = 380;
const LOOP_PAUSE_MS = 2600;

export default function LiveConsole() {
  const [lines, setLines] = useState([]); // fully committed lines
  const [current, setCurrent] = useState(''); // line currently being typed
  const timeoutRef = useRef(null);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let committed = [];

    const tick = () => {
      const activeLine = SCRIPT[lineIndex];

      if (charIndex <= activeLine.text.length) {
        setCurrent(activeLine.text.slice(0, charIndex));
        charIndex += 1;
        timeoutRef.current = setTimeout(tick, TYPE_SPEED_MS);
        return;
      }

      // Line finished typing — commit it and move on.
      committed = [...committed, activeLine];
      setLines(committed);
      setCurrent('');
      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < SCRIPT.length) {
        timeoutRef.current = setTimeout(tick, LINE_PAUSE_MS);
      } else {
        // Full script done — pause, then reset and loop.
        timeoutRef.current = setTimeout(() => {
          committed = [];
          lineIndex = 0;
          charIndex = 0;
          setLines([]);
          setCurrent('');
          timeoutRef.current = setTimeout(tick, TYPE_SPEED_MS);
        }, LOOP_PAUSE_MS);
      }
    };

    timeoutRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="glass-card rounded-xl overflow-hidden w-full">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surfacealt/60">
        <span className="w-3 h-3 rounded-full bg-crimson/70" />
        <span className="w-3 h-3 rounded-full bg-amber/70" />
        <span className="w-3 h-3 rounded-full bg-teal/70" />
        <span className="ml-3 font-mono text-xs text-slate-500">qa-console — zsh</span>
      </div>

      {/* Output */}
      <div className="p-5 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[220px]">
        {lines.map((line, i) => (
          <div key={i} className={TONE_CLASS[line.tone]}>
            {line.text}
          </div>
        ))}
        <div className={TONE_CLASS[SCRIPT[lines.length]?.tone || 'slate']}>
          {current}
          <span className="inline-block w-2 h-4 bg-cyan ml-0.5 align-middle animate-blink" />
        </div>
      </div>
    </div>
  );
}
