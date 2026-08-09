import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects by Siddhartha.",
};

export default function ProjectsPage() {
  const projects = DATA.projects.filter((p) => p.active);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <PageHeader
        path={["projects"]}
        title="Projects"
        count={projects.length}
        description="A collection of things I've built and shipped."
      />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links.map((link) => ({
                ...link,
                icon: <link.icon className="size-3" />,
              }))}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No projects published yet.
        </p>
      )}
    </main>
  );
}