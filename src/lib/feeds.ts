import { FEED_SOURCES, type FeedSource } from "@/data/feeds";

export interface ExternalPost {
  title: string;
  slug: string;
  url: string;
  publishedAt: string;
  summary: string;
  content: string;
  tags: string[];
  platform: string;
  platformId: string;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(value: string): string {
  return decodeEntities(
    value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  );
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`/g, "")
    .replace(/(^|\s)#{1,6}\s/g, "$1")
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[>_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function field(item: string, name: string): string {
  const match = item.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`)
  );
  return match?.[1]?.trim() ?? "";
}

function feedUrl(source: FeedSource): string {
  switch (source.id) {
    case "medium":
      return `https://medium.com/feed/@${source.handle}`;
    case "devto":
      return `https://dev.to/feed/${source.handle}`;
    case "hashnode":
      return `https://hashnode.com/feed/${source.handle}`;
    case "substack":
      return `https://${source.handle}.substack.com/feed`;
  }
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function parseRss(
  xml: string
): Omit<ExternalPost, "platform" | "platformId">[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items
    .map((item) => {
      const title = stripHtml(field(item, "title"));
      const url = decodeEntities(field(item, "link"));
      const pubDate = field(item, "pubDate") || field(item, "published");
      const description = stripHtml(field(item, "description"));
      const content = decodeEntities(
        field(item, "content:encoded") ||
          field(item, "encoded") ||
          field(item, "description")
      );
      const tags = [...item.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/g)]
        .map((match) => stripHtml(match[1]))
        .filter(Boolean);

      return {
        title,
        slug: slugify(title),
        url,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : "",
        summary: stripMarkdown(truncate(stripHtml(content || description), 200)),
        content,
        tags,
      };
    })
    .filter((post) => post.title && post.url);
}

export async function getExternalPosts(): Promise<ExternalPost[]> {
  const enabled = FEED_SOURCES.filter((source) => source.handle);
  if (enabled.length === 0) return [];

  const results = await Promise.allSettled(
    enabled.map(async (source): Promise<ExternalPost[]> => {
      const response = await fetch(feedUrl(source), {
        next: { revalidate: 3600 },
      });
      if (!response.ok) return [];
      const xml = await response.text();
      return parseRss(xml).map((post) => ({
        ...post,
        slug: `${source.id}-${post.slug}`,
        platform: source.name,
        platformId: source.id,
      }));
    })
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );
}
