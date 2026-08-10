"use client";

import { useProjectLikes } from "@/hooks/use-project-likes";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface Props {
  slug: string;
  base: number;
  className?: string;
  iconClassName?: string;
}

export function ProjectLikeButton({ slug, base, className, iconClassName }: Props) {
  const { likes, toggleLike, likeCount } = useProjectLikes();
  const liked = (likes[slug] ?? 0) === 1;
  const count = likeCount(slug, base);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? `Unlike ${slug}` : `Like ${slug}`}
      title={liked ? "You liked this project" : "Like this project"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleLike(slug);
      }}
      className={cn(
        "group/btn inline-flex items-center gap-1.5 text-xs transition-all duration-200 active:scale-90",
        className
      )}
    >
      <Heart
        className={cn(
          "size-3.5 transition-all duration-200 group-hover/btn:scale-125",
          liked
            ? "fill-primary text-primary"
            : "text-primary/60 group-hover/btn:text-primary",
          iconClassName
        )}
        aria-hidden
      />
      <span
        className={cn(
          "tabular-nums",
          liked ? "text-primary" : "text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  );
}