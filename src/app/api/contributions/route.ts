import { DATA } from "@/data/resume";

export const dynamic = "force-dynamic";

export interface ContributionItem {
  type: "PR" | "Issue";
  repo: string;
  number: number;
  title: string;
  url: string;
  state: "open" | "closed" | "merged";
  createdAt: string;
  body: string;
}

interface IssueResponse {
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  pull_request?: { merged_at: string | null };
  body: string | null;
}

const CACHE_TTL = 10 * 60 * 1000;
let cache: { data: ContributionItem[]; at: number } | null = null;
let rateLimited = false;

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function cleanBody(raw: string | null): string {
  if (!raw) return "";
  let text = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?(?:```|$)/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*[-*+]\s*\[[ xX]\]\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/[*_`~]/g, "");

  const markers = [
    "pre-submit checks",
    "type of change",
    "checklist",
    "screenshots",
    "testing",
    "additional context",
    "related issues",
    "linked issues",
    "merge instructions",
  ];
  const lower = text.toLowerCase();
  const cut = markers
    .map((marker) => lower.indexOf(marker))
    .filter((index) => index > 20)
    .sort((a, b) => a - b)[0];
  if (cut !== undefined) text = text.slice(0, cut);

  text = text
    .replace(/closes\s+#?\d*\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,;:\s-]+$/, "");

  if (/^summary\b/i.test(text)) text = text.replace(/^summary\b\s*/i, "").trim();
  if (/^description\b/i.test(text)) text = text.replace(/^description\b\s*/i, "").trim();
  return text.slice(0, 240);
}

async function fetchIssue(
  repo: string,
  number: number
): Promise<ContributionItem | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues/${number}`,
      {
        headers: githubHeaders(),
        cache: "no-store",
      }
    );
    if (res.status === 403 || res.status === 429) {
      rateLimited = true;
      return null;
    }
    if (!res.ok) return null;
    const item = (await res.json()) as IssueResponse;
    const isPr = Boolean(item.pull_request);
    const merged = isPr && Boolean(item.pull_request?.merged_at);
    return {
      type: isPr ? "PR" : "Issue",
      repo,
      number,
      title: item.title,
      url: item.html_url,
      state: merged ? "merged" : item.state === "open" ? "open" : "closed",
      createdAt: item.created_at,
      body: cleanBody(item.body),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_TTL) {
    return Response.json({ items: cache.data, rateLimited: false });
  }

  const items = (
    await Promise.all(
      DATA.contributions.map((contribution) =>
        fetchIssue(contribution.repo, contribution.number)
      )
    )
  ).filter((item): item is ContributionItem => item !== null);

  cache = { data: items, at: Date.now() };
  return Response.json({ items, rateLimited });
}
