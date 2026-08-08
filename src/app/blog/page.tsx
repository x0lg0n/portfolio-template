import { BlurFade } from "@/components/magicui/blur-fade";
import { SlabTitle } from "@/components/slab-title";
import { Tag } from "@/components/tag";
import { posts } from "@/data/posts";
import { getExternalPosts } from "@/lib/feeds";
import { ArrowUpRight, ChevronRight, Tags } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

export const revalidate = 3600;

const BLUR_FADE_DELAY = 0.04;

interface PostItem {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  href: string;
  external: boolean;
  platform?: string;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const externalPosts = await getExternalPosts();

  const items: PostItem[] = [
    ...posts.map((post) => ({
      title: post.title,
      publishedAt: post.publishedAt,
      summary: post.summary,
      tags: post.tags,
      href: `/blog/${post.slug}`,
      external: false,
    })),
    ...externalPosts.map((post) => ({
      title: post.title,
      publishedAt: post.publishedAt,
      summary: post.summary,
      tags: post.tags,
      href: post.url,
      external: true,
      platform: post.platform,
    })),
  ].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <SlabTitle title="Blog" />
            <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
              {items.length} posts
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            My thoughts on software development, life, and more.
          </p>
        </div>
      </BlurFade>

      {items.length > 0 ? (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col gap-5">
            {items.map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.href}>
                <Link
                  className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  href={post.href}
                  {...(post.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                    {String(id + 1).padStart(2, "0")}.
                  </span>
                  <div className="flex flex-col gap-y-2 flex-1">
                    <p className="tracking-tight text-lg font-medium">
                      <span className="group-hover:text-foreground transition-colors">
                        {post.title}
                        {post.external ? (
                          <ArrowUpRight
                            className="ml-1 inline-block size-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                            aria-hidden
                          />
                        ) : (
                          <ChevronRight
                            className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                            aria-hidden
                          />
                        )}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                      {post.platform && (
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5 align-middle">
                          via {post.platform}
                        </span>
                      )}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <Tags
                          className="size-3.5 text-muted-foreground shrink-0"
                          aria-hidden
                        />
                        {post.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </BlurFade>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
