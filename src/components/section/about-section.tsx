import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function AboutSection() {
  return (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="font-heading text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex flex-wrap gap-2 pt-1">
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
                  className="btn px-3 py-2"
                  aria-label={social.name}
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="text-xs">{social.name}</span>
                </Link>
              );
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
