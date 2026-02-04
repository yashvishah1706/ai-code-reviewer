import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  return NextResponse.json({
    summary: "Mock review completed",
    score: 84,
    findings: [
      {
        id: "SEC-001",
        severity: "high",
        category: "security",
        lineStart: 8,
        lineEnd: 8,
        message: "User input is directly used without validation.",
        recommendation: "Validate and sanitize all user inputs.",
      },
      {
        id: "BUG-002",
        severity: "medium",
        category: "bugs",
        lineStart: 15,
        lineEnd: 17,
        message: "Possible undefined variable access.",
        recommendation: "Add null checks before usage.",
      },
    ],
    meta: {
      receivedBody: Boolean(body),
      timestamp: new Date().toISOString(),
    },
  });
}
