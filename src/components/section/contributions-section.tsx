"use client";

import * as React from "react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
  ArrowUpRight,
  CircleDot,
  GitMerge,
  GitPullRequest,
} from "lucide-react";

import type { ContributionItem } from "@/app/api/contributions/route";
import { type Theme, usePalette } from "@/components/palette-provider";
import { ACCENTS } from "@/components/palette-provider";
import { DATA } from "@/data/resume";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

const emptySubscribe = () => () => {};

const graphColors: Record<Theme, [string, string, string, string, string]> = {
  light: ["#f3f4f6", "#dbe7dd", "#a9cbb2", "#6fa984", "#1a7f37"],
  dark: ["#1c2127", "#24352c", "#2f5240", "#4a7d5c", "#4ade80"],
  latte: ["#eef0f4", "#dbe6dc", "#b8d3bc", "#8cb893", "#40a02b"],
  frappe: ["#383c52", "#3f5147", "#4d6b55", "#6f9677", "#a6d189"],
  macchiato: ["#252839", "#324238", "#45634d", "#689172", "#a6da95"],
  mocha: ["#201f2e", "#2f4036", "#415d47", "#668a71", "#a6e3a1"],
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function mixHex(base: string, accent: string, t: number): string {
  const a = hexToRgb(base);
  const b = hexToRgb(accent);
  const ch = (i: number) =>
    Math.round(a[i] + (b[i] - a[i]) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(0)}${ch(1)}${ch(2)}`;
}

function buildRamp(
  theme: Theme,
  accent: string | null
): [string, string, string, string, string] {
  const base = graphColors[theme][0];
  if (!accent) return graphColors[theme];
  const isLight = theme === "light" || theme === "latte";
  const entry = ACCENTS.find((a) => a.color === accent);
  const accentColor = entry && isLight ? entry.lightColor : accent;
  return [
    base,
    mixHex(base, accentColor, 0.32),
    mixHex(base, accentColor, 0.58),
    mixHex(base, accentColor, 0.8),
    accentColor,
  ];
}

const stateStyles: Record<ContributionItem["state"], string> = {
  open: "text-link border-link/30",
  merged: "text-primary border-primary/30",
  closed: "text-muted-foreground border-border",
};

const stateTextStyles: Record<ContributionItem["state"], string> = {
  open: "text-link",
  merged: "text-primary",
  closed: "text-muted-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ContributionsSection() {
  const [items, setItems] = React.useState<ContributionItem[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [rateLimited, setRateLimited] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const { theme, accent } = usePalette();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  React.useEffect(() => {
    const CACHE_KEY = "contributions-cache";
    const CACHE_TTL = 15 * 60 * 1000;
    let cancelled = false;

    const apply = (data: ContributionItem[], limited: boolean) => {
      if (cancelled) return;
      setItems(data);
      setRateLimited(limited);
      setLoaded(true);
    };

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as {
          data: ContributionItem[];
          ts: number;
        };
        if (Date.now() - parsed.ts < CACHE_TTL && parsed.data.length > 0) {
          apply(parsed.data, false);
          return;
        }
      } catch {
        // ignore corrupt cache
      }
    }

    fetch("/api/contributions")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { items: ContributionItem[]; rateLimited?: boolean }) => {
        apply(data.items ?? [], Boolean(data.rateLimited));
        if (data.items && data.items.length > 0) {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: data.items, ts: Date.now() })
          );
        }
      })
      .catch(() => apply([], true));

    return () => {
      cancelled = true;
    };
  }, []);

  const colors = buildRamp(theme, accent);
  const isLightGraph = theme === "light" || theme === "latte";
  const graphTheme = colors;

  return (
    <section id="contributions">
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">
              Open Source
            </span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
            Building in public
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            Pull requests, issues, and other activity across open source
            projects — fetched live from GitHub.
          </p>
        </div>
      </div>

      <div className="w-full border border-border rounded-xl p-4 sm:p-6">
        {mounted && (
          <div className="w-full [&_svg]:w-full! [&_svg]:h-auto!">
            <GitHubCalendar
              username={DATA.githubUsername}
              blockSize={12}
              blockMargin={3}
              colorScheme={isLightGraph ? "light" : "dark"}
              theme={{ light: graphTheme, dark: graphTheme }}
              fontSize={12}
              showColorLegend={false}
            />
          </div>
        )}
      </div>

      <div className="relative divide-y divide-dashed divide-border">
        {!loaded ? (
          <p className="py-4 text-sm font-mono text-muted-foreground">
            fetching open source activity…
          </p>
        ) : items.length === 0 ? (
          <p className="py-4 text-sm font-mono text-muted-foreground">
            {rateLimited
              ? "GitHub rate limit reached — contributions will reappear automatically. (Tip: set GITHUB_TOKEN in your env to fix this.)"
              : "no contributions found."}
          </p>
        ) : (
          items.map((item, index) => {
            const isExpanded = activeIndex === index;

            return (
            <div
              key={`${item.repo}-${item.number}`}
              className={cn(
                "relative group transition-colors duration-200 hover:bg-muted/30",
                isExpanded && "bg-muted/30"
              )}
            >
              <span className="absolute top-0 left-0 z-10 w-2 h-2 border-t border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-0 right-0 z-10 w-2 h-2 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 left-0 z-10 w-2 h-2 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 right-0 z-10 w-2 h-2 border-b border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div
                className="p-4 cursor-pointer select-none"
                onClick={() => setActiveIndex(isExpanded ? null : index)}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={cn(
                      "w-11 h-11 flex-shrink-0 rounded-xl border bg-muted/50 flex items-center justify-center",
                      item.state === "merged"
                        ? "border-primary/30 text-primary"
                        : item.state === "open"
                          ? "border-link/30 text-link"
                          : "border-border text-muted-foreground"
                    )}
                  >
                    {item.state === "merged" ? (
                      <GitMerge className="size-5" aria-hidden />
                    ) : item.type === "PR" ? (
                      <GitPullRequest className="size-5" aria-hidden />
                    ) : (
                      <CircleDot className="size-5" aria-hidden />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-base leading-snug">
                        {item.title}
                      </h3>
                      <span
                        className={cn(
                          "flex-shrink-0 rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase",
                          stateStyles[item.state]
                        )}
                      >
                        {item.state}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-muted-foreground">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-link transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.repo}
                        <ArrowUpRight className="inline-block w-3 h-3 ml-0.5 align-text-bottom" />
                      </Link>{" "}
                      <span className="opacity-60">
                        #{item.number} · {formatDate(item.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-justify leading-relaxed">
                        {item.body || "No description provided."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Tag className={stateTextStyles[item.state]}>
                          {item.state}
                        </Tag>
                        <Tag>
                          {item.type} #{item.number}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })
        )}
      </div>
      </div>
      </BlurFade>
    </section>
  );
}
