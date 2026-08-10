import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import MarkdownContent from "@/components/markdown-content";
import { PageHeader } from "@/components/page-header";
import { ProjectLikeButton } from "@/components/project-like-button";
import { Tag } from "@/components/tag";
import { DATA } from "@/data/resume";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects
    .filter((p) => p.active)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    keywords: project.technologies,
    alternates: {
      canonical: `${DATA.url}/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: `${DATA.url}/projects/${project.slug}`,
      siteName: DATA.name,
      authors: [DATA.name],
      publishedTime: project.date,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

const CASE_SECTIONS: {
  key: keyof (typeof projects)[number]["caseStudy"];
  label: string;
  number: string;
}[] = [
  { key: "challenge", label: "Challenge", number: "01" },
  { key: "strategy", label: "Strategy", number: "02" },
  { key: "results", label: "Results", number: "03" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-8">
      <PageHeader
        crumbs={[
          { label: "projects", href: "/projects" },
          { label: project.title },
        ]}
        title={project.title}
        description={project.description}
      />

      {project.video ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <video
            src={project.video}
            poster={project.image}
            controls
            preload="metadata"
            className="aspect-video w-full bg-black"
          />
        </div>
      ) : project.image ? (
        <div className="overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt ?? project.title}
            className="aspect-video w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <time className="text-xs">{project.dates}</time>
          {typeof project.stars === "number" && (
            <span
              className="inline-flex items-center gap-1 text-xs"
              title={`${project.stars} GitHub star${project.stars === 1 ? "" : "s"}`}
            >
              <Star className="size-3 fill-current text-primary" aria-hidden />
              {project.stars} stars
            </span>
          )}
          <ProjectLikeButton slug={project.slug} base={project.stars ?? 0} />
          {project.links.length > 0 &&
            project.links.map((link) => (
              <a
                key={link.type}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-link hover:underline underline-offset-4 transition-colors"
              >
                <link.icon className="size-4" aria-hidden />
                {link.type}
              </a>
            ))}
        </div>
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-10">
        {CASE_SECTIONS.map(({ key, label, number }) => (
          <section key={key} className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
              <span className="font-mono text-sm text-link">{number}</span>
              <span className="border border-border rounded-md px-1.5 py-0.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
            </h2>
            <div className="prose max-w-full dark:prose-invert leading-relaxed">
              <MarkdownContent content={project.caseStudy[key]} />
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}