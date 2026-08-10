"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight, GitCommitHorizontal, Rss } from "lucide-react";

import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { TweetSkeleton } from "@/components/ui/tweet-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { posts } from "@/data/posts";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

const CACHE_KEY = "open-source-activity";
const CACHE_TTL = 10 * 60 * 1000;

type CommitRow = {
  repo: string;
  sha: string;
  url: string;
  message: string;
  additions: number;
  deletions: number;
};

type LanguageSlice = {
  name: string;
  color: string;
  percent: number;
};

type Activity = {
  commits: CommitRow[];
  languages: LanguageSlice[] | null;
  githubUrl: string;
  repoUrl: string;
};

type GitHubEvent = {
  type?: string;
  repo?: { name: string };
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#663399",
  Shell: "#89e051",
  Svelte: "#ff3e00",
  Vue: "#41b883",
  PHP: "#4F5D95",
  Ruby: "#701516",
  "C#": "#178600",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Zig: "#ec915c",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  Nix: "#7e7eff",
  Clojure: "#db5855",
  OCaml: "#ef7a08",
  Makefile: "#427819",
  Dockerfile: "#384d54",
  Ziglang: "#ec915c",
};

const UNKNOWN_COLOR = "#8b949e";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function firstName(message: string): string {
  const first = message.split("\n")[0] ?? "";
  return first.length > 70 ? `${first.slice(0, 67)}...` : first;
}

async function fetchActivity(): Promise<Activity | null> {
  const user = DATA.githubUsername;

  const eventsRes = await fetch(
    `https://api.github.com/users/${user}/events/public`,
  );
  if (!eventsRes.ok) return null;
  const events = (await eventsRes.json()) as GitHubEvent[];

  const pushCounts = new Map<string, number>();
  for (const event of events) {
    if (event.type === "PushEvent" && event.repo?.name) {
      pushCounts.set(event.repo.name, (pushCounts.get(event.repo.name) ?? 0) + 1);
    }
  }
  const [topRepo] = [...pushCounts.entries()].sort((a, b) => b[1] - a[1]);
  if (!topRepo) return null;
  const repo = topRepo[0];

  const [commitsRes, langsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo}/commits?per_page=4`),
    fetch(`https://api.github.com/repos/${repo}/languages`),
  ]);

  const commits: CommitRow[] = [];
  if (commitsRes.ok) {
    const data = (await commitsRes.json()) as {
      sha?: string;
      html_url?: string;
      commit?: { message?: string };
    }[];
    const rows: { sha: string; htmlUrl?: string; message?: string }[] = [];
    for (const item of data) {
      if (!item.sha) continue;
      rows.push({
        sha: item.sha,
        htmlUrl: item.html_url,
        message: item.commit?.message,
      });
    }

    for (const row of rows) {
      const detailRes = await fetch(
        `https://api.github.com/repos/${repo}/commits/${row.sha}`,
      );
      if (!detailRes.ok) continue;
      const detail = (await detailRes.json()) as {
        stats?: { additions?: number; deletions?: number };
      };
      commits.push({
        repo: repo.split("/").pop() ?? repo,
        sha: row.sha.slice(0, 7),
        url: row.htmlUrl ?? `https://github.com/${repo}/commit/${row.sha}`,
        message: firstName(row.message ?? "No commit message"),
        additions: detail.stats?.additions ?? 0,
        deletions: detail.stats?.deletions ?? 0,
      });
    }
  }

  let languages: LanguageSlice[] | null = null;
  if (langsRes.ok) {
    const data = (await langsRes.json()) as Record<string, number>;
    const total = Object.values(data).reduce((sum, n) => sum + n, 0);
    if (total > 0) {
      languages = Object.entries(data)
        .map(([name, bytes]) => ({
          name,
          color: LANGUAGE_COLORS[name] ?? UNKNOWN_COLOR,
          percent: (bytes / total) * 100,
        }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 8);
    }
  }

  if (!commitsRes.ok && !langsRes.ok) return null;

  return {
    commits,
    languages,
    githubUrl: `https://github.com/${user}`,
    repoUrl: `https://github.com/${repo}`,
  };
}

