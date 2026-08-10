import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = new Set(["video.twimg.com", "pbs.twimg.com"]);
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export async function GET(request: NextRequest) {
  const u = request.nextUrl.searchParams.get("u");
  if (!u) return new Response("missing u", { status: 400 });

  let target: URL;
  try {
    target = new URL(u);
  } catch {
    return new Response("invalid url", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new Response("forbidden", { status: 403 });
  }

  const headers: Record<string, string> = {
    "User-Agent": BROWSER_UA,
    Referer: "https://t.co/",
  };
  const range = request.headers.get("range");
  if (range) headers.Range = range;

  let upstream: Response;
  try {
    upstream = await fetch(target, { headers });
  } catch {
    return new Response("upstream error", { status: 502 });
  }
  if (!upstream.ok && upstream.status !== 206) {
    return new Response("upstream " + upstream.status, {
      status: upstream.status,
    });
  }

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) responseHeaders.set("content-length", contentLength);
  const contentRange = upstream.headers.get("content-range");
  if (contentRange) responseHeaders.set("content-range", contentRange);
  responseHeaders.set("accept-ranges", "bytes");
  responseHeaders.set("cache-control", "public, max-age=86400");

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}