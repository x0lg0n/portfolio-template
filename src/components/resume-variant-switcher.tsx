"use client";

import { Download, FileText, Trophy } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Tag } from "@/components/tag";
import { DATA } from "@/data/resume";
import { RESUME_VARIANTS, type ResumeVariant } from "@/data/resume-variants";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "resume-variant";

export function ResumeVariantSwitcher() {
  const [active, setActive] = useState<ResumeVariant>(RESUME_VARIANTS[0]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const match = RESUME_VARIANTS.find((r) => r.id === stored);
      if (match) setActive(match);
    } catch {
      // ignore
    }
  }, []);

  const select = (variant: ResumeVariant) => {
    setActive(variant);
    try {
      localStorage.setItem(STORAGE_KEY, variant.id);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Choose resume variant"
        className="flex flex-wrap items-center gap-3"
      >
        {RESUME_VARIANTS.map((variant) => (
          <button
            key={variant.id}
            role="tab"
            aria-selected={active.id === variant.id}
            onClick={() => select(variant)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors",
              active.id === variant.id
                ? "border-primary/40 text-primary bg-primary/5"
                : "border-border text-foreground hover:border-primary/40 hover:text-primary"
            )}
          >
            <span aria-hidden className="font-mono text-xs text-muted-foreground">
              cat
            </span>
            <span className="font-mono text-xs text-muted-foreground" aria-hidden>
              {variant.id === "fullstack" ? "full-stack" : "blockchain"}
              .md
            </span>
            {active.id === variant.id && (
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe
            src={active.pdf}
            title={`${active.label} resume`}
            className="aspect-[1/1.4142] w-full bg-white"
          />
        </div>
        <a
          href={active.pdf}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground cursor-pointer transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
        >
          <Download className="size-4" aria-hidden />
          Download PDF
        </a>
      </div>

      <div className="space-y-10">
        <header className="space-y-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            {active.headline}
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {active.summary}
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="font-heading text-xl font-bold">Experience</h3>
          <div className="divide-y divide-dashed divide-border">
            {DATA.work.map((work) => (
              <div
                key={`${work.company}-${work.title}`}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h4 className="font-medium text-base leading-snug">
                      {work.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      <Link
                        href={work.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-link transition-colors"
                      >
                        {work.company}
                      </Link>{" "}
                      • {work.location}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground shrink-0">
                    {work.start} — {work.end ?? "Present"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {work.description}
                </p>
                {work.badges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {work.badges.map((badge) => (
                      <Tag key={badge}>{badge}</Tag>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-heading text-xl font-bold">Projects</h3>
          <div className="divide-y divide-dashed divide-border">
            {active.projects.map((item) => {
              const project = getProject(item.slug);
              return (
                <div key={item.slug} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h4 className="font-medium text-base leading-snug">
                      {project ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-link inline-flex items-center gap-1 transition-colors"
                        >
                          {item.title}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    <span className="font-mono text-sm text-muted-foreground shrink-0">
                      {item.date}
                    </span>
                  </div>
                  {item.stack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  )}
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="list-disc ml-5">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {project && (
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {project.links.map((link) => (
                        <a
                          key={link.type}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-link inline-flex items-center gap-1 transition-colors"
                        >
                          {link.type}
                          <ArrowUpRight className="size-3" aria-hidden />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-heading text-xl font-bold">Skills</h3>
          <div className="flex flex-col gap-4">
            {active.skills.map((group) => (
              <div key={group.name} className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {group.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-heading text-xl font-bold flex items-center gap-2">
            <Trophy className="size-5 text-primary" aria-hidden />
            Achievements
          </h3>
          <div className="divide-y divide-dashed divide-border">
            {active.achievements.map((achievement, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {achievement.title}:
                  </span>{" "}
                  {achievement.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}