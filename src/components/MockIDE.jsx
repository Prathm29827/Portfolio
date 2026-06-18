import { useState } from 'react';
import Reveal from './Reveal.jsx';

// Lightweight syntax highlighter: tokenizes a single line of code into
// colored segments. Deliberately hand-rolled (no external highlighter
// dependency) so the bundle stays small and the QA color language stays
// fully under our control.
const TOKEN_PATTERN =
  /(\/\/.*$)|("[A-Za-z0-9_]+"(?=\s*:))|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\b(?:const|let|var|function|async|await|return|describe|it|expect|true|false|null|import|from|export|default|new|class|extends|toBe|toBeTruthy|toMatch)\b)|(\b\d+\b)/g;

function highlight(line) {
  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), cls: 'text-slate-300' });
    }
    const [full, comment, jsonKey, dString, sString, keyword, number] = match;
    let cls = 'text-slate-300';
    if (comment) cls = 'text-slate-500 italic';
    else if (jsonKey) cls = 'text-cyan';
    else if (dString || sString) cls = 'text-teal';
    else if (keyword) cls = 'text-[#C084FC]';
    else if (number) cls = 'text-amber';
    tokens.push({ text: full, cls });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), cls: 'text-slate-300' });
  }
  return tokens;
}

const FILES = {
  json: {
    label: 'test_cases.json',
    dot: 'bg-cyan',
    lines: [
      '{',
      '  "suite": "drone-master-api",',
      '  "testCases": [',
      '    {',
      '      "id": "TC-014",',
      '      "endpoint": "GET /api/v2/drones",',
      '      "scenario": "positive",',
      '      "params": { "operatorName": "Marwalikar_RD", "page": 1, "limit": 25 },',
      '      "auth": { "token": "Bearer ***********", "expected": 200 },',
      '      "result": "PASS"',
      '    },',
      '    {',
      '      "id": "TC-015",',
      '      "endpoint": "GET /api/v2/drones",',
      '      "scenario": "negative",',
      '      "params": { "operatorName": "", "page": -1 },',
      '      "auth": { "token": "Bearer EXPIRED", "expected": 401 },',
      '      "result": "PASS"',
      '    },',
      '    {',
      '      "id": "TC-016",',
      '      "endpoint": "POST /api/v2/drones/assign",',
      '      "scenario": "negative",',
      '      "params": { "droneId": "DR-2291", "operatorName": null },',
      '      "auth": { "token": "Bearer VALID", "expected": 422 },',
      '      "result": "PASS"',
      '    }',
      '  ],',
      '  "totalScenarios": 52,',
      '  "status": "ALL PASSED"',
      '}',
    ],
  },
  js: {
    label: 'api_validation.test.js',
    dot: 'bg-teal',
    lines: [
      '// api_validation.test.js',
      'import { api } from "./client";',
      '',
      'describe("Drone Master API — Authentication", () => {',
      '  it("rejects expired tokens with 401", async () => {',
      '    const res = await api.get("/drones", {',
      '      headers: { Authorization: "Bearer EXPIRED" },',
      '    });',
      '    expect(res.status).toBe(401); // PASS',
      '  });',
      '',
      '  it("filters by operator name — exact match", async () => {',
      '    const res = await api.get("/drones?operatorName=Marwalikar_RD");',
      '    const allMatch = res.data.every((d) => d.operator === "Marwalikar_RD");',
      '    expect(allMatch).toBe(true); // PASS',
      '  });',
      '',
      '  it("rejects negative pagination values", async () => {',
      '    const res = await api.get("/drones?page=-1&limit=25");',
      '    expect(res.status).toBe(400); // PASS',
      '  });',
      '});',
    ],
  },
};

export default function MockIDE() {
  const [activeTab, setActiveTab] = useState('json');
  const file = FILES[activeTab];

  return (
    <section id="ide" className="relative px-5 sm:px-8 py-24 max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs text-teal mb-3 tracking-wide">[CODE_SHOWCASE]</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
          What the test logic actually looks like
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed mb-10">
          A real excerpt from the drone master-management validation suite —
          structured test data on one tab, executable assertions on the
          other.
        </p>
      </Reveal>

      <Reveal>
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surfacealt/60">
            <span className="w-3 h-3 rounded-full bg-crimson/70" />
            <span className="w-3 h-3 rounded-full bg-amber/70" />
            <span className="w-3 h-3 rounded-full bg-teal/70" />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-line bg-ink/60 overflow-x-auto">
            {Object.entries(FILES).map(([key, f]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs whitespace-nowrap border-r border-line transition-colors ${
                  activeTab === key
                    ? 'text-slate-100 bg-surface'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${f.dot}`} />
                {f.label}
              </button>
            ))}
          </div>

          {/* Code body */}
          <div className="overflow-x-auto">
            <pre className="font-mono text-[12.5px] sm:text-sm leading-relaxed py-4">
              {file.lines.map((line, i) => (
                <div key={i} className="flex hover:bg-white/[0.02] px-4">
                  <span className="select-none w-8 sm:w-10 flex-shrink-0 text-right pr-4 text-slate-600">
                    {i + 1}
                  </span>
                  <code className="whitespace-pre">
                    {line.length === 0
                      ? '\u00A0'
                      : highlight(line).map((tok, ti) => (
                          <span key={ti} className={tok.cls}>
                            {tok.text}
                          </span>
                        ))}
                  </code>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
