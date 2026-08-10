"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-project-likes";

export function useProjectLikes() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLikes(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const toggleLike = useCallback((slug: string) => {
    setLikes((prev) => {
      const next = { ...prev, [slug]: prev[slug] ? 0 : 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — keep in-memory
      }
      return next;
    });
  }, []);

  const likeCount = useCallback(
    (slug: string, base: number) => base + (likes[slug] ?? 0),
    [likes]
  );

  return { likes, toggleLike, likeCount };
}