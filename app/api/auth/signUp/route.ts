import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL ?? "http://my-game-store.project";

export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch(`${BACKEND_BASE_URL}/api/auth/signUp`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    let message = text || "Failed to create user";
    try {
      const errJson = text ? JSON.parse(text) : null;
      message = errJson?.message ?? errJson?.error ?? message;
    } catch {}
    return NextResponse.json({ error: message }, { status: upstream.status });
  }

  const text = await upstream.text();
  if (!text || text.trim() === "") {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  return NextResponse.json(JSON.parse(text), { status: upstream.status });
}
