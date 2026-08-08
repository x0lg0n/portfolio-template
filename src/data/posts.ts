export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  summary: string;
  content: string;
  tags: string[];
}

export const posts: BlogPost[] = [
  {
    title: "Welcome to my blog",
    slug: "welcome",
    publishedAt: "2026-08-08",
    summary: "First post — what this blog is about and what's coming next.",
    content:
      "This is the start of my blog. I'll be writing about software development, the things I'm building, and lessons learned along the way.",
    tags: ["Writing", "Portfolio", "Next.js"],
  },
];
