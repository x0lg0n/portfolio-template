import { getTweet } from "react-tweet/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tweet = await getTweet(id).catch(() => undefined);
  return NextResponse.json({ data: tweet ?? null }, { status: tweet ? 200 : 404 });
}
