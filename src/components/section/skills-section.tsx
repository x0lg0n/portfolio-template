"use client";

import { DATA } from "@/data/resume";

const SKILL_ICON_IDS: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "ts",
  "Node.js": "nodejs",
  Python: "py",
  Go: "go",
  Postgres: "postgres",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Java: "java",
  "Tailwind CSS": "tailwind",
  Prisma: "prisma",
  Git: "git",
};

export default function SkillsSection() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {DATA.skills.map((skill) => {
          const slug = SKILL_ICON_IDS[skill.name];
          return (
            <div
              key={skill.name}
              className="flex items-center gap-2"
              title={skill.name}
            >
              {slug ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://skillicons.dev/icons?i=${slug}`}
                  alt={skill.name}
                  width={20}
                  height={20}
                  decoding="async"
                  className="size-6"
                />
              ) : (
                <skill.icon className="size-6" aria-hidden />
              )}
              <span className="text-foreground text-sm font-medium">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
