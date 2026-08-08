"use client";

import type { ReactNode } from "react";

import { ACCENTS, usePalette } from "@/components/palette-provider";
import { cn } from "@/lib/utils";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface TagProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function Tag({ children, className, color }: TagProps) {
  const { isDark } = usePalette();

  let resolvedColor = color;
  if (!resolvedColor) {
    const key = typeof children === "string" ? children : "";
    const accent = ACCENTS[hashCode(key) % ACCENTS.length];
    resolvedColor = isDark ? accent.color : accent.lightColor;
  }

  return (
    <span
      className={cn("bg-muted rounded px-2 py-1 text-xs font-semibold", className)}
      style={{ color: resolvedColor }}
    >
      {children}
    </span>
  );
}
