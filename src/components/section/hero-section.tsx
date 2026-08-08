import { BlurFade } from "@/components/magicui/blur-fade";
import { LiveClock } from "@/components/live-clock";
import { ProfileAvatar } from "@/components/profile-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex items-center gap-4">
          <BlurFade delay={BLUR_FADE_DELAY} className="shrink-0">
            <ProfileAvatar
              className="size-24 md:size-32"
              src={DATA.avatarUrl}
              gifSrc={DATA.avatarGifUrl}
              qrSrc={DATA.qrCodeUrl}
              alt={DATA.name}
              fallback={DATA.initials}
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {DATA.name}
              </h1>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      className="cursor-pointer"
                      aria-label="Verified developer"
                    />
                  }
                >
                  <BadgeCheck
                    className="size-5 text-link sm:size-6"
                    aria-hidden
                  />
                </TooltipTrigger>
                <TooltipContent className="font-mono text-xs">
                  npm verified: human@latest
                </TooltipContent>
              </Tooltip>
            </div>
            <Link
              href={DATA.contact.social.X.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-block font-mono text-sm font-medium text-muted-foreground hover:text-link transition-colors"
            >
              @
              {DATA.contact.social.X.url.replace(/\/+$/, "").split("/").pop()}
            </Link>
            <p className="text-base font-medium text-muted-foreground">
              Building{" "}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={DATA.building.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:underline underline-offset-4"
                    />
                  }
                >
                  {DATA.building.name}
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs text-left text-xs font-normal"
                >
                  {DATA.building.description}
                </TooltipContent>
              </Tooltip>
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground">
              <Link
                href={DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-link transition-colors"
              >
                {DATA.location}
              </Link>
              <span aria-hidden className="opacity-40">
                |
              </span>
              <LiveClock />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
