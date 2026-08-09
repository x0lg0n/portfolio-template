import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function AboutSection() {
  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar
  );

  return (
    <section id="about" className="space-y-5">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Hey! I&apos;m <span className="text-link">{DATA.name}</span>
        </h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div className="prose max-w-prose font-sans text-lg leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{DATA.summary}</Markdown>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          {socials.map(([key, social]) => {
            const Icon = social.icon;
            const href =
              social.name === "Send Email"
                ? `mailto:${DATA.contact.email}`
                : social.url;
            const external = href.startsWith("http");
            return (
              <span key={key} className="flex items-center gap-x-4">
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-link"
                >
                  <Icon className="size-4" aria-hidden />
                  {social.name}
                </Link>
                <span aria-hidden className="text-muted-foreground text-xs opacity-40">
                  |
                </span>
              </span>
            );
          })}
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="group text-muted-foreground inline-flex items-center gap-1 text-sm transition-colors duration-200 hover:text-link"
          >
            <span>Email me</span>
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}