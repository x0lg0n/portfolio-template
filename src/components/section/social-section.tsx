"use client";

import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { TweetSkeleton } from "@/components/ui/tweet-card";
import { DATA } from "@/data/resume";

export default function SocialSection() {
  const tweets = DATA.tweets;

  if (tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border rounded-xl p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No tweets added yet — add your best tweet IDs in
          <code className="mx-1 font-mono text-foreground">src/data/resume.tsx</code>
          under <code className="mx-1 font-mono text-foreground">tweets</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tweets.map((tweet) => (
        <ClientTweetCard
          key={tweet.id}
          id={tweet.id}
          apiUrl={`/api/tweet/${tweet.id}`}
          fallback={<TweetSkeleton className="min-w-0" />}
          className="max-w-none border-dashed"
        />
      ))}
    </div>
  );
}
