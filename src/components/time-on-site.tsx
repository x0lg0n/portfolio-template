"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const STORAGE_KEY = "total-time-on-site";

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function TimeOnSite() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const initial = Number(localStorage.getItem(STORAGE_KEY) ?? 0) || 0;
    const sessionStart = Date.now();

    const sessionElapsed = () => Math.floor((Date.now() - sessionStart) / 1000);
    const save = () => localStorage.setItem(STORAGE_KEY, String(initial + sessionElapsed()));

    const interval = setInterval(() => {
      setTime(initial + sessionElapsed());
    }, 1000);

    window.addEventListener("beforeunload", save);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", save);
      save();
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5" title="How long you have been surfing this site">
      <Clock size={14} strokeWidth={1.5} className="text-muted-foreground" aria-hidden />
      <span className="font-mono text-xs text-link">{formatTime(time)}</span>
    </div>
  );
}
