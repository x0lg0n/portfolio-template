import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";
import { ViewTransition } from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  command?: string;
  path?: string[];
  crumbs?: Crumb[];
  title: string;
  count?: number;
  description?: string;
  titleViewTransitionId?: string;
}

export function PageHeader({
  command,
  path,
  crumbs,
  title,
  count,
  description,
  titleViewTransitionId,
}: PageHeaderProps) {
  const breadcrumbs = crumbs ?? path?.map((segment, i, all) => ({
    label: segment,
    href:
      i === all.length - 1
        ? undefined
        : `/${all.slice(0, i + 1).join("/")}`,
  }));

  const titleWords = titleViewTransitionId
    ? title.split(" ")
    : [title];

  return (
    <section className="w-full py-20">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade>
          <div className="flex flex-col gap-y-3">
            {breadcrumbs ? (
              <nav aria-label="Breadcrumbs">
                <ul className="font-mono text-sm text-muted-foreground flex items-center">
                  <li className="inline-flex items-center">
                    <Link
                      href="/"
                      className="text-link transition-colors hover:text-link/60"
                    >
                      ~
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <li
                        key={i}
                        className="inline-flex items-center min-w-0"
                      >
                        <span
                          className="mx-1.5 text-muted-foreground/60"
                          aria-hidden
                        >
                          /
                        </span>
                        {crumb.href ? (
                          <Link
                            href={crumb.href}
                            className="transition-colors hover:text-link"
                          >
                            {crumb.label}
                          </Link>
                        ) : isLast ? (
                          <span
                            aria-current="page"
                            className="text-foreground truncate max-w-[46ch]"
                          >
                            {crumb.label}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
                            {crumb.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                  <li className="ml-1.5 inline-flex items-center shrink-0">
                    <span
                      className="cursor-blink bg-link h-4 w-2"
                      aria-hidden
                    />
                  </li>
                </ul>
              </nav>
            ) : command ? (
              <p className="font-mono text-sm text-muted-foreground">
                {command}
              </p>
            ) : null}
            <h1 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
              {titleWords.map((word, i) =>
                titleViewTransitionId ? (
                  <ViewTransition
                    key={`${titleViewTransitionId}-${i}`}
                    name={`post-${titleViewTransitionId}-w-${i}`}
                  >
                    <span className="whitespace-pre-wrap">
                      {word}
                      {i < titleWords.length - 1 ? " " : ""}
                    </span>
                  </ViewTransition>
                ) : (
                  <span key={i}>
                    {word}
                    {i < titleWords.length - 1 ? " " : ""}
                  </span>
                ),
              )}
              {count !== undefined && (
                <span
                  aria-label="count"
                  className="text-muted-foreground ml-2 align-baseline font-mono text-sm font-normal"
                >
                  [{count}]
                </span>
              )}
            </h1>
            {description && (
              <p className="text-muted-foreground md:text-lg/relaxed text-balance">
                {description}
              </p>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}