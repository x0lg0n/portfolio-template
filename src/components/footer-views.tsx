"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const CACHE_KEY = "site-views";

export default function FooterViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/views")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { views: number | null }) => {
        if (!cancelled && typeof data.views === "number") {
          setViews(data.views);
          localStorage.setItem(CACHE_KEY, String(data.views));
        }
      })
      .catch(() => {
        if (cancelled) return;
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return;
        const parsed = Number(cached);
        if (!Number.isNaN(parsed)) setViews(parsed);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (views === null) return null;

  return (
    <span
      className="text-muted-foreground flex items-center gap-1.5"
      title="Site views"
    >
      <Eye size={14} strokeWidth={1.5} aria-hidden />
      <span className="font-mono text-xs text-link">{views.toLocaleString()}</span>
      <span className="text-xs">views</span>
    </span>
  );
}
