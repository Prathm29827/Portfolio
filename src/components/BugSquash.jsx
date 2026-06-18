import { useEffect, useRef, useState } from 'react';

const MAX_BUGS = 6;
const SPAWN_INTERVAL_MS = 1400;
const WANDER_INTERVAL_MS = 1900;

// Keep spawn/wander positions inside a safe viewport band so bugs never
// appear directly under the navbar or get clipped at the very edge.
function randomPos() {
  return {
    top: 14 + Math.random() * 70, // vh%
    left: 4 + Math.random() * 88, // vw%
  };
}

function BugIcon({ pos, onSquash }) {
  return (
    <button
      aria-label="Squash bug"
      onClick={onSquash}
      className="bug-wrap fixed z-[60] -translate-x-1/2 -translate-y-1/2 cursor-crosshair group"
      style={{ top: `${pos.top}vh`, left: `${pos.left}vw` }}
    >
      <span className="block animate-floatY drop-shadow-[0_0_8px_rgba(244,63,94,0.65)] text-2xl group-hover:scale-125 transition-transform">
        🐛
      </span>
    </button>
  );
}

function Burst({ pos }) {
  // 8 particles flung outward at evenly spaced angles with slight jitter.
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 28 + Math.random() * 18;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
    };
  });

  return (
    <div
      className="fixed z-[60] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${pos.top}vh`, left: `${pos.left}vw` }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute w-1.5 h-1.5 rounded-full bg-cyan"
          style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px` }}
        />
      ))}
    </div>
  );
}

export default function BugSquash() {
  const [enabled, setEnabled] = useState(false);
  const [bugs, setBugs] = useState([]); // { id, top, left }
  const [bursts, setBursts] = useState([]); // { id, top, left }
  const [fixedCount, setFixedCount] = useState(0);
  const idRef = useRef(0);

  // Spawn bugs up to MAX_BUGS while the game is enabled.
  useEffect(() => {
    if (!enabled) {
      setBugs([]);
      return;
    }
    const spawn = setInterval(() => {
      setBugs((prev) => {
        if (prev.length >= MAX_BUGS) return prev;
        idRef.current += 1;
        return [...prev, { id: idRef.current, ...randomPos() }];
      });
    }, SPAWN_INTERVAL_MS);
    return () => clearInterval(spawn);
  }, [enabled]);

  // Make every live bug wander to a new random spot periodically.
  useEffect(() => {
    if (!enabled) return;
    const wander = setInterval(() => {
      setBugs((prev) => prev.map((bug) => ({ ...bug, ...randomPos() })));
    }, WANDER_INTERVAL_MS);
    return () => clearInterval(wander);
  }, [enabled]);

  const squash = (bug) => {
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));
    setFixedCount((c) => c + 1);
    const burstId = `${bug.id}-${Date.now()}`;
    setBursts((prev) => [...prev, { id: burstId, top: bug.top, left: bug.left }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 600);
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <button
        onClick={() => setEnabled((e) => !e)}
        className={`font-mono text-xs px-5 py-2.5 rounded-lg border transition-all duration-200 ${
          enabled
            ? 'border-crimson/60 text-crimson bg-crimson/10 hover:bg-crimson/20'
            : 'border-teal/40 text-teal hover:bg-teal/10 hover:border-teal'
        }`}
      >
        {enabled ? '■ deactivate_bug_squash_mode' : '▶ activate_bug_squash_mode'}
      </button>
      <p className="text-slate-500 text-xs font-mono">
        easter egg — click the bugs before they wander off
      </p>

      {/* Fixed-position counter, only visible while the game is running */}
      {enabled && (
        <div className="fixed bottom-5 right-5 z-[60] glass-card rounded-lg px-4 py-2.5 font-mono text-xs">
          <span className="text-slate-400">bugs_fixed: </span>
          <span className="text-cyan font-bold">{fixedCount}</span>
        </div>
      )}

      {bugs.map((bug) => (
        <BugIcon key={bug.id} pos={bug} onSquash={() => squash(bug)} />
      ))}
      {bursts.map((b) => (
        <Burst key={b.id} pos={b} />
      ))}
    </div>
  );
}
