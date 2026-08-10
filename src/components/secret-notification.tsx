"use client";

import * as React from "react";
import { Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface Secret {
  label: string;
  text: string;
}

const SECRETS: Secret[] = [
  {
    label: "Sidebar",
    text: "Press K to toggle the sidebar menu — themes, colors, and navigation live there.",
  },
  {
    label: "Navigation",
    text: "Jump anywhere with the keyboard: H for home, W for work, P for projects, B for blog, G for gallery, R for resume.",
  },
  {
    label: "Themes",
    text: "There are Catppuccin themes hiding in the sidebar. Latte, Frappe, Macchiato, Mocha — pick your vibe.",
  },
  {
    label: "Accent",
    text: "The site accent color is yours to change — open the sidebar and pick any color swatch.",
  },
  {
    label: "Escape",
    text: "Stuck? Press Esc to close the sidebar at any time.",
  },
  {
    label: "Blog",
    text: "Every blog post on this site is readable inline — dev.to posts render here too. Press B to browse.",
  },
  {
    label: "Resume",
    text: "There is a print-ready resume hidden at /resume. Press R and hit the download button.",
  },
];

const SESSION_KEY = "secrets-notified";
const MAX_SHOWS_PER_SESSION = 3;
const FIRST_DELAY_MIN = 4000;
const FIRST_DELAY_RANGE = 5000;
const VIEW_MS = 9000;
const INTERVAL_MS = 45000;

export function SecretNotification() {
  const [secret, setSecret] = React.useState<Secret | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let shown = Number(sessionStorage.getItem(SESSION_KEY) ?? "0");
    let timer: number | undefined;

    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (shown >= MAX_SHOWS_PER_SESSION) return;

        const seenLabels = new Set(
          JSON.parse(sessionStorage.getItem("secrets-seen") ?? "[]")
        );
        const unseen = SECRETS.filter((s) => !seenLabels.has(s.label));
        const pool = unseen.length > 0 ? unseen : SECRETS;
        const pick = pool[Math.floor(Math.random() * pool.length)];

        seenLabels.add(pick.label);
        sessionStorage.setItem("secrets-seen", JSON.stringify([...seenLabels]));
        shown += 1;
        sessionStorage.setItem(SESSION_KEY, String(shown));

        setSecret(pick);
        setVisible(true);

        timer = window.setTimeout(() => setVisible(false), VIEW_MS);
        timer = window.setTimeout(schedule, INTERVAL_MS);
      }, delay);
    };

    schedule(FIRST_DELAY_MIN + Math.random() * FIRST_DELAY_RANGE);

    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => setVisible(false);

  if (!secret) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-xs transition-all duration-500 ease-in-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-link">
            <Sparkles className="size-3.5" aria-hidden />
            {secret.label}
          </span>
          <button
            onClick={dismiss}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss secret"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {secret.text}
        </p>
        <span className="cursor-blink bg-link h-3 w-1.5 shrink-0" aria-hidden />
      </div>
    </div>
  );
}