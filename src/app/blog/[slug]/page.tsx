import { BlurFade } from "@/components/magicui/blur-fade";
import MarkdownContent from "@/components/markdown-content";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { posts, readingTime } from "@/data/posts";
import { DATA } from "@/data/resume";
import { Tags } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import rehypeRaw from "rehype-raw";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: {
      canonical: `${DATA.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `${DATA.url}/blog/${post.slug}`,
      siteName: DATA.name,
      publishedTime: post.publishedAt,
      authors: [DATA.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${DATA.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <article className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        crumbs={[{ label: "blog", href: "/blog" }, { label: post.title }]}
        title={post.title}
        description={post.summary}
        titleViewTransitionId={post.slug}
      />
      <BlurFade delay={0.04}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <time className="text-xs text-muted-foreground">
              {post.publishedAt}
            </time>
            {post.author && (
              <span className="text-xs text-muted-foreground">
                by <span className="text-link">{post.author}</span>
              </span>
            )}
            <span className="text-xs text-muted-foreground/70">
              · {readingTime(post.content)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
              blog
            </span>
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
        <div className="prose max-w-full dark:prose-invert leading-relaxed">
          <MarkdownContent content={post.content} rehypePlugins={[rehypeRaw]} />
        </div>
      </BlurFade>
    </article>
  );
}