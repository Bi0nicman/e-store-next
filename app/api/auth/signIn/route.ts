import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL ?? "http://my-game-store.project";

export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch(`${BACKEND_BASE_URL}/api/auth/signIn`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: upstream.status });
  }

  const data = await upstream.json();

  // Propaga i cookie di sessione dal backend al client
  const response = NextResponse.json(data);
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
