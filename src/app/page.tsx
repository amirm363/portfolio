import HeroSection from "./_components/hero-section/main";
import userActions from "@/actions/user-actions";
import ContactSection from "./_components/contact-section/main";
import ProjectsSection from "./_components/projects-section/projects-section";
import ExperienceSection from "./_components/experience-section/main";
import SectionWrapper from "./_components/section-wrapper";
import SkillsSection from "./_components/skills-section/main";

export default async function Home() {
  const user = await userActions.getInfo();
  // const user: UserConfig | undefined = undefined;
  console.log("🚀 ~ page.tsx:7 ~ Home ~ user:", user);
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <main className="h-dvh snap-y snap-mandatory">
      <div className="flex flex-col">
        <SectionWrapper className="flex flex-col gap-10">
          <HeroSection user={user} />
          <SkillsSection skills={user.skills} />
        </SectionWrapper>

        {/* <SectionWrapper className="min-h-0">
        </SectionWrapper> */}

        <SectionWrapper>
          <ExperienceSection experiences={user.experience} />
        </SectionWrapper>

        <SectionWrapper>
          <ProjectsSection projects={user.projects} />
        </SectionWrapper>

        <SectionWrapper>
          <ContactSection />
        </SectionWrapper>
      </div>
    </main>
  );
}
