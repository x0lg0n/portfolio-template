"use client";

import { useEffect, useState } from "react";
import { GitCommitHorizontal } from "lucide-react";

import { DATA } from "@/data/resume";

const CACHE_KEY = "latest-commit";
const CACHE_TTL = 5 * 60 * 1000;

type CommitInfo = { repo: string; sha: string; url: string };

type GitHubEvent = {
  type?: string;
  repo?: { name: string };
  payload?: { head?: string; commits?: { sha: string }[] };
};

export default function LatestCommit() {
  const [commit, setCommit] = useState<CommitInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${DATA.githubUsername}/events/public`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((events: GitHubEvent[]) => {
        const push = events.find(
          (event) => event.type === "PushEvent" && event.repo?.name,
        );
        const sha = push?.payload?.head ?? push?.payload?.commits?.[0]?.sha;
        if (!push?.repo?.name || !sha) return;

        const info: CommitInfo = {
          repo: push.repo.name,
          sha: sha.slice(0, 7),
          url: `https://github.com/${push.repo.name}/commit/${sha}`,
        };

        if (!cancelled) {
          setCommit(info);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: info, ts: Date.now() }),
          );
        }
      })
      .catch(() => {
        if (cancelled) return;
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return;
        try {
          const { data, ts } = JSON.parse(cached) as {
            data: CommitInfo;
            ts: number;
          };
          if (Date.now() - ts < CACHE_TTL) setCommit(data);
        } catch {
          // ignore corrupt cache
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!commit) return null;

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground flex items-center gap-x-1.5 transition-colors hover:text-link"
      title={`Latest commit: ${commit.repo}`}
    >
      <GitCommitHorizontal size={16} strokeWidth={1.5} className="flex-shrink-0" />
      <span className="font-mono text-xs">{commit.sha}</span>
    </a>
  );
}
