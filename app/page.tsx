"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState(
    `// Paste your code here\nfunction hello(name) {\n  return "Hello " + name;\n}\n`
  );

  return (
    <main className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">AI Code Review Assistant</h1>
        <p className="text-sm text-gray-500">
          Day 1: UI skeleton (editor + results panel)
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Editor */}
        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Editor</span>
            <button className="rounded-lg border px-3 py-1 text-sm">
              Analyze
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-[520px] w-full resize-none rounded-lg border bg-white p-3 font-mono text-sm outline-none focus:ring-2"
          />
        </section>

        {/* Right: Results */}
        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Review Results</span>
            <span className="text-sm text-gray-500">Score: —</span>
          </div>

          <div className="rounded-lg border p-3">
            <div className="text-sm font-semibold">No results yet</div>
            <p className="mt-2 text-sm text-gray-600">
              Click Analyze to generate findings.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
