import { BlurFade } from "@/components/magicui/blur-fade";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { DATA } from "@/data/resume";
import { getExternalPosts } from "@/lib/feeds";
import { ArrowUpRight, Tags } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getExternalPosts()).find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: post.url },
    robots: { index: false, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: post.url,
      siteName: DATA.name,
      publishedTime: post.publishedAt,
      authors: [DATA.name],
    },
  };
}

export default async function ExternalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getExternalPosts()).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-8">
      <PageHeader
        crumbs={[
          { label: "blog", href: "/blog" },
          { label: post.platform },
          { label: post.title },
        ]}
        title={post.title}
        description={post.summary}
      />
      <BlurFade delay={0.04}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <time className="text-xs text-muted-foreground">
              {formatDate(post.publishedAt)}
            </time>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
              via {post.platform}
            </span>
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-link hover:underline underline-offset-4"
            >
              Read on {post.platform}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
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
      </BlurFade>
      <BlurFade delay={0.08}>
        <div
          className="prose max-w-full dark:prose-invert leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </BlurFade>
    </article>
  );
}