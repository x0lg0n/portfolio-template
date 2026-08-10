"use client";

import Marquee from "@/components/magicui/marquee";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DATA, type IconComponent } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

function SkillItem({ name, icon }: { name: string; icon?: IconComponent }) {
  return (
    <div className="flex items-center gap-3" title={name}>
      {icon ? icon({ className: "size-6" }) : null}
      <span className="whitespace-nowrap text-lg font-semibold opacity-80">
        {name}
      </span>
    </div>
  );
}

const firstRow = DATA.skills.filter((_, i) => i % 2 === 0);
const secondRow = DATA.skills.filter((_, i) => i % 2 === 1);

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <h2 className="font-heading text-xl font-bold">Skills</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col gap-6">
      <Marquee
        repeat={3}
        duration="36s"
        durationHover="120s"
        pauseOnHover
        gap="2rem"
        className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {firstRow.map((skill) => (
          <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </Marquee>
      <Marquee
        reverse
        repeat={3}
        duration="44s"
        durationHover="140s"
        pauseOnHover
        gap="2rem"
        className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {secondRow.map((skill) => (
          <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </Marquee>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}