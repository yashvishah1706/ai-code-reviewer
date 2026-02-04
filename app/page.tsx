"use client";

import { useState } from "react";

type Finding = {
  id: string;
  severity: "high" | "medium" | "low";
  category: "bugs" | "security" | "performance" | "readability";
  lineStart: number;
  lineEnd: number;
  message: string;
  recommendation: string;
};

type ReviewResponse = {
  summary: string;
  score: number;
  findings: Finding[];
};

export default function Home() {
  const [code, setCode] = useState(
    `// Paste your code here\nfunction hello(name) {\n  return "Hello " + name;\n}\n`
  );
  const [result, setResult] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "javascript",
          focus: ["bugs", "security", "performance", "readability"],
          code,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = (await res.json()) as ReviewResponse;
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">AI Code Review Assistant</h1>
        <p className="text-sm text-gray-500">
          Day 1: Analyze button wired to backend API
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Editor */}
        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Editor</span>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="rounded-lg border px-3 py-1 text-sm disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-[520px] w-full resize-none rounded-lg border bg-white p-3 font-mono text-sm outline-none focus:ring-2"
          />
        </section>

        {/* Results */}
        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Review Results</span>
            <span className="text-sm text-gray-500">
              Score: {result ? result.score : "—"}
            </span>
          </div>

          {error && (
            <div className="mb-3 rounded-lg border p-3 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!result ? (
            <div className="rounded-lg border p-3">
              <div className="text-sm font-semibold">No results yet</div>
              <p className="mt-2 text-sm text-gray-600">
                Click Analyze to generate findings.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-semibold">{result.summary}</div>
                <p className="mt-1 text-sm text-gray-600">
                  {result.findings.length} findings detected.
                </p>
              </div>

              {result.findings.map((f) => (
                <div key={f.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {f.category.toUpperCase()} · {f.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      L{f.lineStart}
                      {f.lineEnd !== f.lineStart ? `–${f.lineEnd}` : ""}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-700">{f.message}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Fix:</strong> {f.recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