function useActivity() {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchActivity()
      .then((data) => {
        if (cancelled || !data) return;
        setActivity(data);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, ts: Date.now() }),
          );
        } catch {
          // ignore quota errors
        }
      })
      .catch(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return;
        try {
          const { data, ts } = JSON.parse(cached) as {
            data: Activity;
            ts: number;
          };
          if (Date.now() - ts < CACHE_TTL) setActivity(data);
        } catch {
          // ignore corrupt cache
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return activity;
}

function LanguageBar({ languages }: { languages: LanguageSlice[] }) {
  return (
    <div
      className="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
      aria-label="Language breakdown"
    >
      <div className="bg-muted h-2 w-full rounded-[3px]">
        <div className="flex h-full w-full">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
              style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
            >
              <div className="border-border bg-card pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 rounded border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:block">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-foreground">{lang.name}</span>
                  <span className="text-border">•</span>
                  <span className="text-muted-foreground">
                    {Math.round(lang.percent)}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommitsCard() {
  const activity = useActivity();

  return (
    <div className="rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm md:col-span-2">
      <div className="text-foreground mb-3 flex items-center justify-between gap-2 text-sm">
        <h3 className="flex items-center gap-2 font-semibold">
          <GitCommitHorizontal
            className="text-link size-4"
            strokeWidth={1.5}
          />
          <span>Recent Commits</span>
        </h3>
        <a
          href="https://github.com/x0lg0n"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="text-link/80 hover:text-link text-xs font-medium transition-colors"
        >
          [gh]
        </a>
      </div>

      {activity?.commits.length ? (
        <ul className="space-y-1.5 text-sm">
          {activity.commits.map((commit, index) => (
            <li key={commit.url}>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${commit.repo}: ${commit.message}`}
                className="text-muted-foreground hover:text-link flex min-w-0 items-center gap-2 transition-colors"
              >
                <span className="text-foreground flex-shrink-0 font-medium">
                  {commit.repo}:
                </span>
                <span className="min-w-0 flex-1 truncate">{commit.message}</span>
                <span className="flex-shrink-0 text-xs whitespace-nowrap">
                  <span className="text-green-600 dark:text-green-500">
                    +{commit.additions}
                  </span>{" "}
                  <span className="text-border">/</span>{" "}
                  <span className="text-red-600 dark:text-red-500">
                    -{commit.deletions}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-1.5 text-sm">
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <div className="bg-muted animate-pulse flex items-center gap-2 rounded py-1">
                <span className="bg-muted h-3 w-10 rounded" />
                <span className="bg-muted h-3 w-1/2 rounded" />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex items-center gap-3">
        <a
          href={activity?.githubUrl ?? `https://github.com/${DATA.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link group inline-flex items-center gap-1 text-sm hover:underline"
        >
          <span>View on GitHub</span>
          <ArrowUpRight className="inline-block size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        {activity?.languages && <LanguageBar languages={activity.languages} />}
      </div>
    </div>
  );
}

function PostsCard() {
  const latest = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 4),
    [],
  );

  return (
    <div className="rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm md:col-span-2">
      <div className="text-foreground mb-3 flex items-center justify-between gap-2 text-sm">
        <h3 className="flex items-center gap-2 font-semibold">
          <Rss className="text-link size-4" strokeWidth={1.5} />
          <span>Latest Posts</span>
        </h3>
        <Link
          href="/blog"
          aria-label="View all posts"
          className="text-muted-foreground hover:text-link transition-transform duration-500 ease-in hover:-translate-y-0.5 hover:translate-x-0.5"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <ul className="list-none space-y-2">
        {latest.map((post, index) => {
          const words = post.title.split(" ");
          return (
            <li
              key={post.slug}
              className="nyx-row-enter"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-muted-foreground hover:text-link flex min-w-0 items-center gap-2 text-sm transition-colors duration-300"
              >
                <span className="min-w-0 flex-1 truncate">
                  {words.map((word, i) => (
                    <ViewTransition
                      key={`${post.slug}-${i}`}
                      name={`post-${post.slug}-w-${i}`}
                    >
                      <span className="whitespace-pre-wrap">
                        {word}
                        {i < words.length - 1 ? " " : ""}
                      </span>
                    </ViewTransition>
                  ))}
                </span>
                <span className="text-border mx-2 flex-shrink-0 text-xs">
                  –
                </span>
                <span className="text-muted-foreground flex-shrink-0 text-xs whitespace-nowrap">
                  {formatDate(post.publishedAt)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SocialSection() {
  const tweets = DATA.tweets;

  return (
    <section id="testimonials">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
              <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                <span className="text-background text-sm font-medium">
                  Social Updates
                </span>
              </div>
              <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
              <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
                Stay Connected
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                I share my thoughts, experiences, and updates on social media. Follow me to stay connected and get a glimpse into my journey.
              </p>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <div className="flex flex-col gap-4">
      {tweets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground text-sm">
            No tweets added yet — add your best tweet IDs in
            <code className="text-foreground mx-1 font-mono">
              src/data/resume.tsx
            </code>
            under <code className="mx-1 font-mono text-foreground">tweets</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tweets.map((tweet, index) => (
            <ClientTweetCard
              key={tweet.id}
              id={tweet.id}
              apiUrl={`/api/tweet/${tweet.id}`}
              fallback={<TweetSkeleton className="min-w-0" />}
              className={cn(
                "max-w-none border-dashed",
                index % 3 === 0 && "md:col-span-2",
              )}
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <CommitsCard />
        <PostsCard />
      </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}