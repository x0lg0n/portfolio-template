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

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <HolopinSection />
      <HeroSection />
      <AboutSection />
      <WorkSection limit={3} />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection limit={4} />
      <ContributionsSection />
      <SocialSection />
      <ContactSection />
    </main>
  );
}