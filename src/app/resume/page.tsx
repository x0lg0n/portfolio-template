import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { ResumeVariantSwitcher } from "@/components/resume-variant-switcher";
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

      <ResumeVariantSwitcher />

      <div className="space-y-8">
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
      </div>
    </main>
  );
}