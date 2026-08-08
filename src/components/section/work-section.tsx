"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DATA } from "@/data/resume";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/utils";

export default function WorkSection({ limit }: { limit?: number }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const entries = limit ? DATA.work.slice(0, limit) : DATA.work;

  return (
    <div className="relative divide-y divide-dashed divide-border">
      {entries.map((work, index) => {
        const isExpanded = activeIndex === index;

        return (
          <div
            key={`${work.title}-${work.company}`}
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
              <div className="flex items-center gap-3">
                {work.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.logoUrl}
                    alt={`${work.company} logo`}
                    className="w-12 h-12 flex-shrink-0 rounded-xl border border-border overflow-hidden bg-background object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl border border-border bg-muted" />
                )}

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
                      onClick={(e) => e.stopPropagation()}
                    >
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
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-2">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:hidden mb-2 text-left">
                        <span className="font-mono text-sm text-muted-foreground">
                          {work.start} — {work.end ?? "Present"} •{" "}
                          {work.location}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground text-justify leading-relaxed">
                        {work.description}
                      </p>

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
  );
}
