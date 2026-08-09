import { BlurFade } from "@/components/magicui/blur-fade";
import AboutSection from "@/components/section/about-section";
import ContactSection from "@/components/section/contact-section";
import ContributionsSection from "@/components/section/contributions-section";
import EducationSection from "@/components/section/education-section";
import HeroSection from "@/components/section/hero-section";
import HolopinSection from "@/components/section/holopin-section";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import SocialSection from "@/components/section/social-section";
import WorkSection from "@/components/section/work-section";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <HolopinSection />
      <HeroSection />
      <AboutSection />
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="font-heading text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <WorkSection limit={3} />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="flex justify-center">
              <InteractiveHoverButton href="/work">
                View More
              </InteractiveHoverButton>
            </div>
          </BlurFade>
        </div>
      </section>
      <EducationSection />
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="font-heading text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <SkillsSection />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ProjectsSection limit={3} />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex justify-center">
              <InteractiveHoverButton href="/projects">
                View More
              </InteractiveHoverButton>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="contributions">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <ContributionsSection />
        </BlurFade>
      </section>
      <section id="testimonials">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <h2 className="font-heading text-xl font-bold">Social updates</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <SocialSection />
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 20}>
            <h2 className="font-heading text-xl font-bold">Contact</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 21}>
            <ContactSection />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
