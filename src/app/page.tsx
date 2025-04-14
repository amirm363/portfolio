import HeroSection from "./_components/hero-section/main";
import { userActions } from "@/actions/user-actions";
import ContactSection from "./_components/contact-section/main";
import ProjectsSection from "./_components/projects-section/projects-section";
import ExperienceSection from "./_components/experience-section/main";
import SectionWrapper from "./_components/section-wrapper";
import SkillsSection from "./_components/skills-section/main";

export default async function Home() {
  const user = await userActions.getInfo();
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <main className="min-h-dvh ">
      <div>
        <SectionWrapper
          id="about"
          className="flex flex-col gap-10 odd:bg-muted/30"
        >
          <HeroSection user={user} />
        </SectionWrapper>

        {/* <SectionWrapper className="min-h-0">
        </SectionWrapper> */}

        <SectionWrapper className="odd:bg-brand/10">
          <ExperienceSection experiences={user.experience} />
        </SectionWrapper>

        <SectionWrapper className="odd:bg-muted/30">
          <ProjectsSection projects={user.projects} />
        </SectionWrapper>

        <SectionWrapper className="flex flex-col min-h-dvh gap-10 odd:bg-brand/10">
          <ContactSection />
          <SkillsSection skills={user.skills} />
        </SectionWrapper>
      </div>
    </main>
  );
}
