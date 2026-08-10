"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
  durationHover?: string;
  gap?: string;
  [key: string]: unknown;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s",
  durationHover = "120s",
  gap = "1rem",
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={
        {
          "--duration": duration,
          "--duration-hover": durationHover,
          "--gap": gap,
        } as React.CSSProperties
      }
      className={cn(
        "group relative flex overflow-hidden gap-[var(--gap)] p-0",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-[var(--gap)]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover &&
              "group-hover:[animation-duration:var(--duration-hover)]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}