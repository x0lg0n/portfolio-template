"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      timeout = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    timeout = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <span className={cn("tabular-nums", className)}>{time ? `${time} IST` : "…"}</span>
  );
}
