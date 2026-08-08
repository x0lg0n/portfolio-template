import { BlurFade } from "@/components/magicui/blur-fade";
import { Tag } from "@/components/tag";
import { DATA } from "@/data/resume";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function EducationSection() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <h2 className="font-heading text-xl font-bold">Education</h2>
        </BlurFade>
        <div className="flex flex-col gap-8">
          {DATA.education.map((education, index) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 9 + index * 0.05}
            >
              <Link
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-3 justify-between group hover:text-link transition-colors"
              >
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  {education.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={education.logoUrl}
                      alt={education.school}
                      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                    />
                  ) : (
                    <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                  )}
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {education.school}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                        aria-hidden
                      />
                    </div>
                    <div className="font-sans text-sm text-muted-foreground flex flex-col gap-0.5">
                      <span>{education.degree}</span>
                      {education.branch ? (
                        <span>{education.branch}</span>
                      ) : null}
                    </div>
                    {education.tags && education.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {education.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {education.start} - {education.end}
                  </span>
                  {education.location ? (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" aria-hidden />
                      {education.location}
                    </span>
                  ) : null}
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
