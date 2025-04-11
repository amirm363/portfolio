import HeroSection from "./_components/hero-section/main";
import userActions from "@/actions/user-actions";
import ContactSection from "./_components/contact-section/main";
import ProjectsSection from "./_components/projects-section/projects-section";
import ExperienceSection from "./_components/experience-section/main";

export default async function Home() {
  const user = await userActions.getInfo();
  // const user: UserConfig | undefined = undefined;
  console.log("🚀 ~ page.tsx:7 ~ Home ~ user:", user);
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <main className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center even:bg-brand/10">
        <HeroSection user={user} />
        <ExperienceSection experiences={user.experience} />
        <ProjectsSection projects={user.projects} />
        <ContactSection />
      </div>
    </main>
  );
}
