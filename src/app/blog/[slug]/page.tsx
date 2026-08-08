import { BlurFade } from "@/components/magicui/blur-fade";
import { Tag } from "@/components/tag";
import { posts } from "@/data/posts";
import { Tags } from "lucide-react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post?.title,
    description: post?.summary,
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

  return (
    <article className="flex flex-col gap-8">
      <BlurFade delay={0.04}>
        <div className="flex flex-col gap-2">
          <time className="text-xs text-muted-foreground">
            {post.publishedAt}
          </time>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
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
          <Markdown>{post.content}</Markdown>
        </div>
      </BlurFade>
    </article>
  );
}
