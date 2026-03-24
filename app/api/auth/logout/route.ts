import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL ?? "http://my-game-store.project";

export async function POST(req: Request) {
  const upstream = await fetch(`${BACKEND_BASE_URL}/api/auth/logout`, {
    method: "POST",
    cache: "no-store",
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to logout user" }, { status: upstream.status });
  }

  const data = await upstream.json();

  // Propaga eventuali cookie di invalidazione della sessione
  const response = NextResponse.json(data);
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
