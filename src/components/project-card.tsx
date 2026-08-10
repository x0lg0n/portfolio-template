"use client";

import { Badge } from "@/components/ui/badge";
import { ProjectLikeButton } from "@/components/project-like-button";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Star, Tags } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  slug?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  stars?: number;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  slug,
  description,
  dates,
  tags,
  image,
  video,
  stars,
  links,
  className,
}: Props) {
  const detailHref = slug ? `/projects/${slug}` : href;
  const external = !slug;

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:border-primary hover:ring-2 cursor-pointer hover:ring-primary transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={detailHref || "#"}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        {slug && (
          <div className="absolute top-2 left-2">
            <ProjectLikeButton
              slug={slug}
              base={typeof stars === "number" ? stars : 0}
              className="rounded-full border border-border bg-background/90 backdrop-blur px-2 py-1 hover:bg-background"
            />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex items-center gap-2">
              <time className="text-xs text-muted-foreground">{dates}</time>
              {typeof stars === "number" && (
                <span
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                  title={`${stars} GitHub star${stars === 1 ? "" : "s"}`}
                >
                  <Star className="size-3 fill-current text-primary" aria-hidden />
                  {stars}
                </span>
              )}
            </div>
          </div>
          <Link
            href={detailHref || "#"}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <Tags className="size-4 text-muted-foreground shrink-0" aria-hidden />
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
