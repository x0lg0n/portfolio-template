"use client";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { projects, type Project } from "@/data/projects";
import { useProjectLikes } from "@/hooks/use-project-likes";
import { useMemo } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection({ limit }: { limit?: number }) {
  const { likeCount } = useProjectLikes();

  const visibleProjects = useMemo((): Project[] => {
    const active = projects.filter((p) => p.active);
    if (!limit) return active;
    const pinned = active
      .filter((p) => typeof p.featuredOrder === "number")
      .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
    if (pinned.length >= limit) return pinned.slice(0, limit);
    return [...active]
      .sort((a, b) => {
        const scoreA = likeCount(a.slug, a.stars ?? 0);
        const scoreB = likeCount(b.slug, b.stars ?? 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return b.date.localeCompare(a.date);
      })
      .slice(0, limit);
  }, [limit, likeCount]);

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                My Projects
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
              Featured Projects
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              A curated selection in priority order — tap the heart on any
              project to show some love, they&apos;re ranked by likes below.
            </p>
          </div>
        </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
          {visibleProjects.map((project, id) => (
            <BlurFade
              key={`${project.slug}-${id}`}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              className="h-full">
              <ProjectCard
                slug={project.slug}
                key={`${project.title}-card-${id}`}
                title={project.title}
                description={project.description}
                dates={project.dates}
                stars={project.stars}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links.map((link) => ({
                  ...link,
                  icon: <link.icon className="size-3" />,
                }))}
              />
            </BlurFade>
          ))}
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="flex justify-center">
            <InteractiveHoverButton href="/projects">
              View More
            </InteractiveHoverButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
