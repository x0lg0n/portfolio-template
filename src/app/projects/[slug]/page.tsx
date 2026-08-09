import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { DATA } from "@/data/resume";
import { Tag } from "@/components/tag";

export function generateStaticParams() {
  return DATA.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  return {
    title: project?.title,
    description: project?.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-dvh flex flex-col gap-8 relative">
      <Link href="/projects" className="btn px-3 py-2 text-sm w-fit">
        <ArrowLeft className="size-4" aria-hidden />
        Projects
      </Link>

      <article className="flex flex-col gap-8">
        {project.image && (
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={project.image}
              alt={project.imageAlt ?? project.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <header className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {project.title}
          </h1>

          <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {project.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                {project.date}
              </span>
            )}
            {project.links.length > 0 &&
              project.links.map((link) => (
                <a
                  key={link.type}
                  href={link.href}
                  title={link.type}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-link group flex items-center gap-1.5 transition-colors"
                >
                  <link.icon className="size-4" />
                  <span className="sr-only">{link.type}</span>
                </a>
              ))}
          </div>

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          )}
        </header>

        <hr className="border-border" />

        <div className="prose max-w-full dark:prose-invert leading-relaxed">
          <Markdown>{project.content ?? project.description}</Markdown>
        </div>
      </article>
    </main>
  );
}
