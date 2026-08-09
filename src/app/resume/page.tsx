import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PrintButton } from "@/components/print-button";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Siddhartha Kunwar.",
};

export default function ResumePage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <PageHeader
        path={["resume"]}
        title="Resume"
        description="Software Engineer. I build things for the web and love turning ideas into products."
      />
      <div className="flex items-center justify-end gap-3">
        <PrintButton />
        <Link href="/" className="btn px-3 py-2 text-sm">
          <ArrowLeft className="size-4" aria-hidden />
          Home
        </Link>
      </div>

      <div className="space-y-8">
        <header className="space-y-2">
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            {DATA.name}
          </h2>
          <p className="text-base font-medium text-muted-foreground">
            {DATA.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm text-muted-foreground">
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              const Icon = social.icon;
              const href =
                social.name === "Send Email"
                  ? `mailto:${DATA.contact.email}`
                  : social.url;
              const external = href.startsWith("http");
              return (
                <Link
                  key={key}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="hover:text-link inline-flex items-center gap-1.5 transition-colors"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {social.name}
                </Link>
              );
            })}
            <span className="text-muted-foreground/70">{DATA.location}</span>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold">Experience</h2>
          <div className="divide-y divide-dashed divide-border">
            {DATA.work.map((work) => (
              <div key={`${work.company}-${work.title}`} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-medium text-base leading-snug">
                      {work.title}
                    </h3>
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
          <h2 className="font-heading text-xl font-bold">Education</h2>
          <div className="divide-y divide-dashed divide-border">
            {DATA.education.map((edu) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-medium text-base leading-snug">
                      {edu.degree}
                      {edu.branch ? `, ${edu.branch}` : ""}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <Link
                        href={edu.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-link transition-colors"
                      >
                        {edu.school}
                      </Link>
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground shrink-0">
                    {edu.start} — {edu.end}
                  </span>
                </div>
                {edu.tags && edu.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {edu.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill) => (
              <Tag key={skill.name}>{skill.name}</Tag>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold">Projects</h2>
          <div className="divide-y divide-dashed divide-border">
            {DATA.projects
              .filter((p) => p.active)
              .map((project) => (
                <div
                  key={project.title}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="font-medium text-base leading-snug">
                      {project.title}
                    </h3>
                    <span className="font-mono text-sm text-muted-foreground shrink-0">
                      {project.dates}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}