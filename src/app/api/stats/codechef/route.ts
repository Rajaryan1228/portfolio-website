import { NextResponse } from "next/server";

// CodeChef blocks all server-side requests (Cloudflare protection).
// This endpoint signals the client to show the static profile card.
export async function GET() {
  return NextResponse.json(
    { error: "CodeChef API unavailable — Cloudflare blocks server-side requests" },
    { status: 503 }
  );
}
