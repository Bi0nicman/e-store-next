import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL ?? "http://my-game-store.project";

export async function GET(req: Request) {
  const upstream = await fetch(`${BACKEND_BASE_URL}/api/auth/user`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to fetch current user" }, { status: upstream.status });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
