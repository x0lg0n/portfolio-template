import { NextResponse } from "next/server";

import { DATA } from "@/data/resume";

export const dynamic = "force-dynamic";

export async function GET() {
  const hostname = new URL(DATA.url).hostname;

  const response = await fetch(`https://hits.sh/${hostname}.svg`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return NextResponse.json({ views: null }, { status: 502 });
  }

  const svg = await response.text();
  const match = svg.match(/hits:\s*(\d+)/);

  return NextResponse.json({
    views: match ? Number(match[1]) : null,
  });
}
