"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

const SHORTCUTS: Record<string, string> = {
  h: "/",
  w: "/work",
  p: "/projects",
  b: "/blog",
  g: "/gallery",
  r: "/resume",
};

export function KeyboardShortcuts() {
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      const href = SHORTCUTS[e.key.toLowerCase()];
      if (href) {
        e.preventDefault();
        router.push(href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}