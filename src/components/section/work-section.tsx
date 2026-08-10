"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";

import { DATA } from "@/data/resume";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BlurFade } from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export default function WorkSection({ limit }: { limit?: number }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const entries = limit ? DATA.work.slice(0, limit) : DATA.work;

  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h2 className="font-heading text-xl font-bold">Work Experience</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="relative divide-y divide-dashed divide-border">
      {entries.map((work, index) => {
        const isExpanded = activeIndex === index;

        return (
          <div
            key={`${work.title}-${work.company}`}
            className={cn(
              "relative group transition-colors duration-200 hover:bg-muted/30",
              isExpanded && "bg-muted/30",
            )}>
            <span className="absolute top-0 left-0 z-10 w-2 h-2 border-t border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute top-0 right-0 z-10 w-2 h-2 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 left-0 z-10 w-2 h-2 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 z-10 w-2 h-2 border-b border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div
              className="p-4 cursor-pointer select-none"
              onClick={() => setActiveIndex(isExpanded ? null : index)}>
              <div className="flex items-center gap-3">
                {work.logoUrl ?
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.logoUrl}
                    alt={`${work.company} logo`}
                    className="w-12 h-12 shrink-0 rounded-xl border border-border overflow-hidden bg-background object-contain p-1"
                  />
                : <div className="w-12 h-12 shrink-0 rounded-xl border border-border bg-muted" />
                }

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h3 className="font-medium text-base leading-snug">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <Link
                      href={work.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-link transition-colors"
                      onClick={(e) => e.stopPropagation()}>
                      @ {work.company}
                      <ArrowUpRight className="inline-block w-4 h-4 ml-1 align-text-bottom text-muted-foreground" />
                    </Link>
                  </p>
                </div>

                <div className="hidden sm:flex flex-col text-right font-mono text-sm text-muted-foreground">
                  <span>
                    {work.start} — {work.end ?? "Present"}
                  </span>
                  <span>{work.location}</span>
                </div>
              </div>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isExpanded ?
                    "grid-rows-[1fr] opacity-100 mt-2"
                  : "grid-rows-[0fr] opacity-0",
                )}>
                <div className="overflow-hidden">
                  <div className="pb-2">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:hidden mb-2 text-left">
                        <span className="font-mono text-sm text-muted-foreground">
                          {work.start} — {work.end ?? "Present"} •{" "}
                          {work.location}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-full dark:prose-invert text-muted-foreground leading-relaxed">
                        <Markdown>{work.description}</Markdown>
                      </div>

                      {work.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={work.image}
                          alt={`${work.company} work screenshot`}
                          loading="lazy"
                          className="mt-2 w-full rounded-xl border border-border object-cover"
                        />
                      )}

                      <div className="flex flex-wrap gap-2">
                        {work.badges.map((skill) => (
                          <Tag key={skill}>{skill}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
          </div>
        </BlurFade>
        <div className="flex justify-center">
          <InteractiveHoverButton href="/work">
            View More
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
