"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { usePalette } from "@/components/palette-provider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const emptySubscribe = () => () => {};

export function ModeToggle({ className }: { className?: string }) {
  const { isDark, toggleLightDark } = usePalette();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className={cn("cursor-pointer", className)} />;
  }

  return (
    <AnimatedThemeToggler
      theme={isDark ? "dark" : "light"}
      onThemeChange={toggleLightDark}
      className={cn("cursor-pointer", className)}
    />
  );
}
