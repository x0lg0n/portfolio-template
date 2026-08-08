import { cn } from "@/lib/utils";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const GRAY_SHADES = [
  "text-foreground/90",
  "text-foreground/60",
  "text-foreground/40",
  "text-foreground/25",
];

const WORD_SIZES = [2.5, 3, 3.5];

interface SlabTitleProps {
  title: string;
  colored?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export function SlabTitle({
  title,
  colored = true,
  as: Tag = "h1",
  className,
}: SlabTitleProps) {
  const words = title.split(" ");

  return (
    <Tag
      className={cn(
        "font-heading uppercase leading-none tracking-tight flex flex-wrap gap-x-4 gap-y-2",
        className
      )}
    >
      {words.map((word, i) => {
        const h = hashCode(title + i);
        const isColored = colored && h % 3 === 0;
        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              "font-black",
              isColored ? "text-link" : GRAY_SHADES[h % GRAY_SHADES.length]
            )}
            style={{ fontSize: `${WORD_SIZES[h % WORD_SIZES.length]}rem` }}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
}
