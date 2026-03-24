import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL ?? "http://my-game-store.project";

export async function GET(req: Request) {
  const upstream = await fetch(`${BACKEND_BASE_URL}/api/users/user`, {
    cache: "no-store",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: upstream.status });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
